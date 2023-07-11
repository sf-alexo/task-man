import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const ManagerPage = () => {
  const [username, setUsername] = useState<string>('FRIEND');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token) as { username: string, id: string };
      setUsername(decoded.username);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUsername('FRIEND');
    navigate('/');
  };

  return (
    <div>
      <h2>Hello, {username}</h2>
      <h1>Manager Page</h1>
      <button type="button" onClick={handleSignOut}>
          Sign Out
      </button>
    </div>
  );
};

export default ManagerPage;