/**
 * Proposal Generator
 * Generates winning proposals using AI and knowledge bases
 */

import CDM2015 from '../knowledge-base/cdm2015.js';
import UKConstructionLaw from '../knowledge-base/uk-construction-law.js';
import NHSProcurement from '../knowledge-base/nhs-procurement.js';
import LondonRequirements from '../knowledge-base/london-requirements.js';
import ProposalStrategies from '../knowledge-base/proposal-strategies.js';
import MandatoryDocumentation from '../knowledge-base/mandatory-documentation.js';

export class ProposalGenerator {
    constructor() {
        this.knowledgeBases = {
            cdm2015: CDM2015,
            ukConstructionLaw: UKConstructionLaw,
            nhsProcurement: NHSProcurement,
            londonRequirements: LondonRequirements,
            proposalStrategies: ProposalStrategies,
            mandatoryDocumentation: MandatoryDocumentation
        };
    }

    /**
     * Generate a complete proposal
     * @param {Object} inputData - Tender analysis, company info, and generation parameters
     * @returns {Object} Generated proposal sections and metadata
     */
    async generateProposal(inputData) {
        const {
            tenderAnalysis,
            companyInfo,
            projectInfo,
            generationParams = {}
        } = inputData;

        const proposal = {
            metadata: {
                generatedAt: new Date().toISOString(),
                projectName: projectInfo?.name || 'Construction Project',
                clientName: projectInfo?.client || 'Client',
                version: '1.0.0'
            },
            sections: {},
            compliance: {
                requirements: [],
                keyPhrases: [],
                regulatoryElements: []
            },
            recommendations: []
        };

        // Generate executive summary
        proposal.sections.executiveSummary = await this.generateExecutiveSummary(
            tenderAnalysis,
            companyInfo,
            projectInfo
        );

        // Generate technical response
        proposal.sections.technicalResponse = await this.generateTechnicalResponse(
            tenderAnalysis,
            companyInfo,
            projectInfo
        );

        // Generate commercial response
        proposal.sections.commercialResponse = await this.generateCommercialResponse(
            tenderAnalysis,
            companyInfo,
            projectInfo
        );

        // Generate supporting information structure
        proposal.sections.supportingInformation = this.generateSupportingInformation(
            tenderAnalysis,
            companyInfo
        );

        // Compile compliance elements
        proposal.compliance = this.compileComplianceElements(
            tenderAnalysis,
            proposal.sections
        );

        // Generate recommendations
        proposal.recommendations = this.generateProposalRecommendations(
            tenderAnalysis,
            proposal
        );

        return proposal;
    }

    /**
     * Generate executive summary
     */
    async generateExecutiveSummary(tenderAnalysis, companyInfo, projectInfo) {
        const winThemes = tenderAnalysis.winThemes || [];
        const projectType = tenderAnalysis.projectInfo?.type || '';
        const clientType = tenderAnalysis.projectInfo?.client || '';

        let summary = {
            title: 'Executive Summary',
            content: []
        };

        // Opening statement
        summary.content.push({
            type: 'paragraph',
            text: `We are pleased to submit our proposal for the ${projectInfo?.name || 'construction project'}. Our proposal demonstrates our comprehensive understanding of your requirements and our commitment to delivering exceptional value, quality, and compliance.`
        });

        // Understanding of requirements
        summary.content.push({
            type: 'heading',
            level: 2,
            text: 'Our Understanding'
        });

        summary.content.push({
            type: 'paragraph',
            text: `We understand that this project requires [UNDERSTANDING FROM TENDER ANALYSIS]. Our approach has been specifically tailored to address these requirements while exceeding expectations in delivery, quality, and value.`
        });

        // Win themes
        if (winThemes.length > 0) {
            summary.content.push({
                type: 'heading',
                level: 2,
                text: 'Key Differentiators'
            });

            summary.content.push({
                type: 'list',
                items: winThemes.map(theme => ({
                    text: theme,
                    emphasis: true
                }))
            });
        }

        // Regulatory compliance highlights
        const regulatoryHighlights = this.getRegulatoryHighlights(tenderAnalysis);
        if (regulatoryHighlights.length > 0) {
            summary.content.push({
                type: 'heading',
                level: 2,
                text: 'Regulatory Compliance'
            });

            summary.content.push({
                type: 'paragraph',
                text: `Our proposal is fully compliant with all relevant UK regulations including ${regulatoryHighlights.join(', ')}.`
            });
        }

        // Value proposition
        summary.content.push({
            type: 'heading',
            level: 2,
            text: 'Our Commitment'
        });

        summary.content.push({
            type: 'paragraph',
            text: `We are committed to delivering this project with the highest standards of quality, safety, and environmental responsibility. Our experienced team, robust management systems, and proven track record position us as the ideal partner for this project.`
        });

        return summary;
    }

