
const multiparty = require("multiparty")
const path = require("path");
const fs = require("fs")
const uploadedFilePath = require("./db").uploadedFilePath

const deleteFolder = (path) => {
  let files = [];
  if (fs.existsSync(path)) {
    if (fs.statSync(path).isDirectory()) {
      files = fs.readdirSync(path);
      files.forEach(function (file) {
        const curPath = path + "/" + file;
        if (fs.statSync(curPath).isDirectory()) {
          deleteFolder(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      // fs.rmdirSync(path);
    }
    // else {
    //   fs.unlinkSync(path);
    // }
  }
}
module.exports = [
  {
    url: "/file-api/list",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: uploadedFilePath,
        message: "操作成功"
      }
    }
  },
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
              uploadedFilePath.push(dstPath);
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
  },
  {
    url: "/file-api/delete",
    type: "post",
    useSelfReturn: true,
    response: (req) => {
      const delUrl = req.query.path;
      try {
        deleteFolder(delUrl);
        const delIndex = uploadedFilePath.indexOf(delUrl);
        uploadedFilePath.splice(delIndex, 1);
        return {
          code: 2000,
          data: {},
          message: "删除成功！"
        }
      } catch (e) {
        return {
          code: 20001,
          data: {},
          message: "删除失败！"
        }
      };
    }
  }
]
