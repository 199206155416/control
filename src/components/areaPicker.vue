<template>
  <div>
    <section class="showChose">
      <section class="address">
        <section class="header">
          <div class="header-btn" @click="confirmArea">取消</div>
          <div class="header-title">{{title || "标题"}}</div>
          <div class="header-btn" @click="confirmArea">确定</div>
        </section>
        <section class="title">
          <div class="area" @click="countrySelected()">{{Country?Country:info[country-1].name}}</div>
          <div class="area" @click="provinceSelected()" :class="Province?'':'active'" v-show="Country">{{Province?Province:'请选择'}}</div>
          <div class="area" @click="citySelected()" :class="City?'':'active'"  v-show="Province">{{City?City:'请选择'}}</div>
          <div class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">{{District?District:'请选择'}}</div>
        </section>
        <ul>
          <li class="picker-addList" v-for="(v,k) in info" @click="getCountryId(v.id, v.name, k)" v-if="showCountry" :class="v.selected ? 'active' : ''">{{v.name}}</li>
          <li class="picker-addList" v-for="(v,k) in showProvinceList" @click="getProvinceId(v.id, v.name, k)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.name}}</li>
          <li class="picker-addList" v-for="(v,k) in showCityList" @click="getCityId(v.id, v.name, k)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.name}}</li>
          <li class="picker-addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.id, v.name, k)" v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.name}}</li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script>
import areaDataLists from "@/assets/area.js";
const areaDataLists222 = [
  {
  "id": 1,
  "name": "中国"
  },{
  "id": 2,
  "name": "安哥拉"
  }, {
    "id": 3,
    "name": "阿富汗"
  },
];

export default {
  name:'areaList',
  props: {
    title: String,
    type: {
      type: String,
      default: 'country',
    },
  },
  data() {
    return {
      showCountry: false,
      showProvince: true,
      showCity: false,
      showDistrict: false,
      showCityList: false,
      showProvinceList: false,
      info: [],
      showDistrictList: false,
      pickItem: {},
      country: 1,
      province: 19,
      city: 3,
      district: 57,
      GetProvinceId: 2,
      District: false,
      Country: '中国',
      Province: false,
      City: false,
      // v-for循环判断是否为当前
      selected: false,
    }
  },
  mounted() {},
  created() {
    console.log("info", areaDataLists);
    this.info = areaDataLists;
    this.showProvinceList = areaDataLists[0].province;
  },
  methods: {
    _filter(add, name, code) {
      let result = [];
      for (let i = 0; i < add.length; i++) {
        if (code == add[i].id) {
          result = add[i][name];
        }
      }
      return result;
    },
    getCountryId: function (code, input, index){
      this.country = code;
      this.Country = input;
      this.showCountry = false;
      this.showProvince = true;
      this.showCity = false;
      this.showDistrict = false;
      this.showProvinceList = this._filter(this.info, 'province', code);
      // 点击选择当前
      this.info.map(a => a.selected = false);
      this.info[index].selected = true;
    },
    getProvinceId: function (code, input, index) {
      this.province = code;
      this.Province = input;
      this.showProvince = false;
      this.showCity = true;
      this.showDistrict = false;
      this.showCityList = this._filter(this.showProvinceList, 'city', this.province);
      // 点击选择当前
      this.showProvinceList.map(a => a.selected = false);
      this.showProvinceList[index].selected = true;
    },
    countrySelected: function () {
      this.provinceSelected();
      // 清除省级列表
      this.showProvinceList = false;
      // 清除国家级选项
      this.Country = false;
      // 选项页面的切换
      this.showCountry = true;
      this.showProvince = false;
    },
    provinceSelected: function () {
      // 清除市级和区级列表
      this.showCityList = false;
      this.showDistrictList = false;
      // 清除市级和区级选项
      this.Province = false;
      this.City = false;
      this.District = false;
      // 选项页面的切换
      this.showProvince = true;
      this.showCity = false;
      this.showDistrict = false;
    },
    getCityId: function (code, input, index) {
      this.city = code;
      this.City = input;
      this.showProvince = false;
      this.showCity = false;
      this.showDistrict = true;
      this.showDistrictList = this._filter(this.showCityList, 'district', this.city);
      // 选择当前添加active
      this.showCityList.map(a => a.selected = false);
      this.showCityList[index].selected = true;
    },
    citySelected: function () {
      this.showProvince = false;
      this.showCity = true;
      this.showDistrict = false;
    },
    getDistrictId: function (code, input, index) {
      this.district = code;
      this.District = input;
      // 选择当前添加active
      this.showDistrictList.map(a => a.selected = false);
      this.showDistrictList[index].selected = true;
      // 选取市区选项之后关闭弹层
      this.confirmArea();
    },
    districtSelected: function () {
      this.showProvince = false;
      this.showCity = false;
      this.showDistrict = true;
    },
    confirmArea: function () {
      const { Country, Province, City, District, type } = this;
      const arr  = [ Country, Province, City, District ];
      console.log(arr);
      const valueArr = arr.filter(e => e != false);
      this.$emit('confirm', valueArr);
    },
  }
};
</script>

<style scoped>
.myAddress{
  width: 100%;
  background-color: white;
  border-top: 4px solid rgba(245,245,245,1);
  color:#333;
}
.myAddress .cont{
  border-bottom: 1px solid rgba(245,245,245,0.8);
}
.myAddress .cont span{
  display: inline-block;
  font-size: 0.28rem;
  color: #333;
  line-height: 0.88rem;
  margin-left: 0.32rem;
}
.myAddress .cont section{
  float:left;
}
.myAddress .cont p{
  display: inline-block;
  font-size: 0.28rem;
  color: #333333;
  line-height: 0.88rem;
  margin-left: 1rem;
}
.myAddress .cont .pic2{
  float: right;
  width: 0.14rem;
  height: 0.24rem;
  margin: 0.32rem 0.32rem 0.32rem 0;
}
.myAddress .cont p.text{
  margin-left: 0.72rem;
}
.showChose{
  /* width:100%;
  height:100%;
  position:fixed;
  top:0;
  left:0;
  z-index:120;
  background:rgba(77,82,113,0.8); */
  height: 70vh;
}
.address{
  height: 70vh;
  position:absolute;
  bottom:0;
  left:0;
  z-index:121;
  background:#fff;
  width:100%;
}
.header {
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
}
.header-title {
  font-size: 32px;
  color: #333;
}
.header-btn {
  padding: 0 30px;
  font-size: 32px;
  color: #690;
}
.title {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  border-bottom:0.02rem solid #ddd;
}
.title h4{
  display:inline-block;
  margin-left:3.2rem;
  font-size:0.32rem;
  line-height:0.88rem;
  font-weight:normal;
  color:#999;
}
.title span{
  margin:0.42rem 0 0 2.2rem;
  font-size:0.45rem;
  line-height:0.34rem;
  color:#D8D8D8;
}
.area{
  display:inline-block;
  font-size:0.32rem;
  line-height:0.88rem;
  margin-left:0.42rem;
  color:#333;
}
.picker-addList{
  text-align: left;
  width:100%;
  padding-left:0.32rem;
  font-size:0.34rem;
  line-height:0.88rem;
  color:#333;
  border-bottom: 1px dotted #ddd;
}
/* 修改的格式 */
.address ul{
  width:100%;
  height:100%;
  /* max-height: 4.4rem; */
  overflow:auto;
}

.address .title .active{
  color:#690;
  border-bottom:0.06rem solid #690;
}
.address ul .active{
  color:#690;
}
</style>