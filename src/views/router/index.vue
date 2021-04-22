<template>
    <div>
        <div>
            <el-button @click="search" type="primary">搜索</el-button>
        </div>
        <div>
            <el-button type="primary" @click="add">添加</el-button>
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
                prop="path"
                label="路径">
            </el-table-column>
            <el-table-column
                prop="label"
                label="名称">
            </el-table-column>
            <el-table-column
                label="父级">
                <template slot-scope="scope">
                    {{scope.row.parent?scope.row.parent.label:''}}
                </template>
            </el-table-column>
            <el-table-column
                prop="created_at"
                label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.created_at|filterTime}}
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="primary">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <operating v-model="operatingDialog" @init="search" :editRow="editRow" :isEdit="isEdit"></operating>
    </div>
</template>

<script>
import {getAllRouter} from '@/api/router.js'
export default {
    data(){
        return{
            loading:false,
            list:[],
            operatingDialog:false,
            editRow:{},//需要编辑的列表数据
            isEdit:false,//是否为编辑
        }
    },
    mounted(){
        this.search();
    },
    methods:{
        search(){
            this.loading = true
            getAllRouter().then(res=>{
                this.list = res.data.rows
                this.loading = false
            })
        },
        add(){
            this.operatingDialog = true;
            this.isEdit= false;
        },
        edit(row){
            this.editRow=row;
            this.operatingDialog = true;
            this.isEdit = true;
        }
    },
    filters:{
        filterTime(val){
            return new Date(val).toLocaleString()
        }
    },
    components:{
        operating:require('./components/operating.vue').default
    }
}
</script>