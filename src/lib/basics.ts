// S0 第3回：型の基本の練習（Issue #3）
// 各関数・変数の型は、VS Code でマウスを乗せると確かめられる。

// ① プリミティブ型と型推論

// --- 型注釈：変数名の後ろに「: 型」を書く ---
export const title: string = "数当て";
export const tries: number = 0;
export const cleared: boolean = false;

// --- 型推論：型を書かなくても、最初の値から型が決まる ---
export const score = 100; // number
export const message = `残り ${10 - tries} 回`; // string

// --- let と const で推論の結果が違う ---
export let level = "easy"; // string（あとで別の文字列を入れられる）
level = "hard";
export const mode = "easy"; // "easy"（この文字列だけ）

// --- number には int と float の区別がない ---
export const half = 7 / 2; // 3.5
export const rounded = Math.floor(7 / 2); // 3（Python の 7 // 2）

// ② 配列とタプル

// --- 配列：「要素の型[]」と書く ---
export const answers: number[] = [3, 7, 10];
export const names = ["はやと", "ぴよ"]; // string[]

// --- 空の配列は型を書く（書かないと never[] になる）---
export const history: number[] = [];
history.push(5);

// --- const でも中身は変えられる ---
answers.push(1);

// --- readonly：中身も変えられない配列 ---
export const levels: readonly string[] = ["easy", "normal", "hard"];

// --- タプル：長さと、各位置の型が決まった配列 ---
export const pos: [number, number] = [3, 5]; // [x, y]
export const record: [string, number] = ["はやと", 4]; // [名前, 回数]
const [x, y] = pos; // 分割代入（Python の x, y = pos）
export const sum = x + y;

// --- よく使うメソッド ---
export const doubled = answers.map((n) => n * 2);
export const big = answers.filter((n) => n >= 5);
export const size = answers.length;

// ③ 関数の型

export function add(a: number, b: number): number {
  return a + b;
}

export function hint(
  guess: number,
  answer: number,
): "もっと大きい" | "もっと小さい" | "正解" {
  if (guess < answer) return "もっと大きい";
  if (guess > answer) return "もっと小さい";
  return "正解";
}

// --- ? を付けると省略できる引数（型は string | undefined）---
export function greet(name?: string): string {
  if (name === undefined) {
    return "こんにちは、ゲストさん";
  }
  return `こんにちは、${name}さん`;
}

// --- 既定値 ---
export function makeRange(max: number = 100): [number, number] {
  return [1, max];
}

// --- 何も返さない関数は void ---
export function logGuess(guess: number): void {
  console.log(`入力：${guess}`);
}

// --- アロー関数と、関数そのものの型 ---
export const isEven = (n: number): boolean => n % 2 === 0;

export function countIf(
  nums: readonly number[],
  test: (n: number) => boolean,
): number {
  return nums.filter(test).length;
}
export const evens = countIf([1, 2, 3, 4], isEven); // 2

// ④ unknown と null

// --- unknown：何が入っているか分からない値。使う前に確かめる ---
export function describe(value: unknown): string {
  if (typeof value === "number") {
    return `数：${value.toFixed(1)}`;
  }
  if (typeof value === "string") {
    return `文字列：${value.toUpperCase()}`;
  }
  return "分からない値";
}

// --- null かもしれない値 ---
export function nameLength(name: string | null): number {
  if (name === null) {
    return 0;
  }
  return name.length;
}
