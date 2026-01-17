/**
 * London-Specific Requirements Knowledge Base
 * Requirements and considerations specific to London construction projects
 */

export const LondonRequirements = {
    description: 'London-specific construction and tender requirements',

    // London Plan (Spatial Development Strategy)
    londonPlan: {
        description: 'The London Plan - Spatial Development Strategy for London',
        policies: {
            goodGrowth: {
                name: 'Good Growth policies',
                requirements: [
                    'Sustainable development principles',
                    'Quality place-making',
                    'Mixed-use development',
                    'Community benefits and engagement',
                    'Well-designed, healthy buildings'
                ],
                proposalRequirements: [
                    'Demonstrate alignment with Good Growth principles',
                    'Show quality design approach',
                    'Detail community benefits',
                    'Explain sustainable development approach'
                ]
            },
            designQuality: {
                name: 'Design quality standards',
                requirements: [
                    'High-quality design standards',
                    'Design review processes',
                    'Place-making excellence',
                    'Contextual design',
                    'Sustainability in design'
                ],
                proposalRequirements: [
                    'Demonstrate design quality credentials',
                    'Show design review processes',
                    'Detail design team qualifications',
                    'Explain design approach and methodology'
                ]
            },
            accessibleInclusive: {
                name: 'Accessible and Inclusive London',
                requirements: [
                    'Universal design principles',
                    'Accessibility for all',
                    'Inclusive design approach',
                    'Part M compliance and beyond',
                    'Social inclusion considerations'
                ],
                proposalRequirements: [
                    'Demonstrate inclusive design approach',
                    'Show accessibility provisions beyond minimum standards',
                    'Detail universal design principles',
                    'Explain social inclusion measures'
                ]
            },
            heritageCulture: {
                name: 'Heritage and Culture',
                requirements: [
                    'Heritage asset protection',
                    'Cultural significance recognition',
                    'Conservation area considerations',
                    'Listed building sensitivity',
                    'Archaeological considerations'
                ],
                proposalRequirements: [
                    'Demonstrate heritage expertise',
                    'Show conservation area awareness',
                    'Detail listed building considerations',
                    'Explain archaeological assessment and protection'
                ]
            },
            greenInfrastructure: {
                name: 'Green Infrastructure',
                requirements: [
                    'Green roofs and walls',
                    'Sustainable drainage systems (SuDS)',
                    'Biodiversity net gain',
                    'Urban greening',
                    'Tree and landscape protection'
                ],
                proposalRequirements: [
                    'Detail green infrastructure provisions',
                    'Show biodiversity net gain approach',
                    'Explain SuDS implementation',
                    'Demonstrate urban greening measures'
                ]
            },
            sustainableInfrastructure: {
                name: 'Sustainable Infrastructure',
                requirements: [
                    'Energy efficiency and carbon reduction',
                    'Renewable energy integration',
                    'Water efficiency',
                    'Sustainable materials',
                    'Circular economy principles'
                ],
                proposalRequirements: [
                    'Demonstrate sustainability credentials',
                    'Show carbon reduction measures',
                    'Detail renewable energy provisions',
                    'Explain circular economy approach'
                ]
            }
        },
        proposalRequirements: [
            'State compliance with London Plan policies',
            'Demonstrate alignment with relevant policy areas',
            'Show understanding of Good Growth principles',
            'Detail design quality approach',
            'Explain sustainability and environmental measures'
        ]
    },

    // London Building Acts
    londonBuildingActs: {
        partyWallAct1996: {
            name: 'Party Wall etc. Act 1996',
            description: 'Party wall procedures and requirements',
            requirements: [
                'Party wall surveyor appointment',
                'Party wall notices (Section 3 and Section 6)',
                'Party wall agreements (awards)',
                'Adjoining owner consent and dispute resolution',
                'Schedule of condition',
                'Works execution in accordance with Act'
            ],
            proposalRequirements: [
                'Reference Party Wall etc. Act 1996 where applicable',
                'Show party wall surveyor appointment process',
                'Detail party wall notice procedures',
                'Explain schedule of condition arrangements',
                'Demonstrate understanding of Act requirements'
            ],
            mandatoryStatements: [
                'We will comply with Party Wall etc. Act 1996 where applicable',
                'Party wall notices will be served in accordance with statutory timescales',
                'A qualified party wall surveyor will be appointed where required',
                'Works will be executed in accordance with party wall agreements'
            ]
        },
        specialFoundations: {
            name: 'London Building Acts - Special foundations',
            description: 'Additional requirements for special foundations in London',
            requirements: [
                'Special foundation design and approval',
                'Adjacent building protection',
                'Structural calculations and assessments',
                'Monitoring and settlement control',
                'Insurance considerations'
            ],
            proposalRequirements: [
                'Show special foundation design approach where applicable',
                'Detail adjacent building protection measures',
                'Explain structural assessment process',
                'Demonstrate monitoring arrangements'
            ]
        },
        demolitionNotices: {
            name: 'London Building Acts - Demolition notices',
            description: 'Requirements for demolition work in London',
            requirements: [
                'Local authority demolition notices',
                'Building Control notification',
                'Health and safety plans for demolition',
                'Waste management and recycling',
                'Neighbor protection measures'
            ],
            proposalRequirements: [
                'Show demolition notice procedures where applicable',
                'Detail demolition health and safety arrangements',
                'Explain waste management approach',
                'Demonstrate neighbor protection measures'
            ]
        },
        basementDevelopment: {
            name: 'Basement Development SPG (Supplementary Planning Guidance)',
            description: 'Basement construction standards and requirements',
            requirements: [
                'Basement impact assessments',
                'Groundwater management',
                'Structural design and waterproofing',
                'Neighbor impact mitigation',
                'Lightwell and ventilation provisions',
                'Construction method statements'
            ],
            proposalRequirements: [
                'Address basement construction if applicable',
                'Show basement design and construction expertise',
                'Detail groundwater management',
                'Explain neighbor protection measures',
                'Demonstrate structural and waterproofing approach'
            ],
            mandatoryStatements: [
                'Basement construction will comply with Basement Development SPG',
                'Groundwater management and waterproofing measures will be implemented',
                'Neighbor impact will be assessed and mitigated',
                'Structural design will ensure stability and safety'
            ]
        }
    },

    // Mayor's Transport Strategy
    mayorsTransportStrategy: {
        description: 'Mayor of London Transport Strategy requirements',
        constructionLogisticsPlan: {
            name: 'Construction Logistics Plan (CLP)',
            required: true,
            description: 'Required for major construction projects',
            requirements: [
                'Site access and egress arrangements',
                'Vehicle routing and scheduling',
                'Delivery consolidation strategies',
                'Loading and unloading procedures',
                'Traffic impact assessment',
                'Local road network impact mitigation',
                'Community engagement on transport impacts'
            ],
            proposalRequirements: [
                'Provide Construction Logistics Plan outline',
                'Detail site access and logistics arrangements',
                'Show delivery consolidation approach',
                'Explain traffic impact mitigation',
                'Demonstrate community engagement on transport'
            ],
            mandatoryStatements: [
                'A Construction Logistics Plan will be developed and submitted',
                'The CLP will minimize impact on local transport networks',
                'Delivery consolidation will reduce vehicle movements',
                'Community will be engaged on transport impacts'
            ]
        },
        deliveryServicingPlan: {
            name: 'Delivery and Servicing Plan (DSP)',
            required: true,
            description: 'Required for projects with significant deliveries',
            requirements: [
                'Delivery scheduling and coordination',
                'Servicing vehicle management',
                'Loading bay provision',
                'Just-in-time delivery strategies',
                'Supplier coordination'
            ],
            proposalRequirements: [
                'Detail Delivery and Servicing Plan approach',
                'Show delivery scheduling strategies',
                'Explain loading and servicing arrangements',
                'Demonstrate supplier coordination'
            ]
        },
        trafficManagement: {
            name: 'Traffic management during construction',
            requirements: [
                'Traffic management plans',
                'Temporary traffic arrangements',
                'Public transport protection',
                'Pedestrian and cycling provisions',
                'Emergency vehicle access',
                'Lane rental management (where applicable)'
            ],
            proposalRequirements: [
                'Detail traffic management during construction',
                'Show temporary traffic arrangements',
                'Explain public transport protection',
                'Demonstrate active travel provisions'
            ]
        }
    },

    // Low Emission Zone / Ultra Low Emission Zone
    emissionZones: {
        lez: {
            name: 'Low Emission Zone (LEZ)',
            description: 'London Low Emission Zone requirements',
            requirements: [
                'LEZ-compliant vehicles',
                'Emission standards for HGVs',
                'Charges for non-compliant vehicles',
                'Fleet composition planning'
            ],
            proposalRequirements: [
                'Demonstrate LEZ compliance',
                'Show fleet emission standards',
                'Detail vehicle selection criteria'
            ]
        },
        ulez: {
            name: 'Ultra Low Emission Zone (ULEZ)',
            description: 'Ultra Low Emission Zone requirements',
            required: true,
            requirements: [
                'ULEZ-compliant vehicles (Euro 6 diesel, Euro 4 petrol minimum)',
                'Zero emission vehicles where possible',
                'Fleet composition and replacement strategy',
                'Charges for non-compliant vehicles',
                'Air quality improvement commitments'
            ],
            proposalRequirements: [
                'Confirm ULEZ-compliant fleet',
                'Show fleet composition and standards',
                'Detail zero/low emission vehicle commitments',
                'Explain air quality improvement measures',
                'Demonstrate ULEZ charge management'
            ],
            mandatoryStatements: [
                'All construction vehicles will comply with ULEZ requirements',
                'We operate a ULEZ-compliant fleet (Euro 6 diesel, Euro 4 petrol minimum)',
                'Zero and low emission vehicles will be prioritized',
                'Non-Road Mobile Machinery (NRMM) will comply with emission regulations'
            ]
        },
        nrmm: {
            name: 'Non-Road Mobile Machinery (NRMM) regulations',
            description: 'Emission standards for construction plant and machinery',
            requirements: [
                'NRMM emission standards compliance (Stage V)',
                'Low emission plant selection',
                'Plant registration and certification',
                'Emission monitoring'
            ],
            proposalRequirements: [
                'Demonstrate NRMM compliance',
                'Show low emission plant selection',
                'Detail plant registration and certification',
                'Explain emission monitoring arrangements'
            ],
            mandatoryStatements: [
                'All Non-Road Mobile Machinery will comply with emission regulations',
                'Stage V compliant plant will be used where required',
                'Low emission plant will be prioritized'
            ]
        }
    },

    // Transport and Logistics
    transport: {
        londonPlan: {
            requirements: [
                'Minimizing vehicle movements',
                'Consolidated deliveries',
                'Off-peak delivery windows',
                'Use of rail and water transport where possible',
                'Last-mile logistics optimization'
            ],
            proposalRequirements: [
                'Delivery and logistics strategy',
                'Transport impact assessments',
                'Consolidation centers',
                'Sustainable transport methods',
                'Traffic management plans'
            ]
        },
        tflRequirements: {
            description: 'Transport for London requirements',
            considerations: [
                'Works on or near TfL infrastructure',
                'Lane rental charges',
                'Traffic management approvals',
                'Bus route diversions',
                'Cycling and walking provision'
            ],
            proposalRequirements: [
                'TfL coordination and approvals',
                'Traffic management plans',
                'Public transport impact mitigation',
                'Active travel provisions'
            ]
        },
        congestionCharge: {
            description: 'London Congestion Charge Zone',
            considerations: [
                'Charge applicability for works vehicles',
                'Timing of deliveries to avoid charges',
                'Use of compliant vehicles',
                'Cost implications for project'
            ],
            proposalRequirements: [
                'Congestion charge management',
                'Delivery scheduling outside charge hours',
                'Low/zero emission vehicles',
                'Cost transparency'
            ]
        },
        ulez: {
            description: 'Ultra Low Emission Zone',
            requirements: [
                'ULEZ-compliant vehicles',
                'Emission standards (Euro 6 diesel, Euro 4 petrol)',
                'Clean air considerations',
                'Zero emission vehicles where possible'
            ],
            proposalRequirements: [
                'ULEZ compliance strategy',
                'Fleet composition details',
                'Zero/low emission commitments',
                'Air quality improvements'
            ]
        }
    },

    // Environmental Considerations
    environmental: {
        airQuality: {
            description: 'London Air Quality Management Areas',
            requirements: [
                'Air quality action plans',
                'Emission reduction measures',
                'Dust suppression',
                'Low emission plant and vehicles',
                'Air quality monitoring'
            ],
            proposalRequirements: [
                'Air quality management strategy',
                'Dust and emission control measures',
                'Monitoring and reporting',
                'Innovation in emission reduction'
            ]
        },
        noiseControl: {
            description: 'London noise management',
            requirements: [
                'Noise impact assessments',
                'Out-of-hours working restrictions',
                'Noise mitigation measures',
                'Community consultation',
                'Noise monitoring'
            ],
            proposalRequirements: [
                'Noise management plan',
                'Out-of-hours working strategy',
                'Mitigation measures',
                'Community engagement on noise'
            ]
        },
        wasteManagement: {
            description: 'London waste management',
            requirements: [
                'Waste minimization',
                'Recycling and reuse targets',
                'Waste management plans',
                'WRAP (Waste & Resources Action Programme) compliance',
                'Circular economy principles'
            ],
            proposalRequirements: [
                'Waste minimization strategy',
                'Recycling and reuse targets',
                'Waste management infrastructure',
                'Circular economy approach'
            ]
        }
    },

    // Density and Space Constraints
    densityConstraints: {
        description: 'High-density urban environment challenges',
        considerations: [
            'Limited site access',
            'Neighboring properties',
            'Party wall considerations',
            'Overhead constraints',
            'Underground services',
            'Limited storage space',
            'Crane and plant restrictions'
        ],
        proposalRequirements: [
            'Detailed site access strategy',
            'Party wall surveyor engagement',
            'Neighbor consultation and protection',
            'Compact construction methods',
            'Just-in-time delivery',
            'Off-site fabrication'
        ]
    },

    // Heritage and Conservation
    heritage: {
        description: 'London heritage and conservation requirements',
        considerations: [
            'Listed buildings',
            'Conservation areas',
            'World Heritage Sites',
            'Archaeological considerations',
            'Historic environment protection',
            'Design and materials sensitivity'
        ],
        proposalRequirements: [
            'Heritage impact assessments',
            'Conservation officer engagement',
            'Archaeological investigations',
            'Sensitive design approach',
            'Traditional skills and materials',
            'Historic environment expertise'
        ]
    },

    // Community Engagement
    communityEngagement: {
        description: 'London community engagement requirements',
        requirements: [
            'Pre-construction consultation',
            'Regular community updates',
            'Construction liaison groups',
            'Community benefits',
            'Local employment',
            'SME engagement'
        ],
        proposalRequirements: [
            'Community engagement strategy',
            'Communication plans',
            'Local employment commitments',
            'Community benefit initiatives',
            'Stakeholder management'
        ]
    },

    // Building Regulations and Standards
    buildingStandards: {
        londonPlan: {
            description: 'Enhanced standards in London Plan',
            requirements: [
                'Higher energy efficiency standards',
                'Water efficiency requirements',
                'Sustainable urban drainage',
                'Green roofs and walls',
                'BREEAM/LEED certification',
                'Carbon reduction targets'
            ],
            proposalRequirements: [
                'Sustainability credentials',
                'Energy efficiency strategies',
                'BREEAM/LEED targets',
                'Carbon reduction measures',
                'Green infrastructure'
            ]
        },
        fireSafety: {
            description: 'Enhanced fire safety requirements',
            requirements: [
                'Building Safety Act 2022 compliance',
                'Fire safety assessments',
                'Fire engineer engagement',
                'Sprinkler systems where required',
                'Fire safety management'
            ],
            proposalRequirements: [
                'Building Safety Act compliance',
                'Fire safety expertise',
                'Fire safety management systems',
                'Competent persons for fire safety'
            ]
        }
    },

    // Key London-Specific Proposal Requirements
    mandatoryElements: [
        'London Plan alignment',
        'Transport and logistics strategy',
        'Air quality management',
        'Noise management plan',
        'Waste management strategy',
        'Community engagement plan',
        'Heritage and conservation considerations',
        'Sustainability credentials',
        'Local employment and apprenticeships',
        'SME engagement'
    ],

    // Winning Strategies for London Tenders
    winningStrategies: [
        'Demonstrate London construction experience',
        'Show understanding of transport and logistics challenges',
        'Emphasize environmental credentials and ULEZ compliance',
        'Highlight community engagement experience',
        'Show heritage and conservation expertise',
        'Demonstrate high-density construction experience',
        'Include local supply chain and employment',
        'Show innovation in sustainable construction',
        'Demonstrate understanding of London planning context',
        'Include case studies from London projects'
    ],

    // Key Phrases for London Proposals
    keyPhrases: [
        'London Plan compliant',
        'ULEZ and congestion charge management',
        'Air quality improvement measures',
        'Minimal disruption to London transport',
        'Community engagement and consultation',
        'Heritage and conservation expertise',
        'High-density urban construction experience',
        'Sustainable construction methods',
        'Local employment and apprenticeships',
        'London construction specialist',
        'Just-in-time delivery strategies',
        'Off-site fabrication and modular construction',
        'Party wall expertise',
        'BREEAM/LEED certified projects'
    ]
};

export default LondonRequirements;
