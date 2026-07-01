import { useState } from "react";
import type { Question } from "../hooks/useQandA";

interface Props {
  question: Question;
  onUpvoteQuestion: (id: string) => void;
  onUpvoteAnswer: (questionId: string, answerId: string) => void;
  onSubmitAnswer: (questionId: string, text: string) => Promise<void>;
}

export default function QuestionCard({
  question,
  onUpvoteQuestion,
  onUpvoteAnswer,
  onSubmitAnswer,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleAnswerSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = answerText.trim();
    if (!trimmed) return;
    setSubmitting(true);
    await onSubmitAnswer(question.id, trimmed);
    setAnswerText("");
    setSubmitting(false);
  }

  const answerCount = question.answers.length;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Question row */}
      <div className="flex items-start gap-3 p-4">
        {/* Upvote button */}
        <button
          onClick={() => onUpvoteQuestion(question.id)}
          className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-[#2da44e] transition-colors flex-shrink-0 pt-0.5"
          title="Upvote question"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          <span className="text-xs font-semibold">{question.upvotes}</span>
        </button>

        {/* Question text + meta */}
        <div className="flex-1 min-w-0">
          <p className="text-gray-800 font-medium leading-snug">{question.text}</p>
          <button
            onClick={() => setExpanded((e) => !e)}
            className="mt-1.5 text-xs text-[#1e3a5f] hover:underline font-medium"
          >
            {expanded
              ? "Hide answers"
              : answerCount === 0
              ? "Answer this question"
              : `${answerCount} answer${answerCount !== 1 ? "s" : ""} — view & reply`}
          </button>
        </div>
      </div>

      {/* Expanded answers section */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-4 space-y-4">
          {/* Existing answers */}
          {answerCount === 0 ? (
            <p className="text-sm text-gray-400 italic">No answers yet — be the first!</p>
          ) : (
            <ul className="space-y-3">
              {question.answers.map((answer) => (
                <li key={answer.id} className="flex items-start gap-3 bg-white border border-gray-100 rounded-lg p-3">
                  {/* Answer upvote */}
                  <button
                    onClick={() => onUpvoteAnswer(question.id, answer.id)}
                    className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-[#2da44e] transition-colors flex-shrink-0 pt-0.5"
                    title="Upvote answer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    <span className="text-xs font-semibold">{answer.upvotes}</span>
                  </button>
                  <p className="text-sm text-gray-700 leading-relaxed">{answer.text}</p>
                </li>
              ))}
            </ul>
          )}

          {/* Answer form */}
          <form onSubmit={handleAnswerSubmit} className="flex gap-2 items-start pt-1">
            <textarea
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Write an answer…"
              rows={2}
              className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
            />
            <button
              type="submit"
              disabled={submitting || !answerText.trim()}
              className="bg-[#2da44e] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#238a3e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              {submitting ? "Posting…" : "Post"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
