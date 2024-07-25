"use client";

import { useEffect, useState } from "react";
import DiaryForm from "./components/DiaryForm";
import DiaryList from "./components/DiaryList";
import Sidebar from "./components/Sidebar";
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
    const method = editingEntry ? "PUT" : "POST";
    const url = editingEntry ? `/api/entries/${entry.id}` : "/api/entries";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    })
      .then((response) => response.json())
      .then((data) => {
        if (editingEntry) {
          // Update the entry in the list
          setEntries(entries.map((e) => (e.id === entry.id ? data : e)));
        } else {
          // Add the new entry to the list
          setEntries([...entries, data]);
        }
        setEditingEntry(null); // Clear the editing state
      });
  };

  const handleEditEntry = (id) => {
    const entry = entries.find((e) => e.id === id);
    setEditingEntry(entry);
  };

  const handleDeleteEntry = (id) => {
    fetch(`/api/entries/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setEntries(entries.filter((e) => e.id !== id));
    });
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
