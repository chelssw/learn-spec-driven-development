import { Link } from "react-router-dom";
import CalloutBox from "../components/CalloutBox.tsx";
import StepFlow from "../components/StepFlow.tsx";

interface ToolBadgeProps {
  label: string;
  color: string;
}

function ToolBadge({ label, color }: ToolBadgeProps) {
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-semibold text-white rounded-full ${color}`}>
      {label}
    </span>
  );
}

interface WorkflowCardProps {
  number: number;
  title: string;
  subtitle: string;
  whenToUse: string[];
  notFor: string[];
  tools: { label: string; color: string }[];
  steps: { number: number; label: string; description: string }[];
  insight: string;
}

function WorkflowCard({ number, title, subtitle, whenToUse, notFor, tools, steps, insight }: WorkflowCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm my-8">
      <div className="bg-[#1e3a5f] px-6 py-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-1">
              Workflow {number}
            </p>
            <h2 className="text-white text-xl font-bold mt-0 mb-1">{title}</h2>
            <p className="text-blue-200 text-sm">{subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {tools.map((t) => (
              <ToolBadge key={t.label} label={t.label} color={t.color} />
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-2">
              Use when
            </p>
            <ul className="space-y-1 list-none pl-0 mb-0">
              {whenToUse.map((item) => (
                <li key={item} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
              Not ideal for
            </p>
            <ul className="space-y-1 list-none pl-0 mb-0">
              {notFor.map((item) => (
                <li key={item} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-gray-400 font-bold flex-shrink-0">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <StepFlow steps={steps} />

        <div className="mt-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-1">Why it works</p>
          <p className="text-sm text-gray-700">{insight}</p>
        </div>
      </div>
    </div>
  );
}

const workflows: WorkflowCardProps[] = [
  {
    number: 1,
    title: "The Full Stack",
    subtitle: "Maximum constraint, minimum rework. The highest-signal workflow available.",
    whenToUse: [
      "Existing codebase with real consumers",
      "Requirements are reasonably understood",
      "Changes that could break things downstream",
      "Features that need to outlive the sprint",
    ],
    notFor: [
      "Exploratory prototypes or spikes",
      "Solo work with no downstream consumers",
      "Features likely to be thrown away",
    ],
    tools: [
      { label: "OpenSpec", color: "bg-orange-600" },
      { label: "SpecKit", color: "bg-purple-700" },
      { label: "Plan Mode", color: "bg-[#1e3a5f]" },
    ],
    steps: [
      {
        number: 1,
        label: "Write the spec with OpenSpec",
        description:
          "Author a .specs/[feature].md file in your repository. Define the current state of the codebase, what's changing, who the consumers are, and what breaks if you get it wrong. This is your alignment document.",
      },
      {
        number: 2,
        label: "Run SpecKit quality checks",
        description:
          "Pass the spec through SpecKit's automated checks — logical consistency, coverage of edge cases, security and data handling. Catch gaps in the requirements before they become gaps in the code.",
      },
      {
        number: 3,
        label: "Derive tests from the spec's acceptance criteria",
        description:
          "Every acceptance criterion in the spec becomes a test. Write them now, before implementation. These are your executable contract — they say exactly what 'done' looks like in terms a machine can verify.",
      },
      {
        number: 4,
        label: "Run Copilot Plan Mode with spec + tests as context",
        description:
          "Open Plan Mode and paste in the spec file and failing test names as context. Copilot's clarifying questions are now grounded in real constraints, not assumptions. The generated plan.md reflects your actual codebase.",
      },
      {
        number: 5,
        label: "AI implements against the failing tests",
        description:
          "Let the AI work through the plan.md todos. The spec tells it what to do. The failing tests tell it when it's done. It has two sources of truth — both verifiable — which dramatically reduces hallucination and over-building.",
      },
      {
        number: 6,
        label: "Commit spec, tests, and code in the same PR",
        description:
          "The spec file, the tests, and the implementation all go in together. Reviewers can read the spec to understand intent, run the tests to verify behavior, and trace every decision back to a documented requirement.",
      },
    ],
    insight:
      "Specs disambiguate for humans. Tests disambiguate for AI. When you give an AI agent both, it has a human-readable definition of what to build AND a machine-verifiable definition of when it's done. Most rework happens when one of these is missing.",
  },
  {
    number: 2,
    title: "Spec-First Greenfield",
    subtitle: "For new projects where requirements need to be discovered, not just documented.",
    whenToUse: [
      "Net-new project or feature with no existing code",
      "Cross-functional team — product, design, and engineering",
      "Requirements are evolving and need structured clarification",
      "Multiple stakeholders who need to agree before work starts",
    ],
    notFor: [
      "Existing codebases with real brownfield context",
      "Urgent fixes or time-boxed hotfixes",
      "Features owned entirely by one person with no reviewers",
    ],
    tools: [
      { label: "SpecKit", color: "bg-purple-700" },
      { label: "Plan Mode", color: "bg-[#1e3a5f]" },
    ],
    steps: [
      {
        number: 1,
        label: "Initialize SpecKit and scaffold the spec",
        description:
          "Run `specify init` in your project. SpecKit creates a structured spec template with sections for requirements, acceptance criteria, stakeholders, and edge cases. Start filling it in collaboratively — product, design, and engineering all reading the same document.",
      },
      {
        number: 2,
        label: "Use AI to surface ambiguities in the spec",
        description:
          "Before locking anything, run SpecKit's clarify phase. The AI reads your draft spec and flags vague language, missing edge cases, and contradictions. Resolve them in the spec itself — not later in a code review comment.",
      },
      {
        number: 3,
        label: "Write tests from the finalized acceptance criteria",
        description:
          "Once the spec is reviewed and approved, turn each acceptance criterion into a test. The spec was the conversation — the tests are the commitment. Anything that doesn't have a test wasn't actually agreed on.",
      },
      {
        number: 4,
        label: "Feed spec + tests into Plan Mode",
        description:
          "Run Copilot Plan Mode with the finalized spec as context. The AI now plans against your actual requirements, not a vague description. The plan.md todos map directly back to spec sections.",
      },
      {
        number: 5,
        label: "Implement to green — spec as the living constraint",
        description:
          "AI implements the plan.md todos. As requirements shift (and in greenfield they will), update the spec first, then the tests, then the code. The spec stays the source of truth across the entire lifecycle.",
      },
    ],
    insight:
      "SpecKit's clarify phase is what makes this workflow different from just writing a doc. It actively stress-tests your requirements before anyone writes code. Most greenfield failures happen because everyone thought they understood the requirements — until implementation revealed they didn't.",
  },
  {
    number: 3,
    title: "Rapid Planning",
    subtitle: "Low overhead. Right-sized for small features, solo work, and fast iteration.",
    whenToUse: [
      "Small, well-understood features",
      "Solo developer with no downstream consumers",
      "Time-constrained work where ceremony isn't justified",
      "Prototyping or exploring an idea quickly",
    ],
    notFor: [
      "Features with external consumers or breaking-change risk",
      "Work that crosses team boundaries",
      "Anything that needs to be maintained long-term",
    ],
    tools: [
      { label: "Plan Mode", color: "bg-[#1e3a5f]" },
    ],
    steps: [
      {
        number: 1,
        label: "Describe the feature in plain language",
        description:
          "Write a clear, one-paragraph description of what you want to build. The more specific you are, the better the plan. If you can't describe it clearly in a paragraph, that's a signal it needs more up-front thinking before you open Plan Mode.",
      },
      {
        number: 2,
        label: "Run Copilot Plan Mode — answer the clarifying questions",
        description:
          "Plan Mode asks 4 questions that surface the most common assumption failures: what exists today, who consumes it, what constraints apply, and what done looks like. Each answer shapes the plan.md it generates.",
      },
      {
        number: 3,
        label: "Review the plan.md before implementation",
        description:
          "Read the generated plan.md before telling the AI to execute it. Adjust any todos that don't match your intent. This two-minute review is the cheapest way to avoid a 30-minute wrong-direction implementation.",
      },
      {
        number: 4,
        label: "Implement following the plan.md todos in order",
        description:
          "Work through the todos respecting the dependency order. Each todo is a self-contained unit of work with a clear done state. If the plan goes off track, stop and update the plan.md — don't let the implementation drift from the intent.",
      },
    ],
    insight:
      "The value here isn't the plan.md artifact — it's the four questions. They take 60 seconds and prevent the most common failure mode: building the right thing in the wrong direction because you skipped the alignment step.",
  },
];

const comparisonRows = [
  { factor: "Codebase maturity", w1: "Existing / brownfield", w2: "Greenfield / new", w3: "Either" },
  { factor: "Team size", w1: "Cross-functional or multi-team", w2: "Cross-functional", w3: "Solo or small team" },
  { factor: "Requirement clarity", w1: "Reasonably understood", w2: "Evolving / needs discovery", w3: "Clear and small" },
  { factor: "Breaking-change risk", w1: "High", w2: "Low (net-new)", w3: "Low" },
  { factor: "Time investment", w1: "High — worth it", w2: "Medium", w3: "Low" },
  { factor: "Key constraint on AI", w1: "Spec + failing tests", w2: "Spec + tests", w3: "Plan.md todos" },
];

export default function RecommendedWorkflows() {
  return (
    <div>
      <h1>Recommended Workflows</h1>
      <p className="text-lg text-gray-500 italic mb-6">
        No single tool wins. The strongest outcomes come from combining the right tools in the right order.
      </p>

      <p>
        Each tool in the spec-driven ecosystem solves a different problem. OpenSpec gives your spec a
        permanent home in the repository. SpecKit stress-tests requirements before anyone writes code.
        Copilot Plan Mode turns a description into an ordered execution plan. TDD gives the AI a
        machine-verifiable definition of done.
      </p>
      <p>
        Used in isolation, each is useful. Combined in the right order, they eliminate most of the
        failure modes that make software development expensive.
      </p>

      <CalloutBox variant="key" title="The core principle">
        Specs define what to build. Tests define when it's done. A plan defines how to get there.
        Give your AI agent all three, and you've removed most of the reasons it goes off track.
      </CalloutBox>

      {workflows.map((w) => (
        <WorkflowCard key={w.number} {...w} />
      ))}

      <h2>How to choose</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#1e3a5f] text-white">
              <th className="text-left px-4 py-2.5 font-semibold rounded-tl-lg">Factor</th>
              <th className="text-left px-4 py-2.5 font-semibold">Workflow 1 — Full Stack</th>
              <th className="text-left px-4 py-2.5 font-semibold">Workflow 2 — Greenfield</th>
              <th className="text-left px-4 py-2.5 font-semibold rounded-tr-lg">Workflow 3 — Rapid</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr key={row.factor} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-2.5 font-medium text-[#1e3a5f] border-b border-gray-100">{row.factor}</td>
                <td className="px-4 py-2.5 text-gray-700 border-b border-gray-100">{row.w1}</td>
                <td className="px-4 py-2.5 text-gray-700 border-b border-gray-100">{row.w2}</td>
                <td className="px-4 py-2.5 text-gray-700 border-b border-gray-100">{row.w3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CalloutBox variant="tip">
        When in doubt, start with Workflow 3. It has the lowest overhead and still forces the four
        alignment questions that prevent most wrong-direction work. Escalate to Workflow 1 or 2
        when the stakes or complexity justify the additional structure.
      </CalloutBox>

      <h2>Try the simulators</h2>
      <p>
        Walk through each tool's workflow interactively and see how the same feature description
        produces different outputs depending on which tool you use.
      </p>
      <Link
        to="/learn/plan-mode"
        className="inline-block px-5 py-2.5 bg-[#2da44e] hover:bg-[#25913f] text-white text-sm font-semibold rounded-lg transition-colors no-underline"
      >
        Open Tool Simulators →
      </Link>
    </div>
  );
}
