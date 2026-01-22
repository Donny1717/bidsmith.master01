interface Requirement {
  name: string;
  required: boolean;
  present: boolean;
}

interface Question {
  id: string;
  title: string;
  wordLimit: number;
  marks: number;
}

interface Props {
  title: string;
  deadline: string;
  value: number;
  requirements?: Requirement[];
  questions?: Question[];
}

export default function TenderAnalysis({
  title,
  deadline,
  value,
  requirements = [],
  questions = [],
}: Props) {
  return (
    <div className="flex flex-col gap-6 rounded border border-neutral-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-neutral-600">
          Deadline: {deadline} • Value: £{value.toLocaleString()}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-neutral-800">London requirements</h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {requirements.map((req) => (
            <li key={req.name} className="rounded border border-neutral-200 px-3 py-2 text-sm">
              <span className="font-medium">{req.name}</span>
              <span className="ml-2 text-neutral-600">
                {req.present ? "present" : "missing"}
              </span>
            </li>
          ))}
          {requirements.length === 0 && (
            <li className="text-sm text-neutral-500">No requirements loaded yet.</li>
          )}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-neutral-800">Scored questions</h3>
        <ul className="space-y-2">
          {questions.map((q) => (
            <li key={q.id} className="rounded border border-neutral-200 px-3 py-2 text-sm">
              <div className="font-medium">{q.title}</div>
              <div className="text-neutral-600">
                Word limit: {q.wordLimit} • Marks: {q.marks}
              </div>
            </li>
          ))}
          {questions.length === 0 && (
            <li className="text-sm text-neutral-500">No questions loaded yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
