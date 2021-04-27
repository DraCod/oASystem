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
                prop="account"
                label="账号">
            </el-table-column>
            <el-table-column
                prop="purviews.purview"
                label="账号权限">
              
            </el-table-column>
            <el-table-column
                prop="createdAt"
                label="创建时间">
                <template slot-scope="scope">
                     {{scope.row.created_at|filterTime}}
                </template>
            </el-table-column>
            <!-- <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <div v-if="scope.row.routerId!='0'">
                        <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="deletePurview(scope.row)">删除</el-button>
                    </div>
                </template>
            </el-table-column> -->
        </el-table>
        <operatingDialog v-model="operatingDialog" @init="search"></operatingDialog>
    </div>
</template>

<script>
import {accountList} from '@/api/account.js'
export default {
    data(){
        return{
            loading:false,
            list:[],
            operatingDialog:false,
        }
    },
    created(){
        this.search();
    },
    methods:{
        search(){
            this.loading = true
            accountList().then(res=>{
                this.list = res.data
                this.loading = false
            })
        },
        isAdd(){
            this.operatingDialog = true;
        }
    },
    components:{
        operatingDialog:require('./components/operating.vue').default
    }
}
</script>