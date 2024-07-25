// app/pages/DiaryListPage.js
"use client";

import { useEffect, useState } from "react";
import DiaryList from "../components/DiaryList"; // Adjust path as necessary

const DiaryListPage = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Fetch entries from local storage or API
    const storedEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    setEntries(storedEntries);
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Diary Entries</h2>
      <DiaryList entries={entries} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
};

export default DiaryListPage;
