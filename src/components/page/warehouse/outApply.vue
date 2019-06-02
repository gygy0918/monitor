<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>申请出库表单</el-breadcrumb-item>
                <el-breadcrumb-item>申请出库基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" v-if="display">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户ID" style="width:320px">
                    <el-input v-model="form.yhId"></el-input>
                </el-form-item>
                <div style="margin-left:20px;margin-bottom:20px">
                <span style="margin:0">
                商品ID
                </span>
                    <el-select v-model="value" placeholder="请选择" @change="choseGood"  >
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
                <el-form-item label="出库商品数量" style="width:320px">
                    <el-input v-model="form.applyCount" @blur="getHuogui"></el-input>
                </el-form-item>
                <div class="block" style="margin:20px;width:100%;" v-if="auto">
                    <span class="demonstration">仓库/货柜</span>
                    <el-cascader
                        :options=" options"
                        v-model="selectedOptions"
                        @change="handleChange">
                    </el-cascader>
                </div>
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
                    <el-button type="primary" @click="auto=0">出库自动分配</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="form-box" v-else>
            <el-button type="danger" style="border-bottom: 20px" @click="sure">确认分配结果</el-button>
            <el-table :data="applyIn" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <!--<el-table-column prop="date" label="日期" sortable width="150">-->
                <!--</el-table-column>-->
                <el-table-column prop="ckId" label="仓库编号" width="120">
                </el-table-column>
                <el-table-column prop="applyCount" label="申请数量" width="120">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template scope="scope">
                        <el-button size="small"
                                   @click="handleEdit(scope.$index, scope.row)">编辑修改</el-button>
                        <el-button size="small" type="danger"
                                   @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                display:1,
                obj:{},
                spObj:{},
                options:[],
                options2:[],
                value: '',
                auto:1,
                dataIndo:{},
                applyIn:[],
                paramdata:[],
                selectedOptions: [],
                warehouseInfo:[],
                form: {
                    yhId: localStorage.getItem('yhId'),
                    ckId: '',
                    hgId: '',
                    spId: '',
//                    delivery: true,
//                    type: ['步步高'],
                    remark: ''
                }
            }
        },
        created(){
//             var datainfo=[];
//             this.$ajax(
//                 {
//                     method: 'get', //请求方式
//                     url: 'http://10.103.249.191:8080/list/ckIds',
//                     params:{
//                         page:1,
//                         size:9
//                     },
//                     headers:{"Authorization":localStorage.getItem('token')},
//                 }).then((res)=>{
//                 this.options=res.data
// //                 datainfo=res.data.data.results;
// //
//         });
            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.249.191:8080/list/spIn',
                    params:{
                        page:1,
                        size:9
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                this.options2=res.data
//                 datainfo=res.data.data.results;
//
        });
        },
        methods: {
            choseGood(val){
                console.log('choseGood',val)
                localStorage.setItem('spId',val)
            },
            getHuogui(val){
                // debugger
                // console.log('getHuogui',val.target.value)
                this.$ajax(
                    {
                        method: 'get', //请求方式
                        url: 'http://10.103.249.191:8080/list/findSp',
                        params:{
                            spId:localStorage.getItem('spId'),
                            count:val.target.value
                        },
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                 this.options=res.data;
                 datainfo=res.data.data.results;
            });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleChange(value) {
                this.obj={};
                this.obj.ckId=value[0];
                this.obj.hgId=value[1];
                console.log(this.obj);
            },
            auto(){
                alert('0000',this.auto)
                this.auto=0;
            },
            sure(){
                const extra={
                    yhId:this.dataIndo.yhId,
                    spId:this.dataIndo.spId,
                    remark:this.dataIndo.remark
                }
                const newarr=[]
                this.applyIn.forEach(function(element) {
                    const newitem=Object.assign({},element,extra)
                    newarr.push(newitem)

                });
                console.log(' this.applyIn', newarr)
                this.$ajax(
                    {
                        method: 'POST', //请求方式
                        url: 'http://10.103.249.191:8080/warehouseOutApply/scheduling',
                        data:newarr,
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    console.log('一键确认',res)
                this.$router.push('/outApplyList');
            });
            },
            onSubmit() {
                // let spObj={}
                if(this.auto){
                    this.spObj.spId=this.value;
                    let data=Object.assign({},this.form,this.obj,this.spObj);
                    this.$ajax(
                        {
                            method: 'post', //请求方式
                            url: 'http://10.103.249.191:8080/warehouseOutApply',
                            data:data,
                            headers:{"Authorization":localStorage.getItem('token')},
                        }).then((res)=>{
                    });
                    this.$message.success('提交成功！');
                    this.$router.push('/outApplyList');
                }else{
                    console.log('zidong',this.form,this.obj,this.spObj)
                    this.spObj.spId=this.value;
                    let data=Object.assign({},this.form,this.obj,this.spObj);
                    this.dataIndo=data;
                    console.log('ttt',data)
                    this.$ajax(
                        {
                            method: 'get', //请求方式
                            url: 'http://10.103.249.191:8080/scheduling/Out',
                            params:{
                                applyCount:data.applyCount,
                                spId:data.spId
                            },
                            headers:{"Authorization":localStorage.getItem('token')},
                        }).then((res)=>{
                        this.applyIn=res.data;
                    console.log('查看自动分配结果',this.applyIn,res.data)
                });
                    this.$message.success('提交成功,查看自动分配结果！');
                    this.display=0
                    // this.$router.push('/outApplyConfirm');
                }

            }
        }
    }
</script>
