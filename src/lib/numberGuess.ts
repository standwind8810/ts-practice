export const MIN = 1;
export const MAX = 100;

export type Hint = "higher" | "lower" | "correct";

export type GuessError =
  "empty" | "not-number" | "not-integer" | "out-of-range";

export type GuessResult =
  { ok: true; value: number } | { ok: false; error: GuessError };

export function createAnswer(random: number = Math.random()): number {
  return Math.floor(random * (MAX - MIN + 1)) + MIN;
}

export function validateGuess(text: string): GuessResult {
  const trimmed = text.trim();
  if (trimmed === "") {
    return { ok: false, error: "empty" };
  }
  const value = Number(trimmed);
  if (Number.isNaN(value)) {
    return { ok: false, error: "not-number" };
  }
  if (!Number.isInteger(value)) {
    return { ok: false, error: "not-integer" };
  }
  if (value < MIN || value > MAX) {
    return { ok: false, error: "out-of-range" };
  }
  return { ok: true, value };
}

export function judge(guess: number, answer: number): Hint {
  if (guess < answer) {
    return "higher";
  }
  if (guess > answer) {
    return "lower";
  }
  return "correct";
}
