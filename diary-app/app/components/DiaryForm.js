"use client";

import { useEffect, useState, useRef } from "react";

const DiaryForm = ({ entry, onSave }) => {
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (entry) {
      setDate(entry.date);
      setContent(entry.content);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: entry?.id || Date.now(), date, content });
    setDate("");
    setContent("");
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
