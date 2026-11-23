# TP3 — StudyMatch. · Equipo 32 (IFTS 29)

## 1. Identificación del proyecto
- **Institución y equipo:** IFTS 29 · Desarrollo de Software Front End · Equipo 32
- **Startup asignada (origen IFTS 16):** **StudyMatch.** — *Educación y colaboración*
- **Síntesis del servicio:** *"Conectamos estudiantes para estudiar juntos."* Red que conecta estudiantes según sus materias, intereses, necesidades y disponibilidad horaria y de modalidad.
- **Bloque asignado:** `S13-A` — Perfil y búsqueda
- **Alcance del trabajo:** Landing page estática que modela conceptualmente y representa de forma gráfica e interactiva dos propuestas agénticas (`R1` y `R2`) mediante diagramas de flujo y paneles desplegables accesibles. **No** integra agentes autónomos en ejecución, ni backend, ni conexión a APIs reales en producción.

---

## 2. Participación del grupo y revisión colaborativa

### Integrantes y aportes concretos
- **Miguel Angel Marcaida:** Coordinación de instrucciones y *prompts* en el entorno agéntico (Antigravity), integración del logo oficial en `asset/`, supervisión de iteraciones visuales y despliegue del sitio en Vercel.
- **Sergio Cesar Barrientos:** Relevamiento inicial de la startup **StudyMatch.**, análisis estructural y descomposición lógica de la sentencia `R1` ($p \land q \land r$) y definición de su flujo de búsqueda.
- **Carolina Silva Cotto:** Análisis estructural y descomposición lógica de la sentencia `R2` ($\neg p \lor \neg q \lor \neg r$), redacción de propuestas de valor, beneficios y estructura de contenidos para los desplegables.
- **Mariana Sosa:** Definición de casos límite, excepciones, puntos de intervención humana y sistematización de las decisiones propias del grupo (validación de formato horario y manejo de búsquedas sin coincidencias).
- **Karina Sanchez:** Control de calidad (QA) en vista de escritorio (*desktop*), verificación de contraste cromático respecto al logo, pruebas de accesibilidad en desplegables (clic y teclado) y revisión integral del `README.md` frente a la rúbrica.

### Revisión entre integrantes y mejora aplicada
- **Revisión realizada:** Al cruzar el relevamiento lógico inicial entre todos los integrantes, se detectó que en la formalización de `R2` se había definido la variable $r$ en negativo (*"no completó modalidad"*), lo que mezclaba el signo de la proposición con el operador lógico, y que en `R1` la consulta a la base de datos aparecía catalogada como *Decisión* en lugar de *Acción*.
- **Mejora concreta incorporada:** Se unificaron las variables proposicionales en afirmativo ($p$: tema de estudio, $q$: disponibilidad, $r$: modalidad) dejando la negación exclusivamente en la condición de `R2` ($\neg p \lor \neg q \lor \neg r$), se separó la decisión condicional de la acción de consulta de herramienta en `R1` y se incorporó una tabla explícita que distingue qué exige la regla original y qué es un supuesto agregado por el equipo.

---

## 3. Sentencias, propuestas agénticas y decisiones del grupo

### Propuesta 1 · Buscador inteligente (`R1`)
- **Sentencia original:** *"Si el estudiante completó tema de estudio, disponibilidad y modalidad, el sistema busca compañeros con esas condiciones compatibles."*
- **Lógica:** $p \land q \land r$ (donde $p$: completó tema de estudio; $q$: completó disponibilidad; $r$: completó modalidad).
- **Propuesta y beneficio:** Un agente recibe el perfil del estudiante, valida que los tres campos estén completos y consulta la base de datos de perfiles de **StudyMatch.** para devolver compañeros compatibles. Ahorra tiempo y evita búsquedas manuales desorganizadas.
- **Herramienta consultada e intervención humana:** Consulta la base de datos de perfiles de **StudyMatch.**; el estudiante interviene al final eligiendo con quién conectarse.

