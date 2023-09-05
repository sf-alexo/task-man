import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_TASKS_BY_TASK_ID } from './graphql/queries';
import { Task } from './types';

const TaskList: React.FC = () => {
  const { categoryId, categoryName } = useParams();
  
  const parsedCategoryId = categoryId ? parseInt(categoryId) : null;

  const { loading, error, data } = useQuery(GET_TASKS_BY_TASK_ID, {
    variables: { taskId: parsedCategoryId }, // Pass the parsedCategoryId as a variable
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error(error);
    return <p>Error: {error.message}</p>;
  }

  const tasks = data.tasksByTaskId;

  return (
    <div>
      <Link to="/manager">Back to Task Manager</Link>
      <h1>
        {categoryName} {categoryId}
      </h1>
      <Link to={`/${categoryName}/${categoryId}/add-task`}>Add Task</Link>
      <div className="card-container">
        {tasks.length > 0 ? (
          tasks.map((task: Task) => (
            <div className="card" key={task.id}>
              <div>
                <h3>{task.name}</h3>
                <p>Start Date: {task.dateStart.toString()}</p>
                <p>End Date: {task.dateEnd.toString()}</p>
              </div>
              <Link to={`/${categoryName}/${categoryId}/edit-task/${task.id}`}>Edit Task</Link>
            </div>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
