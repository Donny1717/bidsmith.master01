/**
 * Compliance Validator
 * Validates proposals against regulatory requirements and tender specifications
 */

import CDM2015 from '../knowledge-base/cdm2015.js';
import UKConstructionLaw from '../knowledge-base/uk-construction-law.js';
import NHSProcurement from '../knowledge-base/nhs-procurement.js';
import LondonRequirements from '../knowledge-base/london-requirements.js';

export class ComplianceValidator {
  constructor() {
    this.knowledgeBases = {
      cdm2015: CDM2015,
      ukConstructionLaw: UKConstructionLaw,
      nhsProcurement: NHSProcurement,
      londonRequirements: LondonRequirements
    };
  }

  /**
   * Validate proposal compliance
   * @param {Object} proposal - Generated proposal
   * @param {Object} tenderAnalysis - Tender analysis
   * @returns {Object} Validation results with compliance status and issues
   */
  validateCompliance(proposal, tenderAnalysis) {
    const validation = {
      overall: 'pending',
      score: 0,
      maxScore: 0,
      checks: {
        cdm2015: null,
        nhs: null,
        london: null,
        general: []
      },
      issues: [],
      warnings: [],
      recommendations: []
    };

    // CDM 2015 validation
    if (this.requiresCDM2015(tenderAnalysis)) {
      validation.checks.cdm2015 = this.validateCDM2015(proposal);
      validation.maxScore += validation.checks.cdm2015.maxScore;
      validation.score += validation.checks.cdm2015.score;
    }

    // NHS validation
    if (this.requiresNHS(tenderAnalysis)) {
      validation.checks.nhs = this.validateNHS(proposal);
      validation.maxScore += validation.checks.nhs.maxScore;
      validation.score += validation.checks.nhs.score;
    }

    // London validation
    if (this.requiresLondon(tenderAnalysis)) {
      validation.checks.london = this.validateLondon(proposal);
      validation.maxScore += validation.checks.london.maxScore;
      validation.score += validation.checks.london.score;
    }

    // General compliance checks
    validation.checks.general = this.validateGeneral(proposal, tenderAnalysis);
    validation.maxScore += validation.checks.general.maxScore;
    validation.score += validation.checks.general.score;

    // Compile all issues
    validation.issues = this.compileIssues(validation.checks);
    validation.warnings = this.compileWarnings(validation.checks);

    // Calculate overall status
    const compliancePercentage = validation.maxScore > 0 
      ? (validation.score / validation.maxScore) * 100 
      : 0;

    if (compliancePercentage >= 90) {
      validation.overall = 'compliant';
    } else if (compliancePercentage >= 70) {
      validation.overall = 'mostly_compliant';
    } else {
      validation.overall = 'non_compliant';
    }

    // Generate recommendations
    validation.recommendations = this.generateRecommendations(validation);

    return validation;
  }

  /**
   * Validate CDM 2015 compliance
   */
  validateCDM2015(proposal) {
    const check = {
      score: 0,
      maxScore: 0,
      issues: [],
      warnings: [],
      checks: {}
    };

    const requiredElements = [
      { element: 'dutyHolders', weight: 20, description: 'Duty holders identified' },
      { element: 'preConstructionInfo', weight: 15, description: 'Pre-construction information addressed' },
      { element: 'constructionPhasePlan', weight: 20, description: 'Construction phase plan detailed' },
      { element: 'healthAndSafetyFile', weight: 15, description: 'Health and safety file mentioned' },
      { element: 'keyPhrases', weight: 10, description: 'CDM 2015 key phrases included' },
      { element: 'riskManagement', weight: 20, description: 'Risk management processes detailed' }
    ];

    const proposalText = this.getProposalText(proposal);

    requiredElements.forEach(item => {
      check.maxScore += item.weight;
      
      let elementScore = 0;
      let hasIssue = true;

      switch (item.element) {
        case 'dutyHolders':
          if (this.checkDutyHolders(proposalText)) {
            elementScore = item.weight;
            hasIssue = false;
          }
          break;
        case 'preConstructionInfo':
          if (this.checkPreConstructionInfo(proposalText)) {
            elementScore = item.weight;
            hasIssue = false;
          }
          break;
        case 'constructionPhasePlan':
          if (this.checkConstructionPhasePlan(proposalText)) {
            elementScore = item.weight;
            hasIssue = false;
          }
          break;
        case 'healthAndSafetyFile':
          if (this.checkHealthAndSafetyFile(proposalText)) {
            elementScore = item.weight;
            hasIssue = false;
          }
          break;
        case 'keyPhrases':
          const phraseCount = this.checkKeyPhrases(proposalText, CDM2015.keyPhrases);
          elementScore = Math.min(item.weight, (phraseCount / 3) * item.weight);
          hasIssue = phraseCount === 0;
          break;
        case 'riskManagement':
          if (this.checkRiskManagement(proposalText)) {
            elementScore = item.weight;
            hasIssue = false;
          }
          break;
      }

      check.score += elementScore;
      check.checks[item.element] = {
        score: elementScore,
        maxScore: item.weight,
        passed: elementScore > 0
      };

      if (hasIssue) {
        check.issues.push(`Missing or insufficient: ${item.description}`);
      }
    });

    return check;
  }

