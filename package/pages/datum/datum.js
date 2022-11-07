// package/pages/datum/datum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[
      /* getApp().globalData.userData.userName */
      {id:'001',title:'用户名',mes:'测试用户001'},
      {id:'002',title:'性别',mes:'男'},
      {id:'003',title:'我的幸运日',mes:'完善信息'},
      {id:'004',title:'关联手机',mes:'123****4567'},
      {id:'005',title:'收货地址',mes:''},
      {id:'006',title:'账户管理',mes:''},
      {id:'007',title:'协议与说明',mes:''}
    ]
  },
  exit(){
    getApp().globalData.userData = null
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})