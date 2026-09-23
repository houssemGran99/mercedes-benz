"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GuessRound } from "@/lib/catalog";

const ROUNDS_PER_GAME = 10;
const OPTIONS_PER_ROUND = 4;

function shuffled<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildOptions(round: GuessRound, allCodes: string[]): string[] {
  const distractors = shuffled(allCodes.filter((c) => c !== round.classCode)).slice(
    0,
    OPTIONS_PER_ROUND - 1,
  );
  return shuffled([round.classCode, ...distractors]);
}

type Game = { round: GuessRound; options: string[] }[];

function buildGame(pool: GuessRound[], allCodes: string[]): Game {
  const rounds = shuffled(pool).slice(0, Math.min(ROUNDS_PER_GAME, pool.length));
  return rounds.map((round) => ({ round, options: buildOptions(round, allCodes) }));
}

export function GuessGame({ pool, allCodes }: { pool: GuessRound[]; allCodes: string[] }) {
  // Randomised client-side only, after mount — computing it during render would
  // run once on the server and again on the client, producing different
  // shuffles and a hydration mismatch.
  const [game, setGame] = useState<Game | null>(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- randomised game must not run during SSR
    setGame(buildGame(pool, allCodes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restart = () => {
    setGame(buildGame(pool, allCodes));
    setIndex(0);
    setScore(0);
    setPicked(null);
  };

  const pick = (option: string) => {
    if (!game || picked) return;
    setPicked(option);
    if (option === game[index].round.classCode) setScore((s) => s + 1);
  };

  const next = () => {
    setPicked(null);
    setIndex((i) => i + 1);
  };

  if (!game) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="aspect-[16/10] animate-pulse rounded-2xl bg-line" />
      </div>
    );
  }

  const done = index >= game.length;

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-accent">Game over</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">
          {score} / {game.length}
        </h1>
        <p className="mt-3 text-muted">
          {score === game.length
            ? "Perfect score. You know your badges."
            : score >= game.length * 0.6
              ? "Solid run — a few badges still slip past you."
              : "The badges win this round. Give it another go."}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={restart}
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
          >
            Play again
          </button>
          <Link
            href="/"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-foreground/40"
          >
            Back to all models
          </Link>
        </div>
      </div>
    );
  }

  const { round, options } = game[index];

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between text-sm text-muted">
        <p>
          Round {index + 1} of {game.length}
        </p>
        <p className="font-mono">
          Score <span className="text-foreground">{score}</span>
        </p>
      </div>

      <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-2xl bg-line">
        <Image
          key={round.slug}
          src={round.image.src}
          alt="Guess the model"
          fill
          preload
          sizes="(min-width: 640px) 672px, 100vw"
          className="object-cover"
        />
      </div>

      <p className="mt-6 text-center text-sm text-muted">Which class is this?</p>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {options.map((option) => {
          const isCorrect = option === round.classCode;
          const isPicked = option === picked;
          const revealed = picked !== null;
          return (
            <button
              key={option}
              onClick={() => pick(option)}
              disabled={revealed}
              className={`rounded-xl border px-4 py-4 font-mono text-lg font-semibold uppercase transition ${
                revealed && isCorrect
                  ? "border-green-600 bg-green-600/10 text-green-700 dark:text-green-400"
                  : revealed && isPicked
                    ? "border-red-600 bg-red-600/10 text-red-700 dark:text-red-400"
                    : "border-line bg-surface hover:border-foreground/40"
              } ${revealed && !isPicked && !isCorrect ? "opacity-50" : ""}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="mt-6 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-muted">
            That was the <span className="font-semibold text-foreground">{round.name}</span>.
          </p>
          <button
            onClick={next}
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
          >
            {index + 1 < game.length ? "Next" : "See results"}
          </button>
        </div>
      )}
    </div>
  );
}
