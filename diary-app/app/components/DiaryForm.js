// app/components/DiaryForm.js
"use client";

import { useEffect, useRef, useState } from "react";

const DiaryForm = ({ onSave }) => {
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("happy"); // Default mood
  const textareaRef = useRef(null);

  useEffect(() => {
    if (entry) {
      setDate(entry.date || "");
      setContent(entry.content || "");
      setMood(entry.mood || "happy"); // Default to "happy" if mood is not provided
    }
  }, [entry]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({ id: entry?.id || Date.now(), date, content, mood });
      setDate("");
      setContent("");
      setMood("happy"); // Reset mood after saving
    } else {
      console.error("onSave is not defined");
    }
    setDate("");
    setContent("");
    setMood("happy");
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
          onChange={handleMoodChange}
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
          onChange={handleContentChange}
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
