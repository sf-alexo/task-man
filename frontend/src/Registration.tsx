import React from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { CREATE_USER_MUTATION, LOGIN_MUTATION } from './graphql/mutations'; // Adjust the path as needed

const RegistrationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const Registration: React.FC = () => {
  const navigate = useNavigate();

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [login] = useMutation(LOGIN_MUTATION);

  const handleFormSubmit = async (values: {
    username: string;
    password: string;
    email: string;
  }) => {
    try {
      const { data } = await createUser({
        variables: {
          createUserInput: {
            username: values.username,
            password: values.password,
            email: values.email,
          },
        },
      });

      // Check if the registration was successful
      if (data.createUser) {
        // Automatically log in the user using the login mutation
        const loginData = await login({
          variables: {
            username: values.username,
            password: values.password,
          },
        });

        const { accessToken } = loginData.data.login;
        localStorage.setItem('token', accessToken);
        navigate('/manager');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <h1>Registration Form</h1>
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
        </Form>
      </Formik>
      <p>
        Already have an account? <Link to="/">Log in</Link>
      </p>
    </div>
  );
};

export default Registration;

