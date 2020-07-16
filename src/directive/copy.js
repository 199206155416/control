import Vue from 'vue';
import { Toast } from 'vant';


/**
 * v-copy="{title: "...", value: "..."}"
 * v-copy="false" -- 不进行复制
 */
Vue.directive('copy', {
  bind: function (el, binding, vnode) {
    // var s = JSON.stringify
    // var a =
    //   'name: ' + s(binding.name) + '\r\n' +
    //   'value: ' + s(binding.value) + '\r\n' +
    //   'expression: ' + s(binding.expression) + '\r\n' +
    //   'argument: ' + s(binding.arg) + '\r\n' +
    //   'modifiers: ' + s(binding.modifiers) + '\r\n' +
    //   'vnode keys: ' + Object.keys(vnode).join(', ')

    if (!binding.value || !binding.value.value) {
      return
    }

    // 去除空格
    let {value, title="文本"} = binding.value

    value = value.trim()
    title = title.trim()

    el.addEventListener("click", function () {
      const range = document.createRange();
      const tempDiv = document.createElement('div');
      document.body.append(tempDiv)
      tempDiv.innerHTML = title + ":" +value
      tempDiv.style.opacity = 0;
      tempDiv.style.position = "absolute";
      tempDiv.style.userSelect = "all";
      range.selectNode(tempDiv);
      const selection = window.getSelection();
      if (selection.rangeCount > 0) selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      Toast(`"${title}:${value}"已复制到剪贴板`);
      tempDiv.remove()
    }, false);
  }
})

