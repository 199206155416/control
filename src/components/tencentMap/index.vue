<template>
  <van-popup v-model="hasMapBox" position="bottom">
    <div class="map-box">
      <div class="basic h90">
        <div v-waves2 class="btn" @click="hideMapBox">返回</div>
        <div v-if="mapItem.ctl_title" class="comboxTitle">{{mapItem.ctl_title}}</div>
        <div class="btn" @click="hideMapBox"></div>
      </div>
      <div class="map-bottom">
        <div v-if="mapItem.ctl_value_title" class="map-custom">{{mapItem.ctl_value_title}}</div>
        <div class="map-address">{{mapItem.ctl_value}}</div>
        <div class="flex_row nav-box" @click="toMapNav(mapItem.ctl_value)">
          <van-image
            class="nav-icn"
            src="https://3gimg.qq.com/lightmap/components/locationCluster/image/arrow.png"
          />
          <div class="nav-txt">到这里</div>
        </div>
      </div>
      <div class="map-item" id="getAddress"></div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: "tencent-map",

  data() {
    return {
      mapItem: {},
      hasMapBox: false
    };
  },

  methods: {
    init({ lng = "116.397128", lat = "39.916527" }) {
      this.map = new AMap.Map("getAddress", {
        resizeEnable: true,
        zoom: 13,
        center: [lng, lat]
      });

      // 构造点标记
      var marker = new AMap.Marker({
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [lng, lat]
      });

      // 将 markers 添加到地图
      this.map.add(marker);
    },

    async onMapBox(item) {
      const keyword = item.ctl_value;

      if (!item.ctl_value) {
        this.$toast("没有位置信息");
        return;
      }

      const data = await this.$map.geocoder({ address: keyword });

      this.hasMapBox = true;
      this.mapItem = item;

      if (data.status == 1 && data.geocodes && data.geocodes.length > 0) {
        let { location } = data.geocodes[0];
        location = location.split(",");

        this.lng = location[0];
        this.lat = location[1];

        this.$nextTick(() => {
          this.init({
            lng: location[0],
            lat: location[1]
          });
        });
      } else {
        this.$toast("没有没办法定位到具体信息");
        this.lng = null;
        this.lat = null;
        this.$nextTick(() => {
          this.init();
        });
      }
    },

    hideMapBox() {
      this.hasMapBox = false;
    },
    async toMapNav(keyword) {
      
      

      // const { position: {lng, lat} } = await this.$geolocation(this.map);
      // // console.log("geolocation", data)

      // //构造路线导航类
      // var driving = new AMap.Driving({
      //   map: this.map
      // });
      // // 根据起终点经纬度规划驾车导航路线
      // driving.search(
      //   new AMap.LngLat(lng, lat),
      //   new AMap.LngLat(this.lng, this.lat),
      //   (status, result) => {
      //     // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
      //     if (status === "complete") {
      //       this.$toast("绘制驾车路线完成");
      //     } else {
      //       this.$toast("获取驾车数据失败：" + result);
      //     }
      //   }
      // );
    }
  }
};
</script>

<style lang="scss">
.amap-markers {
  img {
    width: auto;
  }
}
</style>

<style lang="scss" scoped>
.map-box {
  position: "relative";
  width: 100%;
  height: calc(100vh);
  .map-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 999999999;
    width: 100%;
    padding: 28px 20px;
    box-sizing: border-box;
    background-color: #fff;
    text-align: left;
    .map-custom {
      padding-bottom: 20px;
      font-size: 42px;
      color: #333;
    }
    .map-address {
      font-size: 32px;
      color: #666;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .nav-box {
      position: absolute;
      top: -0.8rem;
      right: 30px;
      width: 1.6rem;
      height: 1.6rem;
      flex-direction: column;
      border-radius: 50%;
      background-color: #4188fc;
      .nav-icn {
        width: 40px;
        height: 40px;
      }
      .nav-txt {
        font-size: 16px;
        color: #eee;
      }
    }
  }
}
</style>