export default function PaymentCancelPage() {
  return (
    <section className="flex flex-col gap-3">
      <h1 className="text-2xl font-semibold">Payment cancelled</h1>
      <p className="text-sm text-neutral-600">
        Your payment was not completed. You can restart checkout at any time.
      </p>
    </section>
  );
}
