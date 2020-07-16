<template>
  <div>
    <div
      class="van-separator"
      :style="{
        margin: value.ctl_margin, 
        borderWidth: value.height, 
        borderBottomStyle: value.linetype, 
        borderColor: value.color,
      }"
    ></div>
    <div class="padding-box" :style="{margin: value.ctl_margin, marginTop: '0', }"></div>
  </div>
</template>

<script>
export default {
  name: "detail-separator",

  props: {
    value: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style lang="scss" scoped>
.van-separator {
  border-bottom: 1px dotted #ddd;
}
.padding-box {
  box-sizing: border-box;
}
</style>