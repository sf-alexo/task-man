import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTask: React.FC = () => {
  const { categoryId } = useParams();
  const { categoryName } = useParams();
  const { id } = useParams();
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleDateStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateStart(e.target.value);
  };

  const handleDateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateEnd(e.target.value);
  };

  const handleEditTask = async () => {
    try {
      const updatedTask = {
        name: taskName,
        dateStart: dateStart,
        dateEnd: dateEnd,
        taskId: Number(categoryId),
      };

      await axios.put(`http://localhost:3000/tasks/${id}`, updatedTask);
      navigate(`/${categoryName}/${categoryId}`); // Redirect back to TaskList page
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate(`/${categoryName}/${categoryId}`); // Redirect back to TaskList page
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks/id/${id}`);
        console.log(response.data);
        const task = response.data;
        setTaskName(task.name);
        setDateStart(task.dateStart);
        setDateEnd(task.dateEnd);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [id]);

  return (
    <div>
      <h1>Edit Task</h1>
      <label htmlFor="taskName">Task Name:</label>
      <input type="text" id="taskName" value={taskName} onChange={handleTaskNameChange} />
      <label htmlFor="dateStart">Start Date:</label>
      <input type="date" id="dateStart" value={dateStart} onChange={handleDateStartChange} required />
      <label htmlFor="dateEnd">End Date:</label>
      <input type="date" id="dateEnd" value={dateEnd} onChange={handleDateEndChange} required />
      <button type="button" onClick={handleEditTask}>Save</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default EditTask;
