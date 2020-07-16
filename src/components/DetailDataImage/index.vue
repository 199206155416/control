<template>
  <div
    class="basic h140 dataClass"
    :style="{
      margin: value.ctl_margin, 
      padding: value.ctl_padding
    }"
  >
    <span
      class="basicTitle"
      :style="{
        color: value.ctl_title_color, 
        fontSize: value.ctl_title_size, 
        fontStyle: (value.ctl_title_italic ? 'italic':'normal'),
        fontWeight: (value.ctl_title_bold ? 'bold':'normal'), 
      }"
    >{{value.ctl_title}}</span>
    <div class="single-img-wrap">
      {{value.ctl_placeholder}}
      <van-image
        v-waves2
        v-for="(image, imageIndex) in value.arr"
        :key="imageIndex"
        fit="cover"
        width="50px"
        height="50px"
        :src="image"
        :radius="value.image_fillet ? '5px' : '50%'"
        @click="previewImgs(value, imageIndex)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "detail-data-image",

  props: {
    value: {
      type: Object,
      default: {}
    }
  },

  methods: {
    previewImgs(item, startPosition) {
      this.$emit("previewImgs", item, startPosition);
    },
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
.h140 {
  // height: 140px;
  .basicTitle {
    font-size: 42px;
    color: #999;
  }

  .single-img-wrap {
    font-size: 42px;
    color: #ccc;
  }
}

.dataClass {
  min-height: 65px;
  padding: 0;
  box-sizing: border-box;
}
</style>