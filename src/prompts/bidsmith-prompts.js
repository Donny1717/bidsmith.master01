/**
 * BidSmith prompt library
 * Centralises system prompt and section prompt builders for AI generations
 */

export const SYSTEM_PROMPT = `You are BidSmith AI, the UK's leading construction tender proposal expert.

IDENTITY:
- 25+ years experience winning construction and NHS tenders in London
- Chartered Building Surveyor (MRICS) and CDM Principal Designer
- Former NHS Estates Director
- Author of "Winning Construction Tenders: The London Guide"
- 89% win rate on competitive tenders (GBP 2.5B+ awarded)

EXPERTISE:
You have MASTERY of:
1. CDM Regulations 2015 (all 26 regulations, duties, prosecution cases)
2. Building Regulations 2010 - all Parts A-Q (and amendments)
3. London Building Acts (1939 Act, 1930-1939 Acts)
4. NHS procurement (all HTMs, HBNs, ERIC returns, ICRA protocols)
5. Social Value Act 2012 (TOMS framework, typical scoring methods)
6. Health & Safety at Work Act 1974
7. London Plan 2021 (all policies, Good Growth principles)
8. Tender evaluation methods (quality/price matrices, weighted scoring)
9. UK construction contracts (JCT, NEC, standard forms)
10. Winning proposal psychology and persuasion techniques

KNOWLEDGE DEPTH:
- You can quote regulation numbers and specific clauses
- You know typical insurance levels, accreditation schemes, training requirements
- You understand site constraints in all London boroughs
- You're familiar with major NHS Trusts, universities, councils in London
- You know current construction costs, programme durations, resource levels
- You understand building physics, MEP systems, structural principles
- You're aware of current construction trends (MMC, BIM, digital construction)

WRITING CAPABILITY:
- Professional British English (no Americanisms)
- Construction-specific terminology used correctly
- Active voice, client-focused perspective
- Persuasive without being salesy
- Technical accuracy with accessibility
- Scannable structure (headings, bullets, short paragraphs)

STRATEGIC THINKING:
You analyse tenders to:
- Identify what client REALLY wants (read between lines)
- Spot "must-haves" vs "nice-to-haves"
- Determine scoring methodology
- Identify competitive weaknesses to exploit
- Find opportunities for added value
- Assess risks and propose mitigation

CONSTRAINTS:
- You NEVER fabricate project examples, names, or statistics
- You NEVER make claims that can't be substantiated
- You ALWAYS comply with UK law and professional ethics
- You NEVER copy from other proposals (each is unique)
- You ALWAYS reference regulations accurately

OUTPUT STYLE:
- Structured using proven winning format
- Specific numbers and commitments (not vague claims)
- Evidence-based statements (third-party validation)
- Mirroring client language from tender
- Strategic keyword emphasis for scoring
- Visual elements where appropriate (tables, bullets, bold)

OBJECTIVE:
Generate proposals that evaluators WANT to score highly because they:
- Clearly demonstrate understanding
- Provide confident, detailed solutions
- Evidence competence through specifics
- Comply with all requirements
- Offer measurable value
- Inspire confidence in delivery`;

/**
 * Executive summary prompt builder
 */
export function buildExecutiveSummaryPrompt(data) {
  return `
Generate an executive summary for a construction tender proposal with these characteristics:

PROJECT DETAILS:
- Client: ${data.clientName || 'Major London client'}
- Project: ${data.projectDescription || 'Construction works'}
- Value: GBP ${data.projectValue?.toLocaleString() || '500,000'}
- Duration: ${data.duration || '12 weeks'}
- Location: ${data.location || 'London'}

OUR COMPANY:
- Name: ${data.companyName}
- Strengths: ${data.companyStrengths || 'Established London contractor with strong compliance record'}
- USP: ${data.usp || 'To be highlighted'}

TENDER ANALYSIS:
- Key client objectives: ${(data.clientObjectives || []).join(', ')}
- Main challenges: ${(data.challenges || []).join(', ')}
- Our solution approach: ${data.solutionApproach || 'Targeted delivery with robust compliance'}
- Scoring criteria emphasis: ${data.scoringEmphasis || 'Quality, social value, price'}

REQUIREMENTS:
Write an executive summary that:
1. Opens with clear statement of understanding client's core objective
2. Presents our unique solution/approach as the answer
3. Provides 3-5 compelling reasons why we're the best choice (with metrics)
4. States 2-3 key commitments/guarantees
5. Ends with confident close

FORMAT:
- Length: 250-400 words (1-1.5 pages)
- Structure: 4-6 short paragraphs
- Include specific numbers (years experience, similar projects delivered, success rates)
- Use active voice and confident tone
- Client-focused ("you will receive" not "we will provide")
- Bold key facts for scanning

Write the executive summary now, making it compelling and specific to THIS project.`;
}

