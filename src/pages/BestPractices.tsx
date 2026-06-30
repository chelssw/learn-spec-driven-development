import CalloutBox from "../components/CalloutBox.tsx";

const practices = [
  {
    title: "Write the spec before opening your editor",
    body: "Resist the urge to code first. The moment you open a file to write code, your thinking shifts from 'what should this do' to 'how do I make this work'. Separate those phases deliberately.",
  },
  {
    title: "Get alignment before implementation",
    body: "Show the spec to at least one other person before you start coding — a teammate, a PM, or even rubber duck it out loud. A 5-minute review catches more bugs than an hour of debugging.",
  },
  {
    title: "Treat specs as living documents",
    body: "Requirements change. When they do, update the spec first, then update the code. If the spec is out of date, it stops being a source of truth and starts being a liability.",
  },
  {
    title: "Link specs to code",
    body: "Reference the spec in your commit messages and PR descriptions. \"Implements auth spec (see plan.md)\" tells reviewers exactly where to find the design rationale. Future you will thank present you.",
  },
  {
    title: "Use specs as test criteria",
    body: "Every bullet in your spec should map to at least one test assertion. If you can't write a test for it, the spec isn't specific enough. If you don't test it, you can't verify you built what you planned.",
  },
  {
    title: "Do not skip planning for small tasks",
    body: "Scope creep starts at 'just a quick fix'. Even a one-line change has context — what's the expected behavior before and after? Writing it down takes 30 seconds and prevents misunderstandings.",
  },
  {
    title: "Use AI planning tools to surface edge cases",
    body: "AI planning tools like Copilot Plan Mode are particularly good at asking the questions you forgot to ask. Let the tool's clarifying questions be part of your planning process, not an interruption.",
  },
];

export default function BestPractices() {
  return (
    <div>
      <h1>Best Practices</h1>
      <p className="text-lg text-gray-500 italic mb-6">
        Principles for making spec-driven development work in practice.
      </p>

      <p>
        The mechanics of spec-driven development are straightforward. The discipline is harder.
        These practices help teams stay on track when the pressure to skip the spec is highest —
        which is exactly when you need it most.
      </p>

      <div className="space-y-4 my-6">
        {practices.map((p, i) => (
          <div key={p.title} className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#2da44e] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
              {i + 1}
            </div>
            <div>
              <h3 className="font-semibold text-[#1e3a5f] mt-0 mb-1">{p.title}</h3>
              <p className="text-sm text-gray-600 mb-0">{p.body}</p>
            </div>
          </div>
        ))}
      </div>

      <CalloutBox variant="key" title="The meta-practice">
        All of these practices share a common thread: make the implicit explicit. A spec is just
        your assumptions and intentions written down so they can be reviewed, debated, and tested.
      </CalloutBox>
    </div>
  );
}
