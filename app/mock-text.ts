/**
 * Textos y datos de los tableros ilustrativos del sitio (portada y páginas).
 * TODO es inventado: ningún número, motivo ni conversación sale de un cliente.
 * Cada tablero lleva el rótulo «Ejemplo · datos ilustrativos» (`badge`).
 * Lo importan sólo componentes de servidor: no viaja al navegador como código.
 */
import type { Locale } from "./ui-text.ts";

export type KpiFormat = "number" | "percent" | "duration";
export type Kpi = {
  label: string;
  value: number;
  format: KpiFormat;
  note: string;
  trend: number[];
};
export type Share = [label: string, percent: number];

// Un día inventado de 08 a 20 h: 912 llamadas resueltas por el agente y 372
// derivadas (1.284 en total, 71 % y 29 %). Los tableros dicen lo mismo.
export const hourLabels = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
export const resolvedByHour = [40, 55, 75, 89, 95, 83, 70, 76, 93, 86, 68, 50, 32];
export const derivedByHour = [15, 22, 32, 38, 42, 35, 28, 31, 37, 34, 26, 19, 13];

const trends = {
  calls: [42, 48, 45, 53, 58, 55, 63, 61, 68, 72],
  resolved: [61, 63, 62, 65, 66, 68, 67, 69, 70, 71],
  derived: [39, 37, 38, 35, 34, 32, 33, 31, 30, 29],
  duration: [190, 184, 186, 178, 175, 172, 170, 168, 165, 161],
};