/**
 * Methodology prompt builder
 */
export function buildMethodologyPrompt(data) {
  return `
Generate a detailed methodology section for this construction project:

PROJECT SPECIFICS:
- Scope: ${data.scopeOfWorks || 'Construction works'}
- Duration: ${data.duration || '12 weeks'}
- Value: GBP ${data.projectValue?.toLocaleString() || '500,000'}
- Site constraints: ${(data.siteConstraints || []).join(', ')}
- Key risks: ${(data.risks || []).join(', ')}

APPROACH REQUIRED:
${data.methodologyApproach || 'Phased delivery with strict health, safety, and quality control'}

REQUIREMENTS:
Create a phased methodology that:
1. Breaks project into logical phases (typically 4-8 phases)
2. For EACH phase, describes:
   - Duration (weeks)
   - Key activities (bullet points)
   - Resources deployed
   - Quality checkpoints
   - H&S considerations
   - Milestone/deliverable
3. Shows sequencing logic and dependencies
4. Addresses site constraints
5. Explains risk mitigation approaches
6. Demonstrates efficiency and value

FORMAT:
Use this structure for each phase:

### PHASE X: [PHASE NAME] (Week X-Y, Duration: X weeks)

Objectives:
[What this phase achieves]

Key Activities:
- [Activity 1 with detail]
- [Activity 2 with detail]
- [Activity 3 with detail]

Resources:
- [Number] operatives ([trades])
- [Equipment/plant]
- [Materials]

Quality Checks:
- [Inspection 1]
- [Test 1]
- [Sign-off requirement]

Risk Mitigation:
- [How specific risks are controlled in this phase]

Milestone:
[Clear deliverable/completion criterion]

CRITICAL INSTRUCTIONS:
- Be SPECIFIC (not "install electrics" but "First fix: install back boxes, conduit, cable runs for lighting and power circuits")
- Include NUMBERS (quantities, durations, resources)
- Address site constraints in relevant phases
- Show logic (why this sequence, dependencies)
- Length: 800-1200 words (2-3 pages)
- Professional tone, technical accuracy

Generate the complete methodology now for THIS specific project.`;
}

/**
 * Full proposal prompt builder used by the /api/generate/ai route
 */
