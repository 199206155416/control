/*
常用功能性方法
by chenqichun 20200408
*/
import {showToast} from "./jsBridge"
function codeCopy(message,code){
  let _input = document.createElement("input");   // 直接构建input
      _input.value = `${message} ：${code}`;  //要复制的内容
　　  document.body.appendChild(_input);    // 添加临时实例
      _input.select();   // 选择实例内容
　　  document.execCommand("Copy");   // 执行复制
　　  document.body.removeChild(_input); // 删除临时实例
      showToast({
          type:3,
          message:`已复制${message}到粘贴版`,
          iconClass:'iconfont icon-chenggong'
        })   
}

export default{
    codeCopy
}