### Propuesta 2 · Asistente de perfil (`R2`)
- **Sentencia original:** *"Si falta alguno de esos datos, el sistema solicita completarlo y explica que todavía no puede realizar la búsqueda."*
- **Lógica:** $\neg p \lor \neg q \lor \neg r$ (se activa cuando falta al menos uno de los tres datos).
- **Propuesta y beneficio:** Un agente inspecciona los campos ingresados, detecta exactamente cuál o cuáles faltan, solicita completarlos y explica por qué aún no puede ejecutar la búsqueda. Evita búsquedas vacías o engañosas y guía al usuario.
- **Herramienta consultada e intervención humana:** Utiliza únicamente el formulario de ingreso de datos (sin consultar la base de perfiles); requiere que el estudiante ingrese los datos faltantes para continuar.

### Decisiones propias del grupo (supuestos no definidos en R1 ni R2)
| Decisión / Caso límite | Criterio adoptado por el Equipo 32 |
| :--- | :--- |
| **Reevaluación de R1** | Una vez que el estudiante completa los datos faltantes solicitados por `R2`, el agente vuelve a evaluar automáticamente la condición de `R1`. |
| **Búsqueda sin coincidencias** | Si la consulta en `R1` no arroja compañeros compatibles, el agente informa la situación al estudiante y sugiere alternativas de ajuste. |
| **Validación de disponibilidad** | Si se ingresa un horario inválido, el sistema informa el error y restringe el formato a `desde: hh:mm hasta: hh:mm` (verificando horas válidas y que la hora de inicio sea anterior a la de fin). |
| **Selección de compañero** | El sistema presenta las compatibilidades, pero la decisión final de conexión recae siempre en el estudiante (intervención humana). |

---

## 4. Herramientas de IA, aplicaciones y modelos utilizados

El desarrollo se realizó de manera **100 % agéntica**, sin edición manual de archivos de código fuente por parte de los integrantes.

- **Aplicación / Entorno de desarrollo:** Antigravity IDE
- **Modelos utilizados:**
  - `Claude Sonnet 4.6 (Thinking)` — utilizado para la estructuración semántica inicial de `index.html`, la lógica de accesibilidad de los acordeones (`script.js`) y la maquetación de los diagramas de flujo.
  - `Gemini 3.8 Flash High` — utilizado para la integración de contenidos definitivos de `R1` y `R2`, ajustes de hojas de estilo (`styles.css`) y redacción estructurada de documentación.

### Evidencia de iteración y mejoras solicitadas
1. **Iteración 1 — Estructura base y alcance:** Se solicitó generar la arquitectura HTML/CSS/JS con desplegables accesibles por clic y teclado, aclarando explícitamente que se trata de un modelado conceptual sin IA en vivo ni backend.
2. **Iteración 2 — Identidad visual y logo oficial:** Tras incorporar `asset/logo-studymatch.png`, se detectó que el agente había aplicado una paleta verde oscura con resplandores que chocaban con los colores reales del logo (azul medio, turquesa y dorado sobre fondo claro). Se solicitó reemplazar dicha paleta por tonos fieles al logotipo y asegurar alto contraste.
3. **Iteración 3 — Alineación en escritorio y legibilidad de diagramas:** Al probar en vista *desktop*, se observó que los enlaces de la barra de navegación se partían en dos líneas y algunos nodos de los diagramas quedaban muy ajustados. Se solicitó aplicar `white-space: nowrap` en la barra superior y rediseñar ambos diagramas con mayor espaciado, etiquetas `SÍ`/`NO` nítidas y diferenciación visual de las decisiones del grupo.

---

## 5. Repositorio, despliegue y verificación

- **Repositorio del grupo:** https://github.com/Miguel-Marcaida/tp3-studymatch-grupo32
- **Landing publicada (Vercel):** https://tp3-studymatch-grupo32.vercel.app/
- **Fecha de entrega:** 26/11/2026

### Lista de comprobación final (vista *desktop* y ventana sin sesión)
- [x] El logo original de **StudyMatch.** se visualiza completo, nítido y sin recortes.
- [x] Se incluyen las dos sentencias originales sin alterar su redacción, junto con ambas propuestas, sus beneficios y los supuestos del grupo.
- [x] Los dos diagramas de flujo (`R1` y `R2`) son legibles, tienen flechas y ramas rotuladas e incluyen intervención humana.
- [x] Los paneles desplegables abren y cierran correctamente tanto con clic como mediante teclado (`Enter` / `Espacio`).
- [x] Enlaces de repositorio y landing en Vercel verificados en ventana de incógnito (sin sesión iniciada) mostrando la versión final.
