import PaymentCheckout from "@/components/PaymentCheckout";

export default function PaymentPage() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Payment</h1>
        <p className="text-sm text-neutral-600">
          Complete your purchase to unlock full BidSmith ASF access.
        </p>
      </div>
      <PaymentCheckout />
    </section>
  );
}
