import axios from './axios'

import { TENCENT_MAP_KEY } from '@/config/tencentMap'

/**
 * 腾讯地图接口
 * https://lbs.qq.com/service/webService/webServiceGuide/webServiceGeocoder
*/
function geocoder({address}){
  return axios({
    url: `/map/ws/geocoder/v1/?address=${address}&key=${TENCENT_MAP_KEY}`,
    method: 'get',
  })
}


export default {
    geocoder
}