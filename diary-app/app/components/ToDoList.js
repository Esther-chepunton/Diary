"use client";

import { useState } from "react";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newCompletedTask, setNewCompletedTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask(""); // Clear the input field
    }
  };

  const handleAddCompletedTask = () => {
    if (newCompletedTask.trim() !== "") {
      setCompletedTasks([...completedTasks, newCompletedTask]);
      setNewCompletedTask(""); // Clear the input field
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleRemoveCompletedTask = (index) => {
    const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
    setCompletedTasks(updatedCompletedTasks);
  };

  return (
    <div className="row">
      {/* Today's Tasks */}
      <div className="col-sm-6 mb-3 mb-sm-0">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Today's Tasks</h5>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Add a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button
                className="btn btn-primary mt-2"
                style={{
                  backgroundColor: "#dfc5fe",
                  border: "none",
                  color: "black",
                }}
                onClick={handleAddTask}
              >
                 Today's Tasks
              </button>
            </div>
            {tasks.length === 0 ? (
              <p>No tasks available.</p>
            ) : (
              <ul className="list-group">
                {tasks.map((task, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {task}
                    <button
                      className="btn btn-danger btn-sm"
                      style={{
                        backgroundColor: "#dfc5fe",
                        border: "none",
                        color: "black",
                      }}
                      onClick={() => handleRemoveTask(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Tasks Completed */}
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Tasks Completed</h5>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Add a completed task"
                value={newCompletedTask}
                onChange={(e) => setNewCompletedTask(e.target.value)}
              />
              <button
                className="btn btn-primary mt-2"
                style={{
                  backgroundColor: "#dfc5fe",
                  border: "none",
                  color: "black",
                }}
                onClick={handleAddCompletedTask}
              >
                Completed
              </button>
            </div>
            {completedTasks.length === 0 ? (
              <p>No completed tasks available.</p>
            ) : (
              <ul className="list-group">
                {completedTasks.map((task, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {task}
                    <button
                      className="btn btn-danger btn-sm"
                      style={{
                        backgroundColor: "#dfc5fe",
                        border: "none",
                        color: "black",
                      }}
                      onClick={() => handleRemoveCompletedTask(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
