"use client";

import { useEffect, useState } from "react";
import DiaryForm from "../components/DiaryForm";
import DiaryList from "../components/DiaryList";

const DiaryListPage = () => {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch("/api/entries");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  const handleSave = async (newEntry) => {
    try {
      const method = editingEntry ? "PUT" : "POST";
      const response = await fetch("/api/entries", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });
      if (!response.ok) throw new Error("Failed to save entry");

      setEntries((prevEntries) => {
        if (editingEntry) {
          // Update existing entry
          return prevEntries.map((entry) =>
            entry.id === newEntry.id ? newEntry : entry
          );
        } else {
          // Add new entry
          return [...prevEntries, newEntry];
        }
      });
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
      <h2>My Diary Entries</h2>
      <DiaryForm entry={editingEntry} onSave={handleSave} />
      <DiaryList
        entries={entries}
        onEdit={handleEditEntry}
        onDelete={handleDeleteEntry}
      />
    </div>
  );
};

export default DiaryListPage;
