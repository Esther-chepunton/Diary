"use client";
import { useState } from "react";

const Sidebar = ({ setActiveSection }) => {
  const [active, setActive] = useState("profile");

  const handleClick = (section) => {
    setActive(section);
    setActiveSection(section);
  };

  return (
    <div className="sidebar">
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
            <a href="#" onClick={() => handleClick("profile")}>
              All About Me!
            </a>
          </li>
          <li className={active === "about" ? "active" : ""}>
            <a href="#" onClick={() => handleClick("about")}>
              About My Day
            </a>
          </li>

          <li className={active === "todo" ? "active" : ""}>
            <a href="#" onClick={() => handleClick("todo")}>
              ToDo List
            </a>
          </li>
          <li className={active === "dataentry" ? "active" : ""}>
            <a href="#" onClick={() => handleClick("dataentry")}>
              Data Entry
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
