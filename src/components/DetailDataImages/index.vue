<template>
  <div class="padding-box" :style="{margin: value.ctl_margin, padding: value.ctl_padding, }">
    <div class="basic tag-wrap dataClass">
      <span
        class="flex_row basicTitle"
        :style="{
          color: value.ctl_title_color, 
          fontSize: value.ctl_title_size, 
          fontStyle: (value.ctl_title_italic ? 'italic':'normal')
        }"
      >{{value.ctl_title}}</span>
      <div
        :style="{
          color: value.ctl_subtitle_color, 
          fontSize: value.ctl_subtitle_size, 
          fontStyle: (value.ctl_subtitle_italic ? 'italic':'normal'),
          fontWeight: (value.ctl_subtitle_bold ? 'bold':'normal'),
        }"
      >{{value.ctl_subtitle || ""}}</div>
    </div>
    <div class="widthAll" :style="{height: value.ctl_spacing }"></div>
    <div class="flex_row images-box" v-if="value.arr.length > 0">
      <van-image
        v-waves2
        v-for="(image, imageIndex) in value.arr"
        :key="imageIndex"
        fit="cover"
        :width="value.imgWidth"
        :height="value.imgWidth"
        :style="{ marginBottom: value.ctl_spacing, marginRight: (imageIndex + 1) % value.image_columns !== 0 ? value.ctl_spacing : '0', }"
        :src="image"
        :radius="value.image_fillet ? '5px' : ''"
        @click="previewImgs(value, imageIndex)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "detail-data-images",

  props: {
    value: {
      type: Object,
      default: {}
    }
  },

  methods: {
    previewImgs(item, startPosition) {
      this.$emit("previewImgs", item, startPosition);
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
.padding-box {
  // width: 100%;
  box-sizing: border-box;
}
.basic {
  @include flexS;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}

.tag-wrap {
  min-height: 140px;
  .basicTitle {
    min-height: 65px;
    // font-size: 42px;
    // color: #999;
  }
}

.dataClass {
  min-height: 65px;
  padding: 0;
  box-sizing: border-box;
}

.flex_row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.widthAll {
  width: 100%;
}
.images-box {
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
  // margin-bottom: 16px;
}
</style>