/**
 * Configuration Example
 * Copy this to config.js and fill in your values
 */

export default {
  server: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development'
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
    maxTokens: 4000,
    temperature: 0.7
  },
  bidSmith: {
    logLevel: process.env.LOG_LEVEL || 'info',
    maxProposalLength: parseInt(process.env.MAX_PROPOSAL_LENGTH) || 50000,
    enableComplianceCheck: process.env.ENABLE_COMPLIANCE_CHECK !== 'false'
  }
};
