const fs = require('fs');
const path = require('path')

module.exports = [
        {
            isFile: true,
            url : '/file/download',
            type : 'post',
            response : config => {
                const fileName = 'test1.xlsx';
                const address = path.join(__dirname,'./source/' + fileName);
                const res = fs.readFileSync(address);
                return res;
            }
        }
    ]
