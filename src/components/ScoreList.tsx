export interface Score {
  id: number;
  name: string;
  points: number;
}

interface ScoreListProps {
  scores: Score[];
}

export function ScoreList({ scores }: ScoreListProps) {
  if (scores.length === 0) {
    return <p>まだ記録がありません</p>;
  }

  const best = Math.max(...scores.map((score) => score.points));

  return (
    <ul>
      {scores.map((score) => (
        <li key={score.id}>
          {score.name}：{score.points} 点
          {score.points >= 60 ? "（合格）" : "（不合格）"}
          {score.points === best && <strong> 1位</strong>}
        </li>
      ))}
    </ul>
  );
}
