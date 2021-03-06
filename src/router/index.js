import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
        children:[
    {
        path: '/',
        component: resolve => require(['../components/page/Readme.vue'], resolve)
},
{
    path: '/modifiedPassword',
        component: resolve => require(['../components/page/permission/modifiedPassword.vue'], resolve)
},
{
    path: '/personList',
        component: resolve => require(['../components/page/person/PersonList.vue'], resolve)
},
{
    path: '/PersonalInfo',
        component: resolve => require(['../components/page/person/PersonalInfo.vue'], resolve)     // vue-datasource组件
},
{
    path: '/repaireInfo',
        component: resolve => require(['../components/page/repaire/repaireinfo.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/repaireLog',
        component: resolve => require(['../components/page/repaire/repaireLog.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/repairePerson',
        component: resolve => require(['../components/page/repaire/repairePerson.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/addWarehouse',
        component: resolve => require(['../components/page/warehouse/add2.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/addWarehouse2',
        component: resolve => require(['../components/page/warehouse/searchAddWarehouse.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/pppp',
        component: resolve => require(['../components/page/warehouse/pppp.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/nearbyWarehouse',
        component: resolve => require(['../components/page/warehouse/nearbyWarehouse.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/filterMap',
        component: resolve => require(['../components/page/warehouse/filterMap.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/innerMonitor',
        component: resolve => require(['../components/page/monitor/innerMonitor.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/innerMap',
        component: resolve => require(['../components/page/monitor/innerMap.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/controlLamp',
    component: resolve => require(['../components/page/monitor/controlLamp.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/newWarehouse',
        component: resolve => require(['../components/page/warehouse/newWarehouse.vue'], resolve)
},
{
    path: '/checkApply',
        component: resolve => require(['../components/page/warehouse/checkApply.vue'], resolve)
},
{
    path: '/personnalCheckApply',
        component: resolve => require(['../components/page/warehouse/personnalCheckApply.vue'], resolve)
},
{
    path: '/maprouter',
        component: resolve => require(['../components/page/warehouse/mapRouter.vue'], resolve)
},
{
    path: '/WarehouseList',
        component: resolve => require(['../components/page/warehouse/WarehouseList.vue'], resolve)    // Vue-Quill-Editor组件
},
{
    path: '/inWarehousesList',
        component: resolve => require(['../components/page/warehouse/inWarehousesList.vue'], resolve)    // Vue-Quill-Editor组件
},
{
    path: '/echarts',
        component: resolve => require(['../components/page/warehouse/echarts.vue'], resolve)    // Vue-Quill-Editor组件
},
{
    path: '/findHuogui',
        component: resolve => require(['../components/page/warehouse/findHuogui.vue'], resolve)    // Vue-Quill-Editor组件
},
{
    path: '/kucun',
        component: resolve => require(['../components/page/warehouse/kuncun.vue'], resolve)    // Vue-Quill-Editor组件
},
{
    path: '/checkOut',
        component: resolve => require(['../components/page/warehouse/checkOut.vue'], resolve)     // Vue-Quill-Editor组件
},
{
    path: '/WarehouseList',
        component: resolve => require(['../components/page/warehouse/WarehouseList.vue'], resolve)    // Vue-Quill-Editor组件
},
{
    path: '/testGood',
        component: resolve => require(['../components/page/warehouse/testGood.vue'], resolve)     // Vue-Quill-Editor组件
},
{
    path: '/singleHK',
        component: resolve => require(['../components/page/warehouse/singleHK.vue'], resolve)     // Vue-Quill-Editor组件
},
{
    path: '/outApply',
        component: resolve => require(['../components/page/warehouse/outApply.vue'], resolve)       // Vue-Core-Image-Upload组件
},
{
    path: '/outApplyList',
    component: resolve => require(['../components/page/warehouse/outApplyList.vue'], resolve)       // Vue-Core-Image-Upload组件
},
{
    path: '/outWarehousesList',
        component: resolve => require(['../components/page/warehouse/outWarehousesList.vue'], resolve)       // Vue-Core-Image-Upload组件
},
{
    path: '/websocket',
        component: resolve => require(['../components/page/monitor/websocket.vue'], resolve)       // Vue-Core-Image-Upload组件
},
{
    path: '/basecharts',
        component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
},
{
    path: '/test',
        component: resolve => require(['../components/page/warehouse/test.vue'], resolve)   // vue-schart组件
},
{
    path: '/personnalOutApply',
        component: resolve => require(['../components/page/warehouse/personnalOutApply.vue'], resolve)   // vue-schart组件
},
{
    path: '/testcharts',
        component: resolve => require(['../components/page/warehouse/testPoits.vue'], resolve)   // vue-schart组件
},
{
    path: '/testpictures',
        component: resolve => require(['../components/page/warehouse/testPictures.vue'], resolve)   // vue-schart组件
},
{
    path: '/test',
        component: resolve => require(['../components/page/test.vue'], resolve)   // vue-schart组件
},
{
    path: '/rode',
        component: resolve => require(['../components/page/rode.vue'], resolve)   // vue-schart组件
},
{
    path: '/huoguiList',
        component: resolve => require(['../components/page/huogui/huoguiList.vue'], resolve)   // vue-schart组件
},
{
    path: '/commodity',
        component: resolve => require(['../components/page/commodity/commodity.vue'], resolve)   // vue-schart组件
},
{
    path: '/commodityTotal',
        component: resolve => require(['../components/page/commodity/commodityTotal.vue'], resolve)   // vue-schart组件
},
{
    path: '/addCommodity',
        component: resolve => require(['../components/page/commodity/addCommodity.vue'], resolve)   // vue-schart组件
},
{
    path: '/lockers',
        component: resolve => require(['../components/page/commodity/lockers.vue'], resolve)   // vue-schart组件
},
{
    path: '/link',
        component: resolve => require(['../components/page/warehouse/link.vue'], resolve)   // vue-schart组件
},
{
    path: '/check',
        component: resolve => require(['../components/page/warehouse/check.vue'], resolve)   // vue-schart组件
},
{
    path: '/detailsCheck',
        component: resolve => require(['../components/page/warehouse/detailsCheck.vue'], resolve)   // vue-schart组件
},
{
    path: '/lockerDetails',
        component: resolve => require(['../components/page/commodity/lockerDetails.vue'], resolve)   // vue-schart组件
},
{
    path: '/loginLog',
        component: resolve => require(['../components/page/log/loginLog.vue'], resolve)   // vue-schart组件
},
{
    path: '/operationLog',
        component: resolve => require(['../components/page/log/operationLog.vue'], resolve)   // vue-schart组件
},
{
    path: '/drag',
        component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/role',
        component: resolve => require(['../components/page/permission/role.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/permission',
        component: resolve => require(['../components/page/permission/permission.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/lamp',
        component: resolve => require(['../components/page/monitor/lamp.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/shezhi',
        component: resolve => require(['../components/page/monitor/shezhi.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/serviceList',
        component: resolve => require(['../components/page/serviceManger/serviceList.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/QOSlist',
        component: resolve => require(['../components/page/serviceManger/QOSlist.vue'], resolve)    // 拖拽列表组件
},
{
    path: '/searchtest',
        component: resolve => require(['../components/page/serviceManger/test.vue'], resolve)    // 拖拽列表组件
}
]
},
{
    path: '/login',
        component: resolve => require(['../components/page/login/Login.vue'], resolve)
},

]
})
