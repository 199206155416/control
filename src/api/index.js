/*
与后台交互模块 （依赖已封装的axios函数）
 */
import axios from './axios'

/*
通用表单信息模块接口
模版审核接口：JSON, key,id
*/
function formList(href=''){
  console.log("href", href);
  const herfParam = href.split('?')[1] || '';
  console.log("herfParam", herfParam)
  return axios({
    url: '/api/control?' + herfParam,
    method: 'post',
  })
}

/*
通用表单信息模块更新接口
模版审核接口：JSON, key, id, params
*/
function updateFormList(href='', params={}){
  const herfParam = href.split('?')[1] || '';
  return axios({
    url: 'api/customer?' + herfParam,
    method: 'post',
    ...params,
  })
}

/*
通用表单图片上传接口
模版审核接口：formData: { 'uploads[]': file }
*/
function uploadImage(data={}){
  // let data=Object.assign(params)
  return axios({
    url: '/api/control?key=upload_image',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    ...data,
  })
}

/*
通用表单为五年间上传接口
模版审核接口：formData: { 'uploads[]': file }
*/
function uploadFile(data={}){
  return axios({
    url: '/api/control?key=upload_file',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    ...data,
  })
}


export default {
  formList,
  updateFormList,
  uploadImage,
  uploadFile,
}