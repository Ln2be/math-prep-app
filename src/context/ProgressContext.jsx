"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [unlockedLevel, setUnlockedLevel] = useState(1);

  useEffect(() => {
    // Load progress from local storage when the app starts
    const savedLevel = localStorage.getItem("unlockedLevel");
    if (savedLevel) {
      setUnlockedLevel(parseInt(savedLevel));
    }
  }, []);

  const unlockNextLevel = (currentLevel) => {
    const nextLevel = currentLevel + 1;
    if (nextLevel > unlockedLevel) {
      setUnlockedLevel(nextLevel);
      localStorage.setItem("unlockedLevel", nextLevel.toString());
    }
  };

  return (
    <ProgressContext.Provider value={{ unlockedLevel, unlockNextLevel }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}