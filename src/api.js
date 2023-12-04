// src/api.js
import axios from 'axios';
import { serverIP } from '@/configs/configDefault';

const instance = axios.create({
  baseURL: serverIP + '/api',
});

export default instance;
