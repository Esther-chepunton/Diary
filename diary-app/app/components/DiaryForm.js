// app/components/DiaryForm.js
"use client";

import { useState } from "react";

const DiaryForm = ({ onSave }) => {
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("happy");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSave === 'function') {
      onSave({ id: Date.now(), date, content, mood });
      setDate("");
      setContent("");
      setMood("happy"); // Reset mood after saving
    } else {
      console.error("onSave is not a function");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control"
          rows="3"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="mood">Mood:</label>
        <select
          id="mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="form-control"
        >
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
          <option value="excited">Excited</option>
          <option value="neutral">Neutral</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default DiaryForm;
