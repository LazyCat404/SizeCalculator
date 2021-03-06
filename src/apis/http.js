/**
 * axios封装
 */
import axios from 'axios';
import { Toast } from 'vant'

// 环境的切换
if (process.env.NODE_ENV === 'development') {   //开发环境
    axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/286373';
} else if (process.env.NODE_ENV === 'test') {   //测试环境
    axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV === 'production') { //线上环境
    axios.defaults.baseURL = '/api'; 
}

// 请求超时时间 10S
axios.defaults.timeout = 10000;

// 请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/**
 * http request 请求拦截
 */

let vantToast = null
axios.interceptors.request.use(
    config => {
        vantToast = Toast.loading({
            forbidClick: true,
            loadingType: 'spinner',
            duration:0
        });
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

/**
 * http response 响应拦截 
 */ 
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            vantToast.close()
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {   
        if (error.response) {
            switch (error.response.status) {   
            case 404:
                console.log('请求网络请求不存在');
                break; 
            case 401:
                console.log('报错了');
                break;
            default:
                console.log(error.response.data.message);
            }
            return Promise.reject(error.response);
        }
    }
);

/**
 * 基础地址 + 接口地址
 * @param {String} par [接口地址] 
 * @param {String} fileUrl [文件地址] 
 */
export function baseURL(par,fileUrl){
    if(fileUrl){
        return `${axios.defaults.baseURL + par + fileUrl}` ;
    }else{
        return `${axios.defaults.baseURL + par}` ;
    }
}
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: params}).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        });
    });
}
/** 
 * post方法，对应post请求
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 * @param {String} type [参数类型，默认表单数据，可能为json] 
 */
export function post(url, params, type) {
    if(type){
        let headers = {'Content-Type': 'application/json;'};
        if(type == 'DATA' || type == 'data'){
            headers = {'Content-Type': 'multipart/form-data;'};
        }
        return new Promise((resolve, reject) => {
            axios({
                headers,
                method: 'POST',
                url,
                data:params
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data);
            });
        });
    }else{
        return new Promise((resolve, reject) => {
            axios.post(url, QS.stringify(params)).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data);
            });
        }); 
    }
}