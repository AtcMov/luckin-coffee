// package/pages/pay/pay.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../../store/store'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    to:'',
    fakeData:[
      {url:'/image/pay_img/luck_pay.png',title:'钱包支付'},
      {url:'/image/pay_img/wechat_pay.png',title:'微信支付'},
      {url:'/image/pay_img/Alipay.png',title:'支付宝支付'},
      {url:'/image/pay_img/unionpay.png',title:'银联支付'}
    ],
    i:0
  },
  selectPay(e){
    let i = e.currentTarget.dataset.i
    this.setData({
      i
    })
  },
  toPay(){
    let shop = getApp().globalData.shop
    let way = getApp().globalData.wayType
    let shopData = {shop,way}
    wx.showLoading({
      title: '支付中...',
    })
    setTimeout(() => {
      wx.hideLoading()
      if(this.data.to=='立即购买'){
        this.paymentSuccess(shopData)
        wx.switchTab({
          url: '/pages/order/order',
        })
      }else{
        this.paySuccess(shopData)
        wx.switchTab({
          url: '/pages/order/order',
        })
      }
      
    }, 1500);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      to:options.to
    })
    this.storeBindings = createStoreBindings(this,{
      store,/* 指定需要绑定的store */
      // fields:['payShopData'],/* 指定需要绑定的数据 */
      actions:['paySuccess','paymentSuccess']
    })
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