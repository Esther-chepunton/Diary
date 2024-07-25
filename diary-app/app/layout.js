// app/layout.js
"use client";

import { useState } from "react";
import { DiaryProvider } from "./context/DiaryContext";
import AboutMyDay from "./components/AboutMyDay";
import DiaryEntry from "./components/DiaryEntry";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import ToDoList from "./components/ToDoList";
import DiaryForm from "./components/DiaryForm";
import DiaryList from "./components/DiaryList";
import "./globals.css";

export default function RootLayout() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <DiaryProvider>
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
                {activeSection === "dataentry" && (
                  <>
                    <DiaryForm />
                    <DiaryList />
                  </>
                )}
              </div>
            </div>
          </div>
        </body>
      </html>
    </DiaryProvider>
  );
}
