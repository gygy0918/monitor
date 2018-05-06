<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>申请入库表单</el-breadcrumb-item>
                <el-breadcrumb-item>申请入库基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户ID" style="width:320px">
                    <el-input v-model="form.yhId"></el-input>
                </el-form-item>
                <div class="block" style="margin:20px;width:100%;">
                    <span class="demonstration">仓库/货柜</span>
                    <el-cascader
                        :options=" options"
                        v-model="selectedOptions"
                        @change="handleChange">
                    </el-cascader>
                </div>
                <div style="margin-left:20px;margin-bottom:20px">
                <span style="margin:0">
                商品ID
                </span>
                    <el-select v-model="value" placeholder="请选择" >
                    <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                </div>

                <!--<el-form-item label="仓库ID">-->
                    <!--<el-input v-model="form.ckId"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="货柜ID">-->
                    <!--<el-input v-model="form.hgId"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="商品ID">-->
                    <!--<el-input v-model="form.spId"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="入库商品数量" style="width:320px">
                    <el-input v-model="form.applyCount"></el-input>
                </el-form-item>
                <!--<el-form-item label="备注">-->
                    <!--<el-input v-model="form.remark"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="表单名称">-->
                    <!--<el-input v-model="form.name"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="选择器">-->
                    <!--<el-select v-model="form.region" placeholder="请选择">-->
                        <!--<el-option key="bbk" label="步步高" value="bbk"></el-option>-->
                        <!--<el-option key="xtc" label="小天才" value="xtc"></el-option>-->
                        <!--<el-option key="imoo" label="imoo" value="imoo"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="日期时间">-->
                    <!--<el-col :span="11">-->
                        <!--<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>-->
                    <!--</el-col>-->
                    <!--<el-col class="line" :span="2">-</el-col>-->
                    <!--<el-col :span="11">-->
                        <!--<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>-->
                    <!--</el-col>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="选择开关">-->
                    <!--<el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="多选框">-->
                    <!--<el-checkbox-group v-model="form.type">-->
                        <!--<el-checkbox label="步步高" name="type"></el-checkbox>-->
                        <!--<el-checkbox label="小天才" name="type"></el-checkbox>-->
                        <!--<el-checkbox label="imoo" name="type"></el-checkbox>-->
                    <!--</el-checkbox-group>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="单选框">-->
                    <!--<el-radio-group v-model="form.resource">-->
                        <!--<el-radio label="步步高"></el-radio>-->
                        <!--<el-radio label="小天才"></el-radio>-->
                        <!--<el-radio label="imoo"></el-radio>-->
                    <!--</el-radio-group>-->
                <!--</el-form-item>-->
                <el-form-item label="备注" style="width:320px">
                    <el-input type="textarea" v-model="form.remark"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                obj:{},
                spObj:{},
                options:[],
                options2:[],
                value: '',
                selectedOptions: [],
                warehouseInfo:[],
                form: {
                    yhId: localStorage.getItem('yhId'),
                    ckId: '',
                    hgId: '',
                    spId: '',
//                    delivery: true,
//                    type: ['步步高'],
                    rkCount: '',
                    remark: ''
                }
            }
        },
        created(){
//             var datainfo=[];
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.243.94:8080/list/ckIds',
                    params:{
                        page:1,
                        size:9
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                this.options=res.data
            console.log('结果666666',this.options)
//                 datainfo=res.data.data.results;
//
        });
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.243.94:8080/list/spIds',
                    params:{
                        page:1,
                        size:9
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                this.options2=res.data
            console.log('结果+++++',res.data)
//                 datainfo=res.data.data.results;
//
        });
        },
        methods: {
            handleChange(value) {
                this.obj={};
                this.obj.ckId=value[0];
                this.obj.hgId=value[1];
                console.log(this.obj);
            },
            onSubmit() {
                // let spObj={}
                this.spObj.spId=this.value;
                let data=Object.assign({},this.form,this.obj,this.spObj);
                console.log('ttt',data)
                this.$ajax(
                    {
                        method: 'post', //请求方式
                        url: 'http://10.103.243.94:8080/warehouseApply',
                        data:data,
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    console.log('结果',res)
                });
                this.$message.success('提交成功！');
               this.$router.push('/checkApply');
            }
        }
    }
</script>
