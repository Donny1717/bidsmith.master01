const express = require('express');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');

const { createCheckoutSession, verifyCheckoutSession, handleWebhook, getPaymentDetails } = require('./stripe');
const { saveSignature, getSignature, deleteSignature } = require('./signature');
const { initFirebaseAdmin } = require('./firebaseAdmin');

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  })
);

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'image/png',
      'image/jpeg'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, PNG, JPG allowed.'));
    }
  }
});

// Stripe webhook must use raw body before JSON parser
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const result = await handleWebhook(req);
    res.status(200).json(result);
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/api/health', (req, res) => {
  let firebaseOk = false;
  let firebaseMessage = 'Not configured';

  try {
    initFirebaseAdmin();
    firebaseOk = true;
    firebaseMessage = 'Firebase Admin initialized';
  } catch (err) {
    firebaseMessage = err.message;
  }

  const openaiOk = !!process.env.OPENAI_API_KEY;

  const status = firebaseOk && openaiOk ? 'ok' : 'degraded';

  res.json({
    status,
    checks: {
      firebaseAdmin: { ok: firebaseOk, message: firebaseMessage },
      openai: { ok: openaiOk, message: openaiOk ? 'OpenAI key present' : 'OpenAI key missing' }
    },
    timestamp: new Date().toISOString()
  });
});

app.post('/api/upload', upload.array('files', 10), async (req, res) => {
  try {
    const files = req.files;
    const companyDetails = req.body;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files uploaded'
      });
    }

    console.log(`Uploaded ${files.length} files`);
    if (companyDetails?.companyName) {
      console.log('Company:', companyDetails.companyName);
    }

    const analysisId = `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    res.json({
      success: true,
      message: 'Files uploaded successfully',
      analysisId,
      fileCount: files.length,
      files: files.map(f => ({
        name: f.originalname,
        size: f.size,
        type: f.mimetype
      }))
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/analyze', async (req, res) => {
  try {
    const { analysisId } = req.body;

    if (!analysisId) {
      return res.status(400).json({
        success: false,
        error: 'analysisId is required'
      });
    }

    console.log(`Analyzing tender: ${analysisId}`);

    res.json({
      success: true,
      analysisId,
      tender: {
        title: 'Westminster Council Road Improvement',
        deadline: '2026-02-15T12:00:00Z',
        value: 850000
      },
      questions: 18,
      wordLimit: 12500,
      complianceScore: 87,
      londonRequirements: [
        { name: 'Construction Logistics Plan', required: true, present: true },
        { name: 'NRMM/ULEZ Compliance', required: true, present: true },
        { name: 'Section 106 Social Value', required: true, present: true, minScore: 25 },
        { name: 'Net Zero Commitment', required: true, present: true, target: 2030 },
        { name: 'Traffic Management Plan', required: true, present: false }
      ],
      questionList: [
        { id: 'q1', title: 'Methodology & Approach', wordLimit: 1500, marks: 20, status: 'pending' },
        { id: 'q2', title: 'Risk Management', wordLimit: 1000, marks: 15, status: 'pending' },
        { id: 'q3', title: 'Social Value Plan', wordLimit: 2000, marks: 25, status: 'pending' },
        { id: 'q4', title: 'Health & Safety', wordLimit: 1500, marks: 15, status: 'pending' },
        { id: 'q5', title: 'Quality Management', wordLimit: 1000, marks: 10, status: 'pending' }
      ]
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/generate', async (req, res) => {
  try {
    const { analysisId, questionId } = req.body;

    if (!analysisId || !questionId) {
      return res.status(400).json({
        success: false,
        error: 'analysisId and questionId are required'
      });
    }

    console.log(`Generating response for ${questionId}`);

    res.json({
      success: true,
      questionId,
      content: `## Executive Summary

Our approach to ${questionId} combines proven methodologies with London-specific compliance requirements.

## Methodology

1. Planning Phase
   - Construction Logistics Plan aligned with TfL requirements
   - NRMM Stage V compliance for all equipment
   - ULEZ-compliant vehicle fleet

2. Execution Phase
   - 8 apprenticeships (exceeds 5 minimum requirement)
   - 60% workforce from Westminster
   - GBP 170,000 to local SMEs (20% of contract value)

## Evidence

Previous projects:
- Westminster Bridge Refurbishment (2024) - GBP 2.1M
- Camden Street Improvement (2023) - GBP 1.5M

