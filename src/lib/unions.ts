// S0 第5回：ユニオン型と絞り込み（Issue #7）
// 各変数・関数の型は、VS Code でマウスを乗せると確かめられる。

// ① ユニオン型と絞り込み

// --- 文字列リテラル型を | でつなぐ：この3つの文字列のどれか ---
export type Hint = "higher" | "lower" | "correct";

export let hint: Hint = "higher";
hint = "correct"; // OK：3つのうちの1つ
// hint = "hihger"; // エラー：打ち間違いを tsc が見つける
// hint = "Higher"; // エラー：大文字と小文字も区別する

// --- 違う種類の型もつなげる ---
export type Id = number | string;
export const id1: Id = 42;
export const id2: Id = "guest";

// --- typeof で絞り込む ---
export function formatId(id: Id): string {
  // ここでは id は number | string
  // return id.toUpperCase(); // エラー：number には toUpperCase がない
  if (typeof id === "number") {
    // ここでは id は number
    return `No.${id}`;
  }
  // ここでは id は string（number は上で return したので残らない）
  return id.toUpperCase();
}
export const idText1 = formatId(7); // "No.7"
export const idText2 = formatId("guest"); // "GUEST"

// --- === で絞り込む ---
export function isFinished(h: Hint): boolean {
  return h === "correct";
}

// --- switch で分ける。never で書き忘れを見つける ---
export function hintMessage(h: Hint): string {
  switch (h) {
    case "higher":
      return "もっと大きいです。";
    case "lower":
      return "もっと小さいです。";
    case "correct":
      return "正解！";
    default: {
      // 3つとも上で return したので、ここに来る h は1つも残っていない（never）
      const unreachable: never = h;
      return unreachable;
    }
  }
}
export const message1 = hintMessage("lower"); // "もっと小さいです。"

// ② 判別可能なユニオン

// --- 結果の形を2つ用意し、ok で見分ける ---
export type Level = "easy" | "normal" | "hard";
export type LevelError = "empty" | "unknown";

export type LevelResult =
  { ok: true; level: Level } | { ok: false; error: LevelError };

// --- 文字列を読み取り、OK なら level、だめなら error を返す ---
export function parseLevel(text: string): LevelResult {
  const trimmed = text.trim().toLowerCase();
  if (trimmed === "") {
    return { ok: false, error: "empty" };
  }
  if (trimmed === "easy" || trimmed === "normal" || trimmed === "hard") {
    // ここでは trimmed は "easy" | "normal" | "hard"
    return { ok: true, level: trimmed };
  }
  return { ok: false, error: "unknown" };
}
// const bad: LevelResult = { ok: true, error: "empty" }; // エラー：ok が true の形に error はない

// --- 結果を使う側：ok を確かめるまで level も error も読めない ---
export const LEVEL_ERROR_MESSAGES: Record<LevelError, string> = {
  empty: "難しさを入力してください。",
  unknown: "easy・normal・hard のどれかを入力してください。",
};

export function levelMessage(text: string): string {
  const result = parseLevel(text);
  // return result.level; // エラー：ok が false の形には level がない
  if (!result.ok) {
    // ここでは result は { ok: false; error: LevelError }
    return LEVEL_ERROR_MESSAGES[result.error];
  }
  // ここでは result は { ok: true; level: Level }
  return `難しさ：${result.level}`;
}
export const levelText1 = levelMessage(" Hard "); // "難しさ：hard"
export const levelText2 = levelMessage(""); // "難しさを入力してください。"
export const levelText3 = levelMessage("expert"); // "easy・normal・hard のどれかを入力してください。"
