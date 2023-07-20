import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://blog-app-kfp2.onrender.com';

export default axios;