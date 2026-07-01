import { useState } from "react";
import { useQandA } from "../hooks/useQandA";
import QuestionCard from "../components/QuestionCard";
import CalloutBox from "../components/CalloutBox";

export default function QandA() {
  const { questions, loading, error, submitQuestion, submitAnswer, upvoteQuestion, upvoteAnswer } =
    useQandA();
  const [questionText, setQuestionText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleQuestionSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = questionText.trim();
    if (!trimmed) return;
    setSubmitting(true);
    await submitQuestion(trimmed);
    setQuestionText("");
    setSubmitting(false);
  }

  return (
    <div>
      <h1>Community Q &amp; A</h1>
      <p className="text-lg text-gray-500 italic mb-6">
        Ask questions, share answers, and learn from the community.
      </p>

      <CalloutBox variant="tip" title="How it works">
        Ask a question below and it will appear live for all visitors. Anyone can post an answer or
        upvote the most helpful contributions.
      </CalloutBox>

      {/* Question submission form */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mb-8">
        <h2 className="text-base font-semibold text-[#1e3a5f] mb-3">Ask a question</h2>
        <form onSubmit={handleQuestionSubmit} className="flex flex-col gap-3">
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="What would you like to know about spec-driven development?"
            rows={3}
            className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !questionText.trim()}
              className="bg-[#1e3a5f] text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-[#162e4d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? "Submitting…" : "Submit Question"}
            </button>
          </div>
        </form>
      </div>

      {/* Questions list */}
      <h2 className="mb-4">Questions</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-4">
          <strong>Connection error:</strong> {error}
        </div>
      )}

      {loading && !error && (
        <div className="flex items-center gap-2 text-gray-400 text-sm py-8 justify-center">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Connecting to Firebase…
        </div>
      )}

      {!loading && !error && questions.length === 0 && (
        <p className="text-gray-400 italic text-sm text-center py-8">
          No questions yet — be the first to ask one above!
        </p>
      )}

      {!loading && questions.length > 0 && (
        <div className="space-y-3">
          {questions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              onUpvoteQuestion={upvoteQuestion}
              onUpvoteAnswer={upvoteAnswer}
              onSubmitAnswer={submitAnswer}
            />
          ))}
        </div>
      )}
    </div>
  );
}
