/** Contenido público aprobado. No incorporar antecedentes de clientes sin autorización. */
export const company = {
  name: "GIV",
  url: "https://givsrl.com.ar/",
  relationship: "MEHI es la plataforma de GIV.",
  description:
    "GIV es la empresa que ofrece MEHI, una plataforma de agentes de voz con IA, conocimiento institucional y supervisión de la atención.",
} as const;

export const site = {
  name: "MEHI",
  url: "https://www.mehi.ar",
  title: "MEHI | IA para gobiernos y empresas · Plataforma de GIV",
  description:
    "MEHI, plataforma de GIV para atención ciudadana y atención al cliente: agentes de voz IA, conocimiento institucional y supervisión humana.",
  introduction:
    "MEHI es la plataforma de GIV para gestionar atención ciudadana y atención al cliente con IA y equipos humanos. Conecta agentes de voz, conocimiento institucional y supervisión para gobiernos, organismos públicos, empresas y contact centers.",
  hero: "MEHI es la plataforma de GIV para gestionar atención ciudadana con IA y equipos humanos. También acompaña la atención al cliente de empresas y contact centers, con conocimiento institucional y supervisión.",
  features: [
    "Agentes de voz con inteligencia artificial conversacional",
    "Respuestas basadas en conocimiento institucional validado",
    "Derivación a equipos humanos según las reglas de la operación",
    "Seguimiento de llamadas, reportes y trazabilidad de cambios",
    "Gestión del conocimiento y continuidad con KORENUS",
  ],
  faqs: [
    {
      question: "¿Qué es MEHI?",
      answer:
        "MEHI es una plataforma que integra agentes de voz con IA, conocimiento institucional y atención humana. Está orientada a gobiernos y empresas que necesitan gestionar consultas con continuidad, supervisión y trazabilidad.",
    },
    {
      question: "¿Qué relación tienen GIV y MEHI?",
      answer:
        "GIV es la empresa que ofrece MEHI. MEHI es el nombre de la plataforma. El alcance de cada proyecto, las integraciones y las condiciones comerciales se acuerdan con GIV.",
    },
    {
      question: "¿Para qué organizaciones sirve?",
      answer:
        "Para gobiernos y organismos públicos con atención ciudadana, empresas con equipos de atención al cliente y contact centers. El alcance se define a partir de los procesos, el conocimiento disponible y los sistemas que necesita cada operación.",
    },
    {
      question: "¿La IA reemplaza a los operadores?",
      answer:
        "MEHI permite combinar atención automatizada y humana. La IA puede responder o derivar según las reglas configuradas; las personas conservan la supervisión y atienden los casos que requieren intervención humana.",
    },
    {
      question: "¿De dónde obtiene la información para responder?",
      answer:
        "De conocimiento institucional que se prepara, revisa y publica para la operación. KORENUS acompaña la gestión de ese conocimiento y el trabajo de los equipos humanos. No se trata de dejar que el agente improvise políticas comerciales o procedimientos.",
    },
    {
      question:
        "¿Se integra con la telefonía y los sistemas de mi organización?",
      answer:
        "Las integraciones se evalúan según la infraestructura existente, las interfaces disponibles y el flujo de atención. La compatibilidad y el alcance se validan antes de acordar una implementación; no se promete conexión automática con cualquier sistema.",
    },
    {
      question: "¿Cómo se contrata y cuánto cuesta?",
      answer:
        "El primer paso es solicitar una demo y describir la operación. El alcance, las integraciones, los criterios de evaluación y las condiciones comerciales se acuerdan para cada proyecto. MEHI no publica una tarifa universal en este sitio.",
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

export type PublicPage = {
  slug: string;
  label: string;
  title: string;
  description: string;
  introduction: string;
  sections: ContentSection[];
  audience?: "government";
  example?: IllustrativeExample;
};

export const publicPages: PublicPage[] = [
  {
    slug: "plataforma",
    label: "La plataforma",
    title: "Plataforma de IA para atención ciudadana y atención al cliente",
    description:
      "Conocé MEHI, la plataforma de GIV que conecta agentes de voz IA, equipos humanos y conocimiento institucional para gobiernos y empresas.",
    introduction: site.introduction,
    sections: [
      {
        heading: "Qué resuelve MEHI en una operación de atención",
        paragraphs: [
          "Una consulta puede pasar por una conversación automática, una transferencia y la intervención de un operador. Cuando esas etapas funcionan de forma aislada, la persona repite su necesidad y la organización pierde contexto. MEHI conecta la atención con el conocimiento que la sostiene y con la evidencia necesaria para revisarla.",
          "La plataforma permite configurar agentes de voz, seguir llamadas y analizar resultados. El objetivo es que la organización pueda entender qué se respondió, cuándo fue necesaria una derivación y qué información o regla necesita mejorar.",
        ],
      },
      {
        heading: "Conversación, conocimiento y supervisión",
        paragraphs: [
          "El agente conversa a partir de instrucciones y conocimiento preparados para la operación. La participación humana se define mediante reglas: qué puede resolver la IA, qué debe consultar y cuándo corresponde transferir la atención.",
          "KORENUS complementa a MEHI en la gestión del conocimiento institucional y en el trabajo del operador. La relación entre ambos productos permite conectar la conversación con fichas y gestiones, según el alcance implementado.",
        ],
        bullets: [...site.features],
      },
      {
        heading: "Cuándo tiene sentido evaluarlo",
        paragraphs: [
          "MEHI puede evaluarse cuando un equipo recibe consultas repetidas, administra procedimientos propios o necesita supervisar la convivencia entre IA y personas. La decisión no depende solamente de cuántas llamadas recibe: también importan la calidad de la información, las excepciones y la capacidad de intervenir.",
          "No es una herramienta para que un consumidor delegue gestiones personales. Es una solución para organizaciones que definen y supervisan su propia atención.",
        ],
      },
      {
        heading: "Qué acordar antes de implementar",
        paragraphs: [
          "El alcance se construye con la organización: procesos a cubrir, fuentes de información, telefonía, sistemas involucrados, responsables y criterios de aceptación. Las integraciones, los tiempos de implementación y las condiciones comerciales requieren una evaluación específica.",
        ],
        bullets: [
          "Elegir una necesidad concreta de atención y sus excepciones.",
          "Identificar quién valida el conocimiento y autoriza cambios.",
          "Definir los límites del agente y el recorrido hacia un operador.",
          "Acordar qué evidencia se revisará para evaluar el resultado.",
        ],
      },
    ],
  },
  {
    slug: "ia-para-gobiernos",
    label: "Gobiernos y organismos públicos",
    audience: "government",
    title: "Agentes de voz con IA para gobiernos y organismos públicos",
    description:
      "MEHI, la plataforma de GIV para atención ciudadana con IA, conocimiento institucional y equipos humanos. Evaluá el alcance para tu organismo.",
    introduction:
      "MEHI es la plataforma de GIV para gestionar atención ciudadana con IA y equipos humanos. Permite configurar agentes de voz, trabajar con conocimiento institucional validado y supervisar las conversaciones. El alcance se define con cada organismo.",
    sections: [
      {
        heading: "Atención ciudadana con responsabilidades claras",
        paragraphs: [
          "Una consulta ciudadana puede requerir orientación, una aclaración o la intervención de una persona. Antes de automatizar, el organismo necesita definir qué puede responder el agente, qué información respalda la respuesta y qué recorrido corresponde cuando el caso queda fuera de alcance.",
          "MEHI permite trabajar sobre esas instrucciones y revisar las conversaciones. La automatización no equivale por sí sola a aprobar una solicitud, resolver un expediente o completar una gestión en otro sistema: cualquier acción de ese tipo requiere una integración y un alcance acordados.",
        ],
      },
      {
        heading: "Conocimiento institucional y continuidad humana",
        paragraphs: [
          "El organismo define las fuentes y las reglas que autoriza a utilizar. Conviene establecer responsables de revisión, criterios de actualización y un recorrido para las preguntas que no tienen una respuesta confirmada.",
          "La derivación a un equipo humano se diseña según la telefonía y los sistemas disponibles. Qué contexto acompaña la atención, dónde se consulta y qué ocurre si una dependencia no responde deben verificarse durante la evaluación del proyecto.",
        ],
        bullets: [
          "Consultas informativas dentro de un alcance definido.",
          "Instrucciones y conocimiento revisados por responsables del organismo.",
          "Intervención humana para excepciones y situaciones no cubiertas.",
          "Seguimiento de llamadas y revisión de respuestas y derivaciones.",
        ],
      },
      {
        heading: "Qué revisar en una demostración",
        paragraphs: [
          "Una demostración útil incluye preguntas claras, formas diferentes de expresar una necesidad y consultas que no deberían resolverse automáticamente. Se puede empezar con información ficticia preparada para la evaluación, sin usar datos de ciudadanos ni material de clientes.",
          "La prueba debería permitir observar si el agente reconoce sus límites y si el recorrido humano funciona en las condiciones acordadas. Un ejemplo ilustrativo ayuda a explicar el enfoque, pero no sustituye una prueba de la plataforma y sus integraciones.",
        ],
      },
      {
        heading: "GIV y MEHI en la evaluación del proyecto",
        paragraphs: [
          company.description,
          "En la conversación inicial se revisan la necesidad de atención, las fuentes disponibles, las dependencias de telefonía y los responsables de la evaluación. Los tiempos, el soporte y las condiciones comerciales se definen para el proyecto; no se anuncian resultados universales.",
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
    slug: "agentes-de-voz-ia",
    label: "Agentes de voz IA",
    title: "Agentes de voz con IA para empresas",
    description:
      "Atención telefónica con agentes de voz IA, conocimiento validado y derivación humana. Conocé el enfoque de MEHI para operaciones empresariales.",
    introduction:
      "Los agentes de voz con IA de MEHI permiten atender consultas mediante conversaciones guiadas por las reglas y el conocimiento de una organización. La atención automatizada se combina con supervisión y derivación humana cuando el caso lo requiere.",
    sections: [
      {
        heading: "Cómo funciona una llamada con IA",
        paragraphs: [
          "La persona expresa su necesidad por teléfono. El agente identifica la intención, utiliza el contenido preparado para ese proceso y sigue el recorrido configurado. Puede informar, orientar o derivar, según las capacidades habilitadas para la operación.",
          "El alcance debe ser explícito: una respuesta informativa no equivale a completar una transacción en un sistema externo. Cuando hace falta ejecutar una gestión, esa acción depende de una integración y de reglas acordadas previamente.",
        ],
      },
      {
        heading: "Más que una voz natural",
        paragraphs: [
          "La calidad de un agente no se evalúa solamente por cómo suena. También debe comprender distintas formas de pedir lo mismo, manejar información incompleta y evitar respuestas sin respaldo. Una conversación fluida sirve cuando conduce al siguiente paso correcto.",
          "MEHI conecta la configuración de la conversación con el seguimiento de llamadas y la revisión de resultados. Esto permite analizar casos concretos y distinguir un problema de conocimiento de uno de conversación o integración.",
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
          "En una demo se puede revisar el proceso que querés mejorar y definir qué debería demostrar el agente antes de avanzar.",
        ],
      },
    ],
  },
  {
    slug: "ia-para-contact-centers",
    label: "Contact centers",
    title: "IA para contact centers y equipos de atención al cliente",
    description:
      "MEHI conecta agentes de voz IA y operadores humanos para contact centers que necesitan contexto, conocimiento consistente y supervisión de la atención.",
    introduction:
      "MEHI ayuda a organizar la convivencia entre agentes de voz con IA y equipos humanos en un contact center. El foco está en atender con conocimiento consistente, definir cuándo derivar y conservar evidencia para supervisar la operación.",
    sections: [
      {
        heading: "Diseñar el recorrido completo de atención",
        paragraphs: [
          "Automatizar el inicio de una llamada es solo una parte del trabajo. También hay que definir qué ocurre si la consulta requiere una excepción, si la información no alcanza o si la persona necesita hablar con un operador.",
          "La operación debe establecer responsabilidades: qué atiende la IA, qué resuelve el equipo humano y qué contexto necesita cada uno. MEHI permite trabajar sobre ese recorrido y revisar las llamadas que muestran dónde se interrumpe.",
        ],
      },
      {
        heading: "Conocimiento compartido entre IA y personas",
        paragraphs: [
          "Una respuesta puede ser incorrecta aunque el agente converse bien si usa un procedimiento desactualizado. Por eso conviene gobernar el contenido que alimenta la atención: responsables, revisiones, versiones y reglas de publicación.",
          "MEHI se complementa con KORENUS para conectar conocimiento institucional y gestión humana. Las capacidades concretas y el contexto disponible en cada transferencia se validan con los sistemas y la telefonía del proyecto.",
        ],
      },
      {
        heading: "Qué mirar al evaluar resultados",
        paragraphs: [
          "El resultado necesita definirse según la consulta. Una derivación correcta puede ser el resultado esperado; cerrar una llamada sin resolver no debe contarse automáticamente como éxito. La revisión debe combinar indicadores con evidencia de casos.",
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
          "Para evaluar MEHI conviene traer un proceso concreto, sus preguntas frecuentes, las excepciones y el recorrido actual hacia un operador. Con esa base se puede acordar un alcance verificable y revisar las integraciones necesarias.",
          "No se publican porcentajes universales de ahorro o resolución: los resultados dependen del proceso, del conocimiento disponible y de la implementación.",
        ],
      },
    ],
  },
  {
    slug: "gestion-del-conocimiento",
    label: "Gestión del conocimiento",
    title: "Conocimiento institucional para agentes de IA y atención humana",
    description:
      "Conectá la atención con información revisada y versionada. Conocé cómo MEHI y KORENUS vinculan conocimiento institucional, IA y equipos humanos.",
    introduction:
      "El conocimiento institucional es la información que una organización valida para responder y actuar: procedimientos, requisitos, reglas y excepciones. MEHI utiliza ese conocimiento en la conversación; KORENUS acompaña su gestión y el trabajo humano.",
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
    slug: "como-elegir-ia-para-atencion-al-cliente",
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
    slug: "como-evaluar-ia-para-atencion-ciudadana",
    label: "Guía para organismos públicos",
    audience: "government",
    title: "Cómo evaluar IA para atención ciudadana en un organismo público",
    description:
      "Guía de GIV para evaluar MEHI: alcance, conocimiento institucional, intervención humana, integraciones y evidencia de una prueba de atención ciudadana.",
    introduction:
      "Evaluar agentes de voz con IA para un organismo público requiere acordar responsabilidades y observar el recorrido completo de atención. Esta guía propone preguntas para una evaluación técnica y operativa de MEHI, la plataforma de GIV.",
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
        heading: "Convertir la evaluación en un alcance concreto con GIV",
        paragraphs: [
          "La propuesta debe identificar MEHI como plataforma y GIV como empresa oferente, junto con las integraciones, responsabilidades, soporte y condiciones comerciales del proyecto. El organismo conserva sus propios procesos de evaluación y contratación.",
          "Esta guía orienta una evaluación técnica y operativa. No acredita certificaciones, no garantiza resultados ni reemplaza la revisión de las condiciones que correspondan a cada organismo.",
        ],
      },
    ],
  },
];

export function findPublicPage(slug: string): PublicPage | undefined {
  return publicPages.find((page) => page.slug === slug);
}

export function publicUrls(): string[] {
  return [
    `${site.url}/`,
    ...publicPages.map((page) => `${site.url}/${page.slug}`),
  ];
}
