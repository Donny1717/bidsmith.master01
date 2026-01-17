/**
 * UK Construction Law & Regulations Knowledge Base
 * Essential legal requirements for UK construction tenders
 */

export const UKConstructionLaw = {
    description: 'UK Construction Law and Regulatory Requirements',

    // Key Legislation
    legislation: {
        buildingRegulations: {
            name: 'Building Regulations 2010 (as amended)',
            description: 'Building work in England and Wales must comply with Building Regulations which set standards for design and construction',
            application: 'Applies to England and Wales (separate regulations for Scotland and Northern Ireland)',

            // Key Parts that must be addressed in proposals
            keyParts: {
                partA: {
                    name: 'Part A - Structure',
                    regulation: 'Building Regulations Part A',
                    description: 'Structural safety and stability requirements',
                    requirements: [
                        'Buildings and structures must be designed and constructed to withstand safely all loads liable to act on them',
                        'Structural elements must have adequate strength, stability and rigidity',
                        'Foundation design and ground conditions',
                        'Resistance to lateral and vertical loads',
                        'Structural fire resistance',
                        'Stability of existing buildings during alterations'
                    ],
                    proposalRequirements: [
                        'Demonstrate structural design expertise and qualifications',
                        'Show structural engineer appointment and qualifications',
                        'Detail structural design approach and calculations',
                        'Explain foundation design and ground investigation',
                        'Show compliance verification with structural requirements',
                        'Detail structural monitoring and inspections',
                        'Demonstrate understanding of structural fire resistance requirements'
                    ],
                    mandatoryStatements: [
                        'Structural design complies with Building Regulations Part A',
                        'Structural calculations are prepared by qualified structural engineers',
                        'Structural elements are designed to safely withstand all anticipated loads',
                        'Structural work is inspected and verified by competent persons'
                    ]
                },
                partB: {
                    name: 'Part B - Fire Safety',
                    regulation: 'Building Regulations Part B',
                    description: 'Fire safety in buildings including means of escape, fire resistance, and fire detection',
                    requirements: [
                        'Means of escape in case of fire',
                        'Internal fire spread (linings and structure)',
                        'External fire spread (walls and roofs)',
                        'Access and facilities for fire service',
                        'Fire detection and alarm systems',
                        'Emergency lighting',
                        'Fire resistance of structural elements',
                        'Compartmentation and fire stopping'
                    ],
                    proposalRequirements: [
                        'Demonstrate fire safety design expertise',
                        'Show fire engineer appointment (where required)',
                        'Detail fire safety strategy and approach',
                        'Explain means of escape design',
                        'Show fire resistance and compartmentation measures',
                        'Detail fire detection and alarm systems',
                        'Demonstrate coordination with fire service',
                        'Show fire safety inspections and testing'
                    ],
                    mandatoryStatements: [
                        'Fire safety design complies with Building Regulations Part B',
                        'Adequate means of escape are provided in case of fire',
                        'Fire resistance requirements are met for structural elements',
                        'Fire detection and alarm systems are installed where required',
                        'Fire safety work is inspected and verified by competent persons'
                    ]
                },
                partC: {
                    name: 'Part C - Site Preparation and Resistance to Contaminants and Moisture',
                    regulation: 'Building Regulations Part C',
                    description: 'Resistance to ground contaminants, moisture and weather',
                    requirements: [
                        'Resistance to moisture from ground',
                        'Resistance to weather (rain, snow)',
                        'Resistance to contaminants and gases from ground',
                        'Site investigation and ground conditions',
                        'Damp proofing and waterproofing',
                        'Drainage and surface water management',
                        'Ventilation to prevent condensation'
                    ],
                    proposalRequirements: [
                        'Show site investigation and ground assessment',
                        'Detail damp proofing and waterproofing measures',
                        'Explain resistance to ground contaminants',
                        'Demonstrate weather resistance measures',
                        'Show drainage design and surface water management',
                        'Detail inspection and testing of waterproofing systems'
                    ],
                    mandatoryStatements: [
                        'Site preparation and construction comply with Building Regulations Part C',
                        'Adequate resistance to moisture from ground and weather is provided',
                        'Site investigation identifies and addresses ground contaminants',
                        'Damp proofing and waterproofing systems are installed and tested'
                    ]
                },
                partD: {
                    name: 'Part D - Toxic Substances',
                    regulation: 'Building Regulations Part D',
                    description: 'Prevention of toxic substances from cavity insulation',
                    requirements: [
                        'Cavity wall insulation must not give off toxic fumes',
                        'Installation in accordance with manufacturer instructions',
                        'Use of approved materials and products',
                        'Protection against toxic substances'
                    ],
                    proposalRequirements: [
                        'Demonstrate use of approved cavity insulation materials',
                        'Show compliance with manufacturer instructions',
                        'Detail installation procedures and controls',
                        'Explain protection against toxic substances'
                    ],
                    mandatoryStatements: [
                        'Cavity insulation complies with Building Regulations Part D',
                        'Only approved materials that do not emit toxic fumes are used',
                        'Installation follows manufacturer instructions and best practice'
                    ]
                },
                partE: {
                    name: 'Part E - Resistance to Sound',
                    regulation: 'Building Regulations Part E',
                    description: 'Sound insulation between dwellings and within dwellings',
                    requirements: [
                        'Airborne sound insulation between dwellings',
                        'Impact sound insulation between dwellings',
                        'Sound insulation within dwellings (walls and floors)',
                        'Sound insulation testing and verification',
                        'Acoustic design considerations'
                    ],
                    proposalRequirements: [
                        'Demonstrate acoustic design expertise',
                        'Show sound insulation performance targets',
                        'Detail construction methods to achieve sound insulation',
                        'Explain sound insulation testing arrangements',
                        'Show compliance verification with Part E requirements'
                    ],
                    mandatoryStatements: [
                        'Sound insulation design complies with Building Regulations Part E',
                        'Construction methods achieve required sound insulation performance',
                        'Sound insulation testing is carried out to verify compliance'
                    ]
                },
                partF: {
                    name: 'Part F - Ventilation',
                    regulation: 'Building Regulations Part F',
                    description: 'Ventilation requirements for health and to prevent condensation',
                    requirements: [
                        'Adequate ventilation for health (indoor air quality)',
                        'Ventilation to prevent condensation',
                        'Mechanical ventilation systems (where installed)',
                        'Natural ventilation provision',
                        'Extract ventilation in kitchens and bathrooms',
                        'Airflow rates and ventilation calculations'
                    ],
                    proposalRequirements: [
                        'Demonstrate ventilation design expertise',
                        'Show ventilation strategy and calculations',
                        'Detail mechanical ventilation systems (where required)',
                        'Explain natural ventilation provision',
                        'Show extract ventilation in wet areas',
                        'Detail ventilation system testing and commissioning'
                    ],
                    mandatoryStatements: [
                        'Ventilation design complies with Building Regulations Part F',
                        'Adequate ventilation is provided for health and to prevent condensation',
                        'Extract ventilation is provided in kitchens and bathrooms',
                        'Ventilation systems are tested and commissioned'
                    ]
                },
                partG: {
                    name: 'Part G - Sanitation, Hot Water Safety and Water Efficiency',
                    regulation: 'Building Regulations Part G',
                    description: 'Sanitary facilities, hot water safety and water efficiency',
                    requirements: [
                        'Adequate sanitary facilities',
                        'Hot water supply and safety (prevention of scalding)',
                        'Water efficiency requirements',
                        'Cold water supply',
                        'Bathroom and kitchen facilities',
                        'Water system design and testing'
                    ],
                    proposalRequirements: [
                        'Detail sanitary facility provision',
                        'Show hot water system design and safety measures',
                        'Demonstrate water efficiency measures',
                        'Explain cold water supply arrangements',
                        'Detail water system testing and commissioning'
                    ],
                    mandatoryStatements: [
                        'Sanitation and water systems comply with Building Regulations Part G',
                        'Adequate sanitary facilities are provided',
                        'Hot water systems prevent scalding risks',
                        'Water efficiency requirements are met'
                    ]
                },
                partH: {
                    name: 'Part H - Drainage and Waste Disposal',
                    regulation: 'Building Regulations Part H',
                    description: 'Drainage systems and waste disposal',
                    requirements: [
                        'Foul water drainage',
                        'Surface water drainage',
                        'Cesspools and septic tanks',
                        'Waste disposal facilities',
                        'Drainage design and capacity',
                        'Drainage testing and commissioning'
                    ],
                    proposalRequirements: [
                        'Demonstrate drainage design expertise',
                        'Show foul water and surface water drainage design',
                        'Detail drainage capacity calculations',
                        'Explain waste disposal arrangements',
                        'Show drainage testing and commissioning',
                        'Detail coordination with utility providers'
                    ],
                    mandatoryStatements: [
                        'Drainage design complies with Building Regulations Part H',
                        'Adequate foul water and surface water drainage is provided',
                        'Drainage systems are tested and commissioned',
                        'Waste disposal facilities comply with requirements'
                    ]
                },
                partJ: {
                    name: 'Part J - Combustion Appliances and Fuel Storage Systems',
                    regulation: 'Building Regulations Part J',
                    description: 'Safety of combustion appliances and fuel storage',
                    requirements: [
                        'Safe installation of combustion appliances',
                        'Flue and chimney requirements',
                        'Air supply for combustion',
                        'Protection of building from heat and fire',
                        'Fuel storage safety',
                        'Carbon monoxide protection'
                    ],
                    proposalRequirements: [
                        'Demonstrate expertise in combustion appliance installation',
                        'Show flue and chimney design',
                        'Detail air supply arrangements',
                        'Explain fire protection measures',
                        'Show fuel storage arrangements',
                        'Detail carbon monoxide protection'
                    ],
                    mandatoryStatements: [
                        'Combustion appliances comply with Building Regulations Part J',
                        'Flues and chimneys are designed and installed safely',
                        'Adequate air supply is provided for combustion',
                        'Protection against carbon monoxide is provided'
                    ]
                },
                partK: {
                    name: 'Part K - Protection from Falling, Collision and Impact',
                    regulation: 'Building Regulations Part K',
                    description: 'Stairways, ramps, guards, and protection from falling',
                    requirements: [
                        'Stair design (rise, going, handrails)',
                        'Ramp design and handrails',
                        'Guards and barriers to prevent falling',
                        'Protection from impact (glazing)',
                        'Safe access and egress',
                        'Window and door safety'
                    ],
                    proposalRequirements: [
                        'Demonstrate understanding of stair and ramp design requirements',
                        'Show guard and barrier design',
                        'Detail glazing and impact protection',
                        'Explain access and egress arrangements',
                        'Show compliance with dimensional requirements'
                    ],
                    mandatoryStatements: [
                        'Stairs, ramps and guards comply with Building Regulations Part K',
                        'Adequate protection is provided against falling, collision and impact',
                        'Glazing meets impact resistance requirements'
                    ]
                },
                partL: {
                    name: 'Part L - Conservation of Fuel and Power',
                    regulation: 'Building Regulations Part L',
                    description: 'Energy efficiency and carbon emissions reduction',
                    requirements: [
                        'Thermal insulation (walls, roofs, floors)',
                        'Heating system efficiency',
                        'Building fabric performance',
                        'Energy performance calculations (SAP/SBEM)',
                        'Air permeability and airtightness',
                        'Renewable energy provision (where required)',
                        'Energy efficiency targets'
                    ],
                    proposalRequirements: [
                        'Demonstrate energy efficiency design expertise',
                        'Show thermal insulation specifications',
                        'Detail heating system efficiency measures',
                        'Explain energy performance calculations',
                        'Show airtightness and air permeability measures',
                        'Detail renewable energy systems (where applicable)',
                        'Demonstrate compliance with energy efficiency targets'
                    ],
                    mandatoryStatements: [
                        'Building design complies with Building Regulations Part L',
                        'Thermal insulation meets or exceeds minimum requirements',
                        'Heating systems are efficient and properly commissioned',
                        'Energy performance targets are achieved'
                    ]
                },
                partM: {
                    name: 'Part M - Access to and Use of Buildings',
                    regulation: 'Building Regulations Part M',
                    description: 'Accessibility and provision for people with disabilities',
                    requirements: [
                        'Accessible entrances and approaches',
                        'Internal circulation (corridors, doorways)',
                        'Accessible sanitary facilities',
                        'Wheelchair accessibility',
                        'Visual and tactile information',
                        'Lift access (where required)',
                        'Accessible parking'
                    ],
                    proposalRequirements: [
                        'Demonstrate accessibility design expertise',
                        'Show accessible entrance and approach design',
                        'Detail internal accessibility arrangements',
                        'Explain accessible sanitary facility provision',
                        'Show lift installation and accessibility (where required)',
                        'Detail compliance with Part M requirements'
                    ],
                    mandatoryStatements: [
                        'Building design complies with Building Regulations Part M',
                        'Accessible entrances and approaches are provided',
                        'Internal circulation is accessible to people with disabilities',
                        'Accessible sanitary facilities are provided where required'
                    ]
                },
                partP: {
                    name: 'Part P - Electrical Safety',
                    regulation: 'Building Regulations Part P',
                    description: 'Electrical safety in dwellings',
                    requirements: [
                        'Electrical installation safety',
                        'Competent electrical installers',
                        'Electrical testing and certification',
                        'Notification to Building Control',
                        'Compliance with BS 7671 (IET Wiring Regulations)',
                        'Electrical installation certificates'
                    ],
                    proposalRequirements: [
                        'Demonstrate electrical installation expertise',
                        'Show qualified electricians and competence',
                        'Detail electrical testing and certification procedures',
                        'Explain Building Control notification process',
                        'Show compliance with BS 7671',
                        'Detail electrical installation certification'
                    ],
                    mandatoryStatements: [
                        'Electrical installations comply with Building Regulations Part P',
                        'All electrical work is carried out by competent, qualified electricians',
                        'Electrical installations are tested and certified',
                        'Building Control is notified where required'
                    ]
                },
                partQ: {
                    name: 'Part Q - Security',
                    regulation: 'Building Regulations Part Q',
                    description: 'Security in dwellings (resistance to unauthorised access)',
                    requirements: [
                        'Doorset security (external doors)',
                        'Window security',
                        'Secure by design principles',
                        'Product security standards (PAS 24, etc.)',
                        'Locks and security hardware'
                    ],
                    proposalRequirements: [
                        'Demonstrate security design expertise',
                        'Show doorset and window security specifications',
                        'Detail compliance with security standards',
                        'Explain secure by design approach',
                        'Show product certifications and standards'
                    ],
                    mandatoryStatements: [
                        'Building security complies with Building Regulations Part Q',
                        'External doors and windows meet security requirements',
                        'Security products meet relevant standards (e.g., PAS 24)'
                    ]
                }
            },

            // Building Control
            buildingControl: {
                description: 'Building work must be approved by Building Control',
                requirements: [
                    'Building Notice or Full Plans application',
                    'Building Control inspections at key stages',
                    'Completion certificates',
                    'Regular site inspections',
                    'Coordination with Building Control',
                    'Notice of commencement and completion'
                ],
                proposalRequirements: [
                    'Demonstrate Building Control coordination process',
                    'Show application submission procedures',
                    'Detail inspection arrangements and notification',
                    'Explain how compliance is verified',
                    'Show completion certificate process'
                ]
            },

            // General proposal requirements
            proposalRequirements: [
                'Explicitly state compliance with Building Regulations 2010',
                'Demonstrate understanding of relevant Parts (A, B, C, D, E, F, G, H, J, K, L, M, P, Q)',
                'Show Building Control coordination and application process',
                'Detail compliance verification and inspection arrangements',
                'Include qualified persons for each relevant Part',
                'Show how compliance is achieved and verified',
                'Detail completion certification process',
                'Demonstrate integration with construction process'
            ],

            // Key phrases for proposals
            keyPhrases: [
                'Compliant with Building Regulations 2010',
                'Building Control approved',
                'Compliance with Part [A/B/C/etc.] of Building Regulations',
                'Qualified [engineer/designer] for Building Regulations',
                'Building Control inspections arranged and attended',
                'Completion certificates obtained',
                'All relevant Parts of Building Regulations addressed'
            ]
        },
        healthAndSafetyAtWork: {
            name: 'Health and Safety at Work etc. Act 1974',
            abbreviation: 'HSWA 1974',
            act: 'Health and Safety at Work etc. Act 1974',

            // Section 2: Employer duties to employees
            section2: {
                title: 'Section 2 - General duties of employers to their employees',
                description: 'It shall be the duty of every employer to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all his employees',
                duties: [
                    {
                        duty: 'Provide and maintain safe systems of work',
                        section: 'Section 2(2)(a)',
                        critical: true,
                        description: 'Employers must provide and maintain plant and systems of work that are, so far as is reasonably practicable, safe and without risks to health',
                        proposalRequirements: [
                            'Demonstrate safe system of work development and implementation',
                            'Show process for identifying, evaluating and controlling workplace hazards',
                            'Detail how safe systems of work are documented and communicated',
                            'Explain how systems are reviewed and updated',
                            'Provide examples of safe systems of work in practice'
                        ],
                        mandatoryStatements: [
                            'We will provide and maintain safe systems of work for all employees (Section 2(2)(a))',
                            'Our safe systems of work are developed through risk assessment and consultation',
                            'All employees will be trained in safe systems of work relevant to their role'
                        ]
                    },
                    {
                        duty: 'Provide safe plant and substances',
                        section: 'Section 2(2)(b)',
                        critical: true,
                        description: 'Employers must make arrangements for ensuring, so far as is reasonably practicable, safety and absence of risks to health in connection with the use, handling, storage and transport of articles and substances',
                        proposalRequirements: [
                            'Show plant and equipment selection and maintenance procedures',
                            'Demonstrate substance handling and storage arrangements',
                            'Detail equipment inspection and maintenance schedules',
                            'Explain hazardous substance management (COSHH compliance)',
                            'Provide evidence of competent plant operators'
                        ],
                        mandatoryStatements: [
                            'We will ensure all plant and equipment is safe and suitable for use (Section 2(2)(b))',
                            'All substances are handled, stored and transported safely in accordance with COSHH',
                            'Regular inspections and maintenance ensure plant remains safe throughout its use'
                        ]
                    },
                    {
                        duty: 'Provide information, instruction, training and supervision',
                        section: 'Section 2(2)(c)',
                        critical: true,
                        description: 'Employers must provide such information, instruction, training and supervision as is necessary to ensure, so far as is reasonably practicable, the health and safety at work of employees',
                        proposalRequirements: [
                            'Detail information, instruction, training and supervision arrangements',
                            'Show training needs analysis and competency frameworks',
                            'Demonstrate supervision structures and ratios',
                            'Explain ongoing training and refresher programs',
                            'Provide evidence of qualified trainers and supervisors'
                        ],
                        mandatoryStatements: [
                            'We will provide adequate information, instruction, training and supervision to all employees (Section 2(2)(c))',
                            'All employees receive job-specific training before starting work',
                            'Ongoing supervision ensures continued safe working practices',
                            'Information about workplace risks is communicated clearly to all employees'
                        ]
                    },
                    {
                        duty: 'Provide safe workplace with safe access and egress',
                        section: 'Section 2(2)(d)',
                        critical: true,
                        description: 'Employers must maintain any place of work under their control in a condition that is safe and without risks to health',
                        proposalRequirements: [
                            'Demonstrate workplace inspection and maintenance procedures',
                            'Show safe access and egress arrangements',
                            'Detail emergency evacuation procedures and routes',
                            'Explain workplace housekeeping standards',
                            'Provide site layout and access control measures'
                        ],
                        mandatoryStatements: [
                            'We will maintain safe workplaces with safe access and egress (Section 2(2)(d))',
                            'Regular workplace inspections ensure hazards are identified and controlled',
                            'Safe access and egress routes are clearly marked and maintained',
                            'Emergency evacuation routes are planned, tested and communicated to all employees'
                        ]
                    },
                    {
                        duty: 'Provide safe working environment and welfare facilities',
                        section: 'Section 2(2)(e)',
                        critical: true,
                        description: 'Employers must provide and maintain a working environment for employees that is safe, without risks to health, and adequate as regards facilities and arrangements for their welfare at work',
                        proposalRequirements: [
                            'Detail welfare facility provisions (toilets, washing, rest facilities)',
                            'Show environmental controls (temperature, ventilation, lighting)',
                            'Demonstrate first aid arrangements and facilities',
                            'Explain arrangements for protecting employees from workplace hazards',
                            'Provide welfare facility maintenance and cleaning procedures'
                        ],
                        mandatoryStatements: [
                            'We will provide and maintain a safe working environment with adequate welfare facilities (Section 2(2)(e))',
                            'Welfare facilities comply with Workplace (Health, Safety and Welfare) Regulations 1992',
                            'Environmental conditions (temperature, ventilation, lighting) are maintained within acceptable limits',
                            'Adequate first aid facilities and trained first aiders are provided'
                        ]
                    },
                    {
                        duty: 'Consultation with employees',
                        section: 'Section 2(6)',
                        critical: true,
                        description: 'Employers must consult with safety representatives or employees about health and safety matters',
                        proposalRequirements: [
                            'Show employee consultation arrangements',
                            'Detail safety representative arrangements (if applicable)',
                            'Demonstrate consultation on health and safety policies and procedures',
                            'Explain how employee concerns are addressed',
                            'Provide examples of consultation in practice'
                        ],
                        mandatoryStatements: [
                            'We will consult with employees on health and safety matters (Section 2(6))',
                            'Employee consultation is integral to our health and safety management approach',
                            'Safety representatives are consulted on significant health and safety matters',
                            'Employee suggestions and concerns about health and safety are actively sought and addressed'
                        ]
                    }
                ],
                proposalRequirements: [
                    'Explicitly state compliance with HSWA 1974 Section 2',
                    'Identify our role as employer (Principal Contractor, Contractor, etc.)',
                    'Demonstrate understanding of all Section 2 duties',
                    'Outline how we will fulfill each Section 2 requirement',
                    'Reference specific section numbers (e.g., "In accordance with Section 2(2)(a)...")'
                ]
            },

            // Section 3: Duties to non-employees
            section3: {
                title: 'Section 3 - General duties of employers and self-employed to persons other than their employees',
                description: 'It shall be the duty of every employer and self-employed person to conduct their undertaking in such a way as to ensure, so far as is reasonably practicable, that persons not in their employment are not exposed to risks to their health or safety',
                duties: [
                    {
                        duty: 'Ensure work does not endanger public',
                        section: 'Section 3(1)',
                        critical: true,
                        description: 'Employers and self-employed persons must conduct their undertaking so that persons not in their employment (including members of the public) are not exposed to risks to their health or safety',
                        proposalRequirements: [
                            'Demonstrate public safety measures',
                            'Show site security and access control',
                            'Detail public protection measures (barriers, hoardings, signage)',
                            'Explain traffic and pedestrian management',
                            'Provide emergency procedures affecting public'
                        ],
                        mandatoryStatements: [
                            'We will conduct our work so as not to endanger the public (Section 3(1))',
                            'Site security and access control prevent unauthorised public access',
                            'Public areas adjacent to our work are protected by appropriate barriers and signage',
                            'Traffic and pedestrian management protects public from construction activities'
                        ]
                    },
                    {
                        duty: 'Provide information about risks',
                        section: 'Section 3(2)',
                        critical: true,
                        description: 'Where work may affect others, provide information about risks and how they are controlled',
                        proposalRequirements: [
                            'Show process for identifying persons who may be affected by work',
                            'Detail information sharing with neighbours and public',
                            'Demonstrate pre-work communication and consultation',
                            'Explain ongoing communication during work',
                            'Provide examples of public information and consultation'
                        ],
                        mandatoryStatements: [
                            'We will provide information about risks to persons who may be affected by our work (Section 3(2))',
                            'Neighbours and members of the public are informed about work activities and associated risks',
                            'Information about risks and control measures is communicated before work commences',
                            'Ongoing communication ensures affected parties are kept informed'
                        ]
                    }
                ],
                proposalRequirements: [
                    'Explicitly state compliance with HSWA 1974 Section 3',
                    'Demonstrate understanding of duties to non-employees',
                    'Detail public protection measures',
                    'Show information sharing arrangements with neighbours and public',
                    'Reference Section 3(1) and Section 3(2) in proposal'
                ]
            },

            // Section 7-8: Employee duties
            section7_8: {
                title: 'Sections 7-8 - General duties of employees',
                description: 'Employees have duties to take reasonable care and cooperate with employers',
                duties: [
                    {
                        duty: 'Take reasonable care for health and safety',
                        section: 'Section 7(a)',
                        critical: true,
                        description: 'It shall be the duty of every employee while at work to take reasonable care for the health and safety of themselves and of other persons who may be affected by their acts or omissions at work',
                        proposalRequirements: [
                            'Demonstrate how employee duties are communicated',
                            'Show training on employee responsibilities',
                            'Detail expectations for employee behaviour',
                            'Explain disciplinary procedures for non-compliance',
                            'Provide evidence of employee awareness of duties'
                        ],
                        mandatoryStatements: [
                            'All employees are informed of their duty to take reasonable care for health and safety (Section 7(a))',
                            'Employee responsibilities are communicated through inductions and training',
                            'We expect all employees to take reasonable care for their own safety and that of others'
                        ]
                    },
                    {
                        duty: 'Cooperation with employer',
                        section: 'Section 7(b)',
                        critical: true,
                        description: 'Employees must cooperate with their employer or any other person in connection with the employer\'s duties under health and safety legislation',
                        proposalRequirements: [
                            'Show how cooperation is expected and achieved',
                            'Detail employee participation in health and safety',
                            'Demonstrate consultation and involvement mechanisms',
                            'Explain how employee cooperation is encouraged',
                            'Provide examples of successful cooperation'
                        ],
                        mandatoryStatements: [
                            'We expect all employees to cooperate with health and safety requirements (Section 7(b))',
                            'Employee cooperation is essential to our health and safety management',
                            'We actively encourage and facilitate employee participation in health and safety'
                        ]
                    },
                    {
                        duty: 'Not interfere with or misuse safety measures',
                        section: 'Section 8',
                        critical: true,
                        description: 'No person shall intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety or welfare',
                        proposalRequirements: [
                            'Show policies on interference with safety measures',
                            'Detail consequences for misuse of safety equipment',
                            'Demonstrate monitoring and enforcement',
                            'Explain equipment maintenance and replacement procedures',
                            'Provide evidence of equipment inspection and control'
                        ],
                        mandatoryStatements: [
                            'All persons are informed that interference with safety measures is prohibited (Section 8)',
                            'Safety equipment and measures are protected from misuse or interference',
                            'Disciplinary action will be taken against anyone who interferes with or misuses safety equipment'
                        ]
                    }
                ],
                proposalRequirements: [
                    'Demonstrate how employee duties (Sections 7-8) are communicated',
                    'Show training on employee responsibilities',
                    'Detail expectations and consequences for non-compliance',
                    'Reference Section 7(a), Section 7(b), and Section 8 in training and policies'
                ]
            },

            // Proposal Integration Requirements - Must Include
            proposalIntegration: {
                healthAndSafetyPolicy: {
                    description: 'Health & Safety Policy that demonstrates HSWA 1974 compliance',
                    required: true,
                    elements: [
                        'Statement of general policy on health and safety',
                        'Organizational responsibilities and accountability',
                        'Arrangements for implementing the policy',
                        'How policy is communicated to all employees',
                        'Review and update procedures',
                        'Integration with HSWA 1974 Section 2 requirements',
                        'Demonstration of "so far as is reasonably practicable" approach'
                    ],
                    proposalRequirements: [
                        'Describe our Health & Safety Policy and its key elements',
                        'Show how policy addresses HSWA 1974 Section 2 duties',
                        'Demonstrate policy communication and implementation',
                        'Detail policy review and update procedures',
                        'Show integration with CDM 2015 and other regulations',
                        'Provide evidence of policy effectiveness'
                    ],
                    mandatoryStatements: [
                        'Our Health & Safety Policy demonstrates full compliance with HSWA 1974',
                        'The policy sets out our commitment to ensuring, so far as is reasonably practicable, the health, safety and welfare of all employees',
                        'All employees are aware of and have access to our Health & Safety Policy',
                        'The policy is reviewed regularly and updated as necessary'
                    ]
                },
                trainingPrograms: {
                    description: 'Training programs that fulfill HSWA 1974 Section 2(2)(c) requirements',
                    required: true,
                    elements: [
                        'Induction training for all employees',
                        'Job-specific health and safety training',
                        'Training needs analysis and competency frameworks',
                        'Refresher training and continuous development',
                        'Training on employee duties (Sections 7-8)',
                        'Training on safe systems of work',
                        'Training on use of plant and equipment',
                        'Training on handling hazardous substances (COSHH)',
                        'Training records and competency verification',
                        'Qualified trainers and training resources'
                    ],
                    proposalRequirements: [
                        'Outline our comprehensive training programs',
                        'Show how training fulfills Section 2(2)(c) - information, instruction, training and supervision',
                        'Detail training content relevant to HSWA 1974 duties',
                        'Demonstrate training delivery methods and frequency',
                        'Show training records and competency verification',
                        'Provide examples of training programs',
                        'Detail training on employee duties under Sections 7-8'
                    ],
                    mandatoryStatements: [
                        'We provide comprehensive training programs in accordance with HSWA 1974 Section 2(2)(c)',
                        'All employees receive appropriate information, instruction, training and supervision',
                        'Training programs cover safe systems of work, use of plant and equipment, and employee duties',
                        'Training needs are assessed and training is provided before work commences',
                        'Ongoing training and refresher programs ensure continued competence'
                    ]
                },
                supervisionStructure: {
                    description: 'Supervision structure that ensures HSWA 1974 compliance',
                    required: true,
                    elements: [
                        'Supervision hierarchy and reporting structure',
                        'Competent supervisors with relevant qualifications',
                        'Supervisor to worker ratios',
                        'Supervisor responsibilities for health and safety',
                        'Supervision monitoring and quality assurance',
                        'Communication between supervisors and management',
                        'Supervisor training and development',
                        'Delegation of responsibilities',
                        'Supervision in relation to Section 2(2)(c)',
                        'Supervisor authority and empowerment'
                    ],
                    proposalRequirements: [
                        'Explain our supervision structure and hierarchy',
                        'Show how supervision fulfills Section 2(2)(c) requirements',
                        'Detail supervisor qualifications and competence',
                        'Demonstrate supervisor to worker ratios',
                        'Show supervisor responsibilities and authority',
                        'Detail supervisor training and development',
                        'Explain how supervision ensures compliance with safe systems of work'
                    ],
                    mandatoryStatements: [
                        'We provide adequate supervision in accordance with HSWA 1974 Section 2(2)(c)',
                        'All supervisors are competent persons with relevant qualifications and experience',
                        'Our supervision structure ensures safe systems of work are followed',
                        'Supervisors are trained in their health and safety responsibilities',
                        'Supervision ratios are appropriate to the risks and complexity of work'
                    ]
                },
                riskManagementApproach: {
                    description: 'Risk management approach that demonstrates HSWA 1974 compliance',
                    required: true,
                    elements: [
                        'Risk identification and assessment processes',
                        'Risk evaluation and prioritization',
                        'Risk control measures (hierarchy of control)',
                        '"So far as is reasonably practicable" decision-making',
                        'Residual risk management',
                        'Risk monitoring and review',
                        'Risk communication to employees and others',
                        'Integration with Section 2 safe systems of work',
                        'Integration with Section 3 public protection',
                        'Documentation and record keeping'
                    ],
                    proposalRequirements: [
                        'Detail our comprehensive risk management approach',
                        'Show how risk management supports HSWA 1974 Section 2 and Section 3 compliance',
                        'Demonstrate "so far as is reasonably practicable" decision-making',
                        'Detail risk assessment processes and methodologies',
                        'Show hierarchy of risk control application',
                        'Explain risk communication to employees (Section 2) and public (Section 3)',
                        'Detail risk monitoring and review procedures',
                        'Provide examples of risk assessments'
                    ],
                    mandatoryStatements: [
                        'Our risk management approach ensures compliance with HSWA 1974 duties',
                        'All risks are identified, assessed and controlled so far as is reasonably practicable',
                        'Risk assessments inform safe systems of work under Section 2(2)(a)',
                        'Information about risks is communicated to employees and persons who may be affected',
                        'Risk management is ongoing throughout the project with regular review and update'
                    ]
                }
            },

            // General HSWA proposal requirements
            proposalRequirements: [
                'Explicitly state compliance with Health and Safety at Work etc. Act 1974',
                'Identify our role (employer, self-employed, Principal Contractor, Contractor, etc.)',
                'Demonstrate understanding of all applicable HSWA duties',
                'Outline how we will fulfill each requirement',
                'Reference specific section numbers (e.g., "In accordance with Section 2(2)(a)...")',
                'Must reference HSWA 1974',
                'Describe our Health & Safety Policy',
                'Outline training programs',
                'Explain supervision structure',
                'Detail risk management approach',
                'Show integration with CDM 2015 requirements',
                'Provide evidence of health and safety management systems',
                'Demonstrate qualified health and safety advisors and competent persons',
                'Show consultation arrangements with employees',
                'Detail public protection measures'
            ],

            // Key phrases for proposals
            keyPhrases: [
                'Compliant with Health and Safety at Work etc. Act 1974',
                'In accordance with Section 2 - General duties of employers to employees',
                'In accordance with Section 3 - Duties to persons other than employees',
                'Safe systems of work in accordance with Section 2(2)(a)',
                'Information, instruction, training and supervision as required by Section 2(2)(c)',
                'Safe working environment and welfare facilities under Section 2(2)(e)',
                'Public protection measures in accordance with Section 3',
                'Employee cooperation and responsibilities under Sections 7-8',
                'So far as is reasonably practicable',
                'Health, safety and welfare of all employees'
            ]
        },
        constructionRegulations: {
            name: 'Construction (Design and Management) Regulations 2015',
            reference: 'See CDM 2015 knowledge base',
            proposalRequirements: [
                'Full compliance with CDM 2015 requirements',
                'Integration with other construction regulations'
            ]
        },
        environmentalRegulations: {
            name: 'Environmental Permitting Regulations 2016',
            keyRequirements: [
                'Waste management permits',
                'Environmental impact assessment',
                'Pollution prevention and control',
                'Contaminated land management',
                'Water discharge consents',
                'Air quality management'
            ],
            proposalRequirements: [
                'Environmental management systems (ISO 14001)',
                'Waste management plans',
                'Pollution prevention measures',
                'Environmental monitoring and reporting'
            ]
        }
    },

    // Planning Requirements (London-specific)
    planningRequirements: {
        londonPlan: {
            description: 'The London Plan - Spatial Development Strategy',
            keyConsiderations: [
                'Housing delivery targets',
                'Affordable housing requirements',
                'Sustainable design standards',
                'Climate change adaptation',
                'Public realm and open space',
                'Transport and accessibility',
                'Heritage and conservation',
                'Air quality improvements',
                'Green infrastructure',
                'Community facilities'
            ],
            proposalRequirements: [
                'Demonstrate alignment with London Plan policies',
                'Show sustainable design credentials',
                'Detail community engagement approach',
                'Include environmental sustainability measures'
            ]
        },
        boroughRequirements: {
            description: 'London Borough specific planning requirements',
            commonElements: [
                'Local plan policies',
                'Conservation area considerations',
                'Listed building constraints',
                'Parking and transport requirements',
                'Community infrastructure levy (CIL)',
                'Section 106 agreements'
            ],
            proposalRequirements: [
                'Demonstrate knowledge of local planning context',
                'Show engagement with planning authorities',
                'Detail mitigation measures for planning impacts'
            ]
        }
    },

    // Contracts and Procurement
    procurement: {
        jctContracts: {
            description: 'Joint Contracts Tribunal standard forms',
            commonForms: ['JCT Design and Build', 'JCT Standard Building Contract', 'JCT Minor Works'],
            proposalRequirements: [
                'Familiarity with relevant JCT contract forms',
                'Risk allocation understanding',
                'Payment mechanisms',
                'Dispute resolution procedures'
            ]
        },
        necContracts: {
            description: 'NEC (New Engineering Contract) suite',
            commonForms: ['NEC4 ECC', 'NEC4 PSC', 'NEC4 Term Service Contract'],
            proposalRequirements: [
                'Understanding of NEC collaborative principles',
                'Early warning and risk reduction',
                'Project manager and supervisor roles',
                'Compensation events'
            ]
        }
    },

    // Quality and Standards
    standards: {
        iso9001: {
            description: 'Quality Management Systems',
            requirement: 'Demonstrate quality management processes',
            proposalInclusion: 'ISO 9001 certification and quality management approach'
        },
        iso14001: {
            description: 'Environmental Management Systems',
            requirement: 'Demonstrate environmental management',
            proposalInclusion: 'ISO 14001 certification and environmental management approach'
        },
        iso45001: {
            description: 'Occupational Health and Safety Management',
            requirement: 'Demonstrate OH&S management',
            proposalInclusion: 'ISO 45001 certification and OH&S management approach'
        },
        pas91: {
            description: 'Pre-qualification questionnaire standard',
            requirement: 'Complete PAS 91 compliant PQQ',
            proposalInclusion: 'PAS 91 compliance and standardized responses'
        }
    },

    // Insurance Requirements
    insurance: {
        requiredCover: [
            'Public Liability Insurance (minimum £5-10M)',
            'Employers Liability Insurance (minimum £5M)',
            'Professional Indemnity Insurance (design works)',
            'Contract Works Insurance',
            'Latent Defects Insurance (for some projects)'
        ],
        proposalRequirements: [
            'Evidence of adequate insurance cover',
            'Insurance certificates',
            'Continuity of cover arrangements',
            'Named insurers and policy details'
        ]
    },

    // Key Compliance Elements for Proposals
    mandatoryElements: [
        'Health and safety policy and procedures',
        'Environmental policy and management systems',
        'Quality management systems',
        'Risk management procedures',
        'Insurance certificates',
        'Relevant certifications and accreditations',
        'Competency evidence for key personnel',
        'Financial standing evidence',
        'Technical capacity evidence',
        'References and case studies'
    ]
};

export default UKConstructionLaw;
