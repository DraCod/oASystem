import axios from 'axios';
// import vue from 'vue';

export const server = axios.create({
    baseURL:'http://localhost:7001',
    timeout:5000,
})

//请求拦截
server.interceptors.request.use(config=>{
    return config
})

//响应拦截
server.interceptors.response.use(respone=>{
    return respone
},err=>{
    console.dir(err)
    if(err.response.status === 402){
        alert(err.response.data.message)
    }
    return err
})

