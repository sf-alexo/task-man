import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTask: React.FC = () => {
  const { categoryId } = useParams();
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState('');

  const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleAddTask = async () => {
    try {
      const newTask = {
        name: taskName,
        dateStart: new Date(),
        dateEnd: new Date(),
        taskId: Number(categoryId),
      };

      await axios.post('http://localhost:3000/tasks/create', newTask);
      navigate(`/${categoryName}/${categoryId}`); // Redirect back to TaskList page
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate(`/${categoryName}/${categoryId}`); // Redirect back to TaskList page
  };

  return (
    <div>
      <h1>Add Task</h1>
      <label htmlFor="taskName">Task Name:</label>
      <input type="text" id="taskName" value={taskName} onChange={handleTaskNameChange} />
      <button type="button" onClick={handleAddTask}>Save</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default AddTask;
