import axios from 'axios';

const instance= axios.create({
    baseURL : 'https://burger-app-ddeee-default-rtdb.firebaseio.com/'
});

export default instance;