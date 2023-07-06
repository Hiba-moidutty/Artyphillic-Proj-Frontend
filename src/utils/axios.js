import axios from "axios";
import {  baseUrl } from "./Constants";

const instance = axios.create({
    baseURL:baseUrl,
});

//  const admininstance = axios.create({
//     baseURL :adminbaseUrl
//  })

 instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization =`Bearer ${token}`
    }
    return config
},(error)=>{
    return Promise.reject(error);
}
)


export default instance;
// export {admininstance}