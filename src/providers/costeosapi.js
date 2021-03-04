import axios from 'axios';

export default axios.create({
  baseURL: 'https://costeosapi.herokuapp.com/'
});