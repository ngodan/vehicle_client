// src/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.2.200:8800/api',
});

export default instance;
