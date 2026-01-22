const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface UploadResponse {
  success: boolean;
  analysisId: string;
  fileCount: number;
}

interface AnalysisResponse {
  success: boolean;
  tender: {
    title: string;
    deadline: string;
    value: number;
  };
  questions: number;
  complianceScore: number;
  londonRequirements: Array<{
    name: string;
    required: boolean;
    present: boolean;
  }>;
  questionList: Array<{
    id: string;
    title: string;
    wordLimit: number;
    marks: number;
  }>;
}

interface SignatureResponse {
  success: boolean;
  signatureId: string;
  auditTrail: {
    timestamp: string;
    signatory: string;
    ipAddress: string;
  };
}

interface CheckoutResponse {
  success: boolean;
  sessionId: string;
  url: string;
}

// Upload tender files
export async function uploadTender(
  files: File[],
  companyDetails: Record<string, any>
): Promise<UploadResponse> {
  const formData = new FormData();

  files.forEach(file => {
    formData.append('files', file);
  });

  Object.keys(companyDetails).forEach(key => {
    formData.append(key, companyDetails[key]);
  });

  const response = await fetch(`${API_BASE_URL}/api/upload`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Upload failed');
  }

  return response.json();
}

// Analyze tender
export async function analyzeTender(analysisId: string): Promise<AnalysisResponse> {
  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ analysisId })
  });

  if (!response.ok) {
    throw new Error('Analysis failed');
  }

  return response.json();
}

// Generate bid response
export async function generateBidResponse(data: {
  analysisId: string;
  questionId: string;
  companyDetails: any;
}) {
  const response = await fetch(`${API_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Generation failed');
  }

  return response.json();
}

// Save signature
export async function saveSignature(data: {
  userId: string;
  bidId: string;
  signatureData: string;
  signatoryName: string;
  signatoryPosition: string;
}): Promise<SignatureResponse> {
  const response = await fetch(`${API_BASE_URL}/api/signature`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Signature save failed');
  }

  return response.json();
}

// Create Stripe checkout
export async function createCheckout(data: {
  userId: string;
  userEmail: string;
  bidId: string;
}): Promise<CheckoutResponse> {
  const response = await fetch(`${API_BASE_URL}/api/stripe/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Checkout creation failed');
  }

  return response.json();
}

// Verify payment
export async function verifyPayment(sessionId: string) {
  const response = await fetch(`${API_BASE_URL}/api/stripe/verify/${sessionId}`);

  if (!response.ok) {
    throw new Error('Payment verification failed');
  }

  return response.json();
}

// Get payment details
export async function getPaymentDetails(sessionId: string) {
  const response = await fetch(`${API_BASE_URL}/api/payment/${sessionId}`);

  if (!response.ok) {
    throw new Error('Payment not found');
  }

  return response.json();
}
