<template>
  <div
    class="basic classGroup"
    :style="{
      backgroundColor: value.ctl_bkcolor, 
      margin: value.ctl_margin, 
      padding: value.ctl_padding, 
    }"
  >
    <div class="flex_row">
      <div
        class="flex_row groupTitle"
        :style="{
          height: value.ctl_bar_height,  
          borderLeftColor: value.ctl_bar_color, 
          borderLeftWidth: value.ctl_bar_width,
          paddingLeft: value.ctl_spacing,
        }"
      >
        <span
          class="flex_row classTitle"
          :style="{
            color: value.ctl_title_color, 
            fontSize: value.ctl_title_size, 
            fontStyle: (value.ctl_title_italic ? 'italic':'normal'),
            fontWeight: (value.ctl_title_bold ? 'bold':'normal'), 
          }"
        >{{value.ctl_title}}</span>
      </div>
    </div>
    <div
      :style="{
        color: value.ctl_subtitle_color, 
        fontSize: value.ctl_subtitle_size, 
        fontStyle: (value.ctl_subtitle_italic ? 'italic':'normal'),
        fontWeight: (value.ctl_subtitle_bold ? 'bold':'normal'), 
      }"
    >{{value.ctl_subtitle || ""}}</div>
  </div>
</template>

<script>
export default {
  name: "detail-group",

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
@mixin flexC {
  display: flex;
  align-items: center;
  justify-content: center;
}
@mixin click_class {
  padding: 20px !important;
  border-radius: 3px !important;
}

.basic {
  @include flexS;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}

.groupTitle {
  padding-left: 20px;
  border-left: 2px solid #000;
  box-sizing: border-box;
}

.classTitle {
  color: #666;
  font-size: 32px;
}
.classSubTitle {
  padding-right: 30px;
}

.classGroup {
  // height: 65px;
  width: 100%;
  box-sizing: border-box;
}
</style>