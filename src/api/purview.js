import {request} from '@/utils/http.js'


//获取权限列表
export const getPurviewList = function(){
    return request({
        url:'/purview-list'
    })
}


//获取路由树
export const routerTree = function(){
    return request({
        url:'/router-tree'
    })
}


//添加权限角色
export const addPurview = function(data){
    return request({
        url:'/add-purview',
        method:'POST',
        data
    })
}