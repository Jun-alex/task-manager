import React from "react";
import TaskItem from "../TaskItem/TaskItem";

import "./TaskList.css";

const TaskList = ({
  tasks,
  editTask,
  deleteTask,
  setSelectedTask,
  setEditedTaskTitle,
  setDueDate,
}) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
          setSelectedTask={setSelectedTask}
          setEditedTaskTitle={setEditedTaskTitle}
          setDueDate={setDueDate}
        />
      ))}
    </ul>
  );
};

export default TaskList;
