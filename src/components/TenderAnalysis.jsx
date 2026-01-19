import React from 'react';

/**
 * Displays tender analysis including questions, scoring and London requirements coverage.
 */
export function TenderAnalysis({ analysis, isLoading }) {
  if (isLoading) {
    return <div className="p-4 border rounded animate-pulse">Analyzing tender…</div>;
  }

  if (!analysis) {
    return <div className="p-4 border rounded">Upload a tender to see analysis.</div>;
  }

  const coverage = analysis.londonRequirements?.coverageScore || 0;

  return (
    <div className="space-y-4 border border-gray-200 rounded-md p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Tender analysis</h3>
        <div className="text-sm text-gray-600">Compliance score: {analysis.complianceScore}/100</div>
      </div>

      <div>
        <div className="text-sm font-semibold mb-1">London requirements coverage</div>
        <div className="w-full bg-gray-100 rounded h-2">
          <div className="bg-green-600 h-2 rounded" style={{ width: `${coverage}%` }} />
        </div>
        <p className="text-xs text-gray-600 mt-1">{coverage}% of London obligations detected.</p>
      </div>

      <div>
        <h4 className="font-semibold text-sm mb-1">Scoring criteria</h4>
        <ul className="list-disc list-inside text-sm space-y-1">
          {analysis.scoringCriteria?.map(item => (
            <li key={item.criterion}>{item.criterion} ({item.weighting}%)</li>
          )) || <li>Not found in document</li>}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-sm mb-1">Questions</h4>
        <ol className="list-decimal list-inside text-sm space-y-1">
          {analysis.questions?.map(q => (
            <li key={q.id}>
              {q.text}
              {q.wordLimit && <span className="text-gray-500"> — {q.wordLimit} words</span>}
              {q.scoreWeight && <span className="ml-1 text-blue-600">({q.scoreWeight}%)</span>}
            </li>
          )) || <li>No questions detected</li>}
        </ol>
      </div>

      <div>
        <h4 className="font-semibold text-sm mb-1">Recommendations</h4>
        <ul className="list-disc list-inside text-sm space-y-1">
          {analysis.recommendations?.map(item => (
            <li key={item}>{item}</li>
          )) || <li>No recommendations generated</li>}
        </ul>
      </div>

      {analysis.socialValue && (
        <div>
          <h4 className="font-semibold text-sm mb-1">Social Value score</h4>
          <p className="text-sm text-gray-700">
            {analysis.socialValue.score}/100 — {analysis.socialValue.rationale}
          </p>
        </div>
      )}
    </div>
  );
}
