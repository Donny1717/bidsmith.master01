# BidSmith System Overview

## Executive Summary

BidSmith is a premium AI-powered proposal generation system specifically designed to WIN construction and NHS tenders in London, UK. This is an expert system that understands UK Construction Law, CDM 2015, NHS Procurement Standards, London-specific requirements, competitive tender psychology, and winning proposal strategies.

## System Architecture

```
BidSmith/
├── src/
│   ├── knowledge-base/           # Regulatory knowledge modules
│   │   ├── cdm2015.js           # CDM 2015 Regulations
│   │   ├── uk-construction-law.js # UK Construction Law
│   │   ├── nhs-procurement.js    # NHS Procurement Standards
│   │   ├── london-requirements.js # London-specific requirements
│   │   └── proposal-strategies.js # Winning strategies
│   │
│   ├── analyzers/                # Analysis engines
│   │   └── tender-analyzer.js    # Tender document analysis
│   │
│   ├── generators/               # Proposal generation
│   │   └── proposal-generator.js # AI proposal generation
│   │
│   ├── validators/               # Compliance validation
│   │   └── compliance-validator.js # Regulatory compliance checking
│   │
│   ├── api/                      # API interface
│   │   └── routes.js             # Express API routes
│   │
│   └── index.js                  # Main application entry
│
├── config/                       # Configuration files
├── docs/                         # Documentation
├── examples/                     # Usage examples
└── package.json                  # Dependencies
```

## Core Components

### 1. Knowledge Base System

BidSmith includes comprehensive knowledge bases covering:

#### CDM 2015 (Construction Design and Management Regulations 2015)
- **Duty Holders**: Client, Principal Designer, Principal Contractor, Designers, Contractors
- **Pre-Construction Information**: Required elements and management
- **Construction Phase Plan**: Health and safety arrangements
- **Health and Safety File**: Documentation for future work
- **Compliance Points**: Common failures and winning strategies

#### UK Construction Law
- **Building Regulations 2010**: All 14 parts (structural, fire, drainage, etc.)
- **Health and Safety at Work Act 1974**: Risk assessment, safe systems
- **Planning Requirements**: London Plan, borough requirements
- **Contract Types**: JCT, NEC contracts
- **Standards**: ISO 9001, ISO 14001, ISO 45001, PAS 91

#### NHS Procurement Standards
- **Clinical Environment Requirements**: Infection control, patient safety
- **HTM Compliance**: Health Technical Memoranda (00-01, 00-03, 00-09, etc.)
- **Procurement Principles**: Value for money, social value, transparency
- **Evaluation Criteria**: Technical, commercial, quality, social value
- **Required Documentation**: NHS PQQ, SSQ, method statements

#### London-Specific Requirements
- **Transport**: ULEZ compliance, congestion charge, TfL requirements
- **Environmental**: Air quality, noise control, waste management
- **Planning**: London Plan alignment, borough requirements
- **Community**: Engagement, local employment, SME support
- **Heritage**: Listed buildings, conservation areas

#### Proposal Strategies
- **Win Themes**: Key differentiating messages
- **Structure**: Executive summary, technical, commercial, supporting
- **Compliance**: Responsiveness checklist
- **Differentiation**: Unique selling points
- **Common Mistakes**: What to avoid

### 2. Tender Analyzer

The Tender Analyzer extracts:
- Project requirements (technical, commercial, legal)
- Evaluation criteria and weightings
- Regulatory requirements (CDM 2015, NHS, London)
- Key compliance points
- Win theme recommendations
- Proposal structure requirements

**Key Features:**
- Automatic regulatory requirement identification
- Evaluation criteria extraction
- Win theme generation
- Compliance point identification
- Recommendation generation

### 3. Proposal Generator

The Proposal Generator creates:
- **Executive Summary**: Compelling overview with win themes
- **Technical Response**: Detailed methodology, project management, H&S, quality, risk, program
- **Commercial Response**: Pricing, value for money, payment terms
- **Supporting Information**: Structure for case studies, personnel, certifications

**Key Features:**
- CDM 2015 compliant sections
- NHS-specific clinical environment sections
- London-specific considerations
- Regulatory phrase integration
- Compliance element compilation

### 4. Compliance Validator

