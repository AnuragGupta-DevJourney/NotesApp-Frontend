import axios from "axios";

const axiosBaseURL = axios.create({
    // baseURL : "https://notesapp-bakend.onrender.com/api"
    baseURL : "http://localhost:8080/api"
})

export default axiosBaseURL