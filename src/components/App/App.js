import React, { useState, useEffect } from 'react';
import TaskList from '../TaskList/TaskList';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


import "./App.css";

const apiUrl = 'http://localhost:3001/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Помилка при отриманні завдань:', error);
    }
  };

  //добавления новой задачи
  const addTask = async () => {
    try {
      const newId = tasks.length + 1; //id
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: newId, title: newTask, status: 'Виконується' }),
      });
  
      if (response.ok) {
        setNewTask('');
        fetchTasks(); //обновляем список задач
      } else {
        console.error('Помилка при додаванні завдання');
      }
    } catch (error) {
      console.error('Помилка при додаванні завдання:', error);
    }
  };

  //удаления задачи
  const deleteTask = async (taskId) => {
    try {
      console.log('Deleting task with ID:', taskId);
      const response = await fetch(`${apiUrl}/${taskId}`, {
        method: 'DELETE',
        timeout: 10000,
      });
  
      if (response.ok) {
        console.log('Task deleted successfully');
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        console.error('Error deleting task');
      }
    } catch (error) {
      console.error('Error in deleteTask:', error);
    }
  };

  //редактирования задачи
  const editTask = async () => {
    try {
      const response = await fetch(`${apiUrl}/${selectedTask.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedTaskTitle,
          dueDate: dueDate ? dueDate.toISOString() : null,
        }),
      });
  
      if (response.ok) {
        setSelectedTask(null);
        fetchTasks();
      } else {
        console.error('Помилка при редагуванні завдання');
      }
    } catch (error) {
      console.error('Помилка при редагуванні завдання:', error);
    }
  };


  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Управління завданнями</h1>
      <input
        type="text"
        placeholder='Enter task'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className='btn-save' onClick={addTask}>Додати завдання</button>
      <TaskList
        tasks={tasks}
        editTask={editTask}
        deleteTask={deleteTask}
        setSelectedTask={setSelectedTask}
        setEditedTaskTitle={setEditedTaskTitle}
        setDueDate={setDueDate}
      />
      {selectedTask && (
        <div>
          <h2>Редагувати завдання</h2>
          <input
            type="text"
            value={editedTaskTitle}
            onChange={(e) => setEditedTaskTitle(e.target.value)}
          />
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            placeholderText="Оберіть дату"
          />
          <button onClick={editTask}>Зберегти</button>
        </div>
      )}
    </div>
  );
};

export default App;
