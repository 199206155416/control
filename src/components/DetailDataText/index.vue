<template>
  <div class="padding-box" :style="{margin: value.ctl_margin, padding: value.ctl_padding, }">
    <div class="basic dataClass">
      <span
        class="basicTitle"
        :style="{
          color: value.ctl_title_color, 
          fontSize: value.ctl_title_size, 
          fontStyle: (value.ctl_title_italic ? 'italic':'normal'), 
          fontWeight: (value.ctl_title_bold ? 'bold':'normal'), 
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
    <div class="basic dataClass" :style="{padding: value.isHtml ? '0' : '' }">
      <div
        class="data-value"
        :style="{
          color: value.ctl_value_color, 
          fontSize: value.ctl_value_size, 
          fontStyle: (value.text_italic ? 'italic':'normal'),
          fontWeight: (value.text_bold ? 'bold':'normal')
        }"
        :class="{'preWrap': value.isMul, 'widthAll': value.isHtml}"
      >
        <template v-if="!value.isWeb && !value.isHtml">{{value.ctl_value}}</template>
        <template v-if="value.isWeb">
          <a
            class="urlCLass"
            @click="clickUrl(value.ctl_value)"
            :style="{
              color: value.ctl_value_color, 
              fontSize: value.ctl_value_size, 
              fontStyle: (value.ctl_value_italic ? 'italic':'normal'), 
              fontWeight: (value.ctl_value_bold ? 'bold':'normal')
            }"
          >{{value.ctl_value}}</a>
        </template>
        <div v-if="value.isHtml" class="edit-html-box">
          <quill-editor
            v-model="value.ctl_value"
            :options="htmlOption"
            :disabled="true"
            ref="myQuillEditor"
          ></quill-editor>
        </div>
      </div>
      <div class="flex_row">
        <div
          v-waves2
          v-for="(icnItem, nIndex) in value.icnArr"
          :key="nIndex"
          style="padding: 10px; border-radius: 5px"
          @click="clickHandler(icnItem.funcName, value)"
        >
          <i class="iconfont my-icon2" :class="icnItem.icn"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";

export default {
  name: "detail-data-text",

  props: {
    value: {
      type: Object,
      default: {}
    }
  },

  data() {
    return {
      htmlOption: {
        theme: "snow", //注意样式问题
        placeholder: "",
        debug: false,
        readOnly: true,
        modules: {
          // 自定义菜单栏
          toolbar: {
            container: [[{ color: [] }]]
          }
        }
      }
    };
  },

  components: {
    quillEditor
  },

  methods: {
    clickUrl(item) {
      this.$clickUrl(item.ctl_value);
    },

    clickHandler(funcName, param) {
      switch (funcName) {
        case "smsWechat":
          this.$smsWechat(param.ctl_value);
          break;
        case "smsQq":
          this.$smsWechat(param.ctl_value);
          break;
        case "smsPhone":
          this.$callPhone(param.ctl_value);
          break;
        case "callPhone":
          this.$callPhone(param.ctl_value);
          break;
        case "sendEmail":
          this.$sendEmail(param.ctl_value);
          break;
        case "clickUrl":
          this.$clickUrl(param.ctl_value);
          break;
        case "onMapBox":
          this.$emit("onMapBox", param);
          break;
        default:
      }
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
.dataClass {
  min-height: 65px;
  padding: 0;
  box-sizing: border-box;
  .my-icon2 {
    font-size: 48px;
    color: #690;
  }
  .data-value {
    text-align: left;
  }
  .urlCLass {
    color: blue;
  }
}

.widthAll {
  width: 100%;
}
.preWrap {
  white-space: pre-wrap;
}
.edit-html-box {
  position: "relative";
  width: 100%;
  font-size: "30px";
  // min-height: 400px;
}
.flex_row {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>