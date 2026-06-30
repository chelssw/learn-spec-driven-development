import { Link } from "react-router-dom";
import CalloutBox from "../components/CalloutBox.tsx";

const problems = [
  {
    title: "Scope creep",
    description:
      "Features grow without clear boundaries. Without a spec, every stakeholder's mental model of 'the feature' is different - and those gaps surface as change requests after code is already written.",
  },
  {
    title: "Misaligned expectations",
    description:
      "Developers, product managers, and stakeholders build different mental models of what's being built. A spec creates a single source of truth that everyone can read and comment on.",
  },
  {
    title: "Rework",
    description:
      "Code is written, requirements change, and code is rewritten. Rework is expensive - not just in time, but in morale. Specs catch misalignments early, when they're cheap to fix.",
  },
  {
    title: "Missing edge cases",
    description:
      "Without a spec, no one has formally agreed on the behavior for corner cases. They surface in production, often at the worst possible time.",
  },
  {
    title: "Painful onboarding",
    description:
      "When a new developer joins, where do they go to understand how a feature works? If the answer is 'ask someone' or 'read the code', you don't have a spec - and you're paying the cost every time.",
  },
];

export default function TheProblem() {
  return (
    <div>
      <h1>The Problem</h1>
      <p className="text-lg text-gray-500 italic mb-6">
        Why development goes wrong without specifications.
      </p>

      <p>
        Most teams don't skip specs intentionally. They skip them because writing a spec feels like
        overhead when the requirement seems obvious. But that feeling is almost always wrong - and the
        cost shows up later.
      </p>

      <h2>Common failure modes</h2>
      <div className="space-y-4 my-6">
        {problems.map((p) => (
          <div key={p.title} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <h3 className="text-[#1e3a5f] font-semibold mt-0">{p.title}</h3>
            <p className="text-gray-600 text-sm mb-0">{p.description}</p>
          </div>
        ))}
      </div>

      <CalloutBox variant="key" title="The core insight">
        The cost of changing a spec is near zero. The cost of changing production code is not. Every
        hour you invest in a spec saves multiple hours of rework downstream.
      </CalloutBox>

      <h2>The fix</h2>
      <p>
        Write the spec first - then write the code. This sounds simple, but it requires discipline.
        The urge to "just start coding" is strong, especially for small features. Resist it.
      </p>
      <p>
        The good news: modern tooling makes this easier than ever. From{" "}
        <Link to="/tools/traditional">traditional spec tools</Link> to{" "}
        <Link to="/tools/copilot-plan-mode">AI-powered planning</Link>, there's an approach that fits
        every team's workflow.
      </p>
    </div>
  );
}
