import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASK } from './graphql/queries';
import { UPDATE_TASK } from './graphql/mutations'; // Import your queries and mutations

const EditTask: React.FC = () => {
  const { categoryId, categoryName, id } = useParams();
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  // Define a default value for id
  const taskId = id ? parseInt(id) : 0;

  const { loading, error, data } = useQuery(GET_TASK, {
    variables: { id: taskId },
    skip: taskId === 0, // Skip the query if taskId is not available
  });

  const [updateTask] = useMutation(UPDATE_TASK);

  useEffect(() => {
    // If data is available from the query, prepopulate the form fields
    if (data && data.task) {
      const task = data.task;
      setTaskName(task.name);
          // Parse and format dateStart and dateEnd
    const startDate = new Date(task.dateStart);
    const endDate = new Date(task.dateEnd);
    
    setDateStart(startDate.toISOString().slice(0, 10)); // Format as "yyyy-mm-dd"
    setDateEnd(endDate.toISOString().slice(0, 10)); //
 
    }
  }, [data]);

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
      await updateTask({
        variables: {
          id: Number(id),
          updateTaskInput: {
            name: taskName,
            dateStart,
            dateEnd,
            taskId: Number(categoryId),
          },
        },
      });
      navigate(`/${categoryName}/${categoryId}`); // Redirect back to TaskList page
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate(`/${categoryName}/${categoryId}`); // Redirect back to TaskList page
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error(error);
    return <p>Error loading task data.</p>;
  }

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
