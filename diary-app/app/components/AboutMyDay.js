// app/components/AboutMyDay.js
"use client";

import { useState } from "react";
import { useDiary } from "../context/DiaryContext";
import MoodPieChart from "./MoodPieChart"; // Ensure this path is correct

const AboutMyDay = () => {
  const { addEntry } = useDiary();
  const [mood, setMood] = useState("happy");
  const [highlight, setHighlight] = useState("");

  const handleSave = () => {
    if (highlight.trim()) {
      addEntry({ mood, highlight, date: new Date().toDateString() });
      setHighlight("");
    }
  };

  return (
    <div>
      <h2>About My Day</h2>
      <p>Reflect on your day and share your thoughts.</p>

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

      <div className="mb-3">
        <label htmlFor="highlight">Today's Highlight:</label>
        <textarea
          id="highlight"
          className="form-control"
          rows="3"
          value={highlight}
          onChange={(e) => setHighlight(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary"
        style={{ backgroundColor: "#e0b0ff", border: "none", color: "black" }}
        onClick={handleSave}
      >
        Save
      </button>

      <div className="mt-4">
        <h4>Mood Analysis</h4>
        <MoodPieChart />
      </div>
    </div>
  );
};

export default AboutMyDay;
