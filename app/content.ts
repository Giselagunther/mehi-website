/** Contenido público aprobado. No incorporar antecedentes de clientes sin autorización. */
// La marca se presenta sola: el sitio no dice quién es el dueño ni quién
// desarrolló MEHI, ni en el texto visible ni en los datos para buscadores o
// asistentes (decisión de la CEO, 3-oct-2026). Lo vigilan los tests.

export const site = {
  name: "MEHI",
  url: "https://www.mehi.ar",
  title: "MEHI | Agentes de voz con IA para empresas, contact centers y gobiernos",
  description:
    "Dale voz a tu CRM y a la información de tu organización. MEHI atiende llamadas con agentes de voz con IA, responde con información validada y deriva a tu equipo cuando hace falta.",
  introduction:
    "MEHI es una plataforma de agentes de voz con IA que le pone voz a la información de tu organización: el CRM, las bases de conocimiento y los procedimientos. Atiende llamadas, responde consultas y deriva a tu equipo cuando hace falta, con supervisión de cada conversación. Trabaja con gobiernos, empresas y contact centers.",
  hero: "MEHI conecta la información de tu organización con un agente de voz que atiende llamadas, responde consultas y deriva a tu equipo cuando hace falta. Y te deja ver y revisar cada conversación.",
  heroNote:
    "Trabaja con tu CRM, tus bases de conocimiento u otros sistemas, según las integraciones de cada proyecto.",
  tagline: "Agentes de voz con IA para gobiernos, empresas y contact centers.",
  features: [
    "Agentes de voz con IA que atienden llamadas en lenguaje natural",
    "Respuestas basadas en información que tu organización validó",
    "Consultas a tu CRM u otros sistemas, según las integraciones del proyecto",
    "Derivación a tu equipo con el contexto de la llamada",
    "Registro, métricas y revisión de cada conversación",
  ],
  faqs: [
    {
      question: "¿Qué es MEHI?",
      answer:
        "Una plataforma de agentes de voz con IA. Le pone voz a la información de tu organización para atender llamadas, responder consultas y derivar a tu equipo los casos que necesitan una persona. Cada conversación queda registrada para supervisarla y mejorarla.",
    },
    {
      question: "¿Tengo que cambiar mi CRM o mis sistemas?",
      answer:
        "No. MEHI trabaja con la información y los sistemas que ya usás. Qué se conecta y cómo (CRM, bases de conocimiento, sistemas de gestión, telefonía) se define en cada proyecto según las interfaces disponibles, y se valida antes de implementar.",
    },
    {
      question: "¿Para qué organizaciones sirve?",
      answer:
        "Para gobiernos y organismos públicos que atienden a vecinos, empresas con equipos de atención al cliente y contact centers. El alcance se define a partir de las llamadas que reciben, la información disponible y los sistemas de cada operación.",
    },
    {
      question: "¿La IA reemplaza a los operadores?",
      answer:
        "No. MEHI combina atención automatizada y humana. La IA responde o deriva según las reglas que define tu organización; las personas conservan la supervisión y atienden los casos que requieren intervención humana.",
    },
    {
      question: "¿De dónde obtiene la información para responder?",
      answer:
        "De la información que tu organización prepara, revisa y aprueba: procedimientos, requisitos, preguntas frecuentes y, si el proyecto lo incluye, los datos de tus sistemas. El agente no improvisa. Si algo no está confirmado, lo dice y deriva. Tu equipo tiene herramientas para mantener esa información al día.",
    },
    {
      question: "¿Cómo se cuida la información?",
      answer:
        "La información de cada organización se usa sólo para su servicio y queda separada de la de las demás. Viaja cifrada y el acceso es por usuario y rol. La documentación de seguridad e infraestructura se presenta y se revisa con tu equipo técnico durante la evaluación.",
    },
    {
      question: "¿Cómo se contrata y cuánto cuesta?",
      answer:
        "Empezamos con una conversación sobre tu operación y una prueba con un caso tuyo. El alcance, las integraciones y las condiciones comerciales se acuerdan para cada proyecto. No publicamos una tarifa única.",
    },
  ],
} as const;

export type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type IllustrativeExample = {
  kind: "fictional";
  heading: string;
  disclosure: string;
  context: string;
  steps: {
    heading: string;
    explanation: string;
    lines: { speaker: string; text: string }[];
  }[];
};

/** Bloque de tarjetas (qué resuelve, dónde suma) o de pasos numerados (cómo se implementa). */
export type CardBlock = {
  heading: string;
  items: { title: string; description: string }[];
};

