/**
 * 获取元素相对页面的偏移量
 * @param {DOM} el
 */
export const offset = (el) => {
    let oP = el.offsetParent
    let oT = el.offsetTop
    let oL = el.offsetLeft
    window.el = el
  
    while (oP) {
      oT += oP.clientTop + oP.offsetTop
      oL += oP.clientLeft + oP.offsetLeft
      oP = oP.offsetParent
    }
  
    return {
      left: oL,
      top: oT
    }
  }
  
  /**
   * 页面滚动到指定高度位置
   */
  export const winScrollTo = (target) => {
    const scrollH = document.documentElement.scrollHeight || document.body.scrollHeight
    const winH = document.documentElement.clientHeight || document.body.clientHeight
    let curT = document.documentElement.scrollTop || document.body.scrollTop
    const step = 30
    const duration = 30
  
    if (target > scrollH - winH) {
      target = scrollH - winH
    }
  
    if (target < 0) {
      target = 0
    }
  
    if (target > curT) {
      curT += step
      if (target < curT) {
        target = curT
        document.documentElement.scrollTop = document.body.scrollTop = target
        return false
      }
    } else {
      curT -= step
      if (target > curT) {
        target = curT
        document.documentElement.scrollTop = document.body.scrollTop = target
        return false
      }
    }
    document.documentElement.scrollTop = document.body.scrollTop = curT
    setTimeout(winScrollTo, duration, target)
  }
  