import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
    // baseURL: "https://jobee.onrender.com"
})

// axiosInstance.defaults.headers.common["Authorization"] = getTokenFromLocalStorage();

export default axiosInstance;