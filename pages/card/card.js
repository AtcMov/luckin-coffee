// pages/card/card.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
/* mobx，全局数据共享 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top:void 0,/* 适配胶囊 */
    current:0,/* 轮播图索引 */
    imgList:[/* 图片数据 */
      {url:"/image/card_img/card_1.png"},
      {url:"/image/card_img/card_2.png"},
      {url:"/image/card_img/card_3.png"}
    ],
    marginBottom:void 0,/* 基线对齐 */
    isTrue:false,/* 是否同意协议 */
    shade:false
  },
  bindchange(e){/* 滑动事件 */
    let current = e.detail.current/* 获取索引 */
    this.setData({
      current
    })
  },
  align(){/* 对齐 */
    wx.createSelectorQuery().selectAll('.pay').boundingClientRect((rect)=>{
      let payHeight = Math.floor(rect[0].height)
      wx.createSelectorQuery().selectAll('.payText').boundingClientRect((rect)=>{
        let payTextHeight = Math.floor(rect[0].height)
        let marginBottom = (payHeight-payTextHeight)/2
        this.setData({
          marginBottom
        })
      }).exec()
    }).exec()
  },
  isRead(){/* 是否同意协议 */
    if(this.data.isTrue){
      this.setData({
        isTrue:false
      })
    }else{
      this.setData({
        isTrue:true
      })
    }
    
  },
  isShade(){/* 是否显示遮罩 */
    if(this.data.isTrue){
      this.setData({
        shade:false
      })
    }else{
      this.setData({
        shade:true
      })
      setTimeout(() => {
        this.setData({
          shade:false
        })
      }, 1500);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this,{
      store,/* 指定需要绑定的store */
      fields:['payData']/* 指定需要绑定的数据 */
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {/* 适配胶囊 */
    let capsuleMarginTop = getApp().globalData.capsuleMarginTop
    let capsuleHeight = getApp().globalData.capsuleHeight
    let top = Number(capsuleMarginTop)+Number(capsuleHeight)
    this.setData({
      top
    })
    this.align()/* 调用基线对齐 */
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
    this.storeBindings.destroyStoreBindings()/* 监听页面卸载 */
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