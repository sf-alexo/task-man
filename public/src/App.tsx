import React from 'react';
import Login from './Login';
import Registration from './Registration';

const App: React.FC = () => {
  return (
    <div>
      <h1>My App</h1>
      <Registration /> {/* Render the RegistrationForm component */}
      <Login /> {/* Render the Login component */}
    </div>
  );
};

export default App;
