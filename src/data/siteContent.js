import auroraImg from "../assets/Aurora.png";
import fornoImg from "../assets/pizzeria.png";
import nocturnoImg from "../assets/Nocturno.png";

export const navItems = [
  { label: "Inicio", href: "#top" },
  { label: "Como funciona", href: "#engine" },
  { label: "Trabajos", href: "#lab" },
  { label: "Contacto", href: "#contacto" }
];

export const heroSignals = [
  "Branding generativo",
  "Scroll con fisica",
  "Interaccion tactil",
  "Listo para stand"
];

export const heroRoutes = [
  {
    id: "fair",
    label: "Voy a una feria",
    title: "Tu stand necesita algo mejor que un brochure olvidado en una mesa.",
    description:
      "Kinet convierte la pantalla del stand en una experiencia guiada para mostrar que hace tu producto, por que importa y como seguir la conversacion despues del evento.",
    output: "Experiencia interactiva para stand",
    outcome: "Mas tiempo de atencion y conversaciones comerciales mucho mas utiles.",
    tags: ["Stand", "Tablet", "Pantalla vertical"]
  },
  {
    id: "product",
    label: "Quiero mostrar un producto",
    title: "Si tu producto requiere explicacion, la interfaz tiene que hacer parte del trabajo.",
    description:
      "Kinet construye catalogos interactivos y demos visuales para que el visitante explore funciones, acabados o diferenciales sin depender de una explicacion larga.",
    output: "Catalogo interactivo o demo de producto",
    outcome: "Tu propuesta se entiende mejor y se recuerda mas que con una ficha tecnica.",
    tags: ["Catalogo", "Hotspots", "3D ligero"]
  },
  {
    id: "space",
    label: "Necesito explicar un proyecto",
    title: "Cuando el cliente tiene que imaginar demasiado, la venta se enfria.",
    description:
      "Kinet arma recorridos visuales para arquitectura, inmobiliario o servicios donde materiales, etapas y comparaciones se ven en pantalla con claridad y sin depender de VR.",
    output: "Recorrido interactivo para proyecto",
    outcome: "Las decisiones salen mas rapido porque la visualizacion acompana la conversacion.",
    tags: ["Arquitectura", "Inmobiliario", "Configuracion"]
  }
];

export const heroMetrics = [
  { value: "01", label: "Una pieza que muestra, explica y ayuda a vender" },
  { value: "60fps", label: "Objetivo de fluidez para tabletas y hardware de stand" },
  { value: "Sin PDFs", label: "Menos material olvidado, mas experiencia util" }
];

