# BidSmith Usage Guide

## Overview

BidSmith is a sophisticated AI-powered proposal generation system designed to help you win UK construction and NHS tenders in London. The system combines expert knowledge of UK regulations with intelligent proposal generation.

## Quick Start

### 1. Installation

```bash
npm install
```

### 2. Configuration

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
NODE_ENV=development
```

### 3. Start the Server

```bash
npm start
```

## API Endpoints

### Analyze Tender Documents

**POST** `/api/analyze`

Analyzes tender documents to extract requirements, evaluation criteria, and regulatory needs.

**Request Body:**
```json
{
  "documents": {},
  "projectType": "Construction",
  "clientType": "NHS Trust",
  "location": "London",
  "projectValue": 5000000,
  "submissionDeadline": "2024-12-31",
  "additionalContext": {}
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "projectInfo": {...},
    "requirements": {...},
    "regulatoryRequirements": [...],
    "evaluationCriteria": {...},
    "winThemes": [...],
    "recommendations": [...]
  }
}
```

### Generate Proposal

**POST** `/api/generate`

Generates a complete proposal based on tender analysis.

**Request Body:**
```json
{
  "tenderAnalysis": {...},
  "companyInfo": {
    "name": "Your Company Name",
    "experience": [...],
    "certifications": [...]
  },
  "projectInfo": {
    "name": "Project Name",
    "client": "Client Name"
  }
}
```

**Response:**
```json
{
  "success": true,
  "proposal": {
    "sections": {
      "executiveSummary": {...},
      "technicalResponse": {...},
      "commercialResponse": {...}
    },
    "compliance": {...}
  }
}
```

### Validate Compliance

**POST** `/api/validate`

Validates a proposal against regulatory requirements.

**Request Body:**
```json
{
  "proposal": {...},
  "tenderAnalysis": {...}
}
```

**Response:**
```json
{
  "success": true,
  "validation": {
    "overall": "compliant",
    "score": 95,
    "maxScore": 100,
    "issues": [],
    "recommendations": [...]
  }
}
```

### Full Workflow

**POST** `/api/full-workflow`

Complete workflow: analyze, generate, and validate in one call.

**Request Body:**
```json
{
  "tenderData": {...},
  "companyInfo": {...},
  "projectInfo": {...}
}
```

## Knowledge Bases

BidSmith includes comprehensive knowledge bases for:

### CDM 2015 (Construction Design and Management Regulations)
- Duty holder requirements
- Pre-construction information
- Construction phase plans
- Health and safety files
- Compliance checkpoints

### UK Construction Law
- Building Regulations 2010
- Health and Safety at Work Act 1974
- Environmental regulations
- Planning requirements
- Contract types (JCT, NEC)

### NHS Procurement Standards
- Clinical environment requirements
- Infection control (HTM compliance)
- Social value commitments
- Procurement principles
- Evaluation criteria

### London-Specific Requirements
- Transport and logistics (ULEZ, Congestion Charge)
- Environmental management (air quality, noise)
- Planning requirements (London Plan)
- Community engagement
- Heritage considerations

### Proposal Strategies
- Win theme development
- Proposal structure
- Compliance strategies
- Differentiation approaches
- Common mistakes to avoid

## Example Workflow

```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

// Step 1: Analyze tender
const analysisResponse = await axios.post(`${API_BASE}/analyze`, {
  projectType: 'Construction',
  clientType: 'NHS Trust',
  location: 'London',
  projectValue: 5000000
});

const analysis = analysisResponse.data.analysis;

// Step 2: Generate proposal
const proposalResponse = await axios.post(`${API_BASE}/generate`, {
  tenderAnalysis: analysis,
  companyInfo: {
    name: 'Your Construction Company Ltd',
    certifications: ['ISO 9001', 'ISO 14001', 'ISO 45001']
  },
  projectInfo: {
    name: 'New Hospital Wing Construction',
    client: 'London NHS Trust'
  }
});

const proposal = proposalResponse.data.proposal;

// Step 3: Validate compliance
const validationResponse = await axios.post(`${API_BASE}/validate`, {
  proposal: proposal,
  tenderAnalysis: analysis
});

const validation = validationResponse.data.validation;

console.log('Compliance Status:', validation.overall);
console.log('Compliance Score:', validation.score, '/', validation.maxScore);
```

## Best Practices

1. **Always analyze first**: Use the `/api/analyze` endpoint to understand requirements before generating
2. **Customize content**: The generated proposal includes placeholders - customize with your specific details
3. **Validate compliance**: Always validate before submission to ensure regulatory compliance
4. **Review win themes**: Ensure win themes are relevant to your company's strengths
5. **Add case studies**: Include specific examples from your previous projects
6. **Proofread**: AI-generated content should be reviewed and edited by humans

## Regulatory Compliance

BidSmith automatically identifies and addresses:

- **CDM 2015**: For all construction projects
- **NHS Standards**: For healthcare/NHS tenders
- **London Requirements**: For London-based projects
- **General UK Construction Law**: For all UK construction projects

The system ensures all mandatory elements are included and validates compliance before proposal completion.

## Support

For questions or issues, please refer to the main README.md or review the knowledge base files in `src/knowledge-base/`.
