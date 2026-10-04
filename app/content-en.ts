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
  title: "MEHI | AI voice agents for businesses, contact centers and governments",
  description:
    "Give your CRM and your organization's information a voice. MEHI answers calls with AI voice agents, responds with validated information and hands off to your team when needed.",
  introduction:
    "MEHI is an AI voice agent platform that gives your organization's information a voice: your CRM, your knowledge bases and your procedures. It answers calls, responds to inquiries and hands off to your team when needed, with oversight of every conversation. It works with governments, businesses and contact centers.",
  hero: "MEHI connects your organization's information to a voice agent that answers calls, responds to inquiries and hands off to your team when needed. And it lets you see and review every conversation.",
  heroNote:
    "Works with your CRM, your knowledge bases or other systems, depending on each project's integrations.",
  features: [
    "AI voice agents that answer calls in natural language",
    "Answers based on information your organization validated",
    "Lookups in your CRM or other systems, depending on the project's integrations",
    "Handoff to your team with the context of the call",
    "Logging, metrics and review of every conversation",
  ],
  faqs: [
    {
      question: "What is MEHI?",
      answer:
        "An AI voice agent platform. It gives your organization's information a voice to answer calls, respond to inquiries and hand off to your team the cases that need a person. Every conversation is logged so it can be overseen and improved. We say AI, the term our clients use; since September 2026, the U.S. federal government calls it super intelligence (SI).",
    },
    {
      question: "Do I have to change my CRM or my systems?",
      answer:
        "No. MEHI works with the information and systems you already use. What gets connected and how (CRM, knowledge bases, management systems, telephony) is defined for each project based on the available interfaces, and validated before implementation.",
    },
    {
      question: "Which organizations is it for?",
      answer:
        "Governments and public agencies that serve citizens, businesses with customer service teams, and contact centers. The scope is defined by the calls they receive, the available information and each operation's systems.",
    },
    {
      question: "Does the AI replace human operators?",
      answer:
        "No. MEHI combines automated and human service. The AI answers or hands off according to the rules your organization sets; people keep oversight and handle the cases that require human intervention.",
    },
    {
      question: "Where does it get the information to answer?",
      answer:
        "From the information your organization prepares, reviews and approves: procedures, requirements, frequent questions and, if the project includes it, data from your systems. The agent does not improvise. If something is not confirmed, it says so and hands off. Your team has tools to keep that information up to date.",
    },
    {
      question: "How is information protected?",
      answer:
        "Each organization's information is used only for its own service and kept separate from everyone else's. It travels encrypted and access is by user and role. Security and infrastructure documentation is presented and reviewed with your technical team during the evaluation.",
    },
    {
      question: "How do I hire it and how much does it cost?",
      answer:
        "We start with a conversation about your operation and a test with one of your cases. Scope, integrations and commercial terms are agreed for each project. We do not publish a one-size-fits-all price.",
    },
  ],
} as const;

