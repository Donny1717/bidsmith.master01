'use client';

import { useEffect, useState } from 'react';

interface HealthResponse {
  status: 'ok' | 'degraded';
  checks: {
    firebaseAdmin: { ok: boolean; message: string };
    openai: { ok: boolean; message: string };
  };
  timestamp: string;
}

export default function Home() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiBase}/api/health`)
      .then(res => res.json())
      .then(setHealth)
      .catch(err => setError(err.message));
  }, [apiBase]);

  const allOk = health?.status === 'ok';
  const statusMessage = allOk ? 'All systems operational' : 'Attention required';
  const detail =
    !health && !error
      ? 'Checking status...'
      : error
      ? error
      : !allOk
      ? Object.values(health?.checks || {})
          .filter(check => !check.ok)
          .map(check => check.message)
          .join('; ')
      : '';

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">BidSmith ASF</h1>
          <p className="text-slate-600">Bid Intelligence Platform for London Construction Tenders</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">System Status</h2>
              <p className="text-sm text-slate-600">
                {statusMessage}
                {detail ? ` — ${detail}` : ''}
              </p>
            </div>
            <div
              className={`h-3 w-3 rounded-full ${
                allOk ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              aria-label={statusMessage}
            />
          </div>
          {health ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {Object.entries(health.checks).map(([key, value]) => (
                <div key={key} className="rounded border border-slate-100 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-800">{key}</span>
                    <span
                      className={`text-xs font-semibold ${
                        value.ok ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      {value.ok ? 'OK' : 'Check'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600">{value.message}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
