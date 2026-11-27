import { useState } from "react";

interface CounterProps {
  initial?: number;
  step?: number;
}

export function Counter({ initial = 0, step = 1 }: CounterProps) {
  const [count, setCount] = useState(initial);

  return (
    <div>
      <p>カウント：{count}</p>
      <button type="button" onClick={() => setCount((c) => c - step)}>
        −{step}
      </button>
      <button type="button" onClick={() => setCount((c) => c + step)}>
        ＋{step}
      </button>
      <button type="button" onClick={() => setCount(initial)}>
        リセット
      </button>
      {count < 0 && <p>マイナスになりました</p>}
    </div>
  );
}
