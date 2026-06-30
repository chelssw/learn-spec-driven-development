import { useState } from "react";
import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock.tsx";
import CalloutBox from "../components/CalloutBox.tsx";
import SimulatorChat from "../components/SimulatorChat.tsx";

type Phase = "idle" | "questioning" | "generating" | "complete";
type ToolId = "copilot" | "speckit" | "openspec";

interface ChatMessage {
  role: "copilot" | "user";
  content: string;
}

interface Question {
  text: string;
  options: string[];
  impact: string;
}

interface ToolConfig {
  id: ToolId;
  label: string;
  tagline: string;
  agentLabel: string;
  agentColor: string;
  intro: string;
  placeholder: string;
  startMessage: string;
  doneMessage: string;
  generatingLabel: string;
  questions: Question[];
  generateOutput: (feature: string, answers: string[]) => string;
  filename: string;
  takeaway: string;
  docsPath: string;
  docsLabel: string;
}

// ── Copilot Plan Mode ─────────────────────────────────────────────────────────

function generateCopilotPlan(feature: string, answers: string[]): string {
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

// ── SpecKit ───────────────────────────────────────────────────────────────────

function generateSpeckitSpec(feature: string, answers: string[]): string {
  const requirementsState = answers[0];
  const stakeholders = answers[1];
  const overlap = answers[2];
  const checks = answers[3];

  const isGreenfield = overlap.includes("Completely new");
  const isExtending = overlap.includes("Extends");
  const isCrossFunctional = stakeholders.includes("Cross-functional");
  const allChecks = checks.includes("All of");

  const overlapNote = isGreenfield
    ? "This is a net-new feature with no overlap with existing functionality."
    : isExtending
    ? "This extends an existing feature. The spec clarifies what existing behavior is preserved."
    : "This replaces or integrates with existing functionality. Backward compatibility must be addressed.";

  const stakeholderList = isCrossFunctional
    ? "Product, Design, Engineering"
    : stakeholders.includes("Just me")
    ? "Feature owner"
    : stakeholders.includes("engineering")
    ? "Engineering team"
    : "Engineering team + External stakeholders";

  const qualityChecks = allChecks
    ? `- [x] Logical consistency: no contradictions detected
- [x] Coverage: all happy paths and edge cases have acceptance criteria
- [x] Security: data handling and permissions are specified`
    : checks.includes("Logical")
    ? `- [x] Logical consistency: no contradictions detected
- [ ] Coverage: not checked
- [ ] Security: not checked`
    : checks.includes("Test")
    ? `- [ ] Logical consistency: not checked
- [x] Coverage: all paths have defined acceptance criteria
- [ ] Security: not checked`
    : `- [ ] Logical consistency: not checked
- [ ] Coverage: not checked
- [x] Security: data handling and permissions are specified`;

  const requirementNote =
    requirementsState.includes("Rough idea")
      ? "Requirements are in early draft state. Treat this spec as a living document."
      : requirementsState.includes("User stories")
      ? "User stories and acceptance criteria are pre-drafted. Spec formalizes them."
      : requirementsState.includes("locked")
      ? "Requirements are locked. Spec reflects the final, approved definition."
      : "Requirements were reverse-engineered from existing behavior. Spec documents intent, not just current behavior.";

  return `# ${feature} - Specification

## Meta
- **Status:** draft
- **Stakeholders:** ${stakeholderList}
- **Created:** ${new Date().toISOString().split("T")[0]}

## Summary
${feature}

## Requirements Context
${requirementNote}

## Scope
${overlapNote}

## Acceptance Criteria
- [ ] Feature behaves as described in all documented happy-path scenarios
- [ ] All edge cases listed below have defined, testable outcomes
- [ ] No regressions introduced to adjacent functionality
${!isGreenfield ? "- [ ] Existing consumers are unaffected or a migration path is documented\n" : ""}
## Edge Cases
- Empty or null inputs are handled gracefully
- Concurrent access does not produce inconsistent state
- Failure modes surface appropriate error messages

## Out of Scope
- Performance optimization (unless specified as a requirement)
- Unrelated refactoring of adjacent code

---

## SpecKit Quality Checks
${qualityChecks}`;
}

// ── OpenSpec ──────────────────────────────────────────────────────────────────

function generateOpenSpec(feature: string, answers: string[]): string {
  const codebaseState = answers[0];
  const changeType = answers[1];
  const consumers = answers[2];
  const concern = answers[3];

  const slug = feature.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const isLegacy = codebaseState.includes("Legacy");
  const isNewEndpoint = changeType.includes("New API");
  const isBreaking = changeType.includes("Modifying") || changeType.includes("Deprecating");
  const hasExternalConsumers = consumers.includes("External") || consumers.includes("Multiple");

  const contextNote = isLegacy
    ? "This area has minimal documentation. This spec is the primary source of truth for intended behavior."
    : codebaseState.includes("well-documented")
    ? "The existing code is well-documented. This spec captures new behavior being added alongside existing docs."
    : codebaseState.includes("another team")
    ? "This code is owned by another team. Changes must go through their review process before implementation."
    : "No existing code in this area. Spec-first approach applied before any implementation begins.";

  const migrationSection = isBreaking
    ? `## Migration Path
- Existing consumers must be notified before deployment
- Deprecation notice required at least one release cycle in advance
- Compatibility shim maintained for ${hasExternalConsumers ? "at least 6 months" : "one sprint"} post-change

`
    : "";

  const consumerSection = hasExternalConsumers
    ? `## Consumers
- External consumers: this spec is the contract. Breaking changes require a version bump.
- Internal services: coordinate via standard PR review.

`
    : `## Consumers
- Internal consumers only. Breaking changes are acceptable with coordinated deploys.

`;

  const openQuestion =
    concern.includes("Breaking")
      ? "- [ ] Have all consumers been identified and notified?"
      : concern.includes("drifting")
      ? "- [ ] What is the process for keeping this spec in sync with implementation?"
      : concern.includes("alignment")
      ? "- [ ] Has the team reviewed and signed off on this spec before coding begins?"
      : "- [ ] Has this spec been shared with everyone who needs to understand this code?";

  return `---
title: "${feature}"
version: draft
created: ${new Date().toISOString().split("T")[0]}
type: ${isNewEndpoint ? "new-feature" : isBreaking ? "breaking-change" : "refactor"}
spec-file: .specs/${slug}.md
---

# ${feature}

## Context
${contextNote}

## Current State
${codebaseState}

## Proposed Change
${changeType} — ${feature}

${consumerSection}## Constraints
- Spec must be reviewed and approved before implementation begins
- This file is version-controlled alongside the code it describes
- Changes to this spec require a PR review${hasExternalConsumers ? " from consumer teams" : ""}

${migrationSection}## Open Questions
${openQuestion}
- [ ] What does rollback look like if this change needs to be reverted?

---
*Lock this spec: \`openspec lock .specs/${slug}.md --tag v1.0.0\`*`;
}

// ── Tool configurations ───────────────────────────────────────────────────────

const tools: ToolConfig[] = [
  {
    id: "copilot",
    label: "Copilot Plan Mode",
    tagline: "AI-guided feature planning from description to plan.md.",
    agentLabel: "C",
    agentColor: "bg-[#1e3a5f]",
    intro:
      "Describe the feature you want to build, answer Copilot's clarifying questions, and watch a complete plan.md get generated — shaped by your specific answers.",
    placeholder: `e.g. "Add user authentication to this Express API" or "Build a dashboard for tracking sales metrics"`,
    startMessage: "Got it. Before I write the plan, I have a few questions to make sure I get this right.",
    doneMessage: "Perfect. I have everything I need. Generating your plan now...",
    generatingLabel: "Generating your plan.md...",
    questions: [
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
        impact: "This added explicit constraints so Copilot avoids approaches that violate them before writing a single file.",
      },
      {
        text: "What does success look like for this feature?",
        options: [
          "All unit and integration tests pass",
          "A specific user flow works end-to-end",
          "Stakeholder sign-off on the described behavior",
          "All of the above",
        ],
        impact: "This set the acceptance criteria — the final todo reflects exactly what 'done' means for your team.",
      },
    ],
    generateOutput: generateCopilotPlan,
    filename: "plan.md",
    takeaway:
      "Every question Copilot asks removes an assumption from the plan. The plan above is different from what you'd get by skipping straight to 'write the code' — it reflects your actual constraints, not guesses.",
    docsPath: "/tools/copilot-plan-mode",
    docsLabel: "Read the full Plan Mode docs",
  },
  {
    id: "speckit",
    label: "SpecKit",
    tagline: "Spec-first development with living Markdown artifacts and quality checks.",
    agentLabel: "SK",
    agentColor: "bg-purple-700",
    intro:
      "Describe the feature you want to spec out, answer SpecKit's clarifying questions, and get a spec.md with automated quality checks — ready to commit alongside your code.",
    placeholder: `e.g. "User notification preferences" or "Automated invoice generation for billing module"`,
    startMessage: "Ready to create your spec. A few questions to ground it in your actual context.",
    doneMessage: "All questions answered. Running spec generation and quality checks...",
    generatingLabel: "Generating spec.md and running quality checks...",
    questions: [
      {
        text: "How complete are your requirements right now?",
        options: [
          "Rough idea only - nothing written down yet",
          "User stories or acceptance criteria are already drafted",
          "Requirements are locked and signed off",
          "Need to reverse-engineer requirements from existing code",
        ],
        impact: "This determined how prescriptive the generated spec would be — a living draft vs. a locked contract.",
      },
      {
        text: "Who needs to review and approve this spec before work begins?",
        options: [
          "Just me - I own this feature end to end",
          "My immediate team - engineering only",
          "Cross-functional: product, design, and engineering",
          "External stakeholders or partners",
        ],
        impact: "This set the stakeholder list in the spec and determined the review process SpecKit recommends.",
      },
      {
        text: "Does this feature overlap with existing functionality?",
        options: [
          "Completely new - no overlap with existing features",
          "Extends an existing feature with new behavior",
          "Replaces or refactors existing functionality",
          "Integrates with another team's system",
        ],
        impact: "This shaped the scope section and whether SpecKit adds backward-compatibility requirements.",
      },
      {
        text: "Which quality checks should SpecKit run on this spec?",
        options: [
          "Logical consistency - no contradictions in requirements",
          "Test coverage - all paths have acceptance criteria",
          "Security and compliance - data handling is specified",
          "All of the above",
        ],
        impact: "This configured which automated checks SpecKit ran before generating the final spec.",
      },
    ],
    generateOutput: generateSpeckitSpec,
    filename: "spec.md",
    takeaway:
      "SpecKit's quality checks catch spec gaps before a line of code is written. The spec above is a living document — commit it, review it in PRs, and update it as requirements evolve. It's still useful long after the sprint ends.",
    docsPath: "/tools/speckit",
    docsLabel: "Read the full SpecKit docs",
  },
  {
    id: "openspec",
    label: "OpenSpec",
    tagline: "Brownfield-first specs that live in your repository, not in a wiki.",
    agentLabel: "OS",
    agentColor: "bg-orange-600",
    intro:
      "Describe a feature on an existing codebase, answer a few questions about the current state, and get a spec file that belongs in your repository alongside the code it describes.",
    placeholder: `e.g. "Refactor the payments module to support multiple currencies" or "Add rate limiting to the public API"`,
    startMessage: "Let's build a spec for your existing codebase. A few questions about the current state first.",
    doneMessage: "Context captured. Generating your OpenSpec file now...",
    generatingLabel: "Generating .specs/[feature].md...",
    questions: [
      {
        text: "How would you describe the current state of this codebase area?",
        options: [
          "Legacy code with minimal documentation",
          "Well-documented but needs new functionality added",
          "Active codebase owned by another team",
          "No existing code - spec-first for new work",
        ],
        impact: "This set the context section and determined whether OpenSpec frames the spec as discovery documentation or a change proposal.",
      },
      {
        text: "What type of change are you speccing out?",
        options: [
          "New API endpoint or resource",
          "Modifying behavior of an existing endpoint",
          "Deprecating or removing functionality",
          "Internal refactor with no external contract change",
        ],
        impact: "This determined the spec type in the frontmatter and whether OpenSpec generates a migration path section.",
      },
      {
        text: "Who are the consumers of this code?",
        options: [
          "Internal services only",
          "Frontend clients we control",
          "External API consumers or partners",
          "Multiple consumers across teams",
        ],
        impact: "This shaped the consumers section and set expectations around breaking changes and versioning.",
      },
      {
        text: "What is your primary concern with this change?",
        options: [
          "Breaking existing consumers unintentionally",
          "Spec drifting away from implementation over time",
          "Getting team alignment before coding starts",
          "Onboarding new developers to understand this code",
        ],
        impact: "This added a targeted open question to the spec, surfacing the risk most relevant to your situation.",
      },
    ],
    generateOutput: generateOpenSpec,
    filename: ".specs/[feature].md",
    takeaway:
      "OpenSpec treats specs as first-class artifacts in your repository. The file above doesn't expire when the sprint ends — it persists as the source of truth for this feature, version-controlled and reviewable alongside the code it describes.",
    docsPath: "/tools/openspec",
    docsLabel: "Read the full OpenSpec docs",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function PlanModeSimulator() {
  const [selectedToolId, setSelectedToolId] = useState<ToolId>("copilot");
  const [phase, setPhase] = useState<Phase>("idle");
  const [featureInput, setFeatureInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [generatedOutput, setGeneratedOutput] = useState("");

  const tool = tools.find((t) => t.id === selectedToolId)!;

  function switchTool(id: ToolId) {
    setSelectedToolId(id);
    setPhase("idle");
    setFeatureInput("");
    setMessages([]);
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setGeneratedOutput("");
  }

  function reset() {
    setPhase("idle");
    setFeatureInput("");
    setMessages([]);
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setGeneratedOutput("");
  }

  function startSession() {
    if (!featureInput.trim()) return;
    setMessages([
      { role: "user", content: featureInput.trim() },
      { role: "copilot", content: tool.startMessage },
    ]);
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setPhase("questioning");
  }

  function submitAnswer() {
    if (selectedOption === null) return;
    const answer = tool.questions[currentQ].options[selectedOption];
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "copilot", content: tool.questions[currentQ].text },
      { role: "user", content: answer },
    ];
    const newAnswers = [...answers, answer];
    setMessages(newMessages);
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQ + 1 < tool.questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setMessages([...newMessages, { role: "copilot", content: tool.doneMessage }]);
      setPhase("generating");
      setTimeout(() => {
        setGeneratedOutput(tool.generateOutput(featureInput.trim(), newAnswers));
        setPhase("complete");
      }, 1400);
    }
  }

  return (
    <div>
      <h1>Tool Simulators</h1>
      <p className="text-lg text-gray-500 italic mb-6">
        Walk through a real spec-driven workflow for Copilot Plan Mode, SpecKit, or OpenSpec.
      </p>

      {/* Tool selector */}
      <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-200">
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => switchTool(t.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-colors ${
              selectedToolId === t.id
                ? "bg-[#1e3a5f] text-white border-[#1e3a5f]"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tool tagline */}
      <p className="text-sm font-medium text-gray-500 mb-5 -mt-2">{tool.tagline}</p>

      {/* ── Idle ── */}
      {phase === "idle" && (
        <>
          <p>{tool.intro}</p>
          <CalloutBox variant="tip">
            Use a feature you're actually thinking about building. The questions and output will be
            more useful if the scenario feels real.
          </CalloutBox>
          <div className="my-6">
            <label className="block text-sm font-semibold text-[#1e3a5f] mb-2">
              Describe the feature you want to{" "}
              {tool.id === "openspec" ? "spec out" : "build"}
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2da44e] resize-none"
              rows={3}
              placeholder={tool.placeholder}
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
              Start →
            </button>
          </div>
        </>
      )}

      {/* ── Questioning / Generating ── */}
      {(phase === "questioning" || phase === "generating") && (
        <div className="space-y-5">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Session in progress
            </p>
            <SimulatorChat
              messages={messages}
              agentLabel={tool.agentLabel}
              agentColor={tool.agentColor}
            />
          </div>

          {phase === "questioning" && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-[#1e3a5f]">
                  Question {currentQ + 1} of {tool.questions.length}
                </p>
                <p className="text-xs text-gray-400">
                  {tool.questions.length - currentQ - 1} remaining
                </p>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
                <div
                  className="bg-[#2da44e] h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(currentQ / tool.questions.length) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-800 font-medium mb-3">
                {tool.questions[currentQ].text}
              </p>
              <div className="space-y-2">
                {tool.questions[currentQ].options.map((opt, i) => (
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
                {currentQ + 1 === tool.questions.length ? "Generate →" : "Next Question →"}
              </button>
            </div>
          )}

          {phase === "generating" && (
            <div className="flex items-center gap-3 text-sm text-gray-500 py-2">
              <div className="w-4 h-4 border-2 border-[#2da44e] border-t-transparent rounded-full animate-spin" />
              {tool.generatingLabel}
            </div>
          )}
        </div>
      )}

      {/* ── Complete ── */}
      {phase === "complete" && (
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Session complete
            </p>
            <SimulatorChat
              messages={messages}
              agentLabel={tool.agentLabel}
              agentColor={tool.agentColor}
            />
          </div>

          <div>
            <h2 className="mt-0">Your generated {tool.filename}</h2>
            <CodeBlock code={generatedOutput} language="plaintext" filename={tool.filename} />
          </div>

          <div>
            <h2>Why those questions mattered</h2>
            <div className="space-y-3">
              {tool.questions.map((q, i) => (
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
            {tool.takeaway}
          </CalloutBox>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={reset}
              className="px-5 py-2.5 border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
            >
              ← Try a different feature
            </button>
            <Link
              to={tool.docsPath}
              className="px-5 py-2.5 bg-[#1e3a5f] hover:bg-[#162d4a] text-white text-sm font-semibold rounded-lg transition-colors no-underline"
            >
              {tool.docsLabel} →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
