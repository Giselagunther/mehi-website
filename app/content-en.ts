/**
 * English version of the approved public content. Same pages and claims as
 * `content.ts`: translate, never add claims the Spanish site does not make.
 * Do not add client references without authorization.
 */
import type { PublicPage } from "./content.ts";

export const company = {
  name: "GIV",
  url: "https://givsrl.com.ar/",
  relationship: "MEHI is GIV's platform.",
  description:
    "GIV is the company behind MEHI, a platform for AI voice agents, institutional knowledge and service oversight.",
} as const;

export const site = {
  name: "MEHI",
  url: "https://www.mehi.ar",
  title: "MEHI | AI for governments and businesses · A GIV platform",
  description:
    "MEHI, GIV's platform for citizen services and customer service: AI voice agents, institutional knowledge and human oversight.",
  introduction:
    "MEHI is GIV's platform for managing citizen services and customer service with AI and human teams. It brings together voice agents, institutional knowledge and oversight for governments, public agencies, businesses and contact centers.",
  hero: "MEHI is GIV's platform for managing citizen services with AI and human teams. It also supports customer service for businesses and contact centers, with institutional knowledge and oversight.",
  features: [
    "Voice agents powered by conversational artificial intelligence",
    "Answers based on validated institutional knowledge",
    "Handoff to human teams according to the operation's rules",
    "Call tracking, reports and a traceable history of changes",
    "Knowledge management and continuity with KORENUS",
  ],
  faqs: [
    {
      question: "What is MEHI?",
      answer:
        "MEHI is a platform that combines AI voice agents, institutional knowledge and human service. It is built for governments and businesses that need to handle inquiries with continuity, oversight and traceability. We say AI, the term our clients use; since September 2026, the U.S. federal government calls it super intelligence (SI).",
    },
    {
      question: "How are GIV and MEHI related?",
      answer:
        "GIV is the company that offers MEHI. MEHI is the name of the platform. The scope of each project, its integrations and commercial terms are agreed with GIV.",
    },
    {
      question: "Which organizations is it for?",
      answer:
        "Governments and public agencies that serve citizens, businesses with customer service teams, and contact centers. The scope is defined by the processes, the available knowledge and the systems each operation needs.",
    },
    {
      question: "Does the AI replace human operators?",
      answer:
        "MEHI lets you combine automated and human service. The AI can answer or hand off according to the configured rules; people keep oversight and handle the cases that require human intervention.",
    },
    {
      question: "Where does it get the information to answer?",
      answer:
        "From institutional knowledge that is prepared, reviewed and published for the operation. KORENUS supports the management of that knowledge and the work of human teams. The agent is not left to improvise commercial policies or procedures.",
    },
    {
      question:
        "Does it integrate with my organization's phone system and software?",
      answer:
        "Integrations are assessed based on the existing infrastructure, the available interfaces and the service flow. Compatibility and scope are validated before agreeing on an implementation; automatic connection with any system is not promised.",
    },
    {
      question: "How do I hire it and how much does it cost?",
      answer:
        "The first step is to request a demo and describe your operation. Scope, integrations, evaluation criteria and commercial terms are agreed for each project. MEHI does not publish a one-size-fits-all price on this site.",
    },
  ],
} as const;

