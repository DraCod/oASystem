import {request} from '@/utils/http.js'

//登录
export const login = function(data){
    return request({
        url:'/login',
        method:"POST",
        data
    })
}

// export const test = function(){
//     return request({
//         url:'/test',
//         method:"POST"
//     })
// }

//初始话首页可见路由
export const getRouter = function(){
    return request({
        url:'/router-init',
    })
}