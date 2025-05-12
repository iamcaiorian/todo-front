import axios from 'axios';

export const api = axios.create({
  baseURL: "https://todo-api-34fb.onrender.com/"
});
