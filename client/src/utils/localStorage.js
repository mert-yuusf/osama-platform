const addTokenToLocalStorage = (token) => {
    localStorage.setItem("token", token)
}


const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token")
}


const addUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
}

const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user")
    if (!user) {
        return null
    }
    return JSON.parse(user);
}

const clearLocalStorage = () => {
    const user = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    if (user && token) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
}

export {
    addTokenToLocalStorage,
    getTokenFromLocalStorage,
    addUserToLocalStorage,
    getUserFromLocalStorage,
    clearLocalStorage
}