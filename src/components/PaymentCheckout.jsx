import React, { useEffect, useState } from 'react';

const FEATURES = [
  'Unlimited tender uploads (PDF/Word)',
  'AI bid drafts with London compliance baked in',
  'Social Value scoring and KPIs',
  'Electronic signature workflow',
  'Priority support'
];

/**
 * Stripe checkout initiator for £1,490 pricing.
 */
export function PaymentCheckout({ checkoutState }) {
  const [status, setStatus] = useState(checkoutState || 'ready');
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'success') setStatus('success');
    if (params.get('status') === 'cancel') setStatus('canceled');
  }, []);

  const startCheckout = async () => {
    setStatus('loading');
    setError('');
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        credentials: 'include'
      });
      const result = await response.json();
      if (!response.ok || !result?.url) throw new Error(result?.error || 'Checkout failed');
      window.location.href = result.url;
    } catch (err) {
      setStatus('ready');
      setError(err.message || 'Checkout failed');
    }
  };

  return (
    <div className="border border-gray-200 rounded-md p-4 space-y-3">
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="text-lg font-semibold">BidSmith ASF annual</h3>
          <p className="text-sm text-gray-600">Secure Stripe checkout</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">£1,490</div>
          <div className="text-xs text-gray-500">per seat / year</div>
        </div>
      </div>

      <ul className="list-disc list-inside text-sm space-y-1">
        {FEATURES.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {status === 'success' ? (
        <div className="text-green-700 text-sm">Payment confirmed. Subscription active.</div>
      ) : status === 'canceled' ? (
        <div className="text-yellow-700 text-sm">Checkout canceled. You can retry anytime.</div>
      ) : (
        <button
          type="button"
          onClick={startCheckout}
          disabled={status === 'loading'}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
        >
          {status === 'loading' ? 'Redirecting…' : 'Go to Stripe checkout'}
        </button>
      )}
    </div>
  );
}
