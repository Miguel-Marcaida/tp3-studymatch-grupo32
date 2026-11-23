# TP3 — StudyMatch. · Equipo 32 (IFTS 29)

## 1. Identificación del proyecto
- **Institución y equipo:** IFTS 29 · Desarrollo de Sistemas Web Front End · Equipo 32
- **Startup asignada (origen IFTS 16):** **StudyMatch.** — *Educación y colaboración*
- **Síntesis del servicio:** *"Conectamos estudiantes para estudiar juntos."* Red colaborativa que conecta estudiantes según sus materias, temas de interés, necesidades académicas y disponibilidad horaria y de modalidad.
- **Bloque asignado:** `S13-A` — Perfil y búsqueda
- **Alcance del trabajo:** Landing page estática e interactiva que modela conceptualmente y representa de forma gráfica y accesible dos propuestas agénticas (`R1` y `R2`) mediante diagramas de flujo interactivos, fichas técnicas desplegables y ventana modal accesible. **No** integra agentes autónomos en ejecución, ni backend, ni conexión a APIs reales en producción.

---

## 2. Participación del grupo y revisión colaborativa

### Integrantes y aportes concretos
- **Miguel Angel Marcaida:** Coordinación de instrucciones y *prompts* en el entorno agéntico (Antigravity), control de integración de recursos gráficos en `assets/`, supervisión de iteraciones de diseño responsive y despliegue del sitio en Vercel.
- **Sergio Cesar Barrientos:** Relevamiento inicial de la startup **StudyMatch.**, análisis estructural y descomposición lógica de la sentencia `R1` ($p \land q \land r$), definición del flujo de consulta a base de datos y validación de compatibilidad de perfiles.
- **Carolina Silva Cotto:** Análisis estructural y descomposición lógica de la sentencia `R2` ($\neg p \lor \neg q \lor \neg r$), redacción de propuestas de valor, beneficios para el usuario y estructura de contenidos de las fichas técnicas desplegables.
- **Mariana Sosa:** Definición de casos límite, excepciones, puntos de interacción humana, formulación de la orientación por tutor académico en `R2` y sistematización de las decisiones propias del grupo (validación temporal de franjas horarias y búsquedas sin coincidencias).
- **Karina Sanchez:** Control de calidad (QA) multiplataforma (escritorio y móvil), verificación de contraste cromático respecto al logotipo oficial de StudyMatch, pruebas de accesibilidad WAI-ARIA (clic y teclado) en menú hamburguesa, acordeones y modal, y revisión integral del `README.md` frente a la rúbrica institucional.

### Revisión entre integrantes y mejoras aplicadas
- **Revisión lógica entre integrantes:** Al contrastar el relevamiento inicial entre los integrantes, se detectó que en la formalización de `R2` se había propuesto definir una variable en negativo (*"no completó modalidad"*), lo que confundía la proposición atómica con el conectivo lógico. Asimismo, en `R1` la consulta a la base de datos figuraba erróneamente como *Decisión* en lugar de *Acción*.
- **Mejora lógica incorporada:** Se unificaron las proposiciones en afirmativo ($p$: completó tema de estudio, $q$: completó disponibilidad, $r$: completó modalidad), dejando la negación exclusivamente en el antecedente disyuntivo de `R2` ($\neg p \lor \neg q \lor \neg r$) y se reclasificó la consulta a la base de datos como una acción de consulta de herramienta.
- **Revisión conceptual en R2:** El equipo debatió la naturaleza de la interacción en `R2` y determinó que completar los campos faltantes es una simple **acción del estudiante (usuario)** indispensable para que el flujo avance, y que la verdadera **intervención humana** debía modelarse como una *decisión propia del grupo*: la posibilidad opcional de solicitar asistencia y criterio pedagógico a un **tutor académico humano**.

---

## 3. Sentencias, propuestas agénticas y decisiones del grupo

### Propuesta 1 · Buscador inteligente (`R1`)
- **Sentencia original (R1):** *"Si el estudiante completó tema de estudio, disponibilidad y modalidad, el sistema busca compañeros con esas condiciones compatibles."*
- **Lógica formal:** $p \land q \land r$  
  - $p$: El estudiante completó tema de estudio.  
  - $q$: El estudiante completó disponibilidad horaria.  
  - $r$: El estudiante completó modalidad (presencial/virtual).
