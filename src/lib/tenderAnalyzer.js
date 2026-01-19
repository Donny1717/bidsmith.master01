/**
 * Tender analyzer for BidSmith ASF.
 * Identifies scored questions, word limits, and London-specific compliance signals.
 */
const LONDON_RULES = {
  constructionLogisticsPlan: /construction logistics plan|clp/i,
  section106: /section\s*106|s106/i,
  nrmm: /nrmm|non[-\s]?road mobile machinery/i,
  ulez: /ulez|ultra low emission zone/i,
  socialValue: /social value model|tom\'?s|social value/i,
  netZero: /net zero|carbon neutral|breeam|leed/i
};

function extractWordLimits(text) {
  const limits = [];
  const regex = /(\d{2,5})\s*(?:word|words)/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    limits.push(Number(match[1]));
  }
  return {
    max: limits.length ? Math.max(...limits) : null,
    min: limits.length ? Math.min(...limits) : null,
    samples: limits
  };
}

function mapScoredQuestions(questions, scoringCriteria) {
  if (!questions?.length || !scoringCriteria?.length) return [];
  return questions.map((q, idx) => ({
    ...q,
    scoreWeight: scoringCriteria[idx]?.weighting || null
  }));
}

function detectLondonRequirements(text = '') {
  const matches = Object.entries(LONDON_RULES).reduce((acc, [key, regex]) => {
    acc[key] = regex.test(text);
    return acc;
  }, {});

  const coverage = Object.values(matches).filter(Boolean).length;
  const requiredCount = Object.keys(LONDON_RULES).length;

  return {
    ...matches,
    coverage,
    requiredCount,
    coverageScore: Math.round((coverage / requiredCount) * 100)
  };
}

function calculateComplianceScore({ scoredQuestions = [], londonFlags }) {
  let score = 50; // base

  const answered = scoredQuestions.filter(q => q.scoreWeight).length;
  if (answered) {
    score += Math.min(30, answered * 5);
  }

  if (londonFlags?.coverageScore) {
    score += Math.round(londonFlags.coverageScore * 0.2);
  }

  return Math.min(100, score);
}

function computeSocialValueScore(text = '') {
  const checks = {
    apprenticeships: /apprentice|trainee/i.test(text),
    localSpend: /local supplier|sme|social enterprise|community/i.test(text),
    carbon: /carbon|co2|net zero|emission/i.test(text),
    volunteering: /volunteer|community hours/i.test(text),
    reporting: /toms|social value model|reporting/i.test(text)
  };

  const hits = Object.values(checks).filter(Boolean).length;
  const score = Math.min(100, 20 * hits);

  return { score, checks, rationale: `Detected ${hits} Social Value signals.` };
}

export class TenderAnalyzer {
  async analyzeTender({ rawText = '', parsedDocument = {}, projectContext = {} }) {
    const text = rawText || parsedDocument.text || '';
    const sections = parsedDocument.sections || [];
    const questions = parsedDocument.questions || [];
    const scoringCriteria = parsedDocument.scoringCriteria || [];
    const wordLimits = extractWordLimits(text);
    const scoredQuestions = mapScoredQuestions(questions, scoringCriteria);
    const londonRequirements = detectLondonRequirements(text);
    const complianceScore = calculateComplianceScore({ scoredQuestions, londonFlags: londonRequirements });
    const socialValue = computeSocialValueScore(text);

    const recommendations = [];
    if (!londonRequirements.constructionLogisticsPlan) {
      recommendations.push('Add a Construction Logistics Plan aligned to TfL guidance.');
    }
    if (!londonRequirements.section106) {
      recommendations.push('Reference Section 106 obligations and local borough commitments.');
    }
    if (!londonRequirements.nrmm || !londonRequirements.ulez) {
      recommendations.push('Confirm NRMM and ULEZ-compliant plant and fleet.');
    }
    if (wordLimits.max && wordLimits.max > 0) {
      recommendations.push(`Enforce word limits; maximum detected limit: ${wordLimits.max} words.`);
    }

    return {
      sections,
      questions,
      scoringCriteria,
      scoredQuestions,
      wordLimits,
      londonRequirements,
      socialValue,
      complianceScore,
      recommendations,
      metadata: {
        source: parsedDocument.type || 'text',
        wordCount: text.split(/\s+/).filter(Boolean).length,
        projectContext
      }
    };
  }
}
