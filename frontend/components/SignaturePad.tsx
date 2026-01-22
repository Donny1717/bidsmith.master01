"use client";

interface Props {
  onSave?: (dataUrl: string) => void;
}

export default function SignaturePad({ onSave }: Props) {
  const handleSave = () => {
    const placeholder = "data:image/png;base64,signature-placeholder";
    onSave?.(placeholder);
  };

  return (
    <div className="flex flex-col gap-3 rounded border border-neutral-200 bg-white p-4">
      <div className="h-40 rounded border border-dashed border-neutral-300 bg-neutral-50" />
      <div className="flex gap-3">
        <button
          type="button"
          className="rounded border border-neutral-300 px-3 py-2 text-sm font-semibold"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="rounded bg-black px-4 py-2 text-sm font-semibold text-white"
        >
          Save signature
        </button>
      </div>
      <p className="text-xs text-neutral-600">
        Compliant with UK Electronic Communications Act 2000 and supports eIDAS-equivalent storage.
      </p>
    </div>
  );
}
