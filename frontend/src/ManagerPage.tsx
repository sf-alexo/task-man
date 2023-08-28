import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import jwt_decode from 'jwt-decode';
import { Category } from './types';

import { GET_CATEGORIES } from './graphql/queries';


const ManagerPage = () => {
  const [username, setUsername] = useState<string>('FRIEND');
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUsername('FRIEND');
    navigate('/');
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
      <div className="container">
        {categories.map((category) => (
          <div className="row" key={category.id}>
            <h3>{category.name}</h3>
            <div className="date">Date: {category.dateCreated.toString().slice(0, 10)}</div>
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