const es = {
  badge: "Ejemplo · datos ilustrativos",
  live: "En vivo",
  dashboard: {
    window: "MEHI · Panel de la operación",
    aria: "Ejemplo de panel de MEHI con datos ilustrativos: llamadas del día, motivos y últimas conversaciones.",
    heading: "Resumen de hoy",
    subheading: "Línea de atención · se actualiza en vivo",
    ranges: ["Hoy", "7 días", "30 días"],
    kpis: [
      { label: "Llamadas atendidas", value: 1284, format: "number", note: "+8% que ayer", trend: trends.calls },
      { label: "Resueltas por el agente", value: 71, format: "percent", note: "912 llamadas", trend: trends.resolved },
      { label: "Derivadas a tu equipo", value: 29, format: "percent", note: "372 llamadas", trend: trends.derived },
      { label: "Duración promedio", value: 161, format: "duration", note: "12 s menos que ayer", trend: trends.duration },
    ] satisfies Kpi[],
    byHourTitle: "Llamadas por hora",
    resolved: "Resueltas por el agente",
    derived: "Derivadas a tu equipo",
    reasonsTitle: "Motivos más frecuentes",
    reasons: [
      ["Estado de un pedido o trámite", 34],
      ["Turnos", 22],
      ["Reclamos", 18],
      ["Horarios y sedes", 14],
      ["Otros", 12],
    ] satisfies Share[],
    recentTitle: "Últimas llamadas",
    columns: ["Hora", "Motivo", "Resultado", "Duración"],
    rows: [
      ["14:32", "Turnos", "resolved", "1:58"],
      ["14:29", "Reclamo", "derived", "3:12"],
      ["14:27", "Estado de un trámite", "resolved", "2:05"],
      ["14:25", "Horarios y sedes", "resolved", "0:54"],
    ] as [string, string, "resolved" | "derived", string][],
    resolvedChip: "Resuelta por el agente",
    derivedChip: "Derivada a tu equipo",
    alerts: "2 llamadas para revisar",
  },
  hero: {
    window: "Panel · hoy",
    kpis: [
      { label: "Llamadas", value: 1284, format: "number" },
      { label: "Por el agente", value: 71, format: "percent" },
      { label: "A tu equipo", value: 29, format: "percent" },
    ] as { label: string; value: number; format: KpiFormat }[],
    chart: "Llamadas por hora",
  },
  answer: {
    aria: "Ejemplo: una respuesta del agente y la ficha aprobada que la respalda.",
    conversation: "Conversación",
    callerLabel: "Persona",
    callerLine: "¿Qué necesito para renovar la licencia de conducir?",
    agentLabel: "MEHI",
    agentLine:
      "Tu documento y la licencia anterior. El trámite se hace con turno: ¿querés que te cuente cómo sacarlo?",
    source: "Respondió con la ficha «Renovación de licencia» · aprobada",
    recordWindow: "Ficha de información",
    recordTitle: "Renovación de licencia de conducir",
    status: "Aprobada",
    meta: "Versión 3 · revisada hace 2 días · Área de Atención",
    sections: [
      { title: "Requisitos", items: ["Documento de identidad", "Licencia anterior", "Turno previo"] },
      { title: "Dónde", items: ["En las sedes de atención, con turno"] },
      { title: "Si falta información", items: ["Derivar al equipo de atención"] },
    ],
  },
  government: {
    window: "MEHI · Panel del organismo",
    aria: "Ejemplo de panel para un organismo público, con datos ilustrativos: consultas del día, trámites más consultados y derivaciones por área.",
    kpis: [
      { label: "Consultas atendidas", value: 2130, format: "number", note: "hoy", trend: trends.calls },
      { label: "Orientadas sin derivar", value: 76, format: "percent", note: "1.619 consultas", trend: trends.resolved },
      { label: "Derivadas por área", value: 24, format: "percent", note: "511 consultas", trend: trends.derived },
    ] satisfies Kpi[],
    topicsTitle: "Trámites más consultados",
    topics: [
      ["Turnos y renovaciones", 31],
      ["Tasas y pagos", 24],
      ["Reclamos en la vía pública", 19],
      ["Habilitaciones", 14],
      ["Otros", 12],
    ] satisfies Share[],
    areasTitle: "Derivaciones por área",
    areas: [
      ["Atención al vecino", 38],
      ["Tránsito", 24],
      ["Rentas", 21],
      ["Obras públicas", 17],
    ] satisfies Share[],
  },
  contactCenter: {
    window: "MEHI · Servicios por cliente",
    aria: "Ejemplo de panel para un contact center, con datos ilustrativos: llamadas por cliente, reparto entre el agente y los operadores, y cola de espera.",
    columns: ["Cliente", "Llamadas hoy", "Por el agente", "A operadores", "Cola"],
    rows: [
      ["Cliente A · Seguros", 842, 68, 269, "ok"],
      ["Cliente B · Telecomunicaciones", 1307, 74, 340, "wait"],
      ["Cliente C · Salud", 516, 61, 201, "ok"],
    ] as [string, number, number, number, "ok" | "wait"][],
    queueOk: "Sin espera",
    queueWait: "2 en espera",
    chartTitle: "Agente y operadores, por hora",
    agent: "Agente de voz",
    operators: "Operadores",
  },
  business: {
    aria: "Ejemplo: durante la llamada el agente consulta el CRM, responde y deja registrado el contacto.",
    steps: [
      { title: "La persona llama", detail: "«¿Cuándo me llega el pedido?»" },
      { title: "MEHI consulta tu CRM", detail: "Pedido #48213 · En camino" },
      { title: "Responde y lo registra", detail: "«Llega el jueves.» Queda anotado en el historial." },
    ],
    crmWindow: "Tu CRM · Pedido #48213",
    fields: [
      ["Estado", "En camino"],
      ["Entrega estimada", "Jueves"],
      ["Canal de compra", "Web"],
      ["Productos", "2"],
    ] as [string, string][],
    historyTitle: "Historial de contacto",
    history: [
      ["Hoy 14:31", "Llamada atendida por MEHI: consultó el estado del pedido. Resuelta."],
      ["Lunes 10:12", "Compra confirmada."],
    ] as [string, string][],
  },
};

