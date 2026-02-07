import { createContext, useState, useContext, useEffect } from "react";
import { getLevels } from "../api/illApi";

const levelContext = createContext();

export const LevelProvider = ({ children }) => {
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [levelHistory, setLevelHistory] = useState([]);
  const [levelCounter, setLevelCounter] = useState(1);

  useEffect(() => {
    const savedLevelHistory = localStorage.getItem("levelHistory");
    const savedCurrentLevel = localStorage.getItem("currentLevel");
    if (savedLevelHistory) {
      const levelHistory = JSON.parse(savedLevelHistory);
      const currentLevel = JSON.parse(savedCurrentLevel);
      setLevelHistory(levelHistory);
      setCurrentLevel(currentLevel);
    }
  }, []);

  useEffect(() => {
    if (levelHistory.length > 0) {
      localStorage.setItem("levelHistory", JSON.stringify(levelHistory));
      localStorage.setItem("currentLevel", JSON.stringify(currentLevel));
      document.title = `ILL Routlette - ${currentLevel.name}`;
    } else {
      localStorage.removeItem("levelHistory");
      localStorage.removeItem("currentLevel");
    }
  }, [levelHistory, currentLevel]);

  useEffect(() => {
    fetchLevelData();
  }, []);

  const getRandomLevel = () => {
    const randomIndex = Math.floor(Math.random() * levels.length);
    return levels[randomIndex];
  };

  const fetchLevelData = async () => {
    try {
      const data = await getLevels();
      setLevels(data);
    } catch (err) {
      console.error("Error fetching levels: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getVideoId = (url) => {
    if (typeof url !== "string") return null;

    const regex =
      /(?:youtube\.com\/(?:.*v=|embed\/|shorts\/)|youtu\.be\/)([^?&/]+)/;

    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleReset = () => {
    setLevelHistory([]);
    setCurrentLevel(null);

    localStorage.clear();
    window.location.reload();
  };

  return (
    <levelContext.Provider
      value={{
        levels,
        currentLevel,
        setCurrentLevel,
        getVideoId,
        setLevelHistory,
        levelHistory,
        levelCounter,
        setLevelCounter,
        levelHistory,
        setLevelHistory,
        getRandomLevel,
        handleReset,
        isLoading,
      }}
    >
      {children}
    </levelContext.Provider>
  );
};

export const useLevel = () => {
  const contextValue = useContext(levelContext);
  if (!contextValue) {
    throw new Error("useLevel must be used inside of MusicProvider");
  }

  return contextValue;
};
