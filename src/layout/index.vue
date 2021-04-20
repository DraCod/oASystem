<template>
    <div class="page-body">
        <div class="page-left">
            <div class="page-logo">
                OA
            </div>
            <div class="page-tab">
                <ui-menu></ui-menu>    
            </div>
        </div>
        <div class="page-right">
            <div class="page-title">
                456
            </div>
            <div class="page-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    components:{
        uiMenu:require('./components/menu.vue').default
    }
}
</script>

<style lang="less" scoped>
    .page-body{
        height: 100vh;
        display: flex;
        .page-left{
            width: 240px;
            .page-logo{
                height: 50px;
                text-align: center;
                line-height: 50px;
                background-color: #00a1d6;
                color: #fff;
                font-size: 40px;
            }
            .page-tab{
                height: calc(100% - 50px);
                border-right: solid 1px #e6e6e6;
            }
        }
        .page-right{
            flex: 1;
            .page-title{
                height: 50px;
            }
            .page-content{
                height: calc(100% - 50px);
                overflow-y: auto;
            }
        }
    }
</style>