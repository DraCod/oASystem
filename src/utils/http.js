import axios from 'axios';
import Router from '@/router';

export const request = axios.create({
    baseURL:'http://localhost:7001',
    timeout:5000,
})

//请求拦截
request.interceptors.request.use(config=>{
    const token = window.localStorage.getItem('token')
    // console.log(token);
    if(token){
        config.headers.token=token;
    }
    return config
})

//响应拦截
request.interceptors.response.use(respone=>{
    return respone.data
},err=>{
    // console.dir(err)
    //判断状态码
    if(err.response.status === 401){
        Router.push('/login')
        // 利用路由实例跳转
    }
    if(err.response.status === 402){
        //处理错误信息
        alert(err.response.data.message)
    }
    throw err
    // return err
})

// exports.request= server