export const storyChapters = [
  {
    id: "brecha",
    chapter: "01",
    eyebrow: "Atencion",
    title: "El problema no es la falta de contenido. Es la falta de reaccion.",
    description:
      "En feria, casi todo el material es pasivo. El visitante mira, ignora, sigue caminando. Kinet entra justo ahi: en la distancia entre ver algo y querer tocarlo.",
    bullets: [
      "Sustituir brochures invisibles por recorridos vivos",
      "Convertir la pieza grafica en interfaz util",
      "Hacer que la historia de marca responda al gesto"
    ],
    stageLabel: "Pasivo vs interactivo",
    stageLead: "De brochure a pieza que responde",
    stageCode: "ATTN_BREAK",
    matrix: [
      { value: "PDF", label: "material que no pide accion" },
      { value: "Loop", label: "pantalla que no conversa" },
      { value: "Touch", label: "inicio del recorrido" }
    ]
  },
  {
    id: "editorial",
    chapter: "02",
    eyebrow: "Editorial",
    title: "La rejilla no desaparece al programar. Se vuelve comportamiento.",
    description:
      "La identidad no se pega encima del codigo. Se traduce a ritmo, densidad, tension visual y transiciones. El diseno editorial sigue mandando, pero ahora tambien se mueve.",
    bullets: [
      "Tipografia como estructura y no solo decoracion",
      "Capas que se abren por scroll, toque o hover",
      "Precision grafica sin caer en plantilla"
    ],
    stageLabel: "La rejilla entra en movimiento",
    stageLead: "Codigo que respeta la composicion",
    stageCode: "GRID_RUNTIME",
    matrix: [
      { value: "Tipo", label: "jerarquia con caracter" },
      { value: "Flow", label: "scroll como tempo" },
      { value: "Code", label: "modular sin perder direccion" }
    ]
  },
  {
    id: "touch",
    chapter: "03",
    eyebrow: "Superficie",
    title: "Cada formato cotidiano puede comportarse como una pequena instalacion.",
    description:
      "Un iPad, un kiosko, una pantalla vertical o una mesa tactil pueden convertirse en piezas de marca con logica propia. Lo importante no es el gadget: es la coreografia.",
    bullets: [
      "Micrositios de stand con una narrativa clara",
      "Catalogos 3D que se exploran, no solo se miran",
      "Interfaces pensadas para dedo, no para cursor de oficina"
    ],
    stageLabel: "Coreografia de superficie",
    stageLead: "Pantallas que se comportan como objetos de marca",
    stageCode: "TACTILE_STACK",
    matrix: [
      { value: "iPad", label: "soporte para exploracion guiada" },
      { value: "Kiosk", label: "demo comercial en alto trafico" },
      { value: "Wall", label: "presencia visual de gran escala" }
    ]
  },
  {
    id: "runtime",
    chapter: "04",
    eyebrow: "Runtime",
    title: "La pieza tiene que verse ambiciosa sin romperse en condiciones reales.",
    description:
      "Tomamos recursos del mundo interactivo y del videojuego, pero con criterio: menos ruido, mas rendimiento, mejor control del frame budget y una base modular que luego pueda crecer.",
    bullets: [
      "Arquitectura pensada para evolucionar",
      "Experiencias ligeras para entornos de feria",
      "Preparado para sumar motion, video, 3D o CMS despues"
    ],
    stageLabel: "Rendimiento con criterio",
    stageLead: "Impacto visual que no castiga el hardware",
    stageCode: "FRAME_BUDGET",
    matrix: [
      { value: "Light", label: "assets contenidos y bien orquestados" },
      { value: "Mod", label: "componentes listos para iterar" },
      { value: "Ready", label: "base escalable para demos reales" }
    ]
  }
];

