export interface MissionVideoConfig {
  missionId: string;
  title: string;
  duration: string;
  youtubeId?: string; // YouTube Video ID (ej. 'dQw4w9WgXcQ') o URL completa
}

/**
 * Diccionario centralizado de videos de YouTube por misión.
 * Para agregar o cambiar un video, simplemente coloca el ID o enlace de YouTube en youtubeId.
 */
export const VIDEO_LINKS_MAP: Record<string, MissionVideoConfig> = {
  'cont-1': {
    missionId: 'cont-1',
    title: 'Video Explicativo: Continuidad Racional y Límites Infinitos',
    duration: '02:00',
    youtubeId: 'https://www.youtube.com/watch?v=ZriQzi22CJo', // Coloca tu YouTube ID o enlace aquí
  },
  'cont-2': {
    missionId: 'cont-2',
    title: 'Video Explicativo: Continuidad en Funciones a Trozos',
    duration: '04:33',
    youtubeId: 'https://youtu.be/KdWYlwbvarU',
  },
  'cont-3': {
    missionId: 'cont-3',
    title: 'Video Explicativo: Cálculo de Parámetros c y k para Continuidad',
    duration: '02:23',
    youtubeId: 'https://youtu.be/1JsQ4cIfzIM',
  },
  'der-def-1': {
    missionId: 'der-def-1',
    title: 'Video Explicativo: Recta Tangente en un Punto Dado',
    duration: '07:32',
    youtubeId: 'https://youtu.be/B7LGnqHozMw',
  },
  'der-def-2': {
    missionId: 'der-def-2',
    title: 'Video Explicativo: Derivada por Definición de Límite',
    duration: '04:41',
    youtubeId: 'https://youtu.be/5Hv1DOrTXHw',
  },
  'der-def-3': {
    missionId: 'der-def-3',
    title: 'Video Explicativo: Cinemática, Velocidad y Aceleración',
    duration: '05:07',
    youtubeId: 'https://youtu.be/f-ogF6feIOY',
  },
  'reg-1': {
    missionId: 'reg-1',
    title: 'Video Explicativo: Potencias Fraccionarias y Exponenciales',
    duration: '02:38',
    youtubeId: 'https://youtu.be/BPAaZXRQYzw',
  },
  'reg-2': {
    missionId: 'reg-2',
    title: 'Video Explicativo: Regla del Cociente Paso a Paso',
    duration: '02:44',
    youtubeId: 'https://youtu.be/oJG-UVnqtdU',
  },
  'reg-3': {
    missionId: 'reg-3',
    title: 'Video Explicativo: Producto con Funciones Trigonométricas',
    duration: '02:43',
    youtubeId: 'https://youtu.be/nhxitZLztoE',
  },
  'cad-1': {
    missionId: 'cad-1',
    title: 'Video Explicativo: Regla de la Cadena y Factorización',
    duration: '09:48',
    youtubeId: 'https://youtu.be/gUQ_JzhBeSg',
  },
  'cad-2': {
    missionId: 'cad-2',
    title: 'Video Explicativo: Regla de la Cadena Anidada en Trigonométricas',
    duration: '01:50',
    youtubeId: '',
  },
  'cad-3': {
    missionId: 'cad-3',
    title: 'Video Explicativo: Derivación Implícita Completa',
    duration: '01:55',
    youtubeId: '',
  },
  'inv-1': {
    missionId: 'inv-1',
    title: 'Video Explicativo: Derivada de Trigonométricas Inversas',
    duration: '01:35',
    youtubeId: '',
  },
  'inv-2': {
    missionId: 'inv-2',
    title: 'Video Explicativo: Propiedades de Logaritmos al Derivar',
    duration: '01:45',
    youtubeId: '',
  },
  'inv-3': {
    missionId: 'inv-3',
    title: 'Video Explicativo: Derivación Logarítmica Avanzada',
    duration: '02:00',
    youtubeId: '',
  },
};