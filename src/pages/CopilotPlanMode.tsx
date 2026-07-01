import CodeBlock from "../components/CodeBlock.tsx";
import CalloutBox from "../components/CalloutBox.tsx";
import StepFlow from "../components/StepFlow.tsx";

const planPromptExample = `[[PLAN]] I want to add a user authentication system to this Express API.
Please analyze the codebase and create an implementation plan.`;

const planMdExample = `# User Auth API - Implementation Plan

## Approach
Add JWT authentication to the existing Express API.
Use bcrypt for password hashing, jsonwebtoken for tokens.
Store users in the existing PostgreSQL database via Prisma.

## Todos
| ID              | Title                          | Status  |
|-----------------|--------------------------------|---------|
| user-model      | Create User model in Prisma    | pending |
| auth-routes     | Add /login and /register       | pending |
| jwt-middleware  | JWT verification middleware    | pending |
| tests           | Auth integration tests         | pending |

## Dependencies
- auth-routes     depends on user-model
- jwt-middleware  depends on auth-routes
- tests           depends on jwt-middleware`;

const clarifyingQs = [
  "Should tokens be stored in cookies or Authorization headers?",
  "What is the access token expiry policy?",
  "Are refresh tokens required?",
  "Which ORM or query builder does the project use?",
];

const steps = [
  { number: 1, label: "Trigger Plan Mode", description: 'Prefix your message with [[PLAN]]. This signals to Copilot that you want a plan before any code is written.' },
  { number: 2, label: "Answer clarifying questions", description: "Copilot asks targeted questions to remove assumptions before committing to an approach. These surface edge cases you may not have considered." },
  { number: 3, label: "Review the generated plan", description: "Copilot writes a structured plan.md with an approach section, a todo table with IDs and statuses, and an optional dependency map." },
  { number: 4, label: "Approve, edit, or reject", description: "You review the plan summary before a single file is touched. Edit the plan if something is wrong, or reject it to start over with updated context." },
  { number: 5, label: "Autopilot implements", description: "Once approved, Copilot switches to autopilot mode - executing the plan step by step, updating todo statuses in real time." },
];

export default function CopilotPlanMode() {
  return (
    <div>
      <h1>GitHub Copilot Plan Mode</h1>
      <p className="text-lg text-gray-500 italic mb-6">
        AI-assisted planning that puts the spec before the code.
      </p>

      <p>
        Plan Mode is a feature of the GitHub Copilot CLI that enforces a plan-first workflow. Instead
        of immediately generating code, Copilot asks clarifying questions, writes a structured plan, and
        waits for your approval before touching any files.
      </p>

      <CalloutBox variant="key" title="Core principle">
        No code is written until the plan is reviewed and approved by a human. The plan is the spec.
      </CalloutBox>

      <h2>How it works</h2>
      <StepFlow steps={steps} />

      <h2>Triggering Plan Mode</h2>
      <p>
        Prefix any message with <code>[[PLAN]]</code> to enter planning mode:
      </p>
      <CodeBlock code={planPromptExample} language="plaintext" />

      <h2>What Copilot asks first</h2>
      <p>
        Before writing a plan, Copilot asks questions to remove ambiguity. For an auth feature, those
        might look like:
      </p>
      <ul>
        {clarifyingQs.map((q) => <li key={q}>{q}</li>)}
      </ul>
      <CalloutBox variant="tip">
        Each question removes an assumption - and every assumption you don't make upfront is one less
        source of rework later.
      </CalloutBox>

      <h2>The generated plan.md</h2>
      <p>
        After you answer the questions, Copilot generates a <code>plan.md</code> in your session folder.
        It includes an approach section, a todo table with IDs and statuses, and a dependency map:
      </p>
      <CodeBlock code={planMdExample} language="plaintext" filename="plan.md" />

      <h2>Editing the plan</h2>
      <p>
        The plan is just a markdown file - you can edit it before approving. Change the approach,
        remove todos you don't want, or add ones Copilot missed. Copilot will implement exactly what
        the plan says.
      </p>

      <h2>Autopilot mode</h2>
      <p>
        Once you approve the plan, Copilot enters autopilot mode. It works through the todos in
        dependency order, updating each status from <code>pending</code> to <code>in_progress</code> to{" "}
        <code>done</code> as it completes them. You can watch the progress in real time.
      </p>

      <CalloutBox variant="note">
        The <code>plan.md</code> is stored in a per-session folder and persists throughout the task.
        If you need to pause and resume, the plan is your checkpoint.
      </CalloutBox>

      <h2>Why this matters</h2>
      <p>
        Plan Mode solves the most common failure mode of AI coding tools: generating a lot of code
        quickly in the wrong direction. By requiring a plan review before implementation, it forces
        the same discipline as any good spec-driven workflow - just at AI speed.
      </p>

      <h2>Cost</h2>
      <p>
        Plan Mode is included in your GitHub Copilot subscription — there is no separate charge.
        However, Plan Mode sessions are longer and more context-heavy than simple completions, so
        they consume <strong>GitHub AI Credits</strong> from your monthly allowance faster than basic
        completions.
      </p>
      <CalloutBox variant="note" title="GitHub AI Credits allowance by plan">
        More capable models cost more AI credits per session (1 AI credit = $0.01 USD). Current
        monthly allowances: <strong>Copilot Pro</strong> ($10/mo) — 1,500 credits;{" "}
        <strong>Copilot Pro+</strong> ($39/mo) — 7,000 credits;{" "}
        <strong>Copilot Max</strong> ($100/mo) — 20,000 credits;{" "}
        <strong>Copilot Business</strong> ($19/seat/mo) and{" "}
        <strong>Copilot Enterprise</strong> ($39/seat/mo) — org-level credit pool. See the{" "}
        <a href="https://docs.github.com/en/copilot/get-started/plans" target="_blank" rel="noreferrer">
          GitHub Copilot pricing docs
        </a>{" "}
        for up-to-date limits.
      </CalloutBox>
    </div>
  );
}