export const sampleWorks = [
  {
    id: "aurora-cafe",
    code: "LAB-01",
    title: "Catálogo Táctil de Especialidad",
    category: "Menú Inmersivo 3D",
    sector: "Gastronomía / Cafetería de Especialidad",
    url: "https://aurora-cafe-carta-npzj.vercel.app/",
    summary: "Transformación de la carta de café tradicional en una experiencia digital inmersiva, superando las limitaciones del formato impreso o PDF.",
    problem: "Las cartas tradicionales en formato impreso o PDF reducen la experiencia del café de especialidad a una simple lista de precios, perdiendo el atractivo visual del producto real.",
    solution: "Transformamos el menú en un entorno de exploración. Desarrollamos una interfaz web que integra modelos 3D interactivos, permitiendo al usuario rotar, acercar y detallar la textura de las bebidas y la pastelería antes de ordenar. El 3D deja de ser un adorno para convertirse en la principal herramienta de venta.",
    image: auroraImg,
    interactions: [
      "Exploración y rotación de modelos 3D",
      "Detalle táctil de texturas de repostería",
      "Filtros de ingredientes interactivos",
      "Transiciones fluidas entre categorías"
    ],
    surfaces: ["iPad en mesa", "Pantalla táctil de pedido", "Menú QR móvil"],
    note: "Optimizado para tablets y pantallas táctiles de alta frecuencia de refresco, mejorando el ticket promedio de compra mediante apetito visual."
  },
  {
    id: "forno-pizzeria",
    code: "LAB-02",
    title: "Forno Pizzeria",
    category: "Experiencia Interactiva 3D",
    sector: "Consumo Masivo / Pizzería",
    url: "https://forno-pizzeria.vercel.app/",
    summary: "Experiencia inmersiva y premium que eleva la presentación de la comida mediante gráficos 3D en tiempo real, permitiendo a los clientes 'probar con los ojos'.",
    problem: "Vender comida a través de una pantalla exige superar la barrera del 'apetito visual'. Una fotografía plana no transmite la dimensión, los ingredientes ni la textura del producto.",
    solution: "Construimos un catálogo virtual hiperrealista. El usuario puede rotar y hacer zoom en modelos 3D optimizados. La caja se abre dinámicamente y una UI híbrida flota en el espacio 3D, facilitando un recorrido que acelera la compra.",
    image: fornoImg,
    interactions: [
      "Visualización 360° y animación de caja dinámica",
      "Interfaz Híbrida flotante en espacio 3D",
      "Vista de detalle de rebanada sin cortes",
      "E-commerce Ready con carrito integrado"
    ],
    surfaces: ["Web de escritorio", "Móvil responsivo (100dvh)", "Kiosko interactivo"],
    note: "Arquitectura React + Vite, Three.js, @react-three/fiber. Modelos .glb optimizados."
  },
  {
    id: "nocturno-acoustics",
    code: "LAB-03",
    title: "Nocturno Signal Laboratory",
    category: "Síntesis y DSP Modular",
    sector: "Hardware de Audio / Tecnología Musical",
    url: "https://nocturno-acoustics.vercel.app/",
    summary: "Experiencia interactiva de síntesis y procesamiento de audio modular analógico en la web, que rinde homenaje a los sintetizadores de rack de 1974.",
    problem: "En ferias de música, exhibir hardware complejo confunde al visitante con un caos de cables físicos. Explicar el flujo de la señal de manera rápida y atractiva es casi imposible usando herramientas pasivas.",
    solution: "Cambiamos el caos físico por una mesa de trabajo infinita. Los usuarios conectan cables con físicas Verlet y manipulan módulos (Tape Player, Waveshaper, Delay, Mixer). Todo procesado con Web Audio API puro, sin librerías externas.",
    image: nocturnoImg,
    interactions: [
      "Cables colgantes interactivos (Motor de físicas Verlet)",
      "Conexión magnética de jacks y estante táctil",
      "Bocina reactiva con FFT (Squash & Stretch)",
      "Streaming inteligente con BPM procedural (Seed-Hash)"
    ],
    surfaces: ["Mesa de trabajo infinita", "Pantalla táctil vertical", "Tablet interactiva"],
    note: "Performance a 60 FPS actualizando directamente el DOM vía requestAnimationFrame."
  },
  {
    id: "eco-heroes",
    code: "LAB-04",
    title: "EcoHéroes",
    category: "Minijuego Educativo",
    sector: "Educación Ambiental / Gamificación",
    url: "https://ecoheroes-f9sl.vercel.app/",
    summary: "Aplicación web interactiva y modular diseñada para enseñar las normas de reciclaje y separación de residuos mediante mecánicas de velocidad y memoria.",
    problem: "Concientizar sobre la correcta clasificación de residuos suele ser un proceso monótono y poco visual, lo que dificulta el aprendizaje y la retención de las normas de reciclaje.",
    solution: "Desarrollamos un juego con mecánicas de arrastre elástico (swipe). Los usuarios asocian desechos con canecas codificadas por colores (Aprovechables, Orgánicos, No Aprovechables). Incluye al Oso de Anteojos como mascota dinámica y ayudas visuales inteligentes.",
    image: null,
    interactions: [
      "Arrastre de tarjetas con físicas elásticas",
      "Muelle de lanzamiento reactivo y racha de puntos",
      "Mascota interactiva con reacciones en tiempo real",
      "Onboarding 3D y asistencia visual inteligente"
    ],
    surfaces: ["Pantalla táctil móvil", "Kiosko educativo", "Web de escritorio"],
    note: "Arquitectura React + Vite modular. Efectos sintetizados vía Web Audio API y transiciones fluidas con requestAnimationFrame."
  }
];

export const closingSignals = [
  "Stand interactivo",
  "Catalogo navegable",
  "Demo comercial",
  "Pantalla tactil"
];
