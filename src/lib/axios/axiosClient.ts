
// api/client.ts
import axios from 'axios';
import { baseGitHubApi } from '../../../global-config';

const FALLBACK_GITHUB_API = 'https://api.github.com/users/';
const resolvedBaseGitHubApi = (baseGitHubApi || FALLBACK_GITHUB_API).endsWith(
  '/',
)
  ? baseGitHubApi || FALLBACK_GITHUB_API
  : `${baseGitHubApi || FALLBACK_GITHUB_API}/`;

export const gitHubApi = axios.create({
  baseURL: resolvedBaseGitHubApi,
  headers: {
    Accept: 'application/vnd.github+json',
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