  /**
   * Validate NHS compliance
   */
  validateNHS(proposal) {
    const check = {
      score: 0,
      maxScore: 0,
      issues: [],
      warnings: [],
      checks: {}
    };

    const requiredElements = [
      { element: 'infectionControl', weight: 25, description: 'Infection control expertise' },
      { element: 'clinicalEnvironment', weight: 25, description: 'Clinical environment experience' },
      { element: 'htmCompliance', weight: 20, description: 'HTM compliance mentioned' },
      { element: 'socialValue', weight: 15, description: 'Social value commitments' },
      { element: 'keyPhrases', weight: 15, description: 'NHS key phrases included' }
    ];

    const proposalText = this.getProposalText(proposal);

    requiredElements.forEach(item => {
      check.maxScore += item.weight;
      
      let elementScore = 0;
      let hasIssue = true;

      switch (item.element) {
        case 'infectionControl':
          if (this.checkForKeywords(proposalText, ['infection', 'infection control', 'HTM 00', 'clinical'])) {
            elementScore = item.weight;
            hasIssue = false;
          }
          break;
        case 'clinicalEnvironment':
          if (this.checkForKeywords(proposalText, ['clinical', 'patient', 'occupied building', 'healthcare'])) {
            elementScore = item.weight;
            hasIssue = false;
          }
          break;
        case 'htmCompliance':
          if (this.checkForKeywords(proposalText, ['HTM', 'Health Technical Memorandum'])) {
            elementScore = item.weight;
            hasIssue = false;
          }
          break;
        case 'socialValue':
          if (this.checkForKeywords(proposalText, ['social value', 'apprenticeship', 'local employment'])) {
            elementScore = item.weight;
            hasIssue = false;
          }
          break;
        case 'keyPhrases':
          const phraseCount = this.checkKeyPhrases(proposalText, NHSProcurement.keyPhrases);
          elementScore = Math.min(item.weight, (phraseCount / 3) * item.weight);
          hasIssue = phraseCount === 0;
          break;
      }

      check.score += elementScore;
      check.checks[item.element] = {
        score: elementScore,
        maxScore: item.weight,
        passed: elementScore > 0
      };

      if (hasIssue) {
        check.issues.push(`Missing or insufficient: ${item.description}`);
      }
    });

    return check;
  }

  /**
   * Validate London-specific compliance
   */
  validateLondon(proposal) {
    const check = {
      score: 0,
      maxScore: 0,
      issues: [],
      warnings: [],
      checks: {}
    };

    const requiredElements = [
      { element: 'transport', weight: 25, description: 'Transport and logistics strategy' },
      { element: 'environmental', weight: 25, description: 'Environmental management' },
      { element: 'londonPlan', weight: 20, description: 'London Plan compliance' },
      { element: 'community', weight: 15, description: 'Community engagement' },
      { element: 'keyPhrases', weight: 15, description: 'London key phrases included' }
    ];

    const proposalText = this.getProposalText(proposal);

    requiredElements.forEach(item => {
      check.maxScore += item.weight;
      
      let elementScore = 0;
      let hasIssue = true;

      switch (item.element) {
        case 'transport':
          if (this.checkForKeywords(proposalText, ['transport', 'ULEZ', 'logistics', 'delivery'])) {
            elementScore = item.weight;
            hasIssue = false;
          }
          break;
        case 'environmental':
          if (this.checkForKeywords(proposalText, ['air quality', 'noise', 'environmental', 'sustainability'])) {
            elementScore = item.weight;
            hasIssue = false;
          }
          break;
        case 'londonPlan':
          if (this.checkForKeywords(proposalText, ['London Plan', 'London-specific', 'borough'])) {
            elementScore = item.weight;
            hasIssue = false;
          }
          break;
        case 'community':
          if (this.checkForKeywords(proposalText, ['community', 'engagement', 'local', 'consultation'])) {
            elementScore = item.weight;
            hasIssue = false;
          }
          break;
        case 'keyPhrases':
          const phraseCount = this.checkKeyPhrases(proposalText, LondonRequirements.keyPhrases);
          elementScore = Math.min(item.weight, (phraseCount / 3) * item.weight);
          hasIssue = phraseCount === 0;
          break;
      }

      check.score += elementScore;
      check.checks[item.element] = {
        score: elementScore,
        maxScore: item.weight,
        passed: elementScore > 0
      };

      if (hasIssue) {
        check.issues.push(`Missing or insufficient: ${item.description}`);
      }
    });

    return check;
  }

