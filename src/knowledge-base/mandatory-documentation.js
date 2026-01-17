/**
 * Mandatory Documentation Requirements
 * Essential documentation that must be included in construction and NHS tender proposals
 */

export const MandatoryDocumentation = {
  description: 'Mandatory documentation elements for construction and NHS tenders',

  // Health & Safety Documentation
  healthAndSafety: {
    companyHealthAndSafetyPolicy: {
      required: true,
      description: 'Company Health & Safety Policy',
      requirements: [
        'Signed by Director/Senior Manager',
        'Reviewed within last 12 months',
        'Specific responsibilities identified',
        'Arrangements for implementation',
        'Review and update procedures',
        'Accessible to all employees'
      ],
      proposalInclusion: [
        'Include Health & Safety Policy (signed and dated)',
        'Confirm policy has been reviewed within last 12 months',
        'Show policy is accessible to all employees',
        'Detail policy implementation arrangements'
      ],
      mandatoryElements: [
        'Statement of general policy',
        'Organizational responsibilities',
        'Arrangements for implementation',
        'Review and update procedures',
        'Director signature and date',
        'Review date (within last 12 months)'
      ]
    },
    riskAssessmentsAndMethodStatements: {
      required: true,
      description: 'Risk Assessments & Method Statements (RAMS)',
      genericRAMS: {
        description: 'Generic RAMS for common activities',
        requirements: [
          'Generic risk assessments for standard construction activities',
          'Method statements for common work types',
          'Regular review and update',
          'Site-specific customization process'
        ]
      },
      projectSpecificRAMS: {
        description: 'Project-specific RAMS',
        requirements: [
          'Project-specific risk assessments',
          'Project-specific method statements',
          'All significant risks identified',
          'Control measures detailed',
          'Residual risk evaluated',
          'Review and update procedures'
        ]
      },
      requiredContent: [
        'Activity description',
        'Hazard identification',
        'Risk assessment (likelihood and severity)',
        'Control measures (hierarchy of control)',
        'Residual risk evaluation',
        'Personal protective equipment (PPE) requirements',
        'Emergency procedures',
        'Review and update arrangements'
      ],
      proposalInclusion: [
        'Provide examples of generic RAMS',
        'Demonstrate approach to project-specific RAMS',
        'Show how significant risks are identified',
        'Detail control measure development process',
        'Explain residual risk evaluation approach'
      ]
    },
    safetyManagementSystem: {
      required: true,
      description: 'Safety Management System',
      elements: [
        'Accident/incident reporting procedures',
        'Emergency procedures',
        'First aid provision',
        'Welfare facilities',
        'Site induction process',
        'Competency verification',
        'Training records',
        'Inspection and audit procedures',
        'Corrective action procedures',
        'Performance monitoring'
      ],
      proposalInclusion: [
        'Describe Safety Management System',
        'Detail accident/incident reporting procedures',
        'Explain emergency procedures',
        'Show first aid provision arrangements',
        'Detail site induction process',
        'Demonstrate competency verification process'
      ]
    },
    evidenceOfCompetence: {
      required: true,
      description: 'Evidence of Competence',
      requirements: [
        'CSCS cards for all operatives',
        'SMSTS (Site Management Safety Training Scheme) for managers',
        'SSSTS (Site Supervisors Safety Training Scheme) for supervisors',
        'Trade-specific qualifications',
        'Toolbox talk records',
        'Training matrix',
        'Competency verification records',
        'Qualifications and certifications'
      ],
      proposalInclusion: [
        'Demonstrate CSCS card requirement for all operatives',
        'Show SMSTS/SSSTS certification for managers/supervisors',
        'Detail trade-specific qualifications',
        'Provide training matrix',
        'Show competency verification process',
        'Include qualifications and certifications for key personnel'
      ],
      mandatoryEvidence: [
        'CSCS cards - all construction operatives',
        'SMSTS - site managers',
        'SSSTS - site supervisors',
        'Trade qualifications - relevant trades',
        'Training records and matrices',
        'Competency verification documentation'
      ]
    }
  },

  // Quality Documentation
  quality: {
    qualityManagementSystem: {
      required: true,
      description: 'Quality Management System',
      requirements: [
        'ISO 9001 certification (where applicable)',
        'Quality policy and procedures',
        'Quality plans',
        'Inspection and testing procedures',
        'Non-conformance management',
        'Corrective action procedures',
        'Continuous improvement processes'
      ],
      proposalInclusion: [
        'Provide Quality Management System documentation',
        'Show ISO 9001 certification (if applicable)',
        'Detail quality plans and procedures',
        'Explain inspection and testing processes'
      ]
    },
    environmentalManagement: {
      required: true,
      description: 'Environmental Management System',
      requirements: [
        'ISO 14001 certification (where applicable)',
        'Environmental policy',
        'Environmental aspects and impacts',
        'Environmental management plans',
        'Waste management procedures',
        'Pollution prevention measures'
      ],
      proposalInclusion: [
        'Provide Environmental Management System documentation',
        'Show ISO 14001 certification (if applicable)',
        'Detail environmental management approach',
        'Explain waste management and pollution prevention'
      ]
    }
  },

  // Insurance Documentation
  insurance: {
    required: true,
    description: 'Insurance Certificates',
    types: [
      {
        name: 'Public Liability Insurance',
        minimum: '£5-10M typically required',
        required: true
      },
      {
        name: 'Employers Liability Insurance',
        minimum: '£5M (legal minimum)',
        required: true
      },
      {
        name: 'Professional Indemnity Insurance',
        minimum: 'Project value dependent',
        required: true,
        conditional: 'For design works'
      },
      {
        name: 'Contract Works Insurance',
        minimum: 'Contract value',
        required: false,
        conditional: 'May be required depending on contract'
      }
    ],
    proposalInclusion: [
      'Provide insurance certificates',
      'Show adequate cover levels',
      'Demonstrate continuity of cover',
      'Include named insurers and policy details',
      'Show policy expiry dates'
    ]
  },

  // Financial Documentation
  financial: {
    financialStanding: {
      required: true,
      description: 'Financial Standing Evidence',
      requirements: [
        'Audited accounts (last 2-3 years)',
        'Bank references',
        'Credit checks',
        'Financial capacity to undertake project',
        'Turnover requirements met'
      ],
      proposalInclusion: [
        'Provide financial standing evidence',
        'Show financial capacity for project',
        'Include relevant financial documentation'
      ]
    }
  },

  // Certifications and Accreditations
  certifications: {
    required: true,
    description: 'Relevant Certifications and Accreditations',
    commonCertifications: [
      'ISO 9001 - Quality Management',
      'ISO 14001 - Environmental Management',
      'ISO 45001 - Occupational Health and Safety',
      'CHAS (Contractors Health and Safety Assessment Scheme)',
      'Constructionline',
      'Achilles',
      'SafeContractor',
      'Exor',
      'SSIP (Safety Schemes in Procurement) member'
    ],
    proposalInclusion: [
      'List all relevant certifications and accreditations',
      'Provide certificates where requested',
      'Show validity dates',
      'Demonstrate continuous certification'
    ]
  },

  // References and Case Studies
  references: {
    required: true,
    description: 'References and Case Studies',
    requirements: [
      'References from previous clients (typically 2-3)',
      'Case studies of similar projects',
      'Project values and scope',
      'Client contact details',
      'Relevant project experience',
      'Performance on previous projects'
    ],
    proposalInclusion: [
      'Provide client references (2-3 typically)',
      'Include case studies of similar/relevant projects',
      'Show project values and scope',
      'Demonstrate relevant experience',
      'Include client contact details for references'
    ]
  },

  // General Proposal Requirements
  proposalRequirements: [
    'All mandatory documentation must be provided',
    'Documents must be current and valid',
    'All policies must be signed and dated',
    'Insurance certificates must be valid',
    'Certifications must be current',
    'References must be relevant and recent',
    'Documentation must be clearly organized',
    'Easy to find and reference in proposal'
  ]
};

export default MandatoryDocumentation;
