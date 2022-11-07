// pages/order/order.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuHeight:void 0,
    menuTop:void 0,
    paySuccessData:''
  },
  toMenu(){
    wx.switchTab({
      url: '../menu/menu',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this,{
      store,/* 指定需要绑定的store */
      fields:['paySuccessData'],/* 指定需要绑定的数据 */
      // actions:['paySuccess']
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({ /* 胶囊适配 */
      menuHeight: wx.getMenuButtonBoundingClientRect().height,
      menuTop: wx.getMenuButtonBoundingClientRect().top
    }) 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      paySuccessData:store.paySuccessData
    })
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