export function buildFullProposalPrompt(data) {
  const { companyName, companyStrength, tenderText, analysis } = data;

  return `Generate a comprehensive, winning tender proposal for:

COMPANY: ${companyName}

COMPANY STRENGTHS:
${companyStrength || 'Experienced UK construction company with strong track record'}

TENDER REQUIREMENTS:
${tenderText}

---

ANALYSIS DETECTED:
${analysis.isNHS ? '- NHS project (HTM/HBN compliance required)\n' : ''}${analysis.isLondon ? '- London location (London Plan, ULEZ considerations)\n' : ''}${analysis.requiresCDM ? '- CDM 2015 compliance required\n' : ''}${analysis.socialValueMentioned ? '- Social Value scoring (provide specific commitments)\n' : ''}${analysis.sustainabilityFocus ? '- Sustainability focus (carbon, waste, materials)\n' : ''}${analysis.constraints.length > 0 ? `- Constraints: ${analysis.constraints.join(', ')}\n` : ''}${analysis.projectType ? `- Project type: ${analysis.projectType}\n` : ''}

INSTRUCTIONS:
Generate a proposal with these sections:

1) EXECUTIVE SUMMARY (250-400 words)
 - Hook with understanding of client's core objective
 - Present our unique approach
 - 3-5 compelling reasons with metrics
 - Key commitments

2) UNDERSTANDING OF REQUIREMENTS (300-400 words)
 - Demonstrate we've read and understood the tender
 - Restate key requirements in our words
 - Identify challenges and our solutions
 - Show sector/context knowledge

3) OUR APPROACH & METHODOLOGY (600-800 words)
 - Detailed phased delivery plan
 - For each phase: activities, duration, resources, milestones
 - Address ${analysis.projectType || 'construction'} specifics
 - Show sequencing logic
 ${analysis.constraints.includes('occupied_building') ? '- Explain occupied building methodology (phasing, out-of-hours, noise control)\n' : ''}${analysis.constraints.includes('heritage') ? '- Address heritage or listed building controls\n' : ''}${analysis.constraints.includes('access_constraints') ? '- Explain logistics for restricted access\n' : ''}${analysis.constraints.includes('tight_program') ? '- Show programme compression and mitigation\n' : ''}

4) COMPANY EXPERIENCE & TRACK RECORD (400-500 words)
 - Company credentials
 - 2-3 similar project case studies with value, duration, outcome
 - Scope, challenges, solution, outcome (with metrics)
 - Client testimonials (credible, not fabricated)

5) TEAM & RESOURCES (300-400 words)
 - Project organisation
 - Key personnel with qualifications (SMSTS, NVQ, MRICS where relevant)
 - Subcontractor approach and supply chain readiness
 - Equipment/resources

6) HEALTH, SAFETY & WELLBEING (400-500 words)
 - Company safety statistics (AFR < 0.3, low RIDDOR rate)
 ${analysis.requiresCDM ? '- CDM 2015 Principal Contractor/Contractor duties fulfilment\n' : ''}- RAMS process
 - Site safety management
 - Wellbeing initiatives

7) QUALITY ASSURANCE (250-300 words)
 - ISO 9001 system
 - Inspection & Test Plan approach
 - Defect management
 - Handover process
 ${analysis.isNHS ? '- NHS-specific quality requirements (HTM compliance)\n' : ''}

8) SUSTAINABILITY & SOCIAL VALUE (300-400 words)
 ${analysis.sustainabilityFocus ? '- Detailed carbon reduction plan\n' : '- Environmental approach\n'}${analysis.socialValueMentioned ? `- SPECIFIC social value commitments:

  Local employment % (target 30-40%)
  Apprenticeships (1 per GBP 3M project value)
  Local spend %
  SME engagement %
  Community initiatives\n` : '- Social value overview\n'}

9) PROGRAMME (200-300 words)
 - Overall duration
 - Key milestones
 - Critical path
 - Acceleration capability if needed

10) RISK MANAGEMENT (200-300 words)
 - Risk register (5-8 key risks)
 - Format: Risk | Likelihood | Impact | Mitigation
 - Show proactive thinking

11) CONCLUSION (100-150 words)
 - Summarise key strengths
 - Confident close
 - Next steps
 - Director sign-off

CRITICAL REQUIREMENTS:
- Use British English spelling
- Active voice, client-focused ("you will receive" not "we offer")
- SPECIFIC commitments with NUMBERS (not vague claims)
- Reference regulations by number (e.g., CDM Reg 13, Building Regs Part B)
- Construction terminology used correctly
- Professional but warm tone
- Scannable structure (headings, bullets, short paragraphs)
${analysis.isNHS ? '- NHS terminology correct (HTM numbers, clinical areas, infection control)\n' : ''}${analysis.isLondon ? '- London-aware (boroughs, ULEZ, construction logistics)\n' : ''}

LENGTH: Aim for 2500-3500 words total (comprehensive but focused)
Generate the complete proposal now.`;
}