export type PublicPage = {
  /** Identidad de la página compartida entre idiomas (es el slug en español). */
  id: string;
  slug: string;
  /** solution: qué es MEHI · audience: una página por tipo de cliente · resource: guías. */
  kind: "solution" | "audience" | "resource";
  label: string;
  /** Rótulo corto sobre el título. */
  eyebrow?: string;
  title: string;
  description: string;
  /** Frase de la tarjeta de entrada en la portada (sólo kind audience). */
  summary?: string;
  /** Texto del enlace de esa tarjeta. */
  cta?: string;
  introduction: string;
  useCases?: CardBlock;
  process?: CardBlock;
  sections: ContentSection[];
  audience?: "government";
  example?: IllustrativeExample;
};

export const publicPages: PublicPage[] = [
  {
    id: "plataforma",
    slug: "plataforma",
    kind: "solution",
    label: "Solución",
    eyebrow: "La solución",
    title: "Agentes de voz con IA conectados a la información de tu organización",
    description:
      "Qué es MEHI, para quién es y cómo se contrata: agentes de voz con IA que usan tu CRM y tu información validada, con derivación a tu equipo y supervisión de cada llamada.",
    introduction: site.introduction,
    useCases: {
      heading: "Qué hace MEHI en cada llamada",
      items: [
        {
          title: "Atiende",
          description:
            "Contesta en lenguaje natural, a cualquier hora, y entiende qué necesita la persona aunque lo diga con sus palabras.",
        },
        {
          title: "Responde",
          description:
            "Usa la información que tu organización validó y, si el proyecto lo incluye, consulta tu CRM u otros sistemas.",
        },
        {
          title: "Deriva",
          description:
            "Cuando el caso necesita una persona, lo pasa a tu equipo con el contexto de la llamada.",
        },
        {
          title: "Te muestra todo",
          description:
            "Cada conversación queda registrada. Ves qué se respondió, qué se derivó y qué información conviene mejorar.",
        },
      ],
    },
    process: {
      heading: "Cómo empezamos",
      items: [
        {
          title: "Conversamos sobre tu operación",
          description:
            "Qué llamadas reciben, con qué información responden hoy y qué sistemas usan.",
        },
        {
          title: "Probamos con un caso tuyo",
          description:
            "Armamos una prueba acotada con tus consultas, sobre escenarios preparados para la evaluación.",
        },
        {
          title: "Implementamos y medimos",
          description:
            "Conectamos la telefonía y los sistemas acordados, y revisamos los resultados con la evidencia de las llamadas.",
        },
      ],
    },
    sections: [
      {
        heading: "Para quién es",
        paragraphs: [
          "MEHI sirve a organizaciones que reciben muchas llamadas parecidas, manejan información propia para responderlas y necesitan que una persona pueda intervenir cuando hace falta.",
        ],
        bullets: [
          "Gobiernos y organismos públicos: orientación a vecinos sobre trámites y servicios.",
          "Empresas: atención a clientes con la información de su CRM y de su operación.",
          "Contact centers: agentes de voz que trabajan junto a sus operadores, para cada uno de sus clientes.",
        ],
      },
      {
        heading: "Qué incluye la plataforma",
        paragraphs: [
          "El agente conversa a partir de instrucciones e información preparadas para tu operación. Las reglas definen qué puede resolver solo, qué tiene que consultar y cuándo pasa la llamada a una persona.",
        ],
        bullets: [...site.features],
      },
      {
        heading: "Lo que MEHI no hace",
        paragraphs: [
          "No improvisa respuestas ni políticas: si la información no está confirmada, lo dice y deriva. No da por hecha una gestión en otro sistema si esa integración no se acordó. Y no reemplaza la decisión de tu equipo en los casos que la necesitan.",
          "No es una herramienta para que una persona delegue sus trámites. Es una solución para organizaciones que definen y supervisan su propia atención.",
        ],
      },
      {
        heading: "Qué acordamos antes de implementar",
        paragraphs: [
          "El alcance se construye con tu organización: llamadas a cubrir, fuentes de información, telefonía, sistemas involucrados, responsables y criterios de aceptación.",
        ],
        bullets: [
          "Elegir una necesidad concreta de atención y sus excepciones.",
          "Identificar quién valida la información y autoriza cambios.",
          "Definir los límites del agente y el recorrido hacia una persona.",
          "Acordar qué evidencia se revisará para evaluar el resultado.",
        ],
      },
      {
        heading: "Cómo se contrata",
        paragraphs: [
          "El alcance, las integraciones, los criterios de evaluación y las condiciones comerciales se acuerdan para cada proyecto. No hay una tarifa única: depende de las llamadas que se atienden, de lo que se integra y del acompañamiento que necesita tu equipo.",
        ],
      },
    ],
  },
  {
    id: "ia-para-gobiernos",
    slug: "ia-para-gobiernos",
    kind: "audience",
    label: "Gobierno",
    eyebrow: "Gobierno y organismos públicos",
    audience: "government",
    title: "Agentes de voz con IA para gobiernos y organismos públicos",
    description:
      "Dale voz a la información de tu organismo: un agente de voz con IA que orienta a los vecinos en consultas y trámites, con información validada y derivación a tu equipo.",
    cta: "Ver la solución para gobiernos",
    summary:
      "Orientá a los vecinos en consultas y trámites, a cualquier hora, con la información que validó el organismo.",
    introduction:
      "MEHI le pone voz a la información y los servicios de tu organismo. El agente orienta a los vecinos sobre trámites y servicios con la información que el organismo validó, y deriva a tu equipo los casos que necesitan una persona. Cada llamada queda registrada para supervisarla.",
    useCases: {
      heading: "Qué puede resolver el agente",
      items: [
        {
          title: "Orientación sobre trámites",
          description:
            "Requisitos, pasos, horarios y dónde se hace cada trámite, explicado en lenguaje simple.",
        },
        {
          title: "Consultas sobre el caso de cada vecino",
          description:
            "Si el proyecto lo incluye, identifica a la persona y consulta los sistemas del organismo para responder sobre su situación.",
        },
        {
          title: "Reclamos y pedidos",
          description:
            "Toma el pedido, registra los datos necesarios y lo deja cargado para el área que corresponde, según la integración acordada.",
        },
        {
          title: "Derivación al área correcta",
          description:
            "Cuando el caso necesita una persona, lo pasa al equipo o a la dependencia que corresponde, con el contexto de la llamada.",
        },
      ],
    },
    process: {
      heading: "Cómo se implementa en un organismo",
      items: [
        {
          title: "Elegimos las consultas",
          description:
            "Empezamos por un conjunto acotado de trámites y servicios, con sus excepciones.",
        },
        {
          title: "El organismo valida la información",
          description:
            "Sus responsables revisan y aprueban lo que el agente va a decir. Nada se usa sin esa revisión.",
        },
        {
          title: "Probamos con escenarios ficticios",
          description:
            "La prueba no usa datos de vecinos. Se mide si el agente responde bien y si reconoce sus límites.",
        },
        {
          title: "Ponemos en marcha y supervisamos",
          description:
            "Se conecta la línea, se revisan las llamadas y se mejora la información con evidencia.",
        },
      ],
    },
    sections: [
      {
        heading: "Atención ciudadana con responsabilidades claras",
        paragraphs: [
          "Una consulta ciudadana puede requerir orientación, una aclaración o la intervención de una persona. Antes de automatizar, el organismo define qué puede responder el agente, qué información respalda la respuesta y qué recorrido corresponde cuando el caso queda fuera de alcance.",
          "MEHI permite trabajar sobre esas instrucciones y revisar las conversaciones. La automatización no equivale por sí sola a aprobar una solicitud, resolver un expediente o completar una gestión en otro sistema: cualquier acción de ese tipo requiere una integración y un alcance acordados.",
        ],
      },
      {
        heading: "Información institucional y continuidad humana",
        paragraphs: [
          "El organismo define las fuentes y las reglas que autoriza a usar. Conviene establecer responsables de revisión, criterios de actualización y un recorrido para las preguntas que no tienen una respuesta confirmada.",
          "La derivación a un equipo humano se diseña según la telefonía y los sistemas disponibles. Qué contexto acompaña la atención, dónde se consulta y qué ocurre si una dependencia no responde se verifica durante la evaluación del proyecto.",
        ],
        bullets: [
          "Consultas informativas dentro de un alcance definido.",
          "Instrucciones e información revisadas por responsables del organismo.",
          "Intervención humana para excepciones y situaciones no cubiertas.",
          "Seguimiento de llamadas y revisión de respuestas y derivaciones.",
        ],
      },
      {
        heading: "Qué revisar en una demostración",
        paragraphs: [
          "Una demostración útil incluye preguntas claras, formas diferentes de expresar una necesidad y consultas que no deberían resolverse automáticamente. Se puede empezar con información ficticia preparada para la evaluación, sin usar datos de ciudadanos.",
          "La prueba debería mostrar si el agente reconoce sus límites y si el recorrido hacia una persona funciona en las condiciones acordadas. Un ejemplo ilustrativo ayuda a explicar el enfoque, pero no sustituye una prueba de la plataforma y sus integraciones.",
        ],
      },
      {
        heading: "Qué se acuerda con el organismo",
        paragraphs: [
          "En la conversación inicial se revisan la necesidad de atención, las fuentes disponibles, la telefonía y los responsables de la evaluación. Los tiempos, el soporte y las condiciones se definen para el proyecto. No anunciamos resultados universales.",
        ],
      },
    ],
    example: {
      kind: "fictional",
      heading: "Recorrido ilustrativo de una consulta",
      disclosure:
        "Ejemplo ficticio de lectura. No es una llamada real ni un agente activo. Al abrir cada paso sólo se muestra texto preparado; no se realiza ninguna gestión.",
      context:
        "Escenario inventado: un organismo evalúa cómo orientar una consulta informativa que termina requiriendo revisión humana. No reproduce ninguna implementación ni utiliza material de clientes.",
      steps: [
        {
          heading: "Aclarar la necesidad",
          lines: [
            {
              speaker: "Persona",
              text: "Necesito orientación para presentar una solicitud.",
            },
            {
              speaker: "Agente IA",
              text: "¿Buscás información general o ayuda con una situación particular?",
            },
          ],
          explanation:
            "Qué evaluar: delimitar la consulta antes de pedir información que todavía no hace falta.",
        },
        {
          heading: "Reconocer el límite de la información",
          lines: [
            {
              speaker: "Persona",
              text: "Mi situación no aparece en la información que tengo.",
            },
            {
              speaker: "Agente IA",
              text: "No tengo una respuesta confirmada para ese caso. Requiere revisión del equipo de atención.",
            },
          ],
          explanation:
            "Qué evaluar: reconocer que falta respaldo para responder, sin inventar requisitos ni confirmar acciones que no se ejecutaron.",
        },
        {
          heading: "Revisar el recorrido hacia una persona",
          lines: [
            {
              speaker: "Agente IA",
              text: "La consulta necesita intervención de una persona.",
            },
          ],
          explanation:
            "Qué evaluar en una prueba real: cómo se realiza la derivación, qué información recibe el equipo humano y qué evidencia queda para supervisar. Aquí no se conecta con ningún operador.",
        },
      ],
    },
  },
  {
    id: "ia-para-contact-centers",
    slug: "ia-para-contact-centers",
    kind: "audience",
    label: "Contact centers",
    eyebrow: "Contact centers",
    title: "Agentes de voz con IA para contact centers, junto a tus operadores",
    description:
      "MEHI suma agentes de voz con IA al servicio de tu contact center: atienden las consultas frecuentes con la información de cada cliente y pasan a tus operadores los casos que los necesitan.",
    cta: "Ver la solución para contact centers",
    summary:
      "Sumá agentes de voz a tu servicio y dejá a tus operadores los casos que los necesitan.",
    introduction:
      "MEHI le pone voz al servicio que prestás. Un agente de voz con IA atiende las consultas frecuentes con la información de cada cliente y pasa a tus operadores los casos que los necesitan, con el contexto de la llamada. Vos supervisás todo desde un mismo lugar.",
    useCases: {
      heading: "Dónde suma en tu operación",
      items: [
        {
          title: "Picos y fuera de horario",
          description:
            "El agente atiende cuando la demanda supera a tu equipo o cuando no hay operadores en turno.",
        },
        {
          title: "Consultas repetitivas",
          description:
            "Las preguntas de siempre se responden al instante y tus operadores se concentran en los casos complejos.",
        },
        {
          title: "Pase con contexto",
          description:
            "Cuando deriva, lo que la persona ya contó acompaña la llamada, según la integración con tu central. Nadie empieza de cero.",
        },
        {
          title: "Un servicio por cliente",
          description:
            "Cada cliente de tu contact center tiene su propio agente, su información y sus reportes, separados de los demás.",
        },
      ],
    },
    process: {
      heading: "Cómo se suma a tu servicio",
      items: [
        {
          title: "Elegimos un servicio y sus consultas",
          description:
            "Empezamos por las llamadas más frecuentes de un cliente, con sus excepciones.",
        },
        {
          title: "Conectamos la información del cliente",
          description:
            "Su CRM, sus bases de conocimiento o sus procedimientos, según lo que se acuerde en el proyecto.",
        },
        {
          title: "Definimos el pase a operadores",
          description:
            "Cuándo deriva, a qué cola y qué contexto viaja con la llamada, según tu central telefónica.",
        },
        {
          title: "Medimos y ajustamos",
          description:
            "Revisamos las llamadas, los motivos de derivación y la información que hay que corregir.",
        },
      ],
    },
    sections: [
      {
        heading: "Diseñar el recorrido completo de atención",
        paragraphs: [
          "Automatizar el inicio de una llamada es sólo una parte del trabajo. También hay que definir qué ocurre si la consulta requiere una excepción, si la información no alcanza o si la persona necesita hablar con un operador.",
          "La operación establece responsabilidades: qué atiende la IA, qué resuelve el equipo humano y qué contexto necesita cada uno. MEHI permite trabajar sobre ese recorrido y revisar las llamadas que muestran dónde se interrumpe.",
        ],
      },
      {
        heading: "La misma información para la IA y para tus operadores",
        paragraphs: [
          "Una respuesta puede ser incorrecta aunque el agente converse bien, si usa un procedimiento desactualizado. Por eso conviene gobernar el contenido que alimenta la atención: responsables, revisiones, versiones y reglas de publicación.",
          "MEHI incluye herramientas para que tus operadores trabajen con la misma información que usa el agente. Las capacidades concretas y el contexto disponible en cada pase se validan con los sistemas y la telefonía del proyecto.",
        ],
      },
      {
        heading: "Los datos de tus clientes siguen siendo de tus clientes",
        paragraphs: [
          "La información de cada cliente se usa sólo para su servicio y queda separada de la de los demás. Las condiciones de confidencialidad y de tratamiento de datos se acuerdan en cada proyecto.",
        ],
      },
      {
        heading: "Qué mirar al evaluar resultados",
        paragraphs: [
          "El resultado se define según la consulta. Una derivación correcta puede ser el resultado esperado; cerrar una llamada sin resolver no se cuenta automáticamente como éxito. La revisión combina indicadores con evidencia de casos.",
        ],
        bullets: [
          "Corrección de la información entregada.",
          "Cumplimiento del recorrido previsto para cada necesidad.",
          "Motivos de derivación y continuidad de la atención.",
          "Casos que requieren corregir contenido o instrucciones.",
          "Efecto de los cambios, con una medición comparable antes y después.",
        ],
      },
      {
        heading: "Una evaluación vinculada a tu operación",
        paragraphs: [
          "Para evaluar MEHI conviene traer un servicio concreto, sus preguntas frecuentes, las excepciones y el recorrido actual hacia un operador. Con esa base se acuerda un alcance verificable y se revisan las integraciones necesarias.",
          "No publicamos porcentajes universales de ahorro o resolución: los resultados dependen del servicio, de la información disponible y de la implementación.",
        ],
      },
    ],
  },
  {
    id: "agentes-de-voz-ia",
    slug: "agentes-de-voz-ia",
    kind: "audience",
    label: "Empresas",
    eyebrow: "Empresas",
    title: "Agentes de voz con IA para empresas: dale voz a tu CRM",
    description:
      "Un agente de voz con IA que atiende a tus clientes con la información de tu CRM y de tu operación, responde sus consultas y deriva a tu equipo cuando hace falta.",
    cta: "Ver la solución para empresas",
    summary:
      "Atendé a tus clientes con la información de tu CRM y de tu operación, sin cambiar tus sistemas.",
    introduction:
      "Tu CRM ya sabe todo sobre tus clientes. MEHI le pone voz: un agente con IA que atiende llamadas, consulta la información de tu operación y responde, o pasa la llamada a tu equipo cuando hace falta. No tenés que cambiar tus sistemas.",
    useCases: {
      heading: "Qué puede hacer por tus clientes",
      items: [
        {
          title: "Estado de un pedido o un caso",
          description:
            "Consulta tu CRM y le cuenta a la persona en qué está su pedido, su reclamo o su turno.",
        },
        {
          title: "Preguntas frecuentes",
          description:
            "Precios, condiciones, horarios y procedimientos, con la información que tu empresa aprobó.",
        },
        {
          title: "Registro de pedidos",
          description:
            "Toma los datos de un reclamo, una solicitud o un turno y los deja cargados donde tu equipo los necesita, según la integración.",
        },
        {
          title: "Derivación a tu equipo",
          description:
            "Pasa a una persona los casos que lo necesitan, con lo que el cliente ya contó.",
        },
      ],
    },
    process: {
      heading: "Cómo lo ponemos en marcha",
      items: [
        {
          title: "Elegimos las llamadas",
          description:
            "Las consultas más frecuentes de tus clientes y las que hoy más le cuestan a tu equipo.",
        },
        {
          title: "Conectamos tu información",
          description:
            "Tu CRM, tus bases de conocimiento o tus procedimientos: lo que ya usás, según las integraciones posibles.",
        },
        {
          title: "Probamos con tus casos",
          description:
            "Escenarios preparados con tus consultas reales, para ver cómo responde antes de atender a tus clientes.",
        },
        {
          title: "Lanzamos y medimos",
          description:
            "Conectamos tu línea y revisamos cada llamada para mejorar la información y las reglas.",
        },
      ],
    },
    sections: [
      {
        heading: "Cómo funciona una llamada con IA",
        paragraphs: [
          "La persona dice por teléfono qué necesita. El agente identifica la intención, usa la información preparada para ese proceso y sigue el recorrido configurado. Puede informar, orientar o derivar, según las capacidades habilitadas para tu operación.",
          "El alcance tiene que ser explícito: una respuesta informativa no equivale a completar una transacción en un sistema externo. Cuando hace falta ejecutar una gestión, esa acción depende de una integración y de reglas acordadas previamente.",
        ],
      },
      {
        heading: "Más que una voz natural",
        paragraphs: [
          "La calidad de un agente no se evalúa sólo por cómo suena. También tiene que comprender distintas formas de pedir lo mismo, manejar información incompleta y evitar respuestas sin respaldo. Una conversación fluida sirve cuando conduce al siguiente paso correcto.",
          "MEHI conecta la configuración de la conversación con el seguimiento de llamadas y la revisión de resultados. Así se pueden analizar casos concretos y distinguir un problema de información de uno de conversación o de integración.",
        ],
      },
      {
        heading: "Qué preparar para una prueba útil",
        paragraphs: [
          "Una prueba representativa incluye situaciones frecuentes y casos difíciles. Conviene usar escenarios preparados para la evaluación y acordar previamente el tratamiento de cualquier dato personal. No alcanza con una única llamada ideal.",
        ],
        bullets: [
          "Consultas habituales expresadas con palabras diferentes.",
          "Información faltante o respuestas ambiguas de la persona.",
          "Pedidos fuera del alcance autorizado del agente.",
          "Derivaciones y continuidad con el equipo humano.",
          "Revisión de respuestas, pasos completados y errores observados.",
        ],
      },
      {
        heading: "Telefonía, alcance y condiciones",
        paragraphs: [
          "La conexión con la telefonía se valida según la infraestructura de cada empresa. El volumen, los horarios de atención, las transferencias y las integraciones forman parte del diseño del proyecto, no de una promesa genérica del sitio.",
          "En una demo revisamos el proceso que querés mejorar y definimos qué debería demostrar el agente antes de avanzar.",
        ],
      },
    ],
  },
  {
    id: "gestion-del-conocimiento",
    slug: "gestion-del-conocimiento",
    kind: "resource",
    label: "Gestión del conocimiento",
    title: "Conocimiento institucional para agentes de IA y atención humana",
    description:
      "Conectá la atención con información revisada y versionada. Cómo MEHI vincula el conocimiento institucional con la IA y con los equipos humanos.",
    introduction:
      "El conocimiento institucional es la información que una organización valida para responder y actuar: procedimientos, requisitos, reglas y excepciones. MEHI lo usa en cada conversación, y KORENUS, la herramienta de MEHI para los equipos humanos, ayuda a mantenerlo revisado y al día.",
    sections: [
      {
        heading: "Por qué cargar documentos no alcanza",
        paragraphs: [
          "Una carpeta puede contener procedimientos contradictorios, datos vencidos o varias versiones de una misma regla. Un agente necesita saber qué información está aprobada y qué debe hacer cuando no encuentra una respuesta suficiente.",
          "La calidad empieza antes de la llamada: identificar la fuente, revisar el contenido y preparar su publicación. La organización conserva la responsabilidad sobre lo que autoriza a responder.",
        ],
      },
      {
        heading: "El papel de MEHI y KORENUS",
        paragraphs: [
          "MEHI gestiona la conversación y hace visible lo que ocurre en las llamadas. KORENUS complementa ese trabajo con fichas institucionales y herramientas para la gestión humana. Son productos relacionados; el alcance de su integración se acuerda para cada operación.",
          "Los casos observados en la atención pueden mostrar que falta una explicación, que una forma de preguntar no se reconoce o que una instrucción se volvió ambigua. Esa evidencia orienta la revisión del contenido sin convertir cada conversación en una modificación automática de las reglas.",
        ],
      },
      {
        heading: "Qué necesita una fuente confiable",
        paragraphs: [
          "La información útil para atención debe ser comprensible, verificable y tener un responsable. También debe distinguir lo que la organización sabe de lo que todavía necesita confirmar.",
        ],
        bullets: [
          "Una fuente institucional identificable y un responsable de revisión.",
          "Procedimientos vigentes, con requisitos y excepciones claros.",
          "Versiones y criterios para aprobar y publicar cambios.",
          "Distintas formas reales de nombrar una consulta.",
          "Un recorrido de derivación cuando la información no alcanza.",
        ],
      },
      {
        heading: "Cómo empezar la evaluación",
        paragraphs: [
          "Elegí un grupo de consultas y revisá qué fuentes usa hoy tu equipo para responderlas. La demo puede partir de ese material y de los problemas de consistencia que querés resolver. No es necesario publicar documentación interna en la web comercial.",
        ],
      },
    ],
  },
  {
    id: "como-elegir-ia-para-atencion-al-cliente",
    slug: "como-elegir-ia-para-atencion-al-cliente",
    kind: "resource",
    label: "Guía para evaluar IA",
    title: "Cómo elegir una plataforma de IA para atención al cliente",
    description:
      "Guía B2B para evaluar agentes de voz IA: conocimiento, derivación humana, integraciones, evidencia, límites y condiciones de implementación.",
    introduction:
      "Para elegir una plataforma de IA para atención al cliente, conviene evaluar el proceso completo: la calidad de las respuestas, las excepciones, la continuidad humana y la evidencia disponible. Esta guía de MEHI propone preguntas concretas para una evaluación empresarial.",
    sections: [
      {
        heading: "Empezá por una necesidad y un resultado observable",
        paragraphs: [
          "Definí qué consulta querés mejorar y qué debería ocurrir al terminar. Informar requisitos, orientar a un canal y completar una gestión son resultados diferentes. Especificar esa diferencia evita comparar demostraciones que prometen cosas distintas.",
          "Pedí que la prueba incluya ejemplos representativos de tu operación y que quede claro qué capacidades están disponibles, cuáles dependen de una integración y cuáles quedan fuera del alcance.",
        ],
      },
      {
        heading: "Revisá conocimiento y límites de la conversación",
        paragraphs: [
          "Preguntá de dónde obtiene la información el agente, quién la aprueba y cómo se actualiza. Probá una pregunta sin respuesta en las fuentes: el comportamiento esperado debe definirse antes, incluyendo cuándo pedir una aclaración o derivar.",
          "Una voz convincente no demuestra exactitud. Revisá si el agente conserva el sentido de las reglas, reconoce información faltante y evita afirmar que hizo una gestión que no ejecutó.",
        ],
      },
      {
        heading: "Comprobá la continuidad con personas y sistemas",
        paragraphs: [
          "Pedí una explicación del recorrido hacia un operador y de la información que efectivamente recibe. Verificá las dependencias de telefonía y de los sistemas de la empresa. Una integración anunciada debe traducirse en acciones, datos y responsabilidades concretas.",
        ],
        bullets: [
          "¿Qué puede resolver el agente y qué debe derivar?",
          "¿Qué información acompaña la derivación y dónde se consulta?",
          "¿Qué ocurre si un sistema externo no responde?",
          "¿Quién autoriza cambios de conocimiento e instrucciones?",
          "¿Cómo se controla el acceso y el tratamiento de la información?",
        ],
      },
      {
        heading: "Pedí evidencia y condiciones comerciales comparables",
        paragraphs: [
          "Acordá cómo se revisarán errores y resultados, qué se contará como resolución y cómo se registrarán los cambios. Compará períodos equivalentes y evitá atribuir una mejora a la IA si al mismo tiempo cambió el proceso o la muestra de consultas.",
          "La propuesta comercial debería aclarar alcance, integraciones, uso previsto, soporte y condiciones de implementación. No extrapoles el resultado de una demo a toda la operación sin una evaluación representativa.",
        ],
      },
      {
        heading: "Cómo evaluar MEHI con esta guía",
        paragraphs: [
          "MEHI combina agentes de voz IA, conocimiento institucional y supervisión de la atención. Una demo permite revisar tu proceso y plantear estas preguntas con un alcance concreto. La conveniencia de la solución depende de las necesidades y de las condiciones de tu organización.",
        ],
      },
    ],
  },
  {
    id: "como-evaluar-ia-para-atencion-ciudadana",
    slug: "como-evaluar-ia-para-atencion-ciudadana",
    kind: "resource",
    label: "Guía para organismos públicos",
    audience: "government",
    title: "Cómo evaluar IA para atención ciudadana en un organismo público",
    description:
      "Guía para evaluar agentes de voz con IA en un organismo: alcance, conocimiento institucional, intervención humana, integraciones y evidencia de una prueba.",
    introduction:
      "Evaluar agentes de voz con IA para un organismo público requiere acordar responsabilidades y observar el recorrido completo de atención. Esta guía propone preguntas para una evaluación técnica y operativa de MEHI.",
    sections: [
      {
        heading: "Definir qué se quiere resolver y qué queda afuera",
        paragraphs: [
          "Elegí un conjunto concreto de consultas y describí el resultado esperado. Informar un requisito, orientar a un canal y ejecutar una gestión son alcances diferentes. La prueba debe distinguirlos y señalar qué capacidades necesitan sistemas externos.",
        ],
        bullets: [
          "¿Qué consultas puede atender el agente y cuáles debe derivar?",
          "¿Qué acciones están habilitadas y cómo se comprueba su resultado?",
          "¿Qué ocurre cuando la persona pide algo que no forma parte del alcance?",
        ],
      },
      {
        heading: "Acordar quién valida la información y autoriza cambios",
        paragraphs: [
          "Identificá las fuentes y sus responsables. Incluí en la evaluación una pregunta sin respuesta confirmada y otra sobre una regla que haya cambiado en el material preparado para la prueba. Revisá tanto la conversación como el circuito para corregir el conocimiento.",
        ],
        bullets: [
          "¿Quién revisa y aprueba el contenido antes de usarlo?",
          "¿Cómo se identifica qué información está vigente?",
          "¿Quién autoriza cambios de instrucciones y cómo se revisa su efecto?",
        ],
      },
      {
        heading: "Comprobar la intervención humana y las dependencias",
        paragraphs: [
          "La propuesta debe explicar cómo se conecta la atención automatizada con la humana y cuáles son las dependencias de telefonía. Verificá con una prueba qué información recibe el operador, en lugar de asumir que toda conversación se transfiere de la misma manera.",
        ],
        bullets: [
          "¿Cómo se solicita o se determina una derivación?",
          "¿Qué ocurre fuera del horario previsto o si no hay un operador disponible?",
          "¿Qué se informa cuando un sistema externo no responde?",
        ],
      },
      {
        heading: "Definir el tratamiento de la información antes de probar",
        paragraphs: [
          "Empezá con un conjunto de escenarios ficticios y evitá incorporar información de ciudadanos a una demostración comercial. Para cualquier uso posterior de información real, los responsables del organismo deben revisar los accesos, los destinos de los datos y las condiciones aplicables al proyecto.",
        ],
        bullets: [
          "¿Qué información se necesita y quién puede consultarla?",
          "¿Dónde se procesa, qué se conserva y durante cuánto tiempo?",
          "¿Cómo se gestionan exportaciones, revisiones y solicitudes sobre los datos?",
        ],
      },
      {
        heading: "Medir con evidencia y criterios acordados",
        paragraphs: [
          "Prepará consultas frecuentes, ambiguas y fuera de alcance. Acordá antes de la prueba qué cuenta como respuesta correcta, resolución o derivación adecuada. No extrapoles un ejemplo de demostración a toda la operación.",
          "Revisá los resultados por día y marcá las fechas de los cambios de proceso o configuración. Así se evita mezclar condiciones distintas en un promedio que esconda cuándo apareció una mejora o un problema.",
        ],
      },
      {
        heading: "Convertir la evaluación en un alcance concreto",
        paragraphs: [
          "La propuesta debe identificar la plataforma y la empresa que la ofrece, junto con las integraciones, responsabilidades, soporte y condiciones comerciales del proyecto. El organismo conserva sus propios procesos de evaluación y contratación.",
          "Esta guía orienta una evaluación técnica y operativa. No acredita certificaciones, no garantiza resultados ni reemplaza la revisión de las condiciones que correspondan a cada organismo.",
        ],
      },
    ],
  },
];

export function findPublicPage(slug: string): PublicPage | undefined {
  return publicPages.find((page) => page.slug === slug);
}