    /**
     * Generate technical response
     */
    async generateTechnicalResponse(tenderAnalysis, companyInfo, projectInfo) {
        const response = {
            title: 'Technical Response',
            sections: []
        };

        // Methodology and approach
        response.sections.push({
            title: 'Methodology and Approach',
            content: this.generateMethodologySection(tenderAnalysis, companyInfo)
        });

        // Project management
        response.sections.push({
            title: 'Project Management and Organization',
            content: this.generateProjectManagementSection(tenderAnalysis, companyInfo)
        });

        // Health and safety (CDM 2015 and HSWA 1974)
        if (this.isConstructionProject(tenderAnalysis)) {
            response.sections.push({
                title: 'Health and Safety Management - CDM 2015 Compliance',
                content: this.generateCDM2015Section(tenderAnalysis, companyInfo)
            });

            // HSWA 1974 compliance (applies to all construction projects)
            response.sections.push({
                title: 'Health and Safety at Work Act 1974 Compliance',
                content: this.generateHSWASection(tenderAnalysis, companyInfo)
            });
        }

        // Building Regulations compliance (for all construction projects)
        if (this.isConstructionProject(tenderAnalysis)) {
            response.sections.push({
                title: 'Building Regulations 2010 Compliance',
                content: this.generateBuildingRegulationsSection(tenderAnalysis, companyInfo)
            });
        }

        // Quality management
        response.sections.push({
            title: 'Quality Management',
            content: this.generateQualityManagementSection(tenderAnalysis, companyInfo)
        });

        // Risk management
        response.sections.push({
            title: 'Risk Management',
            content: this.generateRiskManagementSection(tenderAnalysis, companyInfo)
        });

        // Program and phasing
        response.sections.push({
            title: 'Program and Phasing',
            content: this.generateProgramSection(tenderAnalysis, companyInfo)
        });

        // NHS-specific sections
        if (this.isNHSTender(tenderAnalysis)) {
            response.sections.push({
                title: 'Clinical Environment Management',
                content: this.generateNHSClinicalSection(tenderAnalysis, companyInfo)
            });
        }

        // London-specific sections
        if (this.isLondonProject(tenderAnalysis)) {
            response.sections.push({
                title: 'London-Specific Considerations',
                content: this.generateLondonSpecificSection(tenderAnalysis, companyInfo)
            });
        }

        return response;
    }

