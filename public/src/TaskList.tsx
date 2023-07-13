import React from 'react';
import { useParams } from 'react-router-dom';

const TaskList: React.FC = () => {
  const { categoryId } = useParams();
  const { categoryName } = useParams();

  // Fetch category details based on the categoryName from the API or use it directly

  return (
    <div>
      <h1>{categoryName} {categoryId}</h1>
      {/* Render the category details or perform any other necessary actions */}
    </div>
  );
};

export default TaskList;
