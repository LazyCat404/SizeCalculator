import { post, get } from './http';

export const api = {
    // 获取所属地区
    getRundata:par => get('/getRegion', par), 
    // 参数
    submitForm:par => get('/check/calculate', par), 
    
}