    /**
     * Generate CDM 2015 compliance section with regulation-specific duties
     */
    generateCDM2015Section(tenderAnalysis, companyInfo) {
        const content = [];

        content.push({
            type: 'paragraph',
            text: 'Our approach to health and safety management is fully compliant with the Construction (Design and Management) Regulations 2015 (CDM 2015). All duty holders have been clearly identified, and their responsibilities are defined in accordance with the relevant regulations.'
        });

        // Client Duties (Regulation 4-5)
        content.push({
            type: 'heading',
            level: 3,
            text: 'Client Duties (Regulation 4-5)'
        });

        const clientDuties = CDM2015.dutyHolders.client;
        content.push({
            type: 'paragraph',
            text: `Under ${clientDuties.regulation}, the client has specific duties. We understand and will support the client in fulfilling these obligations:`
        });

        content.push({
            type: 'list',
            items: clientDuties.duties.map(d => ({
                text: `${d.duty} (${d.regulation})`,
                emphasis: d.critical
            }))
        });

        if (clientDuties.mandatoryStatements) {
            content.push({
                type: 'paragraph',
                text: 'Our commitment:',
                emphasis: true
            });
            content.push({
                type: 'list',
                items: clientDuties.mandatoryStatements.map(statement => ({ text: statement }))
            });
        }

        // Principal Designer Duties (Regulation 11-12)
        content.push({
            type: 'heading',
            level: 3,
            text: 'Principal Designer Duties (Regulation 11-12)'
        });

        const pdDuties = CDM2015.dutyHolders.principalDesigner;
        content.push({
            type: 'paragraph',
            text: `The Principal Designer, appointed in accordance with ${pdDuties.regulation}, will:`
        });

        content.push({
            type: 'list',
            items: pdDuties.duties.map(d => ({
                text: `${d.duty} (${d.regulation})`,
                emphasis: d.critical
            }))
        });

        if (pdDuties.mandatoryStatements) {
            content.push({
                type: 'paragraph',
                text: 'The Principal Designer will ensure:',
                emphasis: true
            });
            content.push({
                type: 'list',
                items: pdDuties.mandatoryStatements.map(statement => ({ text: statement }))
            });
        }

        // Principal Contractor Duties (Regulation 13-14)
        content.push({
            type: 'heading',
            level: 3,
            text: 'Principal Contractor Duties (Regulation 13-14)'
        });

        const pcDuties = CDM2015.dutyHolders.principalContractor;
        content.push({
            type: 'paragraph',
            text: `The Principal Contractor, in accordance with ${pcDuties.regulation}, will:`
        });

        content.push({
            type: 'list',
            items: pcDuties.duties.map(d => ({
                text: `${d.duty} (${d.regulation})${d.conditional ? ` - ${d.conditional}` : ''}`,
                emphasis: d.critical
            }))
        });

        if (pcDuties.mandatoryStatements) {
            content.push({
                type: 'paragraph',
                text: 'The Principal Contractor will ensure:',
                emphasis: true
            });
            content.push({
                type: 'list',
                items: pcDuties.mandatoryStatements.map(statement => ({ text: statement }))
            });
        }

        // Designer Duties (Regulation 8-10)
        content.push({
            type: 'heading',
            level: 3,
            text: 'Designer Duties (Regulation 8-10)'
        });

        const designerDuties = CDM2015.dutyHolders.designers;
        content.push({
            type: 'paragraph',
            text: `All designers working on this project will comply with ${designerDuties.regulation}:`
        });

        content.push({
            type: 'list',
            items: designerDuties.duties.map(d => ({
                text: `${d.duty} (${d.regulation})`,
                emphasis: d.critical
            }))
        });

        // Contractor Duties (Regulation 15)
        content.push({
            type: 'heading',
            level: 3,
            text: 'Contractor Duties (Regulation 15)'
        });

        const contractorDuties = CDM2015.dutyHolders.contractors;
        content.push({
            type: 'paragraph',
            text: `All contractors, in accordance with ${contractorDuties.regulation}, will:`
        });

        content.push({
            type: 'list',
            items: contractorDuties.duties.map(d => ({
                text: `${d.duty} (${d.regulation})`,
                emphasis: d.critical
            }))
        });

        if (contractorDuties.mandatoryStatements) {
            content.push({
                type: 'paragraph',
                text: 'All contractors will ensure:',
                emphasis: true
            });
            content.push({
                type: 'list',
                items: contractorDuties.mandatoryStatements.slice(0, 4).map(statement => ({ text: statement }))
            });
        }

        // Pre-construction information (Regulation 4(4), 12(1))
        content.push({
            type: 'heading',
            level: 3,
            text: `Pre-Construction Information (${CDM2015.preConstructionInfo.regulation})`
        });

        content.push({
            type: 'paragraph',
            text: `We will review all pre-construction information provided by the client (${CDM2015.keyRegulations.preConstructionInfo}) and ensure it informs our planning and design processes. Our information management systems will ensure all relevant parties have access to the information they need.`
        });

        content.push({
            type: 'list',
            items: CDM2015.preConstructionInfo.requiredElements.map(item => ({ text: item }))
        });

        // Construction phase plan (Regulation 12(1))
        content.push({
            type: 'heading',
            level: 3,
            text: `Construction Phase Plan (${CDM2015.constructionPhasePlan.regulation})`
        });

        content.push({
            type: 'paragraph',
            text: `A comprehensive construction phase plan will be developed before work commences, in accordance with ${CDM2015.constructionPhasePlan.regulation}, covering:`
        });

        content.push({
            type: 'list',
            items: CDM2015.constructionPhasePlan.requiredElements.map(item => ({ text: item }))
        });

        // Health and safety file (Regulation 12(5))
        content.push({
            type: 'heading',
            level: 3,
            text: `Health and Safety File (${CDM2015.healthAndSafetyFile.regulation})`
        });

        content.push({
            type: 'paragraph',
            text: `We will maintain a comprehensive health and safety file throughout the project, as required by ${CDM2015.healthAndSafetyFile.regulation}, documenting:`
        });

        content.push({
            type: 'list',
            items: CDM2015.healthAndSafetyFile.requiredElements.map(item => ({ text: item }))
        });

        content.push({
            type: 'paragraph',
            text: 'The file will be handed over to the client on project completion.'
        });

        // Summary
        content.push({
            type: 'heading',
            level: 3,
            text: 'Compliance Summary'
        });

        content.push({
            type: 'paragraph',
            text: 'All CDM 2015 requirements have been addressed in this proposal. Our team has extensive experience in CDM 2015 compliance, and we are committed to ensuring full compliance throughout the project lifecycle.'
        });

        return content;
    }

