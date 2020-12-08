// token列表
const tokens = {
  admin: "admin-token",
  editor: "editor-token"
}

// 用户列表
const users = {
  "admin-token": {
    introduction: "I am a super administrator",
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "管理员ykx"
  },
  "editor-token": {
    introduction: "I am an editor",
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "逗比潇洒"
  }
}

module.exports = [
  {
    url: "/user-api/login",
    type: "post",
    response: config => {
      console.log(111);
      const { username } = config.body;
      const token = tokens[username];
      const userInfo = users[token];
      if (!token) {
        return {
          code: 60204,
          message: "用户名或密码错误"
        }
      }
      return {
        code: 20000,
        data: { token, userInfo }
      }
    }
  },
  {
    url: "/user/logOut", // 这里不要写为login开头  会被第一个拦截
    type: "post",
    response: () => {
      // 未添加清除操作
      return {
        code: 20000,
        data: "success"
      }
    }
  }
]
