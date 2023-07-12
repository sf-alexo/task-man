import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { Category } from '../../src/typeorm/category.entity';

const ManagerPage = () => {
  const [username, setUsername] = useState<string>('FRIEND');
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>('');

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
      fetchCategories();
      setNewCategoryName('');
      setShowCreatePopup(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCategory = (categoryId: number) => {
    setShowEditPopup(true);
    setEditCategoryId(categoryId);
  };

  const handleUpdateCategory = async () => {
    if (!editCategoryId) return;

    try {
      const token = localStorage.getItem('token');
      const decoded = jwt_decode(token || '') as { id: string };
      const userId = Number(decoded.id);

      const updatedCategory = {
        name: newCategoryName,
        userId: userId,
      };

      await axios.put(`http://localhost:3000/categories/${editCategoryId}`, updatedCategory);
      fetchCategories();
      setNewCategoryName('');
      setShowEditPopup(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    console.log('Delete Category:', categoryId);
  };

  return (
    <div>
      <h2>Hello, {username}</h2>
      <h1>Manager Page</h1>
      <button type="button" onClick={() => setShowCreatePopup(true)}>
        Create Category
      </button>
      {showCreatePopup && (
        <div className="create-popup">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter category name"
          />
          <button type="button" onClick={handleCreateCategory}>
            Create
          </button>
          <button type="button" onClick={() => setShowCreatePopup(false)}>
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
      {showEditPopup && (
        <div className="edit-popup">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter new category name"
          />
          <button type="button" onClick={handleUpdateCategory}>
            Update
          </button>
          <button type="button" onClick={() => setShowEditPopup(false)}>
            Cancel
          </button>
        </div>
      )}
      <button type="button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default ManagerPage;
