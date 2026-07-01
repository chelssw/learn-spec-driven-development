import CalloutBox from "../components/CalloutBox.tsx";
import StepFlow from "../components/StepFlow.tsx";

const steps = [
  { number: 1, label: "Write specifications", description: "Define what you're building - requirements, user stories, goals, and success criteria - in Markdown files. Specs are the source of truth, not afterthoughts." },
  { number: 2, label: "Clarify ambiguities", description: "Use AI agents to surface and resolve ambiguities in your specs before committing to an approach. Every clarification removes a hidden assumption." },
  { number: 3, label: "Generate a plan", description: "Create a concrete implementation plan and task breakdown directly from your specs, with AI assistance. The plan is grounded in your intentional design." },
  { number: 4, label: "Run quality checks", description: "Built-in analysis checks verify logical consistency and spec alignment before a line of code is written. Catch design flaws early, when they're cheap to fix." },
  { number: 5, label: "Implement", description: "Code is written with reference to the spec as a living constraint. The spec remains the source of truth throughout - not just during planning." },
];

export default function SpecKit() {
  return (
    <div>
      <h1>SpecKit</h1>
      <p className="text-lg text-gray-500 italic mb-6">
        GitHub's open-source toolkit for spec-driven development with AI agents.
      </p>

      <p>
        SpecKit is GitHub's open-source framework for making specifications the core artifact of
        your development lifecycle. Instead of treating specs as documentation you write after the
        fact, SpecKit makes them the driving force behind planning, code generation, and validation.
      </p>

      <CalloutBox variant="key" title="Core philosophy">
        Code is the last mile. Specifications are maintained and evolved first - code is generated
        and refined with reference to those living documents, not the other way around.
      </CalloutBox>

      <h2>How it works</h2>
      <p>
        SpecKit structures your workflow into phases, each producing a Markdown artifact that feeds
        structured context into the next:
      </p>
      <StepFlow steps={steps} />

      <h2>Works with any AI agent</h2>
      <p>
        SpecKit integrates with 30+ AI coding agents, including GitHub Copilot, Claude, Gemini,
        Codex, Cursor, and Aider. The spec provides grounded, consistent context regardless of
        which agent you're using - reducing "prompt engineering" and rework caused by missing context.
      </p>

      <CalloutBox variant="tip">
        All SpecKit artifacts are plain Markdown. They're reviewable in PRs, version-controlled
        alongside your code, and readable by everyone on the team - technical or not.
      </CalloutBox>

      <h2>Getting started</h2>
      <p>
        Initialize SpecKit in any project with your chosen AI agent:
      </p>
      <pre className="bg-gray-900 text-green-400 text-sm rounded-lg p-4 overflow-x-auto my-4">
        <code>specify init</code>
      </pre>
      <p>
        This sets up your project structure, spec folders, and templates. SpecKit works on Windows,
        macOS, and Linux, including on-premises and behind firewalls.
      </p>

      <h2>Ecosystem</h2>
      <p>
        SpecKit has a growing open-source ecosystem with 105+ community extensions and 22+ presets
        covering workflows for CI/CD gating, architecture review, governance, and compliance. Extensions
        are composable - pick what fits your team's existing process.
      </p>

      <CalloutBox variant="note">
        SpecKit is particularly powerful for greenfield projects where requirements can be
        front-loaded, and for cross-functional teams where specs bridge product, design, and engineering.
      </CalloutBox>

      <h2>Cost</h2>
      <CalloutBox variant="note" title="Free & open-source">
        SpecKit itself has no cost. Token usage flows through whichever AI provider you configure
        (GitHub Copilot, Claude, Gemini, Codex, etc.) — SpecKit adds no inference overhead of its own.
      </CalloutBox>

      <h2>Resources</h2>
      <ul>
        <li><a href="https://github.com/github/spec-kit" target="_blank" rel="noreferrer">github/spec-kit on GitHub</a></li>
        <li><a href="https://spec-kit.dev" target="_blank" rel="noreferrer">spec-kit.dev - documentation and community extensions</a></li>
      </ul>
    </div>
  );
}
