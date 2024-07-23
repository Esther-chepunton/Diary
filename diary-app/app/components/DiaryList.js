"use client";

import DiaryEntry from "./DiaryEntry";

const DiaryList = ({ entries, onEdit, onDelete }) => {
  return (
    <div>
      {entries.length === 0 ? (
        <p>No entries yet. Add your first diary entry!</p>
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
