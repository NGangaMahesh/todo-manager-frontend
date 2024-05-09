import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm/TaskForm'
import TaskList from './components/TaskList/TaskList'
import './App.css';


const App = () => {
  
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('');

  const getLocalStorage = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      return (JSON.parse(storedTasks));
    }
    else{
      return []
    }
  }
  const [tasks, setTasks] = useState(getLocalStorage());

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, { id: Date.now(), completed: false, ...newTask }]);
  };

  const toggleCompleted = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setEditingTask(task);
  };

  const updateTask = (taskId, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task))
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="app">
      <div className="filterSort">
        <div>
          <label>Filter:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div>
          <label>Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
      </div>
      <div className='task-container'>
        <h1>Create Your Task</h1>
        <TaskForm
          addTask={addTask}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          updateTask={updateTask}
        />
        <hr className='line'/>
        <h2>Your Tasks</h2>
        <TaskList
          tasks={tasks}
          toggleCompleted={toggleCompleted}
          editTask={editTask}
          deleteTask={deleteTask}
          filterStatus={filterStatus}
          sortBy={sortBy}
        />
      </div>
    </div>
  );
};

export default App;