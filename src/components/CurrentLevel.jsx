import YouTube from "react-youtube";
import { useLevel } from "../contexts/levelContext";
import { useRef, useEffect } from "react";

export const CurrentLevel = () => {
  const {
    levels,
    currentLevel,
    setCurrentLevel,
    getVideoId,
    levelCounter,
    levelHistory,
    setLevelHistory,
    setLevelCounter,
    getRandomLevel,
    handleReset,
  } = useLevel();

  const userPercentage = useRef(null);

  useEffect(() => {
    if (levelHistory.length < 1) {
      setCurrentLevel(getRandomLevel());
    }
  }, [levels]);

  if (!currentLevel) return null;

  const handleCompletion = () => {
    if (userPercentage.current.value < levelCounter) {
      userPercentage.current.focus();
      return;
    }

    setLevelCounter((prev) => (prev += 1));
    setLevelHistory([
      { ...currentLevel, percentage: userPercentage.current.value },
      ...levelHistory,
    ]);
    setCurrentLevel(getRandomLevel());
    userPercentage.current.value = "";
  };

  return (
    <div className="current-level-container">
      <h1>Current Level</h1>
      <div className="current-level">
        <div id="video-wrapper">
          <YouTube
            iframeClassName="level-video"
            videoId={getVideoId(currentLevel.showcaseLink)}
          />
        </div>
        <div className="level-info">
          <h2 className="level-rank">{`#${currentLevel.rank.toString()}`}</h2>
          <h3 className="level-name">{currentLevel.name}</h3>
          <p className="level-id">{`ID: ${currentLevel.levelId}`}</p>
          <p className="level-creator">{`${currentLevel.authors.split(",").length > 1 ? "Creators" : "Creator"}: ${currentLevel.authors}`}</p>
        </div>
      </div>
      <div className="completion-container">
        <input
          type="number"
          placeholder={`At least ${levelCounter}% percent`}
          className="completion-input"
          ref={userPercentage}
          min="1"
          max="100"
        />
        <button className="completion-btn" onClick={handleCompletion}>
          Done!
        </button>
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
