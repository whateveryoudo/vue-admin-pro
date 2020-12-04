
const multiparty = require("multiparty")
const path = require("path")

const fs = require("fs")

module.exports = [
  {
    url: "/file-api/upload",
    type: "post",
    response: (req) => {
      const form = new multiparty.Form();
      // 设置编码
      form.encoding = "utf-8";
      form.uploadDir = path.resolve(__dirname, "./source");
      return form.parse(req, function (_, fields, files) {
        try {
          // const inputFile = files.file[0];
          // const newPath = path.join(__dirname, "/source/" + inputFile.originalFilename);
          // oldPath  不得作更改，使用默认上传路径就好
          // fs.renameSync(inputFile.path, newPath);
          return {
            code: 20000,
            data: { url: form.uploadDir },
            message: "上传成功！"
          }
        } catch (err) {
          return {
            code: 20001,
            data: {},
            message: "上传失败！"
          }
        };
      })
    }
  }
]
