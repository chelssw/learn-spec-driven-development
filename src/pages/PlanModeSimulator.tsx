import { useState } from "react";
import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock.tsx";
import CalloutBox from "../components/CalloutBox.tsx";
import SimulatorChat from "../components/SimulatorChat.tsx";

type Phase = "idle" | "questioning" | "generating" | "complete";

interface ChatMessage {
  role: "copilot" | "user";
  content: string;
}

const questions = [
  {
    text: "What does the current state of the codebase look like for this feature area?",
    options: [
      "No existing code - starting from scratch",
      "Partial code exists that needs to be extended",
      "Existing code that needs refactoring",
      "Third-party library or service to wrap or integrate",
    ],
    impact: "This determined whether the plan starts with a scaffolding phase or jumps straight to implementation.",
  },
  {
    text: "Who will consume this feature?",
    options: [
      "Internal use - other developers or services only",
      "End users - visible in the UI",
      "Both internal API and user-facing UI",
      "External consumers - public API or partner integration",
    ],
    impact: "This shaped whether the plan's todos include UI components or stay limited to backend and service logic.",
  },
  {
    text: "Are there constraints I should account for in the plan?",
    options: [
      "Must integrate with the existing auth and permissions system",
      "No new dependencies - use what is already installed",
      "Must remain backward compatible with current behavior",
      "No specific constraints - a fresh approach is fine",
    ],
    impact: "This added explicit constraints so Copilot avoids approaches that would violate them before writing a single file.",
  },
  {
    text: "What does success look like for this feature?",
    options: [
      "All unit and integration tests pass",
      "A specific user flow works end-to-end",
      "Stakeholder sign-off on the described behavior",
      "All of the above",
    ],
    impact: "This set the acceptance criteria - the final todo in the plan reflects exactly what done means for your team.",
  },
];

function generatePlan(feature: string, answers: string[]): string {
  const isGreenfield = answers[0].includes("scratch");
  const isFullStack = answers[1].includes("Both");
  const isUserFacing = isFullStack || answers[1].includes("UI") || answers[1].includes("user");
  const hasConstraint = !answers[2].includes("No specific");
  const constraint = hasConstraint ? answers[2] : null;
  const doneDefinition = answers[3];

  const todos: { id: string; title: string }[] = [
    { id: "spec-review", title: "Review this plan with stakeholders" },
    {
      id: "core-logic",
      title: isGreenfield
        ? "Scaffold and implement core feature logic"
        : "Extend and refactor existing code",
    },
    ...(isUserFacing
      ? [{ id: "ui-components", title: "Build UI components and wire to core" }]
      : []),
    { id: "unit-tests", title: "Write unit tests for core logic" },
    { id: "integration", title: "End-to-end validation" },
    { id: "docs", title: "Update documentation and changelog" },
  ];

  const deps = [
    "core-logic      depends on spec-review",
    ...(isUserFacing ? ["ui-components   depends on core-logic"] : []),
    "unit-tests      depends on core-logic",
    "integration     depends on unit-tests",
    "docs            depends on integration",
  ];

  const rows = todos
    .map((t) => `| ${t.id.padEnd(15)} | ${t.title.padEnd(42)} | pending |`)
    .join("\n");

  const approachLines = [
    isGreenfield
      ? "Building from scratch with no prior code in this area."
      : "Extending and refactoring existing code.",
    isFullStack
      ? "Covers both backend logic and user-facing UI."
      : isUserFacing
      ? "User-facing feature - includes UI alongside backend logic."
      : "Backend and service layer only - no UI changes required.",
    constraint ? `Constraint: ${constraint}.` : "",
    `Definition of done: ${doneDefinition}.`,
  ]
    .filter(Boolean)
    .join("\n");

  return `# ${feature} - Implementation Plan

## Approach
${approachLines}

## Todos
| ID              | Title                                      | Status  |
|-----------------|--------------------------------------------|---------|
${rows}

## Dependencies
${deps.join("\n")}`;
}

