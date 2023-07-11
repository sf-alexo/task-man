import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const [username, setUsername] = useState<string>('FRIEND');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token) as { username: string, id: string };
      setUsername(decoded.username);
    }
  }, []);

  const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', values);
      const { accessToken } = response.data;
      localStorage.setItem('token', accessToken);
      const decoded = jwt_decode(accessToken) as { username: string };
      setUsername(decoded.username);
      setSubmitting(false);
      navigate('/manager');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUsername('FRIEND');
  };

  return (
    <div>
      <h1>Login</h1>
      <h2>Hello, {username}</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
            <button type="button" onClick={handleSignOut}>
              Sign Out
            </button>
          </Form>
        )}
      </Formik>
      <p>
        Don't have an account? <Link to="/registration">Register</Link>
      </p>
    </div>
  );
};

export default Login;
