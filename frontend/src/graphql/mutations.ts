import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      username
      email
    }
  }
`;
export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      accessToken
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      id
      name
      dateCreated
      userId
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: Float!, $updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(id: $id, updateCategoryInput: $updateCategoryInput) {
      id
      name
      dateCreated
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: Int!) {
    deleteCategory(id: $id)
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($createTaskInput: CreateTaskInput!) {
    createTask(createTaskInput: $createTaskInput) {
      id
      name
      dateStart
      dateEnd
      taskId
    }
  }
`;

export const UPDATE_TASK= gql`
  mutation UpdateTask($id: Int!, $updateTaskInput: UpdateTaskInput!) {
    updateTask(id: $id, updateTaskInput: $updateTaskInput) {
      id
      name
      dateStart
      dateEnd
      taskId
    }
  }
`;

