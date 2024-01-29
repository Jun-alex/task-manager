import React from "react";

const TaskItem = ({
  task,
  editTask,
  deleteTask,
  setSelectedTask,
  setEditedTaskTitle,
  setDueDate,
}) => {
  const handleEditClick = () => {
    setSelectedTask(task);
    setEditedTaskTitle(task.title);
    setDueDate(task.dueDate ? new Date(task.dueDate) : null);
  };

  const handleDeleteClick = () => {
    deleteTask(task.id);
  };

  return (
    <li>
      {task.title} - {task.status}
      <button onClick={handleEditClick}>Редагувати</button>
      <button onClick={handleDeleteClick}>Видалити</button>
    </li>
  );
};

export default TaskItem;
