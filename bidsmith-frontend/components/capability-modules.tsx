import { FileText, ShieldCheck, LineChart, FolderCog } from "lucide-react"

const capabilities = [
    {
        icon: FileText,
        title: "AI Bid Drafting",
        description:
            "Generate comprehensive bid responses with intelligent content synthesis. Our AI analyses requirements, maps your capabilities, and produces compliant, persuasive documentation.",
        features: ["Automated section generation", "Tone & style consistency", "Multi-format export"],
    },
    {
        icon: ShieldCheck,
        title: "Compliance Mapping",
        description:
            "Automatically verify alignment with procurement requirements, regulatory frameworks, and scoring criteria. Never miss a mandatory clause or disclosure.",
        features: ["Real-time validation", "Gap analysis reports", "Regulatory database"],
    },
    {
        icon: LineChart,
        title: "Scoring & Risk Analysis",
        description:
            "Predictive scoring engine evaluates bid strength against historical outcomes. Identify weaknesses before submission and optimise for evaluation criteria.",
        features: ["Win probability scoring", "Competitive positioning", "Risk mitigation insights"],
    },
    {
        icon: FolderCog,
        title: "Document Automation",
        description:
            "Streamline document assembly with intelligent templates, version control, and collaborative workflows. Maintain audit trails and approval chains.",
        features: ["Template library", "Version management", "Approval workflows"],
    },
]

export function CapabilityModules() {
    return (
        <section id="capabilities" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

            <div className="relative mx-auto max-w-6xl px-6">
                <div className="text-center mb-16">
                    <span className="text-sm font-medium text-primary uppercase tracking-wider">Core Capabilities</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6 text-balance">
                        Enterprise-Grade Bid Intelligence
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Purpose-built for UK government, NHS, defence, and enterprise procurement workflows.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {capabilities.map((capability, index) => (
                        <div
                            key={capability.title}
                            className="group p-8 rounded-2xl bg-card/70 backdrop-blur-md border border-border/60 shadow-xl hover:shadow-2xl hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="flex items-start gap-5">
                                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                    <capability.icon className="h-7 w-7 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-foreground mb-3">{capability.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-4">{capability.description}</p>
                                    <ul className="flex flex-wrap gap-2">
                                        {capability.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="text-xs font-medium px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground"
                                            >
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
