/**
 * API Routes
 * Express routes for BidSmith API
 */

import express from 'express';
import OpenAI from 'openai';
import { TenderAnalyzer } from '../analyzers/tender-analyzer.js';
import { ProposalGenerator } from '../generators/proposal-generator.js';
import { ComplianceValidator } from '../validators/compliance-validator.js';
import { SYSTEM_PROMPT, buildFullProposalPrompt } from '../prompts/bidsmith-prompts.js';

const router = express.Router();

// Initialize components
const analyzer = new TenderAnalyzer();
const generator = new ProposalGenerator();
const validator = new ComplianceValidator();

/**
 * POST /api/analyze
 * Analyze tender documents
 */
router.post('/analyze', async (req, res) => {
  try {
    const tenderData = req.body;

    if (!tenderData) {
      return res.status(400).json({
        error: 'Tender data is required'
      });
    }

    const analysis = await analyzer.analyzeTender(tenderData);

    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error('Error analyzing tender:', error);
    res.status(500).json({
      error: 'Failed to analyze tender',
      message: error.message
    });
  }
});

/**
 * POST /api/generate
 * Generate proposal
 */
router.post('/generate', async (req, res) => {
  try {
    const inputData = req.body;

    if (!inputData || !inputData.tenderAnalysis) {
      return res.status(400).json({
        error: 'Tender analysis and input data are required'
      });
    }

    const proposal = await generator.generateProposal(inputData);

    res.json({
      success: true,
      proposal
    });
  } catch (error) {
    console.error('Error generating proposal:', error);
    res.status(500).json({
      error: 'Failed to generate proposal',
      message: error.message
    });
  }
});

/**
 * POST /api/generate/ai
 * Generate proposal using OpenAI with the BidSmith system prompt
 */
router.post('/generate/ai', async (req, res) => {
  try {
    const {
      companyName,
      companyStrength,
      tenderText,
      signature,
      projectValue
    } = req.body;

    if (!companyName || !tenderText) {
      return res.status(400).json({
        error: 'companyName and tenderText are required'
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: 'OPENAI_API_KEY is not configured'
      });
    }

    const analysis = analyzeTender(tenderText, projectValue);
    const userPrompt = buildFullProposalPrompt({
      companyName,
      companyStrength,
      tenderText,
      analysis
    });

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    });

    let proposal = completion.choices?.[0]?.message?.content || '';
    proposal = injectComplianceSections(proposal, analysis);

    if (signature?.name || signature?.role) {
      proposal = addSignatureSection(proposal, signature);
    }

    return res.json({
      success: true,
      proposal,
      analysis,
      tokens: completion.usage?.total_tokens || 0
    });
  } catch (error) {
    console.error('Error generating AI proposal:', error);
    res.status(500).json({
      error: 'Failed to generate AI proposal',
      message: error.message
    });
  }
});

/**
 * POST /api/validate
 * Validate proposal compliance
 */
router.post('/validate', async (req, res) => {
  try {
    const { proposal, tenderAnalysis } = req.body;

    if (!proposal || !tenderAnalysis) {
      return res.status(400).json({
        error: 'Proposal and tender analysis are required'
      });
    }

    const validation = validator.validateCompliance(proposal, tenderAnalysis);

    res.json({
      success: true,
      validation
    });
  } catch (error) {
    console.error('Error validating proposal:', error);
    res.status(500).json({
      error: 'Failed to validate proposal',
      message: error.message
    });
  }
});

/**
 * POST /api/full-workflow
 * Complete workflow: analyze, generate, validate
 */
