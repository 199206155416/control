import Vue from 'vue';
import { Toast } from 'vant';

Vue.directive('copy', {
  bind: function (el, binding, vnode) {
    // var s = JSON.stringify
    // el.innerHTML =
    //   'name: ' + s(binding.name) + '<br>' +
    //   'value: ' + s(binding.value) + '<br>' +
    //   'expression: ' + s(binding.expression) + '<br>' +
    //   'argument: ' + s(binding.arg) + '<br>' +
    //   'modifiers: ' + s(binding.modifiers) + '<br>' +
    //   'vnode keys: ' + Object.keys(vnode).join(', ')

    el.onclick = function () {
      const range = document.createRange();
      const tempDiv = document.createElement('div');
      document.body.append(tempDiv)
      tempDiv.innerHTML = "23123"
      tempDiv.style.opacity = 0;
      tempDiv.style.position = "absolute";
      range.selectNode(tempDiv);
      const selection = window.getSelection();
      if (selection.rangeCount > 0) selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      Toast("复制成功！");
      tempDiv.remove()
    }
  }
})

