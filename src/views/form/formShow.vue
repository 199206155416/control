<template>
  <div class="form">
    <div
      v-show="contentShow"
      :style="pageStyle"
    >
      <div class="zhanwei"></div>
      <page-header :pageSet="pageSet" />

      <div v-for="(item,index) in listFilter(controls)" :key="index">
        <!-- 详情分组 -->
        <detail-group v-if="item.ctl_type === 'group'" :value="item" />

        <!-- 详情文本 show_text -->
        <detail-show-text v-if="item.ctl_type === 'show_text'" :value="item" />

        <!-- 详情图片 show_image -->
        <detail-show-image v-if="item.ctl_type === 'show_image'" :value="item" />

        <!-- 分割符 -->
        <detail-separator v-if="item.ctl_type === 'separator'" :value="item" />

        <!-- 详情文本 data_text -->
        <detail-data-text v-if="item.ctl_type === 'data_text'" :value="item" @onMapBox="onMapBox" />

        <!-- 详情标签 -->
        <detail-data-tag v-if="item.ctl_type === 'data_tag'" :value="item" />

        <!-- 详情图片 data_image -->
        <detail-data-image
          v-if="item.ctl_type === 'data_image'"
          :value="item"
          @previewImgs="previewImgs"
        />

        <!-- 详情图片 data_images -->
        <detail-data-images
          v-if="item.ctl_type === 'data_images'"
          :value="item"
          @previewImgs="previewImgs"
        />

        <!-- 详情文件 data_files -->
        <detail-data-files v-if="item.ctl_type === 'data_files'" :value="item" />
      </div>
    </div>

    <noContent contText="表单列" v-show="!contentShow"></noContent>

    <!-- 地图组件 -->
    <tencent-map ref="tencentMap" />

    <!-- 图片预览组件 -->
    <preview-image ref="previewImage" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import noContent from "@/components/noContent";
import tools from "@/utils/tool";
import { quillEditor } from "vue-quill-editor";
import axios from "@/api/axios";
import { ImagePreview } from "vant";
import TencentMap from "@/components/TencentMap";
import PreviewImage from "@/components/PreviewImage";
import PageHeader from "@/components/PageHeader";
import DetailGroup from "@/components/DetailGroup";
import DetailShowText from "@/components/DetailShowText";
import DetailShowImage from "@/components/DetailShowImage";
import DetailSeparator from "@/components/DetailSeparator";
import DetailDataText from "@/components/DetailDataText";
import DetailDataTag from "@/components/DetailDataTag";
import DetailDataImage from "@/components/DetailDataImage";
import DetailDataImages from "@/components/DetailDataImages";
import DetailDataFiles from "@/components/DetailDataFiles";

import "quill/dist/quill.snow.css";

