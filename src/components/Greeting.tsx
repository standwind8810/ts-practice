interface GreetingProps {
  name: string;
  mark?: string;
}

export function Greeting({ name, mark = "！" }: GreetingProps) {
  return (
    <p>
      こんにちは、{name}さん{mark}
    </p>
  );
}
