<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>分类盘点信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>分类查询信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-form ref="form2" :model="form2" label-width="80px" style="display: inline-block;">
                <el-cascader
                    :options="options"
                    v-model="selectedOptions"
                    placeholder="选择仓库和商品"
                    @change="handleChange">
                </el-cascader>
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
                <el-button type="primary" icon="search" @click="search">查询</el-button>
                <el-button>取消</el-button>
            </el-form>
            <!--<el-input v-model="select_word" placeholder="筛选关键词" style="width:150px"></el-input>-->
            <div style="display: inline-block;">
            </div>
            <!--<el-button type="primary"  @click="search">新增人员</el-button>-->
        </div>
        <el-table
            :data="tableData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
        >
            <!--<el-table-column-->
            <!--prop="serviceId"-->
            <!--label="服务编号"-->
            <!--sortable-->
            <!--width="100">-->
            <!--<template slot-scope="scope">-->
            <!--<i class="el-icon-time"></i>-->
            <!--<span style="margin-left: 10px">{{ scope.row.serviceId }}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
                prop="name"
                label="服务名称"
                sortable
                width="120">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>名称: {{ scope.row.name }}</p>
                        <p>编号: {{ scope.row.serviceId }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="category"
                label="服务类型"
                width="100">
            </el-table-column>
            <el-table-column
                prop="description"
                label="服务描述"
                width="120">
            </el-table-column>
            <el-table-column
                prop="url"
                label="URL"
                width="160">
            </el-table-column>
            <el-table-column
                prop="cost"
                label="费用"
                width="150">
            </el-table-column>
            <el-table-column label="操作" >
                <template scope="scope">
                    <el-button size="small"
                               @click="handleDetail(scope.$index, scope.row)">查看详情</el-button>
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)" class="el-icon-edit">编辑</el-button>
                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.$index,scope.row)" class="el-icon-delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData:[],
                value6:'',
                value7:'',
                form2:{},
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]
                    }]
                }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                            value: 'layout',
                            label: 'Layout 布局'
                        }, {
                            value: 'color',
                            label: 'Color 色彩'
                        }, {
                            value: 'typography',
                            label: 'Typography 字体'
                        }, {
                            value: 'icon',
                            label: 'Icon 图标'
                        }, {
                            value: 'button',
                            label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                            value: 'radio',
                            label: 'Radio 单选框'
                        }, {
                            value: 'checkbox',
                            label: 'Checkbox 多选框'
                        }, {
                            value: 'input',
                            label: 'Input 输入框'
                        }, {
                            value: 'input-number',
                            label: 'InputNumber 计数器'
                        }, {
                            value: 'select',
                            label: 'Select 选择器'
                        }, {
                            value: 'cascader',
                            label: 'Cascader 级联选择器'
                        }, {
                            value: 'switch',
                            label: 'Switch 开关'
                        }, {
                            value: 'slider',
                            label: 'Slider 滑块'
                        }, {
                            value: 'time-picker',
                            label: 'TimePicker 时间选择器'
                        }, {
                            value: 'date-picker',
                            label: 'DatePicker 日期选择器'
                        }, {
                            value: 'datetime-picker',
                            label: 'DateTimePicker 日期时间选择器'
                        }, {
                            value: 'upload',
                            label: 'Upload 上传'
                        }, {
                            value: 'rate',
                            label: 'Rate 评分'
                        }, {
                            value: 'form',
                            label: 'Form 表单'
                        }]
                    }, {
                        value: 'data',
                        label: 'Data',
                        children: [{
                            value: 'table',
                            label: 'Table 表格'
                        }, {
                            value: 'tag',
                            label: 'Tag 标签'
                        }, {
                            value: 'progress',
                            label: 'Progress 进度条'
                        }, {
                            value: 'tree',
                            label: 'Tree 树形控件'
                        }, {
                            value: 'pagination',
                            label: 'Pagination 分页'
                        }, {
                            value: 'badge',
                            label: 'Badge 标记'
                        }]
                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                            value: 'alert',
                            label: 'Alert 警告'
                        }, {
                            value: 'loading',
                            label: 'Loading 加载'
                        }, {
                            value: 'message',
                            label: 'Message 消息提示'
                        }, {
                            value: 'message-box',
                            label: 'MessageBox 弹框'
                        }, {
                            value: 'notification',
                            label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                            value: 'menu',
                            label: 'NavMenu 导航菜单'
                        }, {
                            value: 'tabs',
                            label: 'Tabs 标签页'
                        }, {
                            value: 'breadcrumb',
                            label: 'Breadcrumb 面包屑'
                        }, {
                            value: 'dropdown',
                            label: 'Dropdown 下拉菜单'
                        }, {
                            value: 'steps',
                            label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                            value: 'dialog',
                            label: 'Dialog 对话框'
                        }, {
                            value: 'tooltip',
                            label: 'Tooltip 文字提示'
                        }, {
                            value: 'popover',
                            label: 'Popover 弹出框'
                        }, {
                            value: 'card',
                            label: 'Card 卡片'
                        }, {
                            value: 'carousel',
                            label: 'Carousel 走马灯'
                        }, {
                            value: 'collapse',
                            label: 'Collapse 折叠面板'
                        }]
                    }]
                }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }],
                selectedOptions: [],
                selectedOptions2: []
            };
        },
        methods: {
            handleChange(value) {
                console.log(value);
            },
            search(){
               let data=this.form2;
//             this.$ajax(
//                 {
//                     method: 'get', //请求方式
//                     url: 'http://10.103.243.94:8080/warehouseApply/page',
//                     params:{
//                         page:1,
//                         size:5,
//                         yhId:localStorage.getItem('yhId')
//                     },
//                     headers:{"Authorization":localStorage.getItem('token')},
//                 }).then((res)=>{
//                 this.tableData=[],
//                 this.tableData=res.data.data.results;
//             console.log('查询盘点',this.tableData3)
//         })
            }
        }
    };
</script>
