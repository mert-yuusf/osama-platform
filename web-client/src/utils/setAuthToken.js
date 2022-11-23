import axios from "axios";

const setAuthToken = (token) => {
    console.log(`👉 check token in local storage`);
    if (token) {
        console.log(`👉 token has found`);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"]
    }
}


export default setAuthToken;