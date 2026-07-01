import { Link } from "react-router-dom";
import StepFlow from "../components/StepFlow.tsx";
import CalloutBox from "../components/CalloutBox.tsx";

const steps = [
  {
    number: 1,
    label: "Spec",
    description:
      "Write a versioned, executable specification before any code exists. This is the single source of truth — not a ticket, not a chat thread, not a comment in code. The spec also defines the rules your project runs by: conventions, architecture constraints, and what the AI is and isn't allowed to do.",
  },
  {
    number: 2,
    label: "Plan",
    description:
      "Derive a structured implementation plan from the spec. The plan translates requirements into a concrete approach, surfaces edge cases and dependencies, and is reviewed by a human before a single file is touched.",
  },
  {
    number: 3,
    label: "Tasks",
    description:
      "Break the plan into ordered, trackable todos with explicit dependencies. Each task has a clear done state. Work proceeds in dependency order — no ambiguity about what comes next or how to know when it's finished.",
  },
  {
    number: 4,
    label: "Implement",
    description:
      "Code is derived from the tasks, constrained by the spec. The spec remains the authority throughout — not the AI's last response, not the developer's memory of a planning conversation that scrolled away.",
  },
];

interface ToolCard {
  name: string;
  scope: string;
  description: string;
  bestFor: string;
  link: string;
  accentColor: string;
  labelColor: string;
}

const toolCards: ToolCard[] = [
  {
    name: "SpecKit",
    scope: "Full Framework",
    description:
      "GitHub's open-source framework. Makes specs the core artifact of the entire dev lifecycle with automated quality checks, AI-powered clarification, and a growing extension ecosystem.",
    bestFor: "Teams & greenfield projects",
    link: "/tools/speckit",
    accentColor: "border-purple-600",
    labelColor: "text-purple-600",
  },
  {
    name: "OpenSpec",
    scope: "Planning Workspace",
    description:
      "Lightweight and brownfield-first. Specs live permanently in your repo and persist across sessions. Agent-agnostic — your specs are independent of whichever AI tool you use.",
    bestFor: "Teams & existing codebases",
    link: "/tools/openspec",
    accentColor: "border-orange-500",
    labelColor: "text-orange-500",
  },
  {
    name: "Copilot Plan Mode",
    scope: "AI Workflow Feature",
    description:
      "Built into the Copilot CLI. Asks clarifying questions, writes a plan.md, and waits for human approval before touching any files. Then executes tasks in dependency order.",
    bestFor: "Individuals & Copilot CLI users",
    link: "/tools/copilot-plan-mode",
    accentColor: "border-[#1e3a5f]",
    labelColor: "text-[#1e3a5f]",
  },
];

const comparisonRows = [
  {
    dimension: "Scope",
    speckit: "Full framework",
    openspec: "Planning workspace",
    copilot: "Single AI workflow feature",
  },
  {
    dimension: "Spec lives in repo?",
    speckit: true,
    openspec: true,
    copilot: "Session-only",
  },
  {
    dimension: "Brownfield-first?",
    speckit: false,
    openspec: true,
    copilot: true,
  },
  {
    dimension: "Automated quality checks?",
    speckit: true,
    openspec: false,
    copilot: false,
  },
  {
    dimension: "Human approval gate?",
    speckit: false,
    openspec: false,
    copilot: true,
  },
  {
    dimension: "Best for",
    speckit: "Teams, greenfield",
    openspec: "Teams, existing codebases",
    copilot: "Individuals, Copilot CLI users",
  },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <span className="text-[#2da44e] font-bold text-base">✓</span>;
  if (value === false) return <span className="text-gray-300 font-bold text-base">—</span>;
  return <span className="text-gray-700">{value}</span>;
}

