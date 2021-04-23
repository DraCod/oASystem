import Vue from 'vue';

Vue.filter('filterTime',function(val){
    return new Date(val).toLocaleString()
})