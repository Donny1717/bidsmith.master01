/**
 * Simple PDF generation stub.
 * Extend this module to produce real PDFs or integrate with storage.
 */

async function generatePdf({ bidId, userId }) {
  if (!bidId || !userId) {
    throw new Error('bidId and userId are required');
  }

  return {
    pdfUrl: `https://storage.googleapis.com/bidsmith/${bidId}.pdf`,
    fileName: `BidSmith_${bidId}.pdf`,
    size: '8.4 MB'
  };
}

module.exports = {
  generatePdf
};
