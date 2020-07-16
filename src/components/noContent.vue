<template>
  <div class="nocontent">
    <!-- <span>{{contText}}</span> -->
    <div class="imgWrap">
      <img :src="`${publicPath}static/img/logo-loading.png`" alt />
    </div>
  </div>
</template>

<script>
export default {
  // 外部组件传递给此组件的属性
  name: "nocontent",
  props: {
    contText: {
      type: String,
      default: "请稍等"
    }
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  }
};
</script>


<style lang="scss"  scoped>
.nocontent {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #eee;
  .imgWrap {
    position: absolute;
    left: 0;
    bottom: 200px;
    width: 100%;
    display: flex;
    justify-content: center;
    img {
      width: 256px;
      height: 88px;
    }
  }
}
</style>
