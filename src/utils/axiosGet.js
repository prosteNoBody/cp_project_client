import axios from "axios";
const axiosGet = async (path) => {
    const token = localStorage.getItem('jwtToken');
    return axios.get(path, {
        headers: {
            "Authorization": "Bearer " + token,
            'Content-Type': 'application/json',
        }
    })
}
export default axiosGet;