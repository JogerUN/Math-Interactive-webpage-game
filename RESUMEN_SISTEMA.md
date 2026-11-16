# 📘 Documentación y Resumen del Sistema: MathQuest - La Aventura del Cálculo

> **MathQuest** es una plataforma educativa interactiva gamificada estilo RPG diseñada para el aprendizaje práctico de Cálculo Diferencial (límites, continuidad, derivadas, asíntotas y puntos críticos).

---

## 1. 📋 Resumen Ejecutivo

**MathQuest: La Aventura del Cálculo** combina conceptos matemáticos rigurosos con mecánicas de juego de rol (RPG). Los estudiantes asumen el papel de un héroe (*Mago, Caballero, Pícara o Druida*), ganan puntos de experiencia (**XP**), suben de nivel, desbloquean mundos temáticos y desbloquean insignias a medida que ven videos explicativos, interactúan con simuladores visuales dinámicos y resuelven desafíos/ejercicios prácticos.

---

## 2. 🏗️ Arquitectura y Estructura del Proyecto

El proyecto está diseñado como una aplicación Fullstack híbrida: un backend ligero con **Express + TypeScript** que sirve tanto endpoints API (gestión y redirección de videos de Drive) como la aplicación frontend desarrollada en **React 19 + Vite** (con middleware de desarrollo integrado).

```
mathquest_-la-aventura-del-cálculo/
├── public/                     # Archivos estáticos públicos
├── src/                        # Código fuente del Frontend
│   ├── assets/
│   │   └── images/             # Recursos gráficos (héroes, mundos temáticos)
│   ├── components/             # Componentes principales de la UI
│   │   ├── simulators/         # Simuladores matemáticos interactivos
│   │   │   ├── AsymptoteExplorerSimulator.tsx # Explorador interactivo de asíntotas
│   │   │   ├── CriticalPointsSimulator.tsx    # Máximos, mínimos y puntos de inflexión
│   │   │   ├── LimitLateralSimulator.tsx      # Simulador de límites laterales
│   │   │   └── SecantTangentSimulator.tsx     # Recta secante vs. tangente (derivada)
│   │   ├── BitacoraView.tsx    # Vista de Bitácora / Apuntes teóricos y fórmulas
│   │   ├── Footer.tsx          # Pie de página de la aplicación
│   │   ├── HistorialView.tsx   # Historial de actividades y progreso
│   │   ├── InicioView.tsx      # Pantalla de bienvenida, selección de héroe y estadísticas
│   │   ├── MandatoryVideoModal.tsx # Modal de video previo a los ejercicios
│   │   ├── MapaView.tsx        # Mapa de mundos desbloqueables
│   │   ├── MathView.tsx        # Renderizador de fórmulas matemáticas con KaTeX
│   │   ├── MisionesView.tsx    # Gestión de misiones, teoría, simuladores y quizzes
│   │   ├── Navbar.tsx          # Barra de navegación, nivel, XP y selector de vistas
│   │   └── RecompensasView.tsx # Logros, medallas e insignias ganadas
│   ├── context/
│   │   └── GameContext.tsx     # Estado global: XP, nivel, misiones, persistencia en localStorage
│   ├── data/
│   │   ├── badgesData.ts       # Definición de insignias y condiciones de desbloqueo
│   │   ├── missionsData.ts     # Contenido pedagógico: mundos, misiones, teoría y ejercicios
│   │   └── videoLinks.ts       # Mapeo de videos educativos y enlaces a Google Drive
│   ├── utils/
│   │   └── audio.ts            # Efectos de sonido (Web Audio API sintético)
│   ├── App.tsx                 # Contenedor raíz con enrutamiento por pestañas
│   ├── index.css               # Estilos globales y utilidades de Tailwind CSS
│   ├── main.tsx                # Punto de entrada de React
│   └── types.ts                # Definiciones de tipos TypeScript del modelo de juego
├── .env.example                # Variables de entorno de ejemplo
├── .gitignore                  # Reglas de exclusión de Git
├── bun.lock / package.json     # Dependencias y scripts del proyecto
├── index.html                  # Plantilla HTML base con KaTeX CSS
├── metadata.json               # Metadatos del proyecto
├── README.md                   # Instrucciones iniciales
├── server.ts                   # Servidor backend Express + Vite SSR/Dev middleware
├── tsconfig.json               # Configuración del compilador TypeScript
└── vite.config.ts              # Configuración del empaquetador Vite + Tailwind
```

