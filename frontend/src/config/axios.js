import axios from 'axios';
import { TOKEN } from '@Consts/application';
import {
  urls, NODE_ENV,
  hostname_env
} from '../../.env.js';
import router from '../router';
import store from '../store';
import functions from './functions';

let url;

if (urls.hasOwnProperty(NODE_ENV))
  url = urls[NODE_ENV];
else {
  const hostname = window.location.hostname;
  if (hostname_env.hasOwnProperty(hostname))
    url = urls[hostname_env[hostname]];
  else
    url = urls.development;
}

const http = axios.create({
  baseURL: url,
  headers: {
    Accept: 'application/json'
  },
  responseType: 'json'
});


http.interceptors.request.use(
  config => {
    const user_token = localStorage.getItem(TOKEN);
    if (user_token)
      config.headers.Authorization = `Bearer ${user_token}`;
    return config;
  },
  error => Promise.reject(error),
);

const clearData = response => {
  if (response.data.message)
    store.dispatch('SHOW_SNACKBAR', { color: 'error', message: response.data.message });

  if (!('data' in response) || typeof response.data !== 'object') return response;

  if (response.data && !('data' in response.data)) return response.data;

  return response.data.data;
};

const showError = async error => {
  const response = error.response;
  let errorMessage = 'Unknown error!';

  if (response) {
    if (response.data)
      if (response.data.message) errorMessage = response.data.message;
      else if (response.data.error.message) errorMessage = response.data.error.message;

    store.dispatch('SHOW_SNACKBAR', { color: 'error', message: errorMessage });

    if (response.status === 401) {
      await functions.Logout();
      store.dispatch('SHOW_SNACKBAR', { color: 'error', message: errorMessage });
    }
    return Promise.reject(response.data);
  }

  store.dispatch('SHOW_SNACKBAR', { color: 'error', message: errorMessage });
  return Promise.reject(error);
};

http.interceptors.response.use(
  response => clearData(response),
  error => {
    if (!error.response)
      return showError({
        response: { data: { message: 'Connection error! Please check your internet and try again.' } }
      });
    return showError(error);
  }
);


export default http;
