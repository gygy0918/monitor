<template>
    <el-row>
        <el-col :span="6" v-for="(o, index) in data" :key="o" :offset="index > 0 ? 0 : 0">
            <el-card :body-style="{ padding: '0px'}" class="csrd">
                <img src="../../../assets/0.jpg" class="image">
                <div style="padding: 14px;">
                    <span>{{o}}</span>
                    <div class="bottom clearfix">
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
                currentDate: new Date(),
                data:[1,2,3,4,5,6]
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
        width: 200px;
        height: 180px;
        margin-bottom: 20px;
    }
</style>
