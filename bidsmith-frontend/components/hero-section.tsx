import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, FileCheck, BarChart3 } from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative mx-auto max-w-6xl px-6">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Institution-Grade AI for Winning Bids</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] text-balance mb-6">
                        Transform Procurement with <span className="text-primary">Intelligent</span> Bid Automation
                    </h1>

                    {/* Subtext */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty leading-relaxed">
                        Reduce drafting time by 70%. Ensure complete regulatory compliance. Improve win rates with AI-powered bid
                        intelligence trusted by UK government and enterprise.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground font-semibold px-8 py-6 text-base shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 group"
                        >
                            Generate Bid with AI
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-border/60 bg-secondary/50 text-foreground font-medium px-8 py-6 text-base hover:bg-secondary/80 transition-all duration-200"
                        >
                            Platform Overview
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        {[
                            { value: "70%", label: "Faster Drafting", icon: FileCheck },
                            { value: "99.2%", label: "Compliance Rate", icon: Shield },
                            { value: "3.2x", label: "Higher Win Rate", icon: BarChart3 },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="flex flex-col items-center p-6 rounded-2xl bg-card/70 backdrop-blur-md border border-border/60 shadow-xl"
                            >
                                <stat.icon className="h-6 w-6 text-primary mb-3" />
                                <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                                <span className="text-sm text-muted-foreground mt-1">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
