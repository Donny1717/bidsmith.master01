/**
 * Tender Analyzer
 * Analyzes tender documents to extract requirements, evaluation criteria, and key information
 */

import CDM2015 from '../knowledge-base/cdm2015.js';
import UKConstructionLaw from '../knowledge-base/uk-construction-law.js';
import NHSProcurement from '../knowledge-base/nhs-procurement.js';
import LondonRequirements from '../knowledge-base/london-requirements.js';
import ProposalStrategies from '../knowledge-base/proposal-strategies.js';

export class TenderAnalyzer {
  constructor() {
    this.knowledgeBases = {
      cdm2015: CDM2015,
      ukConstructionLaw: UKConstructionLaw,
      nhsProcurement: NHSProcurement,
      londonRequirements: LondonRequirements,
      proposalStrategies: ProposalStrategies
    };
  }

  /**
   * Analyze tender documents
   * @param {Object} tenderData - Tender documents and metadata
   * @returns {Object} Analysis results with requirements, evaluation criteria, and recommendations
   */
  async analyzeTender(tenderData) {
    const {
      documents,
      projectType,
      clientType,
      location,
      projectValue,
      submissionDeadline,
      additionalContext
    } = tenderData;

    const analysis = {
      projectInfo: {
        type: projectType || 'Unknown',
        client: clientType || 'Unknown',
        location: location || 'Unknown',
        value: projectValue,
        deadline: submissionDeadline
      },
      requirements: {
        technical: [],
        commercial: [],
        legal: [],
        regulatory: [],
        documentation: []
      },
      evaluationCriteria: {
        technical: null,
        commercial: null,
        quality: null,
        socialValue: null,
        total: null
      },
      regulatoryRequirements: [],
      proposalStructure: {
        sections: [],
        wordLimits: {},
        format: {}
      },
      keyCompliancePoints: [],
      winThemes: [],
      recommendations: []
    };

    // Extract requirements from documents
    analysis.requirements = this.extractRequirements(documents);

    // Identify regulatory requirements based on project type and location
    analysis.regulatoryRequirements = this.identifyRegulatoryRequirements(
      projectType,
      clientType,
      location
    );

    // Extract evaluation criteria
    analysis.evaluationCriteria = this.extractEvaluationCriteria(documents);

    // Determine proposal structure requirements
    analysis.proposalStructure = this.determineProposalStructure(documents);

    // Identify key compliance points
    analysis.keyCompliancePoints = this.identifyCompliancePoints(
      projectType,
      clientType,
      location,
      documents
    );

    // Generate win theme recommendations
    analysis.winThemes = this.generateWinThemes(projectType, clientType, location);

    // Generate recommendations
    analysis.recommendations = this.generateRecommendations(
      projectType,
      clientType,
      location,
      analysis
    );

    return analysis;
  }

  /**
   * Extract requirements from tender documents
   */
  extractRequirements(documents) {
    // This would integrate with document parsing (Word, PDF, etc.)
    // For now, return structure for manual input or AI parsing
    return {
      technical: [
        'Technical approach and methodology',
        'Project management and organization',
        'Quality management',
        'Health and safety management',
        'Risk management',
        'Program and delivery'
      ],
      commercial: [
        'Pricing structure',
        'Payment terms',
        'Cost breakdown',
        'Value for money'
      ],
      legal: [
        'Contract terms',
        'Insurance requirements',
        'Liability and indemnity',
        'Dispute resolution'
      ],
      regulatory: [],
      documentation: [
        'Company information',
        'Relevant experience',
        'Key personnel',
        'Certifications',
        'References',
        'Insurance certificates'
      ]
    };
  }

  /**
   * Identify regulatory requirements based on project characteristics
   */
  identifyRegulatoryRequirements(projectType, clientType, location) {
    const requirements = [];

    // CDM 2015 requirements (all construction projects)
    if (projectType && projectType.toLowerCase().includes('construction')) {
      requirements.push({
        regulation: 'CDM 2015',
        description: 'Construction (Design and Management) Regulations 2015',
        requirements: CDM2015.dutyHolders,
        compliancePoints: CDM2015.commonFailures,
        keyPhrases: CDM2015.keyPhrases
      });
    }

    // NHS-specific requirements
    if (clientType && (clientType.toLowerCase().includes('nhs') || 
                       clientType.toLowerCase().includes('health'))) {
      requirements.push({
        regulation: 'NHS Procurement Standards',
        description: 'NHS procurement and clinical environment requirements',
        requirements: NHSProcurement.clinicalRequirements,
        compliancePoints: NHSProcurement.requiredDocumentation,
        keyPhrases: NHSProcurement.keyPhrases
      });
    }

    // London-specific requirements
    if (location && location.toLowerCase().includes('london')) {
      requirements.push({
        regulation: 'London Requirements',
        description: 'London-specific construction and environmental requirements',
        requirements: LondonRequirements,
        compliancePoints: LondonRequirements.mandatoryElements,
        keyPhrases: LondonRequirements.keyPhrases
      });
    }

    return requirements;
  }

