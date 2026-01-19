/**
 * OpenAI integration for BidSmith.
 * Handles prompt construction with London requirements and resilient API calls.
 */
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { buildBidPrompt, SYSTEM_PROMPT } from '../prompts/bid-generator.js';
import { LONDON_REQUIREMENTS } from '../prompts/london-requirements.js';

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o';

function getClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

let regulationCache = '';
function loadRegulationContext() {
  if (regulationCache) return regulationCache;
  try {
    const docsDir = path.resolve(process.cwd(), 'docs');
    const files = fs.readdirSync(docsDir).filter(name => name.endsWith('.md'));
    const snippets = files.map(file => {
      const content = fs.readFileSync(path.join(docsDir, file), 'utf8');
      return `${file}: ${content.slice(0, 400)}...`;
    });
    regulationCache = snippets.join('\n');
  } catch (err) {
    regulationCache = 'Regulation documents unavailable at runtime.';
  }
  return regulationCache;
}

async function withRetry(fn, attempts = 3, delayMs = 500) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const isLast = attempt === attempts;
      const backoff = delayMs * attempt;
      if (isLast) break;
      await new Promise(resolve => setTimeout(resolve, backoff));
    }
  }
  throw lastError;
}

/**
 * Generate a bid response (non-streaming).
 */
export async function generateBidResponse(params) {
  const {
    tenderAnalysis,
    tenderText,
    companyProfile,
    signature,
    projectContext,
    temperature = 0.4
  } = params;

  const client = getClient();
  const prompt = buildBidPrompt({
    analysis: tenderAnalysis,
    tenderText,
    companyProfile,
    signature,
    projectContext,
    regulationContext: loadRegulationContext(),
    londonRequirements: LONDON_REQUIREMENTS
  });

  const completion = await withRetry(() =>
    client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      temperature,
      max_tokens: 1800
    })
  );

  const content = completion.choices?.[0]?.message?.content || '';
  return {
    content,
    usage: completion.usage,
    model: completion.model
  };
}

/**
 * Stream a bid response using server-sent events.
 */
export async function streamBidResponse(params) {
  const {
    tenderAnalysis,
    tenderText,
    companyProfile,
    signature,
    projectContext,
    temperature = 0.5,
    onToken
  } = params;

  const client = getClient();
  const prompt = buildBidPrompt({
    analysis: tenderAnalysis,
    tenderText,
    companyProfile,
    signature,
    projectContext,
    regulationContext: loadRegulationContext(),
    londonRequirements: LONDON_REQUIREMENTS
  });

  const stream = await client.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: prompt }
    ],
    temperature,
    stream: true,
    max_tokens: 2400
  });

  let accumulated = '';
  for await (const chunk of stream) {
    const delta = chunk.choices?.[0]?.delta?.content || '';
    accumulated += delta;
    if (delta && typeof onToken === 'function') {
      onToken(delta);
    }
  }

  return accumulated;
}
