// app/context/DiaryContext.js
import React, { createContext, useContext, useState } from "react";

const DiaryContext = createContext();

export const useDiary = () => useContext(DiaryContext);

export const DiaryProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [mood, setMood] = useState("happy");
  const [highlight, setHighlight] = useState("");

  const addEntry = (entry) => {
    setEntries((prevEntries) => [...prevEntries, entry]);
  };

  return (
    <DiaryContext.Provider value={{ entries, addEntry, mood, setMood, highlight, setHighlight }}>
      {children}
    </DiaryContext.Provider>
  );
};
