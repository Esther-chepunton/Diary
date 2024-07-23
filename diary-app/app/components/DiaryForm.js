"use client";

import React, { useState, useEffect } from "react";

const DiaryForm = ({ entry, onSave }) => {
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (entry) {
      setDate(entry.date);
      setContent(entry.content);
    }
  }, [entry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: entry?.id || Date.now(), date, content });
    setDate("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          className="form-control"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="content">Content</label>
        <textarea
          className="form-control"
          id="content"
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Save
      </button>
    </form>
  );
};

export default DiaryForm;
