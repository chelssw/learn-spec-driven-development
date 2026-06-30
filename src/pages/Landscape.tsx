import { Link } from "react-router-dom";

const categories = [
  {
    title: "Traditional Spec Tools",
    color: "bg-[#1e3a5f]",
    border: "border-[#1e3a5f]",
    items: ["OpenAPI / Swagger", "BDD / Gherkin (Cucumber)", "TDD (Red-Green-Refactor)"],
    description: "Battle-tested tools with deep ecosystem support. Ideal for teams with established processes or public-facing APIs.",
    link: "/tools/traditional",
  },
  {
    title: "AI-Powered Spec Tools",
    color: "bg-[#2da44e]",
    border: "border-[#2da44e]",
    items: ["GitHub Copilot Plan Mode", "Cursor (.cursorrules)", "Aider (CONVENTIONS.md)"],
    description: "AI tools that use specifications as persistent context, generating code that respects your constraints and conventions.",
    link: "/tools/ai-powered",
  },
  {
    title: "Hybrid Workflows",
    color: "bg-purple-700",
    border: "border-purple-700",
    items: ["Spec → AI implement", "AI plan → human review", "CI gating on spec compliance"],
    description: "Combine the reliability of traditional specs with the speed of AI generation. Best of both worlds.",
    link: "/landscape",
  },
];

export default function Landscape() {
  return (
    <div>
      <h1>The Spec-Driven Landscape</h1>
      <p className="text-lg text-gray-500 italic mb-6">
        A map of the tools and approaches available today.
      </p>

      <p>
        Spec-driven development isn't a single tool — it's a philosophy that can be applied with many
        different toolchains. The landscape breaks into three broad categories:
      </p>

      <div className="grid gap-5 my-6 sm:grid-cols-3">
        {categories.map((cat) => (
          <div key={cat.title} className={`rounded-lg border-t-4 ${cat.border} bg-white shadow-sm p-5`}>
            <h3 className={`text-base font-bold mt-0 mb-3 text-[#1e3a5f]`}>{cat.title}</h3>
            <ul className="text-sm text-gray-700 mb-3 space-y-1 list-none pl-0">
              {cat.items.map((item) => (
                <li key={item} className="flex items-center gap-2 list-none">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cat.color}`} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mb-3">{cat.description}</p>
            <Link to={cat.link} className="text-xs font-semibold text-[#2da44e]">
              Learn more →
            </Link>
          </div>
        ))}
      </div>

      <h2>How they fit together</h2>
      <p>
        These categories aren't mutually exclusive. A mature team might use OpenAPI to define an API
        contract, BDD scenarios for acceptance tests, <em>and</em> Copilot Plan Mode to plan the
        implementation — all on the same feature.
      </p>
      <p>
        The goal is always the same: establish agreement on what you're building before you build it,
        and make that agreement explicit and readable.
      </p>

      <h2>Where to start</h2>
      <p>
        If your team is new to spec-driven development, start with the{" "}
        <Link to="/tools/traditional">traditional tools</Link> — they have the most documentation,
        community support, and established patterns. Once you're comfortable, explore how{" "}
        <Link to="/tools/copilot-plan-mode">Copilot Plan Mode</Link> can accelerate your planning
        workflow.
      </p>
    </div>
  );
}