    /**
     * Generate Health and Safety at Work Act 1974 compliance section
     */
    generateHSWASection(tenderAnalysis, companyInfo) {
        const content = [];
        const HSWA = UKConstructionLaw.legislation.healthAndSafetyAtWork;
        const integration = HSWA.proposalIntegration;

        content.push({
            type: 'paragraph',
            text: `We are fully compliant with the Health and Safety at Work etc. Act 1974 (HSWA 1974). As an employer, we understand and fulfill our duties under this primary piece of UK health and safety legislation. Our approach demonstrates explicit compliance with all relevant sections of the Act.`
        });

        // Identify our role
        content.push({
            type: 'heading',
            level: 3,
            text: 'Our Role and Responsibilities'
        });

        content.push({
            type: 'paragraph',
            text: '[COMPANY NAME] acts as [Principal Contractor/Contractor/Employer] for this project. As such, we have specific duties under HSWA 1974, which we will fulfill in accordance with the Act and supporting regulations.'
        });

        // Section 2: Employer duties to employees
        content.push({
            type: 'heading',
            level: 3,
            text: `Section 2 - General Duties of Employers to Employees (${HSWA.section2.title})`
        });

        content.push({
            type: 'paragraph',
            text: `Under Section 2 of HSWA 1974, it is our duty to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all our employees. We fulfill this through the following provisions:`
        });

        HSWA.section2.duties.forEach(duty => {
            content.push({
                type: 'subheading',
                text: `${duty.duty} (${duty.section})`
            });

            content.push({
                type: 'paragraph',
                text: `${duty.description}`
            });

            if (duty.mandatoryStatements && duty.mandatoryStatements.length > 0) {
                content.push({
                    type: 'paragraph',
                    text: 'Our approach:',
                    emphasis: true
                });
                content.push({
                    type: 'list',
                    items: duty.mandatoryStatements.map(statement => ({ text: statement }))
                });
            }

            if (duty.proposalRequirements && duty.proposalRequirements.length > 0) {
                content.push({
                    type: 'paragraph',
                    text: 'We will:'
                });
                content.push({
                    type: 'list',
                    items: duty.proposalRequirements.slice(0, 3).map(req => ({ text: req }))
                });
            }
        });

        // Section 3: Duties to non-employees
        content.push({
            type: 'heading',
            level: 3,
            text: `Section 3 - Duties to Persons Other Than Employees (${HSWA.section3.title})`
        });

        content.push({
            type: 'paragraph',
            text: `Under Section 3 of HSWA 1974, we have a duty to conduct our undertaking so that persons not in our employment (including members of the public, neighbours, visitors, and other contractors) are not exposed to risks to their health or safety.`
        });

        HSWA.section3.duties.forEach(duty => {
            content.push({
                type: 'subheading',
                text: `${duty.duty} (${duty.section})`
            });

            content.push({
                type: 'paragraph',
                text: `${duty.description}`
            });

            if (duty.mandatoryStatements && duty.mandatoryStatements.length > 0) {
                content.push({
                    type: 'paragraph',
                    text: 'Our commitment:',
                    emphasis: true
                });
                content.push({
                    type: 'list',
                    items: duty.mandatoryStatements.map(statement => ({ text: statement }))
                });
            }
        });

        // Section 7-8: Employee duties
        content.push({
            type: 'heading',
            level: 3,
            text: `Sections 7-8 - Employee Duties (${HSWA.section7_8.title})`
        });

        content.push({
            type: 'paragraph',
            text: 'We ensure all employees understand their duties under Sections 7 and 8 of HSWA 1974:'
        });

        HSWA.section7_8.duties.forEach(duty => {
            content.push({
                type: 'subheading',
                text: `${duty.duty} (${duty.section})`
            });

            content.push({
                type: 'paragraph',
                text: `${duty.description}`
            });

            if (duty.mandatoryStatements && duty.mandatoryStatements.length > 0) {
                content.push({
                    type: 'list',
                    items: duty.mandatoryStatements.map(statement => ({ text: statement }))
                });
            }
        });

        content.push({
            type: 'paragraph',
            text: 'Employee duties are communicated through:'
        });
        content.push({
            type: 'list',
            items: [
                'Site-specific health and safety inductions',
                'Toolbox talks and safety briefings',
                'Health and safety policy documentation',
                'Training on employee responsibilities',
                'Supervision and monitoring to ensure compliance'
            ]
        });

        // Compliance Summary
        content.push({
            type: 'heading',
            level: 3,
            text: 'HSWA 1974 Compliance Summary'
        });

        content.push({
            type: 'paragraph',
            text: 'Our approach ensures full compliance with HSWA 1974 through:'
        });

        content.push({
            type: 'list',
            items: [
                'Explicit compliance with Section 2 - Employer duties to employees',
                'Full compliance with Section 3 - Duties to non-employees',
                'Clear communication of Sections 7-8 - Employee duties',
                'Integration with CDM 2015 and other health and safety regulations',
                'Robust health and safety management systems',
                'Competent health and safety advisors',
                'Comprehensive risk assessment and safe systems of work',
                'Adequate information, instruction, training and supervision',
                'Regular monitoring, review and continuous improvement'
            ]
        });

        content.push({
            type: 'paragraph',
            text: 'All work is conducted "so far as is reasonably practicable" in accordance with HSWA 1974, ensuring the highest standards of health, safety and welfare for all persons affected by our work.'
        });

        // Proposal Integration Elements

        // Health & Safety Policy
        content.push({
            type: 'heading',
            level: 3,
            text: 'Health & Safety Policy'
        });

        content.push({
            type: 'paragraph',
            text: 'Our Health & Safety Policy demonstrates full compliance with HSWA 1974 and forms the foundation of our health and safety management:'
        });

        content.push({
            type: 'list',
            items: integration.healthAndSafetyPolicy.elements.slice(0, 5).map(element => ({ text: element }))
        });

        if (integration.healthAndSafetyPolicy.mandatoryStatements) {
            content.push({
                type: 'paragraph',
                text: 'Our Health & Safety Policy:'
            });
            content.push({
                type: 'list',
                items: integration.healthAndSafetyPolicy.mandatoryStatements.map(statement => ({ text: statement }))
            });
        }

        // Training Programs
        content.push({
            type: 'heading',
            level: 3,
            text: 'Training Programs'
        });

        content.push({
            type: 'paragraph',
            text: 'Our comprehensive training programs fulfill HSWA 1974 Section 2(2)(c) requirements for information, instruction, training and supervision:'
        });

        content.push({
            type: 'list',
            items: integration.trainingPrograms.elements.slice(0, 6).map(element => ({ text: element }))
        });

        if (integration.trainingPrograms.mandatoryStatements) {
            content.push({
                type: 'paragraph',
                text: 'Our training approach:'
            });
            content.push({
                type: 'list',
                items: integration.trainingPrograms.mandatoryStatements.slice(0, 3).map(statement => ({ text: statement }))
            });
        }

        // Supervision Structure
        content.push({
            type: 'heading',
            level: 3,
            text: 'Supervision Structure'
        });

        content.push({
            type: 'paragraph',
            text: 'Our supervision structure ensures adequate supervision in accordance with HSWA 1974 Section 2(2)(c):'
        });

        content.push({
            type: 'list',
            items: integration.supervisionStructure.elements.slice(0, 6).map(element => ({ text: element }))
        });

        if (integration.supervisionStructure.mandatoryStatements) {
            content.push({
                type: 'paragraph',
                text: 'Our supervision ensures:'
            });
            content.push({
                type: 'list',
                items: integration.supervisionStructure.mandatoryStatements.slice(0, 3).map(statement => ({ text: statement }))
            });
        }

        // Risk Management Approach
        content.push({
            type: 'heading',
            level: 3,
            text: 'Risk Management Approach'
        });

        content.push({
            type: 'paragraph',
            text: 'Our risk management approach ensures compliance with HSWA 1974 Section 2 and Section 3 duties:'
        });

        content.push({
            type: 'list',
            items: integration.riskManagementApproach.elements.slice(0, 6).map(element => ({ text: element }))
        });

        if (integration.riskManagementApproach.mandatoryStatements) {
            content.push({
                type: 'paragraph',
                text: 'Our risk management:'
            });
            content.push({
                type: 'list',
                items: integration.riskManagementApproach.mandatoryStatements.slice(0, 3).map(statement => ({ text: statement }))
            });
        }

        return content;
    }

