<template>
    <el-color-picker
            v-model="theme"
            :predefine="preColors"
            class="theme-picker"
            popper-class="theme-picker-dropdown"
    ></el-color-picker>
</template>

<script>
//    import {mapState} from 'vuex'
const version = require('element-ui/package.json').version
    const ORIGINAL_THEME = '#409EFF' // default color
    export default {
        name: "ThemePicker",
        data(){
            return {
                chalk : '', //包含注意css内容字符串
                color1 : '#409EFF',
                preColors : ['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d']
            }
        },
        computed : {
            theme : {
                get : function () {
                    return this.$store.state.settings.theme;
                },
                set : async function (val) {
                    debugger;
                    const oldTheme = this.chalk ? this.theme : ORIGINAL_THEME;
                    if(typeof val !== 'string'){return}
                    const themeCluster = this.getThemeCluster(val.replace('#',''));
                    const originalCluster = this.getThemeCluster(oldTheme.replace('#',''));


                    const $message = this.$message({
                        message : '主题编译中...',
                        type : 'success',
                        duration: 0,
                        iconClass: 'el-icon-loading'
                    });

                    if(!this.chalk){
                        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;//获取主题css地址
                        await this.getCSSString(url,'chalk');
                    }
                    const getHandler = (variable,id) => {
                        return () => {
                            const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#',''));//??

                            const newStyle = this.updateStyle(this[variable],originalCluster,themeCluster)

                            let styleTag = document.getElementById(id);
                            if(!styleTag){//构建新的style
                                styleTag = document.createElement('style');
                                styleTag.setAttribute('id',id);
                                document.head.appendChild(styleTag);
                            }
                            styleTag.innerText = newStyle;//元素添加完毕才修改
                        }
                    }
                    const chalkHandler = getHandler('chalk','chalk-style');
                    chalkHandler();

                    //如果style已经存在

                    const styles = [].slice.call(document.querySelectorAll('style'))  //类数组 => 数组操作
                        .filter(style => {
                            const text = style.innerTtext;
                            return new RegExp(oldTheme, 'i').test(text) && !/Chalk Variables/.test(text); //筛选出不包含Chalk Variables且含有 老主题值得style标签                         })
                        })
                    styles.forEach(style => {
                        const {innerText} = style;
                        if(typeof  innerText !== 'string'){return}

                        style.innerText = this.updateStyle(innerText,originalCluster,themeCluster);//更新操作
                    })
                    //更新store
                    this.$store.commit('settings/CHANGE_SETTING',{
                        key : 'theme',
                        value : val
                    });
                    $message.close()
                }
            }
        },
       methods : {
           getThemeCluster(theme){
               const clusters = [theme];

               const tintColor = (color,tint) => {
                   //转为16进制整数
                   let red = parseInt(color.slice(0,2),16);
                   let green = parseInt(color.slice(2,4),16);
                   let blue = parseInt(color.slice(4,6),16);


                   if(tint === 0){
                       return [red,green,blue].join(',');
                   }else{
                       red += Math.round(tint * (255 - red));
                       green += Math.round(tint * (255 - green));
                       blue += Math.round(tint * (255 - blue));



                       red = red.toString(16);
                       green = green.toString(16);
                       blue = blue.toString(16);
                        return `#${red}${green}${blue}`
                   }


               }

               const shadeColor = (color,shade) => {
                   let red = parseInt(color.slice(0,2),16);
                   let green = parseInt(color.slice(2,4),16);
                   let blue = parseInt(color.slice(4,6),16);

                   red = Math.round((1 - shade) * red)
                   green = Math.round((1 - shade) * green)
                   blue = Math.round((1 - shade) * blue)

                   red = red.toString(16);
                   green = green.toString(16);
                   blue = blue.toString(16);
                   return `#${red}${green}${blue}`


               }
               for(let i = 0;i <= 9;i++){
                   clusters.push(tintColor(theme,Number((i / 10).toFixed(2))));
               }
               clusters.push(shadeColor(theme,0.1));
               return clusters;
           },
           getCSSString(url,variable){
               return new Promise((resolve,reject) => {
                   const xhr = new XMLHttpRequest();
                   xhr.onreadystatechange = () => {
                       if(xhr.readyState === 4 && xhr.status === 200){
                           //[^xyz] 不匹配这个集合中的任何一个字符   ,  + 匹配前一项1次或多次,等价于{1,}  这里过滤形如：@font-face{adxxx} 类型

                           this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/,'');
                           resolve();
                       }
                   }
                   xhr.open('GET', url)
                   xhr.send();
               })
           },
           //替换更新css innerText
           updateStyle(style,oldCluster, newCluster){
               let newStyle = style;
               oldCluster.forEach((color,index) => {
                   newStyle = newStyle.replace(new RegExp(color,'ig'),newCluster[index])
               })

               return newStyle;
           }
       }
    }
</script>
<style lang="scss">
    .theme-picker-dropdown{
        z-index:99999 !important;
    }
    //修改触发器大小
    .theme-picker.el-color-picker{
        height:26px;
        line-height: 26px;
    }
    .theme-picker .el-color-picker__trigger {
        height: 26px !important;
        width: 26px !important;
        padding: 2px;
    }
</style>
<style scoped>

</style>