export default {
  name: "formShow",
  components: {
    noContent,
    quillEditor,
    TencentMap,
    PreviewImage,
    PageHeader,
    DetailGroup,
    DetailShowText,
    DetailShowImage,
    DetailSeparator,
    DetailDataText,
    DetailDataTag,
    DetailDataImage,
    DetailDataImages,
    DetailDataFiles,
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  data() {
    return {
      pageSet: {
        pageTitle: "新建客户",
        operation: "刷新",
        type: "edit",
        operation_url: ""
      },
      pageStyle: {},
      fileist: [],
      controls: [],
      contentShow: false
    };
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === "previewImage") {
        console.log("to.meta", to.meta);
        vm.$el.scrollTop = to.meta.scrollTop;
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave to", to);
    if (to.name === "previewImage") {
      console.log("this.$el.scrollTop", this.$el.scrollTop);
      from.meta.scrollTop = this.$el.scrollTop;
    } else {
      to.meta.scrollTop = 0;
    }
    next();
  },
  methods: {
    ...mapMutations(['changeCopy', 'changeHiddenNumber', 'changeEdit']),
    listFilter(list) {
      const arrItems = {
        data_mobile: [
          { icn: 'icon-icon_wechat', funcName: 'smsWechat' },
          { icn: 'icon-icon_message', funcName: 'smsPhone' },
          { icn: 'icon-icon_phone', funcName: 'callPhone' }
        ],
        data_tel: [{ icn: "icon-icon_phone", funcName: "callPhone" }],
        data_wechat: [{ icn: "icon-icon_wechat", funcName: "smsWechat" }],
        data_qq: [{ icn: "icon-icon_qq", funcName: "smsQq" }],
        data_email: [{ icn: "icon-mail", funcName: "smsWechat" }],
        data_address: [{ icn: "icon-dizhi", funcName: "onMapBox" }],
        data_website: [{ icn: "icon-icon_link", funcName: "clickUrl" }]
      };
      list.map(e => {
        // console.log("e.ctl_type ", e.ctl_type );
        if (
          !e.isFirst &&
          e.ctl_value &&
          (e.ctl_type === "data_tag" ||
            e.ctl_type === "data_image" ||
            e.ctl_type === "data_images" ||
            e.ctl_type === "data_files")
        ) {
          // console.log("e.ctl_value_bkcolor ", e.ctl_value_bkcolor );
          const sign = e.ctl_type === "data_tag" ? "," : ";";
          e.arr =
            e.ctl_value.split(sign) || (e.ctl_value && [e.ctl_value]) || [];
          e.arr = e.arr.filter(e => e != "");

          let icn_space = e.ctl_spacing || "0px";
          icn_space = parseInt(icn_space) > 10 ? parseInt(icn_space) : 10;
          e.icn_space = icn_space + "px";
          if (e.ctl_type === "data_image" && e.arr.length > 0) {
            // e.arr = e.arr.map(img => {
            //   return (img && { url: img });
            // })
          } else if (e.ctl_type === "data_tag") {
            e.colorArr =
              e.ctl_value_bkcolor.split(sign) ||
              (e.ctl_value_bkcolor && [e.ctl_value_bkcolor]) ||
              [];
            e.colorArr = e.colorArr.sort(() => Math.random() - 0.5);
            e.colorArr = e.colorArr.sort(() => Math.random() - 0.5);
          } else if (e.ctl_type === "data_files" && e.arr.length > 0) {
            const icnMap = {
              xls: "#icon-yunpanlogo-",
              xlsx: "#icon-yunpanlogo-",
              ppt: "#icon-yunpanlogo-1",
              pptx: "#icon-yunpanlogo-1",
              jpg: "#icon-yunpanlogo-14",
              png: "#icon-yunpanlogo-14",
              jpeg: "#icon-yunpanlogo-14",
              gif: "#icon-yunpanlogo-14",
              doc: "#icon-yunpanlogo-2",
              docx: "#icon-yunpanlogo-2",
              txt: "#icon-yunpanlogo-8",
              pdf: "#icon-yunpanlogo-15"
            };
            // e.arr.push('1/未知文件类型克.己复礼时间时间.浪费数量看.md')
            e.fileArr =
              e.arr.map(name => name.split("/")[name.split("/").length - 1]) ||
              [];
            e.fileArr = e.fileArr.map(file => {
              const type = file.split(".")[file.split(".").length - 1] || "";
              let name = file.replace(type, "");
              let index = name.lastIndexOf(".");
              name = name.substring(0, index);
              const icn = icnMap[type] || "#icon-yunpanlogo-3";
              console.log("{ name, type, icn }", { name, type, icn });
              return { name, type, icn };
            });
            // console.log("e.fileArr ", e.fileArr );
          } else if (e.ctl_type === "data_images") {
            const image_columns = e.image_columns || 1;
            let ctl_spacing = e.ctl_spacing || "0px";
            // const image_columns = 2; // test
            // e.image_columns = image_columns; // test

            const marginArr = e.ctl_margin.split(" ");
            const paddingArr = e.ctl_padding.split(" ");
            console.log(
              "e.marginArr  paddingArr。。。。",
              marginArr,
              paddingArr
            );
            let marginRight = marginArr[1];
            let paddingRight = paddingArr[1];
            let marginLeft = marginArr[3];
            let paddingLeft = paddingArr[3];
            console.log(
              "marginRight, paddingRight 。。。。left",
              marginRight,
              paddingRight,
              left
            );
            // 10rem 375px marginRight
            ctl_spacing = ctl_spacing.replace("px", "");
            marginRight = marginRight.replace("px", "");
            paddingRight = paddingRight.replace("px", "");
            marginLeft = marginLeft.replace("px", "");
            paddingLeft = paddingLeft.replace("px", "");
            let left = parseInt(marginLeft) + parseInt(paddingLeft);
            let right = parseInt(marginRight) + parseInt(paddingRight);
            ctl_spacing = parseInt(ctl_spacing) > 0 ? parseInt(ctl_spacing) : 0;
            // right = right > ctl_spacing ? (right - ctl_spacing) : 0; // right大于ctl_spacing则取差值，否则为0.因为一行的最后一个图片会占用ctl_spacing
            left = left > 0 ? left : 0;
            right = right > 0 ? right : 0;
            console.log("ctl_spacing 。。。。", ctl_spacing);
            console.log("right 。。。。", right);
            console.log("left 。。。。", left);
            ctl_spacing = ctl_spacing * 0.01334;
            right = right * 0.01334;
            left = left * 0.01334;
            const imgWidth =
              (10 - left - right - 0.02 - (image_columns - 1) * ctl_spacing) /
              image_columns;

            console.log("e.ctl_margin 。。。。", e.ctl_margin);
            console.log("e.ctl_padding 。。。。", e.ctl_padding);
            e.imgWidth = imgWidth + "rem";
          }
        } else if (
          (!e.isFirst && e.ctl_type === "data_text") ||
          e.ctl_type === "data_mobile" ||
          e.ctl_type === "data_wechat" ||
          e.ctl_type === "data_qq" ||
          e.ctl_type === "data_email" ||
          e.ctl_type === "data_website" ||
          e.ctl_type === "data_email" ||
          e.ctl_type === "data_address" ||
          e.ctl_type === "data_multext" ||
          e.ctl_type === "data_html" ||
          e.ctl_type === "data_tel"
        ) {
          e.icnArr = arrItems[e.ctl_type] || [];
          let icn_spacing = e.ctl_spacing || "0px";
          icn_spacing = icn_spacing.replace("px", "");
          e.icn_spacing =
            (parseInt(icn_spacing) > 5 ? parseInt(icn_spacing) * 2 : 10) + "px";
          if (e.ctl_type === "data_website") {
            e.isWeb = true;
          } else if (e.ctl_type === "data_multext") {
            e.isMul = true;
          } else if (e.ctl_type === "data_html") {
            e.isHtml = true;
          }
          e.ctl_type = "data_text";
        }
        e.ctl_margin = this.pxToRem(e.ctl_margin);
        e.ctl_padding = this.pxToRem(e.ctl_padding);
        e.ctl_bar_height = this.pxToRem(e.ctl_bar_height);
        e.ctl_bar_width = this.pxToRem(e.ctl_bar_width);
        e.ctl_spacing = this.pxToRem(e.ctl_spacing);
        e.ctl_title_size = this.pxToRem(e.ctl_title_size);
        e.ctl_subtitle_size = this.pxToRem(e.ctl_subtitle_size);
        e.ctl_value_size = this.pxToRem(e.ctl_value_size);
        e.height = this.pxToRem(e.height);
        e.ctl_value_radius = this.pxToRem(e.ctl_value_radius);
        e.ctl_value_line_margin = this.pxToRem(e.ctl_value_line_margin);
        e.ctl_value_lineheight = this.pxToRem(e.ctl_value_lineheight);
        e.isFirst = true;
        // console.log("e.arr ", e.arr );
        return e;
      });
      console.log("listFilter list", list);
      return list;
    },
    pxToRem(string = "") {
      // console.log('string', string)
      if (!string || typeof string !== "string" || string.indexOf("rem") !== -1)
        return string;
      let strArr = string.split(" ") || string;
      strArr = strArr.map(e => e.replace("px", ""));
      strArr = strArr.map(e =>
        parseInt(e) > 2 ? parseInt(e) * 0.01334 + "rem" : e + "px"
      );
      return strArr.join(" ");
    },
    previewImgs(item, startPosition) {
      this.$refs["previewImage"].show({
        images: item.arr,
        startPosition,
        previewSave: item.image_saveas
      });
    },
    getStrLen(str) {
      let len = 0;
      for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
          len++;
        } else {
          len += 2;
        }
      }
      return len;
    },
    getRandomColor() {
      const color =
        "#" +
        ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6);
      return color !== "#ffffff" ? color : this.getRandomColor();
    },
    loadiframe() {
      window.addEventListener(
        "message",
        function(event) {
          console.log("tencent event", event);
          // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
          var loc = event.data;
          if (loc && loc.module == "locationPicker") {
            //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
            console.log("location", loc);
          }
        },
        false
      );
    },
    filesReader(file, detail) {
      console.log("filesReader", file, detail);
      console.log("this.fileist", this.fileist);
    },
    operationHandler() {
      const { pageSet } = this;
      console.log("pageSet", pageSet);
      if (pageSet.operation === "编辑") {
        window.location.href = pageSet.operation_url || window.location.href;
      } else {
        this.reload();
      }
    },
    onEditorFocus(event) {
      // event.enable(false);
    },
    onMapBox(item) {
      this.$refs["tencentMap"].onMapBox(item);
    },


    clickUrl(item) {
      this.$clickUrl(item.ctl_value);
    },

    async getFormList(herf) {
      //获取首页数据
      let u = window.navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      this.$openIndicator();
      let res = await this.$http.formList(herf);
      if (res.success === true) {
        const { copy, hidden_number, edit, margin, bkcolor } = res.data

        if (copy) {
          this.changeCopy(true)
        }

        if (hidden_number) {
          this.changeHiddenNumber(true)
        }

        if (edit) {
          this.changeEdit(true)
        }

        this.pageStyle = {
          margin,
          backgroundColor: bkcolor
        }


        this.controls = res.data.controls;
        this.pageSet.pageTitle = res.data.title;
        document.title = res.data.title || "通用表单";
        this.pageSet.operation = res.data.operation;
        this.pageSet.operation_url = res.data.operation_url;
        this.contentShow = true;
        this.$nextTick(() => {
          //监听数据渲染完再关闭loading
          setTimeout(() => {
            //第二层延迟
            this.$closeIndicator();
          }, 300);
        });
      } else {
        this.$closeIndicator();
      }
    },
    makeValue(controls) {
      controls.map(e => {
        if (
          e.ctl_type === "group" ||
          e.ctl_type === "show_text" ||
          e.ctl_type === "show_image"
        ) {
          if (!e.ctl_value) e.ctl_value = "";
        } else if (e.ctl_type === "separator") {
        } else if (e.ctl_type === "tag") {
          e.arr = [];
        } else {
          if (!e.ctl_data) e.ctl_data = {};
          if (!e.ctl_data.value) e.ctl_data.value = "";
        }
        return e;
      });
      return controls;
    },
    reload() {
      //刷新
      this.getFormList(window.location.href);
    }
  },
  created() {
    this.getFormList(window.location.href);
  }
};
</script>