    /**
     * Generate Building Regulations 2010 compliance section
     */
    generateBuildingRegulationsSection(tenderAnalysis, companyInfo) {
        const content = [];
        const BR = UKConstructionLaw.legislation.buildingRegulations;

        content.push({
            type: 'paragraph',
            text: `We are fully compliant with Building Regulations 2010 (as amended), which apply to all building work in England and Wales. Our approach ensures compliance with all relevant Parts of the Building Regulations and coordination with Building Control.`
        });

        // Building Control Coordination
        content.push({
            type: 'heading',
            level: 3,
            text: 'Building Control Coordination'
        });

        content.push({
            type: 'paragraph',
            text: 'Building work will be approved and inspected by Building Control in accordance with statutory requirements:'
        });

        content.push({
            type: 'list',
            items: BR.buildingControl.requirements.map(req => ({ text: req }))
        });

        // Key Parts Addressed
        content.push({
            type: 'heading',
            level: 3,
            text: 'Relevant Parts of Building Regulations Addressed'
        });

        content.push({
            type: 'paragraph',
            text: 'Our approach addresses all relevant Parts of Building Regulations 2010:'
        });

        // List key parts that are most commonly required
        const keyPartsToInclude = ['partA', 'partB', 'partC', 'partF', 'partL', 'partM', 'partP'];

        keyPartsToInclude.forEach(partKey => {
            const part = BR.keyParts[partKey];
            if (part) {
                content.push({
                    type: 'subheading',
                    text: `${part.name} - ${part.description}`
                });

                content.push({
                    type: 'paragraph',
                    text: `${part.regulation}: ${part.description}`
                });

                if (part.mandatoryStatements && part.mandatoryStatements.length > 0) {
                    content.push({
                        type: 'list',
                        items: part.mandatoryStatements.slice(0, 2).map(statement => ({ text: statement }))
                    });
                }
            }
        });

        // Compliance Process
        content.push({
            type: 'heading',
            level: 3,
            text: 'Compliance Verification Process'
        });

        content.push({
            type: 'paragraph',
            text: 'We ensure Building Regulations compliance through:'
        });

        content.push({
            type: 'list',
            items: [
                'Early engagement with Building Control',
                'Qualified designers and engineers for each relevant Part',
                'Compliance checking and verification at design stage',
                'Regular Building Control inspections during construction',
                'Testing and commissioning of building services and systems',
                'Completion certificates obtained from Building Control',
                'Integration of Building Regulations requirements into construction process'
            ]
        });

        // Summary
        content.push({
            type: 'heading',
            level: 3,
            text: 'Building Regulations Compliance Summary'
        });

        content.push({
            type: 'paragraph',
            text: 'All building work will comply with Building Regulations 2010. We will:'
        });

        content.push({
            type: 'list',
            items: [
                'Demonstrate compliance with all relevant Parts of Building Regulations',
                'Coordinate effectively with Building Control throughout the project',
                'Employ qualified designers and engineers for each relevant Part',
                'Undertake all necessary inspections and testing',
                'Obtain completion certificates from Building Control',
                'Integrate Building Regulations compliance into our quality management processes'
            ]
        });

        return content;
    }

