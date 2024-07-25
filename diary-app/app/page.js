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
      .then((data) => setEntries(data))
      .catch((error) => console.error("Error fetching entries:", error));
  }, []);

  const handleSaveEntry = async (entry) => {
    const method = editingEntry ? "PUT" : "POST";
    const url = "/api/entries";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });
      if (!response.ok) throw new Error("Failed to save entry");

      if (editingEntry) {
        setEntries((prevEntries) =>
          prevEntries.map((e) => (e.id === entry.id ? entry : e))
        );
      } else {
        setEntries((prevEntries) => [...prevEntries, entry]);
      }
      setEditingEntry(null);
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
  };

  const handleDeleteEntry = async (id) => {
    try {
      const response = await fetch("/api/entries", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete entry");

      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.id !== id)
      );
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
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
