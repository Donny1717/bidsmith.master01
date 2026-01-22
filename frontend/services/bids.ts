import {
  analyzeTender,
  createCheckout,
  generateBidResponse,
  getPaymentDetails,
  saveSignature,
  uploadTender,
  verifyPayment,
} from "../lib/api";

export const bidsService = {
  uploadTender,
  analyzeTender,
  generateBidResponse,
  saveSignature,
  createCheckout,
  verifyPayment,
  getPaymentDetails,
};
