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
        <!-- <div v-waves2 class="flex_row nav-box" @click="toMapNav(mapItem.ctl_value)">
          <van-image
            class="nav-icn"
            src="https://3gimg.qq.com/lightmap/components/locationCluster/image/arrow.png"
          />
          <div class="nav-txt">到这里</div>
        </div> -->
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
    init({ lng = "39.916527", lat = "116.397128" }) {
      this.map = new qq.maps.Map(document.getElementById("getAddress"), {
        disableDefaultUI: true,
        zoom: 13,
        // 地图的中心地理坐标。
        center: new qq.maps.LatLng(lat, lng)
      });

      var anchor = new qq.maps.Point(13, 36),
        size = new qq.maps.Size(64, 88),
        origin = new qq.maps.Point(0, 0),
        sacleSize = new qq.maps.Size(26, 36),
        icon = new qq.maps.MarkerImage(
          "https://3gimg.qq.com/lightmap/v1/marker/images/poi_3.png",
          size,
          origin,
          anchor,
          sacleSize
        );
      var marker = new qq.maps.Marker({
        icon: icon,
        map: this.map,
        position: this.map.getCenter()
      });
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

      if (data.status == 0) {
        this.$nextTick(() => {
          this.init({
            lng: data.result.location.lng,
            lat: data.result.location.lat
          });
        });
      } else {
        this.$toast("没有没办法定位到具体信息");
        this.$nextTick(() => {
          this.init();
        });
      }
    },
    
    hideMapBox() {
      this.hasMapBox = false;
    },
    toMapNav() {
      console.log("toMapNav");
      this.$mapNav(keyword);
    }
  }
};
</script>

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