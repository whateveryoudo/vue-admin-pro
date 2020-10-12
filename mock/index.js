// import Mock from 'mockjs'
// import user from './user'

const Mock = require('mockjs')
const user = require('./user.js')
const file = require('./file.js')



const mocks = [
  ...user,
  ...file
]


const responseFake = (url, type, respond, isFile) => {
  return {
    url : new RegExp(`/mock${url}`),
      type: type || 'get',
      response(req,res){
        if (isFile) {
          res.send(Mock.mock(respond instanceof Function ? respond(req,res) : respond));
        } else {
          res.json(Mock.mock(respond instanceof Function ? respond(req,res) : respond))
        }
      }
  }
}

// export default mocks.map(route => {
//   return responseFake(route.url,route.type,route.response);
// })

module.exports = {
    mocks : mocks.map(route => {
        return responseFake(route.url,route.type,route.response, route.isFile);
    })
}