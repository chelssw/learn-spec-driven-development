import { Link } from "react-router-dom";
import StepFlow from "../components/StepFlow.tsx";
import CalloutBox from "../components/CalloutBox.tsx";

const steps = [
  { number: 1, label: "Define", description: "Write a clear spec before any code exists - an API contract, user story, test, or planning document." },
  { number: 2, label: "Review", description: "Align your team on the expected behavior. Even a 5-minute review prevents hours of rework." },
  { number: 3, label: "Implement", description: "Build against the spec. The spec is your success criterion, not just a reference document." },
  { number: 4, label: "Validate", description: "Verify the implementation satisfies the original spec. Update the spec if requirements evolved." },
];

export default function Introduction() {
  return (
    <div>
      <h1>Introduction to Spec-Driven Development</h1>
      <p className="text-lg text-gray-500 italic mb-6">
        A workflow where specifications are written before implementation begins.
      </p>

      <p>
        Spec-Driven Development (SDD) is a discipline that puts the <em>definition of done</em> before
        the first line of code. Whether you're working with a team of two or two hundred, the principle is
        the same: agree on what you're building before you build it.
      </p>

      <p>
        This site covers the full landscape - from traditional tools like OpenAPI and BDD to modern
        AI-powered approaches like <Link to="/tools/copilot-plan-mode">GitHub Copilot Plan Mode</Link>.
      </p>

      <h2>The Core Workflow</h2>
      <StepFlow steps={steps} />

      <CalloutBox variant="tip" title="Why it works">
        Specs aren't just documentation - they're a forcing function. Writing a spec forces you to think
        through edge cases, dependencies, and success criteria before you're deep in the implementation.
      </CalloutBox>

      <h2>What counts as a spec?</h2>
      <p>Specs take many forms depending on your team and context:</p>
      <ul>
        <li><strong>API schemas</strong> - OpenAPI / Swagger definitions</li>
        <li><strong>Behavior scenarios</strong> - Gherkin / BDD feature files</li>
        <li><strong>Test cases</strong> - TDD red-phase tests</li>
        <li><strong>AI planning documents</strong> - Copilot Plan Mode's <code>plan.md</code></li>
        <li><strong>Architecture documents</strong> - ERDs, sequence diagrams, ADRs</li>
      </ul>

      <h2>Ready to dive in?</h2>
      <p>
        Start with <Link to="/problem">The Problem</Link> to understand why development goes wrong without
        specs, or jump straight to the <Link to="/landscape">Landscape</Link> for a map of all the tools
        covered here.
      </p>
    </div>
  );
}
