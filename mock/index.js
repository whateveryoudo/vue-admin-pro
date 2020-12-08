// import Mock from 'mockjs'
// import user from './user'

const Mock = require("mockjs")
const user = require("./user.js")
const file = require("./file.js")
const application = require("./application.js")

const mocks = [
  ...user,
  ...file,
  ...application
]

const responseFake = (url, type, respond, useSelfReturn = false) => {
  return {
    url: new RegExp(`/mock${url}`),
    type: type || "get",
    response (req, res) {
      useSelfReturn ? respond(req, res)
        : res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

module.exports = {
  mocks: mocks.map(route => {
    return responseFake(route.url, route.type, route.response, route.useSelfReturn);
  })
}
