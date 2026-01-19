/**
 * PDF parsing utilities using pdf-parse.
 * Extracts raw text plus structured sections, questions, and scoring criteria.
 */
import pdf from 'pdf-parse';

function splitIntoSections(text) {
  const sections = [];
  const lines = text.split('\n');
  let current = { title: 'Introduction', content: [] };

  lines.forEach(line => {
    const trimmed = line.trim();
    const isHeading = /^(\d+(\.\d+)*)\s+/.test(trimmed) || /^[A-Z][A-Z\s]{6,}$/.test(trimmed);

    if (isHeading) {
      if (current.content.length) {
        sections.push({ ...current, content: current.content.join(' ').trim() });
      }
      current = { title: trimmed, content: [] };
    } else if (trimmed) {
      current.content.push(trimmed);
    }
  });

  if (current.content.length) {
    sections.push({ ...current, content: current.content.join(' ').trim() });
  }

  return sections;
}

function extractQuestions(text) {
  const lines = text.split('\n');
  const questions = [];

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (/^(q(uestion)?\s*\d+[:.)-]|question)/i.test(trimmed) || /\?\s*$/.test(trimmed)) {
      questions.push({
        id: `q${idx}`,
        text: trimmed,
        wordLimit: findWordLimit(trimmed)
      });
    }
  });

  return questions;
}

function findWordLimit(text) {
  const match = text.match(/(\d{2,5})\s*words?/i);
  return match ? Number(match[1]) : null;
}

function extractScoringCriteria(text) {
  const criteria = [];
  const scoringRegex = /(\d{1,3})%\s+(?:quality|technical|price|commercial|social value|weighting)/gi;
  let match;
  while ((match = scoringRegex.exec(text)) !== null) {
    criteria.push({
      weighting: Number(match[1]),
      criterion: match[0]
    });
  }
  return criteria;
}

export async function parsePdfBuffer(buffer) {
  const parsed = await pdf(buffer);
  const text = parsed.text || '';
  const sections = splitIntoSections(text);
  const questions = extractQuestions(text);
  const scoringCriteria = extractScoringCriteria(text);

  return {
    type: 'pdf',
    text,
    sections,
    questions,
    scoringCriteria,
    metadata: {
      pages: parsed.numpages,
      info: parsed.info
    }
  };
}
