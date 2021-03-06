import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import axios from 'axios'

axios.defaults.baseURL = 'baseBackEndURL';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
ReactDOM.render(
  <App />,
  document.getElementById('root')
);