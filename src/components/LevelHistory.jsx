import { useEffect } from "react";
import { useLevel } from "../contexts/levelContext";

export const LevelHistory = () => {
  const { levelHistory } = useLevel();

  return (
    <div className="level-history-container">
      <h1>History</h1>
      {levelHistory.length < 1 ? (
        <p className="no-levels">No levels yet!</p>
      ) : (
        levelHistory.slice(0, 5).map((level, key) => (
          <div className="history-level" key={key}>
            <div className="history-level-info">
              <h2 className="history-level-rank">{`#${level.rank}`}</h2>
              <p className="history-level-name">{level.name}</p>
            </div>
            <p className="history-level-percentage">{`${level.percentage}%`}</p>
          </div>
        ))
      )}
    </div>
  );
};
