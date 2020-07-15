//点击水波纹效果

import './waves.css'
import Vue from 'vue'
// Vue.directive('waves', { //点击水波纹的效果，只需在元素上添加v-waves
//     bind(el, binding) {
//       el.addEventListener('click', e => {
//         const customOpts = Object.assign({}, binding.value)
//         const zbackgroundcolor=el.getAttribute('color') //传入的背景色
//         const opts = Object.assign({
//           ele: el, // 波纹作用元素
//           type: 'hit', // hit点击位置扩散center中心点扩展
//           color: 'rgba(137, 179, 251, 0.3)' // 波纹颜色
//         }, customOpts)
//         const target = opts.ele
//         if (target) {
//           target.style.position = 'relative'
//           target.style.overflow = 'hidden'
//           const rect = target.getBoundingClientRect()
//           let ripple = target.querySelector('.waves-ripple')
//           if (!ripple) {
//             ripple = document.createElement('span')
//             ripple.className = 'waves-ripple'
//             ripple.style.height = ripple.style.width =  Math.max(rect.width, rect.height)+ 'px'
//             target.appendChild(ripple)
//           } else {
//             ripple.className = 'waves-ripple'
//           }
//           switch (opts.type) {
//             case 'center':
//               ripple.style.top = (rect.height / 2 - ripple.offsetHeight / 2) + 'px'
//               ripple.style.left = (rect.width / 2 - ripple.offsetWidth / 2) + 'px'
//               break
//             default:
//               ripple.style.top = (e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop) + 'px'
//               ripple.style.left = (e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft) + 'px'
//           }
//           if(zbackgroundcolor!=null){
//             ripple.style.backgroundColor=zbackgroundcolor
//           }else{
//             ripple.style.backgroundColor = opts.color
//           }
          
//           ripple.className = 'waves-ripple z-active'
//           return false
//         }
//       }, false)
//     }
//   });

  Vue.directive('waves2', { //点击水波纹的效果，只需在元素上添加v-waves2
    bind(el, binding) {
      el.addEventListener('click', e => {
        const customOpts = Object.assign({}, binding.value)
        const zbackgroundcolor=el.getAttribute('color') //传入的背景色
        const opts = Object.assign({
          ele: el, // 波纹作用元素
          color: 'rgba(0, 0, 0, 0.2)' // 波纹颜色
        }, customOpts)
        const target = opts.ele
        if (target) {
          target.style.position = 'relative'
          target.style.overflow = 'hidden'
          const rect = target.getBoundingClientRect()
          let ripple = target.querySelector('.waves-ripple2')
          if (!ripple) {
            ripple = document.createElement('span')
            ripple.className = 'waves-ripple2'
            ripple.style.height =rect.height+"px"
             ripple.style.width = rect.width+"px"
            target.appendChild(ripple)
          } else {
            ripple.className = 'waves-ripple2'
          }
          ripple.style.top = (rect.height / 2 - ripple.offsetHeight / 2) + 'px'
          ripple.style.left = (rect.width / 2 - ripple.offsetWidth / 2) + 'px'
          
          if(zbackgroundcolor!=null){
            ripple.style.backgroundColor=zbackgroundcolor
          }else{
            ripple.style.backgroundColor = opts.color
          }
          
          ripple.className = 'waves-ripple2 z-active2'
          return false
        }
      }, false)
    }
  });