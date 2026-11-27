interface GreetingProps {
  name: string;
}

export function Greeting(props: GreetingProps) {
  return <p>こんにちは、{props.name}さん！</p>;
}
