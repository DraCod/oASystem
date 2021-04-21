<template>
    <el-dialog
        title="提示"
        :visible.sync="dialog"
        width="500px"
        :before-close="handleClose">
        

    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="路径" prop="path">
            <el-input v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="path">
            <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item label="父级" prop="parents">
            <el-select v-model="form.parents" clearable >
                <el-option 
                    v-for="(item,index) in list" :key="index"
                    :label="item.label"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <!-- <el-form-item slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item> -->
    </el-form>


        <span slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props:{
        value:{},
        list:{}
    },
    data(){
        return{
            dialog:false,
            form:{
                path:'',
                label:'',
                parents:'',
            },
            rules:{
                path:[{ required: true, message: '请输入路径', trigger: 'blur' }],
                label:[{ required: true, message: '名称', trigger: 'blur' }],
                // parents:[{ required: true, message: '请选择', trigger: 'change' }]
            }
        }
    },
    methods:{
        submit(){

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
            this.$emit('input',val)
        }
    }
}
</script>