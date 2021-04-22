import {request} from '@/utils/http.js'


//获取所有路由列表
export const getAllRouter = function(data){
    return request({
        url:'/router-list',
        params:data
    })
}

//新增路由
export const addRouter = function(data){
    return request({
        url:'/add-router',
        data,
        method:"POST"
    })
}

//编辑路由
export const editRouter = function(data){
    return request({
        url:'/edit-router',
        data,
        method:'POST'
    })
}