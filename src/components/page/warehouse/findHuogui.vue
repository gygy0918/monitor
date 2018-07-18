<template>
    <el-row>
        <el-col :span="3" v-for="(o, index) in data" :key="o" :offset="index > 0 ? 0 : 0">
            <el-card :body-style="{ padding: '0px'}" class="csrd">
                <img src="../../../assets/0.jpg" class="image" >
                <div style="padding: 14px;">
                    <span>{{o}}</span>
                    <div >
                        <time class="time">{{ currentDate }}</time>
                        <el-button type="text" class="button">打开货柜</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        data() {
            return {
                currentDate: new Date().getFullYear(),
                data:[1,2,3,4,5,6,7,8,8,9,1,2,1,2,3,4,5,2]
            };
        },
        name: "find-huogui"
    }
</script>

<style scoped>
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        height: 100px;
        display: block;
        /*box-shadow:3px 3px 8px #f00*/
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
    .csrd{
        width: 120px;
        height: 150px;
        margin-bottom: 20px;
        box-shadow:3px 3px 8px #242f42;
    }
    /*.liti{*/
        /*box-shadow:-2px 0px 8px #f00,0px -2px 8px #000,0px 2px 8px #9e038a,2px 0px 8px #0f0;*/
    /*}*/
</style>
