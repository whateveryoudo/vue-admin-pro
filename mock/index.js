// import Mock from 'mockjs'
// import user from './user'

const Mock = require("mockjs")
const user = require("./user.js")
const application = require("./application.js")

const mocks = [
  ...user,
  ...application
]

const responseFake = (url, type, respond, isFile) => {
  return {
    url: new RegExp(`/mock${url}`),
    type: type || "get",
    response (req, res) {
      if (isFile) {
        res.send(Mock.mock(respond instanceof Function ? respond(req, res) : respond));
      } else {
        res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
      }
    }
  }
}

// export default mocks.map(route => {
//   return responseFake(route.url,route.type,route.response);
// })

module.exports = {
  mocks: mocks.map(route => {
    return responseFake(route.url, route.type, route.response, route.isFile);
  })
}
