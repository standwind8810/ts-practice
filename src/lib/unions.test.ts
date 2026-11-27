import { describe, expect, test } from "vitest";
import { formatId, hintMessage, isFinished, parseLevel } from "./unions";

describe("formatId", () => {
    test("number のときは No. を付ける", () => {
        expect(formatId(7)).toBe("No.7");
    });

    test("string のときは大文字にする", () => {
        expect(formatId("guest")).toBe("GUEST");
    });

    test("空文字のときはそのまま空文字", () => {
        expect(formatId("")).toBe("");
    });
});

describe("isFinished", () => {
    test("correct のときだけ true", () => {
        expect(isFinished("correct")).toBe(true);
        expect(isFinished("higher")).toBe(false);
        expect(isFinished("lower")).toBe(false);
    })
});

describe("hintMessage", () => {
    test("3つのヒントそれぞれのメッセージ", () => {
        expect(hintMessage("higher")).toBe("もっと大きいです。");
        expect(hintMessage("lower")).toBe("もっと小さいです。");
        expect(hintMessage("correct")).toBe("正解！");  
    });
});

describe("parseLevel", () => {
  test("3つの難しさは OK", () => {
    expect(parseLevel("easy")).toEqual({ ok: true, level: "easy" });
    expect(parseLevel("normal")).toEqual({ ok: true, level: "normal" });
    expect(parseLevel("hard")).toEqual({ ok: true, level: "hard" });
  });

  test("前後の空白と大文字は無視する", () => {
    expect(parseLevel(" Hard ")).toEqual({ ok: true, level: "hard" });
  });

  test("空の入力と空白だけの入力は empty", () => {
    expect(parseLevel("")).toEqual({ ok: false, error: "empty" });
    expect(parseLevel("   ")).toEqual({ ok: false, error: "empty" });
  });

  test("知らない文字列は unknown", () => {
    expect(parseLevel("expert")).toEqual({ ok: false, error: "unknown" });
  });
});