- **Propuesta y beneficio:** Un agente de búsqueda inteligente recibe el perfil del usuario, valida que la conjunción lógica sea verdadera y consulta la base de datos de perfiles de **StudyMatch.** devolviendo una lista priorizada de compañeros compatibles. Beneficio: elimina búsquedas manuales desorganizadas y conecta rápidamente con pares afines.
- **Herramienta consultada:** Base de datos de perfiles de estudiantes de **StudyMatch.**
- **Intervención humana:** El agente sugiere las coincidencias, pero la decisión final de enviar solicitud o conectarse con un compañero recae de forma exclusiva y autónoma en el estudiante.

### Propuesta 2 · Asistente de perfil (`R2`)
- **Sentencia original (R2):** *"Si falta alguno de esos datos, el sistema solicita completarlo y explica que todavía no puede realizar la búsqueda."*
- **Lógica formal:** $\neg p \lor \neg q \lor \neg r$ (se activa preventivamente cuando falta al menos uno de los tres datos requeridos).
- **Propuesta y beneficio:** Un agente asistente de perfil inspecciona los datos ingresados, identifica con precisión cuáles campos faltan, solicita completarlos de manera amigable y explica didácticamente por qué aún no es posible iniciar la búsqueda. Beneficio: evita frustración, previene consultas fallidas y orienta al estudiante en la construcción de su perfil.
- **Herramienta consultada:** Formulario interactivo de ingreso de datos de **StudyMatch.** (no realiza consultas innecesarias a la base de datos de compañeros, optimizando cómputo y cuidando la privacidad).
- **Diferenciación conceptual: Acción del estudiante vs. Intervención humana:**
  - **Acción del estudiante (acción del usuario):** El estudiante completa o corrige personalmente los datos faltantes en el formulario para destrabar el flujo. Es una acción requerida del usuario, no una supervisión ni juicio humano.
  - **Intervención humana (Decisión del grupo):** Se incorporó la opción de que el estudiante pueda solicitar orientación o acompañamiento personalizado a un **tutor académico humano** (docente o tutor del IFTS) para disipar dudas sobre materias o disponibilidad. Esta opción es una *decisión del Grupo 32* (no proviene de la regla original) y garantiza criterio y empatía humana.

### Decisiones propias del grupo (supuestos no definidos en R1 ni R2)
| Decisión / Supuesto adicional | Criterio adoptado por el Equipo 32 | Justificación pedagógica y técnica |
| :--- | :--- | :--- |
| **1. Reevaluación automática de R1** | Una vez que el estudiante completa los datos faltantes solicitados por `R2`, el sistema reevalúa automáticamente la condición de `R1`. | Evita fricciones; el usuario no necesita recargar la página ni reiniciar el proceso desde cero. |
| **2. Búsqueda sin coincidencias** | Si la consulta de `R1` arroja cero compañeros compatibles, el agente informa amablemente y sugiere alternativas (ej. ampliar franjas horarias o revisar modalidad). | Las sentencias no contemplan el caso de cero resultados; el equipo diseñó una salida guiada constructiva. |
| **3. Validación lógica de disponibilidad** | Se restringe el formato horario a `desde: hh:mm hasta: hh:mm` comprobando horas válidas (00-23), minutos válidos (00-59) y que la hora inicial sea anterior a la final (`h_ini < h_fin`). | Previene incongruencias temporales previas a la búsqueda algorítmica. |
| **4. Selección autónoma de compañeros** | El sistema presenta los perfiles compatibles, pero no fuerza emparejamientos automáticos; el estudiante decide a quién contactar. | Preserva la autonomía, el consentimiento y la privacidad de los estudiantes. |
| **5. Orientación con tutor académico en R2** | Se brinda la opción de solicitar orientación a un tutor académico ante perfiles incompletos o dudas académicas complejas. | Diferencia la simple carga de formulario por el usuario de una verdadera intervención humana reflexiva. |

---

## 4. Herramientas de IA, aplicaciones y modelos utilizados

El desarrollo de este trabajo se llevó a cabo siguiendo una metodología **100 % agéntica**, sin edición manual directa de archivos de código fuente por parte de los integrantes, operando mediante especificación de requerimientos, supervisión de resultados y solicitudes iterativas de corrección.

