"use client";

import React, { useState, useEffect, useRef } from "react";

const DiaryForm = ({ entry, onSave }) => {
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("happy");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (entry) {
      setDate(entry.date || "");
      setContent(entry.content || "");
      setMood(entry.mood || "happy");
    }
  }, [entry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({ id: entry?.id || Date.now(), date, content, mood });
    } else {
      console.error("onSave function is not defined");
    }
    setDate("");
    setContent("");
    setMood("happy");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-3 shadow p-3 mb-5 bg-body-tertiary rounded"
    >
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
        <label htmlFor="mood">Mood</label>
        <select
          className="form-control"
          id="mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          required
        >
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
          <option value="excited">Excited</option>
          <option value="neutral">Neutral</option>
        </select>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="content">My day!</label>
        <textarea
          className="form-control textarea-book"
          id="content"
          rows="3"
          ref={textareaRef}
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
