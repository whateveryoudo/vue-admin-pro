/**
 * fileName : index.js
 * author:ykx
 * date：2019/8/12 0:05
 * desc：过滤器
 */
import numeral from 'numeral'

/**
 * 格式化金额显示（12333 => 12,333.00）
 * @param {Number} num - 金额
 * @param {String} prefixFlag - 显示前缀
 */
export const toThousandFilter =  (num,prefixFlag = '') => {
    return `${prefixFlag ? prefixFlag + ' ' : ''}${numeral(num).format('0,0.00')}`;
}

