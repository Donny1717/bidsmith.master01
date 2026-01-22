"use client";

import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>BidSmith AI     Upload Tender</h1>

      <div style={styles.card}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          style={styles.button}
        >
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {result && (
        <section style={styles.result}>
          <h3>Analysis Result</h3>

          <pre style={styles.pre}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </section>
      )}
    </main>
  );
}

/* ---------------- styles ---------------- */

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background: "#0f172a",
    color: "#e5e7eb",
    fontFamily: "Inter, sans-serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: 600,
    marginBottom: "24px",
  },
  card: {
    background: "#020617",
    padding: "24px",
    borderRadius: "12px",
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  button: {
    background: "#2563eb",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
  },
  error: {
    color: "#f87171",
    marginTop: "16px",
  },
  result: {
    marginTop: "32px",
    background: "#020617",
    padding: "24px",
    borderRadius: "12px",
  },
  pre: {
    marginTop: "12px",
    fontSize: "13px",
    whiteSpace: "pre-wrap",
    color: "#93c5fd",
  },
};
