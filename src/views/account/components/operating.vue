<template>
    <el-dialog
        title="添加"
        width="500px"
        :before-close="$handleClose"
        :visible.sync="dialog"
        @open="open">
        <el-form 
            ref="ruleForm" 
            label-width="100px" 
            class="demo-ruleForm"
            v-loading="loading"
            :model="form" 
            :rules="rules" >
            <el-form-item label="账号" prop="account">
                <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="角色选择" prop="purview">
                <el-select v-model="form.purview">
                    <el-option 
                        v-for="(item,index) in purviewList" 
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import {getPurviewList} from '@/api/purview.js'
import {addAccount} from '@/api/account.js'
export default {
    props:['value'],
    data(){
        return{
            dialog:false,
            loading:false,
            form:{
                account:'',
                password:'',
                purview:''
            },
            rules:{
                account:[{ required: true, message: '账号必填', trigger: 'blur' }],
                password:[{ required: true, message: '密码必填', trigger: 'blur' }],
                purview:[{ required: true, message: '请选择角色', trigger: 'change' }],
            },
            purviewList:[]
        }
    },
    created(){
        this.search();
    },
    methods:{
        open(){

        },
        submit(){
            this.$refs['ruleForm'].validate((valid)=>{
                if(valid){
                    addAccount(this.form).then(res=>{
                        this.$message.success(res.message);
                        this.search();
                        this.dialog =false;
                        this.$emit('init')
                    }).catch(err=>{
                        console.log(err)
                    })
                }else{
                    return false
                }
            })
        },
        search(){
            getPurviewList().then(res=>{
                this.purviewList = res.data.map(row=>{
                    return{
                        label:row.purview,
                        value:row.id
                    }
                })
            })
        }
    },
    watch:{
        value(val){
            this.dialog = val
        },
        dialog(val){
            this.$emit('input',val);
        }
    }
}
</script>