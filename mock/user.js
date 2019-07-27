//token列表
const tokens = {
    admin : {
        token : 'admin-token',
    },
    editor: {
        token: 'editor-token'
    }
}

//用户列表
const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: '管理员ykx'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: '逗比潇洒'
    }
}


exports.user = [
        {
            url : '/user/login',
            type : 'post',
            response : config => {
                const {username} = config.body;
                const token = tokens[username];

                if(!token){
                    return {
                        code : 60204,
                        message : '用户名或密码错误'
                    }
                }
                return {
                    code : 20000,
                    data : token
                }
            }
        },
        {
            url : '/user/info',
            type : 'get',
            response : config => {
                const {token} = config.query;
                const info = users[token];
                if(!info){
                    return {
                        code : 500008,
                        message : '登录失败,无法获取用户信息'
                    }
                }

                return {
                    code : 20000,
                    data : {info}
                }
            }
        },
        {
            url : '/user/logOut',//这里不要写为login开头  会被第一个拦截
            type : 'post',
            response : config => {
                //未添加清除操作
                return {
                    code: 20000,
                    data: 'success'
                }
            }
        }
    ]
