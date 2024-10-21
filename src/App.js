import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Read recommended book again", completed: true },
    { id: 2, text: "Vacation planning", completed: false },
    { id: 3, text: "Cook dinner", completed: false },
    { id: 4, text: "Sign up for training", completed: false },
  ]);

  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  const handleToggleCompleted = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      const newTask = {
        id: tasks.length + 1,
        text: newTaskText,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskText("");
      setShowAddSection(false);
    }
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingTaskId(id);
    setEditedTaskText(taskToEdit.text);
  };

  const handleSaveEdit = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, text: editedTaskText } : task
    ));
    setEditingTaskId(null);
    setEditedTaskText("");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "uncompleted") return !task.completed;
      return true;
    })
    .filter((task) => task.text.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div className={`todo-app ${darkMode ? "dark-mode" : ""}`}>
      <div className="todo-header">
        <h1>TODO LIST</h1>
        <div className="controls-container">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">ALL</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
          <button
            className="theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>

      <div className="todo-list">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`todo-item ${task.completed ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompleted(task.id)}
            />
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  className="edit-input"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                />
                <button className="save-btn" onClick={() => handleSaveEdit(task.id)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <p>{task.text}</p>
                <div className="action-buttons">
                  <button className="edit-btn" onClick={() => handleEditTask(task.id)}>
                    <FontAwesomeIcon icon={faPencilAlt} style={{ color: 'gray' }} />
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrash} style={{ color: 'gray' }} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {showAddSection && (
        <div className="add-task-section">
          <input
            type="text"
            className="new-task-input"
            placeholder="New task"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
          <button className="add-task-btn" onClick={handleAddTask}>
            Add
          </button>
        </div>
      )}
      <button className="add-btn" onClick={() => setShowAddSection(!showAddSection)}>
        +
      </button>
    </div>
  );
}

export default App;
