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
    duration: '01:40',
    youtubeId: '', // Coloca tu YouTube ID o enlace aquí
  },
  'cont-2': {
    missionId: 'cont-2',
    title: 'Video Explicativo: Continuidad en Funciones a Trozos',
    duration: '01:55',
    youtubeId: '',
  },
  'cont-3': {
    missionId: 'cont-3',
    title: 'Video Explicativo: Cálculo de Parámetros c y k para Continuidad',
    duration: '01:45',
    youtubeId: '',
  },
  'der-def-1': {
    missionId: 'der-def-1',
    title: 'Video Explicativo: Recta Tangente en un Punto Dado',
    duration: '01:30',
    youtubeId: '',
  },
  'der-def-2': {
    missionId: 'der-def-2',
    title: 'Video Explicativo: Derivada por Definición de Límite',
    duration: '01:50',
    youtubeId: '',
  },
  'der-def-3': {
    missionId: 'der-def-3',
    title: 'Video Explicativo: Cinemática, Velocidad y Aceleración',
    duration: '01:35',
    youtubeId: '',
  },
  'reg-1': {
    missionId: 'reg-1',
    title: 'Video Explicativo: Potencias Fraccionarias y Exponenciales',
    duration: '01:25',
    youtubeId: '',
  },
  'reg-2': {
    missionId: 'reg-2',
    title: 'Video Explicativo: Regla del Cociente Paso a Paso',
    duration: '01:45',
    youtubeId: '',
  },
  'reg-3': {
    missionId: 'reg-3',
    title: 'Video Explicativo: Producto con Funciones Trigonométricas',
    duration: '01:40',
    youtubeId: '',
  },
  'cad-1': {
    missionId: 'cad-1',
    title: 'Video Explicativo: Regla de la Cadena y Factorización',
    duration: '01:55',
    youtubeId: '',
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
