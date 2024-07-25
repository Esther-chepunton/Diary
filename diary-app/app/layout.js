// app/layout.js
"use client";

import { useState } from "react";
import AboutMyDay from "./components/AboutMyDay";
import DiaryEntry from "./components/DiaryEntry";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import ToDoList from "./components/ToDoList";
import "./globals.css"; // Import global styles if you have any
import DiaryForm from "./components/DiaryForm";
import DiaryList from "./components/DiaryList";

export default function RootLayout() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <html lang="en">
      <body>
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-3">
              <Sidebar setActiveSection={setActiveSection} />
            </div>
            <div className="col-md-9">
              {activeSection === "profile" && <Profile />}
              {activeSection === "todo" && <ToDoList />}
              {activeSection === "about" && <AboutMyDay />}
              {activeSection === "dataentry" && <DiaryEntry />}
              {activeSection === "dataentry" && <DiaryForm />}
              {activeSection === "dataentry" && <DiaryList />}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
