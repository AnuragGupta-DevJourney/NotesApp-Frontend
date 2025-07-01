import axios from "axios";

const axiosBaseURL = axios.create({
    baseURL : "https://notesapp-bakend-1.onrender.com/api/"
})

export default axiosBaseURL