    /**
     * Generate methodology section
     */
    generateMethodologySection(tenderAnalysis, companyInfo) {
        return [
            {
                type: 'paragraph',
                text: 'Our methodology is based on proven best practices and tailored to the specific requirements of this project.'
            },
            {
                type: 'heading',
                level: 3,
                text: 'Design and Planning Phase'
            },
            {
                type: 'paragraph',
                text: '[DETAILED METHODOLOGY TO BE ADDED BASED ON PROJECT REQUIREMENTS]'
            },
            {
                type: 'heading',
                level: 3,
                text: 'Construction Phase'
            },
            {
                type: 'paragraph',
                text: '[DETAILED CONSTRUCTION METHODOLOGY TO BE ADDED]'
            }
        ];
    }

    /**
     * Generate project management section
     */
    generateProjectManagementSection(tenderAnalysis, companyInfo) {
        return [
            {
                type: 'paragraph',
                text: 'Our project management approach ensures effective coordination, communication, and delivery.'
            },
            {
                type: 'heading',
                level: 3,
                text: 'Management Structure'
            },
            {
                type: 'paragraph',
                text: '[PROJECT MANAGEMENT STRUCTURE TO BE DETAILED]'
            },
            {
                type: 'heading',
                level: 3,
                text: 'Communication and Reporting'
            },
            {
                type: 'paragraph',
                text: '[COMMUNICATION PROTOCOLS TO BE DETAILED]'
            }
        ];
    }

