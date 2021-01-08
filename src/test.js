
const data = require("./json.js").data;
// function setVal () {
//   data.push("111");
// }
function getVal () {
  console.log(data);
}
// setVal();
setTimeout(function () {
  getVal();
}, 2000)
