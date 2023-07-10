import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const RegistrationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const Registration: React.FC = () => {
  const [username, setUsername] = useState<string>('');

const handleFormSubmit = async (values: {
  username: string;
  password: string;
  email: string;
}) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/users/create',
      values
    );
    console.log(response.status); // Handle the response data as needed

    // Check if the registration was successful
    if (response.status === 201) {
      // Auto-login after successful registration
      const loginResponse = await axios.post(
        'http://localhost:3000/auth/login',
        {
          username: values.username,
          password: values.password,
        }
      );
      const { accessToken } = loginResponse.data;
      localStorage.setItem('token', accessToken);
      const decoded = jwt_decode(accessToken) as { username: string };
      setUsername(decoded.username);
    }
  } catch (error) {
    console.error(error);
  }
};

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUsername('');
  };

  return (
    <div>
      <h1>Registration Form</h1>
      <h2>Hello, {username}</h2>
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        validationSchema={RegistrationSchema}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <div>
            <label htmlFor="username">Username:</label>
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <button type="submit">Register</button>
          <button type="button" onClick={handleSignOut}>
            Sign Out
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
