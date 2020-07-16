<template>
  <div
    class="basic classShow"
    :style="{
      backgroundColor: value.text_bkcolor, 
      padding: value.ctl_margin
    }"
  >
    <span
      v-copy="copy ? {value: value.ctl_value, title: `文本`} : null"
      class="preWrap"
      :style="{
        color: value.text_color, 
        backgroundColor: value.text_bkcolor, 
        fontSize: value.ctl_value_size,
          fontStyle: (value.text_italic ? 'italic':'normal'), 
          fontWeight: (value.text_bold ? 'bold':'normal'), 
          textAlign: value.ctl_value_align, 
          width: '100%'
        }"
    >{{value.ctl_value}}--{{copy}}</span>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "detail-show-text",

  props: {
    value: {
      type: Object,
      default: {}
    }
  },

  computed: {
    ...mapState({
      copy: state => state.detail.copy
    })
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

.preWrap {
  white-space: pre-wrap;
}
</style>