export default function TheApproach() {
  return (
    <div>
      <h1>The SDD Approach</h1>
      <p className="text-lg text-gray-500 italic mb-6">
        From vibe coding to a versioned, executable source of truth.
      </p>

      <h2>The problem with vibe coding</h2>
      <p>
        Vibe coding — describing what you want in a long chat session and hoping the AI figures it
        out — works until it doesn't. Context gets lost across messages. The AI drifts. Nothing is
        reviewable because the "spec" lives in a chat thread that scrolls away. When something breaks,
        there's no artifact to trace back to an intention.
      </p>
      <p>
        Spec-Driven Development replaces the ephemeral chat thread with a{" "}
        <strong>versioned, executable specification</strong> — a document that lives in your
        repository, can be reviewed in a PR, and remains the authority for every implementation
        decision that follows.
      </p>

      <CalloutBox variant="key" title="The core shift">
        Instead of one long chat that the AI interprets on the fly, you produce a spec that defines
        what to build, a plan that defines how to get there, and tasks that define when you're done.
        The code is the last thing derived — not the first thing produced.
      </CalloutBox>

      <h2>The four-step loop</h2>
      <p>
        Every spec-driven workflow — regardless of which tools you use — runs through the same four
        phases. This is a more tool-specific framing than the high-level{" "}
        <Link to="/">Define → Review → Implement → Validate</Link> loop; these four steps describe
        exactly how specifications become code.
      </p>
      <StepFlow steps={steps} />

      <h2>Specs as project rules</h2>
      <p>
        A spec doesn't just describe <em>what</em> to build — it defines <em>how the project
        works</em>. The conventions your team follows, the architectural boundaries the AI must
        respect, the libraries that are allowed and the ones that aren't. This is what tools like
        Cursor's <code>.cursorrules</code> and Aider's <code>CONVENTIONS.md</code> implement: the
        spec as a persistent constraint applied to every AI interaction, not just a one-time planning
        artifact.
      </p>
      <p>
        When a spec defines project rules, the AI doesn't guess at conventions. It operates within
        a bounded, documented context — the same one a new team member would read on day one.
      </p>

      <CalloutBox variant="tip" title="The practical test">
        If a new developer — or a fresh AI session — could read your spec and reproduce the correct
        behavior without asking anyone any questions, the spec is doing its job.
      </CalloutBox>

      <h2>How the tools fit in</h2>
      <p>
        Three tools sit at the center of the modern SDD ecosystem. They each implement the
        four-step loop differently, optimized for different team sizes and codebase contexts.
      </p>

      <div className="grid gap-4 my-6 sm:grid-cols-3">
        {toolCards.map((tool) => (
          <div
            key={tool.name}
            className={`rounded-lg border-t-4 ${tool.accentColor} bg-white shadow-sm p-5 flex flex-col`}
          >
            <p className={`text-xs font-semibold uppercase tracking-widest ${tool.labelColor} mb-1`}>
              {tool.scope}
            </p>
            <h3 className="text-base font-bold mt-0 mb-2 text-[#1e3a5f]">{tool.name}</h3>
            <p className="text-sm text-gray-600 mb-3 flex-1">{tool.description}</p>
            <p className="text-xs text-gray-500 mb-3">Best for: {tool.bestFor}</p>
            <Link to={tool.link} className="text-xs font-semibold text-[#2da44e]">
              Learn more →
            </Link>
          </div>
        ))}
      </div>

      <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1e3a5f] text-white">
              <th className="px-4 py-3 text-left font-semibold">Dimension</th>
              <th className="px-4 py-3 text-left font-semibold">SpecKit</th>
              <th className="px-4 py-3 text-left font-semibold">OpenSpec</th>
              <th className="px-4 py-3 text-left font-semibold">Copilot Plan Mode</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr key={row.dimension} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-3 font-medium text-[#1e3a5f]">{row.dimension}</td>
                <td className="px-4 py-3"><Cell value={row.speckit} /></td>
                <td className="px-4 py-3"><Cell value={row.openspec} /></td>
                <td className="px-4 py-3"><Cell value={row.copilot} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CalloutBox variant="note">
        These tools aren't competing alternatives — they're complementary layers. See{" "}
        <Link to="/learn/workflows">Recommended Workflows</Link> for how to combine them for
        maximum effect on a real feature.
      </CalloutBox>

      <h2>Tokens, credits, and cost</h2>
      <p>
        None of these tools sell tokens directly — they consume inference from your existing AI
        subscriptions. Here's how cost flows for each:
      </p>

      <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1e3a5f] text-white">
              <th className="px-4 py-3 text-left font-semibold">Tool</th>
              <th className="px-4 py-3 text-left font-semibold">Cost model</th>
              <th className="px-4 py-3 text-left font-semibold">Where tokens come from</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="px-4 py-3 font-medium text-[#1e3a5f]">SpecKit</td>
              <td className="px-4 py-3 text-gray-700">Free &amp; open-source</td>
              <td className="px-4 py-3 text-gray-700">Your configured AI provider (Copilot, Claude, Gemini, etc.)</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium text-[#1e3a5f]">OpenSpec</td>
              <td className="px-4 py-3 text-gray-700">Free workspace layer</td>
              <td className="px-4 py-3 text-gray-700">Your connected AI agent — OpenSpec itself has no inference cost</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 font-medium text-[#1e3a5f]">Copilot Plan Mode</td>
              <td className="px-4 py-3 text-gray-700">Included in Copilot subscription</td>
              <td className="px-4 py-3 text-gray-700">Your Copilot plan — capable models draw from monthly GitHub AI Credits allowance</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>GitHub AI Credits</h3>
      <p>
        Copilot subscriptions include a monthly allowance of <strong>GitHub AI Credits</strong> (1 credit
        = $0.01 USD) — the more capable the model, the more credits a session costs. Plan Mode sessions
        are longer and more context-heavy than simple completions, so they consume credits faster.
        Allowances by plan (verify current limits at{" "}
        <a href="https://docs.github.com/en/copilot/get-started/plans" target="_blank" rel="noreferrer">
          GitHub Copilot docs
        </a>
        ):
      </p>
      <ul>
        <li><strong>Copilot Pro</strong> ($10/mo) — 1,500 AI credits/month</li>
        <li><strong>Copilot Pro+</strong> ($39/mo) — 7,000 AI credits/month</li>
        <li><strong>Copilot Max</strong> ($100/mo) — 20,000 AI credits/month</li>
        <li><strong>Copilot Business</strong> ($19/seat/mo) and <strong>Copilot Enterprise</strong> ($39/seat/mo) — org-level credit pool</li>
      </ul>

      <CalloutBox variant="tip" title="SDD can be more token-efficient">
        A well-scoped spec reduces the back-and-forth correction loops that burn tokens in unstructured
        chat. Fewer wrong-direction implementations means fewer follow-up prompts to fix them.
      </CalloutBox>

      <h2>Where to go next</h2>
      <p>
        Explore the tools in depth, or jump straight to a complete workflow:
      </p>
      <ul>
        <li>
          <Link to="/tools/speckit">SpecKit</Link> — the full spec discipline framework
        </li>
        <li>
          <Link to="/tools/openspec">OpenSpec</Link> — lightweight, repo-native planning
        </li>
        <li>
          <Link to="/tools/copilot-plan-mode">Copilot Plan Mode</Link> — AI-assisted planning with a human approval gate
        </li>
        <li>
          <Link to="/learn/workflows">Recommended Workflows</Link> — step-by-step guides for combining tools
        </li>
      </ul>
    </div>
  );
}