---

## 3. 🧩 Componentes y Módulos Principales

| Módulo / Vista | Descripción |
| :--- | :--- |
| **InicioView** | Gestión del perfil del jugador: selección de clase (*Mago, Caballero, Pícara, Druida*), nombre del héroe, visualización de nivel, XP y barra de progreso. |
| **MapaView** | Mapa interactivo de mundos matemáticos (ej. *El Valle de los Límites, Las Cumbres de la Continuidad, El Bastión de las Derivadas*), mostrando su estado de bloqueo/desbloqueo. |
| **MisionesView** | Núcleo de aprendizaje. Incluye: pestañas de teoría y fórmulas, videos guiados obligatorios/opcionales, simuladores interactivos embebidos y cuestionarios de autoevaluación interactivos con feedback en tiempo real. |
| **Simuladores Interactivos** | Componentes en Canvas / SVG que permiten experimentar en vivo con parámetros matemáticos: límites laterales aproximándose a un punto, la secante convirtiéndose en tangente, análisis de puntos críticos en polinomios y asíntotas verticales/horizontales. |
| **RecompensasView** | Vitrina de insignias y títulos desbloqueados por hitos (ej. resolver ejercicios al primer intento, completar misiones de un mundo, etc.). |
| **BitacoraView** | Compendio de fórmulas matemáticas, definiciones clave y teoremas acumulados a lo largo del juego. |
| **HistorialView** | Registro cronológico de actividades del usuario (misiones terminadas, videos visualizados, respuestas correctas). |
| **GameContext** | Administrador de estado global con persistencia automática en el almacenamiento local del navegador (`localStorage`). |
| **Backend API (`server.ts`)** | Expone servicios REST: `/api/health`, `/api/videos`, `/api/videos/:missionId` y `/api/videos/:missionId/redirect` para redirigir dinámicamente a videos educativos en Google Drive con soporte para variables de entorno. |

---

## 4. 💻 Technology Stack

### Frontend:
- **Framework:** [React 19](https://react.dev/) con [TypeScript](https://www.typescriptlang.org/)
- **Build Tool & Dev Server:** [Vite 8](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animaciones:** [Motion](https://motion.dev/) (Framer Motion v12) & [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Iconografía:** [Lucide React](https://lucide.dev/)
- **Renderizado Matemático:** [KaTeX](https://katex.org/)
- **Audio:** Sintetizador de efectos procedurales mediante la **Web Audio API** nativa (sin assets de audio pesados externos).

### Backend / Entorno de Ejecución:
- **Runtime:** [Node.js](https://nodejs.org/) (compatible también con Bun gracias al lockfile)
- **Servidor:** [Express 4](https://expressjs.com/)
- **TypeScript Runner:** [tsx](https://github.com/privatenumber/tsx) para ejecución de TypeScript en caliente
- **IA / SDKs:** `@google/genai` (integración con Google Gemini AI)
- **Configuración:** `dotenv`

---

## 5. 🚀 Guía de Instalación y Comandos de Ejecución

### Prerrequisitos
- **Node.js** (v18 o superior recomendado)
- **npm**, **pnpm** o **bun**

---

### Paso 1: Configurar variables de entorno (Opcional)
Si vas a utilizar las capacidades de IA de Gemini o enlaces personalizados de video:
```bash
cp .env.example .env
```
Edita `.env` y añade tu clave:
```env
GEMINI_API_KEY="tu-api-key-aqui"
PORT=3000
```

---

### Paso 2: Instalación de dependencias
Elige el gestor de paquetes de tu preferencia:

```bash
# Con npm
npm install

# O con bun (si tienes bun instalado)
bun install
```

---

### Paso 3: Comandos de ejecución

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor backend Express junto al servidor de desarrollo de Vite con recarga rápida (HMR) en `http://localhost:3000`. |
| `npm run build` | Compila y optimiza la aplicación frontend con Vite generando la carpeta `dist/`. |
| `npm run preview` | Permite previsualizar localmente la versión de producción generada por Vite. |
| `npm run start` | Inicia el servidor de producción usando Node.js. |
| `npm run lint` | Valida los tipos TypeScript en todo el proyecto sin generar código (`tsc --noEmit`). |
| `npm run clean` | Elimina las carpetas y artefactos de compilación anteriores (`dist`, etc.). |
