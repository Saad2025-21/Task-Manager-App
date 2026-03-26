import axios from "axios"
import BASE_URL from "./apipath"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
})

//request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accesstoken = localStorage.getItem("token")
        if (accesstoken) {
            config.headers.Authorization = `bearer ${accesstoken}`
        }
        return config
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = "/login"
            } else if (error.response.status === 500) {
                console.error("server is down")
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Requwst timeout")
        }
        return Promise.reject(error)
    }

)

export default axiosInstance;