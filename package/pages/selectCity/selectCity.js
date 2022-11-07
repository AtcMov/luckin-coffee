// package/pages/selectCity/selectCity.js
let {cityList} = require('../../../fakeData/selectCity/city.js')
let qqmap = require('../../../wx-jssdk/qqmap-wx-jssdk')
let map;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usableHeight:void 0,/* 滚动区域高 */
    city:void 0,/* 当前定位城市 */
    cityList:void 0,/* 数据列表 */
    to:void 0,/* 跳转 */
    nowCity:''/* 切换城市 */
  },
  getHeight(){/* 获取高度，适配商品高度 */
    wx.createSelectorQuery().selectAll('.box').boundingClientRect((rect)=>{
      let distTop = rect[0].top/* 元素距上距离，15为上边距 */
      let windowHeight = wx.getSystemInfoSync().windowHeight/* 屏幕总高 */
      this.setData({
        usableHeight:windowHeight-distTop,
        /* 商品高度=屏幕高度-搜索框上边距-胶囊上边距-元素距上高度-tabBar高度-胶囊高度 */
      })
    }).exec()
  },
  toCity(e){/* 跳转 */
    let city = e.target.dataset.city
    this.setData({
      to:city
    })
  },
  selectCity(e){/* 点击切换城市 */
    let city = e.target.dataset.city
    getApp().globalData.city = city/* 全局变量赋值 */
    this.setData({
      nowCity:city
    })
    wx.navigateBack({/* 返回上一级 */
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getHeight()
    this.setData({/* 数据初始化 */
      cityList:cityList.city
    })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    map = new qqmap({/* 调用qqmapAPI */
      key:'BKEBZ-UVTK5-A3GI5-QTX37-TF3V3-PMBMO'
    })
    wx.getLocation({/* 获取经纬度 */
      altitude: 'altitude',
      success:(res)=>{
        map.reverseGeocoder({/* 经纬度转换为真实地址 */
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success:(res)=>{
            let city = res.result.address_component.city.replace('市','')
            this.setData({/* 当前城市定位 */
              city
            })
            if(getApp().globalData.city == ''){/* 判断全局变量值是否为空 */
              this.setData({/* 是，使用定位城市 */
                nowCity:city
              })
            }else{
              this.setData({/* 否，使用全局变量 */
                nowCity:getApp().globalData.city
              })
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})