/**
 * DOCX parsing utilities using mammoth.
 * Extracts raw text, sections, questions, and scoring criteria.
 */
import mammoth from 'mammoth';

function splitIntoSections(text) {
  const sections = [];
  const lines = text.split('\n');
  let current = { title: 'Introduction', content: [] };

  lines.forEach(line => {
    const trimmed = line.trim();
    const isHeading =
      /^(\d+(\.\d+)*)\s+/.test(trimmed) ||
      /^[A-Z][A-Z\s]{6,}$/.test(trimmed) ||
      /^appendix\s+/i.test(trimmed);

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

function findWordLimit(text) {
  const match = text.match(/(\d{2,5})\s*words?/i);
  return match ? Number(match[1]) : null;
}

function extractQuestions(text) {
  const questions = [];
  text.split('\n').forEach((line, idx) => {
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

function extractScoringCriteria(text) {
  const criteria = [];
  const regex = /(\d{1,3})%\s+(quality|technical|price|commercial|social value|weighting)/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    criteria.push({
      weighting: Number(match[1]),
      criterion: match[0]
    });
  }
  return criteria;
}

export async function parseDocxBuffer(buffer) {
  const { value: text } = await mammoth.extractRawText({ buffer });
  const cleanText = text || '';
  const sections = splitIntoSections(cleanText);
  const questions = extractQuestions(cleanText);
  const scoringCriteria = extractScoringCriteria(cleanText);

  return {
    type: 'docx',
    text: cleanText,
    sections,
    questions,
    scoringCriteria,
    metadata: {
      wordCount: cleanText.split(/\s+/).filter(Boolean).length
    }
  };
}
