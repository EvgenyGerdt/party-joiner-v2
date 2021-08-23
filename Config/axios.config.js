import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://party-joiner.herokuapp.com',
});

export default instance;