<style lang="scss">
// <style lang="scss" scoped>
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
.flex_start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.flex_row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.border_radius {
  border-radius: 3px !important;
}
.act1 {
  color: #ff9000 !important;
}
.act2 {
  color: #ff0000 !important;
}
.tl {
  align-items: flex-start !important;
}
.tc {
  align-items: center !important;
}
.tr {
  align-items: flex-end !important;
}
.bg1 {
  background: #ccc !important;
}

.click_class {
  padding: 20px !important;
  border-radius: 3px !important;
}

/*共用样式 e*/

.form {
  height: 100%;
  .mt_1 {
    // margin-top: 1px;
  }
  .van-icn_fixed {
    margin-top: 1px;
  }
  .zhanwei {
    height: 88px;
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

  .classShow {
    font-size: 32px;
    padding: 0;
  }

  .preWrap {
    white-space: pre-wrap;
  }

  .multi-text {
    font-size: 42px;
    color: #333;
    text-align: left;
  }

  .tag-wrap {
    min-height: 140px;
    .basicTitle {
      min-height: 65px;
      // font-size: 42px;
      // color: #999;
    }
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

  .van-separator {
    border-bottom: 1px dotted #ddd;
  }
  .separator-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px dotted #ddd;
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

  .h140 {
    // height: 140px;
    .basicTitle {
      font-size: 42px;
      color: #999;
    }
    .notNull {
      color: #ff0000;
      font-size: 32px;
    }
    .single-text {
      flex: 1;
      margin-left: 10px;
      padding-right: 30px;
      overflow: hidden;
      font-size: 42px;
      text-align: right;
      color: #333;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tipNum {
      position: relative;
      top: -5px;
      font-size: 32px;
      color: #ccc;
    }
    .ctlInput {
      width: 400px;
      text-align: right;
      font-size: 42px;
      color: #333;
    }
    .w450 {
      width: 450px;
    }
    .my-icon {
      padding: 20px 0 20px 20px;
      font-size: 36px;
      color: #ccc;
    }
    .single-img-wrap {
      font-size: 42px;
      color: #ccc;
      .single-img-box {
        width: 100px;
        height: 100px;
        background-color: #eee;
        text-align: center;
        line-height: 100px;
        border-radius: 50%;
        font-size: 32px;
        .single-img-icon {
          font-size: 36px;
          color: #ddd;
        }
      }
    }
    .tip-right {
      font-size: 42px;
      color: #ccc;
    }
  }

  .upload-box {
    text-align: left;
    padding-left: 30px;
    box-sizing: border-box;
  }

  .images-box {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
    // margin-bottom: 16px;
  }

  .upload-file-box {
    .upload-f-txt {
      font-size: 46px;
      color: #690;
    }
    .icon-f-box {
      display: inline-block;
      width: 56px;
      height: 56px;
      background-color: #690;
      border-radius: 12px;
      margin-right: 16px;
      text-align: center;
      line-height: 56px;
      .upload-f-icon {
        font-size: 40px;
        color: #fff;
      }
    }
  }

  .h90 {
    height: 88px;
    border-bottom: 0.2em solid #ddd;
    padding: 0;
    .comboxTitle {
      font-size: 32px;
      columns: #333;
    }
    .btn {
      @include flexC;
      padding: 0 30px;
      height: 88px;
      min-width: 62px;
      font-size: 32px;
      color: #690;
    }
  }

  .edit-html-box {
    position: "relative";
    width: 100%;
    font-size: "30px";
    // min-height: 400px;
  }

  .map-box {
    position: "relative";
    width: 100%;
    height: calc(100vh);
    .map-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 999999999;
      width: 100%;
      padding: 28px 20px;
      box-sizing: border-box;
      background-color: #fff;
      text-align: left;
      .map-custom {
        padding-bottom: 20px;
        font-size: 42px;
        color: #333;
      }
      .map-address {
        font-size: 32px;
        color: #666;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .nav-box {
        position: absolute;
        top: -0.8rem;
        right: 30px;
        width: 1.6rem;
        height: 1.6rem;
        flex-direction: column;
        border-radius: 50%;
        background-color: #4188fc;
        .nav-icn {
          width: 40px;
          height: 40px;
        }
        .nav-txt {
          font-size: 16px;
          color: #eee;
        }
      }
    }
  }

  .map-item {
    position: absolute;
    width: 100%;
    height: calc(100% - 90px);
    top: 0;
    left: 0;
    margin-top: 88px;
    box-sizing: border-box;
    background: #fff;
    z-index: 22222;
  }

  ::placeholder {
    font-size: 32px;
    color: #ccc;
  }

  .no_temp {
    @include flexC;
    font-size: 24px;
    color: #ccc;
    margin: 30px 0;
  }
  .formTop {
    padding-top: 40px;
    @include flexS;
    .left {
      position: relative;
      height: 31px;
      font-size: 31px;
      font-weight: bold;
      color: #333;
      padding-left: 26px;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 9px;
        background: #ff9000;
      }
    }
    a {
      font-size: 24px;
      color: #6b9c09;
      padding-right: 26px;
    }
  }
  .noMore {
    font-size: 24px;
    color: #ccc;
    padding: 30px;
    text-align: center;
  }
}
</style>



