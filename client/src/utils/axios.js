import axios from 'axios';

axios.defaults.baseURL = "https://blog-app-api-ir8o.onrender.com";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "https://blog-app-api-ir8o.onrender.com";

export default axios;