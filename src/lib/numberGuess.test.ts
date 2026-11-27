import { describe, test, expect } from "vitest";
import { MIN, MAX, createAnswer, validateGuess, judge } from "./numberGuess";

describe("createAnswer", () => {
  test("乱数が0のときMINになる", () => {
    expect(createAnswer(0)).toBe(MIN);
  });
  test("乱数が0.5のとき", () => {
    expect(createAnswer(0.5)).toBe(51);
  });
  test("乱数が1に近いときMAXになる", () => {
    expect(createAnswer(0.9999)).toBe(MAX);
  });
  test("省略してもMIN～MAXの整数になる", () => {
    const answer = createAnswer();
    expect(answer).toBeGreaterThanOrEqual(MIN);
    expect(answer).toBeLessThanOrEqual(MAX);
    expect(Number.isInteger(answer)).toBe(true);
  });
});

describe("validateGuess", () => {
  test("境目のMINとMAXはOK", () => {
    expect(validateGuess("1")).toEqual({ ok: true, value: 1 });
    expect(validateGuess("100")).toEqual({ ok: true, value: 100 });
  });
  test("範囲外はエラー", () => {
    expect(validateGuess("0")).toEqual({ ok: false, error: "out-of-range" });
    expect(validateGuess("101")).toEqual({ ok: false, error: "out-of-range" });
  });
  test("空と空白だけはエラー", () => {
    expect(validateGuess("")).toEqual({ ok: false, error: "empty" });
    expect(validateGuess("  ")).toEqual({ ok: false, error: "empty" });
  });
  test("数でない文字はエラー", () => {
    expect(validateGuess("abc")).toEqual({ ok: false, error: "not-number" });
  });
  test("小数はエラー", () => {
    expect(validateGuess("3.5")).toEqual({ ok: false, error: "not-integer" });
  });
  test("前後の空白は無視する", () => {
    expect(validateGuess(" 42 ")).toEqual({ ok: true, value: 42 });
  });
});

describe("judge", () => {
  test("予想が答えより小さい", () => {
    expect(judge(30, 50)).toBe("higher");
  });
  test("予想が答えより大きい", () => {
    expect(judge(70, 50)).toBe("lower");
  });
  test("予想と答えが同じ", () => {
    expect(judge(50, 50)).toBe("correct");
  });
});
