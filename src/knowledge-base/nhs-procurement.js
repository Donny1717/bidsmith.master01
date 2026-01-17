/**
 * NHS Procurement Standards Knowledge Base
 * Requirements specific to NHS tenders and procurement
 */

export const NHSProcurement = {
    description: 'NHS Procurement Standards and Requirements',

    // Procurement Frameworks
    frameworks: {
        constructionFramework: {
            name: 'NHS Shared Business Services (NHS SBS) Construction Framework',
            description: 'Framework for construction and refurbishment projects',
            requirements: [
                'Pre-qualification through framework application',
                'Compliance with framework terms and conditions',
                'Use of framework pricing mechanisms',
                'Reporting requirements'
            ]
        },
        estatesFramework: {
            name: 'NHS Estates and Facilities Management',
            description: 'Framework for estates and facilities related works',
            requirements: [
                'Estates-specific competencies',
                'Healthcare environment understanding',
                '24/7 operational requirements',
                'Clinical environment compliance'
            ]
        }
    },

    // Key NHS Procurement Principles
    procurementPrinciples: {
        valueForMoney: {
            description: 'Best value for public money',
            considerations: [
                'Whole-life costs, not just initial cost',
                'Quality and performance standards',
                'Social value contributions',
                'Sustainability benefits',
                'Innovation and efficiency'
            ],
            proposalRequirements: [
                'Demonstrate value for money analysis',
                'Show whole-life cost considerations',
                'Detail innovation and efficiency measures',
                'Include social value commitments'
            ]
        },
        equalityAndDiversity: {
            description: 'Equality Act 2010 compliance',
            requirements: [
                'Equality and diversity policies',
                'Workforce diversity commitments',
                'Equal opportunities in employment',
                'Accessible services and facilities',
                'Fair treatment of subcontractors'
            ],
            proposalRequirements: [
                'Equality and diversity policy',
                'Workforce diversity statistics',
                'Training and development programs',
                'Monitoring and reporting mechanisms'
            ]
        },
        socialValue: {
            description: 'Public Services (Social Value) Act 2012',
            act: 'Public Services (Social Value) Act 2012',
            scoring: 'Typically 10-20% of total marks',
            requirement: 'Public sector contracts must consider economic, social and environmental wellbeing',
            threePillars: {
                economic: {
                    name: 'Economic wellbeing',
                    requirements: [
                        'Local employment creation',
                        'Apprenticeships and training opportunities',
                        'Supporting SMEs in supply chain',
                        'Local material sourcing',
                        'Skills development and transfer',
                        'Economic regeneration'
                    ]
                },
                social: {
                    name: 'Social wellbeing',
                    requirements: [
                        'Community engagement and benefits',
                        'Equality and diversity',
                        'Health and wellbeing contributions',
                        'Supporting local charities and community groups',
                        'Access to training and employment for disadvantaged groups',
                        'Community infrastructure improvements'
                    ]
                },
                environmental: {
                    name: 'Environmental wellbeing',
                    requirements: [
                        'Environmental sustainability',
                        'Carbon reduction',
                        'Waste reduction and recycling',
                        'Biodiversity improvements',
                        'Air quality improvements',
                        'Sustainable transport'
                    ]
                }
            },
            requirements: [
                'Local employment and apprenticeships (specific numbers)',
                'Support for local businesses and SMEs',
                'SME engagement plan',
                'Community engagement and benefits',
                'Environmental improvements',
                'Health and wellbeing contributions',
                'Measurable outcomes and reporting'
            ],
            proposalRequirements: [
                'Social Value statement',
                'Apprenticeship commitments (specific numbers)',
                'Local labor and material sourcing %',
                'SME engagement plan',
                'Environmental initiatives',
                'Community benefit activities',
                'Social value commitments and metrics',
                'Measurable outcomes and reporting',
                'Demonstrate understanding that Social Value typically scores 10-20% of total marks'
            ],
            mandatoryStatements: [
                'We are committed to delivering significant social value in accordance with the Social Value Act 2012',
                'We will provide [X] apprenticeship opportunities',
                'We will source [X]% of labor locally',
                'We will engage with [X] local SMEs in our supply chain',
                'We will deliver measurable community and environmental benefits'
            ],
            exampleCommitments: [
                'Minimum 5 apprenticeships throughout project duration',
                '70% local labor sourcing within 30 miles',
                '30% of supply chain from local SMEs',
                'Community engagement events and educational visits',
                'Carbon reduction targets and environmental improvements',
                'Support for local charities and community groups'
            ]
        },
        transparency: {
            description: 'Transparency in procurement and contracting',
            requirements: [
                'Open book accounting (where required)',
                'Cost breakdowns and explanations',
                'Transparent pricing mechanisms',
                'Reporting and disclosure requirements'
            ],
            proposalRequirements: [
                'Willingness to provide detailed cost breakdowns',
                'Transparent pricing methodology',
                'Reporting mechanisms',
                'Open book accounting processes'
            ]
        }
    },

    // NHS Trust Requirements
    nhsTrustRequirements: {
        description: 'Core NHS Trust procurement and operational requirements',
        requirements: [
            'NHS Standard Contract terms compliance',
            'Data Security and Protection Toolkit (DSPT) compliance',
            'Care Quality Commission (CQC) awareness and compliance',
            'Infection Prevention and Control measures',
            'Patient safety paramount approach',
            'Business continuity planning',
            'Social Value Act 2012 compliance'
        ],
        proposalRequirements: [
            'Demonstrate understanding of NHS Standard Contract',
            'Show DSPT compliance and data security measures',
            'Demonstrate CQC awareness',
            'Detail infection prevention and control measures',
            'Show patient safety focus throughout',
            'Provide business continuity planning',
            'Demonstrate Social Value Act 2012 compliance'
        ]
    },

    // HTM (Health Technical Memoranda) Compliance
    htmCompliance: {
        description: 'Health Technical Memoranda - Technical standards for healthcare facilities',
        htm01_05: {
            name: 'HTM 01-05: Decontamination',
            description: 'Decontamination in primary care dental practices and other settings',
            requirements: [
                'Decontamination facility design and management',
                'Equipment and processes',
                'Quality management systems',
                'Training and competence'
            ],
            proposalRequirements: [
                'Demonstrate HTM 01-05 compliance expertise where applicable',
                'Show decontamination facility design knowledge',
                'Detail quality management approach'
            ]
        },
        htm02_01: {
            name: 'HTM 02-01: Medical gas pipeline systems',
            description: 'Medical gas pipeline systems design, installation and management',
            requirements: [
                'Medical gas pipeline system design',
                'Installation standards and procedures',
                'Testing and commissioning',
                'Maintenance and management',
                'Qualified medical gas engineers',
                'Documentation and certification'
            ],
            proposalRequirements: [
                'Reference HTM 02-01 compliance',
                'Demonstrate medical gas engineering expertise',
                'Show qualified personnel',
                'Detail testing and certification processes',
                'Explain maintenance and management approach'
            ],
            mandatoryStatements: [
                'Medical gas pipeline systems will comply with HTM 02-01',
                'Work will be carried out by qualified medical gas engineers',
                'All systems will be tested and certified in accordance with HTM 02-01'
            ]
        },
        htm03_01: {
            name: 'HTM 03-01: Heating and ventilation systems',
            description: 'Specialised ventilation for healthcare premises',
            requirements: [
                'Ventilation system design for healthcare',
                'Infection control through ventilation',
                'Pressurization and airflow control',
                'Testing and commissioning',
                'Maintenance and monitoring'
            ],
            proposalRequirements: [
                'Reference HTM 03-01 compliance',
                'Demonstrate healthcare ventilation expertise',
                'Show infection control through ventilation approach',
                'Detail testing and commissioning procedures'
            ],
            mandatoryStatements: [
                'Ventilation systems will comply with HTM 03-01',
                'Infection control requirements will be met through ventilation design',
                'All systems will be tested and commissioned in accordance with HTM 03-01'
            ]
        },
        htm04_01: {
            name: 'HTM 04-01: Water systems',
            description: 'Safe water in healthcare premises',
            requirements: [
                'Legionella risk management',
                'Water system design and maintenance',
                'Temperature control and monitoring',
                'Water quality management',
                'Testing and monitoring procedures'
            ],
            proposalRequirements: [
                'Reference HTM 04-01 compliance',
                'Demonstrate legionella risk management expertise',
                'Show water system design approach',
                'Detail testing and monitoring procedures'
            ],
            mandatoryStatements: [
                'Water systems will comply with HTM 04-01',
                'Legionella risk management will be implemented',
                'Water systems will be designed, maintained and monitored in accordance with HTM 04-01'
            ]
        },
        htm06_02: {
            name: 'HTM 06-02: Electrical services supply and distribution',
            description: 'Electrical safety in healthcare premises',
            requirements: [
                'Electrical system design for healthcare',
                'Emergency power systems',
                'Isolated power supplies for medical locations',
                'Testing and commissioning',
                'Maintenance and certification'
            ],
            proposalRequirements: [
                'Reference HTM 06-02 compliance (or HTM 06-01 where applicable)',
                'Demonstrate healthcare electrical engineering expertise',
                'Show emergency power system design',
                'Detail isolated power supply provisions where required'
            ],
            mandatoryStatements: [
                'Electrical services will comply with HTM 06-02 (or HTM 06-01)',
                'Emergency power systems will be provided where required',
                'All electrical work will be tested and certified'
            ]
        },
        htm07_02: {
            name: 'HTM 07-02: EnCO2de (Environment & Sustainability)',
            description: 'Environment and sustainability in healthcare',
            requirements: [
                'Carbon reduction and energy efficiency',
                'Sustainable design and construction',
                'Environmental management',
                'Waste reduction and recycling',
                'Sustainable procurement'
            ],
            proposalRequirements: [
                'Reference HTM 07-02 compliance',
                'Demonstrate environmental and sustainability expertise',
                'Show carbon reduction measures',
                'Detail sustainable design and construction approach'
            ]
        },
        htm08_01: {
            name: 'HTM 08-01: Acoustics',
            description: 'Acoustics in healthcare premises',
            requirements: [
                'Noise control and acoustic design',
                'Sound insulation requirements',
                'Acoustic performance standards',
                'Testing and verification'
            ],
            proposalRequirements: [
                'Reference HTM 08-01 compliance where applicable',
                'Demonstrate acoustic design expertise',
                'Show noise control measures',
                'Detail acoustic testing arrangements'
            ]
        }
    },

    // HBN (Health Building Notes) Standards
    hbnStandards: {
        description: 'Health Building Notes - Design guidance for healthcare buildings',
        requirements: [
            'HBN compliance for healthcare building design',
            'Clinical space planning standards',
            'Functional requirements and adjacencies',
            'Infection control in design',
            'Accessibility and wayfinding',
            'Future flexibility and adaptability'
        ],
        proposalRequirements: [
            'Demonstrate HBN compliance knowledge',
            'Show healthcare building design expertise',
            'Detail clinical space planning approach',
            'Explain functional requirements and adjacencies'
        ]
    },

    // Clinical Environment Requirements
    clinicalRequirements: {
        infectionControl: {
            description: 'Infection prevention and control in healthcare settings',
            requirements: [
                'HTM 00-01: Policies and Principles',
                'HTM 00-03: Water Safety',
                'HTM 00-09: Ventilation',
                'HTM 00-10: Decontamination',
                'Compliance with Health Technical Memoranda (HTMs)',
                'Infection control risk assessments (ICRA)',
                'Works in clinical areas protocols',
                'Dust and contamination control',
                'Barrier systems and containment'
            ],
            proposalRequirements: [
                'Infection control policies and procedures',
                'HTM compliance expertise - reference relevant HTMs',
                'Clinical area working protocols',
                'Infection control training for workers',
                'Risk assessments for clinical environments (ICRA)',
                'Infection control methodology',
                'Patient safety measures during construction'
            ]
        },
        infectionControlConstruction: {
            name: 'ICRA - Infection Control Risk Assessment for Construction',
            description: 'Infection control during construction in occupied healthcare facilities',
            requirements: [
                'ICRA process and documentation',
                'Construction containment strategies',
                'Dust and airborne particle control',
                'Water and moisture management',
                'Negative pressure containment where required',
                'Air filtration and monitoring',
                'Barrier systems and temporary construction',
                'Clean-up and disinfection procedures'
            ],
            proposalRequirements: [
                'Detail ICRA process and methodology',
                'Show infection control during construction approach',
                'Demonstrate containment strategies',
                'Explain dust and contamination control measures',
                'Detail patient safety measures during construction'
            ],
            mandatoryStatements: [
                'Infection Control Risk Assessment (ICRA) will be carried out before work commences',
                'Construction containment strategies will prevent cross-contamination',
                'Patient safety will be paramount during all construction activities'
            ]
        },
        patientSafety: {
            description: 'Patient safety during construction works',
            requirements: [
                'Minimal disruption to clinical services',
                'Dust and noise control',
                'Fire safety in operational buildings',
                'Emergency access maintenance',
                'Works in occupied buildings protocols',
                'Patient and staff communication'
            ],
            proposalRequirements: [
                'Detailed phasing and sequencing plans',
                'Dust and noise control measures',
                'Fire safety management',
                'Emergency procedures',
                'Communication and engagement strategies'
            ]
        },
        medicalGases: {
            description: 'Medical gas pipeline systems',
            requirements: [
                'HTM 02-01 compliance',
                'Qualified medical gas engineers',
                'Medical gas safety protocols',
                'Testing and certification requirements'
            ],
            proposalRequirements: [
                'Medical gas engineering expertise',
                'HTM 02-01 compliance',
                'Qualified personnel',
                'Testing and certification processes'
            ]
        },
        electricalSafety: {
            description: 'Electrical safety in healthcare premises',
            requirements: [
                'HTM 06-01 compliance',
                'Electrical safety in medical locations',
                'Emergency power systems',
                'Isolated power supplies where required',
                'Qualified electrical engineers'
            ],
            proposalRequirements: [
                'Healthcare electrical engineering expertise',
                'HTM 06-01 compliance',
                'Emergency power system experience',
                'Qualified electrical personnel'
            ]
        }
    },

    // NHS-Specific Documentation Requirements
    requiredDocumentation: [
        'NHS PQQ (Pre-Qualification Questionnaire)',
        'NHS Standard Selection Questionnaire (SSQ)',
        'Technical response addressing all requirements',
        'Commercial response with pricing',
        'Method statements',
        'Risk assessments and method statements (RAMS)',
        'Health and safety documentation',
        'Environmental documentation',
        'Quality assurance documentation',
        'Equalities and diversity documentation',
        'Social value commitments',
        'References from healthcare projects',
        'Clinical environment experience evidence',
        'HTM compliance evidence',
        'Insurance certificates',
        'Financial standing evidence',
        'Modern Slavery Statement'
    ],

    // Winning Strategies for NHS Tenders
    winningStrategies: [
        'Demonstrate prior NHS/healthcare construction experience',
        'Show understanding of clinical environment challenges',
        'Emphasize infection control expertise',
        'Highlight HTM compliance knowledge',
        'Provide strong social value commitments',
        'Show local employment and apprenticeship programs',
        'Demonstrate ability to work in occupied clinical environments',
        'Include detailed phasing plans for minimal disruption',
        'Show 24/7 support capabilities',
        'Demonstrate understanding of NHS values and priorities',
        'Include case studies from healthcare projects',
        'Show quality management systems',
        'Demonstrate patient and staff safety focus',
        'Include modern slavery statement and ethical procurement'
    ],

    // Key Phrases for NHS Proposals
    keyPhrases: [
        'Compliant with Health Technical Memoranda (HTMs)',
        'Infection prevention and control expertise',
        'Clinical environment experience',
        'Patient safety during construction works',
        'Minimal disruption to clinical services',
        'NHS values and priorities',
        'Social value commitments',
        'Local employment and apprenticeships',
        'Healthcare construction specialist',
        'Occupied building expertise',
        'Medical gas systems',
        'Healthcare electrical systems',
        'Emergency power systems',
        'Whole-life value for money'
    ],

    // Common NHS Tender Evaluation Criteria
    evaluationCriteria: {
        technical: {
            weight: '40-50%',
            elements: [
                'Understanding of requirements',
                'Technical approach and methodology',
                'Proposed team and competencies',
                'Program and phasing',
                'Quality management',
                'Risk management',
                'Innovation'
            ]
        },
        commercial: {
            weight: '30-40%',
            elements: [
                'Price/cost',
                'Value for money',
                'Payment terms',
                'Whole-life costs',
                'Cost breakdown'
            ]
        },
        socialValue: {
            weight: '10-20%',
            elements: [
                'Local employment',
                'Apprenticeships',
                'SME engagement',
                'Community benefits',
                'Environmental improvements'
            ]
        },
        quality: {
            weight: '10-20%',
            elements: [
                'Previous experience',
                'References',
                'Management systems',
                'Innovation',
                'Continuous improvement'
            ]
        }
    }
};

export default NHSProcurement;
