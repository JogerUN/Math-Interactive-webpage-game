import express, { type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import dotenv from 'dotenv';
import { VIDEO_LINKS_MAP } from './src/data/videoLinks.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  const app = express();

  // === Easy Security Layer (Headers & Hardening) ===
  app.disable('x-powered-by'); // Oculta huella de Express
  app.use(express.json({ limit: '100kb' })); // Protege contra payloads gigantes / DoS

  // Cabeceras HTTP de seguridad básicas
  app.use((_req: Request, res: Response, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff'); // Evita MIME-type sniffing
    res.setHeader('X-Frame-Options', 'SAMEORIGIN'); // Mitiga Clickjacking
    res.setHeader('X-XSS-Protection', '1; mode=block'); // Filtro XSS legacy para navegadores antiguos
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // Limitador de peticiones ligero en memoria (Rate Limiter para endpoints API de modificación)
  const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
  const apiRateLimiter = (req: Request, res: Response, next: () => void) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minuto
    const maxRequests = 30; // Máximo 30 peticiones por minuto

    const clientData = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };
    if (now > clientData.resetTime) {
      clientData.count = 0;
      clientData.resetTime = now + windowMs;
    }

    clientData.count++;
    rateLimitMap.set(ip, clientData);

    if (clientData.count > maxRequests) {
      res.status(429).json({ error: 'Demasiadas solicitudes. Inténtalo más tarde.' });
      return;
    }
    next();
  };

  // Runtime overrides for Drive links (optional, in-memory)
  const runtimeDriveOverrides: Record<string, string> = {};

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'mathquest-server' });
  });

  // List all configured video endpoints per mission
  app.get('/api/videos', (_req: Request, res: Response) => {
    const items = Object.values(VIDEO_LINKS_MAP).map((item) => {
      const envKey = `YOUTUBE_VIDEO_${item.missionId.toUpperCase().replace(/-/g, '_')}`;
      const effectiveYtId =
        runtimeDriveOverrides[item.missionId] || process.env[envKey] || item.youtubeId || '';

      return {
        ...item,
        youtubeId: effectiveYtId,
        youtubeUrl: effectiveYtId ? `https://www.youtube.com/watch?v=${effectiveYtId}` : null,
      };
    });
    res.json({ videos: items });
  });

  // Get single mission video metadata
  app.get('/api/videos/:missionId', (req: Request, res: Response) => {
    const missionId = String(req.params.missionId || '');
    const config = VIDEO_LINKS_MAP[missionId];
    if (!config) {
      res.status(404).json({ error: `Misión "${missionId}" no encontrada.` });
      return;
    }
    const envKey = `YOUTUBE_VIDEO_${missionId.toUpperCase().replace(/-/g, '_')}`;
    const effectiveYtId =
      runtimeDriveOverrides[missionId] || process.env[envKey] || config.youtubeId || '';

    res.json({
      ...config,
      youtubeId: effectiveYtId,
      youtubeUrl: effectiveYtId ? `https://www.youtube.com/watch?v=${effectiveYtId}` : null,
    });
  });

  // Optional endpoint to update a mission's video at runtime
  app.put('/api/videos/:missionId/video-link', apiRateLimiter, (req: Request, res: Response) => {
    const missionId = String(req.params.missionId || '');
    const { youtubeId } = req.body as { youtubeId?: string };

    if (!VIDEO_LINKS_MAP[missionId]) {
      res.status(404).json({ error: `Misión "${missionId}" no encontrada.` });
      return;
    }

    if (typeof youtubeId !== 'string' || !youtubeId.trim()) {
      res.status(400).json({
        error: 'Proporciona un ID o URL válido de YouTube.',
      });
      return;
    }

    runtimeDriveOverrides[missionId] = youtubeId.trim();
    res.json({
      missionId,
      youtubeId: youtubeId.trim(),
    });
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MathQuest server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
