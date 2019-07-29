// 标签module
import {getStore,setStore} from '@/utils'



const state = {
    tabs : getStore('userTabs') || [],  //存入标签对象
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
                name : index + 1 + ''
            }
        })
        state.tabs = sortedTabs;
    },

    REMOVE_TAB(state,value){
        debugger;
        const {tabs} = state;
        const tempTabs = [...tabs];
        const index = Number(value) - 1;
        const targetIndex = Number(state.activeIndex);
        let nextActiveIndex = 0;
        if(tempTabs.length > 1 && index === tempTabs.length - 1){
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
                name : index + 1 + ''
            }
        })
        state.activeIndex = nextActiveIndex;
        state.tabs = sortedTabs;
    }

}
export default {
    namespaced : true,
    state,
    getters,
    mutations
}