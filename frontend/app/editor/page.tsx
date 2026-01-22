import BidEditor from "@/components/BidEditor";

export default function EditorPage() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Bid editor</h1>
        <p className="text-sm text-neutral-600">
          Draft and refine your responses with compliance guidance.
        </p>
      </div>
      <BidEditor />
    </section>
  );
}
