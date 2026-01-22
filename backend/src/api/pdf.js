// backend/src/api/pdfGenerator.js
const puppeteer = require('puppeteer');

const BRAND_PRIMARY = '#0A1F44';
const BRAND_ACCENT = '#D4AF37';

function buildHtml({ bidContent, signature, metadata }) {
  const signatureImg = signature?.signatureData
    ? `<img src="${signature.signatureData}" alt="Signature" style="max-width:200px;" />`
    : '<p style="color:#888;">No signature</p>';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>BidSmith ASF</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 24px; color: #0f172a; }
    h1, h2, h3 { color: ${BRAND_PRIMARY}; margin-bottom: 8px; }
    .header { border-bottom: 3px solid ${BRAND_ACCENT}; padding-bottom: 12px; margin-bottom: 24px; }
    .section { margin-bottom: 20px; }
    .meta { font-size: 12px; color: #475569; }
    .badge { display: inline-block; padding: 4px 8px; background: ${BRAND_ACCENT}; color: #0A1F44; border-radius: 4px; font-weight: 600; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    td, th { border: 1px solid #e2e8f0; padding: 8px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="badge">BidSmith ASF</div>
    <h1>Submission-ready Bid</h1>
    <div class="meta">Generated: ${metadata?.generatedAt || new Date().toISOString()}</div>
    <div class="meta">Version: ${metadata?.version || '1.0.0'}</div>
  </div>

  <div class="section">
    ${bidContent?.generated_content || '<p>No bid content found.</p>'}
  </div>

  <div class="section">
    <h2>Electronic Signature</h2>
    ${signatureImg}
    <p class="meta">
      Signed by: ${signature?.signatoryName || 'N/A'} (${signature?.signatoryPosition || 'N/A'})<br/>
      Signed at: ${signature?.timestamp || 'N/A'}<br/>
      IP: ${signature?.ipAddress || 'N/A'}<br/>
      Compliance: UK Electronic Communications Act 2000
    </p>
  </div>
</body>
</html>
`;
}

async function generatePDF({ bidContent, signature, metadata }) {
  try {
    const html = buildHtml({ bidContent, signature, metadata });
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '15mm', bottom: '15mm', left: '12mm', right: '12mm' },
    });
    await browser.close();
    console.info('[pdf] generated size bytes:', buffer.length);
    return buffer;
  } catch (err) {
    console.error('[pdf] generation error', err);
    throw new Error('Failed to generate PDF');
  }
}

module.exports = {
  generatePDF,
};
