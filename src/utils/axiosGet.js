import axios from "axios";
const baseURL = "http://localhost:3000/";
const axiosGet = (path) => {
    const token = localStorage.getItem('jwtToken');
    return axios.get(baseURL + path, {
        headers: {
            "Authorization": "Bearer " + token,
            'Content-Type': 'application/json',
        }
    })
}
export default axiosGet;