"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [solvedExercises, setSolvedExercises] = useState(0);

  useEffect(() => {
    const savedLevel = localStorage.getItem("unlockedLevel");
    const savedExercises = localStorage.getItem("solvedExercises");
    if (savedLevel) setUnlockedLevel(parseInt(savedLevel));
    if (savedExercises) setSolvedExercises(parseInt(savedExercises));
  }, []);

  const unlockNextLevel = (currentLevel) => {
    const nextLevel = currentLevel + 1;
    if (nextLevel > unlockedLevel) {
      setUnlockedLevel(nextLevel);
      localStorage.setItem("unlockedLevel", nextLevel.toString());
    }
  };

  const addSolvedExercise = () => {
    setSolvedExercises((prev) => {
      const next = prev + 1;
      localStorage.setItem("solvedExercises", next.toString());
      return next;
    });
  };

  return (
    <ProgressContext.Provider value={{ unlockedLevel, unlockNextLevel, solvedExercises, addSolvedExercise }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}