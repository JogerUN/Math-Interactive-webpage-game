# 📄 PRD: MathQuest - La Aventura del Cálculo
**Product Requirements Document (Documento de Requisitos de Producto)**

---

## 1. 📌 Resumen del Producto y Visión

**MathQuest** es una aplicación web interactiva de aprendizaje gamificado orientada al estudio del **Cálculo Diferencial**. El objetivo es transformar una materia tradicionalmente percibida como abstracta y compleja en una aventura de rol (RPG), donde cada concepto matemático desbloquea habilidades, mundos y reconocimientos dentro del juego.

---

## 2. 🎯 Público Objetivo y Problema a Resolver

### Público Objetivo
- Estudiantes de educación secundaria superior, preuniversitaria o primeros semestres universitarios (ingeniería, ciencias exactas, economía).
- Docentes y tutores de matemáticas que buscan recursos pedagógicos interactivos con retroalimentación inmediata.

### Problemas que Resuelve
1. **Falta de intuición geométrica:** Los estudiantes suelen memorizar fórmulas de límites o derivadas sin comprender visualmente su significado (ej. la secante acercándose a la tangente).
2. **Abandono y frustración:** El estudio pasivo genera desinterés. La gamificación (XP, niveles, mundos, medallas) mantiene alta la retención.
3. **Falta de verificación en el consumo de contenido:** Muchos estudiantes saltan las explicaciones en video. MathQuest implementa un reproductor anti-adelanto obligatorio que garantiza que el alumno asimile la explicación antes de desbloquear la siguiente misión.

---

## 3. 👥 Personas y Casos de Uso

| Rol | Caso de Uso |
| :--- | :--- |
| **Estudiante (Aventurero)** | Selecciona su clase de héroe (Mago, Caballero, Pícara, Druida), viaja por los mundos temáticos, interactúa con simuladores, responde desafíos y ve su progreso reflejado en XP y nivel. |
| **Estudiante en Repaso** | Accede a la **Bitácora** para consultar fórmulas clave y teoremas de forma rápida, o revisa el **Historial** de misiones completadas. |
| **Docente / Administrador** | Configura los enlaces de video explicativo por misión a través de variables de entorno o la API sin necesidad de recompilar la aplicación. |

---

## 4. 🧩 Requisitos Funcionales (FR)

### FR-01: Sistema de Perfil y Gamificación
- Selección de nombre de héroe y clase (`mago`, `caballero`, `picara`, `druida`).
- Sistema de niveles con escala de puntos de experiencia (XP) acumulable.
- Logros/Insignias (*Badges*) desbloqueables por condiciones (primer intento correcto, mundos completados, etc.).
- Persistencia automática de todo el estado en el almacenamiento del navegador (`localStorage`).

### FR-02: Mapa de Mundos y Misiones
- Visualización de mundos progresivos (El Valle de los Límites, Las Cumbres de la Continuidad, El Bastión de las Derivadas, etc.).
- Desbloqueo secuencial condicionado a la aprobación de misiones previas.

### FR-03: Simuladores Matemáticos Interactivos
- **Límites Laterales:** Ajuste del delta/épsilon y aproximación de $x \to a^-$ y $x \to a^+$.
- **Secante a Tangente:** Visualización dinámica de la pendiente $m = \frac{f(x+h)-f(x)}{h}$ conforme $h \to 0$.
- **Puntos Críticos:** Identificación de máximos, mínimos e inflexiones con la primera y segunda derivada.
- **Asíntotas:** Exploración de asíntotas verticales ($x = c$) y horizontales ($y = L$).

### FR-04: Motor de Ejercicios y Evaluación
- Preguntas de opción múltiple con soporte para fórmulas en notación LaTeX enriquecida mediante **KaTeX**.
- Explicaciones paso a paso de resolución tras completar la pregunta.

### FR-05: Reproductor de Video Obligatorio Anti-Adelanto
- Detección de visualización obligatoria al resolver ejercicios.
- Bloqueo estricto de eventos de adelanto (`seeking` o manipulación de la barra de tiempo por encima del máximo visto).
- Limitación de velocidad máxima a 1.0x para evitar saltos.
- Soporte para videos en streaming (Firebase Storage, Google Drive iframe/direct o YouTube).

---

## 5. 🛡️ Requisitos No Funcionales (NFR)

- **Rendimiento:** Carga inicial rápida (< 2 segundos en conexión estándar) mediante empaquetado optimizado con Vite.
- **Seguridad (Capa Básica):** Cabeceras HTTP de seguridad (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`), limitación de tasa de solicitudes (Rate Limiting en memoria) y sanitización de tamaño de payload (100kb).
- **Accesibilidad y Responsividad:** Interfaz adaptada a pantallas móviles, tablets y ordenadores de escritorio con Tailwind CSS.
- **Audio Procedural:** Uso de la Web Audio API nativa para efectos sonoros de bajo peso sin descargas adicionales de archivos `.mp3`.

---

## 6. 🗺️ Roadmap de Versiones

- **v1.0 (MVP Actual):** Perfil de héroe, 4 simuladores interactivos, sistema de misiones con evaluación y videos con control anti-trampas.
- **v1.1 (Próxima):** Autenticación en la nube (Firebase Auth o Supabase) para sincronización entre dispositivos.
- **v1.2 (Futura):** Modo Duelo Matemático (Multijugador) y editor de misiones personalizadas para profesores.
