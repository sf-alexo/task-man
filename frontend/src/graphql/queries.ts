import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      dateCreated
      userId
    }
  }
`;

export const GET_TASKS_BY_TASK_ID = gql`
  query GetTasksByTaskId($taskId: Int!) {
    tasksByTaskId(taskId: $taskId) {
      id
      name
      dateStart
      dateEnd
      taskId
    }
  }
`;

export const GET_TASK = gql`
  query GetTask($id: Int!) {
    task(id: $id) {
      id
      name
      dateStart
      dateEnd
      taskId
    }
  }
`;
