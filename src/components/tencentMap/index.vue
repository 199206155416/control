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
      <!-- <iframe class="map-item" id="getAddress" @load="loadiframe" :src="srcUrl"></iframe> -->
    </div>
  </van-popup>
</template>

<script>
export default {
  name: "tencent-map",

  data() {
    return {
      mapItem: {},
      hasMapBox: false,
      srcUrl:
        "https://3gimg.qq.com/lightmap/v1/marker/?marker=coord:39.892326,116.342763;title:超好吃冰激凌;addr:手帕口桥北铁路道口&referer=myapp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
    };
  },

  methods: {
    init() {
      this.map = new qq.maps.Map(document.getElementById("getAddress"), {
        disableDefaultUI: true,
        zoom: 13,
        // 地图的中心地理坐标。
        center: new qq.maps.LatLng(39.916527, 116.397128)
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

    onMapBox(item) {
      const keyword = item.ctl_value ? item.ctl_value : "广场";
      const reg = /.+?(省|市|自治区|自治州|县|区)/g;
      console.log("keyword", keyword);
      const addressArr = keyword.match(reg);
      console.log("addressArr", addressArr);
      console.log("addressArr", addressArr[1].indexOf("市"));
      let city = addressArr.filter(e => e.indexOf("市") !== -1);
      city = (city && city.join("").replace("市", "")) || "";

      let srcUrl = `https://3gimg.qq.com/lightmap/v1/marker/?marker=coord:39.892326,116.342763;title:${item.ctl_value_title};addr:${item.ctl_value}&referer=myapp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77`;
      // if(!keyword) return;
      console.log("。。。。。。。。。。。 city", city);
      if (city) {
        console.log("has 。。。。。。。。。。。 city", city);
        srcUrl = srcUrl.replace("center=CurrentLocation", "region=" + city);
      }
      console.log("replace srcUrl", srcUrl);
      this.srcUrl = srcUrl;
      this.hasMapBox = true;
      this.mapItem = item;

      this.$nextTick(() => {
        this.init();
      });
    },
    loadiframe() {
      window.addEventListener(
        "message",
        function(event) {
          console.log("tencent event", event);
          // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
          var loc = event.data;
          if (loc && loc.module == "locationPicker") {
            //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
            console.log("location", loc);
          }
        },
        false
      );
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