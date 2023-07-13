import React from 'react';
import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";
import Login from './Login';
import Registration from './Registration';
import ManagerPage from './ManagerPage';
import TaskList from './TaskList';
import AddTask from './AddTask';
import jwt_decode from 'jwt-decode';
import './App.css';

const App: React.FC = () => {
  const [token, setToken] = React.useState<string | null>(localStorage.getItem('token'));
  const [decodedToken, setDecodedToken] = React.useState<any | null>(null);
  const [username, setUsername] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token) as { username: string };
      setDecodedToken(decoded);
      setUsername(decoded.username);
    }
  }, [token]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<Login />} />
          <Route path="/manager" element={<ManagerPage />} />
          <Route path=":categoryName/:categoryId" element={<TaskList />} />
          <Route path=":categoryName/:categoryId/add-task/" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
};

export default App;
