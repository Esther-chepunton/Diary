// app/components/ToDoList.js
"use client";

import { useState } from "react";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const handleCompleteTask = (index) => {
    const taskToComplete = tasks[index];
    setCompletedTasks([...completedTasks, taskToComplete]);
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleRemoveTask = (index) =>
    setTasks(tasks.filter((_, i) => i !== index));

  const handleRemoveCompletedTask = (index) =>
    setCompletedTasks(completedTasks.filter((_, i) => i !== index));

  return (
    <div className="row">
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
                Add Task
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
                    <div>
                      <button
                        className="btn btn-success btn-sm me-2"
                        style={{
                          backgroundColor: "#dfc5ff",
                          border: "none",
                          color: "white",
                        }}
                        onClick={() => handleCompleteTask(index)}
                      >
                        Complete
                      </button>
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
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Tasks Completed</h5>
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
