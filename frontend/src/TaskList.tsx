import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Task } from '../../backend/src/typeorm/task.entity';

const TaskList: React.FC = () => {
  const { categoryId } = useParams();
  const { categoryName } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState<boolean>(false);
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks?taskId=${categoryId}`);
        console.log(response.data);
        setTasks(response.data.sort((a: Task, b: Task) => b.id - a.id));
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [categoryId]);

  const deleteTask = async (taskId: number) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = (taskId: number) => {
    setDeleteTaskId(taskId);
    setShowDeleteTaskPopup(true);
  };

  const handleConfirmDeleteTask = () => {
    if (deleteTaskId !== null) {
      deleteTask(deleteTaskId);
    }
    setShowDeleteTaskPopup(false);
    setDeleteTaskId(null);
  };

  const handleCancelDeleteTask = () => {
    setShowDeleteTaskPopup(false);
    setDeleteTaskId(null);
  };

  return (
    <div>
      <Link to={'/manager'}>Back to Task Manager</Link>
      <h1>{categoryName} {categoryId}</h1>
      <Link to={`/${categoryName}/${categoryId}/add-task`}>Add Task</Link>
      <div className="card-container">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div className="card" key={task.id}>
              <div>
                <h3>{task.name}</h3>
                <p>Start Date: {task.dateStart.toString()}</p>
                <p>End Date: {task.dateEnd.toString()}</p>
              </div>
              <button onClick={() => confirmDelete(task.id)}>Delete</button>
              <Link to={`/${categoryName}/${categoryId}/edit-task/${task.id}`}>Edit Task</Link>
            </div>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>
      {showDeleteTaskPopup && (
        <div className="delete-popup">
          <p>Are you sure you want to delete this task?</p>
          <button type="button" onClick={handleConfirmDeleteTask}>
            Yes
          </button>
          <button type="button" onClick={handleCancelDeleteTask}>
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
