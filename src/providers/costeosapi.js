import axios from 'axios'

const API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL

console.log(API_URL)

export default axios.create({
  baseURL: API_URL,
})
