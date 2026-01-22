import SignaturePad from "@/components/SignaturePad";

export default function SignaturePage() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Electronic signature</h1>
        <p className="text-sm text-neutral-600">
          Capture a compliant digital signature for your bid documents.
        </p>
      </div>
      <SignaturePad />
    </section>
  );
}
