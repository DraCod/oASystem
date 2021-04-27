import Vue from 'vue';

Vue.filter('filterTime',function(val){
    return new Date(val).toLocaleString()
})

Vue.prototype.$handleClose = function(done){
    this.$confirm('确认关闭？')
    .then(() => {
        done();
    })
    .catch(() => {});
}