router.post('/full-workflow', async (req, res) => {
  try {
    const { tenderData, companyInfo, projectInfo, generationParams } = req.body;

    if (!tenderData) {
      return res.status(400).json({
        error: 'Tender data is required'
      });
    }

    // Step 1: Analyze tender
    const analysis = await analyzer.analyzeTender(tenderData);

    // Step 2: Generate proposal
    const proposal = await generator.generateProposal({
      tenderAnalysis: analysis,
      companyInfo: companyInfo || {},
      projectInfo: projectInfo || {},
      generationParams: generationParams || {}
    });

    // Step 3: Validate compliance
    const validation = validator.validateCompliance(proposal, analysis);

    res.json({
      success: true,
      workflow: {
        analysis,
        proposal,
        validation
      }
    });
  } catch (error) {
    console.error('Error in full workflow:', error);
    res.status(500).json({
      error: 'Failed to complete workflow',
      message: error.message
    });
  }
});

/**
 * GET /api/knowledge-base
 * Get information about available knowledge bases
 */
router.get('/knowledge-base', (req, res) => {
  res.json({
    success: true,
    knowledgeBases: {
      cdm2015: {
        name: 'CDM 2015',
        description: 'Construction (Design and Management) Regulations 2015'
      },
      ukConstructionLaw: {
        name: 'UK Construction Law',
        description: 'UK construction law and regulations'
      },
      nhsProcurement: {
        name: 'NHS Procurement',
        description: 'NHS procurement standards and requirements'
      },
      londonRequirements: {
        name: 'London Requirements',
        description: 'London-specific construction requirements'
      },
      proposalStrategies: {
        name: 'Proposal Strategies',
        description: 'Winning proposal strategies'
      }
    }
  });
});

export default router;

function analyzeTender(tenderText, projectValue) {
  const text = tenderText || '';
  return {
    isNHS: /nhs|hospital|healthcare|trust|ward|clinical/i.test(text),
    isLondon: /london|borough|westminster|tower hamlets|hackney|camden|islington/i.test(text),
    requiresCDM: projectValue ? projectValue > 500000 : /cdm|principal contractor|designer/i.test(text),
    socialValueMentioned: /social value|local|apprentice|community/i.test(text),
    sustainabilityFocus: /sustainability|carbon|environmental|breeam|green/i.test(text),
    qualityWeighted: /quality.*\\d+%/i.test(text),
    priceWeighted: /price.*\\d+%/i.test(text),
    projectType: determineProjectType(text),
    constraints: extractConstraints(text)
  };
}

function determineProjectType(text) {
  if (/refurbishment|renovation|remodel/i.test(text)) return 'refurbishment';
  if (/new build|new construction/i.test(text)) return 'newbuild';
  if (/extension|addition/i.test(text)) return 'extension';
  if (/loft|conversion/i.test(text)) return 'loft_conversion';
  if (/basement/i.test(text)) return 'basement';
  if (/roof/i.test(text)) return 'roofing';
  if (/mechanical|electrical|m&e|mep/i.test(text)) return 'mep';
  return 'general_construction';
}

function extractConstraints(text) {
  const constraints = [];
  if (/occupied|live|operational/i.test(text)) constraints.push('occupied_building');
  if (/restricted access|limited access|tight access/i.test(text)) constraints.push('access_constraints');
  if (/heritage|listed|conservation/i.test(text)) constraints.push('heritage');
  if (/tight.*program|accelerated|fast track|fast-track/i.test(text)) constraints.push('tight_program');
  return constraints;
}

