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
    id: "andina-pack",
    code: "LAB-01",
    title: "Modulo demo para feria industrial",
    category: "Micro-sitio reactivo",
    summary:
      "Pensado para una marca industrial que necesita convertir una pantalla en una herramienta comercial durante la feria.",
    placeholderTitle: "Aqui puede vivir un teaser, un render o una captura del recorrido real",
    placeholderText:
      "Este stage queda listo para subir una pieza real y mostrarla con contexto, no como una imagen perdida dentro de una galeria.",
    interactions: [
      "Scroll con ritmo editorial",
      "Capas de informacion por toque",
      "CTA comercial integrado al recorrido"
    ],
    surfaces: ["Pantalla vertical", "Tablet comercial", "Follow-up web"],
    note: "Ideal para Andina Pack, FIB o cualquier activacion B2B donde la pantalla debe ayudar a vender."
  },
  {
    id: "construct-grid",
    code: "LAB-02",
    title: "Catalogo tactil para acabados y arquitectura",
    category: "Catalogo 3D / configurador",
    summary:
      "Una pieza pensada para estudios, constructoras o inmobiliarias que necesitan mostrar materiales y variantes sin depender de VR.",
    placeholderTitle: "Aqui puede entrar una secuencia, un render o una vista 3D ligera",
    placeholderText:
      "Este espacio sirve para mostrar un before-after, una secuencia de acabados o un configurador corto sin romper la composicion.",
    interactions: [
      "Cambio de acabado en vivo",
      "Comparacion visual por escenas",
      "Lectura espacial clara en tablet"
    ],
    surfaces: ["iPad en stand", "Mesa tactil", "Pantalla de ventas"],
    note: "Ideal para vivienda, arquitectura comercial y ventas que necesitan explicar diferencias rapido."
  },
  {
    id: "logistics-flow",
    code: "LAB-03",
    title: "Instalacion tactil para trazabilidad y servicios",
    category: "Experiencia de stand",
    summary:
      "Un recorrido modular para empresas de tecnologia o logistica que necesitan explicar procesos complejos sin saturar al visitante.",
    placeholderTitle: "Zona preparada para demo navegable o mockup de kiosko",
    placeholderText:
      "Aqui puede entrar una foto del montaje, una secuencia de video o una mini app con hotspots reales.",
    interactions: [
      "Mapa por hotspots",
      "Secuencia guiada para ventas",
      "Transiciones optimizadas para hardware real"
    ],
    surfaces: ["Kiosko", "Led mural", "Pantalla multitouch"],
    note: "Ideal para mostrar sistemas, rutas, dashboards o flujos donde el orden del relato importa."
  }
];

export const closingSignals = [
  "Stand interactivo",
  "Catalogo navegable",
  "Demo comercial",
  "Pantalla tactil"
];
