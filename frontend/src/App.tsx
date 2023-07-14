import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Login';
import Registration from './Registration';
import ManagerPage from './ManagerPage';
import TaskList from './TaskList';
import AddTask from './AddTask';
import EditTask from './EditTask';
import './App.css';

const App: React.FC = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<Login />} />
          <Route path="/manager" element={<ManagerPage />} />
          <Route path=":categoryName/:categoryId" element={<TaskList />} />
          <Route path=":categoryName/:categoryId/add-task/" element={<AddTask />} />
          <Route path=":categoryName/:categoryId/edit-task/:id" element={<EditTask />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
};

export default App;
