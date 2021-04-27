<template>
    <el-dialog
        title="添加"
        width="500px"
        :before-close="handleClose"
        :visible.sync="dialog"
        @open="open">
         <el-form 
            ref="ruleForm" 
            label-width="100px" 
            class="demo-ruleForm"
            v-loading="loading"
            :model="form" 
            :rules="rules" >
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
import {routerTree,addPurview,purviewDetail,editPurview} from '@/api/purview'
export default {
    props:['value','edit','row'],
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
            loading:false
        }
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
                            router.push(row.id)
                        }
                    })
                    if(this.edit){
                        editPurview({
                            router,
                            id:this.row.id,
                            purview:this.form.purview
                        }).then(res=>{
                            this.$message.success(res.message);
                            this.dialog =false;
                            this.$emit('init')
                        })
                    }else{
                        addPurview({
                            purview:this.form.purview,
                            router
                        }).then(res=>{
                            this.$message.success(res.message);
                            this.dialog =false;
                            this.$emit('init')
                        })
                    }
                }else{
                    return false
                }
            })
        },
        isChange(row){
            (row.checkList.length>0&&row.checkList.length!=row.children.length)?
            row.isIndeterminate = true:
            row.isIndeterminate = false;
            (row.checkList.length==row.children.length)?
            row.check = true:
            row.check = false;
        },
        checkAll(row){
            if(row.check){
                row.checkList = row.children.map(ro=>ro.id)
                row.isIndeterminate = false
            }else{
                row.checkList = []
            }
        },
        getRouterTree(){
            this.loading = true
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
                this.loading = false
            })
        },
        open(){
            this.$nextTick(()=>{
                this.$refs['ruleForm'].resetFields();
            })
            if(this.edit){
                purviewDetail(this.row.id).then(res=>{
                     this.router_list=res.data.tree.map(row=>{
                        if(row.children){
                            row.isIndeterminate = false
                            row.children.forEach(ro=>{
                                if(ro.check){
                                    row.isIndeterminate = true;
                                    if(row.checkList){
                                        row.checkList.push(ro.id)
                                    }else{
                                        row.checkList=[ro.id]
                                    }
                                }
                            })
                            if(!row.checkList){
                                row.checkList=[]
                            }
                            if(row.checkList.length===row.children.length){
                                row.isIndeterminate = false
                                row.check = true;
                            }
                        }
                        return row
                    })
                    this.form.purview = res.data.purview
                })
            }else{
                this.getRouterTree();
            }
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