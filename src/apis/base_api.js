import { post, get, baseURL } from './http';

export const api = {
    // 获取所属地区
    getRundata:par => get('/getRegion', par), 
    // 获取图片
    getImg:par => baseURL('/download', par), 
    // 参数
    submitForm:par => get('/check/calculate', par), 
    // 获取验证码
    getCode:par => get('/getSecurityCode', par), 
}