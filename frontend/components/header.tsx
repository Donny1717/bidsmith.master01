import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          BidSmith ASF
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-neutral-700">
          <Link href="/upload">Upload</Link>
          <Link href="/analysis">Analysis</Link>
          <Link href="/editor">Editor</Link>
          <Link href="/signature">Signature</Link>
          <Link href="/payment">Payment</Link>
        </nav>
      </div>
    </header>
  );
}
