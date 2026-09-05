// Cloudflare Pages Function for Markdown Content Negotiation (RFC / llmstxt / Agent Ready)

const MARKDOWN_CONTENT: Record<string, string> = {
  '/': `# Denis Trautner — Cloud Solution Architect & AI Researcher

> Personal profile and research portfolio of Denis Trautner.

## About
Denis Trautner works as a Solution Architect at STIHL, responsible for the Product Data domain within the global B2X ecosystem — encompassing PIM, DAM, Product Data Syndication, and interfaces to consumer applications and retail. His work combines architecture with hands-on development, including prototypes, backend services, and applied AI solutions such as RAG assistants and product recommendation models.

Previously, he was a Tech Lead for STIHL Service Communication, guiding the development and operations of the central aftersales portal powered by 30+ microservices.

Alongside industry work, Denis is a Guest Researcher at the German Research Center for Artificial Intelligence (DFKI) Speech and Language Technology Lab in Berlin, with research interests in Information Extraction, Information Retrieval, and Graph Learning. In October 2026, his first research paper will be published at WNUT 2026 during the Conference on Empirical Methods in Natural Language Processing (EMNLP) in Budapest.

## Selected Moments & Projects
- [Formula Student Electric & Driverless](https://denis-trautner.com/moments/formula-student): Head of Electronics and telemetry lead for the electric/driverless race car at Formula Student Germany and Austria.
- [Texas High School Exchange](https://denis-trautner.com/moments/texas-exchange): High school exchange year at A&M Consolidated High School in College Station, Texas.
- [DFKI NLP Research & Publications](https://denis-trautner.com/moments/dfki-research): Academic research at DFKI Speech and Language Technology Lab, publications on structured information extraction.

## Canonical Links & Profiles
- Website: https://denis-trautner.com/
- GitHub: https://github.com/denis-trtnr
- LinkedIn: https://linkedin.com/in/denis-trautner
- Sitemap: https://denis-trautner.com/sitemap.xml
- LLMs: https://denis-trautner.com/llms.txt
`,
  '/moments/formula-student': `# Formula Student Electric & Driverless — Denis Trautner

Formula Student Racing Team: Head of Electronics, High-Voltage Systems, and Autonomous Driving Systems.
Represented the team at Formula Student Germany (Hockenheimring) and Formula Student Austria (Red Bull Ring).

Key Technical Areas:
- 600V accumulator and battery management systems (BMS)
- CAN-bus vehicle telemetry and real-time sensor processing
- Autonomous driverless system integration and perception pipeline
`,
  '/moments/texas-exchange': `# Texas High School Exchange Year — Denis Trautner

Exchange student year at A&M Consolidated High School in College Station, Texas.
Immersed in American high school culture, advanced academics, and cross-cultural communication.
`,
  '/moments/dfki-research': `# DFKI Speech & Language Technology Lab — Denis Trautner

Research in Information Extraction, Named Entity Recognition (NER), and Graph Learning.
First research paper published at WNUT 2026 @ EMNLP 2026 in Budapest.
`
};

export const onRequest = async (context: { request: Request; next: () => Promise<Response> }) => {
  const request = context.request;
  const acceptHeader = request.headers.get('accept') || '';
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/$/, '') || '/';

  // Check if client requested Markdown via content negotiation (Accept: text/markdown)
  if (acceptHeader.includes('text/markdown')) {
    const markdown = MARKDOWN_CONTENT[pathname] || MARKDOWN_CONTENT['/'];
    const tokenCount = Math.ceil(markdown.length / 4);

    return new Response(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
        'x-markdown-tokens': tokenCount.toString(),
        'Vary': 'Accept',
      },
    });
  }

  // Otherwise pass through to static HTML / assets
  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set('Vary', 'Accept');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};
