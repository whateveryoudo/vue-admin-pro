//这里排除正则 有点问题 先在方法里面加判断
const modulesFiles = require.context('./', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules,modulePath) => {
    //正则转换路径为module名  ./app.js => app
    if(modulePath !== './index.js'){
        const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/,'$1');
        const value = modulesFiles(modulePath);
        modules[moduleName] = value.default;
    }
    return modules;
},{});

export default modules