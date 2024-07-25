// app/components/DiaryList.js
"use client";

import { useState } from "react";
import DiaryEntry from "./DiaryEntry";

const DiaryList = ({ entries = [], onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const [filterMood, setFilterMood] = useState("all");

  // Ensure entries is always an array
  const safeEntries = Array.isArray(entries) ? entries : [];

  const filteredEntries = safeEntries.filter((entry) => {
    const matchesSearch = entry.content ? entry.content.toLowerCase().includes(search.toLowerCase()) : false;
    const matchesMood = filterMood === "all" || entry.mood === filterMood;
    return matchesSearch && matchesMood;
  });

  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <select
          value={filterMood}
          onChange={(e) => setFilterMood(e.target.value)}
          className="form-control"
        >
          <option value="all">All Moods</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
          <option value="excited">Excited</option>
          <option value="neutral">Neutral</option>
        </select>
      </div>
      {filteredEntries.length === 0 ? (
        <p>No entries match your search criteria.</p>
      ) : (
        filteredEntries.map((entry) => (
          <DiaryEntry
            key={entry.id}
            entry={entry}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default DiaryList;