    /**
     * Generate quality management section
     */
    generateQualityManagementSection(tenderAnalysis, companyInfo) {
        return [
            {
                type: 'paragraph',
                text: 'Quality is embedded throughout our processes, from initial planning through to handover and beyond.'
            },
            {
                type: 'list',
                items: [
                    'ISO 9001 certified quality management system',
                    'Regular quality audits and inspections',
                    'Continuous improvement processes',
                    'Quality assurance procedures',
                    'Client satisfaction monitoring'
                ]
            }
        ];
    }

    /**
     * Generate risk management section
     */
    generateRiskManagementSection(tenderAnalysis, companyInfo) {
        return [
            {
                type: 'paragraph',
                text: 'We employ a systematic approach to risk management, identifying, assessing, and mitigating risks throughout the project lifecycle.'
            },
            {
                type: 'heading',
                level: 3,
                text: 'Risk Identification and Assessment'
            },
            {
                type: 'paragraph',
                text: '[RISK MANAGEMENT PROCESS TO BE DETAILED]'
            }
        ];
    }

    /**
     * Generate program section
     */
    generateProgramSection(tenderAnalysis, companyInfo) {
        return [
            {
                type: 'paragraph',
                text: 'Our program is carefully planned to ensure timely delivery while maintaining quality and safety standards.'
            },
            {
                type: 'heading',
                level: 3,
                text: 'Program Overview'
            },
            {
                type: 'paragraph',
                text: '[PROGRAM DETAILS TO BE ADDED]'
            }
        ];
    }

    /**
     * Generate NHS clinical environment section
     */
    generateNHSClinicalSection(tenderAnalysis, companyInfo) {
        const content = [];

        content.push({
            type: 'paragraph',
            text: 'We have extensive experience working in clinical environments and understand the unique challenges and requirements of healthcare construction.'
        });

        content.push({
            type: 'heading',
            level: 3,
            text: 'Infection Prevention and Control'
        });

        content.push({
            type: 'paragraph',
            text: `Our approach is fully compliant with Health Technical Memoranda (HTMs), particularly HTM 00-01, HTM 00-03, HTM 00-09, and HTM 00-10. We implement rigorous infection control measures during all phases of the project.`
        });

        content.push({
            type: 'heading',
            level: 3,
            text: 'Working in Occupied Buildings'
        });

        content.push({
            type: 'paragraph',
            text: `We have proven experience working in occupied clinical environments with minimal disruption to patient care and clinical services. Our phased approach ensures continued operations while work proceeds safely and efficiently.`
        });

        content.push({
            type: 'heading',
            level: 3,
            text: 'Patient and Staff Safety'
        });

        content.push({
            type: 'paragraph',
            text: `Patient and staff safety is our absolute priority. We implement comprehensive safety measures including dust and noise control, fire safety management, emergency access maintenance, and clear communication protocols.`
        });

        return content;
    }