- **Entorno de desarrollo agéntico:** Google Antigravity IDE.
- **Modelos de lenguaje aplicados:**
  - `Claude Sonnet 4.6 (Thinking)` (Anthropic): Empleado en la arquitectura semántica inicial de `index.html`, maquetación de los diagramas de flujo SVG nativos y diseño del patrón WAI-ARIA de acordeones y modales accesibles en `script.js`.
  - `Gemini 3.8 Flash High` (Google DeepMind): Empleado en la refinación de hojas de estilo (`styles.css`), adaptación estética a la paleta auténtica del logotipo de StudyMatch, construcción del menú hamburguesa móvil animado y consolidación técnica del contenido y la documentación.
- **Chat de asistencia y refinamiento agéntico continuo:** Este canal de conversación sirvió como interfaz directa de revisión y co-creación, donde cada devolución del agente fue inspeccionada frente a la rúbrica del IFTS 29 y corregida progresivamente.

### Origen transparente de los aportes: Equipo vs. Asistente IA
| Dimensión | Aporte originado en la revisión del Equipo 32 (Criterio Humano) | Aporte originado en el Chat de Asistencia Agéntica (IA) |
| :--- | :--- | :--- |
| **Lógica y reglas** | Detección del error en el signo de la variable $r$; corrección de la formalización a afirmativa ($p, q, r$) y antecedente de R2 a $\neg p \lor \neg q \lor \neg r$. Reclasificación de consulta como Acción. | Propuesta de renderizado KaTeX y diseño visual de píldoras lógicas con alto contraste para las fórmulas. |
| **Intervención humana** | Formulación de la distinción conceptual entre "acción de carga del estudiante" e "intervención humana", añadiendo la opción de tutor académico como decisión propia del grupo. | Implementación gráfica en el diagrama SVG de R2 y estructuración accesible en la ficha técnica desplegable. |
| **Identidad visual** | Rechazo de la paleta verde oscura/neón generada inicialmente por la IA; exigencia de adoptar los colores auténticos del logo oficial en `assets/` (azul cobalto, turquesa, dorado y carbón sobre marfil limpio). | Cálculo de variables CSS semánticas (`:root` y `[data-theme="dark"]`), sombras suaves y soporte de alternancia de tema Claro/Oscuro con persistencia. |
| **Navegación y UX** | Exigencia de mantener la barra superior en escritorio en una sola línea estricta (`nowrap`) y reemplazo en móvil por menú hamburguesa con 3 rayitas visibles. | Código CSS de las barras animadas (.bar), clase `.sr-only` para lectores de pantalla y lógica de cierre con Escape y clic externo en JavaScript. |
| **Visualización de diagramas** | Requerimiento de tamaño mínimo para evitar deformación de SVGs y demanda de un modal para visualizarlos en pantalla completa en cualquier dispositivo. | Clonado dinámico del nodo SVG al modal (`cloneNode`), bloqueo de desplazamiento de fondo (`modal-open`) y gestión de foco accesible. |

---

## 5. Cómo reproducir el proyecto

