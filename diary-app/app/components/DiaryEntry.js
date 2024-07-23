"use client";

const DiaryEntry = ({ entry, onEdit, onDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{entry.date}</h5>
        <p className="card-text">{entry.content}</p>
        <button
          className="btn btn-warning me-2"
          onClick={() => onEdit(entry.id)}
        >
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(entry.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DiaryEntry;