    /**
     * Generate London-specific section
     */
    generateLondonSpecificSection(tenderAnalysis, companyInfo) {
        const content = [];

        content.push({
            type: 'paragraph',
            text: 'We have extensive experience working in London and understand the unique challenges of construction in the capital.'
        });

        content.push({
            type: 'heading',
            level: 3,
            text: 'Transport and Logistics'
        });

        content.push({
            type: 'paragraph',
            text: `Our logistics strategy minimizes impact on London's transport network through consolidated deliveries, off-peak scheduling, and ULEZ-compliant vehicles.`
        });

        content.push({
            type: 'heading',
            level: 3,
            text: 'Environmental Management'
        });

        content.push({
            type: 'paragraph',
            text: `We implement comprehensive air quality management, noise control, and waste minimization strategies aligned with the London Plan and environmental requirements.`
        });

        return content;
    }

    /**
     * Generate commercial response
     */
    async generateCommercialResponse(tenderAnalysis, companyInfo, projectInfo) {
        return {
            title: 'Commercial Response',
            sections: [
                {
                    title: 'Pricing Overview',
                    content: [
                        {
                            type: 'paragraph',
                            text: '[PRICING TO BE COMPLETED BASED ON TENDER REQUIREMENTS]'
                        }
                    ]
                },
                {
                    title: 'Value for Money',
                    content: [
                        {
                            type: 'paragraph',
                            text: 'Our pricing reflects excellent value for money, considering whole-life costs, quality, and service delivery.'
                        }
                    ]
                },
                {
                    title: 'Payment Terms',
                    content: [
                        {
                            type: 'paragraph',
                            text: '[PAYMENT TERMS TO BE SPECIFIED]'
                        }
                    ]
                }
            ]
        };
    }

    /**
     * Generate supporting information structure
     */
    generateSupportingInformation(tenderAnalysis, companyInfo) {
        return {
            title: 'Supporting Information',
            sections: [
                'Company Information',
                'Relevant Experience and Case Studies',
                'Key Personnel',
                'Organizational Structure',
                'Certifications and Accreditations',
                'Quality and H&S Policies',
                'Insurance Certificates',
                'References'
            ]
        };
    }

    /**
     * Compile compliance elements
     */
    compileComplianceElements(tenderAnalysis, sections) {
        const compliance = {
            requirements: [],
            keyPhrases: [],
            regulatoryElements: []
        };

        // Extract from regulatory requirements
        if (tenderAnalysis.regulatoryRequirements) {
            tenderAnalysis.regulatoryRequirements.forEach(reg => {
                compliance.regulatoryElements.push(reg.regulation);
                if (reg.keyPhrases) {
                    compliance.keyPhrases.push(...reg.keyPhrases);
                }
            });
        }

        return compliance;
    }

    /**
     * Generate proposal recommendations
     */
    generateProposalRecommendations(tenderAnalysis, proposal) {
        return [
            'Review and customize all placeholder content',
            'Add specific project details and examples',
            'Include company-specific case studies',
            'Add visual elements (diagrams, charts)',
            'Ensure all evaluation criteria are addressed',
            'Proofread and quality check',
            'Verify all mandatory documents are included'
        ];
    }

    // Helper methods
    isConstructionProject(tenderAnalysis) {
        const projectType = tenderAnalysis.projectInfo?.type || '';
        return projectType.toLowerCase().includes('construction') ||
            projectType.toLowerCase().includes('build');
    }

    isNHSTender(tenderAnalysis) {
        const clientType = tenderAnalysis.projectInfo?.client || '';
        return clientType.toLowerCase().includes('nhs') ||
            clientType.toLowerCase().includes('health');
    }

    isLondonProject(tenderAnalysis) {
        const location = tenderAnalysis.projectInfo?.location || '';
        return location.toLowerCase().includes('london');
    }

    getRegulatoryHighlights(tenderAnalysis) {
        const highlights = [];
        if (this.isConstructionProject(tenderAnalysis)) {
            highlights.push('CDM 2015');
        }
        if (this.isNHSTender(tenderAnalysis)) {
            highlights.push('NHS Procurement Standards');
        }
        if (this.isLondonProject(tenderAnalysis)) {
            highlights.push('London Plan requirements');
        }
        return highlights;
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

export default ProposalGenerator;