  /**
   * Validate general compliance
   */
  validateGeneral(proposal, tenderAnalysis) {
    return {
      score: 0,
      maxScore: 0,
      issues: [],
      warnings: []
    };
  }

  // Helper methods for validation checks
  requiresCDM2015(tenderAnalysis) {
    const projectType = tenderAnalysis.projectInfo?.type || '';
    return projectType.toLowerCase().includes('construction') || 
           projectType.toLowerCase().includes('build');
  }

  requiresNHS(tenderAnalysis) {
    const clientType = tenderAnalysis.projectInfo?.client || '';
    return clientType.toLowerCase().includes('nhs') || 
           clientType.toLowerCase().includes('health');
  }

  requiresLondon(tenderAnalysis) {
    const location = tenderAnalysis.projectInfo?.location || '';
    return location.toLowerCase().includes('london');
  }

  getProposalText(proposal) {
    // Extract text from proposal sections for keyword checking
    let text = '';
    
    if (proposal.sections) {
      if (proposal.sections.executiveSummary) {
        text += JSON.stringify(proposal.sections.executiveSummary) + ' ';
      }
      if (proposal.sections.technicalResponse) {
        text += JSON.stringify(proposal.sections.technicalResponse) + ' ';
      }
    }
    
    return text.toLowerCase();
  }

  checkDutyHolders(proposalText) {
    const keywords = ['duty holder', 'principal contractor', 'principal designer', 'client', 'designer', 'contractor'];
    return this.checkForKeywords(proposalText, keywords);
  }

  checkPreConstructionInfo(proposalText) {
    const keywords = ['pre-construction', 'pre construction information'];
    return this.checkForKeywords(proposalText, keywords);
  }

  checkConstructionPhasePlan(proposalText) {
    const keywords = ['construction phase plan', 'construction phase'];
    return this.checkForKeywords(proposalText, keywords);
  }

  checkHealthAndSafetyFile(proposalText) {
    const keywords = ['health and safety file', 'safety file'];
    return this.checkForKeywords(proposalText, keywords);
  }

  checkRiskManagement(proposalText) {
    const keywords = ['risk management', 'risk assessment', 'risk mitigation'];
    return this.checkForKeywords(proposalText, keywords);
  }

  checkKeyPhrases(proposalText, phrases) {
    let count = 0;
    phrases.forEach(phrase => {
      if (proposalText.includes(phrase.toLowerCase())) {
        count++;
      }
    });
    return count;
  }

  checkForKeywords(text, keywords) {
    return keywords.some(keyword => text.includes(keyword.toLowerCase()));
  }

  compileIssues(checks) {
    const issues = [];
    if (checks.cdm2015) issues.push(...checks.cdm2015.issues);
    if (checks.nhs) issues.push(...checks.nhs.issues);
    if (checks.london) issues.push(...checks.london.issues);
    issues.push(...checks.general.issues);
    return issues;
  }

  compileWarnings(checks) {
    const warnings = [];
    if (checks.cdm2015) warnings.push(...checks.cdm2015.warnings);
    if (checks.nhs) warnings.push(...checks.nhs.warnings);
    if (checks.london) warnings.push(...checks.london.warnings);
    warnings.push(...checks.general.warnings);
    return warnings;
  }

  generateRecommendations(validation) {
    const recommendations = [];

    if (validation.overall === 'non_compliant') {
      recommendations.push('CRITICAL: Address all compliance issues before submission');
    }

    if (validation.issues.length > 0) {
      recommendations.push(`Address ${validation.issues.length} compliance issue(s)`);
    }

    if (validation.checks.cdm2015 && validation.checks.cdm2015.score < validation.checks.cdm2015.maxScore * 0.8) {
      recommendations.push('Enhance CDM 2015 compliance content');
    }

    if (validation.checks.nhs && validation.checks.nhs.score < validation.checks.nhs.maxScore * 0.8) {
      recommendations.push('Strengthen NHS-specific content and HTM compliance');
    }

    if (validation.checks.london && validation.checks.london.score < validation.checks.london.maxScore * 0.8) {
      recommendations.push('Add more London-specific considerations');
    }

    return recommendations;
  }
}

export default ComplianceValidator;
