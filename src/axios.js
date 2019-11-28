import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://uxcandy.com/~shapoval/test-task-backend/v2/'
});
