import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { Category } from '../../src/typeorm/category.entity';

const ManagerPage = () => {
  const [username, setUsername] = useState<string>('FRIEND');
  const [categories, setCategories] = useState<Category[]>([]);
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

return (
  <div>
    <h2>Hello, {username}</h2>
    <h1>Manager Page</h1>
    {categories.map((category) => (
      <div key={category.id}>
        <h3>{category.name}</h3>
        <p>Date: {category.dateCreated.toString()}</p> {/* Convert to string */}
      </div>
    ))}
    <button type="button" onClick={handleSignOut}>
      Sign Out
    </button>
  </div>
);
};

export default ManagerPage;
