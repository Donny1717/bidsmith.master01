"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle2, Lock, User, Calendar, Clock, ArrowRight } from "lucide-react"

type SignatureStatus = "draft" | "pending" | "signed" | "locked"

const statusConfig: Record<SignatureStatus, { label: string; color: string; bgColor: string }> = {
    draft: { label: "Draft", color: "text-muted-foreground", bgColor: "bg-muted" },
    pending: { label: "Pending Review", color: "text-warning", bgColor: "bg-warning/10" },
    signed: { label: "Signed", color: "text-success", bgColor: "bg-success/10" },
    locked: { label: "Locked", color: "text-primary", bgColor: "bg-primary/10" },
}

export function SignatureSystem() {
    const [currentStatus, setCurrentStatus] = useState<SignatureStatus>("draft")
    const [isProcessing, setIsProcessing] = useState(false)

    const handleAdvanceStatus = () => {
        setIsProcessing(true)
        setTimeout(() => {
            setIsProcessing(false)
            const statusOrder: SignatureStatus[] = ["draft", "pending", "signed", "locked"]
            const currentIndex = statusOrder.indexOf(currentStatus)
            if (currentIndex < statusOrder.length - 1) {
                setCurrentStatus(statusOrder[currentIndex + 1])
            }
        }, 1500)
    }

    const resetDemo = () => {
        setCurrentStatus("draft")
    }

    return (
        <section id="signature" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

            <div className="relative mx-auto max-w-6xl px-6">
                <div className="text-center mb-16">
                    <span className="text-sm font-medium text-primary uppercase tracking-wider">Digital Signature</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6 text-balance">
                        Audit-Ready Approval System
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Formalise bid submissions with cryptographic signatures, immutable audit trails, and compliance attestation.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Signature Flow */}
                    <div className="rounded-2xl bg-card/70 backdrop-blur-md border border-border/60 shadow-xl p-8">
                        <h3 className="text-xl font-semibold text-foreground mb-6">Signature Workflow</h3>

                        <div className="flex items-center justify-between mb-8">
                            {(["draft", "pending", "signed", "locked"] as SignatureStatus[]).map((status, index) => (
                                <div key={status} className="flex items-center">
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${statusOrder(currentStatus) >= index
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-secondary text-muted-foreground"
                                                }`}
                                        >
                                            {status === "draft" && <FileText className="h-5 w-5" />}
                                            {status === "pending" && <Clock className="h-5 w-5" />}
                                            {status === "signed" && <CheckCircle2 className="h-5 w-5" />}
                                            {status === "locked" && <Lock className="h-5 w-5" />}
                                        </div>
                                        <span className="text-xs text-muted-foreground mt-2 capitalize">{status}</span>
                                    </div>
                                    {index < 3 && (
                                        <div
                                            className={`w-12 lg:w-16 h-0.5 mx-2 transition-colors duration-300 ${statusOrder(currentStatus) > index ? "bg-primary" : "bg-border"
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <Button
                                onClick={handleAdvanceStatus}
                                disabled={currentStatus === "locked" || isProcessing}
                                className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium"
                            >
                                {isProcessing ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                        Processing...
                                    </span>
                                ) : currentStatus === "locked" ? (
                                    "Document Locked"
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Advance to Next Stage
                                        <ArrowRight className="h-4 w-4" />
                                    </span>
                                )}
                            </Button>

                            {currentStatus === "locked" && (
                                <Button variant="outline" onClick={resetDemo} className="w-full bg-transparent">
                                    Reset Demo
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Signature Panel */}
                    <div className="rounded-2xl bg-card/70 backdrop-blur-md border border-border/60 shadow-xl p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-foreground">Signature Record</h3>
                            <Badge className={`${statusConfig[currentStatus].bgColor} ${statusConfig[currentStatus].color} border-0`}>
                                {statusConfig[currentStatus].label}
                            </Badge>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                                <User className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Signer Name</p>
                                    <p className="text-sm font-medium text-foreground">James Richardson</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                                <FileText className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Role / Authority</p>
                                    <p className="text-sm font-medium text-foreground">Head of Commercial Operations</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                                <Calendar className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Date & Time (UTC)</p>
                                    <p className="text-sm font-medium text-foreground">
                                        {currentStatus === "signed" || currentStatus === "locked"
                                            ? new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC"
                                            : "Pending signature"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {(currentStatus === "signed" || currentStatus === "locked") && (
                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                                <p className="text-sm text-muted-foreground italic leading-relaxed">
                                    "This document was generated with the assistance of BidSmith ASF AI and formally reviewed and approved
                                    by the undersigned authority."
                                </p>
                            </div>
                        )}

                        {currentStatus === "locked" && (
                            <div className="mt-4 p-4 rounded-xl bg-success/5 border border-success/20">
                                <div className="flex items-center gap-2 text-success">
                                    <Lock className="h-4 w-4" />
                                    <span className="text-sm font-medium">Document Immutable</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    This document has been cryptographically sealed and cannot be modified.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

function statusOrder(status: SignatureStatus): number {
    const order: SignatureStatus[] = ["draft", "pending", "signed", "locked"]
    return order.indexOf(status)
}
