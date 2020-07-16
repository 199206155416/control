<template>
  <div class="basic classShow" :style="{padding: value.ctl_margin}">
    <van-image width="100%" :src="value.ctl_value" />
  </div>
</template>

<script>
export default {
  name: "detail-show-image",

  props: {
    value: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style lang="scss" scoped>
/*共用样式 s*/
@mixin flexS {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.basic {
  @include flexS;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}
.classShow {
  font-size: 32px;
  padding: 0;
}
</style>