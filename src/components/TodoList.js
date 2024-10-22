import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [text, setText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (text.trim() === '') {
      alert('Task cannot be empty');
      return;
    }
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setText('');
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function clearCompletedTasks() {
    setTasks(tasks.filter((task) => !task.completed));
  }

  function startEditing(task) {
    setEditingTaskId(task.id);
    setEditText(task.text);
  }

  function saveEdit(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: editText } : task
      )
    );
    setEditingTaskId(null);
    setEditText('');
  }

  function cancelEdit() {
    setEditingTaskId(null);
    setEditText('');
  }

  const remainingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <div className="todo-list">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add</button>

      <div className="task-list">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            startEditing={startEditing}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            editingTaskId={editingTaskId}
            editText={editText}
            setEditText={setEditText}
          />
        ))}
      </div>

      <div className="footer">
        <p>{remainingTasks} {remainingTasks === 1 ? 'task' : 'tasks'} remaining</p>
        <button
          onClick={clearCompletedTasks}
          disabled={tasks.every((task) => !task.completed)}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default TodoList;
