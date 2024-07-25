"use client";

const DiaryEntry = ({ entry, onEdit, onDelete }) => {
  if (!entry) {
    // If entry is undefined, return null or some placeholder content
    return null;
  }

  // Provide a default color if entry.color is undefined
  const cardColor = entry.color || "#f8f9fa"; // Use a light grey or any other default color

  return (
    <div
      className="card slide-in shadow p-3 mb-5 bg-body-tertiary rounded"
      style={{ backgroundColor: cardColor }}
    >
      <div className="card w-75 mb-3">
        <div className="card-body">
          <h5 className="card-title">{entry.date}</h5>
          <p className="card-text">{entry.content}</p>
          <p className="card-text">
            <strong>Mood:</strong> {entry.mood}
          </p>
          <button
            className="btn btn-warning me-2"
            style={{
              backgroundColor: "#dfc5fe",
              border: "none",
              color: "black",
            }}
            onClick={() => onEdit(entry.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            style={{
              backgroundColor: "#dfc5fe",
              border: "none",
              color: "black",
            }}
            onClick={() => onDelete(entry.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiaryEntry;