### Herramientas y tecnologías utilizadas
- **HTML5:** Marcado semántico (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<aside>`, `<footer>`), atributos ARIA (`aria-expanded`, `aria-controls`, `aria-label`, `aria-modal`) y roles accesibles.
- **CSS3:** Variables CSS nativas, temas claro y oscuro, Flexbox, CSS Grid, media queries para diseño responsivo, transformaciones y animaciones fluidas sin dependencias externas.
- **Vanilla JavaScript (ES6+):** Código nativo sin frameworks (React, Vue, etc.) ni librerías externas. Gestión de eventos de teclado (Escape, Enter, Espacio, Flechas), alternador de tema con `localStorage`, menú móvil y modal accesible.
- **Gráficos SVG:** Diagramas de flujo vectoriales nítidos con escalabilidad independiente de resolución, marcadores direccionales y etiquetas legibles.

### Estructura real de carpetas del repositorio
```text
tp3-studymatch-grupo32/
├── assets/
│   ├── logo-studymatch.png       # Logotipo oficial de StudyMatch (resolución completa)
│   ├── logo-studymatch.svg       # Versión vectorial del logotipo
│   └── nosotros/                 # Fotografías del equipo (encuadre retrato)
│       ├── carolina-foto.png     # Carolina Silva Cotto
│       ├── karina.png            # Karina Sanchez
│       ├── mariana.webp          # Mariana Sosa
│       ├── miguel.png            # Miguel Angel Marcaida
│       └── sergio.png            # Sergio Cesar Barrientos
├── index.html                    # Estructura principal y contenido definitivo
├── styles.css                    # Arquitectura de estilos y variables de diseño
├── script.js                     # Interactividad accesible, temas, menú y modal
└── README.md                     # Memoria técnica y documentación institucional
```

### Instrucciones para abrir y probar en entorno local
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Miguel-Marcaida/tp3-studymatch-grupo32.git
   cd tp3-studymatch-grupo32
   ```
2. **Abrir directamente en navegador:**
   - Puede abrirse directamente el archivo `index.html` con doble clic o arrastrándolo a cualquier navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
3. **Ejecutar mediante un servidor HTTP local (Recomendado para pruebas móviles y emulación):**
   - **Opción con Python:**
     ```bash
     python -m http.server 8000
     ```
     Luego abrir en el navegador: `http://localhost:8000`
   - **Opción con Node.js / npx:**
     ```bash
     npx serve .
     ```

### Procedimiento de publicación en Vercel
1. Se vinculó el repositorio público de GitHub (`https://github.com/Miguel-Marcaida/tp3-studymatch-grupo32`) a la plataforma de despliegue **Vercel**.
2. Al tratarse de una landing page estática sin frameworks ni pasos de transpilación, la configuración de proyecto se definió con:
   - **Framework Preset:** *Other*
   - **Build Command:** *(vacío / none)*
   - **Output Directory:** `./` *(raíz del repositorio)*
3. La integración con GitHub asegura despliegue continuo (*Continuous Deployment*); cada *commit* en la rama `main` compila y publica la versión de producción en tiempo real.

---

## 6. Repositorio, despliegue y verificación

- **Repositorio oficial en GitHub:** https://github.com/Miguel-Marcaida/tp3-studymatch-grupo32
- **Landing page publicada en Vercel:** https://tp3-studymatch-grupo32.vercel.app/
- **Fecha de entrega:** 26/11/2026

### Lista de comprobación final (vista *desktop*, móvil y ventana de incógnito)
- [x] **Logo oficial:** El logo original de **StudyMatch.** se ubica en `assets/logo-studymatch.png` y se visualiza completo, nítido y sin deformaciones.
- [x] **Fotografías del equipo:** Las 5 fotos se cargan desde `assets/nosotros/` con encuadre de retrato (`object-fit: cover; object-position: top;`), textos alternativos descriptivos y respaldo con iniciales ante fallos de red.
- [x] **Navegación de escritorio:** La barra superior se mantiene en una sola línea (`white-space: nowrap; flex-shrink: 0;`) sin cortes de renglón.
- [x] **Menú hamburguesa en móvil:** El botón `#menu-toggle` muestra 3 rayitas visibles con alto contraste en ambos temas, alternando con clic, Enter, Espacio y cerrando con tecla Escape.
- [x] **Sentencias originales:** Se preservan íntegras las redacciones de `R1` y `R2`, acompañadas de su formalización lógica afirmativa y beneficios concretos.
- [x] **Diagramas de flujo ampliables:** Los dos diagramas poseen tamaño mínimo para no aplastarse, scroll condicional suave en pantallas reducidas y ventana modal accesible a pantalla completa.
- [x] **Acción de usuario vs. Intervención humana:** Se distingue claramente en `R2` que completar datos es una acción del estudiante, mientras que la consulta con un tutor académico es una intervención humana agregada como decisión del grupo.
- [x] **Desplegables accesibles:** Los paneles acordeón abren y cierran mediante clic y teclado (`Enter`, `Espacio`, flechas de navegación).
- [x] **Selector de tema:** Botón funcional para alternar entre Modo Claro y Modo Oscuro con persistencia en `localStorage`.
- [x] **Enlaces verificados:** Enlaces de GitHub y Vercel comprobados en ventana de incógnito (sin sesión iniciada) funcionando correctamente.
