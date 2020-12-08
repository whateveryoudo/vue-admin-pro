
const multiparty = require("multiparty")
const path = require("path");
const fs = require("fs")

module.exports = [
  {
    url: "/file-api/upload",
    type: "post",
    useSelfReturn: true,
    response: (req, res) => {
      const form = new multiparty.Form();
      // 设置编码
      form.encoding = "utf-8";
      form.uploadDir = path.resolve(__dirname, "./source");
      form.parse(req, function (_, fields, files) {
        try {
          const inputFile = files.file[0];
          const dstPath = form.uploadDir + "\\" + inputFile.originalFilename;
          // 重命名为真实文件名
          fs.rename(inputFile.path, dstPath, function (err) {
            if (err) {
              res.json({
                code: 20001,
                data: {},
                message: "上传失败！"
              })
            } else {
              res.json({
                code: 20000,
                data: { url: dstPath },
                message: "上传成功！"
              })
            }
          })
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
