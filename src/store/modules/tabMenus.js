// 标签module
import {getStore,setStore} from '@/utils'



const state = {
    tabs : getStore('userTabs') || [],  //存入标签对象
    cachedTabs : [],//缓存组件（注意这里未写到getter中,当刷新router 需要从 keepalive 的include中移除 不能依赖tabs计算）
    activeIndex : 0
    // tabs : [
    //     {title : '菜单1',path : '/',name : '1',icon : 'dashboard'},
    //     {title : '菜单2',path : '/main1',name : '2',icon : 'dashboard'}
    // ]  //存入标签对象
}
const getters = {
    activeTab : state => state.activeIndex + 1 + ''  //element tabs 得name作为对应 name 为 索引值+1
}
const mutations = {
    INIT_TABS(state,affixTabs){
        state.tabs = affixTabs;
    },
    ADD_TAB(state,route){
        let tempTabs = [...state.tabs];
        const {path,meta} = route;
        const targetIndex = tempTabs.findIndex(tab => tab.path === path);
        //构建单个tab
        let addTabObj = {
            title : meta.title,
            icon : meta.icon,
            path
        };
        if(targetIndex >= 0){//已经存在 修改选中位置
            state.activeIndex = targetIndex;
        }else{
            state.activeIndex = tempTabs.length === 0 ? 0 :  tempTabs.length;
            tempTabs.push(addTabObj)
        }
        //重新更新name序列
        const sortedTabs = tempTabs.map((item,index) => {
            return {
                ...item,
                tabName : index + 1 + ''
            }
        });
        state.tabs = sortedTabs;
        state.cachedTabs = sortedTabs.filter(tab => !tab.meta || !tab.meta.noCache);
    },

    CLOSE_TAB(state,value){
        const {tabs} = state;
        const tempTabs = [...tabs];
        const index = Number(value) - 1;
        const targetIndex = Number(state.activeIndex);
        let nextActiveIndex = targetIndex;

        if(index === tempTabs.length - 1 && index === targetIndex){//当前项为最后一项
            nextActiveIndex = tempTabs.length - 2;
        }else{
            if(index <= targetIndex){
                nextActiveIndex = targetIndex - 1;
            }
        }
        tempTabs.splice(index,1);
        //重新更新name序列
        const sortedTabs = tempTabs.map((item,index) => {
            return {
                ...item,
                tabName : index + 1 + ''
            }
        })
        state.activeIndex = nextActiveIndex;
        state.tabs = sortedTabs;
        state.cachedTabs = sortedTabs.filter(tab => !tab.meta || !tab.meta.noCache);
    },

    CLOSE_CACHED_TAB(state,value){
        const tempTabs = [...state.cachedTabs];
        tempTabs.splice(Number(value) - 1, 1);
        state.cachedTabs =  tempTabs;
    },
    CLOSE_OTHER_TABS(state,value){
        let resultTabs = [];
        resultTabs = [...state.tabs].filter(tab => {
            const {meta,tabName} = tab;
            return tabName !== value || (meta && meta.affix)
        })
        state.tabs = resultTabs;
        state.cachedTabs = resultTabs.filter(tab => !tab.meta || !tab.meta.noCache);
    },
    CLOSE_ALL_TABS(state){
        let resultTabs = [];
        resultTabs = [...state.tabs].filter(tab => {
            const {meta} = tab;
            return meta && meta.affix
        })
        state.activeIndex = 0;
        state.tabs = resultTabs;
        state.cachedTabs = resultTabs.filter(tab => !tab.meta || !tab.meta.noCache);
    },
    CLOSE_LEFT_TABS(state,value){
        let tempTabs = [...state.tabs];
        let resultTabs = tempTabs.slice(0,Number(value));
        resultTabs = resultTabs.filter(tab => {
            const {meta} = tab;
            return meta && meta.affix
        })
        state.activeIndex = Number(value) - 1;
        state.tabs = resultTabs;
        state.cachedTabs = resultTabs.filter(tab => !tab.meta || !tab.meta.noCache);
    },
    CLOSE_RIGHT_TABS(state,value){
        let tempTabs = [...state.tabs];
        let rightTabs = tempTabs.slice(Number(value));
        let resultTabs = tempTabs.filter(tab => {
            const {meta} = tab;
            return meta && meta.affix
        }).concat(rightTabs);
        state.activeIndex = Number(value) - 1;
        state.tabs = resultTabs;
        state.cachedTabs = resultTabs.filter(tab => !tab.meta || !tab.meta.noCache);
    }
}
export default {
    namespaced : true,
    state,
    getters,
    mutations
}