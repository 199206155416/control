<template>
  <header>
    <div class="flex_bewteen">
      <div v-waves2 class="table_wrap left" @click="$goBack();">
        <i class="table_txt iconfont icon-icon_left"></i>
        <!-- <div class="table_txt">返回</div> -->
      </div>
        <div class="table_txt page-title vant-f15">{{pageSet.pageTitle}}</div>
      <div
        v-if="edit"
        v-waves2
        class="mt_1 page-title page-title-right vant-f15"
        @click="operationHandler"
      >{{pageSet.operation}}</div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "page-header",

  props: {
    pageSet: {
      type: Object,
      default: {}
    }
  },

  computed: {
    ...mapState({
      edit: state => state.detail.edit
    })
  },

  methods: {
    operationHandler() {
      const { pageSet } = this;
      if (pageSet.operation === "编辑") {
        window.location.href = pageSet.operation_url || window.location.href;
      } else {
        this.reload();
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
@mixin flexC {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex_bewteen {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
/* header样式 s*/
header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  box-sizing: border-box;
  height: 88px;
  width: 100%;
  padding: 19px 0;
  background: #fff;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  @include flexS;
  .left {
    position: absolute;
    left: 0;
    @include flexC;
    height: 88px;
    padding: 0 20px;
    font-size: 36px;
    color: #690;
    border-radius: 3px;
  }
  .page-title {
    // @include flexC;
    // height: 88px;
    // margin-right: 32px;
    padding: 0 150px;
    box-sizing: border-box;
    overflow: hidden;
    font-size: 36px;
    color: #333333;
    border-radius: 3px;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .page-title-right {
    position: absolute;
    right: 0;
    @include flexC;
    margin-left: 12px;
    padding: 0 30px;
    height: 88px;
    margin-right: 0;
    color: #690;
  }
}
/* header样式 e*/
</style>