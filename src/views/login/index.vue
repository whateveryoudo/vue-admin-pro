<template>
    <div class="login-container" >

        <el-form ref="loginForm" class="login-form" :model="formObj" :rules="loginRules">
            <div class="title-container">
                <h3 class="title">vue-admin-pro</h3>
            </div>
            <el-form-item prop="username">
                <i class="icon el-icon-user"></i>
                <el-input
                        v-model="formObj.username"
                        placeholder="用户名：admin"/>
            </el-form-item>
            <el-form-item prop="password">
                <i class="icon el-icon-lock"></i>
                <el-input
                        v-model="formObj.password"
                        @keyup.enter.native="handleLogin"
                        placeholder="密码：any"/>
            </el-form-item>

            <el-button :loading="loading" class="submit-btn" type="primary" @click="handleLogin">
               登录
            </el-button>
        </el-form>
    </div>
</template>

<script>
    import {validUsername} from '@/utils/validate'
    import {mapState,mapActions} from 'vuex'
    const validateUsername = (rule,value,callback) => {
        if(!validUsername(value)){
            callback('请输入正确的用户名')
        }else{
            callback()
        }
    }
    const validatePassword = (rule,value,callback) => {
        if (value.length < 6) {
            callback('密码不能少于6个字符')
        }else{
            callback()
        }
    }
    export default {
        name : 'Login',
        data(){
            return {
                formObj : {
                    username : '',
                    password : ''
                },
                loading : false,
                loginRules : {
                    username : [
                        {required : true,validator : validateUsername}
                    ],
                    password : [
                        {required : true,validator : validatePassword}
                    ],
                }
            }
        },
        computed : {
            ...mapState('user',['name'])
        },
        methods : {
            ...mapActions('user',['login']),
             handleLogin(){
//                 this.$router.push('/');
                this.$refs.loginForm.validate(async valid => {
                    if(valid){
                        this.loading = true;
                        try {
                            const res = await this.login(this.formObj);
                            if(res.code === 20000){//TODO跳转主界面
                                this.loading = false;
                                this.$router.push('/');
                                const h = this.$createElement;//自定义node
                                this.$message({
                                    message: h('p', null, [
                                        h('i', { style: 'color: rgb(64, 158, 255);marginRight:5px' }, 'ykx,'),
                                        h('span', null, '欢迎回来 ')
                                    ]),
                                    type: 'success'
                                });
                            }

                        }catch (err){
                            this.loading = false;
                        }

                    }
                })
            }
        }
    }
</script>
<style lang="scss">
    .login-container{
        .el-form-item{
            position: relative;
        }
        .el-input{
            input{
                padding-left: 8%;
            }
        }
    }

</style>
<style lang="scss" scoped>
    .login-container{

        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: auto;
        background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
        background-repeat: no-repeat;
        background-position: center 110px;
        background-size: 100%;
        .title-container {
            position: relative;
            .title {
                font-size: 26px;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
        }
        .login-form{
            width:368px;
            margin: 0 auto;
            margin-top: 80px;
            .icon{
                color: rgba(0,0,0,.65);
                position: absolute;
                left: 10px;
                z-index:10;
                top:50%;
                transform: translateY(-50%);
            }
            .submit-btn{
                width: 100%;
            }
        }
    }

</style>

