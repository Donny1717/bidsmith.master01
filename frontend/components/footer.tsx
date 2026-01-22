export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} BidSmith ASF</span>
        <div className="flex gap-4">
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
