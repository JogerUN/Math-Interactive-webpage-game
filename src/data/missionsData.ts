import { World } from '../types';

export const WORLDS_DATA: World[] = [
  {
    id: 'continuidad_punto',
    number: 1,
    realmName: 'Valle de la Continuidad en un Punto',
    title: 'Funciones a Trozos, Fronteras y Parámetros k',
    subtitle: 'El Umbral del Flujo Ininterrumpido',
    description:
      'Repaso riguroso de continuidad puntual e interválica. Domina el análisis de funciones a trozos, evaluación de límites laterales en fronteras y el cálculo exacto de constantes y parámetros k para garantizar continuidad global.',
    color: 'emerald',
    accentColor: '#10B981',
    requiredXp: 0,
    image: '/src/assets/images/world_functions_valley_1794159182581.jpg',
    missions: [
      {
        id: 'cont-1',
        worldId: 'continuidad_punto',
        number: 1,
        title: 'Misión 1: Continuidad Racional en un Punto Singular',
        subtitle: 'Diagnóstico de continuidad y límites infinitos en $a = -2$',
        xpReward: 100,
        videoTitle: 'Video Explicativo: Continuidad Racional y Límites Infinitos',
        videoDuration: '01:40',
        theory: {
          summary:
            'Una función $f$ es continua en $x = a$ si y solo si se satisfacen tres condiciones simultáneas: 1) $f(a)$ existe en $\\mathbb{R}$, 2) $\\lim_{x \\to a} f(x)$ existe (límites laterales finitos e iguales), y 3) $\\lim_{x \\to a} f(x) = f(a)$.',
          keyConcepts: [
            {
              title: 'Existencia de la Imagen $f(a)$',
              explanation: 'El punto $a$ debe pertenecer al dominio. En funciones por partes, se evalúa en la rama que incluye $x = a$.',
            },
            {
              title: 'Límites Laterales Infinitos',
              explanation: 'Si cuando $x \\to a$ el cociente toma la forma $\\frac{c}{0}$ con $c \\neq 0$, las ramas divergen a $\\pm\\infty$ y el límite no existe en $\\mathbb{R}$.',
            },
            {
              title: 'Discontinuidad Infinita',
              explanation: 'Cuando al menos uno de los límites laterales es infinito, la discontinuidad es esencial o infinita y no puede removerse redefiniendo un punto.',
            },
          ],
          formulas: [
            {
              label: 'Triple Condición de Continuidad',
              math: '\\lim_{x \\to a} f(x) = f(a) \\iff \\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = f(a)',
              note: 'Si cualquiera de las tres condiciones falla, $f$ es discontinua en $x = a$.',
            },
          ],
          proTip: 'Tener una imagen definida como $f(-2) = 1$ no garantiza continuidad si las ramas alrededor de $-2$ divergen hacia el infinito.',
        },
        stepByStepExample: {
          problem: 'Analizar la continuidad en $a = 3$ de $g(x) = \\begin{cases} \\dfrac{1}{x - 3} & \\text{si } x \\neq 3 \\\\ 4 & \\text{si } x = 3 \\end{cases}$',
          context: 'Verificamos metódicamente cada una de las 3 condiciones de continuidad en $x = 3$.',
          steps: [
            {
              stepNum: 1,
              title: 'Verificar si $g(3)$ está definida',
              calculation: 'g(3) = 4 \\quad \\text{(definida explícitamente en la segunda rama)}',
              rationale: 'Cumple la condición 1: la imagen en el punto existe en $\\mathbb{R}$.',
            },
            {
              stepNum: 2,
              title: 'Calcular los límites laterales en $x = 3$',
              calculation: '\\lim_{x \\to 3^+} \\frac{1}{x - 3} = +\\infty, \\qquad \\lim_{x \\to 3^-} \\frac{1}{x - 3} = -\\infty',
              rationale: 'El denominador se anula y el numerador es $1 \\neq 0$.',
            },
            {
              stepNum: 3,
              title: 'Conclusión y clasificación de la discontinuidad',
              calculation: '\\lim_{x \\to 3} g(x) \\text{ no existe} \\implies \\text{Discontinuidad Infinita en } a = 3',
              rationale: 'Falla la condición 2 de existencia de límite finito bilateral.',
            },
          ],
          finalAnswer: 'La función NO es continua en $a = 3$; presenta una discontinuidad infinita.',
          tip: 'No confundas una discontinuidad evitable (agujero con límite finito) con una asíntota vertical / discontinuidad infinita.',
        },
        simulationType: 'asymptote_explorer',
        exercise: {
          id: 'ex-cont-1',
          question:
            'Determine si la función es continua en $a = -2$ y clasifique su comportamiento:',
          mathContext:
            'f(x) = \\begin{cases} \\dfrac{1}{x + 2} & \\text{si } x \\neq -2 \\\\ 1 & \\text{si } x = -2 \\end{cases} \\qquad a = -2',
          type: 'multiple_choice',
          options: [
            {
              id: 'a',
              text: 'No es continua en $a = -2$; presenta una discontinuidad infinita (esencial).',
            },
            {
              id: 'b',
              text: 'Es continua en $a = -2$ porque $f(-2) = 1$ está definida en la regla.',
            },
            {
              id: 'c',
              text: 'Presenta una discontinuidad evitable (removible) de límite $1$.',
            },
            {
              id: 'd',
              text: 'Presenta una discontinuidad de salto finito de tamaño $1$.',
            },
          ],
          correctAnswer: 'a',
          hints: [
            'Paso 1: Evalúa la imagen: $f(-2) = 1$ está definida en el punto.',
            'Paso 2: Evalúa los límites laterales cuando $x \\to -2$: $\\lim_{x \\to -2^+} \\frac{1}{x + 2} = +\\infty$ y $\\lim_{x \\to -2^-} \\frac{1}{x + 2} = -\\infty$.',
            'Paso 3: Dado que los límites laterales divergen hacia $\\pm\\infty$, el límite bilateral no existe como número real finito.',
          ],
          fullExplanation:
            'Aunque $f(-2) = 1$ existe, al evaluar los límites laterales tenemos: $$\lim_{x \to -2^+} \frac{1}{x+2} = +\infty, \qquad \lim_{x \to -2^-} \frac{1}{x+2} = -\infty$$ Como el límite no existe (diverge hacia el infinito), se incumple la condición $\lim_{x \to -2} f(x) = f(-2)$, clasificándose como discontinuidad infinita (esencial).',
        },
      },
      {
        id: 'cont-2',
        worldId: 'continuidad_punto',
        number: 2,
        title: 'Misión 2: Continuidad de Funciones a Trozos en Múltiples Fronteras',
        subtitle: 'Evaluación de saltos y fronteras en $x = 1$ y $x = 4$',
        xpReward: 120,
        videoTitle: 'Video Explicativo: Continuidad en Funciones a Trozos',
        videoDuration: '01:55',
        theory: {
          summary:
            'Para analizar la continuidad de una función por partes en sus puntos frontera, se deben calcular por separado los límites laterales con las ramas correspondientes y compararlos con la imagen.',
          keyConcepts: [
            {
              title: 'Frontera de Cambio de Rama',
              explanation: 'Para $x = c$, la rama izquierda se usa si $x < c$ y la derecha si $x > c$.',
            },
            {
              title: 'Salto Finito',
              explanation: 'Si ambos límites laterales existen y son números reales distintos ($L^- \\neq L^+$), la función presenta un salto finito de magnitud $|L^+ - L^-|$.',
            },
          ],
          formulas: [
            {
              label: 'Salto en la Frontera',
              math: '\\Delta = |\\lim_{x \\to c^+} f(x) - \\lim_{x \\to c^-} f(x)|',
              note: 'Si $\\Delta = 0$ y coincide con $f(c)$, la función es continua en la unión.',
            },
          ],
          proTip: 'Verifica siempre cada punto frontera de forma independiente; una función puede ser perfectamente continua en una frontera y tener un salto brusco en otra.',
        },
        stepByStepExample: {
          problem:
            'Analizar la continuidad en $x = 2$ de $f(x) = \\begin{cases} x + 3 & \\text{si } x \\le 2 \\\\ x^2 + 1 & \\text{si } x > 2 \\end{cases}$',
          context: 'Comparamos los límites laterales a ambos lados de $x = 2$.',
          steps: [
            {
              stepNum: 1,
              title: 'Límite por la izquierda en $x = 2$',
              calculation: '\\lim_{x \\to 2^-} (x + 3) = 2 + 3 = 5',
              rationale: 'Para $x \\le 2$ se usa la primera rama, y $f(2) = 5$.',
            },
            {
              stepNum: 2,
              title: 'Límite por la derecha en $x = 2$',
              calculation: '\\lim_{x \\to 2^+} (x^2 + 1) = 2^2 + 1 = 5',
              rationale: 'Para $x > 2$ se usa la segunda rama.',
            },
            {
              stepNum: 3,
              title: 'Comparación y conclusión',
              calculation: 'L^- = 5 = L^+ = f(2) \\implies \\text{Continua en } x = 2',
              rationale: 'Se cumplen las tres condiciones rigurosas de continuidad.',
            },
          ],
          finalAnswer: 'La función es continua en $x = 2$.',
          tip: 'Si los resultados hubieran sido distintos, habría una discontinuidad de salto.',
        },
        simulationType: 'limit_lateral',
        exercise: {
          id: 'ex-cont-2',
          question:
            'Al analizar la continuidad de la siguiente función por partes en los puntos frontera $x = 1$ y $x = 4$, ¿cuál es la conclusión correcta?',
          mathContext:
            'f(x) = \\begin{cases} 2^x & \\text{si } x \\leqslant 1 \\\\ 3 - x & \\text{si } 1 < x \\leqslant 4 \\\\ \\sqrt{x} & \\text{si } x > 4 \\end{cases}',
          type: 'multiple_choice',
          options: [
            {
              id: 'a',
              text: 'Es continua en $x = 1$, pero presenta discontinuidad de salto finito en $x = 4$.',
            },
            {
              id: 'b',
              text: 'Es discontinua en ambos puntos $x = 1$ y $x = 4$.',
            },
            {
              id: 'c',
              text: 'Es continua en ambos puntos $x = 1$ y $x = 4$.',
            },
            {
              id: 'd',
              text: 'Presenta discontinuidad en $x = 1$ y es continua en $x = 4$.',
            },
          ],
          correctAnswer: 'a',
          hints: [
            'Frontera $x = 1$: $\\lim_{x \\to 1^-} 2^x = 2^1 = 2$, y $\\lim_{x \\to 1^+} (3 - x) = 3 - 1 = 2$. Además $f(1) = 2$. Por tanto, es continua en $x = 1$.',
            'Frontera $x = 4$: $\\lim_{x \\to 4^-} (3 - x) = 3 - 4 = -1$, y $\\lim_{x \\to 4^+} \\sqrt{x} = \\sqrt{4} = 2$.',
            'Como en $x = 4$ los límites laterales son finitos pero distintos ($-1 \\neq 2$), hay un salto de tamaño $|2 - (-1)| = 3$.',
          ],
          fullExplanation:
            'En $x = 1$: $\lim_{x \to 1^-} 2^x = 2 = \lim_{x \to 1^+} (3 - x) = f(1)$, por lo que $f$ es CONTINUA en $x = 1$. En $x = 4$: $\lim_{x \to 4^-} (3 - x) = -1$ mientras $\lim_{x \to 4^+} \sqrt{x} = 2$. Como los límites laterales existen pero son diferentes ($-1 \neq 2$), $f$ presenta una DISCONTINUIDAD DE SALTO FINITO en $x = 4$.',
        },
      },
      {
        id: 'cont-3',
        worldId: 'continuidad_punto',
        number: 3,
        title: 'Misión 3: Parámetros de Continuidad: Problemas "Halle c / Halle k"',
        subtitle: 'Cálculo del parámetro para garantizar continuidad global en todo $\\mathbb{R}$',
        xpReward: 140,
        videoTitle: 'Video Explicativo: Cálculo de Parámetros c y k para Continuidad',
        videoDuration: '01:45',
        theory: {
          summary:
            'En problemas de parámetros de continuidad, se busca el valor de una constante desconocida ($k$ o $c$) para que las ramas coincidan perfectamente en el punto de empalme, igualando $\\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = f(a)$.',
          keyConcepts: [
            {
              title: 'Continuidad de Cada Rama',
              explanation: 'Los polinomios $cx^2 + 2x$ y $x^3 - cx$ son continuos en sus respectivos intervalos abiertos $(-\\infty, 2)$ y $(2, \\infty)$.',
            },
            {
              title: 'Ecuación de Empalme',
              explanation: 'El único punto crítico donde la continuidad podría romperse es la frontera de cambio de rama $x = 2$.',
            },
          ],
          formulas: [
            {
              label: 'Condición de Empalme Continuo',
              math: '\\lim_{x \\to 2^-} f(x) = \\lim_{x \\to 2^+} f(x) = f(2)',
              note: 'Permite formular una ecuación algebraica lineal para despejar el parámetro.',
            },
          ],
          proTip: 'Sustituye $x = 2$ en la expresión de la rama izquierda y en la rama derecha e iguala ambos resultados para despejar $c$.',
        },
        stepByStepExample: {
          problem:
            '¿Para qué valor de $k$ la función $g(x) = \\begin{cases} kx + 1 & \\text{si } x < 3 \\\\ x^2 - 2 & \\text{si } x \\ge 3 \\end{cases}$ es continua?',
          context: 'Igualamos los límites laterales en $x = 3$.',
          steps: [
            {
              stepNum: 1,
              title: 'Evaluar límite por la izquierda en $x = 3$',
              calculation: '\\lim_{x \\to 3^-} (kx + 1) = k(3) + 1 = 3k + 1',
              rationale: 'Rama izquierda para $x < 3$.',
            },
            {
              stepNum: 2,
              title: 'Evaluar límite por la derecha e imagen en $x = 3$',
              calculation: '\\lim_{x \\to 3^+} (x^2 - 2) = 3^2 - 2 = 9 - 2 = 7',
              rationale: 'Rama derecha para $x \\ge 3$.',
            },
            {
              stepNum: 3,
              title: 'Igualar y despejar $k$',
              calculation: '3k + 1 = 7 \\implies 3k = 6 \\implies k = 2',
              rationale: 'Para $k = 2$ las ramas se unen sin ruptura.',
            },
          ],
          finalAnswer: 'El valor de la constante es $k = 2$.',
          tip: 'Verifica siempre que la solución obtenida no genere divisiones por cero en ninguna rama.',
        },
        simulationType: 'continuity_jump',
        exercise: {
          id: 'ex-cont-3',
          question:
            '¿Para qué valor de la constante $c$ la función $f$ es continua en $(-\\infty, \\infty)$?',
          mathContext:
            'f(x) = \\begin{cases} cx^2 + 2x & \\text{si } x < 2 \\\\ x^3 - cx & \\text{si } x \\geqslant 2 \\end{cases}',
          type: 'multiple_choice',
          options: [
            { id: 'a', text: '$c = \\frac{2}{3} \\quad (c \\approx 0.67)$' },
            { id: 'b', text: '$c = 2$' },
            { id: 'c', text: '$c = -\\frac{4}{3}$' },
            { id: 'd', text: '$c = 1$' },
          ],
          correctAnswer: 'a',
          hints: [
            'Paso 1: Calcula el límite por la izquierda cuando $x \\to 2^-$: $c(2)^2 + 2(2) = 4c + 4$.',
            'Paso 2: Calcula el límite por la derecha y la imagen en $x = 2$: $(2)^3 - c(2) = 8 - 2c$.',
            'Paso 3: Iguala ambas expresiones: $4c + 4 = 8 - 2c$.',
            'Paso 4: Suma $2c$ a ambos lados: $6c = 4 \\implies c = \\frac{4}{6} = \\frac{2}{3}$.',
          ],
          fullExplanation:
            'Las funciones polinómicas son continuas en sus ramas abiertas. En la frontera $x = 2$ se requiere $\lim_{x \to 2^-} f(x) = \lim_{x \to 2^+} f(x)$: $$4c + 4 = 8 - 2c \implies 4c + 2c = 8 - 4 \implies 6c = 4 \implies c = \frac{2}{3}$$ Con este valor, $f$ es continua en todo el eje real $(-\infty, \infty)$.',
        },
      },
    ],
  },
  {
    id: 'derivada_definicion',
    number: 2,
    realmName: 'Cañón de la Derivada por Definición, Tangentes y Velocidad',
    title: 'Razón de Cambio Instantánea, Cinemática y Recta Tangente',
    subtitle: 'El Origen del Límite Infinitesimal',
    description:
      'Comprende la definición formal de derivada a través del cociente de diferencias, la pendiente geométrica de la recta tangente en un punto dado y la interpretación física de velocidad y aceleración en el movimiento rectilíneo.',
    color: 'blue',
    accentColor: '#3B82F6',
    requiredXp: 250,
    image: '/src/assets/images/world_limits_canyon_1794159182572.jpg',
    missions: [
      {
        id: 'der-def-1',
        worldId: 'derivada_definicion',
        number: 1,
        title: 'Misión 1: Recta Tangente a una Curva en un Punto Dado',
        subtitle: 'Pendiente geométrica y ecuación punto-pendiente para $y = \\sqrt{x}$ en $(1, 1)$',
        xpReward: 130,
        videoTitle: 'Video Explicativo: Recta Tangente en un Punto Dado',
        videoDuration: '01:30',
        theory: {
          summary:
            'La pendiente $m$ de la recta tangente a la curva $y = f(x)$ en el punto $P(x_0, y_0)$ es igual a la derivada evaluada en dicho punto: $m = f\'(x_0)$. Con $m$ y las coordenadas de $P$ se determina la ecuación de la recta tangente.',
          keyConcepts: [
            {
              title: 'Pendiente Tangente $m = f\'(x_0)$',
              explanation: 'Mide la inclinación instantánea de la curva en el punto de contacto.',
            },
            {
              title: 'Forma Punto-Pendiente',
              explanation: '$y - y_0 = m(x - x_0)$. Es la estructura canónica para formular la recta tangente.',
            },
          ],
          formulas: [
            {
              label: 'Derivada de la Función Raíz Cuadrada',
              math: '\\frac{d}{dx}[\\sqrt{x}] = \\frac{1}{2\\sqrt{x}}',
              note: 'Válida para todo $x > 0$.',
            },
            {
              label: 'Ecuación de la Recta Tangente',
              math: 'y - y_0 = f\'(x_0)(x - x_0)',
              note: 'Pasa por $(x_0, y_0)$ con pendiente $m = f\'(x_0)$.',
            },
          ],
          proTip: 'Asegúrate de que el punto dado $(x_0, y_0)$ efectivamente pertenezca a la curva comprobando que $f(x_0) = y_0$.',
        },
        stepByStepExample: {
          problem: 'Hallar la ecuación de la recta tangente a $y = x^2$ en el punto $(2, 4)$',
          context: 'Calculamos la derivada, evaluamos la pendiente y aplicamos punto-pendiente.',
          steps: [
            {
              stepNum: 1,
              title: 'Calcular la función derivada $f\'(x)$',
              calculation: "f(x) = x^2 \\implies f'(x) = 2x",
              rationale: 'Regla de la potencia básica.',
            },
            {
              stepNum: 2,
              title: 'Evaluar la pendiente $m$ en $x_0 = 2$',
              calculation: "m = f'(2) = 2(2) = 4",
              rationale: 'Pendiente de la tangente en $(2, 4)$.',
            },
            {
              stepNum: 3,
              title: 'Escribir la ecuación de la recta',
              calculation: 'y - 4 = 4(x - 2) \\implies y = 4x - 8 + 4 \\implies y = 4x - 4',
              rationale: 'Ecuación explícita de la recta tangente.',
            },
          ],
          finalAnswer: 'La ecuación de la recta tangente es $y = 4x - 4$.',
          tip: 'En la forma general se escribe $4x - y - 4 = 0$.',
        },
        simulationType: 'secant_tangent',
        exercise: {
          id: 'ex-der-def-1',
          question:
            'Encuentre la ecuación de la recta tangente a la curva en el punto dado:',
          mathContext: 'y = \\sqrt{x}, \\qquad (1, 1)',
          type: 'multiple_choice',
          options: [
            {
              id: 'a',
              text: '$y = \\frac{1}{2}x + \\frac{1}{2} \\quad \\text{(o bien: } x - 2y + 1 = 0\\text{)}$',
            },
            {
              id: 'b',
              text: '$y = 2x - 1$',
            },
            {
              id: 'c',
              text: '$y = \\frac{1}{2}x + 1$',
            },
            {
              id: 'd',
              text: '$y = x$',
            },
          ],
          correctAnswer: 'a',
          hints: [
            'Paso 1: La función es $f(x) = \\sqrt{x} = x^{1/2}$. Su derivada es $f\'(x) = \\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}$.',
            'Paso 2: Evalúa la pendiente en $x = 1$: $m = f\'(1) = \\frac{1}{2\\sqrt{1}} = \\frac{1}{2}$.',
            'Paso 3: Aplica la ecuación punto-pendiente con $(x_0, y_0) = (1, 1)$: $y - 1 = \\frac{1}{2}(x - 1)$.',
            'Paso 4: Despeja $y$: $y = \\frac{1}{2}x + \\frac{1}{2}$ (en forma general: $x - 2y + 1 = 0$).',
          ],
          fullExplanation:
            'La derivada de $y = \sqrt{x}$ es $\frac{dy}{dx} = \frac{1}{2\sqrt{x}}$. Evaluando en $x = 1$, la pendiente es $m = \frac{1}{2}$. Aplicando la ecuación punto-pendiente con el punto $(1, 1)$: $$y - 1 = \frac{1}{2}(x - 1) \implies y = \frac{1}{2}x + \frac{1}{2} \iff x - 2y + 1 = 0$$',
        },
      },
      {
        id: 'der-def-2',
        worldId: 'derivada_definicion',
        number: 2,
        title: 'Misión 2: Derivada por Definición Formal de Límite y Dominios',
        subtitle: 'Cociente incremental infinitesimal y análisis de dominios para $f(x) = 4 + 8x - 5x^2$',
        xpReward: 150,
        videoTitle: 'Video Explicativo: Derivada por Definición de Límite',
        videoDuration: '01:50',
        theory: {
          summary:
            'La definición formal de derivada establece que $f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$. Permite obtener la expresión analítica de la derivada sin reglas abreviadas, identificando además los dominios de $f$ y $f\'$.',
          keyConcepts: [
            {
              title: 'Cociente Incremental',
              explanation: 'Expresa la tasa media de cambio entre $x$ y $x+h$. El factor $h$ en el denominador debe cancelarse algebraicamente antes de tomar el límite.',
            },
            {
              title: 'Dominios de $f$ y $f\'$',
              explanation: 'Para cualquier polinomio de grado $n$, tanto la función original como su derivada existen en todos los números reales $\\mathbb{R}$.',
            },
          ],
          formulas: [
            {
              label: 'Definición Formal de Derivada',
              math: "f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}",
              note: 'Límite de la indeterminación fundamental $\\frac{0}{0}$.',
            },
          ],
          proTip: 'Al expandir $f(x+h)$, todos los términos que no contienen $h$ deben cancelarse exactamente con $-f(x)$.',
        },
        stepByStepExample: {
          problem: 'Hallar por definición la derivada de $f(x) = 2x^2 - 3x$ y sus dominios',
          context: 'Desarrollamos el cociente incremental paso a paso.',
          steps: [
            {
              stepNum: 1,
              title: 'Calcular $f(x + h)$',
              calculation: 'f(x + h) = 2(x + h)^2 - 3(x + h) = 2x^2 + 4xh + 2h^2 - 3x - 3h',
              rationale: 'Expansión del binomio al cuadrado.',
            },
            {
              stepNum: 2,
              title: 'Restar $f(x)$ y factorizar $h$',
              calculation: '[f(x + h) - f(x)] = 4xh + 2h^2 - 3h = h(4x + 2h - 3)',
              rationale: 'Los términos $2x^2$ y $-3x$ se cancelan.',
            },
            {
              stepNum: 3,
              title: 'Dividir entre $h$ y tomar límite $h \\to 0$',
              calculation: "\\lim_{h \\to 0} (4x + 2h - 3) = 4x - 3",
              rationale: 'Se evalúa $h = 0$.',
            },
          ],
          finalAnswer: "f'(x) = 4x - 3 con $\\text{Dom}(f) = \\mathbb{R}$ y $\\text{Dom}(f') = \\mathbb{R}$",
          tip: 'Ambas son funciones polinómicas con dominio en todo el conjunto de los números reales.',
        },
        simulationType: 'secant_tangent',
        exercise: {
          id: 'ex-der-def-2',
          question:
            'Encuentre la derivada de la función usando la definición de derivada. Indique los dominios de la función y de su derivada:',
          mathContext: 'f(x) = 4 + 8x - 5x^2',
          type: 'multiple_choice',
          options: [
            {
              id: 'a',
              text: "$f'(x) = 8 - 10x; \\quad \\text{Dom}(f) = (-\\infty, \\infty), \\quad \\text{Dom}(f') = (-\\infty, \\infty)$",
            },
            {
              id: 'b',
              text: "$f'(x) = 8 - 5x; \\quad \\text{Dom}(f) = [0, \\infty), \\quad \\text{Dom}(f') = (0, \\infty)$",
            },
            {
              id: 'c',
              text: "$f'(x) = 4 + 8x - 10x^2; \\quad \\text{Dom}(f) = \\mathbb{R}, \\quad \\text{Dom}(f') = \\mathbb{R} \\setminus \\{0\\}$",
            },
            {
              id: 'd',
              text: "$f'(x) = 8 - 10x; \\quad \\text{Dom}(f) = [0, \\infty), \\quad \\text{Dom}(f') = (-\\infty, \\infty)$",
            },
          ],
          correctAnswer: 'a',
          hints: [
            'Paso 1: Plantea $f(x+h) = 4 + 8(x+h) - 5(x+h)^2 = 4 + 8x + 8h - 5(x^2 + 2xh + h^2)$.',
            'Paso 2: Desarrolla: $4 + 8x + 8h - 5x^2 - 10xh - 5h^2$.',
            'Paso 3: Resta $f(x) = 4 + 8x - 5x^2$: el numerador queda $8h - 10xh - 5h^2 = h(8 - 10x - 5h)$.',
            'Paso 4: Divide entre $h$ y evalúa $h \\to 0$: $\\lim_{h \\to 0} (8 - 10x - 5h) = 8 - 10x$.',
            'Paso 5: Tanto $f$ como $f\'$ son polinomios, por lo que sus dominios son todo $\\mathbb{R} = (-\\infty, \\infty)$.',
          ],
          fullExplanation:
            "Por definición de derivada: $$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = \lim_{h \to 0} (8 - 10x - 5h) = 8 - 10x$$ Como $f(x)$ y $f'(x)$ son funciones polinómicas cuadrática y lineal respectivamente, están definidas para cualquier número real: $\text{Dom}(f) = (-\infty, \infty)$ y $\text{Dom}(f') = (-\infty, \infty)$.",
        },
      },
      {
        id: 'der-def-3',
        worldId: 'derivada_definicion',
        number: 3,
        title: 'Misión 3: Cinemática: Razón de Cambio, Velocidad y Aceleración',
        subtitle: 'Derivadas sucesivas de la posición para $f(t) = 5t^2 + 8t - 4$ en $t = 4\\text{ s}$',
        xpReward: 160,
        videoTitle: 'Video Explicativo: Cinemática, Velocidad y Aceleración',
        videoDuration: '01:35',
        theory: {
          summary:
            'En física, si la posición de un objeto que se mueve en línea recta está descrita por $f(t)$, la velocidad instantánea es la primera derivada $v(t) = f\'(t)$, y la aceleración instantánea es la segunda derivada $a(t) = v\'(t) = f\'\'(t)$.',
          keyConcepts: [
            {
              title: 'Velocidad Instantánea $v(t)$',
              explanation: 'Razón de cambio de la posición con respecto al tiempo: $v(t) = \\frac{df}{dt}$ (unidades en m/s).',
            },
            {
              title: 'Aceleración Instantánea $a(t)$',
              explanation: 'Razón de cambio de la velocidad con respecto al tiempo: $a(t) = \\frac{dv}{dt} = \\frac{d^2 f}{dt^2}$ (unidades en m/s²).',
            },
          ],
          formulas: [
            {
              label: 'Velocidad y Aceleración Instantáneas',
              math: "v(t) = f'(t) = \\frac{df}{dt}, \\qquad a(t) = v'(t) = f''(t) = \\frac{d^2 f}{dt^2}",
              note: 'Evaluadas en el instante específico $t = t_0$.',
            },
          ],
          proTip: 'Distingue con claridad las unidades de medida: la posición en m, la velocidad en m/s y la aceleración en m/s².',
        },
        stepByStepExample: {
          problem: 'Dada $s(t) = 3t^2 + 2t - 1$, hallar velocidad y aceleración en $t = 2\\text{ s}$',
          context: 'Derivamos sucesivamente la función de posición.',
          steps: [
            {
              stepNum: 1,
              title: 'Calcular la función de velocidad $v(t)$',
              calculation: "v(t) = s'(t) = 6t + 2",
              rationale: 'Primera derivada de la posición.',
            },
            {
              stepNum: 2,
              title: 'Evaluar la velocidad en $t = 2\\text{ s}$',
              calculation: 'v(2) = 6(2) + 2 = 12 + 2 = 14\\text{ m/s}',
              rationale: 'Velocidad en el instante $t = 2$ segundos.',
            },
            {
              stepNum: 3,
              title: 'Calcular y evaluar la aceleración $a(t)$',
              calculation: "a(t) = v'(t) = 6 \\implies a(2) = 6\\text{ m/s}^2",
              rationale: 'Segunda derivada de la posición.',
            },
          ],
          finalAnswer: '$v(2) = 14\\text{ m/s}$ y $a(2) = 6\\text{ m/s}^2$.',
          tip: 'En el movimiento rectilíneo con aceleración constante, la aceleración no depende de $t$.',
        },
        simulationType: 'critical_points',
        exercise: {
          id: 'ex-der-def-3',
          question:
            'Dada la función $f(t) = 5t^2 + 8t - 4$, que describe la posición (en metros) de un objeto que se mueve en línea recta respecto al tiempo (en segundos), halle la velocidad y la aceleración en el instante $t = 4\\text{ s}$:',
          mathContext: 'f(t) = 5t^2 + 8t - 4, \\qquad t = 4\\text{ s}',
          type: 'multiple_choice',
          options: [
            {
              id: 'a',
              text: '$v(4) = 48\\text{ m/s}, \\quad a(4) = 10\\text{ m/s}^2$',
            },
            {
              id: 'b',
              text: '$v(4) = 40\\text{ m/s}, \\quad a(4) = 8\\text{ m/s}^2$',
            },
            {
              id: 'c',
              text: '$v(4) = 108\\text{ m/s}, \\quad a(4) = 20\\text{ m/s}^2$',
            },
            {
              id: 'd',
              text: '$v(4) = 48\\text{ m/s}, \\quad a(4) = 0\\text{ m/s}^2$',
            },
          ],
          correctAnswer: 'a',
          hints: [
            'Paso 1: La velocidad es la primera derivada $v(t) = f\'(t)$. Deriva $5t^2 + 8t - 4$: $v(t) = 10t + 8$.',
            'Paso 2: Evalúa en $t = 4\\text{ s}$: $v(4) = 10(4) + 8 = 40 + 8 = 48\\text{ m/s}$.',
            'Paso 3: La aceleración es la derivada de la velocidad $a(t) = v\'(t)$. Deriva $10t + 8$: $a(t) = 10\\text{ m/s}^2$.',
            'Paso 4: En $t = 4\\text{ s}$, la aceleración es constante: $a(4) = 10\\text{ m/s}^2$.',
          ],
          fullExplanation:
            "La función de posición es $f(t) = 5t^2 + 8t - 4$. La velocidad instantánea corresponde a la primera derivada $v(t) = f'(t) = 10t + 8$. Evaluando en $t = 4$ segundos obtenemos: $$v(4) = 10(4) + 8 = 48\text{ m/s}$$ La aceleración instantánea corresponde a la segunda derivada: $$a(t) = f''(t) = v'(t) = 10\text{ m/s}^2$$",
        },
      },
    ],
  },
  {
    id: 'reglas_derivacion',
    number: 3,
    realmName: 'Abismo de las Reglas de Derivación',
    title: 'Potencias, Exponenciales, Cocientes y Derivadas Trigonométricas',
    subtitle: 'El Arsenal de las Operaciones Diferenciales Fundamentales',
    description:
      'Domina el cálculo analítico de derivadas mediante la regla de potencias y exponenciales, la regla del cociente para funciones racionales y las derivadas de funciones trigonométricas directas.',
    color: 'purple',
    accentColor: '#8B5CF6',
    requiredXp: 550,
    image: '/src/assets/images/hero_mathquest_banner_1794159181651.jpg',
    missions: [
      {
        id: 'reg-1',
        worldId: 'reglas_derivacion',
        number: 1,
        title: 'Misión 1: Reglas de Potencias y Exponenciales Básicas',
        subtitle: 'Derivación de raíces fraccionarias y múltiplos de $e^t$ para $h(t) = \\sqrt[4]{t} - 4e^t$',
        xpReward: 140,
        videoTitle: 'Video Explicativo: Potencias Fraccionarias y Exponenciales',
        videoDuration: '01:25',
        theory: {
          summary:
            'Toda raíz puede reescribirse como una potencia de exponente fraccionario: $\\sqrt[n]{t} = t^{1/n}$. La regla de la potencia establece que $\\frac{d}{dt} [t^n] = n t^{n-1}$. Para la función exponencial natural, $\\frac{d}{dt} [e^t] = e^t$.',
          keyConcepts: [
            {
              title: 'Exponente Racional',
              explanation: '$\\sqrt[4]{t} = t^{1/4}$. Su derivada resta 1 al exponente: $\\frac{1}{4} - 1 = -\\frac{3}{4}$.',
            },
            {
              title: 'Derivada de la Exponencial Natural',
              explanation: 'La función $e^t$ es la única cuya razón de cambio instantánea es idéntica a sí misma.',
            },
          ],
          formulas: [
            {
              label: 'Regla de la Potencia',
              math: '\\frac{d}{dt}[t^n] = n t^{n-1} \\implies \\frac{d}{dt}[t^{1/4}] = \\frac{1}{4}t^{-3/4} = \\frac{1}{4\\sqrt[4]{t^3}}',
              note: 'Válido para cualquier exponente real $n$.',
            },
            {
              label: 'Derivada de la Exponencial',
              math: '\\frac{d}{dt}[c e^t] = c e^t',
              note: 'La constante multiplicativa $c$ se conserva intacta.',
            },
          ],
          proTip: 'No confundas la derivada de $e^t$ (que es $e^t$) con la derivada de una potencia como $t^e$ (que sería $e \\cdot t^{e-1}$).',
        },
        stepByStepExample: {
          problem: 'Derivar la función $f(x) = \\sqrt[3]{x} + 5e^x$',
          context: 'Transformamos la raíz cúbica a exponente fraccionario $\\frac{1}{3}$.',
          steps: [
            {
              stepNum: 1,
              title: 'Reescribir la raíz en forma de potencia',
              calculation: 'f(x) = x^{1/3} + 5e^x',
              rationale: 'Permite aplicar la regla de la potencia.',
            },
            {
              stepNum: 2,
              title: 'Derivar término a término',
              calculation: "f'(x) = \\frac{1}{3}x^{(1/3 - 1)} + 5e^x = \\frac{1}{3}x^{-2/3} + 5e^x",
              rationale: 'Resta 1 al exponente: $\\frac{1}{3} - 1 = -\\frac{2}{3}$.',
            },
            {
              stepNum: 3,
              title: 'Reescribir con radical positivo en el denominador',
              calculation: "f'(x) = \\frac{1}{3\\sqrt[3]{x^2}} + 5e^x",
              rationale: 'Notación simplificada canónica.',
            },
          ],
          finalAnswer: "f'(x) = \\frac{1}{3\\sqrt[3]{x^2}} + 5e^x",
          tip: 'Recuerda que $x^{-a/b} = \\frac{1}{\\sqrt[b]{x^a}}$.',
        },
        simulationType: 'secant_tangent',
        exercise: {
          id: 'ex-reg-1',
          question: 'Derive la siguiente función:',
          mathContext: 'h(t) = \\sqrt[4]{t} - 4e^t',
          type: 'multiple_choice',
          options: [
            {
              id: 'a',
              text: "$h'(t) = \\frac{1}{4\\sqrt[4]{t^3}} - 4e^t \\quad \\left[\\text{o bien: } \\frac{1}{4}t^{-3/4} - 4e^t\\right]$",
            },
            {
              id: 'b',
              text: "$h'(t) = \\frac{1}{4\\sqrt[3]{t^4}} - 4te^{t-1}$",
            },
            {
              id: 'c',
              text: "$h'(t) = \\frac{1}{4}t^{3/4} - 4e^t$",
            },
            {
              id: 'd',
              text: "$h'(t) = \\frac{4}{\\sqrt[4]{t^3}} - e^t$",
            },
          ],
          correctAnswer: 'a',
          hints: [
            'Paso 1: Reescribe $\\sqrt[4]{t}$ como $t^{1/4}$.',
            'Paso 2: Deriva $t^{1/4}$ bajando el exponente: $\\frac{1}{4}t^{1/4 - 1} = \\frac{1}{4}t^{-3/4} = \\frac{1}{4\\sqrt[4]{t^3}}$.',
            'Paso 3: Deriva $-4e^t$: la derivada de $e^t$ es $e^t$, por lo que queda $-4e^t$.',
            'Paso 4: Junta ambos términos: $h\'(t) = \\frac{1}{4\\sqrt[4]{t^3}} - 4e^t$.',
          ],
          fullExplanation:
            "Reescribiendo la función como $h(t) = t^{1/4} - 4e^t$. Derivando término a término mediante la regla de potencias y la función exponencial natural: $$\frac{d}{dt}[t^{1/4}] = \frac{1}{4}t^{-3/4} = \frac{1}{4\sqrt[4]{t^3}}, \qquad \frac{d}{dt}[-4e^t] = -4e^t$$ Por consiguiente: $$h'(t) = \frac{1}{4\sqrt[4]{t^3}} - 4e^t$$",
        },
      },
      {
        id: 'reg-2',
        worldId: 'reglas_derivacion',
        number: 2,
        title: 'Misión 2: La Regla del Cociente para Funciones Racionales',
        subtitle: 'Desarrollo algebraico riguroso de $(u/v)\' = \\frac{u\'v - uv\'}{v^2}$ para $y = \\frac{x^2 + 1}{x^3 - 1}$',
        xpReward: 160,
        videoTitle: 'Video Explicativo: Regla del Cociente Paso a Paso',
        videoDuration: '01:45',
        theory: {
          summary:
            'La derivada de un cociente $f(x) = \\frac{u(x)}{v(x)}$ está dada por $\\frac{u\'v - uv\'}{v^2}$. La clave radica en conservar el denominador al cuadrado sin expandirlo prematuramente y expandir con extremo cuidado los signos del numerador.',
          keyConcepts: [
            {
              title: 'Identificación de $u$ y $v$',
              explanation: '$u$ es el numerador y $v$ el denominador. Calcula por separado $u\'$ y $v\'$ antes de ensamblar.',
            },
            {
              title: 'Distribución del Signo Menos',
              explanation: 'El término $-uv\'$ requiere colocar paréntesis alrededor del producto completo para evitar errores de signo.',
            },
          ],
          formulas: [
            {
              label: 'Regla del Cociente',
              math: "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}",
              note: 'El denominador $v^2$ siempre permanece al cuadrado.',
            },
          ],
          proTip: 'Nunca cometas el error de derivar numerador y denominador por separado como $\\frac{u\'}{v\'}$; eso solo es válido en la regla de L\'Hôpital para límites.',
        },
        stepByStepExample: {
          problem: 'Derivar $f(x) = \\frac{x + 2}{x - 3}$',
          context: 'Aplicamos la regla del cociente con $u = x + 2$ y $v = x - 3$.',
          steps: [
            {
              stepNum: 1,
              title: 'Hallar $u\'$ y $v\'$',
              calculation: "u' = 1, \\qquad v' = 1",
              rationale: 'Derivadas de funciones lineales.',
            },
            {
              stepNum: 2,
              title: 'Aplicar la fórmula $\\frac{u\'v - uv\'}{v^2}$',
              calculation: "f'(x) = \\frac{(1)(x - 3) - (x + 2)(1)}{(x - 3)^2}",
              rationale: 'Ensamblaje del cociente.',
            },
            {
              stepNum: 3,
              title: 'Simplificar el numerador',
              calculation: "x - 3 - x - 2 = -5 \\implies f'(x) = \\frac{-5}{(x - 3)^2}",
              rationale: 'Términos en $x$ se cancelan.',
            },
          ],
          finalAnswer: "f'(x) = -\\frac{5}{(x - 3)^2}",
          tip: 'El denominador $(x - 3)^2$ nunca se expande.',
        },
        simulationType: 'critical_points',
        exercise: {
          id: 'ex-reg-2',
          question: 'Derive la siguiente función:',
          mathContext: 'y = \\frac{x^2 + 1}{x^3 - 1}',
          type: 'multiple_choice',
          options: [
            {
              id: 'a',
              text: "$y' = \\frac{-x^4 - 3x^2 - 2x}{(x^3 - 1)^2}$",
            },
            {
              id: 'b',
              text: "$y' = \\frac{2x}{3x^2}$",
            },
            {
              id: 'c',
              text: "$y' = \\frac{5x^4 + 3x^2 - 2x}{(x^3 - 1)^2}$",
            },
            {
              id: 'd',
              text: "$y' = \\frac{-x^4 + 3x^2 - 2x}{(x^3 - 1)^2}$",
            },
          ],
          correctAnswer: 'a',
          hints: [
            'Paso 1: Identifica $u = x^2 + 1 \\implies u\' = 2x$.',
            'Paso 2: Identifica $v = x^3 - 1 \\implies v\' = 3x^2$.',
            'Paso 3: Aplica la fórmula: $y\' = \\frac{u\'v - uv\'}{v^2} = \\frac{2x(x^3 - 1) - (x^2 + 1)(3x^2)}{(x^3 - 1)^2}$.',
            'Paso 4: Expande el numerador: $2x(x^3 - 1) = 2x^4 - 2x$. Luego $(x^2 + 1)(3x^2) = 3x^4 + 3x^2$.',
            'Paso 5: Resta: $(2x^4 - 2x) - (3x^4 + 3x^2) = -x^4 - 3x^2 - 2x$.',
          ],
          fullExplanation:
            "Aplicando la regla del cociente con $u = x^2 + 1$ ($u' = 2x$) y $v = x^3 - 1$ ($v' = 3x^2$): $$y' = \frac{2x(x^3 - 1) - (x^2 + 1)(3x^2)}{(x^3 - 1)^2} = \frac{2x^4 - 2x - (3x^4 + 3x^2)}{(x^3 - 1)^2} = \frac{-x^4 - 3x^2 - 2x}{(x^3 - 1)^2}$$ Factorizando: $y' = \frac{-x(x^3 + 3x + 2)}{(x^3 - 1)^2}$.",
        },
      },
      {
        id: 'reg-3',
        worldId: 'reglas_derivacion',
        number: 3,
        title: 'Misión 3: Regla del Producto con Funciones Trigonométricas',
        subtitle: 'Combinación de radicales algebraicos y cotangente para $g(x) = \\sqrt{x} \\cot x$',
        xpReward: 180,
        videoTitle: 'Video Explicativo: Producto con Funciones Trigonométricas',
        videoDuration: '01:40',
        theory: {
          summary:
            'La derivada de un producto es $(u \\cdot v)\' = u\'v + uv\'. Las derivadas de las funciones trigonométricas fundamentales deben dominarse con precisión, en particular $\\frac{d}{dx} [\\cot x] = -\\csc^2 x$.',
          keyConcepts: [
            {
              title: 'Derivada de la Cotangente',
              explanation: '$\\frac{d}{dx} [\\cot x] = -\\csc^2 x = -\\frac{1}{\\sin^2 x}$.',
            },
            {
              title: 'Estructura de la Regla del Producto',
              explanation: 'Primera derivada por segunda sin derivar MÁS primera sin derivar por segunda derivada.',
            },
          ],
          formulas: [
            {
              label: 'Regla del Producto y Derivada de Cotangente',
              math: "(u \\cdot v)' = u'v + uv', \\qquad \\frac{d}{dx}[\\cot x] = -\\csc^2 x",
              note: 'El signo negativo de la cosecante al cuadrado se distribuye en el segundo término.',
            },
          ],
          proTip: 'Todas las co-funciones trigonométricas ($\\cos, \\cot, \\csc$) tienen derivadas con signo negativo.',
        },
        stepByStepExample: {
          problem: 'Derivar $f(x) = x^3 \\tan x$',
          context: 'Producto de una potencia cúbica y la función tangente.',
          steps: [
            {
              stepNum: 1,
              title: 'Identificar componentes y derivar individualmente',
              calculation: "u = x^3 \\implies u' = 3x^2, \\qquad v = \\tan x \\implies v' = \\sec^2 x",
              rationale: 'Fórmulas directas de derivadas.',
            },
            {
              stepNum: 2,
              title: 'Aplicar $u\'v + uv\'$',
              calculation: "f'(x) = (3x^2)(\\tan x) + (x^3)(\\sec^2 x)",
              rationale: 'Ensamblaje del producto.',
            },
          ],
          finalAnswer: "f'(x) = 3x^2 \\tan x + x^3 \\sec^2 x",
          tip: 'Se puede factorizar $x^2$ como $x^2(3 \\tan x + x \\sec^2 x)$.',
        },
        simulationType: 'critical_points',
        exercise: {
          id: 'ex-reg-3',
          question: 'Hallar la derivada de:',
          mathContext: 'g(x) = \\sqrt{x} \\cot x',
          type: 'multiple_choice',
          options: [
            {
              id: 'a',
              text: "$g'(x) = \\frac{\\cot x}{2\\sqrt{x}} - \\sqrt{x}\\csc^2 x$",
            },
            {
              id: 'b',
              text: "$g'(x) = \\frac{\\cot x}{2\\sqrt{x}} + \\sqrt{x}\\sec^2 x$",
            },
            {
              id: 'c',
              text: "$g'(x) = -\\frac{\\csc^2 x}{2\\sqrt{x}}$",
            },
            {
              id: 'd',
              text: "$g'(x) = \\frac{1}{2\\sqrt{x}}\\csc^2 x$",
            },
          ],
          correctAnswer: 'a',
          hints: [
            'Paso 1: Identifica el producto $u = \\sqrt{x} = x^{1/2}$ y $v = \\cot x$.',
            'Paso 2: Deriva $u$: $u\' = \\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}$.',
            'Paso 3: Deriva $v$: $v\' = -\\csc^2 x$.',
            'Paso 4: Aplica la regla del producto $u\'v + uv\'$: $\\frac{1}{2\\sqrt{x}}\\cot x + \\sqrt{x}(-\\csc^2 x)$.',
            'Paso 5: Agrupa: $g\'(x) = \\frac{\\cot x}{2\\sqrt{x}} - \\sqrt{x}\\csc^2 x$.',
          ],
          fullExplanation:
            "Aplicando la regla del producto $(u \cdot v)' = u'v + uv'$ con $u = \sqrt{x} = x^{1/2}$ y $v = \cot x$. Las derivadas son $u' = \frac{1}{2\sqrt{x}}$ y $v' = -\csc^2 x$. Sustituyendo en la fórmula: $$g'(x) = \left(\frac{1}{2\sqrt{x}}\right)\cot x + \sqrt{x}(-\csc^2 x) = \frac{\cot x}{2\sqrt{x}} - \sqrt{x}\csc^2 x$$",
        },
      },
    ],
  },
  {
    id: 'cadena_implicita',
    number: 4,
    realmName: 'Torres de la Regla de la Cadena y Derivación Implícita',
    title: 'Composición de Funciones, Potencias Compuestas y Derivación Implícita',
    subtitle: 'El Dominio de las Relaciones Complejas y Multivariables',
    description:
      'Aprende a reconocer y derivar funciones compuestas mediante la regla de la cadena, combinar potencias con productos y cocientes, y dominar la técnica de derivación implícita para despejar dy/dx en ecuaciones donde y no está explícitamente despejada.',
    color: 'amber',
    accentColor: '#F59E0B',
    requiredXp: 900,
    image: '/src/assets/images/world_derivatives_mountain_1794159184231.jpg',
    missions: [
      {
        id: 'cad-1',
        worldId: 'cadena_implicita',
        number: 1,
        title: 'Misión 1: Cadena Combinada con Regla del Producto',
        subtitle: 'Factorización de factores comunes tras derivar $f(x) = (2x - 3)^4 (x^2 + x + 1)^5$',
        xpReward: 180,
        videoTitle: 'Video Explicativo: Regla de la Cadena y Factorización',
        videoDuration: '01:55',
        theory: {
          summary:
            'Cuando una función es producto de dos potencias compuestas $u^n \\cdot v^m$, se aplica primero la regla del producto y luego la regla de la cadena a cada factor. Finalmente, se extraen como factor común las potencias menores $u^{n-1}$ y $v^{m-1}$.',
          keyConcepts: [
            {
              title: 'Regla de la Cadena',
              explanation: '$[g(x)^n]\' = n \\cdot g(x)^{n-1} \\cdot g\'(x)$. Nunca olvides multiplicar por la derivada interna $g\'(x)$.',
            },
            {
              title: 'Factorización Rigurosa',
              explanation: 'Extraer los términos comunes simplifica expresiones masivas a un solo polinomio irreducible.',
            },
          ],
          formulas: [
            {
              label: 'Potencia Compuesta y Producto',
              math: "\\frac{d}{dx}[u(x)^n] = n u(x)^{n-1} u'(x), \\qquad (u v)' = u'v + uv'",
              note: 'Multiplica siempre por la derivada interna de cada base.',
            },
          ],
          proTip: 'No expandas los binomios elevados a potencias altas como $(2x - 3)^3$ o $(x^2 + x + 1)^4$; sácalos intactos como factor común.',
        },
        stepByStepExample: {
          problem: 'Derivar y factorizar $g(x) = (x - 1)^3 (2x + 1)^2$',
          context: 'Producto de potencias compuestas.',
          steps: [
            {
              stepNum: 1,
              title: 'Derivar cada factor por la regla de la cadena',
              calculation: "u' = 3(x - 1)^2(1) = 3(x - 1)^2; \\qquad v' = 2(2x + 1)(2) = 4(2x + 1)",
              rationale: 'Derivada de la potencia por derivada interna.',
            },
            {
              stepNum: 2,
              title: 'Aplicar $u\'v + uv\'$',
              calculation: "g'(x) = 3(x - 1)^2(2x + 1)^2 + 4(x - 1)^3(2x + 1)",
              rationale: 'Regla del producto.',
            },
            {
              stepNum: 3,
              title: 'Factorizar término común $(x - 1)^2 (2x + 1)$',
              calculation: "(x - 1)^2(2x + 1) [3(2x + 1) + 4(x - 1)] = (x - 1)^2(2x + 1)(10x - 1)",
              rationale: 'Simplificación algebraica completa.',
            },
          ],
          finalAnswer: "g'(x) = (x - 1)^2 (2x + 1) (10x - 1)",
          tip: 'La expresión factorizada revela directamente los puntos críticos.',
        },
        simulationType: 'critical_points',
        exercise: {
          id: 'ex-cad-1',
          question: 'Obtenga la derivada de la siguiente función:',
          mathContext: 'f(x) = (2x - 3)^4 (x^2 + x + 1)^5',
          type: 'multiple_choice',
          options: [
            {
              id: 'a',
              text: "$f'(x) = (2x - 3)^3 (x^2 + x + 1)^4 (28x^2 - 12x - 7)$",
            },
            {
              id: 'b',
              text: "$f'(x) = 20(2x - 3)^3 (x^2 + x + 1)^4 (2x + 1)$",
            },
            {
              id: 'c',
              text: "$f'(x) = 4(2x - 3)^3 + 5(x^2 + x + 1)^4 (2x + 1)$",
            },
            {
              id: 'd',
              text: "$f'(x) = (2x - 3)^3 (x^2 + x + 1)^4 (18x^2 + 8x - 15)$",
            },
          ],
          correctAnswer: 'a',
          hints: [
            'Paso 1: Aplica regla del producto con $u = (2x - 3)^4$ y $v = (x^2 + x + 1)^5$.',
            'Paso 2: Por regla de la cadena: $u\' = 4(2x - 3)^3 \\cdot 2 = 8(2x - 3)^3$.',
            'Paso 3: Por regla de la cadena: $v\' = 5(x^2 + x + 1)^4 \\cdot (2x + 1)$.',
            'Paso 4: Factoriza el término común $(2x - 3)^3 (x^2 + x + 1)^4$: dentro del corchete queda $8(x^2 + x + 1) + 5(2x - 3)(2x + 1)$.',
            'Paso 5: Expande el corchete: $(8x^2 + 8x + 8) + 5(4x^2 - 4x - 3) = 28x^2 - 12x - 7$.',
          ],
          fullExplanation:
            "Aplicando la regla del producto y de la cadena: $$f'(x) = 8(2x - 3)^3 (x^2 + x + 1)^5 + 5(2x - 3)^4 (x^2 + x + 1)^4 (2x + 1)$$ Factorizando $(2x - 3)^3 (x^2 + x + 1)^4$: $$[8(x^2 + x + 1) + 5(2x - 3)(2x + 1)] = [8x^2 + 8x + 8 + 20x^2 - 20x - 15] = (28x^2 - 12x - 7)$$ Por tanto: $$f'(x) = (2x - 3)^3 (x^2 + x + 1)^4 (28x^2 - 12x - 7)$$",
        },
      },
      {
        id: 'cad-2',
        worldId: 'cadena_implicita',
        number: 2,
        title: 'Misión 2: Cadena con Funciones Trigonométricas Compuestas',
        subtitle: 'Derivación anidada con argumento en producto para $l(x) = \\cot(x \\cos 2x)$',
        xpReward: 190,
        videoTitle: 'Video Explicativo: Regla de la Cadena Anidada en Trigonométricas',
        videoDuration: '01:50',
        theory: {
          summary:
            'Para derivar $\\cot(u)$, la regla de la cadena establece que $\\frac{d}{dx} [\\cot(u)] = -\\csc^2(u) \\cdot u\'. Si el argumento $u$ es a su vez un producto $u = x \\cos(2x)$, se debe aplicar la regla del producto combinada con una segunda regla de la cadena para $\\cos(2x)$.',
          keyConcepts: [
            {
              title: 'Cáscara Externa',
              explanation: '$\\frac{d}{du} [\\cot u] = -\\csc^2 u$. El argumento $u$ permanece intacto dentro de la cosecante al cuadrado.',
            },
            {
              title: 'Núcleo Interno Compuesto',
              explanation: 'Para $u = x \\cos(2x)$, $\\frac{d}{dx} [x \\cos 2x] = (1)\\cos(2x) + x(-\\sin(2x) \\cdot 2) = \\cos(2x) - 2x \\sin(2x)$.',
            },
          ],
          formulas: [
            {
              label: 'Regla de la Cadena Anidada',
              math: "\\frac{d}{dx}[\\cot(u)] = -\\csc^2(u) \\cdot \\frac{du}{dx}",
              note: 'Multiplica por la derivada de todo el bloque interno.',
            },
          ],
          proTip: 'Nunca olvides el factor 2 proveniente de la derivada interna de $2x$ dentro de $\\cos(2x)$.',
        },
        stepByStepExample: {
          problem: 'Derivar $f(x) = \\sin(x^2 \\cos x)$',
          context: 'Argumento interno con regla del producto.',
          steps: [
            {
              stepNum: 1,
              title: 'Derivada externa del seno',
              calculation: "\\frac{d}{du}[\\sin u] = \\cos u = \\cos(x^2 \\cos x)",
              rationale: 'La función externa es el seno.',
            },
            {
              stepNum: 2,
              title: 'Derivar el argumento interno $u = x^2 \\cos x$',
              calculation: "u' = (2x)(\\cos x) + (x^2)(-\\sin x) = 2x \\cos x - x^2 \\sin x",
              rationale: 'Regla del producto.',
            },
            {
              stepNum: 3,
              title: 'Multiplicar ambos factores',
              calculation: "f'(x) = \\cos(x^2 \\cos x) \\cdot (2x \\cos x - x^2 \\sin x)",
              rationale: 'Regla de la cadena completa.',
            },
          ],
          finalAnswer: "f'(x) = \\cos(x^2 \\cos x) \\cdot (2x \\cos x - x^2 \\sin x)",
          tip: 'Conserva los paréntesis del segundo factor.',
        },
        simulationType: 'critical_points',
        exercise: {
          id: 'ex-cad-2',
          question: 'Hallar la derivada de la siguiente función:',
          mathContext: 'l(x) = \\cot(x \\cos 2x)',
          type: 'multiple_choice',
          options: [
            {
              id: 'a',
              text: "$l'(x) = -\\csc^2(x \\cos 2x) \\cdot (\\cos 2x - 2x \\sin 2x)$",
            },
            {
              id: 'b',
              text: "$l'(x) = -\\csc^2(x \\cos 2x) \\cdot (-\\sin 2x)$",
            },
            {
              id: 'c',
              text: "$l'(x) = \\sec^2(x \\cos 2x) \\cdot (\\cos 2x + 2x \\sin 2x)$",
            },
            {
              id: 'd',
              text: "$l'(x) = -\\csc^2(x \\cos 2x) \\cdot \\cos 2x$",
            },
          ],
          correctAnswer: 'a',
          hints: [
            'Paso 1: La función externa es $\\cot(u)$. Su derivada es $-\\csc^2(u)$.',
            'Paso 2: El argumento interno es $u = x \\cos(2x)$.',
            'Paso 3: Deriva $u$ aplicando la regla del producto: $u\' = \\frac{d}{dx} [x] \\cdot \\cos(2x) + x \\cdot \\frac{d}{dx} [\\cos(2x)]$.',
            'Paso 4: Como $\\frac{d}{dx} [\\cos 2x] = -\\sin(2x) \\cdot 2 = -2 \\sin(2x)$, entonces $u\' = \\cos(2x) - 2x \\sin(2x)$.',
            'Paso 5: Multiplica la derivada externa por la derivada interna: $l\'(x) = -\\csc^2(x \\cos 2x) \\cdot (\\cos 2x - 2x \\sin 2x)$.',
          ],
          fullExplanation:
            "Por regla de la cadena, si $l(x) = \cot(u)$, entonces $l'(x) = -\csc^2(u) \cdot u'$. Aquí el argumento es $u = x \cos(2x)$. Aplicando la regla del producto para derivar $u$: $$u' = (1)\cos(2x) + x[-\sin(2x) \cdot 2] = \cos(2x) - 2x \sin(2x)$$ Multiplicando ambos resultados obtenemos: $$l'(x) = -\csc^2(x \cos 2x) \cdot (\cos 2x - 2x \sin 2x)$$",
        },
      },
      {
        id: 'cad-3',
        worldId: 'cadena_implicita',
        number: 3,
        title: 'Misión 3: Técnica de Derivación Implícita',
        subtitle: 'Despeje de $\\frac{dy}{dx}$ en $x^3 - xy^2 + y^3 = 1$',
        xpReward: 200,
        videoTitle: 'Video Explicativo: Derivación Implícita Completa',
        videoDuration: '01:55',
        theory: {
          summary:
            'Cuando una ecuación relaciona $x$ e $y$ sin que $y$ esté explícitamente despejada, derivamos ambos lados término a término respecto a $x$. Siempre que se derive una expresión con $y$, se multiplica por $\\frac{dy}{dx}$ (o $y\') por la regla de la cadena. Finalmente se factoriza y despeja $\\frac{dy}{dx}$.',
          keyConcepts: [
            {
              title: 'Derivada de Expresiones en $y$',
              explanation: '$\\frac{d}{dx} [y^n] = n y^{n-1} \\cdot \\frac{dy}{dx}$. En particular, $\\frac{d}{dx} [y^2] = 2y y\'$, y $\\frac{d}{dx} [y] = y\'$.',
            },
            {
              title: 'Términos Mixtos $xy$',
              explanation: 'Para $\\frac{d}{dx} [xy^2]$, aplica la regla del producto: $(1)y^2 + x(2y y\') = y^2 + 2xy y\'$.',
            },
          ],
          formulas: [
            {
              label: 'Regla de Derivación Implícita',
              math: "\\frac{d}{dx}[f(y)] = f'(y) \\cdot \\frac{dy}{dx}",
              note: 'Agrupa todos los términos con $\\frac{dy}{dx}$ a la izquierda y despeja.',
            },
          ],
          proTip: 'Presta atención a los signos al derivar términos precedidos de menos como $-xy^2$; el signo afecta a todo el producto.',
        },
        stepByStepExample: {
          problem: 'Hallar $\\frac{dy}{dx}$ para $x^2 + y^2 = 25$ (circunferencia)',
          context: 'Derivación implícita estándar.',
          steps: [
            {
              stepNum: 1,
              title: 'Derivar ambos lados respecto a $x$',
              calculation: "\\frac{d}{dx}[x^2] + \\frac{d}{dx}[y^2] = \\frac{d}{dx}[25] \\implies 2x + 2y y' = 0",
              rationale: 'La derivada de la constante 25 es 0.',
            },
            {
              stepNum: 2,
              title: 'Aislar el término con $y\'$',
              calculation: "2y y' = -2x",
              rationale: 'Restamos $2x$ a ambos lados.',
            },
            {
              stepNum: 3,
              title: 'Despejar $y\'$',
              calculation: "y' = \\frac{-2x}{2y} = -\\frac{x}{y}",
              rationale: 'Simplificamos dividiendo entre 2.',
            },
          ],
          finalAnswer: '$\\frac{dy}{dx} = -\\frac{x}{y}$',
          tip: 'La pendiente de una curva implícita depende tanto de $x$ como de $y$.',
        },
        simulationType: 'secant_tangent',
        exercise: {
          id: 'ex-cad-3',
          question: 'Encuentre $\\frac{dy}{dx}$ por derivación implícita:',
          mathContext: 'x^3 - xy^2 + y^3 = 1',
          type: 'multiple_choice',
          options: [
            {
              id: 'a',
              text: '$\\frac{dy}{dx} = \\frac{y^2 - 3x^2}{3y^2 - 2xy}$',
            },
            {
              id: 'b',
              text: '$\\frac{dy}{dx} = \\frac{3x^2 - y^2}{3y^2 - 2y}$',
            },
            {
              id: 'c',
              text: '$\\frac{dy}{dx} = \\frac{3x^2 + y^2}{2xy - 3y^2}$',
            },
            {
              id: 'd',
              text: '$\\frac{dy}{dx} = \\frac{y^2 - 3x^2}{2xy - 3y^2}$',
            },
          ],
          correctAnswer: 'a',
          hints: [
            'Paso 1: Deriva término a término respecto a $x$: $\\frac{d}{dx} [x^3] = 3x^2$.',
            'Paso 2: Deriva el producto $-xy^2$: $-[ (1)y^2 + x(2y y\') ] = -y^2 - 2xy y\'$.',
            'Paso 3: Deriva $y^3$: $3y^2 y\'$. La derivada del lado derecho ($1$) es $0$.',
            'Paso 4: La ecuación resultante es: $3x^2 - y^2 - 2xy y\' + 3y^2 y\' = 0$.',
            'Paso 5: Agrupa los términos con $y\': y\'(3y^2 - 2xy) = y^2 - 3x^2$.',
            'Paso 6: Despeja $y\': y\' = \\frac{y^2 - 3x^2}{3y^2 - 2xy}$.',
          ],
          fullExplanation:
            "Derivando implícitamente respecto a $x$: $$\frac{d}{dx}[x^3] - \frac{d}{dx}[xy^2] + \frac{d}{dx}[y^3] = \frac{d}{dx}[1] \implies 3x^2 - (y^2 + 2xy y') + 3y^2 y' = 0$$ Agrupando términos con $y'$: $$y'(3y^2 - 2xy) = y^2 - 3x^2 \implies \frac{dy}{dx} = \frac{y^2 - 3x^2}{3y^2 - 2xy}$$",
        },
      },
    ],
  },
  {
    id: 'inversas_logaritmos',
    number: 5,
    realmName: 'Montaña de las Inversas y Logaritmos',
    title: 'Trigonométricas Inversas, Propiedades Logarítmicas y Derivación Logarítmica',
    subtitle: 'La Cima de las Funciones Trascendentes',
    description:
      'Conquista las derivadas de funciones trigonométricas inversas (arcotangente), aprovecha las propiedades algebraicas de logaritmos antes de derivar cocientes y raíces, y domina la poderosa técnica de derivación logarítmica para funciones de la forma f(x)ᵍ⁽ˣ⁾.',
    color: 'quest-gold',
    accentColor: '#F59E0B',
    requiredXp: 1300,
    image: '/src/assets/images/world_derivatives_mountain_1794159184231.jpg',
    missions: [
      {
        id: 'inv-1',
        worldId: 'inversas_logaritmos',
        number: 1,
        title: 'Misión 1: Derivadas de Funciones Trigonométricas Inversas',
        subtitle: 'Derivación de arcotangente con argumento radical para $y = \\tan^{-1}(\\sqrt{x})$',
        xpReward: 200,
        videoTitle: 'Video Explicativo: Derivada de Trigonométricas Inversas',
        videoDuration: '01:35',
        theory: {
          summary:
            'Las funciones trigonométricas inversas se derivan mediante identidades algebraicas. En particular, $\\frac{d}{du} [\\tan^{-1}(u)] = \\frac{1}{1 + u^2}$. Al aplicar la regla de la cadena con $u = g(x)$, se multiplica por $g\'(x)$.',
          keyConcepts: [
            {
              title: 'Derivada del Arcotangente',
              explanation: '$\\frac{d}{dx} [\\tan^{-1}(u)] = \\frac{u\'}{1 + u^2}$. No involucra radicales en el denominador a diferencia del $\\arcsin$ o $\\arccos$.',
            },
            {
              title: 'Simplificación de $(\\sqrt{x})^2$',
              explanation: 'Para $x > 0$, $(\\sqrt{x})^2 = x$, lo que simplifica directamente $1 + u^2$ a $1 + x$.',
            },
          ],
          formulas: [
            {
              label: 'Derivada de la Función Arcotangente Compuesta',
              math: "\\frac{d}{dx}[\\tan^{-1}(u)] = \\frac{1}{1 + u^2} \\cdot \\frac{du}{dx}",
              note: 'Válida para todo valor real de $u$.',
            },
          ],
          proTip: 'Recuerda que $\\tan^{-1}(x)$ representa el ángulo cuya tangente es $x$ (arcotangente), NO $\\frac{1}{\\tan(x)}$.',
        },
        stepByStepExample: {
          problem: 'Derivar $f(x) = \\tan^{-1}(3x)$',
          context: 'Regla de la cadena con argumento lineal.',
          steps: [
            {
              stepNum: 1,
              title: 'Identificar $u$ y su derivada',
              calculation: "u = 3x \\implies u' = 3",
              rationale: 'Derivada del argumento.',
            },
            {
              stepNum: 2,
              title: 'Calcular $u^2$',
              calculation: "u^2 = (3x)^2 = 9x^2",
              rationale: 'Elevar al cuadrado el argumento completo.',
            },
            {
              stepNum: 3,
              title: 'Aplicar la fórmula $\\frac{1}{1 + u^2} \\cdot u\'$',
              calculation: "f'(x) = \\frac{1}{1 + 9x^2} \\cdot 3 = \\frac{3}{1 + 9x^2}",
              rationale: 'Sustitución directa.',
            },
          ],
          finalAnswer: "f'(x) = \\frac{3}{1 + 9x^2}",
          tip: 'No olvides elevar al cuadrado el coeficiente: $(3x)^2 = 9x^2$.',
        },
        simulationType: 'secant_tangent',
        exercise: {
          id: 'ex-inv-1',
          question:
            'Determine la derivada de la siguiente función. Simplifique donde sea posible:',
          mathContext: 'y = \\tan^{-1}\\sqrt{x}',
          type: 'multiple_choice',
          options: [
            {
              id: 'a',
              text: "$y' = \\frac{1}{2\\sqrt{x}(1 + x)}$",
            },
            {
              id: 'b',
              text: "$y' = \\frac{1}{1 + x}$",
            },
            {
              id: 'c',
              text: "$y' = \\frac{1}{2\\sqrt{x}\\sqrt{1 - x}}$",
            },
            {
              id: 'd',
              text: "$y' = \\frac{1}{2(1 + x^2)}$",
            },
          ],
          correctAnswer: 'a',
          hints: [
            'Paso 1: La fórmula de la derivada de $\\tan^{-1}(u)$ es $\\frac{1}{1 + u^2} \\cdot u\'$.',
            'Paso 2: Aquí $u = \\sqrt{x}$, por lo que $u^2 = (\\sqrt{x})^2 = x$.',
            'Paso 3: La derivada interna es $u\' = \\frac{d}{dx} [\\sqrt{x}] = \\frac{1}{2\\sqrt{x}}$.',
            'Paso 4: Multiplica: $y\' = \\frac{1}{1 + x} \\cdot \\frac{1}{2\\sqrt{x}} = \\frac{1}{2\\sqrt{x}(1 + x)}$.',
          ],
          fullExplanation:
            "Utilizando la regla de la cadena para la función arcotangente $\frac{d}{dx}[\tan^{-1}(u)] = \frac{1}{1 + u^2} \cdot \frac{du}{dx}$. En este caso $u = \sqrt{x}$, de modo que $u^2 = (\sqrt{x})^2 = x$, y $\frac{du}{dx} = \frac{1}{2\sqrt{x}}$. Multiplicando ambos términos: $$y' = \frac{1}{1 + (\sqrt{x})^2} \cdot \frac{1}{2\sqrt{x}} = \frac{1}{2\sqrt{x}(1 + x)}$$",
        },
      },
      {
        id: 'inv-2',
        worldId: 'inversas_logaritmos',
        number: 2,
        title: 'Misión 2: Propiedades de Logaritmos antes de Derivar',
        subtitle: 'Descomposición logarítmica para simplificar $g(x) = \\ln(x \\sqrt{x^2 - 1})$',
        xpReward: 220,
        videoTitle: 'Video Explicativo: Propiedades de Logaritmos al Derivar',
        videoDuration: '01:45',
        theory: {
          summary:
            'Antes de derivar una función logarítmica compleja, es indispensable expandirla usando las leyes de los logaritmos: $\\ln(AB) = \\ln A + \\ln B$, $\\ln(A/B) = \\ln A - \\ln B$, y $\\ln(A^r) = r \\ln A$. Esto convierte derivadas complejas de productos y raíces en simples sumas de derivadas elementales.',
          keyConcepts: [
            {
              title: 'Leyes de los Logaritmos',
              explanation: '$\\ln(x \\cdot (x^2 - 1)^{1/2}) = \\ln(x) + \\frac{1}{2}\\ln(x^2 - 1)$. Elimina por completo la necesidad de la regla del producto y de la raíz.',
            },
            {
              title: 'Derivada del Logaritmo Natural',
              explanation: '$\\frac{d}{dx} [\\ln u] = \\frac{u\'}{u}$.',
            },
          ],
          formulas: [
            {
              label: 'Derivada del Logaritmo Compuesto',
              math: "\\frac{d}{dx}[\\ln(u)] = \\frac{u'}{u}, \\qquad \\ln(A \\cdot B^r) = \\ln A + r \\ln B",
              note: 'Expandir antes de derivar ahorra hasta el 80% del trabajo algebraico.',
            },
          ],
          proTip: 'Siempre expande logaritmos de productos, cocientes o potencias antes de calcular la derivada.',
        },
        stepByStepExample: {
          problem: 'Derivar $f(x) = \\ln\\left(\\frac{x + 1}{x - 1}\\right)$',
          context: 'Expandimos usando la ley del cociente $\\ln(A/B) = \\ln A - \\ln B$.',
          steps: [
            {
              stepNum: 1,
              title: 'Expandir usando propiedades de logaritmos',
              calculation: 'f(x) = \\ln(x + 1) - \\ln(x - 1)',
              rationale: 'Resta de logaritmos.',
            },
            {
              stepNum: 2,
              title: 'Derivar término a término',
              calculation: "f'(x) = \\frac{1}{x + 1} - \\frac{1}{x - 1}",
              rationale: 'Derivada de $\\ln(u)$ es $\\frac{u\'}{u}$.',
            },
            {
              stepNum: 3,
              title: 'Efectuar la resta de fracciones',
              calculation: "\\frac{(x - 1) - (x + 1)}{(x + 1)(x - 1)} = \\frac{-2}{x^2 - 1}",
              rationale: 'Denominador común $x^2 - 1$.',
            },
          ],
          finalAnswer: "f'(x) = -\\frac{2}{x^2 - 1}",
          tip: 'Mucho más rápido que derivar $\\ln(u)$ con la regla del cociente directa.',
        },
        simulationType: 'critical_points',
        exercise: {
          id: 'ex-inv-2',
          question: 'Derive la función:',
          mathContext: 'g(x) = \\ln\\left(x\\sqrt{x^2 - 1}\\right)',
          type: 'multiple_choice',
          options: [
            {
              id: 'a',
              text: "$g'(x) = \\frac{2x^2 - 1}{x(x^2 - 1)}$",
            },
            {
              id: 'b',
              text: "$g'(x) = \\frac{1}{x\\sqrt{x^2 - 1}}$",
            },
            {
              id: 'c',
              text: "$g'(x) = \\frac{x^2 + 1}{x(x^2 - 1)}$",
            },
            {
              id: 'd',
              text: "$g'(x) = \\frac{2x}{x^2 - 1}$",
            },
          ],
          correctAnswer: 'a',
          hints: [
            'Paso 1: Expande el argumento usando propiedades de logaritmos: $\\ln(x \\cdot (x^2 - 1)^{1/2}) = \\ln x + \\frac{1}{2} \\ln(x^2 - 1)$.',
            'Paso 2: Deriva $\\ln x$: da $\\frac{1}{x}$.',
            'Paso 3: Deriva $\\frac{1}{2} \\ln(x^2 - 1)$: da $\\frac{1}{2} \\cdot \\frac{2x}{x^2 - 1} = \\frac{x}{x^2 - 1}$.',
            'Paso 4: Suma ambas fracciones: $\\frac{1}{x} + \\frac{x}{x^2 - 1}$.',
            'Paso 5: Saca común denominador $x(x^2 - 1)$: $\\frac{(x^2 - 1) + x^2}{x(x^2 - 1)} = \\frac{2x^2 - 1}{x(x^2 - 1)}$.',
          ],
          fullExplanation:
            "Expandiendo previamente mediante las leyes logarítmicas: $$g(x) = \ln(x) + \frac{1}{2}\ln(x^2 - 1)$$ Derivando directamente término a término: $$g'(x) = \frac{1}{x} + \frac{1}{2} \cdot \frac{2x}{x^2 - 1} = \frac{1}{x} + \frac{x}{x^2 - 1}$$ Reduciendo a un denominador común: $$g'(x) = \frac{(x^2 - 1) + x^2}{x(x^2 - 1)} = \frac{2x^2 - 1}{x(x^2 - 1)}$$",
        },
      },
      {
        id: 'inv-3',
        worldId: 'inversas_logaritmos',
        number: 3,
        title: 'Misión 3: Técnica de Derivación Logarítmica',
        subtitle: 'Derivación de potencias $f(x)^{g(x)}$ para $y = (e^{x^2} + 1)^x$',
        xpReward: 250,
        videoTitle: 'Video Explicativo: Derivación Logarítmica Avanzada',
        videoDuration: '02:00',
        theory: {
          summary:
            'Cuando una función tiene tanto la base como el exponente variables, de la forma $y = [f(x)]^{g(x)}$, NO se puede usar la regla de la potencia ni la regla de la exponencial fija. Se debe aplicar el logaritmo natural a ambos lados: $\\ln y = g(x) \\ln[f(x)]$, derivar implícitamente respecto a $x$ y luego multiplicar todo por $y$.',
          keyConcepts: [
            {
              title: 'Pasos de la Derivación Logarítmica',
              explanation: '1) Tomar $\\ln$ a ambos miembros. 2) Bajar el exponente con $\\ln(A^b) = b \\ln A$. 3) Derivar implícitamente $\\frac{y\'}{y}$. 4) Multiplicar por $y$ para aislar $y\'$.',
            },
            {
              title: 'Derivada de $\\ln(e^{x^2} + 1)$',
              explanation: 'Por regla de la cadena, $\\frac{d}{dx} [e^{x^2} + 1] = 2x e^{x^2}$. Por tanto $\\frac{d}{dx} [\\ln(e^{x^2} + 1)] = \\frac{2x e^{x^2}}{e^{x^2} + 1}$.',
            },
          ],
          formulas: [
            {
              label: 'Fórmula de Derivación Logarítmica',
              math: "\\ln y = g(x) \\ln(f(x)) \\implies \\frac{y'}{y} = g'(x)\\ln(f(x)) + g(x)\\frac{f'(x)}{f(x)} \\implies y' = y \\cdot [\\dots]",
              note: 'Es el único método riguroso para derivar funciones con exponente variable.',
            },
          ],
          proTip: 'Al final nunca olvides sustituir $y$ por su expresión original en términos de $x$.',
        },
        stepByStepExample: {
          problem: 'Calcular la derivada de $y = x^x$',
          context: 'Función con base y exponente variables.',
          steps: [
            {
              stepNum: 1,
              title: 'Aplicar logaritmo natural a ambos lados',
              calculation: '\\ln y = \\ln(x^x) = x \\ln x',
              rationale: 'El exponente $x$ baja multiplicando.',
            },
            {
              stepNum: 2,
              title: 'Derivar implícitamente respecto a $x$',
              calculation: "\\frac{y'}{y} = (1)\\ln x + x\\left(\\frac{1}{x}\\right) = \\ln x + 1",
              rationale: 'Regla del producto en el lado derecho.',
            },
            {
              stepNum: 3,
              title: 'Multiplicar por $y$',
              calculation: "y' = y(\\ln x + 1) = x^x(\\ln x + 1)",
              rationale: 'Sustituimos $y = x^x$.',
            },
          ],
          finalAnswer: "y' = x^x (\\ln x + 1)",
          tip: 'No se puede derivar como $x \\cdot x^{x-1}$ ni como $x^x \\ln x$ por separado.',
        },
        simulationType: 'critical_points',
        exercise: {
          id: 'ex-inv-3',
          question: 'Calcular la derivada de la siguiente función:',
          mathContext: 'y = \\left(e^{x^2} + 1\\right)^x',
          type: 'multiple_choice',
          options: [
            {
              id: 'a',
              text: "$y' = \\left(e^{x^2} + 1\\right)^x \\left[ \\ln\\left(e^{x^2} + 1\\right) + \\frac{2x^2 e^{x^2}}{e^{x^2} + 1} \\right]$",
            },
            {
              id: 'b',
              text: "$y' = x \\left(e^{x^2} + 1\\right)^{x-1} \\cdot (2x e^{x^2})$",
            },
            {
              id: 'c',
              text: "$y' = \\left(e^{x^2} + 1\\right)^x \\ln\\left(e^{x^2} + 1\\right)$",
            },
            {
              id: 'd',
              text: "$y' = \\left(e^{x^2} + 1\\right)^x \\left[ 1 + \\frac{2x e^{x^2}}{e^{x^2} + 1} \\right]$",
            },
          ],
          correctAnswer: 'a',
          hints: [
            'Paso 1: Aplica logaritmo natural a ambos miembros: $\\ln y = \\ln\\left[(e^{x^2} + 1)^x\\right] = x \\cdot \\ln(e^{x^2} + 1)$.',
            'Paso 2: Deriva implícitamente respecto a $x$. El lado izquierdo da $\\frac{y\'}{y}$.',
            'Paso 3: El lado derecho es un producto $u \\cdot v$ con $u = x$ y $v = \\ln(e^{x^2} + 1)$: $u\'v + uv\'$.',
            'Paso 4: $u\'v = (1) \\cdot \\ln(e^{x^2} + 1)$.',
            'Paso 5: $uv\' = x \\cdot \\left[ \\frac{2x e^{x^2}}{e^{x^2} + 1} \\right] = \\frac{2x^2 e^{x^2}}{e^{x^2} + 1}$.',
            'Paso 6: Despeja $y\'$ multiplicando por $y = (e^{x^2} + 1)^x$.',
          ],
          fullExplanation:
            "Como tanto la base como el exponente dependen de $x$, empleamos derivación logarítmica. Tomando logaritmo natural en ambos lados: $$\ln y = x \ln\left(e^{x^2} + 1\right)$$ Derivando implícitamente respecto a $x$ con la regla del producto: $$\frac{y'}{y} = (1)\ln\left(e^{x^2} + 1\right) + x \cdot \left[\frac{2x e^{x^2}}{e^{x^2} + 1}\right]$$ Multiplicando ambos lados por $y = (e^{x^2} + 1)^x$: $$y' = \left(e^{x^2} + 1\right)^x \left[ \ln\left(e^{x^2} + 1\right) + \frac{2x^2 e^{x^2}}{e^{x^2} + 1} \right]$$",
        },
      },
    ],
  },
];
