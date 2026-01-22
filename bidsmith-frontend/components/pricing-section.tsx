import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
    {
        name: "Professional",
        price: "£499",
        period: "/month",
        description: "For growing teams managing multiple bids",
        features: [
            "Up to 25 bids per month",
            "AI-powered drafting",
            "Compliance verification",
            "Standard templates",
            "Email support",
            "Basic analytics",
        ],
        cta: "Start Professional",
        featured: false,
    },
    {
        name: "Enterprise",
        price: "£1,499",
        period: "/month",
        description: "For organisations with high-volume procurement",
        features: [
            "Unlimited bids",
            "Advanced AI models",
            "Full compliance suite",
            "Custom templates",
            "Priority support",
            "Advanced analytics",
            "API access",
            "SSO integration",
        ],
        cta: "Start Enterprise",
        featured: true,
    },
    {
        name: "Government",
        price: "Custom",
        period: "",
        description: "Tailored for public sector requirements",
        features: [
            "All Enterprise features",
            "UK data residency",
            "Dedicated account team",
            "Custom integrations",
            "On-premise option",
            "Annual security audits",
            "SLA guarantees",
            "Training & onboarding",
        ],
        cta: "Contact Sales",
        featured: false,
    },
]

export function PricingSection() {
    return (
        <section id="pricing" className="py-24 bg-secondary/30">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-16">
                    <span className="text-sm font-medium text-primary uppercase tracking-wider">Pricing</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6 text-balance">
                        Transparent, Scalable Pricing
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Choose the plan that matches your procurement volume and compliance requirements.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-2xl p-8 transition-all duration-300 ${plan.featured
                                ? "bg-gradient-to-b from-primary/10 to-card/90 border-2 border-primary/40 shadow-2xl shadow-primary/10"
                                : "bg-card/70 backdrop-blur-md border border-border/60 shadow-xl"
                                }`}
                        >
                            {plan.featured && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                            </div>

                            <div className="mb-6">
                                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                                <span className="text-muted-foreground">{plan.period}</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full font-medium ${plan.featured
                                    ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    }`}
                            >
                                {plan.cta}
                            </Button>
                        </div>
                    ))}
                </div>

                <p className="text-center text-sm text-muted-foreground mt-8">
                    All plans include a 14-day free trial. No credit card required.
                </p>
            </div>
        </section>
    )
}
