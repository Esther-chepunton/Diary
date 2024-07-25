"use client";

import { useEffect, useRef, useState } from "react";

const DiaryForm = ({ entry, onSave = () => {} }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: entry?.id || Date.now(),
      date,
      content,
      mood,
    };
    console.log("Submitting entry:", newEntry);

    if (onSave) {
      onSave(newEntry);
    } else {
      console.error("onSave function is not defined");
    }

    // Reset form
    setDate("");
    setContent("");
    setMood("happy");
    if (textareaRef.current) {
      textareaRef.current.focus(); // Focus the textarea after reset
    }
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
      <button
        type="submit"
        className="btn btn-primary mt-3"
        style={{ backgroundColor: "#e0b0ff", border: "none", color: "black" }}
      >
        Save
      </button>
    </form>
  );
};

export default DiaryForm;
