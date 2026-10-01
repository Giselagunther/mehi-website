/**
 * Textos de interfaz (menús, botones, formulario, línea de demo) por idioma.
 * Sin dependencias: lo importan componentes de cliente y no debe arrastrar el
 * contenido editorial al navegador.
 */
export type Locale = "es" | "en";

export const ui = {
  es: {
    skipToContent: "Ir al contenido",
    homeAria: "MEHI, ir al inicio",
    mainNav: "Navegación principal",
    mobileNav: "Navegación mobile",
    openNav: "Abrir navegación",
    nav: {
      solutions: "Soluciones",
      government: "Gobiernos",
      tryIt: "Probalo",
      howItWorks: "Cómo funciona",
      security: "Seguridad",
      contact: "Contacto",
    },
    signIn: "Ingresar",
    signInLong: "Ingresar a MEHI",
    requestDemo: "Solicitar demo",
    requestADemo: "Solicitar una demo",
    switchLanguage: { label: "English", short: "EN", aria: "View this page in English" },
    hero: {
      eyebrow: "IA para gobiernos y empresas",
      titleTop: "Atención que resuelve.",
      titleBottom: "Conocimiento que queda.",
      talkNow: "Hablá con MEHI ahora",
      seeHow: "Ver cómo funciona",
    },
    journey: {
      aria: "Recorrido resumido de una gestión en MEHI",
      title: "Una gestión en MEHI",
      status: "En curso",
      steps: [
        ["01", "Comprende", "Detecta qué necesita la persona."],
        ["02", "Resuelve", "Usa conocimiento institucional validado."],
        ["03", "Aprende", "Deja evidencia para mejorar."],
      ],
    },
    tryIt: {
      eyebrow: "Probalo ahora",
      title: "Hablá con MEHI. Ahora, desde acá.",
      body: "Es la misma inteligencia artificial que atiende llamadas. Tocá el botón, permití el micrófono y pedile lo que quieras: que te haga una demo, que te cuente cómo funciona o que le pase tus datos al equipo.",
      points: [
        "Una conversación de dos o tres minutos.",
        "Sin registrarte ni dejar datos, salvo que quieras.",
        "Las 24 horas, en español.",
      ],
    },
    outcomesAria: "Resultados principales",
    outcomes: [
      { title: "Resuelve más", description: "Con respuestas confiables y consistentes." },
      { title: "Deriva con contexto", description: "La persona no empieza de cero." },
      { title: "Mejora con evidencia", description: "Cada interacción deja aprendizaje." },
    ],
    solutions: {
      eyebrow: "Gobiernos, empresas y contact centers",
      title: "Agentes de voz IA, conocimiento y atención humana.",
      learnMore: "Conocer más",
    },
    how: {
      eyebrow: "Cómo funciona",
      title: "De una consulta a una mejor decisión.",
      videoAria:
        "Video: el agente de voz de MEHI, qué hace, cómo trabaja una llamada y cómo está armado",
      videoUnsupported: "Tu navegador no puede reproducir este video.",
      videoCaption:
        "El agente de voz de MEHI en menos de dos minutos: qué hace, cómo trabaja una llamada y cómo está armado.",
      videoMeta: "1:49 · con subtítulos",
      stepLabel: "PASO",
      steps: [
        { number: "01", title: "La persona se comunica", description: "MEHI comprende la necesidad y conserva el contexto." },
        { number: "02", title: "Resuelve o acompaña", description: "La IA responde o deriva a un equipo humano cuando corresponde." },
        { number: "03", title: "La operación aprende", description: "El resultado se convierte en evidencia para mejorar." },
      ],
      detailsTitle: "¿Querés entender el circuito completo?",
      detailsSubtitle: "Conocé las cuatro capacidades que trabajan juntas.",
      showDetails: "Ver detalles",
      hideDetails: "Ocultar",
      capabilities: [
        { title: "Conversación", description: "Comprende intención, necesidad y contexto." },
        { title: "Conocimiento", description: "Responde desde información institucional gobernada." },
        { title: "Continuidad", description: "MEHI y KORENUS sostienen la misma gestión entre IA y personas." },
        { title: "Observatorio", description: "Hace visibles dudas, resultados y oportunidades de mejora." },
      ],
    },
    trust: {
      eyebrow: "Control y confianza",
      title: "Más capacidad, sin perder el control.",
      items: [
        "Conocimiento validado",
        "Trazabilidad de cada gestión",
        "Supervisión humana cuando importa",
      ],
    },
    faq: {
      eyebrow: "Antes de una demo",
      title: "Preguntas de organizaciones que evalúan MEHI",
    },
    contact: {
      eyebrow: "Conversemos",
      title: "Transformá la atención sin perder el control.",
      body: "Tres datos y te escribimos para mostrarte cómo MEHI se integra con tu operación.",
    },
    footer: {
      know: "Conocer",
      textSummary: "Resumen en texto",
      contact: "Contacto",
      home: "Inicio",
    },
    page: {
      breadcrumbAria: "Ruta de navegación",
      seeExample: "Ver recorrido ficticio",
      governmentGuide: "Guía para organismos",
      businessGuide: "Guía de evaluación",
      ctaTitleGovernment: "Conversemos sobre la atención de tu organismo",
      ctaTitle: "Conversemos sobre tu operación",
      ctaBody:
        "Contanos qué atención querés mejorar. Revisamos el proceso, el conocimiento y las integraciones necesarias para definir un alcance concreto.",
      ctaButtonGovernment: "Solicitar una demostración para mi organismo",
      related: "Seguí explorando MEHI",
      exampleEyebrow: "Ejemplo ficticio · sólo lectura",
    },
    form: {
      fullName: "Nombre y apellido",
      organization: "Organización",
      email: "Correo",
      operation: "¿Qué atienden hoy o qué querés mejorar?",
      optional: "(opcional)",
      operationPlaceholder:
        "Por ejemplo: consultas y reclamos por teléfono, unas 400 llamadas por día.",
      honeypot: "Sitio web",
      submitting: "Enviando...",
      submit: "Quiero que me contacten",
      privacy: "Tres datos y te escribimos. Los usamos únicamente para responder tu solicitud.",
    },
    demo: {
      stop: "Terminar la conversación",
      connecting: "Conectando...",
      again: "Hablar de nuevo",
      start: "Hablá con MEHI ahora",
      agentTalking: "MEHI está hablando",
      agentListening: "MEHI te escucha",
      thanks:
        "Gracias por probar. Si querés que el equipo te contacte, dejá tus datos abajo o pedíselos a MEHI en la próxima conversación.",
      preferPhone: "¿Preferís llamar por teléfono?",
      disclaimer:
        "Es una línea de demostración, no una línea de atención real. La conversación queda registrada para poder responderte.",
      contactMe: "Quiero que me contacten",
    },
    notFound: {
      title: "Página no encontrada",
      heading: "No encontramos esa página",
      body: "Podés conocer las soluciones de MEHI o contactarnos desde el inicio.",
      back: "Volver a MEHI",
    },
  },
  en: {
    skipToContent: "Skip to content",
    homeAria: "MEHI, go to home page",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    openNav: "Open navigation",
    nav: {
      solutions: "Solutions",
      government: "Government",
      tryIt: "Try it",
      howItWorks: "How it works",
      security: "Security",
      contact: "Contact",
    },
    signIn: "Sign in",
    signInLong: "Sign in to MEHI",
    requestDemo: "Request a demo",
    requestADemo: "Request a demo",
    switchLanguage: { label: "Español", short: "ES", aria: "Ver esta página en español" },
    hero: {
      eyebrow: "AI for governments and businesses",
      titleTop: "Service that resolves.",
      titleBottom: "Knowledge that stays.",
      talkNow: "Talk to MEHI now",
      seeHow: "See how it works",
    },
    journey: {
      aria: "Summary of a case handled in MEHI",
      title: "A case in MEHI",
      status: "In progress",
      steps: [
        ["01", "Understands", "Detects what the person needs."],
        ["02", "Resolves", "Uses validated institutional knowledge."],
        ["03", "Learns", "Leaves evidence to improve."],
      ],
    },
    tryIt: {
      eyebrow: "Try it now",
      title: "Talk to MEHI. Right now, right here.",
      body: "It is the same artificial intelligence that answers calls. Press the button, allow the microphone and ask for whatever you want: a demo, an explanation of how it works, or to pass your details to the team.",
      points: [
        "A two- or three-minute conversation.",
        "No sign-up and no personal details, unless you want to.",
        "Available 24/7. The demo line currently speaks Spanish only.",
      ],
    },
    outcomesAria: "Key outcomes",
    outcomes: [
      { title: "Resolves more", description: "With reliable, consistent answers." },
      { title: "Hands off with context", description: "Nobody has to start from scratch." },
      { title: "Improves with evidence", description: "Every interaction leaves a lesson." },
    ],
    solutions: {
      eyebrow: "Governments, businesses and contact centers",
      title: "AI voice agents, knowledge and human service.",
      learnMore: "Learn more",
    },
    how: {
      eyebrow: "How it works",
      title: "From an inquiry to a better decision.",
      videoAria:
        "Video: MEHI's voice agent, what it does, how it handles a call and how it is built",
      videoUnsupported: "Your browser cannot play this video.",
      videoCaption:
        "MEHI's voice agent in under two minutes: what it does, how it handles a call and how it is built.",
      videoMeta: "1:49 · Spanish audio, English subtitles",
      stepLabel: "STEP",
      steps: [
        { number: "01", title: "Someone reaches out", description: "MEHI understands the need and keeps the context." },
        { number: "02", title: "Resolves or supports", description: "The AI answers or hands off to a human team when appropriate." },
        { number: "03", title: "The operation learns", description: "The outcome becomes evidence for improvement." },
      ],
      detailsTitle: "Want to understand the full cycle?",
      detailsSubtitle: "Meet the four capabilities that work together.",
      showDetails: "See details",
      hideDetails: "Hide",
      capabilities: [
        { title: "Conversation", description: "Understands intent, need and context." },
        { title: "Knowledge", description: "Answers from governed institutional information." },
        { title: "Continuity", description: "MEHI and KORENUS carry the same case between AI and people." },
        { title: "Observatory", description: "Surfaces questions, outcomes and opportunities to improve." },
      ],
    },
    trust: {
      eyebrow: "Control and trust",
      title: "More capacity, without losing control.",
      items: [
        "Validated knowledge",
        "Traceability for every case",
        "Human oversight when it matters",
      ],
    },
    faq: {
      eyebrow: "Before a demo",
      title: "Questions from organizations evaluating MEHI",
    },
    contact: {
      eyebrow: "Let's talk",
      title: "Transform your service without losing control.",
      body: "Three details and we'll get in touch to show you how MEHI fits into your operation.",
    },
    footer: {
      know: "About",
      textSummary: "Text summary",
      contact: "Contact",
      home: "Home",
    },
    page: {
      breadcrumbAria: "Breadcrumb",
      seeExample: "See the fictional walkthrough",
      governmentGuide: "Guide for agencies",
      businessGuide: "Evaluation guide",
      ctaTitleGovernment: "Let's talk about your agency's citizen services",
      ctaTitle: "Let's talk about your operation",
      ctaBody:
        "Tell us which service you want to improve. We review the process, the knowledge and the integrations needed to define a concrete scope.",
      ctaButtonGovernment: "Request a demonstration for my agency",
      related: "Keep exploring MEHI",
      exampleEyebrow: "Fictional example · read only",
    },
    form: {
      fullName: "Full name",
      organization: "Organization",
      email: "Email",
      operation: "What do you handle today, or what do you want to improve?",
      optional: "(optional)",
      operationPlaceholder: "For example: phone inquiries and complaints, about 400 calls a day.",
      honeypot: "Website",
      submitting: "Sending...",
      submit: "Contact me",
      privacy: "Three details and we'll write to you. We only use them to answer your request.",
    },
    demo: {
      stop: "End the conversation",
      connecting: "Connecting...",
      again: "Talk again",
      start: "Talk to MEHI now",
      agentTalking: "MEHI is speaking",
      agentListening: "MEHI is listening",
      thanks:
        "Thanks for trying it. If you'd like the team to contact you, leave your details below or give them to MEHI in your next conversation.",
      preferPhone: "Prefer to call by phone?",
      disclaimer:
        "This is a demonstration line, not a real service line. The conversation is recorded so we can get back to you.",
      contactMe: "Contact me",
    },
    notFound: {
      title: "Page not found",
      heading: "We couldn't find that page",
      body: "You can explore MEHI's solutions or contact us from the home page.",
      back: "Back to MEHI",
    },
  },
} as const;

export type UiText = (typeof ui)[Locale];
