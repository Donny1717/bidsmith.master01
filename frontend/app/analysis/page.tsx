import TenderAnalysis from "@/components/TenderAnalysis";

const mockRequirements = [
  { name: "Construction Logistics Plan", required: true, present: true },
  { name: "NRMM / ULEZ Compliance", required: true, present: true },
  { name: "Section 106 Social Value", required: true, present: false },
];

const mockQuestions = [
  { id: "q1", title: "Methodology & Approach", wordLimit: 1500, marks: 20 },
  { id: "q2", title: "Risk Management", wordLimit: 1000, marks: 15 },
];

export default function AnalysisPage() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Tender analysis</h1>
        <p className="text-sm text-neutral-600">
          Review scored questions, word limits, and London-specific requirements.
        </p>
      </div>
      <TenderAnalysis
        title="Westminster Council Road Improvement"
        deadline="2026-02-15T12:00:00Z"
        value={850000}
        requirements={mockRequirements}
        questions={mockQuestions}
      />
    </section>
  );
}
