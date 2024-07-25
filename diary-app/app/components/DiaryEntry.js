// app/components/DiaryEntry.js
"use client";

const DiaryEntry = ({ entry, onEdit, onDelete }) => {
  if (!entry) return null;

  const cardColor = entry.color || "#f8f9fa";
  const imageUrl = entry.image ? URL.createObjectURL(entry.image) : null;

  return (
    <div className="card slide-in shadow p-3 mb-5 bg-body-tertiary rounded" style={{ backgroundColor: cardColor }}>
      <div className="card-body">
        <h5 className="card-title">{entry.date}</h5>
        <p className="card-text">{entry.content}</p>
        {imageUrl && <img src={imageUrl} alt="Diary image" className="img-fluid mb-3" />}
        <p className="card-text"><strong>Mood:</strong> {entry.mood}</p>
        {entry.tags && <p className="card-text"><strong>Tags:</strong> {entry.tags.join(', ')}</p>}
        <button className="btn btn-warning me-2" onClick={() => onEdit(entry.id)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(entry.id)}>Delete</button>
      </div>
    </div>
  );
};

export default DiaryEntry;