## Risk Management

| Risk | Mitigation | Owner |
|------|-----------|-------|
| Traffic disruption | Off-peak working hours | Site Manager |
| Weather delays | Buffer time in programme | Project Director |

## KPIs

- Zero RIDDOR incidents
- 95% local employment target
- Net Zero carbon by 2030

## Compliance

Section 106 obligations met (25+ points)
ISO 9001, 14001, 45001 certified
Constructionline Gold member`,
      wordCount: 247,
      coverageScore: 92,
      sections: {
        summary: true,
        approach: true,
        evidence: true,
        risks: true,
        kpis: true,
        compliance: true
      }
    });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/signature', async (req, res) => {
  try {
    const { userId, bidId, signatureData, signatoryName, signatoryPosition } = req.body;

    if (!userId || !bidId || !signatureData || !signatoryName) {
      return res.status(400).json({
        success: false,
        error: 'userId, bidId, signatureData, and signatoryName are required'
      });
    }

    const signature = await saveSignature({
      userId,
      bidId,
      signatureData,
      signatoryName,
      signatoryPosition: signatoryPosition || 'Director',
      timestamp: new Date().toISOString(),
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    res.json({
      success: true,
      signatureId: signature.id,
      message: 'Signature saved successfully',
      auditTrail: {
        timestamp: signature.timestamp,
        signatory: signature.signatoryName,
        ipAddress: signature.ipAddress
      }
    });
  } catch (error) {
    console.error('Signature error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/signature/:bidId', async (req, res) => {
  try {
    const { bidId } = req.params;
    const signature = await getSignature(bidId);

    if (!signature) {
      return res.status(404).json({
        success: false,
        error: 'Signature not found'
      });
    }

    res.json({
      success: true,
      signature
    });
  } catch (error) {
    console.error('Get signature error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.delete('/api/signature/:bidId', async (req, res) => {
  try {
    const { bidId } = req.params;
    await deleteSignature(bidId);

    res.json({
      success: true,
      message: 'Signature deleted'
    });
  } catch (error) {
    console.error('Delete signature error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/stripe/checkout', async (req, res) => {
  try {
    const { userId, userEmail, bidId } = req.body;

    if (!userId || !userEmail) {
      return res.status(400).json({
        success: false,
        error: 'userId and userEmail are required'
      });
    }

    const session = await createCheckoutSession({
      userId,
      userEmail,
      bidId: bidId || 'no_bid_yet'
    });

    res.json({
      success: true,
      sessionId: session.sessionId,
      url: session.url
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/stripe/verify/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const payment = await verifyCheckoutSession(sessionId);

    res.json({
      success: true,
      payment
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/payment/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const payment = await getPaymentDetails(sessionId);

    res.json({
      success: true,
      payment
    });
  } catch (error) {
    console.error('Payment retrieval error:', error);
    res.status(404).json({
      success: false,
      error: 'Payment not found'
    });
  }
});

app.post('/api/pdf/generate', async (req, res) => {
  try {
    const { bidId, userId } = req.body;

    if (!bidId || !userId) {
      return res.status(400).json({
        success: false,
        error: 'bidId and userId are required'
      });
    }

    console.log(`Generating PDF for bid: ${bidId}`);

    res.json({
      success: true,
      pdfUrl: `https://storage.googleapis.com/bidsmith/${bidId}.pdf`,
      fileName: `BidSmith_${bidId}.pdf`,
      size: '8.4 MB'
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: error.message || 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`
========================================
   BidSmith ASF API Server Running
========================================

Port: ${PORT}
Environment: ${process.env.NODE_ENV || 'development'}

Endpoints:
   GET  /api/health
   POST /api/upload
   POST /api/analyze
   POST /api/generate
   POST /api/signature
   GET  /api/signature/:bidId
   POST /api/stripe/checkout
   GET  /api/stripe/verify/:sessionId
   POST /api/stripe/webhook
   POST /api/pdf/generate

Configured:
   Stripe: ${process.env.STRIPE_SECRET_KEY ? 'yes' : 'no'}
   Firebase: ${process.env.FIREBASE_ADMIN_PROJECT_ID ? 'yes' : 'no'}
   OpenAI: ${process.env.OPENAI_API_KEY ? 'yes' : 'no'}
`);
});

module.exports = app;
