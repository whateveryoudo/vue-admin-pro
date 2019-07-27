<template>
    <div class="nav-right-content">
        <el-dropdown class="user-actions">
            <div class="action-trigger">
                <img :src="info.avatar" class="avatar" alt="">
                <span class="user-name">{{info.name}}</span>
            </div>
            <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-user">
                    个人中心
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-setting">
                    个人设置
                </el-dropdown-item>
                <el-dropdown-item divided>
                    <span style="display:block;" @click="logout">退出登录</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    export default {
        name: "NavRight",
        computed : {
            ...mapState('user',['info'])
        },
        methods : {
            ...mapActions('user',['loginOut']),
            logout(){
                this.$confirm('是否退出登录？', '系统提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await this.loginOut();
                    this.$router.push(`/login?redirect=${this.$route.fullPath}`);
                }).catch(() => {

                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .nav-right-content{
        float: right;
        .user-actions{
            margin-right: 10px;
            .action-trigger{
                cursor: pointer;
            }
        }
        .avatar{
            width:40px;
            height:40px;
            border-radius: 50%;
            vertical-align: middle;
            margin:0 15px;
        }
    }
</style>