/**
 * AI-inspired text summarizer — extracts key points from user input
 * without requiring an external AI API.
 */
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare',
  'ought', 'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by',
  'from', 'as', 'into', 'through', 'during', 'before', 'after', 'above',
  'below', 'between', 'out', 'off', 'over', 'under', 'again', 'further',
  'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all',
  'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
  'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just',
  'because', 'but', 'and', 'or', 'if', 'while', 'although', 'though',
  'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'it', 'they',
  'them', 'their', 'this', 'that', 'these', 'those', 'am', 'im', 'its',
]);

const extractKeywords = (text, limit = 5) => {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 3 && !STOP_WORDS.has(word));

  const frequency = {};
  words.forEach((word) => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
};

const getFirstSentence = (text) => {
  const match = text.trim().match(/^[^.!?]+[.!?]?/);
  return match ? match[0].trim() : text.trim();
};

const generateSummary = (text, context = '') => {
  if (!text || !text.trim()) {
    return context ? `${context}: No details provided.` : 'No details provided.';
  }

  const cleaned = text.trim().replace(/\s+/g, ' ');
  const firstSentence = getFirstSentence(cleaned);
  const keywords = extractKeywords(cleaned);

  let summary = firstSentence;

  if (summary.length > 120) {
    summary = summary.substring(0, 117) + '...';
  }

  if (keywords.length > 0) {
    const keywordPhrase = keywords.join(', ');
    summary = `${summary} [Key topics: ${keywordPhrase}]`;
  }

  if (context) {
    summary = `[${context}] ${summary}`;
  }

  if (summary.length > 250) {
    summary = summary.substring(0, 247) + '...';
  }

  return summary;
};

module.exports = { generateSummary };
