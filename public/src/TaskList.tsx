import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Task } from '../../src/typeorm/task.entity';

const TaskList: React.FC = () => {
  const { categoryId } = useParams();
  const { categoryName } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks?taskId=${categoryId}`);
        console.log(response.data);
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [categoryId]);

  return (
    <div>
      <h1>{categoryName} {categoryId}</h1>
      <div className="card-container">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div className="card" key={task.id}>
              <div>
                <h3>{task.name}</h3>
                <p>Start Date: {task.dateStart.toString()}</p>
                <p>End Date: {task.dateEnd.toString()}</p>
              </div>
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
