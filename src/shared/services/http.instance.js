import axios from 'axios';
const httpInstance = axios.create(
    {
        baseURL: 'http://localhost:8000', //import.meta.env.VITE_API_URL,
        heck: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
    }
);

export default httpInstance;