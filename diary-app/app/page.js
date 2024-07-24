"use client";

import { useEffect, useState } from "react";
import DiaryForm from "./components/DiaryForm";
import DiaryList from "./components/DiaryList";
import Sidebar from "./components/sidebar";

const Home = () => {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    fetch("/api/entries")
      .then((response) => response.json())
      .then((data) => setEntries(data));
  }, []);

  const handleSaveEntry = (entry) => {
    const updatedEntries = editingEntry
      ? entries.map((e) => (e.id === entry.id ? entry : e))
      : [...entries, entry];

    fetch("/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEntries),
    }).then(() => {
      setEntries(updatedEntries);
      setEditingEntry(null);
    });
  };

  const handleEditEntry = (id) => {
    const entry = entries.find((e) => e.id === id);
    setEditingEntry(entry);
  };

  const handleDeleteEntry = (id) => {
    const updatedEntries = entries.filter((e) => e.id !== id);

    fetch("/api/entries", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEntries),
    }).then(() => setEntries(updatedEntries));
  };

  return (
    <div className="container mt-4">
      <Sidebar />
      <h1 className="mb-4">Diary App</h1>
      <DiaryForm entry={editingEntry} onSave={handleSaveEntry} />
      <DiaryList
        entries={entries}
        onEdit={handleEditEntry}
        onDelete={handleDeleteEntry}
      />
    </div>
  );
};

export default Home;
