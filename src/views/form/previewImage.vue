<template>
  <div>
    <div class="flex_bewteen preview-savebox">
      <div v-waves2 class="table_wrap left" @click="$goBack();">
        <i class="table_txt iconfont icon-icon_left"></i>
      </div>
      <div class="table_wrap">
        <div class="table_txt page-title">
          {{ imgIndex + 1 }}/{{ previewImages.length }}
        </div>
      </div>
      <div v-waves2 class="mt_1 page-title page-title-right" @click="saveImage(previewImages[imgIndex])">
        <span>{{previewSave ? '保存' : ''}}</span>
      </div>
    </div>
    <div class="txt-box" v-if="previewImages.length > 1">
      <div class="txt">左右滑动切换图片</div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';

export default {
  name: "previewImage",
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  data() {
    return {
      pageTitle: "新建客户",
      previewShow: false,
      previewSave: false,
      startIndex: 0,
      previewImages: [],
      imgIndex: 0,
      instance: null,
    };
  },
  beforeRouteLeave (to, from, next) {
    console.log('this.instance', this.instance)
    this.instance.close();
    next();
  },
  methods: {
    saveImage(url) {
      if(!this.previewSave) return;
      console.log('saveImage');
      this.$saveImage(url);
    },
    onPreviewChange(index) {
      console.log('onPreviewChange index', index)
      this.imgIndex = index || 0;
    },
    clickUrl(item) {
      this.$clickUrl(item.ctl_value);
    },


    previewImgs(item, startPosition) {
      // console.log('previewImg', item.arr)
      // this.previewImages = item.arr;
      // this.startIndex = startPosition;
      this.previewShow = true;
      // this.previewSave = item.image_saveas;
      // console.log('previewImg', this.previewShow)
      // this.onPreviewChange(startPosition);
      ImagePreview({images: item.arr, startPosition, showIndex: false, onChange: e => this.onPreviewChange(e),  });
      // this.$nextTick(()=>{
      //   this.previewShow = true;
      // });
    },


  },
  created() {
    console.log('this.$route', this.$route);
    const { images, startPosition, previewSave } = this.$route.params;
    this.instance = ImagePreview({images, startPosition, showIndex: false, onChange: e => this.onPreviewChange(e), asyncClose: true, });
    this.previewSave = previewSave;
    this.previewImages = images;
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
@mixin flexC {
  display: flex;
  align-items: center;
  justify-content: center;
}
@mixin flexS {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.preview-savebox {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  box-sizing: border-box;
  height: 88px;
  width: 100vw;
  background: #1b1b1b;
  z-index: 3000;
  .left {
    @include flexC;
    width: 58px;
    height: 58px;
    margin-left: 20px;
    margin-right: 46px;
    font-size: 36px;
    color: #ffffff;
    border-radius: 3px;
  }
  .page-title {
    // @include flexC;
    // height: 88px;
    font-size: 36px;
    color: #ffffff;
    border-radius: 3px;
    text-align: left;
    text-overflow: ellipsis;
    white-space:nowrap;
    overflow: hidden;
  }
  .page-title-right {
    min-width: 124px;
    min-height: 40px;
    padding: 5px 26px;
    box-sizing: border-box;
  }
}

.txt-box {
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 100vw;
  z-index: 3000;
  .txt {
    @include flexC;
    font-size:30px;
    color: #555555;
  }
}

</style>
