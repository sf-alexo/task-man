import React from 'react';
import Login from './Login';
import Registration from './Registration';
import jwt_decode from 'jwt-decode';

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
      <h1>My App</h1>
      <Registration /> {/* Render the RegistrationForm component */}
      <Login /> {/* Render the Login component */}
            {token && (
        <div>
          {username && <h3>Username: {username}</h3>}
        </div>
      )}
    </div>
  );
};

export default App;
