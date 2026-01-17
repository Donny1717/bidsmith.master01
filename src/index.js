/**
 * BidSmith - Premium AI-Powered Proposal Generation System
 * Main entry point for the application
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { TenderAnalyzer } from './analyzers/tender-analyzer.js';
import { ProposalGenerator } from './generators/proposal-generator.js';
import { ComplianceValidator } from './validators/compliance-validator.js';
import apiRoutes from './api/routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'BidSmith',
    version: '1.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'BidSmith - Premium AI-Powered Proposal Generator',
    version: '1.0.0',
    description: 'Expert system for winning UK construction and NHS tenders in London',
    endpoints: {
      health: '/health',
      api: '/api'
    }
  });
});

// Initialize BidSmith components
export const bidSmith = {
  analyzer: new TenderAnalyzer(),
  generator: new ProposalGenerator(),
  validator: new ComplianceValidator()
};

app.listen(PORT, () => {
  console.log(`🚀 BidSmith is running on port ${PORT}`);
  console.log(`📋 Service: Premium AI-Powered Proposal Generator`);
  console.log(`🎯 Specialization: UK Construction & NHS Tenders (London)`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET  /health - Health check`);
  console.log(`  GET  / - Service information`);
  console.log(`  POST /api/analyze - Analyze tender documents`);
  console.log(`  POST /api/generate - Generate proposal`);
  console.log(`  POST /api/validate - Validate compliance`);
});

export default app;
