import axios from 'axios';

const httpInstance = axios.create({
    baseURL: 'http://localhost:8000',
    heck: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
});

export default httpInstance;
