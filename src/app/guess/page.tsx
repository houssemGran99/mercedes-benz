import type { Metadata } from "next";
import { GUESSABLE, CLASS_CODES } from "@/lib/catalog";
import { GuessGame } from "@/components/GuessGame";

export const metadata: Metadata = {
  title: "Guess the Model",
  description: "Look at the photo and guess the Mercedes-Benz class: A, CLA, CLE, S and more.",
};

export default function GuessPage() {
  return (
    <>
      <div className="mx-auto max-w-2xl px-4 pt-12 text-center sm:px-6">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted">A game</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Guess the Model</h1>
        <p className="mt-3 text-muted">
          A photo, four badges, one right answer. How well do you know your A from your CLA?
        </p>
      </div>
      <GuessGame pool={GUESSABLE} allCodes={CLASS_CODES} />
    </>
  );
}
