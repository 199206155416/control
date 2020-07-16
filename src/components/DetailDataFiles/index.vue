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
    <template v-for="(file, fileIndex) in value.fileArr">
      <div
        class="flex_row name-box"
        :key="fileIndex"
        :style="{
          marginTop: value.ctl_spacing, 
          marginBottom: value.ctl_spacing, 
        }"
      >
        <div class="name-icn-box">
          <svg class="icon name-icn" aria-hidden="true">
            <use :xlink:href="file.icn" />
          </svg>
        </div>
        <div
          class="flex_row file-name-box"
          :style="{
            color: value.ctl_value_color, 
            fontSize: value.ctl_value_size, 
            fontStyle: (value.ctl_value_italic ? 'italic':'normal'), 
            fontWeight: (value.ctl_value_bold ? 'bold':'normal')
          }"
        >
          <span class="name-icn-box">
            <span class="name-icn">{{file.name}}.{{file.type}}</span>
          </span>
        </div>
        <div class="separator-box">
          <div
            class="van-separator"
            :style="{
              margin: value.ctl_value_line_margin, 
              borderWidth: value.ctl_value_lineheight, 
              borderBottomStyle: value.ctl_value_linetype,
              borderColor: value.ctl_value_linecolor
            }"
          ></div>
          <div class="padding-box" :style="{margin: value.ctl_value_line_margin, marginTop: '0', }"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "detail-data-files",

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

.name-box {
  // width: calc(100% - 30px);
  position: relative;
  height: 90px;
  justify-content: flex-start;
  // border-bottom: 0.02rem dotted #ddd;
  box-sizing: border-box;
  overflow: hidden;
  .name-icn-box {
    float: left;
    height: 95%;
    // max-width: calc(100vw - 1.5rem);
    .name-icn {
      max-width: calc(100vw - 1.5rem);
      height: 1rem;
      display: table-cell;
      vertical-align: middle;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .file-name-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    justify-content: flex-start;
    box-sizing: border-box;
    font-size: 0.56rem;
    color: #666;
    margin-left: 10px;
    .file-name {
      // max-width: 490px;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .file-type {
      flex-shrink: 0;
    }
  }
}

.separator-box {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px dotted #ddd;
}
.van-separator {
  border-bottom: 1px dotted #ddd;
}
</style>