export default function PlanModeSimulator() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [featureInput, setFeatureInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState("");

  function startSession() {
    if (!featureInput.trim()) return;
    setMessages([
      { role: "user", content: featureInput.trim() },
      {
        role: "copilot",
        content:
          "Got it. Before I write the plan, I have a few questions to make sure I get this right.",
      },
    ]);
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setPhase("questioning");
  }

  function submitAnswer() {
    if (selectedOption === null) return;
    const answer = questions[currentQ].options[selectedOption];
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "copilot", content: questions[currentQ].text },
      { role: "user", content: answer },
    ];
    const newAnswers = [...answers, answer];
    setMessages(newMessages);
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setMessages([
        ...newMessages,
        { role: "copilot", content: "Perfect. I have everything I need. Generating your plan now..." },
      ]);
      setPhase("generating");
      setTimeout(() => {
        setGeneratedPlan(generatePlan(featureInput.trim(), newAnswers));
        setPhase("complete");
      }, 1200);
    }
  }

  function reset() {
    setPhase("idle");
    setFeatureInput("");
    setMessages([]);
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setGeneratedPlan("");
  }

  return (
    <div>
      <h1>Plan Mode Simulator</h1>
      <p className="text-lg text-gray-500 italic mb-6">
        Experience a Copilot Plan Mode session from feature description to generated plan.md.
      </p>

      {phase === "idle" && (
        <>
          <p>
            This simulator walks you through a real Plan Mode session. Describe the feature you want
            to build, answer Copilot's clarifying questions, and watch a complete{" "}
            <code>plan.md</code> get generated - shaped by your specific answers.
          </p>
          <CalloutBox variant="tip">
            Use a feature you're actually thinking about building. The questions and plan will be
            more useful if the scenario feels real.
          </CalloutBox>
          <div className="my-6">
            <label className="block text-sm font-semibold text-[#1e3a5f] mb-2">
              Describe the feature you want to build
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2da44e] resize-none"
              rows={3}
              placeholder={`e.g. "Add user authentication to this Express API" or "Build a dashboard for tracking sales metrics"`}
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  startSession();
                }
              }}
            />
            <button
              onClick={startSession}
              disabled={!featureInput.trim()}
              className="mt-3 px-5 py-2.5 bg-[#2da44e] hover:bg-[#25913f] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Start Planning →
            </button>
          </div>
        </>
      )}

      {(phase === "questioning" || phase === "generating") && (
        <div className="space-y-5">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Session in progress
            </p>
            <SimulatorChat messages={messages} />
          </div>

          {phase === "questioning" && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-[#1e3a5f]">
                  Question {currentQ + 1} of {questions.length}
                </p>
                <p className="text-xs text-gray-400">
                  {questions.length - currentQ - 1} remaining
                </p>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
                <div
                  className="bg-[#2da44e] h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(currentQ / questions.length) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-800 font-medium mb-3">{questions[currentQ].text}</p>
              <div className="space-y-2">
                {questions[currentQ].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOption(i)}
                    className={`w-full text-left px-4 py-2.5 text-sm rounded-lg border transition-colors ${
                      selectedOption === i
                        ? "border-[#2da44e] bg-green-50 text-[#1e3a5f] font-medium"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button
                onClick={submitAnswer}
                disabled={selectedOption === null}
                className="mt-4 px-5 py-2.5 bg-[#1e3a5f] hover:bg-[#162d4a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
              >
                {currentQ + 1 === questions.length ? "Generate Plan →" : "Next Question →"}
              </button>
            </div>
          )}

          {phase === "generating" && (
            <div className="flex items-center gap-3 text-sm text-gray-500 py-2">
              <div className="w-4 h-4 border-2 border-[#2da44e] border-t-transparent rounded-full animate-spin" />
              Generating your plan...
            </div>
          )}
        </div>
      )}

      {phase === "complete" && (
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Session complete
            </p>
            <SimulatorChat messages={messages} />
          </div>

          <div>
            <h2 className="mt-0">Your generated plan.md</h2>
            <CodeBlock code={generatedPlan} language="plaintext" filename="plan.md" />
          </div>

          <div>
            <h2>Why those questions mattered</h2>
            <div className="space-y-3">
              {questions.map((q, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 bg-white">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Question {i + 1}
                  </p>
                  <p className="text-sm text-gray-700 font-medium mb-1">{q.text}</p>
                  <p className="text-sm">
                    <span className="font-medium text-[#2da44e]">You answered: </span>
                    <span className="text-gray-600">{answers[i]}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{q.impact}</p>
                </div>
              ))}
            </div>
          </div>

          <CalloutBox variant="key" title="The takeaway">
            Every question Copilot asks removes an assumption from the plan. The plan above is
            different from what you'd get if you'd skipped straight to "write the code" - because
            it reflects your actual constraints, not guesses.
          </CalloutBox>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={reset}
              className="px-5 py-2.5 border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
            >
              ← Try a different feature
            </button>
            <Link
              to="/tools/copilot-plan-mode"
              className="px-5 py-2.5 bg-[#1e3a5f] hover:bg-[#162d4a] text-white text-sm font-semibold rounded-lg transition-colors no-underline"
            >
              Read the full Plan Mode docs →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
