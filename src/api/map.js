import axios from './axios'

import { A_MAP_KEY } from '@/config/aMap'

/**
 * 高德地图接口
 * https://lbs.amap.com/api/webservice/guide/api/georegeo/?sug_index=1
*/
function geocoder({ address }) {
  return axios({
    url: `/map/v3/geocode/geo?address=${address}&key=${A_MAP_KEY}`,
    // url: `/map/ws/geocoder/v1/?address=${address}&key=${A_MAP_KEY}`,
    method: 'get',
  })
}

export default {
  geocoder
}