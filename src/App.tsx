import { Counter } from "./components/Counter";
import { Greeting } from "./components/Greeting";
import { ScoreList, type Score } from "./components/ScoreList";
import { Section } from "./components/Section";

const scores: Score[] = [
  { id: 1, name: "あおい", points: 80 },
  { id: 2, name: "はると", points: 55 },
  { id: 3, name: "みお", points: 92 },
];

function App() {
  return (
    <main>
      <h1>第6回：React の基本</h1>
      <Section title="2. コンポーネントと props">
        <Greeting name="長谷川" />
        <Greeting name="任天堂" mark="！！" />
      </Section>
      <Section title="3. TSX の中の式">
        <ScoreList scores={scores} />
        <ScoreList scores={[]} />
      </Section>
      <Section title="4. イベントと state">
        <Counter />
        <Counter initial={10} step={5} />
      </Section>
    </main>
  );
}

export default App;
