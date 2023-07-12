import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { Category } from '../../src/typeorm/category.entity';

const ManagerPage = () => {
  const [username, setUsername] = useState<string>('FRIEND');
  const [categories, setCategories] = useState<Category[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false); // State to control the popup visibility
  const [newCategoryName, setNewCategoryName] = useState<string>(''); // State to store the new category name
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token) as { username: string, id: string };
      setUsername(decoded.username);
      fetchCategories();
    } else {
      navigate('/');
    }
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUsername('FRIEND');
    navigate('/');
  };

  const handleCreateCategory = async () => {
    try {
      const token = localStorage.getItem('token');
      const decoded = jwt_decode(token || '') as { id: string };
      const userId = Number(decoded.id);

      const newCategory = {
        name: newCategoryName,
        userId: userId,
      };

      await axios.post('http://localhost:3000/categories/create', newCategory);
      fetchCategories(); // Refresh the categories list
      setNewCategoryName(''); // Clear the new category name
      setShowPopup(false); // Close the popup
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCategory = (categoryId: number) => {
    // Implement the logic to open the edit popup and perform the update request
    console.log('Edit Category:', categoryId);
  };

  const handleDeleteCategory = (categoryId: number) => {
    // Implement the logic to delete the category
    console.log('Delete Category:', categoryId);
  };

  const handleActionsClick = () => {
    setShowPopup(true);
  };

  const handleOutsideClick = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <h2>Hello, {username}</h2>
      <h1>Manager Page</h1>
      <button type="button" onClick={() => setShowPopup(true)}>
        Create Category
      </button>
      {showPopup && (
        <div className="popup">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter category name"
          />
          <button type="button" onClick={handleCreateCategory}>
            Create
          </button>
          <button type="button" onClick={() => setShowPopup(false)}>
            Cancel
          </button>
        </div>
      )}
      <div className="container">
        {categories.map((category) => (
          <div className="row" key={category.id}>
            <h3>{category.name}</h3>
            <p>Date: {category.dateCreated.toString()}</p>
          <div className="actions">
            <button type="button" onClick={() => handleEditCategory(category.id)}>
              Edit
            </button>
            <button type="button" onClick={() => handleDeleteCategory(category.id)}>
              Delete
            </button>
          </div>
        </div>
        ))}
      </div>
      <button type="button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default ManagerPage;
