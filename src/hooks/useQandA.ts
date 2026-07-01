import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  ref,
  onValue,
  push,
  runTransaction,
  serverTimestamp,
} from "firebase/database";

export interface Answer {
  id: string;
  text: string;
  timestamp: number;
  upvotes: number;
}

export interface Question {
  id: string;
  text: string;
  timestamp: number;
  upvotes: number;
  answers: Answer[];
}

export function useQandA() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const questionsRef = ref(db, "questions");
    const timeout = setTimeout(() => {
      setError("Could not connect to Firebase. Make sure the Realtime Database has been created in the Firebase Console and your database rules allow reads.");
      setLoading(false);
    }, 10000);

    const unsubscribe = onValue(
      questionsRef,
      (snapshot) => {
        clearTimeout(timeout);
        const data = snapshot.val();
        if (!data) {
          setQuestions([]);
          setLoading(false);
          return;
        }

        const parsed: Question[] = Object.entries(data).map(
          ([id, val]: [string, any]) => {
            const answers: Answer[] = val.answers
              ? Object.entries(val.answers).map(([aid, aval]: [string, any]) => ({
                  id: aid,
                  text: aval.text,
                  timestamp: aval.timestamp ?? 0,
                  upvotes: aval.upvotes ?? 0,
                }))
              : [];

            answers.sort((a, b) => b.upvotes - a.upvotes || b.timestamp - a.timestamp);

            return {
              id,
              text: val.text,
              timestamp: val.timestamp ?? 0,
              upvotes: val.upvotes ?? 0,
              answers,
            };
          }
        );

        parsed.sort((a, b) => b.upvotes - a.upvotes || b.timestamp - a.timestamp);
        setQuestions(parsed);
        setLoading(false);
      },
      (err) => {
        clearTimeout(timeout);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  async function submitQuestion(text: string) {
    await push(ref(db, "questions"), {
      text,
      timestamp: serverTimestamp(),
      upvotes: 0,
    });
  }

  async function submitAnswer(questionId: string, text: string) {
    await push(ref(db, `questions/${questionId}/answers`), {
      text,
      timestamp: serverTimestamp(),
      upvotes: 0,
    });
  }

  async function upvoteQuestion(questionId: string) {
    const questionRef = ref(db, `questions/${questionId}/upvotes`);
    await runTransaction(questionRef, (current) => (current ?? 0) + 1);
  }

  async function upvoteAnswer(questionId: string, answerId: string) {
    const answerRef = ref(db, `questions/${questionId}/answers/${answerId}/upvotes`);
    await runTransaction(answerRef, (current) => (current ?? 0) + 1);
  }

  return { questions, loading, error, submitQuestion, submitAnswer, upvoteQuestion, upvoteAnswer };
}
