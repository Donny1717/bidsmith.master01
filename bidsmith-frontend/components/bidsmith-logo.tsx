export function BidSmithLogo({ className = "h-8 w-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect x="2" y="2" width="36" height="36" rx="8" className="fill-primary/10 stroke-primary" strokeWidth="2" />
            <path d="M12 12h6c3.314 0 6 2.239 6 5s-2.686 5-6 5h-6v-10z" className="fill-primary" />
            <path d="M12 22h8c3.314 0 6 2.239 6 5s-2.686 5-6 5h-8v-10z" className="fill-primary/70" />
            <circle cx="30" cy="12" r="3" className="fill-primary" />
        </svg>
    )
}
