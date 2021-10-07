import axios from 'axios'; 

const lmsAPIHOostProd = "https ://api.lms.net"; 
const lmsAPIHostDev = "http://localhost: 3001"; 
const lmsAPIHost = process.env.NODE_ENV === "development" ? lmsAPIHostDev : lmsAPIHOostProd; 

const instance = axios.create({ 
    baseURL: lmsAPIHost 
});

export default instance;