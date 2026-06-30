import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock.tsx";
import CalloutBox from "../components/CalloutBox.tsx";

const cursorExample = `# .cursorrules

## Code Style
- Use TypeScript strict mode
- Prefer functional components with hooks
- Never use 'any' - use 'unknown' and narrow types

## Architecture
- All API calls go through src/lib/api.ts
- State management: Zustand only (no Redux)
- Components live in src/components/, grouped by feature

## Testing
- Every new function must have a unit test
- Integration tests use Playwright`;

const aiderExample = `# CONVENTIONS.md

## Naming
- Variables: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Files: kebab-case

## Error Handling
- Never swallow errors silently
- All async functions must use try/catch
- Log errors with the logger at src/utils/logger.ts

## Commits
- Follow conventional commits: feat:, fix:, docs:, chore:
- Keep commits atomic - one concern per commit`;

const tools = [
  {
    name: "Cursor (.cursorrules / .cursor/rules)",
    file: ".cursorrules",
    description:
      "Cursor reads a .cursorrules file at your repo root as persistent context for every AI interaction. Define conventions, architecture patterns, banned libraries, and naming rules. Cursor respects these in every code generation, refactor, and chat response.",
    example: cursorExample,
    tip: "Cursor's rules are just text files - they're reviewable in PRs and version-controlled alongside your code. Treat them as living documentation.",
  },
  {
    name: "Aider (CONVENTIONS.md)",
    file: "CONVENTIONS.md",
    description:
      "Aider is a CLI-based AI coding assistant that automatically reads a CONVENTIONS.md file before generating any code. It applies your style guide, naming conventions, and architectural constraints to every edit it makes.",
    example: aiderExample,
    tip: "Aider also supports .aider.conf.yml for configuration and --read flags to include additional spec files in any session.",
  },
];

export default function AIPoweredTools() {
  return (
    <div>
      <h1>AI-Powered Spec Tools</h1>
      <p className="text-lg text-gray-500 italic mb-6">
        Tools that use specifications as persistent AI context.
      </p>

      <p>
        AI coding tools are only as good as the context they have. Without constraints, they'll generate
        code that works in isolation but violates your team's conventions, architecture, or patterns.
        AI-powered spec tools solve this by giving the model a persistent spec to reason against.
      </p>

      {tools.map((tool) => (
        <div key={tool.name}>
          <h2>{tool.name}</h2>
          <p>{tool.description}</p>
          <CodeBlock code={tool.example} language="plaintext" filename={tool.file} />
          <CalloutBox variant="tip">{tool.tip}</CalloutBox>
        </div>
      ))}

      <h2>Claude Projects / System Prompts</h2>
      <p>
        Claude Projects let you attach documents - spec files, architecture diagrams, API contracts,
        style guides - that Claude reasons against in every conversation in that project. Unlike one-off
        context pasting, the project documents are always present.
      </p>
      <CalloutBox variant="note">
        The same approach works with any LLM that supports system prompts or persistent context.
        The pattern is: attach your spec as a system prompt, then generate code that respects it.
      </CalloutBox>

      <h2>The common pattern</h2>
      <p>
        All of these tools follow the same pattern: <strong>write the spec once, reference it
        everywhere</strong>. The spec becomes a constraint that the AI operates within - not a suggestion,
        but a rule.
      </p>
      <p>
        For the most structured AI-driven workflow, see{" "}
        <Link to="/tools/copilot-plan-mode">GitHub Copilot Plan Mode</Link>, which takes this idea
        further by generating the plan itself before touching any code.
      </p>
    </div>
  );
}
