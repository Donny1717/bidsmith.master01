// backend/src/api/openai.js
const OpenAI = require('openai');

const MODEL_ANALYZE = process.env.OPENAI_MODEL_ANALYZE || 'gpt-4-turbo-preview';
const MODEL_GENERATE = process.env.OPENAI_MODEL_GENERATE || 'gpt-4-turbo-preview';

let openaiClient = null;

function getClient() {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      console.warn('[openai] OPENAI_API_KEY missing; AI features disabled');
      return null;
    }
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

async function analyzeTenderDocument(text) {
  const client = getClient();
  if (!client) {
    throw new Error('OpenAI client not configured');
  }

  if (!text || typeof text !== 'string') {
    throw new Error('analyzeTenderDocument requires text input');
  }

  try {
    console.info('[openai] Analyzing tender document (chars):', text.length);

    const response = await client.chat.completions.create({
      model: MODEL_ANALYZE,
      messages: [
        {
          role: 'system',
          content: `You are a London tender analysis expert. Extract:
1. All scored questions with word limits
2. Evaluation criteria
3. London-specific requirements (Construction Logistics Plan, Section 106, NRMM/ULEZ, Net Zero)
4. Social Value requirements
5. Deadline and contract value

Return strict JSON with keys: questionList, evaluationCriteria, londonRequirements, socialValue, deadline, contractValue.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.2,
    });

    const raw = response.choices?.[0]?.message?.content || '{}';
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (parseErr) {
      console.error('[openai] JSON parse failed; returning raw content', parseErr);
      throw new Error('Failed to parse analysis output');
    }

    return parsed;
  } catch (err) {
    console.error('[openai] analyzeTenderDocument error:', err.message);
    throw err;
  }
}

async function generateBidResponse(questionData, companyData) {
  const client = getClient();
  if (!client) {
    throw new Error('OpenAI client not configured');
  }

  if (!questionData) {
    throw new Error('generateBidResponse requires questionData');
  }

  try {
    console.info('[openai] Generating bid response for question:', questionData.id || 'unknown');

    const response = await client.chat.completions.create({
      model: MODEL_GENERATE,
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

Use professional UK English. Be specific, measurable, and evidence-based.`,
        },
        {
          role: 'user',
          content: JSON.stringify({ questionData, companyData }),
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices?.[0]?.message?.content || '';
    if (!content) {
      throw new Error('Empty bid response from OpenAI');
    }

    return content;
  } catch (err) {
    console.error('[openai] generateBidResponse error:', err.message);
    throw err;
  }
}

module.exports = {
  analyzeTenderDocument,
  generateBidResponse,
  getClient,
};
