import {request} from '@/utils/http.js'

//账号列表
export const accountList = function(){
    return request({
        url:'/account-list'
    })
}

//新增账号
export const addAccount = function(data){
    return request({
        url:'/add-account',
        data,
        method:"POST"
    })
}