import request from '@/utils/request'


export function downFile(params, downloadCallback) {
    return request({
        url: '/file/download',
        method: 'post',
        responseType: 'arraybuffer',
        // `onDownloadProgress` 允许为下载处理进度事件
        onDownloadProgress: function (progressEvent) {
            // 对原生进度事件的处理
            downloadCallback(progressEvent);
        },
    })
}