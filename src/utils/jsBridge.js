import { Toast, Indicator,MessageBox  } from 'mint-ui'

const env = process.env.NODE_ENV === 'development' // 环境变量为true时是开发环境
// const env = true;// 环境变量为true时是开发环境
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

// 关闭app
export const closeApp = () => {
  if (env) {
    Toast({
      message: '关闭app',
      position: 'bottom',
      duration: 5000
    })
  } else {
    window.web.closeBroswer()
  }
}

// 获取authTicket
export const getAuthTicket = () => {
  if (env) {
    return '260e4fda1dcfcb42790225da023f92b5'
  } else {
    let authTicket = null
    try {
      authTicket = window.web.getAuth().split(',')[0]
    } catch (e) {
      alert('window.web.getAuth+' + e)
    }
    return authTicket
  }
}

// 获取registrationTicket
export const getRegistrationTicket = () => {
  if (env) {
    return 'f9b9461b134f5d470edff883b140867f'
  } else {
    let registrationTicket = null
    try {
      registrationTicket = window.web.getAuth().split(',')[1]
    } catch (e) {
      alert('window.web.getAuth+' + e)
    }
    return registrationTicket
  }
}

// 提示 (注册到全局)
export const showToast = ({ type, message,iconClass='' }) => {
  if (env) {
    Toast({
      message: message,
      position: 'center',
      iconClass:iconClass
    })
  } else {
    // type - 类型， 1 红色， 2 黄色， 3 绿色
    try {
      window.web.showToast(message, type)
    } catch (e) {
      alert('window.web.showToast+' + e)
    }
  }
}

// 打开加载提示框Indicator
export const openIndicator = () => {
  if (env) {
    Indicator.open()
  } else {
    try {
      let time=300000;
      window.web.showLoadingDialog(time)
    } catch (e) {
      alert('window.web.showLoadingDialog+' + e)
    }
  }
}

// 关闭加载提示框Indicator
export const closeIndicator = () => {
  if (env) {
    Indicator.close()
  } else {
    try {
      window.web.dismissLoadingDialog()
    } catch (e) {
      alert('window.web.dismissLoadingDialog+' + e)
    }
  }
}

//浏览器窗口确认框confirm
export const showConfirm = (msg,callback) => {
  if (env) {
    MessageBox.confirm(msg).then(res =>{
        callback(true)
      }).catch(err =>{
        callback(false)
      })
  } else {
    try {
      let b= window.confirm(msg)
        callback(b)
    } catch (e) {
      alert('window.web.confirm+' + e)
    }
  }
}

// 拨打电话
export const callPhone = (phone) => {
  window.location.href = `tel:${phone}`;
}

// 发送微信消息
export const smsWechat = (phone) => {
  window.location.href = `sms:${phone}`;
}

// 发送微信消息
export const smsQq = (phone) => {
  window.location.href = `sms:${phone}`;
}

// 发送短信
export const smsPhone = (phone) => {
  window.location.href = `sms:${phone}`;
}

// 发送邮件
export const sendEmail = (address) => {
  window.location.href = `mail:${address}`;
}

// 弹窗访问链接
export const clickUrl = (url) => {
  window.location.href = url;
}

// 地图导航
export const mapNav = (keyword) => {
  window.location.href = keyword;
}

// 保存图片
export const saveImage = (url) => {
  window.location.href = url;
}