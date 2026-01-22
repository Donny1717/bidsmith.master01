const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function analyzeTenderDocument(text) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are a London tender analysis expert. Extract:
1. All scored questions with word limits
2. Evaluation criteria
3. London-specific requirements (Construction Logistics Plan, Section 106, NRMM/ULEZ, Net Zero)
4. Social Value requirements
5. Deadline and contract value

Return JSON format.`
      },
      {
        role: 'user',
        content: text
      }
    ],
    temperature: 0.3
  });

  return JSON.parse(response.choices[0].message.content);
}

async function generateBidResponse(questionData, companyData) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are a professional bid writer specializing in London construction tenders.

Generate a response following this 6-part structure:
1. Executive Summary
2. Methodology & Approach
3. Evidence from Previous Projects
4. Risk Management
5. KPIs & Measurable Outcomes
6. Compliance & Certifications

Include London-specific elements:
- Construction Logistics Plan compliance
- NRMM Stage V and ULEZ requirements
- Section 106 social value commitments
- Net Zero carbon targets
- Local employment and SME engagement

Use professional UK English. Be specific, measurable, and evidence-based.`
      },
      {
        role: 'user',
        content: JSON.stringify({ questionData, companyData })
      }
    ],
    max_tokens: 2000,
    temperature: 0.7
  });

  return response.choices[0].message.content;
}

module.exports = {
  analyzeTenderDocument,
  generateBidResponse
};
