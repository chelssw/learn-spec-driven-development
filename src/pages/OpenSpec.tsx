import CalloutBox from "../components/CalloutBox.tsx";

const differentiators = [
  {
    title: "Lightweight",
    description: "Minimal steps, minimal process. OpenSpec is designed to get you building as quickly as possible - a good-enough plan in 10 minutes, not a waterfall document that takes days.",
  },
  {
    title: "Brownfield-first",
    description: "Most planning tools assume you're starting fresh. OpenSpec focuses on mature, existing codebases where the real challenge is figuring out how the current system works before changing it.",
  },
  {
    title: "Specs live in your code",
    description: "Specs are checked into your repository alongside your code. They preserve the functional requirements behind each feature - so you always know what the code is supposed to do, not just what it currently does.",
  },
  {
    title: "Multi-session and shareable",
    description: "Unlike agent plan modes that only last a single chat session, OpenSpec plans persist across sessions and can be shared with teammates. Bring the same spec through the entire development lifecycle.",
  },
  {
    title: "Agent-agnostic",
    description: "OpenSpec is a universal planning layer that works with any coding agent. As agents evolve and change, your specs don't care - they're yours, independent of any one tool.",
  },
];

export default function OpenSpec() {
  return (
    <div>
      <h1>OpenSpec</h1>
      <p className="text-lg text-gray-500 italic mb-6">
        A lightweight, brownfield-first workspace for feature planning that lives in your codebase.
      </p>

      <p>
        OpenSpec is a planning tool built around the idea that specs should be a permanent part of
        your codebase - not a one-time artifact you throw away after the first sprint. It provides a
        structured workspace for feature planning that persists across sessions, works on existing
        codebases, and is portable across any coding agent.
      </p>

      <CalloutBox variant="key" title="Core idea">
        You wouldn't ask an architect to build a house without a plan. Specs serve as alignment -
        a way to structure your thinking in a single space before a single line of code is written.
      </CalloutBox>

      <h2>What makes OpenSpec different</h2>
      <div className="space-y-4 my-6">
        {differentiators.map((d, i) => (
          <div key={d.title} className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
              {i + 1}
            </div>
            <div>
              <h3 className="font-semibold text-[#1e3a5f] mt-0 mb-1">{d.title}</h3>
              <p className="text-sm text-gray-600 mb-0">{d.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Using OpenSpec on an existing codebase</h2>
      <p>
        OpenSpec is designed for brownfield development. Specs get created as you build - you don't
        need to document your entire system upfront. Create a spec when you're about to add a feature
        or change existing behavior, and build your spec coverage incrementally over time.
      </p>

      <CalloutBox variant="tip">
        OpenSpec recommends collaborating on specs through your normal git workflow: PRs, reviews,
        and version history. Since specs live in your repo, they get the same review process as code.
      </CalloutBox>

      <h2>How teams collaborate</h2>
      <p>
        Specs and changes live in your codebase, so team collaboration happens through git - pull
        requests, code reviews, and the standard workflow your team already uses. For complex cases
        like large codebases, multi-repo systems, or microservices, OpenSpec is building deeper
        team collaboration features.
      </p>

      <h2>Is this just waterfall?</h2>
      <p>
        No. Waterfall fails because of rigid plans and months of upfront work. OpenSpec is neither.
        The goal is a good-enough plan in minimal time - then start coding. When requirements change,
        update the spec and keep going. Specs are living documents, not contracts.
      </p>

      <CalloutBox variant="note">
        OpenSpec works best when you actually engage with the spec - read it, think through it, and
        refine it as you go. It's a thinking aid, not an automation shortcut.
      </CalloutBox>

      <h2>Resources</h2>
      <ul>
        <li><a href="https://openspec.dev" target="_blank" rel="noreferrer">openspec.dev</a></li>
      </ul>
    </div>
  );
}
