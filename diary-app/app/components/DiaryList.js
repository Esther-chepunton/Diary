// DiaryList.js
"use client";

import DiaryEntry from "./DiaryEntry";

const DiaryList = ({ entries = [], onEdit, onDelete }) => {
  return (
    <div>
      {entries.length === 0 ? (
        <p>No entries to display.</p>
      ) : (
        entries.map((entry) => (
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
