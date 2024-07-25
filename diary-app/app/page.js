"use client";

import { useEffect, useState } from "react";
import DiaryForm from "./components/DiaryForm";
import DiaryList from "./components/DiaryList";
import Sidebar from "./components/sidebar";
import ToDoList from "./components/ToDoList";

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
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
          
        </div>
        <div className="col-md-9 d-flex flex-column align-items-center">
          <div className="sticky-form">
            <h1 className="mb-4">Diary App</h1>
            <ToDoList />
            <DiaryForm entry={editingEntry} onSave={handleSaveEntry} />
          </div>
          <div className="entries-list mt-4 w-100">
            <DiaryList
              entries={entries}
              onEdit={handleEditEntry}
              onDelete={handleDeleteEntry}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
