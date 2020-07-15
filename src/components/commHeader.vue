<template>
  <div class="headerWrap">
    <div class="zhanwei"></div>
    <header class="header">
      <slot name="left"></slot>
        <div class="header_title_text ellipsis">{{title}}</div>
      <slot name="right"></slot>
    </header>
  </div>
</template>

<script>
export default {
  // 外部组件传递给此组件的属性
  name:'commHeader',
  props: {
    title: String
  }
}
</script>


<style lang="scss"  scoped>
.headerWrap{
 .zhanwei{height:86px}
 .header{
   position:fixed;
   z-index: 100;
   width:100%;
   top:0;
   left:0;
   height:86px;
   display: flex;
   justify-content: center;
   box-sizing: border-box;
   background:#fff;
   border-bottom: 1px solid #ccc;
   .header_left,.header_right{
     height: 100%;
     display: flex;
     align-items: center;
     color: #333;
     font-size:28px;
     i{font-size: 36px;}
     }
   .header_left{padding-left:10px;}
   .header_right{padding-right:30px;}
   .header_title_text{
     height: 86px;
     padding:0 10px;
     box-sizing:border-box;
     line-height: 86px;
     text-align: center;
     color: #333;
     font-size: 32px;
     flex: 1;
     white-space: nowrap;
     text-overflow: ellipsis;
     overflow: hidden;
   }
 }
}
</style>
