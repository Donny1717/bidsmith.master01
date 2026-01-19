import React, { useMemo, useRef, useState } from 'react';

const SECTION_ORDER = ['Summary', 'Approach', 'Evidence', 'Risks', 'KPIs', 'Compliance'];

/**
 * BidEditor manages the six-section structure with word counts and save-to-API.
 */
export function BidEditor({ bidId, initialSections = {}, onSaved }) {
  const [sections, setSections] = useState(() => {
    const defaults = {};
    SECTION_ORDER.forEach(key => {
      defaults[key] = initialSections[key] || '';
    });
    return defaults;
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const editorsRef = useRef(
    SECTION_ORDER.reduce((acc, key) => {
      acc[key] = React.createRef();
      return acc;
    }, {})
  );

  const wordCounts = useMemo(() => {
    return Object.fromEntries(
      Object.entries(sections).map(([key, value]) => [key, value.trim().split(/\s+/).filter(Boolean).length])
    );
  }, [sections]);

  const totalWords = Object.values(wordCounts).reduce((sum, n) => sum + n, 0);

  const handleChange = (section, value) => {
    setSections(prev => ({ ...prev, [section]: value }));
  };

  const applyFormat = (section, format) => {
    const editor = editorsRef.current[section]?.current;
    if (!editor) return;
    const { selectionStart, selectionEnd, value } = editor;
    const selected = value.slice(selectionStart, selectionEnd);

    let replacement = selected;
    if (format === 'bold') replacement = `**${selected || 'bold text'}**`;
    if (format === 'bullet') replacement = `${selected ? selected : '• item'}\n`;

    const updated =
      value.slice(0, selectionStart) + replacement + value.slice(selectionEnd);

    setSections(prev => ({ ...prev, [section]: updated }));
  };

  const saveDraft = async () => {
    if (!bidId) {
      setError('Bid not created yet.');
      return;
    }
    setStatus('saving');
    setError('');
    try {
      const response = await fetch(`/api/bids/${bidId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: sections, status: 'draft' }),
        credentials: 'include'
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || 'Save failed');
      setStatus('saved');
      if (typeof onSaved === 'function') onSaved(result.bid);
    } catch (err) {
      setError(err.message || 'Save failed');
      setStatus('idle');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Bid editor</h3>
        <div className="text-sm text-gray-600">Total words: {totalWords}</div>
      </div>

      {SECTION_ORDER.map(section => (
        <div key={section} className="border border-gray-200 rounded-md p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">{section}</span>
            <span className="text-xs text-gray-500">{wordCounts[section]} words</span>
          </div>
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => applyFormat(section, 'bold')}
              className="text-xs bg-gray-200 px-2 py-1 rounded"
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => applyFormat(section, 'bullet')}
              className="text-xs bg-gray-200 px-2 py-1 rounded"
            >
              Bullet
            </button>
          </div>
          <textarea
            ref={editorsRef.current[section]}
            value={sections[section]}
            onChange={e => handleChange(section, e.target.value)}
            rows={5}
            className="w-full border rounded px-3 py-2"
            placeholder={`Write the ${section.toLowerCase()} section...`}
          />
        </div>
      ))}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={saveDraft}
        disabled={status === 'saving'}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
      >
        {status === 'saving' ? 'Saving…' : 'Save draft to Firestore'}
      </button>
    </div>
  );
}
