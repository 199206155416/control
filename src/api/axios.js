import axios from 'axios'
import qs from "qs";
import {getAuthTicket, getRegistrationTicket, showToast} from '@/utils/jsBridge'

const authTicket = getAuthTicket()
const registrationTicket = getRegistrationTicket()

// create an axios instance
let URL='http://m.ixuechuang.com';  //接口地址基础路径

const service = axios.create({
  // baseURL: process.env.NODE_ENV==='production'? URL : '/api', // url = base url + request url
  // baseURL: URL, // url = base url + request url
  timeout: 60000, // request timeout
})

axios.defaults.transformRequest =(data, config) => {
  // Do whatever you want to transform the data
  if(!config['Content-Type']) {
    console.log(" none Content-Type")
    return qs.stringify(data)
  };
  console.log(" has Content-Type")
  if(config['Content-Type'] === 'multipart/form-data') {
    return data;
  } else {
    return qs.stringify(data);
  }
};

//转换post请求data的格式，配合qs使用,也可以在请求拦截器那里处理
// axios.defaults.transformRequest = data => qs.stringify(data);
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// service.defaults.transformRequest = [function (data) {
//   let ret = ''
//   for (let it in data) {
//     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//   }
//   return ret
// }]
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // let each request carry token
    config.headers['auth_ticket'] = authTicket
    config.headers['registration_ticket'] = registrationTicket
    config.headers['Content-Type'] = 'application/json'
    console.log("axios config", config);
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response) => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    console.log("response", response);
    const res = response.data
    if (String(res.success) === 'false') {
      showToast({
        message: res.msg || res.message,
        type: 1
      })
      // return Promise.reject(new Error('error'))
      return response.data
    } else {
      return response.data
    }
  },
  (error) => {
    if (error && error.message) {
      showToast({
        message: error.msg || error.message,
        type: 1
      })
    }

    return Promise.reject(error)
  }
)

export default service
