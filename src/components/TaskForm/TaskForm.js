import { useState,useEffect } from "react";
import './TaskForm.css'

const TaskForm = ({ addTask, editingTask, setEditingTask, updateTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');
    const [dueDate, setDueDate] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!title.trim()) {
        alert('Please enter a task title');
        return;
      }
      if (editingTask) {
        updateTask(editingTask.id, { title, description, priority, dueDate });
        setEditingTask(null);
      } else {
        addTask({ title, description, priority, dueDate });
      }
      setTitle('');
      setDescription('');
      setPriority('low');
      setDueDate('');
    };
  
    useEffect(() => {
      if (editingTask) {
        setTitle(editingTask.title);
        setDescription(editingTask.description);
        setPriority(editingTask.priority);
        setDueDate(editingTask.dueDate);
      }
    }, [editingTask]);
  
    return (
        <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <input
        className="title-text"
          type="text"
          placeholder="Add Your Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
        rows={'6'}
        className="description-text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="sub-con">
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        </div>
        <button className={editingTask ? 'update-task' : 'sub-btn'} type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
      </form>
      <img className="bg-img" src='https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png' alt='' />
      </div>
    );
  };

export default TaskForm