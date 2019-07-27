/**
 * Created by 86159 on 2019/7/27.
 */

import Vue from 'vue'
import SvgIcon from '../components/SvgIcon'// svg component
//注册全局组件Svgicon
    Vue.component('svg-icon',SvgIcon)
//参照https://www.jianshu.com/p/550ab0dafd91

const req = require.context('./svg', false, /\.svg$/);

const requireAll =requireContext => {
    console.log(requireContext,requireContext.keys());
    return requireContext.keys().map(requireContext);
}


requireAll(req);//引入所有svg