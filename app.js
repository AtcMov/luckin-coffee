// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userData:null,
    userInfo: null,
    capsuleMarginTop:wx.getMenuButtonBoundingClientRect().top,/* 胶囊距上 */
    capsuleHeight:wx.getMenuButtonBoundingClientRect().height,/* 胶囊高 */
    wayType:'自提',/* 首页跳转菜单类型 */
    city:'',/* 当前选择的城市 */
    shop:'选择门店',
    location:'',
    km:''
  }
})
