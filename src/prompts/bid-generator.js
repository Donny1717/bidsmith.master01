/**
 * System prompt and bid generation prompt builder for OpenAI.
 */
const SECTION_ORDER = ['Summary', 'Approach', 'Evidence', 'Risks', 'KPIs', 'Compliance'];

export const SYSTEM_PROMPT = `
You are BidSmith ASF, a bid strategist for London construction and NHS projects.
- Always address scoring criteria explicitly.
- Embed London regulations: Construction Logistics Plan (TfL), Section 106, NRMM/ULEZ, Social Value Model (TOMs), Net Zero.
- Use measurable KPIs and commitments (dates, % targets, owners).
- Follow a 6-section structure: Summary, Approach, Evidence, Risks, KPIs, Compliance.
- Keep tone professional, concise, and defensible for audit.
`;

function formatLondonRequirements(londonRequirements = {}) {
  return [
    'Construction Logistics Plan: timed deliveries, consolidation, safe routes.',
    'Section 106 obligations: local labour, apprenticeships, SME spend.',
    'NRMM and ULEZ: Euro VI plant/fleet, idling policy, emissions logs.',
    'Social Value Model (TOMs): local employment, volunteering hours, carbon.',
    'Net Zero: low-carbon materials, energy monitoring, waste minimisation.'
  ]
    .concat(londonRequirements.notes || [])
    .join('\n- ');
}

export function buildBidPrompt({
  analysis = {},
  tenderText = '',
  companyProfile = {},
  projectContext = {},
  londonRequirements = {},
  regulationContext = ''
}) {
  const scoringLines =
    analysis.scoringCriteria?.map(item => `- ${item.criterion || 'Criterion'} (${item.weighting || 0}%)`).join('\n') ||
    'Use supplied tender scoring and weightings if available.';

  const questions =
    analysis.questions?.map(q => `- ${q.text}${q.wordLimit ? ` (max ${q.wordLimit} words)` : ''}`).join('\n') ||
    'Summarise the key questions and respond to each.';

  const sections = SECTION_ORDER.map(section => `- ${section}`).join('\n');

  return `
Tender context:
- Location: ${projectContext.location || 'London or surrounding boroughs'}
- Client: ${projectContext.client || 'Public sector / NHS / Local Authority'}
- Project value: ${projectContext.value || 'Not stated'}
- Raw tender extract: ${tenderText?.slice(0, 1200) || 'N/A'}

Scoring criteria:
${scoringLines}

Questions to answer:
${questions}

Company profile:
- Name: ${companyProfile.name || 'Our company'}
- Strengths: ${(companyProfile.strengths || []).join(', ') || 'Specialists in London construction tenders'}
- Accreditations: ${(companyProfile.accreditations || []).join(', ') || 'ISO 9001, ISO 14001, CHAS'}

Key regulation excerpts:
${regulationContext || 'Use embedded regulation library from /docs (CDM 2015, Building Regs, NHS guidance).'}

London-specific requirements (address each with evidence):
- ${formatLondonRequirements(londonRequirements)}

Instructions:
1) Follow the six-section order strictly:
${sections}
2) Reference evidence from previous projects (years, boroughs, value).
3) Include KPIs with owners and reporting cadence (weekly/monthly).
4) Social Value: align to UK Social Value Model and NHS priorities.
5) Compliance: confirm CDM, Section 106, NRMM/ULEZ, Net Zero commitments.
6) Provide a short Construction Logistics Plan covering routing, timed deliveries, consolidation, and local traffic mitigation.
7) Keep wording concise; avoid fluff; cite measurable commitments.
`;
}
