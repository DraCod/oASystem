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
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <div v-if="scope.row.routerId!='0'">
                        <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="deletePurview(scope.row)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <operating v-model="operatingDialog" :edit="isEdit" :row="row" @init="search"></operating>
    </div>
</template>

<script>
import {getPurviewList,deletePurview} from '@/api/purview.js'
export default {
    data(){
        return{
            loading:false,
            list:[],
            operatingDialog:false,
            isEdit:false,
            row:{}
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
            this.isEdit = false
        },
        edit(row){
            this.isEdit = true;
            this.operatingDialog = true;
            this.row = row;
        },
        deletePurview(row){
             this.$confirm(`此操作将永久删除该${row.purview}, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deletePurview(row.id).then(res=>{
                    this.$message.success(res.message);
                    this.search();
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });     
            })
        }
    },
    components:{
        operating:require('./components/operating.vue').default,//添加 编辑对话框
    }
}
</script>