export const publicPages: PublicPage[] = [
  {
    id: "plataforma",
    slug: "platform",
    label: "The platform",
    title: "AI platform for citizen services and customer service",
    description:
      "Meet MEHI, GIV's platform that connects AI voice agents, human teams and institutional knowledge for governments and businesses.",
    introduction: site.introduction,
    sections: [
      {
        heading: "What MEHI solves in a service operation",
        paragraphs: [
          "An inquiry can go through an automated conversation, a transfer and the intervention of an operator. When those stages work in isolation, the person has to repeat what they need and the organization loses context. MEHI connects service with the knowledge behind it and with the evidence needed to review it.",
          "The platform lets you configure voice agents, follow calls and analyze results. The goal is for the organization to understand what was answered, when a handoff was needed and which information or rule needs improvement.",
        ],
      },
      {
        heading: "Conversation, knowledge and oversight",
        paragraphs: [
          "The agent converses based on instructions and knowledge prepared for the operation. Human involvement is defined by rules: what the AI can resolve, what it must check and when the conversation should be transferred.",
          "KORENUS complements MEHI in managing institutional knowledge and supporting operators. Together, both products connect the conversation with knowledge records and case handling, depending on the scope implemented.",
        ],
        bullets: [...site.features],
      },
      {
        heading: "When it makes sense to evaluate it",
        paragraphs: [
          "MEHI is worth evaluating when a team receives repeated inquiries, manages its own procedures or needs to oversee how AI and people work together. The decision does not depend only on call volume: the quality of the information, the exceptions and the ability to intervene also matter.",
          "It is not a tool for consumers to delegate personal errands. It is a solution for organizations that define and oversee their own service.",
        ],
      },
      {
        heading: "What to agree on before implementing",
        paragraphs: [
          "The scope is built together with the organization: processes to cover, information sources, telephony, systems involved, owners and acceptance criteria. Integrations, implementation timelines and commercial terms require a specific assessment.",
        ],
        bullets: [
          "Choose a concrete service need and its exceptions.",
          "Identify who validates the knowledge and approves changes.",
          "Define the agent's limits and the path to an operator.",
          "Agree on the evidence that will be reviewed to assess the result.",
        ],
      },
    ],
  },
  {
    id: "ia-para-gobiernos",
    slug: "ai-for-government",
    label: "Governments and public agencies",
    audience: "government",
    title: "AI voice agents for governments and public agencies",
    description:
      "MEHI, GIV's platform for citizen services with AI, institutional knowledge and human teams. Assess the scope for your agency.",
    introduction:
      "MEHI is GIV's platform for managing citizen services with AI and human teams. It lets you configure voice agents, work with validated institutional knowledge and oversee conversations. The scope is defined with each agency.",
    sections: [
      {
        heading: "Citizen services with clear responsibilities",
        paragraphs: [
          "A citizen inquiry may require guidance, a clarification or the intervention of a person. Before automating, the agency needs to define what the agent can answer, which information backs the answer and what path applies when a case falls outside the scope.",
          "MEHI lets you work on those instructions and review conversations. Automation alone does not mean approving an application, resolving a case file or completing a transaction in another system: any action of that kind requires an agreed integration and scope.",
        ],
      },
      {
        heading: "Institutional knowledge and human continuity",
        paragraphs: [
          "The agency defines the sources and rules it authorizes the agent to use. It is advisable to assign review owners, update criteria and a path for questions that have no confirmed answer.",
          "The handoff to a human team is designed around the available telephony and systems. What context travels with the conversation, where it can be checked and what happens if a department does not respond should be verified while evaluating the project.",
        ],
        bullets: [
          "Informational inquiries within a defined scope.",
          "Instructions and knowledge reviewed by the agency's owners.",
          "Human intervention for exceptions and uncovered situations.",
          "Call tracking and review of answers and handoffs.",
        ],
      },
      {
        heading: "What to review in a demonstration",
        paragraphs: [
          "A useful demonstration includes clear questions, different ways of expressing a need and inquiries that should not be resolved automatically. You can start with fictional information prepared for the evaluation, without using citizen data or client material.",
          "The test should show whether the agent recognizes its limits and whether the human path works under the agreed conditions. An illustrative example helps explain the approach, but it does not replace a test of the platform and its integrations.",
        ],
      },
      {
        heading: "GIV and MEHI in the project evaluation",
        paragraphs: [
          company.description,
          "The first conversation covers the service need, the available sources, the telephony dependencies and the people responsible for the evaluation. Timelines, support and commercial terms are defined for the project; no universal results are announced.",
        ],
      },
    ],
    example: {
      kind: "fictional",
      heading: "Illustrative walkthrough of an inquiry",
      disclosure:
        "Fictional, read-only example. It is not a real call or a live agent. Opening each step only shows prepared text; no action is taken.",
      context:
        "Invented scenario: an agency evaluates how to guide an informational inquiry that ends up requiring human review. It does not reproduce any implementation or use client material.",
      steps: [
        {
          heading: "Clarify the need",
          lines: [
            {
              speaker: "Caller",
              text: "I need guidance to submit an application.",
            },
            {
              speaker: "AI agent",
              text: "Are you looking for general information or help with a specific situation?",
            },
          ],
          explanation:
            "What to evaluate: narrowing down the inquiry before asking for information that is not needed yet.",
        },
        {
          heading: "Recognize the limit of the information",
          lines: [
            {
              speaker: "Caller",
              text: "My situation isn't covered by the information I have.",
            },
            {
              speaker: "AI agent",
              text: "I don't have a confirmed answer for that case. It needs to be reviewed by the service team.",
            },
          ],
          explanation:
            "What to evaluate: recognizing that there is no backing to answer, without inventing requirements or confirming actions that were not carried out.",
        },
        {
          heading: "Review the path to a person",
          lines: [
            {
              speaker: "AI agent",
              text: "This inquiry needs a person to step in.",
            },
          ],
          explanation:
            "What to evaluate in a real test: how the handoff happens, what information the human team receives and what evidence remains for oversight. Here it does not connect to any operator.",
        },
      ],
    },
  },
  {
    id: "agentes-de-voz-ia",
    slug: "ai-voice-agents",
    label: "AI voice agents",
    title: "AI voice agents for businesses",
    description:
      "Phone service with AI voice agents, validated knowledge and human handoff. Learn MEHI's approach for business operations.",
    introduction:
      "MEHI's AI voice agents handle inquiries through conversations guided by an organization's rules and knowledge. Automated service is combined with oversight and human handoff when the case requires it.",
    sections: [
      {
        heading: "How an AI call works",
        paragraphs: [
          "The caller explains what they need over the phone. The agent identifies the intent, uses the content prepared for that process and follows the configured path. It can inform, guide or hand off, depending on the capabilities enabled for the operation.",
          "The scope must be explicit: an informational answer is not the same as completing a transaction in an external system. When an action needs to be carried out, it depends on an integration and on rules agreed in advance.",
        ],
      },
      {
        heading: "More than a natural voice",
        paragraphs: [
          "An agent's quality is not judged only by how it sounds. It must also understand different ways of asking for the same thing, handle incomplete information and avoid unsupported answers. A fluent conversation is useful when it leads to the right next step.",
          "MEHI connects the conversation setup with call tracking and the review of results. This makes it possible to analyze specific cases and tell a knowledge problem apart from a conversation or integration problem.",
        ],
      },
      {
        heading: "What to prepare for a useful test",
        paragraphs: [
          "A representative test includes frequent situations and difficult cases. It is best to use scenarios prepared for the evaluation and to agree in advance on how any personal data will be handled. A single ideal call is not enough.",
        ],
        bullets: [
          "Common inquiries phrased in different words.",
          "Missing information or ambiguous answers from the caller.",
          "Requests outside the agent's authorized scope.",
          "Handoffs and continuity with the human team.",
          "Review of answers, completed steps and observed errors.",
        ],
      },
      {
        heading: "Telephony, scope and terms",
        paragraphs: [
          "The telephony connection is validated against each company's infrastructure. Volume, service hours, transfers and integrations are part of the project design, not a generic promise on this site.",
          "In a demo we can review the process you want to improve and define what the agent should demonstrate before moving forward.",
        ],
      },
    ],
  },
  {
    id: "ia-para-contact-centers",
    slug: "ai-for-contact-centers",
    label: "Contact centers",
    title: "AI for contact centers and customer service teams",
    description:
      "MEHI connects AI voice agents and human operators for contact centers that need context, consistent knowledge and service oversight.",
    introduction:
      "MEHI helps organize how AI voice agents and human teams work together in a contact center. The focus is on serving with consistent knowledge, defining when to hand off and keeping evidence to oversee the operation.",
    sections: [
      {
        heading: "Design the complete service journey",
        paragraphs: [
          "Automating the start of a call is only part of the job. You also need to define what happens if the inquiry requires an exception, if the information falls short or if the caller needs to speak with an operator.",
          "The operation must set responsibilities: what the AI handles, what the human team resolves and what context each one needs. MEHI lets you work on that journey and review the calls that show where it breaks down.",
        ],
      },
      {
        heading: "Knowledge shared between AI and people",
        paragraphs: [
          "An answer can be wrong even if the agent converses well, if it relies on an outdated procedure. That is why it pays to govern the content that feeds the service: owners, reviews, versions and publishing rules.",
          "MEHI is complemented by KORENUS to connect institutional knowledge and human case handling. The specific capabilities and the context available at each transfer are validated against the project's systems and telephony.",
        ],
      },
      {
        heading: "What to look at when evaluating results",
        paragraphs: [
          "The outcome has to be defined for each type of inquiry. A correct handoff can be the expected result; closing a call without resolving it should not automatically count as a success. The review should combine indicators with evidence from real cases.",
        ],
        bullets: [
          "Accuracy of the information provided.",
          "Adherence to the expected path for each need.",
          "Handoff reasons and continuity of service.",
          "Cases that require correcting content or instructions.",
          "Impact of changes, with a comparable before-and-after measurement.",
        ],
      },
      {
        heading: "An evaluation tied to your operation",
        paragraphs: [
          "To evaluate MEHI, bring a concrete process, its frequent questions, its exceptions and the current path to an operator. On that basis we can agree on a verifiable scope and review the integrations required.",
          "We do not publish universal savings or resolution percentages: results depend on the process, the available knowledge and the implementation.",
        ],
      },
    ],
  },
  {
    id: "gestion-del-conocimiento",
    slug: "knowledge-management",
    label: "Knowledge management",
    title: "Institutional knowledge for AI agents and human service",
    description:
      "Connect your service with reviewed, versioned information. Learn how MEHI and KORENUS link institutional knowledge, AI and human teams.",
    introduction:
      "Institutional knowledge is the information an organization validates in order to answer and act: procedures, requirements, rules and exceptions. MEHI uses that knowledge in the conversation; KORENUS supports its management and the work of people.",
    sections: [
      {
        heading: "Why uploading documents is not enough",
        paragraphs: [
          "A folder may contain contradictory procedures, outdated data or several versions of the same rule. An agent needs to know which information is approved and what to do when it cannot find a sufficient answer.",
          "Quality starts before the call: identifying the source, reviewing the content and preparing it for publication. The organization remains responsible for what it authorizes the agent to say.",
        ],
      },
      {
        heading: "The role of MEHI and KORENUS",
        paragraphs: [
          "MEHI manages the conversation and makes visible what happens on calls. KORENUS complements that work with institutional knowledge records and tools for human case handling. They are related products; the scope of their integration is agreed for each operation.",
          "Cases observed in service can reveal a missing explanation, a way of asking that is not recognized or an instruction that has become ambiguous. That evidence guides the review of the content without turning every conversation into an automatic change to the rules.",
        ],
      },
      {
        heading: "What a reliable source needs",
        paragraphs: [
          "Information that is useful for service must be understandable, verifiable and have an owner. It must also distinguish what the organization knows from what it still needs to confirm.",
        ],
        bullets: [
          "An identifiable institutional source and a review owner.",
          "Current procedures, with clear requirements and exceptions.",
          "Versions and criteria for approving and publishing changes.",
          "The different real ways people phrase an inquiry.",
          "A handoff path for when the information falls short.",
        ],
      },
      {
        heading: "How to start the evaluation",
        paragraphs: [
          "Pick a group of inquiries and review which sources your team uses today to answer them. The demo can start from that material and from the consistency problems you want to solve. There is no need to publish internal documentation on a commercial website.",
        ],
      },
    ],
  },
  {
    id: "como-elegir-ia-para-atencion-al-cliente",
    slug: "how-to-choose-ai-for-customer-service",
    label: "Guide to evaluating AI",
    title: "How to choose an AI platform for customer service",
    description:
      "B2B guide to evaluating AI voice agents: knowledge, human handoff, integrations, evidence, limits and implementation terms.",
    introduction:
      "To choose an AI platform for customer service, evaluate the whole process: the quality of the answers, the exceptions, the human continuity and the evidence available. This MEHI guide offers concrete questions for a business evaluation.",
    sections: [
      {
        heading: "Start with a need and an observable outcome",
        paragraphs: [
          "Define which inquiry you want to improve and what should happen at the end. Providing requirements, directing someone to a channel and completing a transaction are different outcomes. Spelling out that difference avoids comparing demos that promise different things.",
          "Ask for the test to include representative examples from your operation, and make it clear which capabilities are available, which depend on an integration and which are out of scope.",
        ],
      },
      {
        heading: "Review knowledge and the limits of the conversation",
        paragraphs: [
          "Ask where the agent gets its information, who approves it and how it is updated. Try a question with no answer in the sources: the expected behavior should be defined beforehand, including when to ask for clarification or hand off.",
          "A convincing voice does not prove accuracy. Check whether the agent preserves the meaning of the rules, recognizes missing information and avoids claiming it completed an action it did not carry out.",
        ],
      },
      {
        heading: "Check continuity with people and systems",
        paragraphs: [
          "Ask for an explanation of the path to an operator and of the information the operator actually receives. Verify the dependencies on telephony and on the company's systems. An announced integration must translate into concrete actions, data and responsibilities.",
        ],
        bullets: [
          "What can the agent resolve and what must it hand off?",
          "What information comes with the handoff and where can it be checked?",
          "What happens if an external system does not respond?",
          "Who approves changes to knowledge and instructions?",
          "How are access and the handling of information controlled?",
        ],
      },
      {
        heading: "Ask for evidence and comparable commercial terms",
        paragraphs: [
          "Agree on how errors and results will be reviewed, what will count as a resolution and how changes will be logged. Compare equivalent periods and avoid attributing an improvement to the AI if the process or the sample of inquiries changed at the same time.",
          "The commercial proposal should clarify scope, integrations, expected usage, support and implementation terms. Do not extrapolate the result of a demo to the whole operation without a representative evaluation.",
        ],
      },
      {
        heading: "How to evaluate MEHI with this guide",
        paragraphs: [
          "MEHI combines AI voice agents, institutional knowledge and service oversight. A demo lets you review your process and raise these questions with a concrete scope. Whether the solution is a good fit depends on your organization's needs and conditions.",
        ],
      },
    ],
  },
  {
    id: "como-evaluar-ia-para-atencion-ciudadana",
    slug: "how-to-evaluate-ai-for-citizen-services",
    label: "Guide for public agencies",
    audience: "government",
    title: "How to evaluate AI for citizen services in a public agency",
    description:
      "GIV's guide to evaluating MEHI: scope, institutional knowledge, human intervention, integrations and evidence from a citizen services test.",
    introduction:
      "Evaluating AI voice agents for a public agency requires agreeing on responsibilities and observing the complete service journey. This guide offers questions for a technical and operational evaluation of MEHI, GIV's platform.",
    sections: [
      {
        heading: "Define what you want to solve and what is out of scope",
        paragraphs: [
          "Choose a concrete set of inquiries and describe the expected outcome. Providing a requirement, directing someone to a channel and carrying out a transaction are different scopes. The test should distinguish them and point out which capabilities need external systems.",
        ],
        bullets: [
          "Which inquiries can the agent handle and which must it hand off?",
          "Which actions are enabled and how is their result verified?",
          "What happens when the caller asks for something outside the scope?",
        ],
      },
      {
        heading: "Agree on who validates the information and approves changes",
        paragraphs: [
          "Identify the sources and their owners. Include in the evaluation a question with no confirmed answer and another about a rule that has changed in the material prepared for the test. Review both the conversation and the process for correcting knowledge.",
        ],
        bullets: [
          "Who reviews and approves the content before it is used?",
          "How do you identify which information is current?",
          "Who approves changes to instructions and how is their effect reviewed?",
        ],
      },
      {
        heading: "Verify human intervention and dependencies",
        paragraphs: [
          "The proposal should explain how automated service connects with human service and what the telephony dependencies are. Verify with a test what information the operator receives, instead of assuming every conversation is transferred the same way.",
        ],
        bullets: [
          "How is a handoff requested or determined?",
          "What happens outside service hours or if no operator is available?",
          "What is communicated when an external system does not respond?",
        ],
      },
      {
        heading: "Define how information is handled before testing",
        paragraphs: [
          "Start with a set of fictional scenarios and avoid bringing citizen information into a commercial demonstration. For any later use of real information, the agency's officials must review access, data destinations and the conditions that apply to the project.",
        ],
        bullets: [
          "What information is needed and who can access it?",
          "Where is it processed, what is retained and for how long?",
          "How are exports, reviews and data requests handled?",
        ],
      },
      {
        heading: "Measure with evidence and agreed criteria",
        paragraphs: [
          "Prepare frequent, ambiguous and out-of-scope inquiries. Agree before the test on what counts as a correct answer, a resolution or an appropriate handoff. Do not extrapolate a demonstration example to the whole operation.",
          "Review results day by day and mark the dates of process or configuration changes. This avoids blending different conditions into an average that hides when an improvement or a problem appeared.",
        ],
      },
      {
        heading: "Turn the evaluation into a concrete scope with GIV",
        paragraphs: [
          "The proposal should identify MEHI as the platform and GIV as the offering company, together with the project's integrations, responsibilities, support and commercial terms. The agency keeps its own evaluation and procurement processes.",
          "This guide supports a technical and operational evaluation. It does not certify anything, does not guarantee results and does not replace the review of the conditions that apply to each agency.",
        ],
      },
    ],
  },
];
