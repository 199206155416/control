<template>
  <div id="app">
    <keep-alive>
      <router-view class="Router" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="Router" v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tranName: "slide-right"
    };
  },
  watch: {
    $route(to, from) {
      let isBack = this.$router.isBack; //  监听路由变化时的状态为前进还是后退
      if (isBack) {
        this.tranName = "slide-right";
      } else {
        this.tranName = "slide-left";
      }
      this.$router.isBack = false;
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.mint-msgbox-header {
  display: none !important;
}
.mint-msgbox-message {
  color: #333 !important;
}

/* 隐藏滚动条*/
#app {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none;
}
::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}
.Router {
  overflow-y: scroll;
}
/* 隐藏滚动条*/
/*ios滚动流畅*/
html,
body,
#app,
.Router {
  -webkit-overflow-scrolling: touch;
}
/**/
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
// .danru-enter,
// .danru-leave-to {
//   opacity: 0;
// }
// .danru-enter-to,
// .danru-leave {
//   opacity: 1;
// }
// .danru-enter-active,
// .danru-leave-active {
//   transition: all 0.6s;
// }
/*路由切换动画*/
// .Router {
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   transition: all 0.3s ease;
//   top: 0px;
// }
// .slide-left-enter,
// .slide-right-leave-active {
//   opacity: 0.5;
//   -webkit-transform: translate(100%, 0);
//   transform: translate(100%, 0);
//   will-change: transform;
// }

// .slide-left-leave-active,
// .slide-right-enter {
//   opacity: 0.5;
//   -webkit-transform: translate(-100%, 0);
//   transform: translate(-100% 0);
//   will-change: transform;
// }
</style>
