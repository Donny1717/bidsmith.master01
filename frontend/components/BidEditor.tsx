"use client";

import { useState } from "react";

interface Props {
  initialContent?: string;
  onChange?: (value: string) => void;
}

export default function BidEditor({ initialContent = "", onChange }: Props) {
  const [value, setValue] = useState(initialContent);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = event.target.value;
    setValue(next);
    onChange?.(next);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-neutral-800">Bid response</label>
      <textarea
        value={value}
        onChange={handleChange}
        className="min-h-[240px] rounded border border-neutral-300 p-3 text-sm"
        placeholder="Draft your response..."
      />
      <div className="text-xs text-neutral-500">
        Tip: include London-specific commitments (CLP, NRMM/ULEZ, Section 106, social value).
      </div>
    </div>
  );
}
