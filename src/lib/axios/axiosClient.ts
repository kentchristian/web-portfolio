
// api/client.ts
import axios from 'axios';
import {  repoV2, } from "../../../global-config"

export const gitHubApi = axios.create({
  // client setup is good but not reading the process.env or that import 
  baseURL: repoV2, // use this first for simulation
  headers: {
    'Content-Type': 'application/json',
  },
});


// interceptor
gitHubApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);





// only use interceptor for logout -- or something that kicks a user by business logic and conditon
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // token expired
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }

//     return Promise.reject(error);
//   }
// );
