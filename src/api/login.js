import {request} from '@/utils/http.js'

export const login = function(data){
    return request({
        url:'/login',
        method:"POST",
        data
    })
}

export const test = function(){
    return request({
        url:'/test',
        method:"POST"
    })
}