The Compliance Validator checks:
- **CDM 2015 Compliance**: Duty holders, pre-construction info, construction phase plan, H&S file
- **NHS Compliance**: Infection control, clinical environment, HTM, social value
- **London Compliance**: Transport, environmental, planning, community
- **General Compliance**: Format, requirements, documentation

**Validation Output:**
- Overall compliance status (compliant / mostly_compliant / non_compliant)
- Compliance score (0-100)
- Specific issues and warnings
- Actionable recommendations

## Workflow

### Standard Workflow

1. **Analyze Tender** (`POST /api/analyze`)
   - Input: Tender documents and metadata
   - Output: Comprehensive analysis with requirements, regulatory needs, win themes

2. **Generate Proposal** (`POST /api/generate`)
   - Input: Tender analysis + company info + project info
   - Output: Complete proposal with all sections

3. **Validate Compliance** (`POST /api/validate`)
   - Input: Generated proposal + tender analysis
   - Output: Compliance validation with score and recommendations

### Full Workflow

**Single API Call** (`POST /api/full-workflow`)
- Performs all three steps automatically
- Returns complete analysis, proposal, and validation

## Regulatory Compliance

### Automatic Compliance

BidSmith automatically:

1. **Identifies Required Regulations**
   - Construction projects → CDM 2015
   - NHS clients → NHS Procurement Standards
   - London location → London Requirements

2. **Generates Compliant Content**
   - Includes all mandatory elements
   - Uses regulatory key phrases
   - Addresses compliance points

3. **Validates Compliance**
   - Checks all regulatory requirements
   - Scores compliance (0-100)
   - Identifies missing elements

### Compliance Coverage

- ✅ CDM 2015 (Construction Design and Management Regulations 2015)
- ✅ Building Regulations 2010
- ✅ Health and Safety at Work Act 1974
- ✅ NHS Procurement Standards
- ✅ Health Technical Memoranda (HTMs)
- ✅ London Plan Requirements
- ✅ Environmental Regulations
- ✅ Planning Requirements
- ✅ Contract Law (JCT, NEC)

## Key Differentiators

1. **Expert System**: Not just a generator, but an expert system with deep regulatory knowledge
2. **UK-Specific**: Built specifically for UK construction and NHS tenders
3. **London-Focused**: Understands London-specific requirements and challenges
4. **Compliance-First**: Ensures regulatory compliance is built into every proposal
5. **Winning Strategies**: Implements proven strategies for winning tenders
6. **Intelligent Analysis**: Deep analysis of tender requirements and evaluation criteria

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Health check |
| `/api/analyze` | POST | Analyze tender documents |
| `/api/generate` | POST | Generate proposal |
| `/api/validate` | POST | Validate compliance |
| `/api/full-workflow` | POST | Complete workflow |
| `/api/knowledge-base` | GET | Knowledge base info |

## Usage Example

```javascript
// Complete workflow in one call
const result = await fetch('/api/full-workflow', {
  method: 'POST',
  body: JSON.stringify({
    tenderData: {
      projectType: 'Construction',
      clientType: 'NHS Trust',
      location: 'London',
      projectValue: 5000000
    },
    companyInfo: {
      name: 'Your Company',
      certifications: ['ISO 9001', 'ISO 14001']
    }
  })
});

const { analysis, proposal, validation } = await result.json();

// Proposal is automatically:
// - CDM 2015 compliant
// - NHS compliant
// - London compliant
// - Validated for compliance
```

## Future Enhancements

Potential areas for expansion:
- Document parsing (Word, PDF parsing for automatic requirement extraction)
- AI-powered content refinement (OpenAI integration for enhanced content)
- Template library (Sector-specific proposal templates)
- Version control (Proposal versioning and comparison)
- Export formats (PDF, Word export with formatting)
- Analytics (Win rate tracking, proposal performance metrics)

## Support and Documentation

- **Main README**: `README.md`
- **Usage Guide**: `docs/USAGE.md`
- **System Overview**: `docs/SYSTEM_OVERVIEW.md`
- **Examples**: `examples/example-usage.js`
- **Knowledge Bases**: `src/knowledge-base/`

---

**BidSmith** - The expert system for winning UK construction and NHS tenders.
