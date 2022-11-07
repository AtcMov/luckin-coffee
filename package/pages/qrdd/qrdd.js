// package/pages/pay/pay.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../../store/store'
const computedBehavior = require("miniprogram-computed").behavior;
Page({

  /**
   * 页面的初始数据
   */
  behaviors:[computedBehavior],
  data: {
    to:'',
    shop:'',
    location:'',
    way: '', /* 自提/外送 */
    data:''
  },
  selectWay(e) {/* 点击选择，自提/外送 */
    let way = e.currentTarget.dataset.way
    this.setData({
      way
    })
    getApp().globalData.wayType = way
  },
  computed:{
    discount(data){/* 瑞辛优惠 */
      let originalPrice = 0
      let price = 0
      for(let i = 0;i<data.data.length;i++){
        originalPrice += data.data[i].originalPrice*data.data[i].num
        price += data.data[i].price*data.data[i].num
      }
      return originalPrice-price
    },
    payPrice(data){/* 应付 */
      let price = 0
      for(let i = 0;i<data.data.length;i++){
        price += data.data[i].price*data.data[i].num
      }
      return price
    }
  },
  to_pay(){
    wx.navigateTo({
      url: '/package/pages/pay/pay?to='+this.data.to,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this,{
      store,/* 指定需要绑定的store */
      fields:['payShopData','toPayData'],/* 指定需要绑定的数据 */
      // actions:['delpayShopData']
    })
    this.setData({
      to:options.to
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
    this.setData({
      /* 获取全局变量，复制到way */
      way: getApp().globalData.wayType,
      shop:getApp().globalData.shop,
      location:getApp().globalData.location,
    })
    if(this.data.to=='立即购买'){
      this.setData({
        data:store.toPayData
      })
      if(this.data.shop == '选择门店'){
        wx.navigateTo({
          url: '../selectShop/selectShop?takeIn=qrdd',
        })
      }
      // console.log('立即购买');
    }else{ 
      this.setData({
        data:store.payShopData
      })
      if(this.data.shop == '选择门店'){
        wx.navigateTo({
          url: '../selectShop/selectShop',
        })
      }
      // console.log('其他');
    }
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