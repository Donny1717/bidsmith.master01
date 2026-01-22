"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { BidSmithLogo } from "@/components/bidsmith-logo"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navLinks = [
        { href: "#capabilities", label: "Platform" },
        { href: "#trust", label: "Security" },
        { href: "#signature", label: "Compliance" },
        { href: "#pricing", label: "Pricing" },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <BidSmithLogo className="h-8 w-8" />
                        <span className="text-lg font-semibold tracking-tight text-foreground">
                            BidSmith<span className="text-primary"> ASF</span>
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-4 md:flex">
                        <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                            Sign In
                        </Button>
                        <Button className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200">
                            Get Started
                        </Button>
                    </div>

                    <button
                        className="md:hidden text-foreground"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl md:hidden">
                    <nav className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-2 pt-4 border-t border-border/40">
                            <Button variant="ghost" className="justify-start">
                                Sign In
                            </Button>
                            <Button className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                                Get Started
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}