<style lang="scss">
@mixin flexSB {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
@mixin flexS {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.form {
  font-family: -apple-system-font, sans-serif;
  .mint-checkbox-label {
    float: left;
  }
  .mint-popup-bottom {
    width: 100%;
  }
  .van-cell:not(:last-child)::after {
    border-bottom: 1px dotted #ddd;
    left: 0;
  }
  .van-hairline--top-bottom::after {
    border: 0;
  }
  .van-cell {
    height: 45px;
    @include flexS;
  }
  .van-cell__title {
    font-size: 21px;
    color: #333;
    text-align: left;
  }
  .van-picker__cancel,
  .van-picker__confirm {
    color: #690;
  }
  .van-uploader__preview-image,
  .van-uploader__upload {
    width: 105px;
    height: 105px;
  }
  .van-uploader__preview-delete {
    color: #ff0000;
  }

  .upload-file-box {
    .van-uploader {
      width: 100%;
      padding-right: 30px;
      box-sizing: border-box;
    }
    .van-uploader__wrapper {
      flex-direction: column;
      flex-wrap: nowrap;
      .van-uploader__preview {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .van-uploader__preview-delete {
          position: static;
        }
        .van-uploader__file {
          width: 300px;
          height: 45px;
          border-bottom: 1px dotted #ddd;
          .van-uploader__file-name {
            margin-top: 0;
            text-align: left;
            font-size: 0.56rem;
            color: #666;
          }
          .van-uploader__file-icon {
            font-size: 36px;
          }
        }
      }
      .van-uploader__file {
        flex-direction: row;
        background-color: #fff;
      }
    }
  }

  .van-icon-clear::before {
    content: "";
  }

  .van-uploader__upload {
    display: none;
  }

  .single-img-wrap {
    display: flex;
    align-items: center;
    .van-uploader {
      margin-left: 20px;
    }
    .van-uploader__preview-image,
    .van-uploader__upload {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .van-uploader__preview {
      margin: 0;
    }
    .van-icon-clear::before {
      content: "";
    }
  }

  .mutil-box {
    .van-cell {
      height: auto;
      .van-field__control {
        font-size: 21px;
        color: #333;
        line-height: 1.2em;
      }
      .van-field__clear {
        position: absolute;
        left: 0;
        bottom: 0;
        font-size: 17px;
        color: #690;
      }
      .van-field__clear::before {
        content: "清空";
      }
      .van-field__word-limit {
        font-size: 16px;
        color: #ccc;
      }
    }
    .van-cell--required::before {
      top: -44px;
      left: 57px;
    }
  }

  .edit-box {
    flex: 1;
    .van-cell {
      height: auto;
      padding-right: 0;
      .van-field__control {
        font-size: 21px;
        color: #333;
        line-height: 1.2em;
        text-align: right;
      }
      .van-field__clear {
        color: #ccc;
      }
    }
  }

  .quill-editor {
    .ql-container.ql-snow {
      border: none;
    }
    .ql-toolbar.ql-snow {
      display: none;
    }
  }
  .ql-editor {
    padding: 0;
  }
}

.icon {
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
  // vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.van-image-preview__index {
  top: 0;
  left: 0;
}

html {
  touch-action: none;
}
</style>