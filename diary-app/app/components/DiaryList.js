"use client";

import DiaryEntry from "./DiaryEntry"; // Adjust the path as necessary

const DiaryList = ({ entries, onEdit, onDelete }) => {
  // Ensure entries is always an array
  const safeEntries = Array.isArray(entries) ? entries : [];

  return (
    <div>
      {safeEntries.length === 0 ? (
        <p>No entries yet. Add your first diary entry!</p>
      ) : (
        safeEntries.map((entry) => (
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
