import axios from 'axios';

//const httpInstance = axios.create({
  //  baseURL: 'http://localhost:8000',
    //heck: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
//});
const http = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para agregar token
http.interceptors.request.use(config => {
    const token = localStorage.getItem('aquapath_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para manejar errores
http.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Redirigir a login
            localStorage.removeItem('aquapath_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default http;

//export default httpInstance;
