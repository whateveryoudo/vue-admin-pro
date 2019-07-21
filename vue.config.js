
const port = process.env.port || process.env.npm_config_port || 8080 // dev port

module.exports = {
    devServer : {
        port: port,
        proxy: {
            // change xxx-api/login => mock/login
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: {
                target: `http://127.0.0.1:${port}/mock`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        after: require('./mock/mock-server.js')
    }
}