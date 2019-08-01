
<script>
    export default {
        created(){
            const {params : {path},query} = this.$route;
            this.$router.replace({path : `/` + path,query});//跳回原界面
        },
        render: function(h) {
            return h() // avoid warning message
        }
    }
</script>
