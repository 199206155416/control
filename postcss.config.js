module.exports = {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: ['Android >= 4.0', 'iOS >= 8'],
      },
      'postcss-pxtorem': {
        rootValue: 75, //根元素字体大小
        propList: ['*'],
        selectorBlackList:['mint', 'van', 'picker',]  //忽略自适应对部分框架组件的影响
      },
    },
  };