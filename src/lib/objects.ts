// S0 第4回：オブジェクトの型（Issue #5）
// 各変数・関数の型は、VS Code でマウスを乗せると確かめられる。

// ① オブジェクトの型をその場で書く

// --- オブジェクト：{ キー: 値 } の集まり（Python の dict に近い）---
export const player = { name: "はやと", best: 4 };
// 推論された型：{ name: string; best: number }

// --- 型をその場で書く：「キー: 型」を ; で区切る ---
export const guest: { name: string; best: number } = {
  name: "ゲスト",
  best: 10,
};

// --- プロパティを読む・書き換える（Python の guest["best"] ではなく guest.best）---
export const guestName = guest.name; // string
guest.best = 8; // const でも中身は書き換えられる（配列と同じ）

// --- 関数の引数にオブジェクトの型を書く ---
export function formatBest(p: { name: string; best: number }): string {
  return `${p.name}さんの最高記録：${p.best} 回`;
}
export const line = formatBest(player);

// --- 型にないプロパティ・足りないプロパティはエラー ---
// guest.score; // エラー：score というプロパティはない
// const lacking: { name: string; best: number } = { name: "x" }; // エラー：best がない

// --- 余分なプロパティのチェック ---
// formatBest({ name: "x", best: 1, age: 20 }); // エラー：age は型にない
const withAge = { name: "ぴよ", best: 5, age: 20 };
export const line2 = formatBest(withAge); // OK：変数を通すと余分なものは許される

// ② interface と type で型に名前を付ける

// --- interface：オブジェクトの型に名前を付ける ---
export interface Player {
  name: string;
  best: number;
}

// --- type：型に名前を付ける（型エイリアス）。= を書く ---
export type Score = {
  player: string;
  tries: number;
};

// --- 名前を付けた型を使う ---
export const hayato: Player = { name: "はやと", best: 4 };
export const firstScore: Score = { player: "はやと", tries: 6 };

export function formatPlayer(p: Player): string {
  return `${p.name}さんの最高記録：${p.best} 回`;
}
export const line3 = formatPlayer(player); // 推論された player も、形が合えば Player として渡せる

// --- ? で省略できるプロパティ、readonly で書き換えられないプロパティ ---
export interface GameSettings {
  readonly max: number; // 作った後は書き換えられない
  maxTries?: number; // なくてもよい（読むと number | undefined）
}

export const easy: GameSettings = { max: 10 };
export const hard: GameSettings = { max: 100, maxTries: 7 };
hard.maxTries = 8; // readonly でないものは書き換えられる

export function triesText(s: GameSettings): string {
  if (s.maxTries === undefined) {
    return "回数の制限なし";
  }
  return `${s.maxTries} 回まで`; // ここでは number に絞り込まれている
}

// easy.max = 20; // エラー：readonly
// easy.maxTries.toFixed(); // エラー：undefined かもしれない

// --- type はオブジェクト以外にも名前を付けられる（interface はオブジェクトだけ）---
export type Level = "easy" | "normal" | "hard";
export type Pos = [number, number];

export const level: Level = "normal";
export const start: Pos = [0, 0];

// ③ 型を組み合わせる

// --- interface は extends で広げる（元の項目を全部受け継ぎ、項目を足す）---
export interface Named {
  name: string;
}
export interface Ranked extends Named {
  rank: number;
}
export const top: Ranked = { name: "はやと", rank: 1 };

// --- type は & で合わせる（交差型：両方の項目を全部持つ）---
export type WithTime = {
  seconds: number;
};
export type TimedScore = Score & WithTime;
export const fastScore: TimedScore = { player: "ぴよ", tries: 5, seconds: 32 };

// --- interface と type は混ぜて使える ---
export interface TimedPlayer extends Player, WithTime {
  date: string;
}
export const record1: TimedPlayer = {
  name: "はやと",
  best: 4,
  seconds: 40,
  date: "2026-11-18",
};

// --- 項目がぶつかったときの違い ---
// interface Bad extends Named { name: number } // エラー：name の型が合わないと、その場で教えてくれる
// type Odd = Named & { name: number }; // エラーにならない。name は「string かつ number」= never になる

// ④ オブジェクトの配列、入れ子、Record

// --- オブジェクトの配列：「型[]」---
export interface GameResult {
  tries: number;
  cleared: boolean;
}
export const results: GameResult[] = [
  { tries: 4, cleared: true },
  { tries: 10, cleared: false },
  { tries: 6, cleared: true },
];

// --- 配列のメソッドとあわせて使う ---
export const clearedTries = results
  .filter((r) => r.cleared)
  .map((r) => r.tries); // number[]

// --- 番号で読むと undefined かもしれない（noUncheckedIndexedAccess）---
export function firstTries(list: readonly GameResult[]): number | undefined {
  const first = list[0]; // GameResult | undefined
  return first?.tries; // ?. ：first が undefined なら、そこで止めて undefined を返す
}

// --- 入れ子のオブジェクト：作った型を項目の型に使う ---
export interface GameLog {
  player: Player;
  settings: GameSettings;
  results: GameResult[];
}
export const log: GameLog = {
  player: { name: "はやと", best: 4 },
  settings: { max: 100, maxTries: 10 },
  results, // results: results の省略
};
export const logName = log.player.name; // string

// --- Record<キーの型, 値の型>：キーが決まった種類のオブジェクト ---
export const bestByLevel: Record<Level, number> = {
  easy: 3,
  normal: 5,
  hard: 8,
};

// --- キーが自由な Record：Python の dict[str, int] に近い ---
export const bestByName: Record<string, number> = { はやと: 4, ぴよ: 5 };
export function bestOf(name: string): number | undefined {
  return bestByName[name]; // ない名前かもしれないので number | undefined
}
