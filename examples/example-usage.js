/**
 * BidSmith Example Usage
 * Demonstrates how to use BidSmith API
 */

// Example: Basic usage with Node.js fetch or axios

const API_BASE = 'http://localhost:3000/api';

// Example 1: Analyze a construction tender in London
async function analyzeConstructionTender() {
  const tenderData = {
    projectType: 'Construction',
    clientType: 'NHS Trust',
    location: 'London',
    projectValue: 5000000,
    submissionDeadline: '2024-12-31',
    documents: {
      // In a real scenario, these would be parsed documents
      description: 'Construction of new hospital wing',
      requirements: 'Full CDM 2015 compliance required'
    }
  };

  try {
    const response = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tenderData)
    });

    const result = await response.json();
    console.log('Analysis Result:', result);
    return result.analysis;
  } catch (error) {
    console.error('Error analyzing tender:', error);
  }
}

// Example 2: Generate a proposal
async function generateProposal(tenderAnalysis) {
  const inputData = {
    tenderAnalysis: tenderAnalysis,
    companyInfo: {
      name: 'ABC Construction Ltd',
      certifications: ['ISO 9001', 'ISO 14001', 'ISO 45001'],
      experience: ['Hospital construction', 'NHS projects', 'London construction'],
      nhsExperience: true,
      londonExperience: true
    },
    projectInfo: {
      name: 'New Hospital Wing Construction',
      client: 'London NHS Trust',
      location: 'London, UK'
    }
  };

  try {
    const response = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputData)
    });

    const result = await response.json();
    console.log('Generated Proposal:', result);
    return result.proposal;
  } catch (error) {
    console.error('Error generating proposal:', error);
  }
}

// Example 3: Validate proposal compliance
async function validateProposal(proposal, tenderAnalysis) {
  try {
    const response = await fetch(`${API_BASE}/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        proposal: proposal,
        tenderAnalysis: tenderAnalysis
      })
    });

    const result = await response.json();
    console.log('Validation Result:', result);
    return result.validation;
  } catch (error) {
    console.error('Error validating proposal:', error);
  }
}

// Example 4: Full workflow (analyze, generate, validate)
async function fullWorkflow() {
  const workflowData = {
    tenderData: {
      projectType: 'Construction',
      clientType: 'NHS Trust',
      location: 'London',
      projectValue: 5000000,
      submissionDeadline: '2024-12-31'
    },
    companyInfo: {
      name: 'ABC Construction Ltd',
      certifications: ['ISO 9001', 'ISO 14001', 'ISO 45001']
    },
    projectInfo: {
      name: 'New Hospital Wing',
      client: 'London NHS Trust'
    }
  };

  try {
    const response = await fetch(`${API_BASE}/full-workflow`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workflowData)
    });

    const result = await response.json();
    console.log('Full Workflow Result:', result);
    
    if (result.success) {
      const { analysis, proposal, validation } = result.workflow;
      
      console.log('\n=== ANALYSIS ===');
      console.log('Win Themes:', analysis.winThemes);
      console.log('Regulatory Requirements:', analysis.regulatoryRequirements.length);
      
      console.log('\n=== PROPOSAL ===');
      console.log('Sections Generated:', Object.keys(proposal.sections));
      
      console.log('\n=== VALIDATION ===');
      console.log('Compliance Status:', validation.overall);
      console.log('Compliance Score:', validation.score, '/', validation.maxScore);
      console.log('Issues:', validation.issues.length);
      console.log('Recommendations:', validation.recommendations);
    }
    
    return result;
  } catch (error) {
    console.error('Error in full workflow:', error);
  }
}

// Example 5: NHS-specific tender
async function analyzeNHSTender() {
  const nhsTenderData = {
    projectType: 'Construction',
    clientType: 'NHS Foundation Trust',
    location: 'London',
    projectValue: 10000000,
    documents: {
      description: 'Major hospital refurbishment in clinical areas',
      requirements: 'Must work in occupied building, HTM compliance required'
    }
  };

  const analysis = await analyzeConstructionTender();
  
  // The system automatically identifies:
  // - CDM 2015 requirements (construction)
  // - NHS procurement standards (NHS client)
  // - London requirements (London location)
  
  return analysis;
}

// Export for use in other files
export {
  analyzeConstructionTender,
  generateProposal,
  validateProposal,
  fullWorkflow,
  analyzeNHSTender
};

// Run example if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Running BidSmith example...\n');
  fullWorkflow().then(() => {
    console.log('\nExample completed!');
  });
}
