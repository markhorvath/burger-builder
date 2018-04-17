import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-12b1a.firebaseio.com/'
});

export default instance;