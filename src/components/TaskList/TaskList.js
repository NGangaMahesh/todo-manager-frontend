import Task from '../Task/Task'
import './TaskList.css'

const TaskList = ({ tasks, toggleCompleted, editTask, deleteTask, filterStatus, sortBy }) => {
    const filteredTasks = tasks.filter((task) => {
      if (filterStatus === 'all') return true;
      return task.completed === (filterStatus === 'completed');
    });
  
    const sortedTasks = filteredTasks.sort((a, b) => {
      if (sortBy === 'priority') {
        return a.priority.localeCompare(b.priority);
      } else if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else {
        return 0;
      }
    });
    const lensortedTasks = sortedTasks.length
    console.log(lensortedTasks)
    return (
      <div className="task-list">
        {lensortedTasks === 0 && (
          <div className="no-tasks-container">
            <img className='no-task-img' src="https://static.vecteezy.com/system/resources/previews/007/872/974/non_2x/file-not-found-illustration-with-confused-people-holding-big-magnifier-search-no-result-data-not-found-concept-can-be-used-for-website-landing-page-animation-etc-vector.jpg" alt="no task" />
            <h2>There are no tasks to display.</h2>
          </div>
        )}
        {sortedTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleCompleted={toggleCompleted}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    );
  };

export default TaskList