export const publicPages: PublicPage[] = [
  {
    id: "plataforma",
    slug: "platform",
    kind: "solution",
    label: "Solution",
    eyebrow: "The solution",
    title: "AI voice agents connected to your organization's information",
    description:
      "What MEHI is, who it is for and how to hire it: AI voice agents that use your CRM and your validated information, with handoff to your team and oversight of every call.",
    introduction: site.introduction,
    useCases: {
      heading: "What MEHI does on every call",
      items: [
        {
          title: "Answers",
          description:
            "Picks up in natural language, at any hour, and understands what the person needs even in their own words.",
        },
        {
          title: "Responds",
          description:
            "Uses the information your organization validated and, if the project includes it, looks things up in your CRM or other systems.",
        },
        {
          title: "Hands off",
          description:
            "When the case needs a person, it passes it to your team with the context of the call.",
        },
        {
          title: "Shows you everything",
          description:
            "Every conversation is logged. You see what was answered, what was handed off and which information should be improved.",
        },
      ],
    },
    process: {
      heading: "How we get started",
      items: [
        {
          title: "We talk about your operation",
          description:
            "Which calls you receive, what information you answer with today and which systems you use.",
        },
        {
          title: "We test it with one of your cases",
          description:
            "We set up a focused test with your inquiries, on scenarios prepared for the evaluation.",
        },
        {
          title: "We implement and measure",
          description:
            "We connect the agreed telephony and systems, and review results with the evidence from the calls.",
        },
      ],
    },
    sections: [
      {
        heading: "Who it is for",
        paragraphs: [
          "MEHI serves organizations that receive many similar calls, manage their own information to answer them and need a person to be able to step in when necessary.",
        ],
        bullets: [
          "Governments and public agencies: guiding citizens on procedures and services.",
          "Businesses: serving customers with the information in their CRM and operation.",
          "Contact centers: voice agents that work alongside their operators, for each of their clients.",
        ],
      },
      {
        heading: "What the platform includes",
        paragraphs: [
          "The agent converses based on instructions and information prepared for your operation. Rules define what it can resolve on its own, what it has to check and when it passes the call to a person.",
        ],
        bullets: [...site.features],
      },
      {
        heading: "What MEHI does not do",
        paragraphs: [
          "It does not improvise answers or policies: if the information is not confirmed, it says so and hands off. It does not claim an action in another system if that integration was not agreed. And it does not replace your team's judgment in the cases that need it.",
          "It is not a tool for people to delegate their personal errands. It is a solution for organizations that define and oversee their own service.",
        ],
      },
      {
        heading: "What we agree on before implementing",
        paragraphs: [
          "The scope is built with your organization: calls to cover, information sources, telephony, systems involved, owners and acceptance criteria.",
        ],
        bullets: [
          "Choose a concrete service need and its exceptions.",
          "Identify who validates the information and approves changes.",
          "Define the agent's limits and the path to a person.",
          "Agree on the evidence that will be reviewed to assess the result.",
        ],
      },
      {
        heading: "How to hire it",
        paragraphs: [
          "Scope, integrations, evaluation criteria and commercial terms are agreed for each project. There is no single price: it depends on the calls handled, on what gets integrated and on the support your team needs.",
        ],
      },
    ],
  },
  {
    id: "ia-para-gobiernos",
    slug: "ai-for-government",
    kind: "audience",
    label: "Government",
    eyebrow: "Governments and public agencies",
    audience: "government",
    title: "AI voice agents for governments and public agencies",
    description:
      "Give your agency's information a voice: an AI voice agent that guides citizens through inquiries and procedures, with validated information and handoff to your team.",
    cta: "See the solution for governments",
    summary:
      "Guide citizens through inquiries and procedures, at any hour, with information your agency validated.",
    introduction:
      "MEHI gives your agency's information and services a voice. The agent guides citizens on procedures and services with the information the agency validated, and hands off to your team the cases that need a person. Every call is logged for oversight.",
    useCases: {
      heading: "What the agent can resolve",
      items: [
        {
          title: "Guidance on procedures",
          description:
            "Requirements, steps, hours and where each procedure is done, explained in plain language.",
        },
        {
          title: "Questions about each citizen's case",
          description:
            "If the project includes it, it identifies the person and checks the agency's systems to answer about their situation.",
        },
        {
          title: "Complaints and requests",
          description:
            "It takes the request, records the necessary details and files it for the right area, depending on the agreed integration.",
        },
        {
          title: "Handoff to the right area",
          description:
            "When the case needs a person, it passes it to the right team or department, with the context of the call.",
        },
      ],
    },
    process: {
      heading: "How it is implemented in an agency",
      items: [
        {
          title: "We choose the inquiries",
          description:
            "We start with a focused set of procedures and services, with their exceptions.",
        },
        {
          title: "The agency validates the information",
          description:
            "Its officials review and approve what the agent will say. Nothing is used without that review.",
        },
        {
          title: "We test with fictional scenarios",
          description:
            "The test uses no citizen data. It measures whether the agent answers well and recognizes its limits.",
        },
        {
          title: "We launch and oversee",
          description:
            "The line is connected, calls are reviewed and the information is improved with evidence.",
        },
      ],
    },
    sections: [
      {
        heading: "Citizen services with clear responsibilities",
        paragraphs: [
          "A citizen inquiry may require guidance, a clarification or the intervention of a person. Before automating, the agency defines what the agent can answer, which information backs the answer and what path applies when a case falls outside the scope.",
          "MEHI lets you work on those instructions and review conversations. Automation alone does not mean approving an application, resolving a case file or completing a transaction in another system: any action of that kind requires an agreed integration and scope.",
        ],
      },
      {
        heading: "Institutional information and human continuity",
        paragraphs: [
          "The agency defines the sources and rules it authorizes the agent to use. It is advisable to assign review owners, update criteria and a path for questions that have no confirmed answer.",
          "The handoff to a human team is designed around the available telephony and systems. What context travels with the conversation, where it can be checked and what happens if a department does not respond is verified while evaluating the project.",
        ],
        bullets: [
          "Informational inquiries within a defined scope.",
          "Instructions and information reviewed by the agency's owners.",
          "Human intervention for exceptions and uncovered situations.",
          "Call tracking and review of answers and handoffs.",
        ],
      },
      {
        heading: "What to review in a demonstration",
        paragraphs: [
          "A useful demonstration includes clear questions, different ways of expressing a need and inquiries that should not be resolved automatically. You can start with fictional information prepared for the evaluation, without using citizen data.",
          "The test should show whether the agent recognizes its limits and whether the path to a person works under the agreed conditions. An illustrative example helps explain the approach, but it does not replace a test of the platform and its integrations.",
        ],
      },
      {
        heading: "What is agreed with the agency",
        paragraphs: [
          "The first conversation covers the service need, the available sources, the telephony and the people responsible for the evaluation. Timelines, support and terms are defined for the project. We do not announce universal results.",
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
    id: "ia-para-contact-centers",
    slug: "ai-for-contact-centers",
    kind: "audience",
    label: "Contact centers",
    eyebrow: "Contact centers",
    title: "AI voice agents for contact centers, alongside your operators",
    description:
      "MEHI adds AI voice agents to your contact center: they handle frequent inquiries with each client's information and pass to your operators the cases that need them.",
    cta: "See the solution for contact centers",
    summary:
      "Add voice agents to your service and leave your operators the cases that need them.",
    introduction:
      "MEHI gives the service you provide a voice. An AI voice agent handles frequent inquiries with each client's information and passes to your operators the cases that need them, with the context of the call. You oversee everything from one place.",
    useCases: {
      heading: "Where it adds value in your operation",
      items: [
        {
          title: "Peaks and after hours",
          description:
            "The agent answers when demand exceeds your team or when no operators are on shift.",
        },
        {
          title: "Repetitive inquiries",
          description:
            "The usual questions are answered instantly and your operators focus on complex cases.",
        },
        {
          title: "Handoff with context",
          description:
            "When it hands off, what the person already said travels with the call, depending on the integration with your phone system. Nobody starts from scratch.",
        },
        {
          title: "One service per client",
          description:
            "Each of your contact center's clients has its own agent, information and reports, kept separate from the others.",
        },
      ],
    },
    process: {
      heading: "How it joins your service",
      items: [
        {
          title: "We choose a service and its inquiries",
          description:
            "We start with a client's most frequent calls, with their exceptions.",
        },
        {
          title: "We connect the client's information",
          description:
            "Their CRM, knowledge bases or procedures, as agreed in the project.",
        },
        {
          title: "We define the handoff to operators",
          description:
            "When it hands off, to which queue and what context travels with the call, depending on your phone system.",
        },
        {
          title: "We measure and adjust",
          description:
            "We review calls, handoff reasons and the information that needs correcting.",
        },
      ],
    },
    sections: [
      {
        heading: "Design the complete service journey",
        paragraphs: [
          "Automating the start of a call is only part of the job. You also need to define what happens if the inquiry requires an exception, if the information falls short or if the caller needs to speak with an operator.",
          "The operation sets responsibilities: what the AI handles, what the human team resolves and what context each one needs. MEHI lets you work on that journey and review the calls that show where it breaks down.",
        ],
      },
      {
        heading: "The same information for the AI and your operators",
        paragraphs: [
          "An answer can be wrong even if the agent converses well, if it relies on an outdated procedure. That is why it pays to govern the content that feeds the service: owners, reviews, versions and publishing rules.",
          "MEHI includes tools so your operators work with the same information the agent uses. The specific capabilities and the context available at each handoff are validated against the project's systems and telephony.",
        ],
      },
      {
        heading: "Your clients' data stays your clients' data",
        paragraphs: [
          "Each client's information is used only for its own service and kept separate from the others. Confidentiality and data handling terms are agreed in each project.",
        ],
      },
      {
        heading: "What to look at when evaluating results",
        paragraphs: [
          "The outcome is defined for each type of inquiry. A correct handoff can be the expected result; closing a call without resolving it does not automatically count as a success. The review combines indicators with evidence from real cases.",
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
          "To evaluate MEHI, bring a concrete service, its frequent questions, its exceptions and the current path to an operator. On that basis we agree on a verifiable scope and review the integrations required.",
          "We do not publish universal savings or resolution percentages: results depend on the service, the available information and the implementation.",
        ],
      },
    ],
  },
  {
    id: "agentes-de-voz-ia",
    slug: "ai-voice-agents",
    kind: "audience",
    label: "Businesses",
    eyebrow: "Businesses",
    title: "AI voice agents for businesses: give your CRM a voice",
    description:
      "An AI voice agent that serves your customers with the information in your CRM and your operation, answers their questions and hands off to your team when needed.",
    cta: "See the solution for businesses",
    summary:
      "Serve your customers with the information in your CRM and your operation, without changing your systems.",
    introduction:
      "Your CRM already knows everything about your customers. MEHI gives it a voice: an AI agent that answers calls, looks up your operation's information and responds, or passes the call to your team when needed. You don't have to change your systems.",
    useCases: {
      heading: "What it can do for your customers",
      items: [
        {
          title: "Status of an order or a case",
          description:
            "It checks your CRM and tells the person where their order, complaint or appointment stands.",
        },
        {
          title: "Frequent questions",
          description:
            "Prices, terms, hours and procedures, with the information your company approved.",
        },
        {
          title: "Taking requests",
          description:
            "It takes the details of a complaint, a request or an appointment and files them where your team needs them, depending on the integration.",
        },
        {
          title: "Handoff to your team",
          description:
            "It passes the cases that need a person, with what the customer already said.",
        },
      ],
    },
    process: {
      heading: "How we get it running",
      items: [
        {
          title: "We choose the calls",
          description:
            "Your customers' most frequent inquiries and the ones that cost your team the most today.",
        },
        {
          title: "We connect your information",
          description:
            "Your CRM, knowledge bases or procedures: what you already use, depending on the possible integrations.",
        },
        {
          title: "We test with your cases",
          description:
            "Scenarios prepared with your real inquiries, to see how it answers before it serves your customers.",
        },
        {
          title: "We launch and measure",
          description:
            "We connect your line and review every call to improve the information and the rules.",
        },
      ],
    },
    sections: [
      {
        heading: "How an AI call works",
        paragraphs: [
          "The caller explains what they need over the phone. The agent identifies the intent, uses the information prepared for that process and follows the configured path. It can inform, guide or hand off, depending on the capabilities enabled for your operation.",
          "The scope must be explicit: an informational answer is not the same as completing a transaction in an external system. When an action needs to be carried out, it depends on an integration and on rules agreed in advance.",
        ],
      },
      {
        heading: "More than a natural voice",
        paragraphs: [
          "An agent's quality is not judged only by how it sounds. It must also understand different ways of asking for the same thing, handle incomplete information and avoid unsupported answers. A fluent conversation is useful when it leads to the right next step.",
          "MEHI connects the conversation setup with call tracking and the review of results. This makes it possible to analyze specific cases and tell an information problem apart from a conversation or integration problem.",
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
          "In a demo we review the process you want to improve and define what the agent should demonstrate before moving forward.",
        ],
      },
    ],
  },
  {
    id: "gestion-del-conocimiento",
    slug: "knowledge-management",
    kind: "resource",
    label: "Knowledge management",
    title: "Institutional knowledge for AI agents and human service",
    description:
      "Connect your service with reviewed, versioned information. How MEHI links institutional knowledge with AI and with human teams.",
    introduction:
      "Institutional knowledge is the information an organization validates in order to answer and act: procedures, requirements, rules and exceptions. MEHI uses it in every conversation, and KORENUS, MEHI's tool for human teams, helps keep it reviewed and up to date.",
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
    kind: "resource",
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
    kind: "resource",
    label: "Guide for public agencies",
    audience: "government",
    title: "How to evaluate AI for citizen services in a public agency",
    description:
      "A guide to evaluating AI voice agents in a public agency: scope, institutional knowledge, human intervention, integrations and evidence from a test.",
    introduction:
      "Evaluating AI voice agents for a public agency requires agreeing on responsibilities and observing the complete service journey. This guide offers questions for a technical and operational evaluation of MEHI.",
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
        heading: "Turn the evaluation into a concrete scope",
        paragraphs: [
          "The proposal should identify the platform and the company that offers it, together with the project's integrations, responsibilities, support and commercial terms. The agency keeps its own evaluation and procurement processes.",
          "This guide supports a technical and operational evaluation. It does not certify anything, does not guarantee results and does not replace the review of the conditions that apply to each agency.",
        ],
      },
    ],
  },
];