  /**
   * Extract evaluation criteria from documents
   */
  extractEvaluationCriteria(documents) {
    // Default NHS evaluation criteria if NHS tender
    // Would be extracted from documents in full implementation
    return {
      technical: 40,
      commercial: 35,
      quality: 15,
      socialValue: 10,
      total: 100
    };
  }

  /**
   * Determine proposal structure requirements
   */
  determineProposalStructure(documents) {
    return {
      sections: [
        'Executive Summary',
        'Technical Response',
        'Commercial Response',
        'Supporting Information'
      ],
      wordLimits: {
        executiveSummary: 1000,
        technicalResponse: 10000,
        commercialResponse: 5000
      },
      format: {
        fileType: 'PDF',
        pageSize: 'A4',
        fontSize: 11,
        lineSpacing: 1.5
      }
    };
  }

  /**
   * Identify key compliance points
   */
  identifyCompliancePoints(projectType, clientType, location, documents) {
    const points = [];

    // CDM 2015 compliance points
    if (projectType && projectType.toLowerCase().includes('construction')) {
      points.push(...CDM2015.winningStrategies);
      points.push('CDM 2015 duty holder identification');
      points.push('Pre-construction information management');
      points.push('Construction phase plan');
      points.push('Health and safety file');
    }

    // NHS compliance points
    if (clientType && (clientType.toLowerCase().includes('nhs') || 
                       clientType.toLowerCase().includes('health'))) {
      points.push(...NHSProcurement.winningStrategies);
      points.push('HTM compliance');
      points.push('Infection control expertise');
      points.push('Clinical environment experience');
    }

    // London compliance points
    if (location && location.toLowerCase().includes('london')) {
      points.push(...LondonRequirements.winningStrategies);
      points.push('London Plan compliance');
      points.push('ULEZ and transport management');
    }

    return points;
  }

  /**
   * Generate win themes based on project characteristics
   */
  generateWinThemes(projectType, clientType, location) {
    const themes = [];

    // Base themes
    themes.push('Proven track record and experience');
    themes.push('Quality and safety excellence');
    themes.push('Value for money');

    // Project-specific themes
    if (projectType && projectType.toLowerCase().includes('construction')) {
      themes.push('CDM 2015 compliance expertise');
      themes.push('Innovative construction methods');
    }

    // Client-specific themes
    if (clientType && (clientType.toLowerCase().includes('nhs') || 
                       clientType.toLowerCase().includes('health'))) {
      themes.push('Healthcare construction specialist');
      themes.push('Patient and staff safety focus');
      themes.push('Strong social value commitments');
    }

    // Location-specific themes
    if (location && location.toLowerCase().includes('london')) {
      themes.push('London construction expertise');
      themes.push('Local knowledge and presence');
      themes.push('Minimal disruption strategies');
    }

    return themes;
  }

  /**
   * Generate recommendations for proposal development
   */
  generateRecommendations(projectType, clientType, location, analysis) {
    const recommendations = [];

    recommendations.push({
      priority: 'Critical',
      category: 'Compliance',
      recommendation: 'Ensure all mandatory requirements are explicitly addressed',
      action: 'Create compliance checklist from tender requirements'
    });

    recommendations.push({
      priority: 'High',
      category: 'Structure',
      recommendation: 'Align proposal structure with evaluation criteria',
      action: 'Structure sections to match evaluation weightings'
    });

    recommendations.push({
      priority: 'High',
      category: 'Content',
      recommendation: 'Develop and weave win themes throughout proposal',
      action: 'Identify 3-5 key win themes and reinforce consistently'
    });

    // Regulatory recommendations
    if (analysis.regulatoryRequirements.length > 0) {
      analysis.regulatoryRequirements.forEach(reg => {
        recommendations.push({
          priority: 'Critical',
          category: 'Regulatory',
          recommendation: `Ensure full compliance with ${reg.regulation}`,
          action: `Include all ${reg.regulation} requirements and key phrases`
        });
      });
    }

    return recommendations;
  }
}

export default TenderAnalyzer;
