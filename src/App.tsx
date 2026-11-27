import { Counter } from "./components/Counter";
import { Greeting } from "./components/Greeting";

function App() {
  const lesson = 6;
  const names = ["長谷川", "任天堂", "京大", "Switch"];

  return (
    <main>
      <h1>第{lesson}回：Reactの基本</h1>
      <p>次は第{lesson + 1}回です</p>
      {names.map((name) => (
        <Greeting key={name} name={name} />
      ))}
      <Counter />
    </main>
  );
}

export default App;
