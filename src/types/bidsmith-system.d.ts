export interface FormInput {
  [key: string]: unknown;
}

export interface ProcessedInput {
  raw: FormInput;
  [key: string]: unknown;
}

export interface EnrichedInput extends ProcessedInput {
  defaultsApplied?: boolean;
  inferredFields?: Record<string, unknown>;
}

export interface ValidationResult {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
}

export interface Requirements {
  technical: string[];
  commercial: string[];
  legal: string[];
  regulatory: string[];
  documentation: string[];
}

export interface Regulation {
  name: string;
  description?: string;
  requirements?: unknown;
  compliancePoints?: unknown;
  keyPhrases?: string[];
}

export interface ScoringCriteria {
  technical?: number;
  commercial?: number;
  quality?: number;
  socialValue?: number;
  total?: number;
  [key: string]: number | undefined;
}

export interface ComplexityScore {
  level: 'low' | 'medium' | 'high';
  drivers: string[];
}

export interface Keyword {
  term: string;
  weight?: number;
}

export interface TenderAnalysis {
  projectInfo: {
    type: string;
    client: string;
    location: string;
    value?: number;
    deadline?: string;
  };
  requirements: Requirements;
  evaluationCriteria: ScoringCriteria;
  regulatoryRequirements: Regulation[];
  proposalStructure: {
    sections: string[];
    wordLimits: WordLimits;
    format: Record<string, unknown>;
  };
  keyCompliancePoints: string[];
  winThemes: string[];
  recommendations: Recommendation[];
  complexity?: ComplexityScore;
  keywords?: Keyword[];
}

export interface Strategy {
  objectives: string[];
  approach: string;
  tone: string;
  differentiators: Differentiator[];
}

export interface ContentWeighting {
  [section: string]: number;
}

export interface Differentiator {
  title: string;
  proof?: string;
  relevance?: string;
}

export interface ProposalData {
  tenderAnalysis: TenderAnalysis;
  companyInfo?: Record<string, unknown>;
  projectInfo?: Record<string, unknown>;
  generationParams?: Record<string, unknown>;
}

export interface Context {
  [key: string]: unknown;
}

export interface WordLimits {
  [section: string]: number | undefined;
}

export interface ProposalSection {
  id?: string;
  title: string;
  content: unknown;
  wordCount?: number;
}

export interface Proposal {
  metadata: Record<string, unknown>;
  sections: Record<string, ProposalSection>;
  compliance?: Record<string, unknown>;
  recommendations?: Recommendation[];
}

export interface ComplianceReport {
  overall: string;
  score: number;
  maxScore: number;
  issues: string[];
  warnings: string[];
  recommendations: Recommendation[];
  checks: Record<string, unknown>;
}

export interface CompletenessReport {
  missing: string[];
  coverage: number;
}

export interface SpellCheckReport {
  issues: string[];
}

export interface LanguageReport {
  dialect: 'british' | 'american' | 'unknown';
  issues: string[];
}

export interface Score {
  total: number;
  breakdown: Record<string, number>;
}

export interface ProposalSectionFormatted {
  title: string;
  body: string;
}

export interface ProposalSectionOutput {
  sections: ProposalSectionFormatted[];
}

export interface ProposalMetadata {
  id: string;
  createdAt: string;
  projectName?: string;
}

export interface ProposalSummary {
  id: string;
  metadata: ProposalMetadata;
}

export interface BrandingAssets {
  logo?: Buffer;
  palette?: Record<string, string>;
  fonts?: string[];
}

export interface SignatureData {
  name: string;
  role: string;
  image?: Buffer;
}

export interface Recommendation {
  priority: string;
  category: string;
  recommendation: string;
  action?: string;
}

export interface WordCountReport {
  withinLimits: boolean;
  counts: Record<string, number>;
  limits: WordLimits;
}

export interface BidSmithSystem {
  inputProcessor: {
    parseUserInput(formData: FormInput): ProcessedInput;
    validateInput(input: ProcessedInput): ValidationResult;
    enrichInput(input: ProcessedInput): EnrichedInput;
  };
  analysisEngine: {
    extractRequirements(tenderText: string): Requirements;
    identifyRegulations(projectType: string, location: string): Regulation[];
    determineScoringCriteria(tenderText: string): ScoringCriteria;
    assessComplexity(requirements: Requirements): ComplexityScore;
    identifyKeywords(tenderText: string): Keyword[];
  };
  strategyEngine: {
    determineApproach(analysis: TenderAnalysis): Strategy;
    calculateContentWeighting(criteria: ScoringCriteria): ContentWeighting;
    identifyDifferentiators(companyStrengths: string[], competition: unknown): Differentiator[];
    formulateKeyMessages(strategy: Strategy): string[];
  };
  contentGenerator: {
    callOpenAI(prompt: string, context: Context): Promise<string>;
    generateExecutiveSummary(data: ProposalData): Promise<string>;
    generateUnderstanding(data: ProposalData): Promise<string>;
    generateMethodology(data: ProposalData): Promise<string>;
    generateExperience(data: ProposalData): Promise<string>;
    generateTeam(data: ProposalData): Promise<string>;
    generateHealthSafety(data: ProposalData): Promise<string>;
    generateQuality(data: ProposalData): Promise<string>;
    generateSustainability(data: ProposalData): Promise<string>;
    generateProgramme(data: ProposalData): Promise<string>;
    generateRiskManagement(data: ProposalData): Promise<string>;
  };
  complianceEngine: {
    injectCDMCompliance(content: string, role: string): string;
    injectBuildingRegsCompliance(content: string, projectType: string): string;
    injectNHSCompliance(content: string, htms: string[]): string;
    injectLondonRequirements(content: string, borough: string): string;
    injectSocialValue(content: string, projectValue: number): string;
  };
  optimizationEngine: {
    optimizeForScoring(content: string, criteria: ScoringCriteria): string;
    enhanceKeywords(content: string, keywords: string[]): string;
    improveReadability(content: string): string;
    addVisualElements(content: string): string;
    checkWordCount(content: string, limits: WordLimits): WordCountReport;
  };
  qaEngine: {
    validateCompliance(proposal: string): ComplianceReport;
    checkCompleteness(proposal: string, requirements: string[]): CompletenessReport;
    spellCheck(proposal: string): SpellCheckReport;
    checkBritishEnglish(proposal: string): LanguageReport;
    scoreProposal(proposal: string, criteria: ScoringCriteria): Score;
  };
  outputFormatter: {
    structureProposal(sections: ProposalSection[]): string;
    applyFormatting(content: string, style: unknown): string;
    generatePDF(proposal: string, branding: BrandingAssets): Buffer;
    generateWord(proposal: string): Buffer;
    addSignature(proposal: string, signature: SignatureData): string;
  };
  documentManager: {
    saveProposal(proposal: Proposal): Promise<string>;
    retrieveProposal(documentId: string): Promise<Proposal>;
    listProposals(userId: string): Promise<ProposalMetadata[]>;
    deleteProposal(documentId: string): Promise<boolean>;
  };
}
