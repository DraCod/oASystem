<template>
    <el-dialog
        title="添加"
        width="500px"
        :before-close="handleClose"
        :visible.sync="dialog"
        @open="open">
         <el-form 
            :model="form" 
            :rules="rules" 
            ref="ruleForm" 
            label-width="100px" 
            class="demo-ruleForm">
            <el-form-item label="权限名称" prop="purview">
                <el-input v-model="form.purview"></el-input>
            </el-form-item>
            <el-form-item label="可见权限">
                <template v-for="(item,index) in router_list" >
                    <el-checkbox v-if="!item.children" v-model="item.check" :key="index">{{item.label}}</el-checkbox>
                    <div v-else :key="index">
                        <el-checkbox 
                            v-model="item.check"
                            @change="checkAll(item)"
                            :indeterminate="item.isIndeterminate">
                            {{item.label}}
                        </el-checkbox>
                        <el-checkbox-group v-model="item.checkList" @change="isChange(item)">
                            <el-checkbox v-for="ite in item.children" :label="ite.id" :key="ite.id">{{ite.label}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </template>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import {routerTree,addPurview} from '@/api/purview'
export default {
    props:['value'],
    data(){
        return{
            dialog:false,
            form:{
                purview:'',
            },
            rules:{
                purview:[{ required: true, message: '权限名称必填', trigger: 'blur' }],
            },
            router_list:[],
        }
    },
    mounted(){
        routerTree().then(res=>{
            this.router_list=res.data.map(row=>{
                row.check=false
                if(row.children){
                    row.isIndeterminate = false;
                    row.checkList = []
                    row.children.forEach(ro=>ro.check=false)
                }
                return row
            })
        })
    },
    methods:{
        submit(){
            this.$refs['ruleForm'].validate((valid)=>{
                if(valid){
                    const router=[];
                    this.router_list.forEach(row=>{
                        if(row.check){
                            router.push(row.id)
                        }
                        if(row.checkList&&row.checkList.length>0){
                            router.push(...row.checkList)
                        }
                    })
                    addPurview({
                        purview:this.form.purview,
                        router
                    }).then(res=>{
                        this.$message.success(res.message);
                        this.dialog =false;
                    })
                }else{
                    return false
                }
            })
        },
        isChange(row){
            (row.checkList.length==row.children.length)?
            row.check = true:
            row.check = false;
        },
        checkAll(row){
            if(row.check){
                row.checkList = row.children.map(ro=>ro.id)
            }else{
                row.checkList = []
            }
        },
        open(){
            this.$nextTick(()=>{
                this.$refs['ruleForm'].resetFields();
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(() => {
                done();
            })
            .catch(() => {});
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