import { post, get ,baseURL } from './http';

export const api = {
    // 获取所属地区
    getRundata:par => get('/getRegion', par), 
    // 参数
    get:par => get('/check/calculate', par), 
    
}