<template>
    <!--动态组件写法-->
    <component v-bind="linkProps(to)">
        <slot></slot>
    </component>
</template>

<script>
    import { isExternal } from '@/utils/validate'
    export default {
        name: "Link",
        props : {
            to:String,
            required : true
        },
        methods : {
            //根据不同url返回不同组件
            linkProps(url){
                if(isExternal(url)){
                    return {
                        is : 'a',
                        href : url,
                        target : '_blank'
                    }
                }

                return {
                    is : 'router-link',
                    to : url
                }
            }
        }
    }
</script>

<style scoped>

</style>