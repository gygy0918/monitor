<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>仓库列表管理</el-breadcrumb-item>
                <el-breadcrumb-item>仓库列表信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <!--<el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">-->
                <!--<el-option key="1" label="广东省" value="广东省"></el-option>-->
                <!--<el-option key="2" label="湖南省" value="湖南省"></el-option>-->
            <!--</el-select>-->
            <el-form ref="form2" :model="form2" label-width="80px" style="display: inline-block;">
                <el-form-item label="仓库名称" style="display: inline-block;width: 200px">
                    <el-input v-model="form2.name" placeholder="筛选关键词"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" style="display: inline-block;width: 150px">
                    <el-select v-model="form2.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择日期" style="display: inline-block;width: 500px">
                        <el-date-picker
                            v-model="value7"
                            type="date"
                            placeholder="开始日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                        <!--<el-col class="line" :span="2">-</el-col>-->
                        <el-date-picker
                            v-model="value6"
                            type="date"
                            placeholder="选结束日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>


                </el-form-item>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                    <el-button>取消</el-button>
            </el-form>
            <!--<el-input v-model="select_word" placeholder="筛选关键词" style="width:150px"></el-input>-->
            <div style="display: inline-block;">
                <el-button type="primary" round @click="addInwarehouse" >申请入库</el-button>
            </div>

            <!--<el-button type="primary"  @click="search">新增人员</el-button>-->
        </div>
        <el-table :data="warehouseInfo" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <!--<el-table-column prop="date" label="日期" sortable width="150">-->
            <!--</el-table-column>-->
            <el-table-column prop="ckId" label="仓库标号" width="120">
            </el-table-column>
            <el-table-column prop="name" label="仓库名称" width="120">
            </el-table-column>
            <el-table-column prop="ckAddress" label="位置" width="120">
            </el-table-column>
            <el-table-column prop="count" label="货柜总数" width="120">
            </el-table-column>
            <el-table-column prop="ckAttribute" label="属性" width="120">
            </el-table-column>
            <el-table-column prop="ckStatus" label="状态" width="120">
            </el-table-column>
            <!--<el-table-column prop="address" label="地址" :formatter="formatter">-->
            <!--</el-table-column>-->
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                    @click="handleEdit(scope.$index, scope.row)">编辑修改</el-button>
                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change ="handleCurrentChange"
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
        <el-dialog title="更新仓库信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="仓库编号" :label-width="formLabelWidth">
                    <el-input v-model="form.ckId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="仓库名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="位置" :label-width="formLabelWidth">
                    <el-input v-model="form.ckAddress" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="货柜总数" :label-width="formLabelWidth">
                    <el-input v-model="form.count" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="属性" :label-width="formLabelWidth">
                    <el-input v-model="form.ckAttribute" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-input v-model="form.ckStatus" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="活动区域" :label-width="formLabelWidth">-->
                    <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
                        <!--<el-option label="区域一" value="shanghai"></el-option>-->
                        <!--<el-option label="区域二" value="beijing"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUpdataWarehouse('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                warehouseInfo: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                dialogFormVisible:false,
                form2:{},
                form: {
                    ckId:'',
                    ckName: '',
                    ckLocation:'',
                    ckAttribute: '',
                    ckHgCount: '',
                    ckStatus: ''
                },
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value6: '',
                value7: '',
                formLabelWidth: '120px'
            }
        },
        created(){
//            this.getData();

            this.$ajax(
                {
                    method: 'get', //请求方式
                    url: 'http://10.103.243.94:8080/warehouse/page',
                    params:{
                        page:1,
                        size:15
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then((res)=>{
                this.warehouseInfo=[],
                    this.warehouseInfo=res.data.data.results;
                console.log('结果仓库',this.warehouseInfo)
            })

        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(d){
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if(d.name === self.del_list[i].name){
                            is_del = true;
                            break;
                        }
                    }
                    if(!is_del){
                        if(d.address.indexOf(self.select_cate) > -1 &&
                            (d.name.indexOf(self.select_word) > -1 ||
                                d.address.indexOf(self.select_word) > -1)
                        ){
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            addInwarehouse(){
                this.$router.push('/newwarehouse');
            },
            getTimeDuration(input) {
                let ret = [];
                //你的实现
                input.map((item)=>{
                    let index=item.indexOf(' ')
                    console.log('77777777',index)
                let date=item.substring(0,index+1)
                let time=item.substring(index+1)
                let subDate=[];
                let subTime=[];
                var curDtae;
                // subTime.push(time)
                //     if(subDate.indexOf(data)==-1){
                //     // data.concat()
                //         subDate.push(date)
                //         curDtae=data;
                //     }else{
                //     let mintime=Math.min(...subTime)
                //     let maxtime=Math.max(...subTime)
                //     let startTime=curDtae.concat(mintime)
                //     let endTime=curDtae.concat(maxtime)
                //         ret.push(startTime)
                //         ret.push(endTime)
                //     }


                    // console.log('222222',date,'3333',time)
                })
                return ret;
                console.log('99',ret)
            },

    // let out = getTimeDuration(input);
    // console.log(out);
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                if(process.env.NODE_ENV === 'development'){
                    self.url = '/ms/table/list';
                };
                self.$axios.post(self.url, {page:self.cur_page}).then((res) => {
                    self.tableData = res.data.list;
                })
            },
            search(){
                // this.is_search = true;
                // console.log('000',this.form2,this.value7.toLocaleDateString(),this.value6.toLocaleDateString())
                this.form2.startTime=this.value7.toLocaleDateString()
                this.form2.endTime=this.value6.toLocaleDateString()
                console.log('1111111111',this.form2)
                // http://10.103.243.94:8080/warehouse/pageByTime?page=1&start=2017/3/29&size=5&end=2018/4/3
                    this.$ajax(
                        {
                            method: 'get', //请求方式
                            url: 'http://10.103.243.94:8080/warehouse/pageByTime',
                            params:{
                                page:1,
                                size:5,
                                start:this.form2.startTime,
                                end:this.form2.endTime
                            },
                            headers:{"Authorization":localStorage.getItem('token')},
                        }).then((res)=>{
                        this.warehouseInfo=[],
                        this.warehouseInfo=res.data.content;
                console.log('日期查询仓库',res.data)
            })
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
           this.dialogFormVisible = true;
//                this.$message('编辑第'+(index+1)+'行');
                this.form=row;
            },
            submitUpdataWarehouse(form){
                let data=Object.assign({},this.form);
                console.log('编辑提交信息',data)
                this.$ajax(
                    {
                        method: 'put', //请求方式
                        url: 'http://10.103.243.94:8080/warehouse',
                        data:data,
                        headers:{"Authorization":localStorage.getItem('token')},
                    }).then((res)=>{
                    this.warehouseInfo=[],
                        this.warehouseInfo=res.data.data.results;
                    console.log('结果',this.warehouseInfo)
                });
                this.dialogFormVisible = false;
            },
            handleDelete (index, row) {
                this.warehouseInfo.splice(index, 1);
                console.log('ddddd',row.ckId)
                let ckId=row.ckId;
                this.$ajax({
                    method: 'delete', //请求方式
                    url: 'http://10.103.243.94:8080/warehouse',
                    params:{
                        ckId
                    },
                    headers:{"Authorization":localStorage.getItem('token')},
                }).then(
                    (res) => {
                        console.log('删除仓库测试',res);
                    });
                this.$message({
                    message: "操作成功！",
                    type: 'success'
                });
            },
//            handleDelete(index, row) {
//                this.$message.error('删除第'+(index+1)+'行');
//            },
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
    .handle-box{
        margin-bottom: 20px;
    }
    .handle-select{
        width: 120px;
    }
    .handle-input{
        width: 300px;
        display: inline-block;
    }
</style>
