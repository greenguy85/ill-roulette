import { CurrentLevel } from "./components/CurrentLevel";
import { LevelHistory } from "./components/levelHistory";
import { Spinner } from "./components/Spinner";
import { useLevel } from "./contexts/levelContext";

function App() {
  const { isLoading } = useLevel();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <CurrentLevel />
          <LevelHistory />
        </>
      )}
    </>
  );
}

export default App;
