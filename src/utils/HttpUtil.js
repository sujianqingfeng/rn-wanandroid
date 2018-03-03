import RealmUtil from './RealmUtil';

const base_url = 'http://www.wanandroid.com'


function getFormData(params) {
    let formData = new FormData()
    for (var key in params) {
        formData.append(key, params[key])
    }
    return formData
}


function request(method, url, params = '') {
    console.log('请求链接', method, base_url + url)
    let config = {
        method: method
    }
    if (params != '') {
        config['body'] = getFormData(params)
    }
  
    config['headers']={
        'Cookie':RealmUtil.getCookie()
    }
    
    console.log('参数', config)

    return new Promise((resole, reject) => {
        fetch(base_url + url, config)
            .then(res => {
                if ((res.url.indexOf('user/login')!=-1 || res.url.indexOf('user/register'))!=-1 && res.headers.map.hasOwnProperty('set-cookie')) {
                    const cookie = res.headers.map['set-cookie'][0]
                    RealmUtil.saveCookie(cookie)
                }
                return res.json()
            })
            .then(json => {
                console.log('请求成功', json)
                if(json.errorCode==-1){
                  reject(json.errorMsg)
                }else {
                  resole(json)
                }
            })
            .catch(err => {
                console.log('请求错误', err)
                reject(err)
            })
    })
}


export default class HttpUtil {
    static get(url, params = '') {
        return request('GET', url, params)
    }
    static post(url, params = '') {
        return request('POST', url, params)
    }
}
