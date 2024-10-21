import React from 'react';

function TodoItem({
  task,
  deleteTask,
  toggleCompleted,
  startEditing,
  saveEdit,
  cancelEdit,
  editingTaskId,
  editText,
  setEditText,
}) {
  function handleChange() {
    toggleCompleted(task.id);
  }

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      {editingTaskId === task.id ? (
        <div className="edit-task">
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={() => saveEdit(task.id)}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      ) : (
        <div className="task-content">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleChange}
          />
          <p>{task.text}</p>
          <button onClick={() => deleteTask(task.id)}>X</button>
          <button onClick={() => startEditing(task)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
