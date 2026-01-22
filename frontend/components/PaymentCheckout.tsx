"use client";

interface Props {
  amountLabel?: string;
  onCheckout?: () => void;
}

export default function PaymentCheckout({ amountLabel = "£1,490", onCheckout }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded border border-neutral-200 bg-white p-4">
      <div>
        <h3 className="text-lg font-semibold">Secure checkout</h3>
        <p className="text-sm text-neutral-600">
          Access BidSmith ASF full features. Payment is processed by Stripe.
        </p>
      </div>
      <div className="rounded border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm">
        Amount due: <span className="font-semibold">{amountLabel}</span>
      </div>
      <button
        type="button"
        onClick={onCheckout}
        className="rounded bg-black px-4 py-2 text-sm font-semibold text-white"
      >
        Proceed to Stripe
      </button>
    </div>
  );
}