const en: typeof es = {
  badge: "Example · illustrative data",
  live: "Live",
  dashboard: {
    window: "MEHI · Operations dashboard",
    aria: "Example of a MEHI dashboard with illustrative data: today's calls, reasons and latest conversations.",
    heading: "Today's summary",
    subheading: "Service line · updates live",
    ranges: ["Today", "7 days", "30 days"],
    kpis: [
      { label: "Calls answered", value: 1284, format: "number", note: "+8% vs. yesterday", trend: trends.calls },
      { label: "Resolved by the agent", value: 71, format: "percent", note: "912 calls", trend: trends.resolved },
      { label: "Handed off to your team", value: 29, format: "percent", note: "372 calls", trend: trends.derived },
      { label: "Average duration", value: 161, format: "duration", note: "12 s shorter than yesterday", trend: trends.duration },
    ],
    byHourTitle: "Calls per hour",
    resolved: "Resolved by the agent",
    derived: "Handed off to your team",
    reasonsTitle: "Top reasons",
    reasons: [
      ["Order or case status", 34],
      ["Appointments", 22],
      ["Complaints", 18],
      ["Hours and locations", 14],
      ["Other", 12],
    ],
    recentTitle: "Latest calls",
    columns: ["Time", "Reason", "Outcome", "Duration"],
    rows: [
      ["14:32", "Appointments", "resolved", "1:58"],
      ["14:29", "Complaint", "derived", "3:12"],
      ["14:27", "Case status", "resolved", "2:05"],
      ["14:25", "Hours and locations", "resolved", "0:54"],
    ],
    resolvedChip: "Resolved by the agent",
    derivedChip: "Handed off to your team",
    alerts: "2 calls to review",
  },
  hero: {
    window: "Dashboard · today",
    kpis: [
      { label: "Calls", value: 1284, format: "number" },
      { label: "By the agent", value: 71, format: "percent" },
      { label: "To your team", value: 29, format: "percent" },
    ],
    chart: "Calls per hour",
  },
  answer: {
    aria: "Example: an answer from the agent and the approved record that backs it.",
    conversation: "Conversation",
    callerLabel: "Caller",
    callerLine: "What do I need to renew my driver's license?",
    agentLabel: "MEHI",
    agentLine:
      "Your ID and your previous license. It requires an appointment: would you like me to explain how to book one?",
    source: "Answered with the record “License renewal” · approved",
    recordWindow: "Information record",
    recordTitle: "Driver's license renewal",
    status: "Approved",
    meta: "Version 3 · reviewed 2 days ago · Service Department",
    sections: [
      { title: "Requirements", items: ["ID document", "Previous license", "Prior appointment"] },
      { title: "Where", items: ["At service offices, by appointment"] },
      { title: "If information is missing", items: ["Hand off to the service team"] },
    ],
  },
  government: {
    window: "MEHI · Agency dashboard",
    aria: "Example of a dashboard for a public agency, with illustrative data: today's inquiries, most requested procedures and handoffs by department.",
    kpis: [
      { label: "Inquiries answered", value: 2130, format: "number", note: "today", trend: trends.calls },
      { label: "Guided without handoff", value: 76, format: "percent", note: "1,619 inquiries", trend: trends.resolved },
      { label: "Handed off by department", value: 24, format: "percent", note: "511 inquiries", trend: trends.derived },
    ],
    topicsTitle: "Most requested procedures",
    topics: [
      ["Appointments and renewals", 31],
      ["Fees and payments", 24],
      ["Public space complaints", 19],
      ["Business permits", 14],
      ["Other", 12],
    ],
    areasTitle: "Handoffs by department",
    areas: [
      ["Citizen services", 38],
      ["Traffic", 24],
      ["Revenue", 21],
      ["Public works", 17],
    ],
  },
  contactCenter: {
    window: "MEHI · Services by client",
    aria: "Example of a contact center dashboard, with illustrative data: calls per client, split between the agent and operators, and queue status.",
    columns: ["Client", "Calls today", "By the agent", "To operators", "Queue"],
    rows: [
      ["Client A · Insurance", 842, 68, 269, "ok"],
      ["Client B · Telecom", 1307, 74, 340, "wait"],
      ["Client C · Healthcare", 516, 61, 201, "ok"],
    ],
    queueOk: "No wait",
    queueWait: "2 waiting",
    chartTitle: "Agent and operators, per hour",
    agent: "Voice agent",
    operators: "Operators",
  },
  business: {
    aria: "Example: during the call the agent checks the CRM, answers and logs the contact.",
    steps: [
      { title: "The customer calls", detail: "“When will my order arrive?”" },
      { title: "MEHI checks your CRM", detail: "Order #48213 · In transit" },
      { title: "It answers and logs it", detail: "“It arrives on Thursday.” Added to the history." },
    ],
    crmWindow: "Your CRM · Order #48213",
    fields: [
      ["Status", "In transit"],
      ["Estimated delivery", "Thursday"],
      ["Purchase channel", "Web"],
      ["Items", "2"],
    ],
    historyTitle: "Contact history",
    history: [
      ["Today 14:31", "Call answered by MEHI: checked the order status. Resolved."],
      ["Monday 10:12", "Purchase confirmed."],
    ],
  },
};

export const mockText: Record<Locale, typeof es> = { es, en };
