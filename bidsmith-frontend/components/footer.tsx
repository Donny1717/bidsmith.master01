import Link from "next/link"
import { BidSmithLogo } from "@/components/bidsmith-logo"
import { Shield, Lock, FileCheck2 } from "lucide-react"

const footerLinks = {
    Platform: [
        { label: "AI Bid Drafting", href: "#" },
        { label: "Compliance Mapping", href: "#" },
        { label: "Scoring & Analysis", href: "#" },
        { label: "Document Automation", href: "#" },
    ],
    Company: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contact", href: "#" },
    ],
    Legal: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "Data Processing", href: "#" },
    ],
}

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background">
            <div className="mx-auto max-w-6xl px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <BidSmithLogo className="h-8 w-8" />
                            <span className="text-lg font-semibold tracking-tight text-foreground">
                                BidSmith<span className="text-primary"> ASF</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-6 max-w-xs leading-relaxed">
                            Institution-grade AI platform for UK government and enterprise bid writing, compliance, and procurement
                            intelligence.
                        </p>

                        {/* Security badges */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Shield className="h-4 w-4" />
                                <span>SOC 2</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Lock className="h-4 w-4" />
                                <span>ISO 27001</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <FileCheck2 className="h-4 w-4" />
                                <span>GDPR</span>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="space-y-1 text-sm text-muted-foreground">
                            <p>
                                <a href="mailto:info@bidsmith.co.uk" className="hover:text-foreground transition-colors">
                                    info@bidsmith.co.uk
                                </a>
                            </p>
                            <p>
                                <a href="mailto:hello@bidsmith.co.uk" className="hover:text-foreground transition-colors">
                                    hello@bidsmith.co.uk
                                </a>
                            </p>
                            <p>
                                <a href="tel:+447468393510" className="hover:text-foreground transition-colors">
                                    +44 7468 393510
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-semibold text-foreground mb-4">{category}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-border/40">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground">© 2026 BidSmith ASF. All rights reserved.</p>
                        <p className="text-sm text-muted-foreground">
                            By{" "}
                            <a
                                href="https://www.bidsmith.co.uk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                            >
                                Honey-B2024 Ltd
                            </a>{" "}
                            (UK)
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
