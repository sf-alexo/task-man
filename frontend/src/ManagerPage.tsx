import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { Category } from '../../src/typeorm/category.entity';

const ManagerPage = () => {
  const [username, setUsername] = useState<string>('FRIEND');
  const [categories, setCategories] = useState<Category[]>([]);
  const [taskCounts, setTaskCounts] = useState<Record<number, number>>({});
  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);
  const navigate = useNavigate();



  const fetchTaskCount = useCallback(async (categoryId: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/tasks?taskId=${categoryId}`);
      const count = response.data.length;
      setTaskCounts((prevTaskCounts) => ({
        ...prevTaskCounts,
        [categoryId]: count,
      }));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
      response.data.forEach((category: Category) => {
        fetchTaskCount(category.id);
      });
    } catch (error) {
      console.error(error);
    }
  }, [fetchTaskCount]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUsername('FRIEND');
    navigate('/');
  };

  const handleMoreButtonClick = (categoryId: number, categoryName: string) => {
    navigate(`/${categoryName}/${categoryId}`);
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
      setEditCategoryId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    setShowDeletePopup(true);
    setDeleteCategoryId(categoryId);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/categories/${deleteCategoryId}`);
      fetchCategories();
      setShowDeletePopup(false);
      setDeleteCategoryId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setDeleteCategoryId(null);
  };

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwt_decode(token) as { username: string, id: string };
    setUsername(decoded.username);
    fetchCategories();
  } else {
    navigate('/');
  }
}, [fetchCategories, navigate]);

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
            <span>{taskCounts[category.id]} tasks</span>
            <div className="date">Date: {category.dateCreated.toString().slice(0, 10)}</div>
            <div className="actions">
              <button type="button" onClick={() => handleEditCategory(category.id)}>
                Edit
              </button>
              <button type="button" onClick={() => handleDeleteCategory(category.id)}>
                Delete
              </button>
              <button type="button" onClick={() => handleMoreButtonClick(category.id, category.name)}>
                More
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
      {showDeletePopup && (
        <div className="delete-popup">
          <p>Are you sure you want to delete this category?</p>
          <button type="button" onClick={handleConfirmDelete}>
            Yes
          </button>
          <button type="button" onClick={handleCancelDelete}>
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
