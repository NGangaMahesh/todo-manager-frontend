import './TaskItem.css'

const Task = ({ task, toggleCompleted, editTask, deleteTask }) => {
  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <div className="task-details">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompleted(task.id)}
        />
        <div>
          <p><span className='label-heading-text'>Tilte:</span> {task.title}</p>
          <p><span className='label-heading-text'>Description:</span> {task.description}</p>
          <div className='prop-con'>
            <p>
            <span className='label-heading-text'>Priority:</span> <span className={`priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
            </p>
            <p><span className='label-heading-text'>Due Date:</span> {task.dueDate}</p>
          </div>
        </div>
      </div>
      <div className="task-actions">
        <button className='edit-btn' onClick={() => editTask(task.id)}>Edit</button>
        <button className='delete-btn' onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Task