function injectComplianceSections(proposal, analysis) {
  let enhanced = proposal;

  if (analysis.requiresCDM) {
    const cdmSection = `

CDM 2015 REGULATORY COMPLIANCE
As Principal Contractor for this project, we will fulfil all duties under the Construction (Design and Management) Regulations 2015:
Regulation 13 - Principal Contractor Duties:

Planning, Managing, Monitoring (Reg 13(2))
- Comprehensive Construction Phase Plan developed before work commences
- Daily site management by qualified Site Manager (SSSTS minimum)
- Weekly H&S audits and toolbox talks

Welfare Facilities (Reg 13(7))
- Site welfare unit with toilets, washing facilities, drinking water, heated rest area
- Facilities in place from day one

Cooperation & Coordination (Reg 13(4)(5))
- Weekly coordination meetings with all contractors
- Clear communication protocols
- Worker consultation mechanisms

Site Induction (Reg 13(8))
- Comprehensive site induction for all personnel (duration: 2 hours minimum)
- Covers: site hazards, emergency procedures, welfare, reporting

Preventing Unauthorised Access (Reg 13(10))
- 2m high perimeter fencing
- Lockable gates with security
- Warning signage
- CCTV monitoring

F10 Notification Display (Reg 13(11))
- HSE notification displayed prominently at main entrance

Competence: All site personnel hold valid CSCS cards. Site Manager holds SSSTS, Project Manager holds SMSTS.
Reference: Construction (Design and Management) Regulations 2015 SI 2015/51`;

    enhanced = enhanced.includes('## CONCLUSION')
      ? enhanced.replace('## CONCLUSION', `${cdmSection}\n\n## CONCLUSION`)
      : `${enhanced}\n${cdmSection}`;
  }

  if (analysis.isNHS) {
    const nhsSection = `

NHS-SPECIFIC COMPLIANCE
Health Technical Memoranda (HTM) Compliance:
We have extensive NHS experience and will ensure compliance with all relevant HTMs including:

HTM 01-05: Ventilation for infection control
HTM 04-01: Water safety (Legionella control, temperature management)
HTM 06-02: Electrical safety in healthcare premises
HTM 07-02: Sustainability (EnCO2de standards)

Infection Prevention & Control:
- Infection Control Risk Assessment (ICRA) conducted pre-commencement
- Dust control: sealed work areas, HEPA filtration, negative pressure
- Route segregation (patient/construction traffic)
- Enhanced cleaning using NHS-approved disinfectants
- ATP testing pre-handover

Security & Vetting:
- Enhanced DBS checks for ALL operatives (100% compliance)
- Photo ID badges mandatory
- Escorted access in clinical areas
- Confidentiality training

Patient Safety:
- Works scheduled to minimise disruption (out-of-hours for noisy activities)
- Critical services protected (theatres, ICU)
- Emergency access maintained at all times
- Real-time noise/vibration monitoring`;

    enhanced = enhanced.includes('## CONCLUSION')
      ? enhanced.replace('## CONCLUSION', `${nhsSection}\n\n## CONCLUSION`)
      : `${enhanced}\n${nhsSection}`;
  }

  if (analysis.isLondon) {
    const londonSection = `

London-Specific Requirements:

ULEZ Compliance: 100% of fleet is Euro 6 or electric (ULEZ-compliant)
Construction Logistics Plan: Delivery scheduling, route planning, consolidation to minimise vehicle movements
London Plan Alignment: Design quality, inclusive access, sustainable drainage
Air Quality: Non-Road Mobile Machinery (NRMM) meets emission standards
Considerate Constructors Scheme: Registered for duration of project`;

    enhanced = enhanced.includes('## SUSTAINABILITY')
      ? enhanced.replace('## SUSTAINABILITY', `${londonSection}\n\n## SUSTAINABILITY`)
      : `${enhanced}\n${londonSection}`;
  }

  if (analysis.socialValueMentioned && !analysis.isLondon) {
    enhanced = `${enhanced}\n\nSocial Value: Local labour targets, apprenticeships, SME spend, community engagement schedule, monthly TOMs reporting.`;
  }

  return enhanced;
}

function addSignatureSection(proposal, signature = {}) {
  const signatureSection = `

AUTHORISED SIGNATORY
This proposal is submitted on behalf of ${signature.companyName || 'our company'} and I confirm that all information provided is accurate and we are committed to delivering this project to the highest standards.
Name: ${signature.fullName || signature.name || ''}
Position: ${signature.jobTitle || signature.role || ''}
Date: ${new Date().toLocaleDateString('en-GB')}
Signature:
${signature.signatureData ? '[Digital signature included]' : '[Signature required]'}

Contact:
${signature.email || 'Email: [email]'}
${signature.phone || 'Phone: [phone]'}`;

  return `${proposal}\n${signatureSection}`;
}
