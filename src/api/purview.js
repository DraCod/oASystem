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


//角色详情
export const purviewDetail = function(id){
    return request({
        url:`/purview-detail/${id}`
    })
}

//编辑角色
export const editPurview = function(data){
    return request({
        url:'/edit-purview',
        method:'POST',
        data
    })
}

//删除角色
export const deletePurview = function(id){
    return request({
        url:`/delete-purview/${id}`,
        method:'DELETE'
    })
}