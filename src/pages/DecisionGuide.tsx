import DecisionTable from "../components/DecisionTable.tsx";
import CalloutBox from "../components/CalloutBox.tsx";

const rows = [
  {
    situation: "Building a public or partner-facing API",
    tool: "OpenAPI / Swagger",
    why: "Industry standard; auto-generates docs, mock servers, and client SDKs",
  },
  {
    situation: "Behavior driven by business rules",
    tool: "BDD / Gherkin",
    why: "Non-technical stakeholders can read and write the scenarios directly",
  },
  {
    situation: "Refactoring or adding isolated logic",
    tool: "TDD (Jest / Vitest)",
    why: "Fast feedback loop; the test file is the spec, lives next to the code",
  },
  {
    situation: "Complex multi-file feature in an AI IDE",
    tool: "Copilot Plan Mode",
    why: "Structured plan prevents AI from drifting; plan.md is reviewable by humans",
  },
  {
    situation: "Enforcing team-wide coding conventions",
    tool: "Cursor / Aider rules",
    why: "Persistent context applied to every AI generation across the whole team",
  },
  {
    situation: "Early-stage exploration or discovery",
    tool: "AI planning + whiteboard",
    why: "Cheap to iterate on ideas before any code or formal spec exists",
  },
  {
    situation: "Cross-team or cross-system integration",
    tool: "OpenAPI + BDD",
    why: "Contract-first with executable acceptance tests catches integration bugs early",
  },
];

export default function DecisionGuide() {
  return (
    <div>
      <h1>Tool Decision Guide</h1>
      <p className="text-lg text-gray-500 italic mb-6">
        Choosing the right spec tool for the task at hand.
      </p>

      <p>
        No single spec tool is right for every situation. The best choice depends on who needs to read
        the spec, what kind of behavior you're specifying, and what tooling your team already uses.
        Use this guide as a starting point.
      </p>

      <DecisionTable rows={rows} />

      <CalloutBox variant="tip">
        These tools complement each other — mix and match based on the task. A single feature might
        use Copilot Plan Mode for planning, OpenAPI for the API contract, and TDD for the business logic.
      </CalloutBox>

      <h2>How to choose</h2>
      <p>Ask yourself three questions:</p>
      <ol>
        <li><strong>Who needs to read this spec?</strong> — If non-technical stakeholders need to review it, use Gherkin. If it's just developers, TDD or OpenAPI may be more precise.</li>
        <li><strong>What are you specifying?</strong> — API shape → OpenAPI. Behavior → BDD. Units of logic → TDD. Implementation plan → Copilot Plan Mode.</li>
        <li><strong>What's already in your stack?</strong> — The best spec tool is the one your team will actually use. Start with what fits your existing workflow.</li>
      </ol>

      <h2>When to use multiple tools</h2>
      <p>
        For any significant feature, consider layering tools:
      </p>
      <ul>
        <li>Use <strong>Copilot Plan Mode</strong> to produce an implementation plan</li>
        <li>Use <strong>OpenAPI</strong> to specify the resulting API contract</li>
        <li>Use <strong>BDD / Gherkin</strong> for acceptance criteria with product stakeholders</li>
        <li>Use <strong>TDD</strong> for the unit-level implementation details</li>
      </ul>
      <p>
        Each layer catches a different class of problem at a different cost. The earlier in the process
        you catch it, the cheaper it is to fix.
      </p>
    </div>
  );
}
