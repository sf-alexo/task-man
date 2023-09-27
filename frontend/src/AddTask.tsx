import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_TASK } from './graphql/mutations'; // Import your GraphQL mutation

const AddTask: React.FC = () => {
  const { categoryId, categoryName } = useParams();
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  const [createTask] = useMutation(CREATE_TASK);

  const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleDateStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateStart(e.target.value);
  };

  const handleDateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateEnd(e.target.value);
  };

  const handleAddTask = async () => {
    try {
      await createTask({
        variables: {
          createTaskInput: {
            name: taskName,
            dateStart,
            dateEnd,
            taskId: Number(categoryId),
          },
        },
      });
      navigate(`/${categoryName}/${categoryId}`); // Redirect back to TaskList page
      window.location.reload();
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
      <label htmlFor="dateStart">Start Date:</label>
      <input type="date" id="dateStart" value={dateStart} onChange={handleDateStartChange} required />
      <label htmlFor="dateEnd">End Date:</label>
      <input type="date" id="dateEnd" value={dateEnd} onChange={handleDateEndChange} required />
      <button type="button" onClick={handleAddTask}>Save</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default AddTask;
