import {request} from '@/utils/http.js'


export const getPurviewList = function(){
    return request({
        url:'/purview-list'
    })
}