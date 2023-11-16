import axios from "axios";

const myAxios = axios.create();
myAxios.defaults.baseURL = "http://localhost:3000/";

export default myAxios;
