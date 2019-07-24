const tokens = {
    admin : {
        token : 'admin-token',
    },
    editor: {
        token: 'editor-token'
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
                    data : {token}
                }
            }
        }
    ]
