<template>
    <div>
        <div>
            <el-button type="primary" @click="search">搜索</el-button>
        </div>
        <div class="mg-small">
            <el-button type="primary" @click="isAdd">添加</el-button>
        </div>
        <el-table
            v-loading='loading'
            element-loading-text="拼命加载中"
            :data="list"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="id">
            </el-table-column>
            <el-table-column
                prop="purview"
                label="权限名称">
            </el-table-column>
            <el-table-column
                label="可见权限">
                <template slot-scope="scope">
                    <div>
                        <template v-if="scope.row.routerId=='0'">
                            <span style="color:red">超级管理员，拥有所有权限</span>
                        </template>
                        <template v-else>
                            <span 
                                v-for="(item,index) in scope.row.router" 
                                :key="index">
                                {{item.label}}    
                            </span>
                        </template>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="createdAt"
                label="创建时间">
                <template slot-scope="scope">
                     {{scope.row.created_at|filterTime}}
                </template>
            </el-table-column>
        </el-table>
        <operating v-model="operatingDialog"></operating>
    </div>
</template>

<script>
import {getPurviewList} from '@/api/purview.js'
export default {
    data(){
        return{
            loading:false,
            list:[],
            operatingDialog:false,
        }
    },
    mounted(){
        this.search();
    },
    methods:{
        search(){
            getPurviewList().then(res=>{
                this.list = res.data
            })
        },
        isAdd(){
            this.operatingDialog=true;
        }
    },
    components:{
        operating:require('./components/operating.vue').default,//添加 编辑对话框
    }
}
</script>