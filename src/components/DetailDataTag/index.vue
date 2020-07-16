<template>
  <div class="padding-box" :style="{margin: value.ctl_margin, padding: value.ctl_padding, }">
    <div class="basic tag-wrap dataClass">
      <span
        class="flex_row basicTitle"
        :style="{
          color: value.ctl_title_color, 
          fontSize: value.ctl_title_size,
          fontStyle: (value.ctl_title_italic ? 'italic':'normal'),
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
    <div class="basic tag-box">
      <div
        class="tag-class"
        v-for="(tagName, tagIndex) in value.arr"
        :key="tagIndex"
        :style="{ 
          backgroundColor: value.colorArr[tagIndex],
            color: value.ctl_value_color, 
            fontSize: value.ctl_value_size, 
            fontStyle: (value.ctl_value_italic ? 'italic':'normal'),
            fontWeight: (value.ctl_value_bold ? 'bold':'normal'), 
            marginBottom: value.ctl_spacing, 
            marginRight: value.ctl_spacing, 
            borderRadius: value.ctl_value_radius, 
            paddingLeft: value.ctl_value_radius, 
            paddingRight: value.ctl_value_radius  
          }"
      >{{tagName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail-data-tag",

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
.padding-box {
  // width: 100%;
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

.tag-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;
  padding: 0;
  .tag-class {
    padding: 8px 20px;
    border-radius: 30px;
    font-size: 32px;
    color: #fff;
  }
}
</style>