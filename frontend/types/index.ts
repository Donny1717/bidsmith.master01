export interface Requirement {
  name: string;
  required: boolean;
  present: boolean;
}

export interface Question {
  id: string;
  title: string;
  wordLimit: number;
  marks: number;
}

export interface TenderSummary {
  title: string;
  deadline: string;
  value: number;
  questions: Question[];
  requirements: Requirement[];
}

export interface SignaturePayload {
  userId: string;
  bidId: string;
  signatureData: string;
  signatoryName: string;
  signatoryPosition: string;
}
