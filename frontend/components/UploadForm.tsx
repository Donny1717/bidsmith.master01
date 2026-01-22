"use client";

import { useState } from "react";

interface Props {
  onSubmit?: (files: File[], companyDetails: Record<string, string>) => void;
}

export default function UploadForm({ onSubmit }: Props) {
  const [companyName, setCompanyName] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!files || files.length === 0) return;
    const payload = {
      companyName,
    };
    onSubmit?.(Array.from(files), payload);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-neutral-700">Company name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="rounded border border-neutral-300 px-3 py-2"
          placeholder="e.g., BidSmith Ltd"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-neutral-700">Tender documents</label>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          onChange={(e) => setFiles(e.target.files)}
          className="rounded border border-neutral-300 px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded bg-black px-4 py-2 text-sm font-semibold text-white"
      >
        Upload and analyze
      </button>
    </form>
  );
}
