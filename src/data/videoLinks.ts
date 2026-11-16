export interface MissionVideoConfig {
  missionId: string;
  title: string;
  duration: string;
  firebaseUrl: string;
  driveUrl: string;
}

/**
 * Diccionario centralizado de videos por misión.
 * - firebaseUrl: URL pública de Firebase Storage (?alt=media) para reproducción streaming en <video>.
 * - driveUrl: URL de Google Drive utilizada por el endpoint de redirección /api/videos/:missionId/redirect.
 * Reemplaza el bucket de Firebase Storage y los IDs de Google Drive con los de tu proyecto real.
 */
export const VIDEO_LINKS_MAP: Record<string, MissionVideoConfig> = {
  'cont-1': {
    missionId: 'cont-1',
    title: 'Video Explicativo: Continuidad Racional y Límites Infinitos',
    duration: '01:40',
    firebaseUrl:
      'https://firebasestorage.googleapis.com/v0/b/mathquest-calculo.appspot.com/o/videos%2Fcont-1.mp4?alt=media',
    driveUrl: 'https://drive.google.com/file/d/REEMPLAZAR_ID_CONT_1/view?usp=sharing',
  },
  'cont-2': {
    missionId: 'cont-2',
    title: 'Video Explicativo: Continuidad en Funciones a Trozos',
    duration: '01:55',
    firebaseUrl:
      'https://firebasestorage.googleapis.com/v0/b/mathquest-calculo.appspot.com/o/videos%2Fcont-2.mp4?alt=media',
    driveUrl: 'https://drive.google.com/file/d/REEMPLAZAR_ID_CONT_2/view?usp=sharing',
  },
  'cont-3': {
    missionId: 'cont-3',
    title: 'Video Explicativo: Cálculo de Parámetros c y k para Continuidad',
    duration: '01:45',
    firebaseUrl:
      'https://firebasestorage.googleapis.com/v0/b/mathquest-calculo.appspot.com/o/videos%2Fcont-3.mp4?alt=media',
    driveUrl: 'https://drive.google.com/file/d/REEMPLAZAR_ID_CONT_3/view?usp=sharing',
  },
  'der-def-1': {
    missionId: 'der-def-1',
    title: 'Video Explicativo: Recta Tangente en un Punto Dado',
    duration: '01:30',
    firebaseUrl:
      'https://firebasestorage.googleapis.com/v0/b/mathquest-calculo.appspot.com/o/videos%2Fder-def-1.mp4?alt=media',
    driveUrl: 'https://drive.google.com/file/d/REEMPLAZAR_ID_DER_DEF_1/view?usp=sharing',
  },
  'der-def-2': {
    missionId: 'der-def-2',
    title: 'Video Explicativo: Derivada por Definición de Límite',
    duration: '01:50',
    firebaseUrl:
      'https://firebasestorage.googleapis.com/v0/b/mathquest-calculo.appspot.com/o/videos%2Fder-def-2.mp4?alt=media',
    driveUrl: 'https://drive.google.com/file/d/REEMPLAZAR_ID_DER_DEF_2/view?usp=sharing',
  },
  'der-def-3': {
    missionId: 'der-def-3',
    title: 'Video Explicativo: Cinemática, Velocidad y Aceleración',
    duration: '01:35',
    firebaseUrl:
      'https://firebasestorage.googleapis.com/v0/b/mathquest-calculo.appspot.com/o/videos%2Fder-def-3.mp4?alt=media',
    driveUrl: 'https://drive.google.com/file/d/REEMPLAZAR_ID_DER_DEF_3/view?usp=sharing',
  },
  'reg-1': {
    missionId: 'reg-1',
    title: 'Video Explicativo: Potencias Fraccionarias y Exponenciales',
    duration: '01:25',
    firebaseUrl:
      'https://firebasestorage.googleapis.com/v0/b/mathquest-calculo.appspot.com/o/videos%2Freg-1.mp4?alt=media',
    driveUrl: 'https://drive.google.com/file/d/REEMPLAZAR_ID_REG_1/view?usp=sharing',
  },
  'reg-2': {
    missionId: 'reg-2',
    title: 'Video Explicativo: Regla del Cociente Paso a Paso',
    duration: '01:45',
    firebaseUrl:
      'https://firebasestorage.googleapis.com/v0/b/mathquest-calculo.appspot.com/o/videos%2Freg-2.mp4?alt=media',
    driveUrl: 'https://drive.google.com/file/d/REEMPLAZAR_ID_REG_2/view?usp=sharing',
  },
  'reg-3': {
    missionId: 'reg-3',
    title: 'Video Explicativo: Producto con Funciones Trigonométricas',
    duration: '01:40',
    firebaseUrl:
      'https://firebasestorage.googleapis.com/v0/b/mathquest-calculo.appspot.com/o/videos%2Freg-3.mp4?alt=media',
    driveUrl: 'https://drive.google.com/file/d/REEMPLAZAR_ID_REG_3/view?usp=sharing',
  },
  'cad-1': {
    missionId: 'cad-1',
    title: 'Video Explicativo: Regla de la Cadena y Factorización',
    duration: '01:55',
    firebaseUrl:
      'https://firebasestorage.googleapis.com/v0/b/mathquest-calculo.appspot.com/o/videos%2Fcad-1.mp4?alt=media',
    driveUrl: 'https://drive.google.com/file/d/REEMPLAZAR_ID_CAD_1/view?usp=sharing',
  },
  'cad-2': {
    missionId: 'cad-2',
    title: 'Video Explicativo: Regla de la Cadena Anidada en Trigonométricas',
    duration: '01:50',
    firebaseUrl:
      'https://firebasestorage.googleapis.com/v0/b/mathquest-calculo.appspot.com/o/videos%2Fcad-2.mp4?alt=media',
    driveUrl: 'https://drive.google.com/file/d/REEMPLAZAR_ID_CAD_2/view?usp=sharing',
  },
  'cad-3': {
    missionId: 'cad-3',
    title: 'Video Explicativo: Derivación Implícita Completa',
    duration: '01:55',
    firebaseUrl:
      'https://firebasestorage.googleapis.com/v0/b/mathquest-calculo.appspot.com/o/videos%2Fcad-3.mp4?alt=media',
    driveUrl: 'https://drive.google.com/file/d/REEMPLAZAR_ID_CAD_3/view?usp=sharing',
  },
  'inv-1': {
    missionId: 'inv-1',
    title: 'Video Explicativo: Derivada de Trigonométricas Inversas',
    duration: '01:35',
    firebaseUrl:
      'https://firebasestorage.googleapis.com/v0/b/mathquest-calculo.appspot.com/o/videos%2Finv-1.mp4?alt=media',
    driveUrl: 'https://drive.google.com/file/d/REEMPLAZAR_ID_INV_1/view?usp=sharing',
  },
  'inv-2': {
    missionId: 'inv-2',
    title: 'Video Explicativo: Propiedades de Logaritmos al Derivar',
    duration: '01:45',
    firebaseUrl:
      'https://firebasestorage.googleapis.com/v0/b/mathquest-calculo.appspot.com/o/videos%2Finv-2.mp4?alt=media',
    driveUrl: 'https://drive.google.com/file/d/REEMPLAZAR_ID_INV_2/view?usp=sharing',
  },
  'inv-3': {
    missionId: 'inv-3',
    title: 'Video Explicativo: Derivación Logarítmica Avanzada',
    duration: '02:00',
    firebaseUrl:
      'https://firebasestorage.googleapis.com/v0/b/mathquest-calculo.appspot.com/o/videos%2Finv-3.mp4?alt=media',
    driveUrl: 'https://drive.google.com/file/d/REEMPLAZAR_ID_INV_3/view?usp=sharing',
  },
};
