/**
 * CDM 2015 - Construction (Design and Management) Regulations 2015
 * Comprehensive knowledge base for UK construction tender compliance
 */

export const CDM2015 = {
  version: '2015',
  lastUpdated: '2024',
  description: 'Construction (Design and Management) Regulations 2015',

  // Quick Reference: Key Regulations
  keyRegulations: {
    client: 'Regulation 4-5',
    principalDesigner: 'Regulation 11-12',
    principalContractor: 'Regulation 13-14',
    designers: 'Regulation 8-10',
    contractors: 'Regulation 15',
    preConstructionInfo: 'Regulation 4(4), Regulation 12(1)',
    constructionPhasePlan: 'Regulation 12(1)',
    healthAndSafetyFile: 'Regulation 12(5)',
    projectNotification: 'Regulation 7',
    welfareFacilities: 'Regulation 13(4), Schedule 2'
  },

  // Key Duty Holders that MUST be addressed in proposals
  // Regulations referenced: CDM 2015
  dutyHolders: {
    client: {
      regulation: 'Regulation 4-5',
      description: 'The person or organization for whom the construction project is carried out',
      duties: [
        {
          duty: 'Appoint Principal Designer before construction',
          regulation: 'Regulation 5(1)(a)',
          critical: true
        },
        {
          duty: 'Ensure sufficient time and resources are allocated',
          regulation: 'Regulation 4(1)',
          critical: true
        },
        {
          duty: 'Provide pre-construction information',
          regulation: 'Regulation 4(4)',
          critical: true
        },
        {
          duty: 'Ensure suitable welfare facilities are provided',
          regulation: 'Regulation 4(3)',
          critical: true
        },
        {
          duty: 'Ensure Principal Designer and Principal Contractor carry out their duties',
          regulation: 'Regulation 4(2)',
          critical: true
        },
        {
          duty: 'Make suitable arrangements for managing the project',
          regulation: 'Regulation 4(1)',
          critical: true
        }
      ],
      proposalRequirements: [
        'Demonstrate understanding of client obligations under Regulations 4-5',
        'Show how client will appoint Principal Designer before construction commences',
        'Demonstrate client commitment to providing sufficient time and resources',
        'Outline process for providing pre-construction information',
        'Confirm client will ensure welfare facilities are provided',
        'Show how client will monitor Principal Designer and Principal Contractor duties'
      ],
      mandatoryStatements: [
        'The client will appoint a Principal Designer before construction work begins',
        'The client is committed to allocating sufficient time and resources for the project',
        'The client will provide all pre-construction information in their possession',
        'The client will ensure suitable welfare facilities are provided'
      ]
    },
    principalDesigner: {
      regulation: 'Regulation 11-12',
      description: 'The designer in control of the pre-construction phase',
      duties: [
        {
          duty: 'Plan, manage, monitor and coordinate health and safety in the pre-construction phase',
          regulation: 'Regulation 11(1)',
          critical: true
        },
        {
          duty: 'Eliminate or control foreseeable risks',
          regulation: 'Regulation 11(2)',
          critical: true
        },
        {
          duty: 'Ensure designers comply with their duties',
          regulation: 'Regulation 11(3)',
          critical: true
        },
        {
          duty: 'Prepare pre-construction information',
          regulation: 'Regulation 12(1)',
          critical: true
        },
        {
          duty: 'Liaise with the Principal Contractor',
          regulation: 'Regulation 12(4)',
          critical: true
        },
        {
          duty: 'Prepare the health and safety file',
          regulation: 'Regulation 12(5)',
          critical: true
        }
      ],
      proposalRequirements: [
        'Identify Principal Designer by name and qualifications (Regulation 11)',
        'Detail how Principal Designer will plan, manage, monitor and coordinate pre-construction phase H&S',
        'Demonstrate process for eliminating or controlling foreseeable risks',
        'Show how Principal Designer will ensure other designers comply with duties',
        'Explain Principal Designer role in preparing pre-construction information',
        'Detail liaison arrangements with Principal Contractor',
        'Confirm Principal Designer responsibility for health and safety file preparation'
      ],
      mandatoryStatements: [
        'The Principal Designer will plan, manage, monitor and coordinate health and safety in the pre-construction phase',
        'The Principal Designer will eliminate or control foreseeable risks',
        'The Principal Designer will ensure all designers comply with their duties under CDM 2015',
        'The Principal Designer will prepare and maintain the pre-construction information',
        'The Principal Designer will liaise with the Principal Contractor throughout the project'
      ]
    },
    principalContractor: {
      regulation: 'Regulation 13-14',
      description: 'The contractor in control of the construction phase',
      duties: [
        {
          duty: 'Plan, manage, monitor and coordinate health and safety in the construction phase',
          regulation: 'Regulation 13(1)',
          critical: true
        },
        {
          duty: 'Liaise with Principal Designer',
          regulation: 'Regulation 13(4)',
          critical: true
        },
        {
          duty: 'Prepare construction phase plan',
          regulation: 'Regulation 12(1)',
          critical: true
        },
        {
          duty: 'Organise cooperation between contractors',
          regulation: 'Regulation 13(2)',
          critical: true
        },
        {
          duty: 'Ensure suitable welfare facilities are provided',
          regulation: 'Regulation 13(4)',
          critical: true
        },
        {
          duty: 'Prevent unauthorised access to site',
          regulation: 'Regulation 13(3)',
          critical: true
        },
        {
          duty: 'Display project notification (if notifiable project)',
          regulation: 'Regulation 7',
          critical: false,
          conditional: 'For notifiable projects only'
        }
      ],
      proposalRequirements: [
        'Identify Principal Contractor by name and qualifications (Regulation 13)',
        'Detail how Principal Contractor will plan, manage, monitor and coordinate construction phase H&S',
        'Explain liaison arrangements with Principal Designer',
        'Demonstrate approach to preparing construction phase plan before work commences',
        'Show how Principal Contractor will organise cooperation between contractors',
        'Detail welfare facility provisions (location, type, maintenance)',
        'Explain security measures to prevent unauthorised site access',
        'If notifiable project: confirm project notification will be displayed'
      ],
      mandatoryStatements: [
        'The Principal Contractor will plan, manage, monitor and coordinate health and safety in the construction phase',
        'The Principal Contractor will liaise with the Principal Designer',
        'The Principal Contractor will prepare a construction phase plan before work commences',
        'The Principal Contractor will organise cooperation between all contractors',
        'The Principal Contractor will ensure suitable welfare facilities are provided',
        'The Principal Contractor will prevent unauthorised access to the site'
      ]
    },
    designers: {
      regulation: 'Regulation 8-10',
      description: 'Persons or organizations who prepare or modify designs',
      duties: [
        {
          duty: 'Eliminate foreseeable health and safety risks',
          regulation: 'Regulation 9(1)',
          critical: true
        },
        {
          duty: 'Reduce remaining risks through design',
          regulation: 'Regulation 9(1)',
          critical: true
        },
        {
          duty: 'Provide information about remaining risks',
          regulation: 'Regulation 9(2)',
          critical: true
        },
        {
          duty: 'Take account of the pre-construction information',
          regulation: 'Regulation 9(3)',
          critical: true
        },
        {
          duty: 'Ensure designs can be built safely',
          regulation: 'Regulation 9(1)',
          critical: true
        }
      ],
      proposalRequirements: [
        'Identify design team and individual qualifications (Regulation 8)',
        'Demonstrate design risk assessment process (Regulation 9)',
        'Show how designs eliminate foreseeable risks at source',
        'Explain how remaining risks are reduced through design',
        'Detail how information about remaining risks is provided',
        'Confirm designs take account of pre-construction information'
      ],
      mandatoryStatements: [
        'All designers will eliminate foreseeable health and safety risks to persons affected by the design',
        'Where risks cannot be eliminated, designers will reduce them through design',
        'Designers will provide information about remaining risks',
        'All designers will take account of pre-construction information'
      ]
    },
    contractors: {
      regulation: 'Regulation 15',
      description: 'Persons or organizations who carry out or manage construction work',
      duties: [
        {
          duty: 'Plan, manage and monitor construction work under their control',
          regulation: 'Regulation 15(2)',
          critical: true
        },
        {
          duty: 'Ensure workers have site inductions',
          regulation: 'Regulation 15(3)',
          critical: true
        },
        {
          duty: 'Provide information to Principal Designer/Contractor',
          regulation: 'Regulation 15(4)',
          critical: true
        },
        {
          duty: 'Comply with directions from Principal Designer/Contractor',
          regulation: 'Regulation 15(5)',
          critical: true
        },
        {
          duty: 'Ensure workers have necessary skills, knowledge, training and experience',
          regulation: 'Regulation 15(2)(a)',
          critical: true
        },
        {
          duty: 'Ensure the construction phase plan is followed',
          regulation: 'Regulation 15(2)(b)',
          critical: true
        }
      ],
      proposalRequirements: [
        'Identify contractor team and competencies (Regulation 15)',
        'Demonstrate how contractors plan, manage and monitor work under their control',
        'Confirm all workers receive site-specific inductions',
        'Show information sharing protocols with Principal Designer/Contractor',
        'Demonstrate commitment to complying with Principal Designer/Contractor directions',
        'Detail worker competency verification process',
        'Confirm compliance with construction phase plan'
      ],
      mandatoryStatements: [
        'All contractors will plan, manage and monitor construction work under their control',
        'All workers will receive site-specific inductions before starting work',
        'Contractors will provide necessary information to the Principal Designer and Principal Contractor',
        'Contractors will comply with all directions from the Principal Designer and Principal Contractor',
        'All workers will have the necessary skills, knowledge, training and experience for their work',
        'All contractors will ensure the construction phase plan is followed'
      ]
    }
  },

  // Pre-Construction Information Requirements
  // Regulation 4(4) - Client must provide pre-construction information
  // Regulation 12(1) - Principal Designer must prepare pre-construction information
  preConstructionInfo: {
    regulation: 'Regulation 4(4), Regulation 12(1)',
    description: 'Information about the project that is already in the client\'s possession or which is reasonably obtainable',
    requiredElements: [
      'Project description and timeline',
      'Client considerations and constraints',
      'Site hazards and existing conditions',
      'Emergency procedures and contacts',
      'Existing services and utilities',
      'Structural information',
      'Environmental information',
      'Previous surveys and reports'
    ],
    proposalInclusion: [
      'Acknowledge receipt and review of pre-construction information',
      'Identify any additional information requirements',
      'Show how information informs planning and design',
      'Demonstrate information management systems'
    ]
  },

  // Construction Phase Plan Requirements
  // Regulation 12(1) - Principal Contractor must prepare construction phase plan
  constructionPhasePlan: {
    regulation: 'Regulation 12(1)',
    description: 'Document setting out health and safety arrangements and site rules',
    requiredElements: [
      'Project description and key dates',
      'Management structure and responsibilities',
      'Health and safety aims',
      'Site rules and emergency procedures',
      'Welfare facilities',
      'Arrangements for consultation with workers',
      'Security arrangements'
    ],
    proposalInclusion: [
      'Outline approach to construction phase plan development',
      'Show integration with existing site management systems',
      'Demonstrate worker consultation processes',
      'Detail emergency response procedures'
    ]
  },

  // Health and Safety File Requirements
  // Regulation 12(5) - Principal Designer must prepare health and safety file
  healthAndSafetyFile: {
    regulation: 'Regulation 12(5)',
    description: 'Record of information for future construction work, maintenance, cleaning, and demolition',
    requiredElements: [
      'A brief description of the work',
      'Any residual hazards',
      'Key structural principles and hazardous materials',
      'Information regarding removal or dismantling',
      'Health and safety information about equipment provided',
      'Location of services and means of isolation'
    ],
    proposalInclusion: [
      'Commit to maintaining comprehensive health and safety file',
      'Show file management system and procedures',
      'Demonstrate handover process to client',
      'Detail ongoing maintenance of file during project'
    ]
  },

  // Common Compliance Failures in Proposals
  commonFailures: [
    'Not clearly identifying duty holders and their roles',
    'Failing to address pre-construction information management',
    'Vague or missing construction phase plan details',
    'Insufficient detail on risk management processes',
    'Lack of worker welfare provisions',
    'No mention of health and safety file',
    'Missing coordination and cooperation mechanisms',
    'Inadequate competency verification processes',
    'No site security arrangements',
    'Lack of emergency procedures'
  ],

  // Winning Proposal Strategies for CDM 2015
  winningStrategies: [
    'Clearly identify all duty holders with named individuals and qualifications',
    'Provide detailed, specific examples of compliance processes',
    'Demonstrate prior experience with CDM 2015 projects',
    'Include case studies of successful CDM compliance',
    'Show integration of CDM requirements throughout proposal',
    'Provide visual aids (organograms, flowcharts) showing duty holder relationships',
    'Include relevant certifications and accreditations',
    'Demonstrate proactive approach to health and safety',
    'Show continuous improvement processes',
    'Include third-party audits or verifications'
  ],

  // Key Phrases to Include in Proposals
  keyPhrases: [
    'CDM 2015 compliant',
    'Fully compliant with Construction (Design and Management) Regulations 2015',
    'Duty holder responsibilities clearly defined',
    'Pre-construction information reviewed and integrated',
    'Comprehensive construction phase plan',
    'Health and safety file maintained throughout project',
    'Worker welfare facilities provided in accordance with CDM 2015',
    'Principal contractor and principal designer coordination',
    'Risk elimination and mitigation through design',
    'Competent persons with relevant qualifications'
  ],

  // Detailed Regulatory Requirements for Proposals (CRITICAL)
  proposalRequirements: {
    mandatory: {
      title: 'Mandatory Requirements - MUST be addressed in every proposal',
      items: [
        {
          requirement: 'Duty Holder Identification',
          description: 'Clearly identify who will fulfill each duty holder role',
          details: [
            'Named individual or organization for each duty holder role',
            'Evidence of competence for each duty holder',
            'Organizational structure showing duty holder relationships',
            'Contact information for key duty holders',
            'Alternative arrangements if roles change'
          ],
          proposalLocation: 'Project Management / Organizational Structure section',
          regulatoryReference: 'Regulation 5, 6, 8, 13, 15 (CDM 2015)'
        },
        {
          requirement: 'Pre-Construction Information',
          description: 'Demonstrate how pre-construction information will be managed',
          details: [
            'Process for receiving and reviewing pre-construction information',
            'Identification of information gaps and actions to obtain missing information',
            'How pre-construction information informs design decisions',
            'Information management systems and distribution protocols',
            'Timeline for information gathering and review'
          ],
          proposalLocation: 'Health & Safety / Risk Management section',
          regulatoryReference: 'Regulation 4 (CDM 2015)'
        },
        {
          requirement: 'Construction Phase Plan',
          description: 'Detailed approach to developing and implementing construction phase plan',
          details: [
            'Process for preparing construction phase plan before work starts',
            'Key elements to be included (management structure, site rules, emergency procedures, welfare facilities)',
            'Integration with existing health and safety management systems',
            'Review and update procedures',
            'How plan will be communicated to all workers and contractors',
            'Arrangements for consultation with workers'
          ],
          proposalLocation: 'Health & Safety / Site Management section',
          regulatoryReference: 'Regulation 12 (CDM 2015)'
        },
        {
          requirement: 'Health and Safety File',
          description: 'Commitment to maintaining comprehensive health and safety file',
          details: [
            'Process for compiling health and safety file during project',
            'Information to be included (residual hazards, structural principles, hazardous materials, services)',
            'File management system and responsibility for maintenance',
            'Handover process to client on project completion',
            'Format and accessibility of file',
            'Arrangements for future updates if needed'
          ],
          proposalLocation: 'Project Management / Handover section',
          regulatoryReference: 'Regulation 12 (CDM 2015)'
        },
        {
          requirement: 'Worker Welfare Facilities',
          description: 'Provisions for worker welfare in accordance with CDM 2015',
          details: [
            'Sanitary facilities (toilets, washing facilities)',
            'Rest facilities and accommodation',
            'Drinking water provision',
            'Facilities for changing and storing clothing',
            'Facilities for meals and breaks',
            'Location and accessibility of welfare facilities',
            'Maintenance and cleaning arrangements'
          ],
          proposalLocation: 'Health & Safety / Site Facilities section',
          regulatoryReference: 'Regulation 13(4) and Schedule 2 (CDM 2015)'
        },
        {
          requirement: 'Competence and Training',
          description: 'Evidence of competence for all persons working on project',
          details: [
            'Competency verification process for all personnel',
            'Required qualifications, training, and experience',
            'Ongoing training and development arrangements',
            'Site-specific inductions for all workers',
            'Monitoring and assessment of competence',
            'Arrangements for contractor competency verification'
          ],
          proposalLocation: 'Project Team / Personnel section',
          regulatoryReference: 'Regulation 8 (CDM 2015)'
        },
        {
          requirement: 'Risk Management',
          description: 'Comprehensive approach to identifying, assessing, and managing risks',
          details: [
            'Design risk assessment process (eliminate, reduce, control)',
            'Construction risk assessment and method statements',
            'Risk register and monitoring procedures',
            'Hierarchy of risk control measures',
            'Review and update of risk assessments',
            'Communication of risks to relevant parties'
          ],
          proposalLocation: 'Risk Management / Design section',
          regulatoryReference: 'Regulation 8(3), 9(1) (CDM 2015)'
        },
        {
          requirement: 'Coordination and Cooperation',
          description: 'Mechanisms for coordination and cooperation between duty holders',
          details: [
            'Principal designer and principal contractor liaison arrangements',
            'Regular coordination meetings and communication protocols',
            'Information sharing systems',
            'Conflict resolution procedures',
            'Integration of design and construction activities',
            'Multi-contractor coordination on site'
          ],
          proposalLocation: 'Project Management / Coordination section',
          regulatoryReference: 'Regulation 11, 13(5) (CDM 2015)'
        }
      ]
    },
    bestPractice: {
      title: 'Best Practice Elements - Strongly Recommended',
      items: [
        {
          element: 'Visual Demonstrations',
          description: 'Organograms and flowcharts showing duty holder relationships',
          benefit: 'Helps evaluators quickly understand management structure'
        },
        {
          element: 'Case Studies',
          description: 'Examples of previous CDM 2015 compliant projects',
          benefit: 'Demonstrates proven track record and experience'
        },
        {
          element: 'Third-Party Verification',
          description: 'Audits, certifications, or external validations',
          benefit: 'Independent confirmation of competence and compliance'
        },
        {
          element: 'Continuous Improvement',
          description: 'Lessons learned processes and improvement mechanisms',
          benefit: 'Shows commitment to ongoing excellence'
        },
        {
          element: 'Innovation',
          description: 'Use of technology or innovative approaches to CDM compliance',
          benefit: 'Demonstrates forward-thinking and efficiency'
        }
      ]
    }
  },

  // Project Type Specific Requirements
  projectTypeRequirements: {
    notifiable: {
      description: 'Projects that are notifiable to HSE (construction phase > 30 days OR > 500 person days OR involving specific high-risk activities)',
      additionalRequirements: [
        'Principal Designer must be appointed',
        'Principal Contractor must be appointed',
        'HSE notification (F10 form) must be submitted',
        'More detailed pre-construction information required',
        'Enhanced construction phase plan requirements'
      ],
      proposalImplications: [
        'Clearly state if project is notifiable',
        'Provide HSE notification process details',
        'Emphasize principal designer and principal contractor roles',
        'Include additional detail in all CDM sections'
      ]
    },
    small: {
      description: 'Projects with lower complexity but still subject to CDM 2015',
      requirements: [
        'Simplified but still compliant approach',
        'Clear duty holder identification',
        'Basic construction phase plan',
        'Appropriate welfare facilities',
        'Worker competence verification'
      ],
      proposalImplications: [
        'Demonstrate proportionate approach',
        'Show understanding that CDM applies to all projects',
        'Avoid over-complication while maintaining compliance'
      ]
    }
  },

  // Common Legal Pitfalls to Avoid
  legalPitfalls: [
    {
      pitfall: 'Assuming CDM 2015 does not apply',
      reality: 'CDM 2015 applies to ALL construction projects, regardless of size or duration',
      solution: 'Always demonstrate CDM 2015 compliance in proposals'
    },
    {
      pitfall: 'Vague duty holder identification',
      reality: 'Evaluators need specific names and qualifications, not generic statements',
      solution: 'Name specific individuals or organizations for each duty holder role'
    },
    {
      pitfall: 'Focusing only on construction phase',
      reality: 'CDM 2015 covers entire project lifecycle including pre-construction and handover',
      solution: 'Address pre-construction phase, construction phase, and health and safety file'
    },
    {
      pitfall: 'Insufficient detail on welfare facilities',
      reality: 'Welfare facilities are mandatory and must be detailed',
      solution: 'Provide specific details on location, type, and maintenance of welfare facilities'
    },
    {
      pitfall: 'No mention of health and safety file',
      reality: 'Health and safety file is mandatory for all projects',
      solution: 'Clearly describe file compilation, maintenance, and handover process'
    },
    {
      pitfall: 'Generic risk management statements',
      reality: 'Evaluators want to see specific risk identification and control measures',
      solution: 'Provide project-specific risk assessments and control measures'
    }
  ],

  // Evaluation Criteria for CDM 2015 Compliance
  evaluationConsiderations: {
    understanding: {
      weight: 'High',
      description: 'Demonstrates understanding of CDM 2015 requirements',
      indicators: [
        'Accurate use of CDM 2015 terminology',
        'Correct identification of duty holders',
        'Understanding of all project phases'
      ]
    },
    practicalApplication: {
      weight: 'High',
      description: 'Shows practical application of CDM 2015 principles',
      indicators: [
        'Specific processes and procedures',
        'Real examples and case studies',
        'Integration with project management'
      ]
    },
    competence: {
      weight: 'Critical',
      description: 'Evidence of competent persons and organizations',
      indicators: [
        'Qualifications and experience of duty holders',
        'Training and development arrangements',
        'Third-party verification or certifications'
      ]
    },
    comprehensiveness: {
      weight: 'High',
      description: 'Addresses all CDM 2015 requirements comprehensively',
      indicators: [
        'All duty holders addressed',
        'All phases covered',
        'No significant gaps'
      ]
    }
  },

  // Template Phrases for Proposal Writing
  templatePhrases: {
    introduction: [
      'Our approach is fully compliant with the Construction (Design and Management) Regulations 2015 (CDM 2015)',
      'We understand the requirements of CDM 2015 and have embedded compliance throughout our proposal',
      'CDM 2015 compliance is integral to our health and safety management approach'
    ],
    dutyHolders: [
      'The following duty holders have been identified and assigned for this project:',
      'We have clearly defined all CDM 2015 duty holder roles and responsibilities',
      'All duty holders are competent persons with relevant qualifications and experience'
    ],
    preConstruction: [
      'We will review all pre-construction information and use it to inform our design and planning decisions',
      'Our information management system ensures all relevant pre-construction information is captured and distributed',
      'We will identify any information gaps and work proactively to obtain missing information'
    ],
    constructionPhase: [
      'A comprehensive construction phase plan will be developed before work commences',
      'The construction phase plan will be reviewed and updated as the project progresses',
      'All workers will be provided with site-specific inductions based on the construction phase plan'
    ],
    healthAndSafetyFile: [
      'We will maintain a comprehensive health and safety file throughout the project lifecycle',
      'The health and safety file will be handed over to the client on project completion',
      'The health and safety file will contain all information necessary for future work, maintenance, and demolition'
    ]
  }
};

export default CDM2015;
