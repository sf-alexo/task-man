import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import jwt_decode from 'jwt-decode';
import { Category } from './types';

import { GET_CATEGORIES } from './graphql/queries';
import { CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from './graphql/mutations';

const ManagerPage = () => {
  const [username, setUsername] = useState<string>('FRIEND');
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState<string>('');

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUsername('FRIEND');
    navigate('/');
  };

  const handleCreateCategory = async () => {
    try {
      const token = localStorage.getItem('token');
      const decoded = jwt_decode(token || '') as { sub: string };
      const userId = Number(decoded.sub);

      const { data } = await createCategory({
        variables: {
          createCategoryInput: {
            name: newCategoryName,
            userId: userId,
          },
        },
      });

      if (data.createCategory) {
        setCategories(prevCategories => [...prevCategories, data.createCategory]);
        setNewCategoryName('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCategory = (categoryId: number) => {
    setEditingCategoryId(categoryId);
    const category = categories.find((cat) => cat.id === categoryId);
    if (category) {
      setEditedCategoryName(category.name);
    }
  };

  const handleSaveEditedCategory = async (categoryId: number) => {
    try {
      const token = localStorage.getItem('token');
      const decoded = jwt_decode(token || '') as { sub: string };
      const userId = Number(decoded.sub);

      const { data } = await updateCategory({
        variables: {
          id: categoryId,
          updateCategoryInput: {
            name: editedCategoryName,
            userId: userId,
          },
        },
      });

      if (data.updateCategory) {
        setEditingCategoryId(null);
        setEditedCategoryName('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    setDeleteCategoryId(categoryId);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const { data } = await deleteCategory({
        variables: {
          id: deleteCategoryId,
        },
      });

      if (data.deleteCategory) {
        // Update the categories list after successful deletion
        setCategories(prevCategories =>
          prevCategories.filter(category => category.id !== deleteCategoryId)
        );
        setShowDeletePopup(false);
        setDeleteCategoryId(null);
      }
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
    } else {
      navigate('/');
    }

    if (data && data.categories) {
      setCategories(data.categories);
    }
  }, [data, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
            {editingCategoryId === category.id ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editedCategoryName}
                  onChange={(e) => setEditedCategoryName(e.target.value)}
                />
                <button onClick={() => handleSaveEditedCategory(category.id)}>Save</button>
              </div>
            ) : (
              <>
                <h3>{category.name}</h3>
                <div className="date">Date: {category.dateCreated.toString().slice(0, 10)}</div>
                <button onClick={() => handleEditCategory(category.id)}>Edit</button>
                <button type="button" onClick={() => handleDeleteCategory(category.id)}>
                  Delete
                </button>
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
              </>
            )}
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
