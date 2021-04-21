import {request} from '@/utils/http.js'


export const getAllRouter = function(){
    return request({
        url:'/router-list'
    })
}