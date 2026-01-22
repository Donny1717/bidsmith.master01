import { Shield, Lock, FileCheck2, Building2, Heart, Landmark } from "lucide-react"

const trustIndicators = [
    { icon: Shield, label: "SOC 2 Type II" },
    { icon: Lock, label: "ISO 27001" },
    { icon: FileCheck2, label: "GDPR Compliant" },
    { icon: Shield, label: "Cyber Essentials Plus" },
]

const sectors = [
    { icon: Landmark, label: "UK Government" },
    { icon: Building2, label: "Enterprise" },
    { icon: Heart, label: "NHS & Healthcare" },
    { icon: Shield, label: "Defence" },
]

export function TrustSection() {
    return (
        <section id="trust" className="py-24 bg-secondary/30">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-16">
                    <span className="text-sm font-medium text-primary uppercase tracking-wider">Trust & Security</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6 text-balance">
                        Built for Institutional Security Standards
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Security-first architecture designed to meet the stringent requirements of government and regulated
                        industries.
                    </p>
                </div>

                {/* Security certifications */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {trustIndicators.map((indicator) => (
                        <div
                            key={indicator.label}
                            className="flex flex-col items-center p-6 rounded-2xl bg-card/70 backdrop-blur-md border border-border/60"
                        >
                            <indicator.icon className="h-8 w-8 text-primary mb-3" />
                            <span className="text-sm font-medium text-foreground text-center">{indicator.label}</span>
                        </div>
                    ))}
                </div>

                {/* Sector focus */}
                <div className="rounded-2xl bg-card/70 backdrop-blur-md border border-border/60 p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-semibold text-foreground mb-3">Trusted Across Critical Sectors</h3>
                        <p className="text-muted-foreground">
                            Purpose-built for organisations where compliance and security are non-negotiable.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {sectors.map((sector) => (
                            <div
                                key={sector.label}
                                className="flex flex-col items-center p-6 rounded-xl bg-secondary/50 border border-border/40 hover:border-primary/30 transition-colors duration-200"
                            >
                                <sector.icon className="h-10 w-10 text-primary/80 mb-3" />
                                <span className="text-sm font-medium text-foreground">{sector.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 pt-8 border-t border-border/40">
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
                            <span>✓ End-to-end encryption</span>
                            <span>✓ UK data residency</span>
                            <span>✓ Role-based access control</span>
                            <span>✓ Complete audit trails</span>
                            <span>✓ Regular penetration testing</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
