// package/pages/selectShop/selectShop.js
let qqmap = require('../../../wx-jssdk/qqmap-wx-jssdk')
let map;
let fakeData = require('../../../fakeData/selectShop/fakeData')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:'',/* 商品数据 */
    searchShopList:'',/* 搜索商品数据 */
    city:'',/* 城市 */
    selectTitle:'输入地址寻找周边门店',/* 提示文本 */
    usableHeight:void 0,/* 店铺列表高度 */
    value:'',
    shop:'',
  },
  getHeight(){/* 获取高度，适配商品高度 */
    wx.createSelectorQuery().selectAll('.selectShop').boundingClientRect((rect)=>{
      let distTop = rect[0].top/* 元素距上距离，15为上边距 */
      let windowHeight = wx.getSystemInfoSync().windowHeight/* 屏幕总高 */
      this.setData({
        usableHeight:windowHeight-distTop,
        /* 商品高度=屏幕高度-元素距上高度 */
      })
    }).exec()
  },
  toSelectCity(){/* 前往选择地址 */
    wx.navigateTo({
      url: '/package/pages/selectCity/selectCity',
    })
  },
  searchShop(){/* 搜索 */
    let value = this.data.value
    let shopList = this.data.shopList.filter(item=>{/* 过滤 */
      return item.shopName.indexOf(value) != -1
    })
    this.setData({/* 赋值 */
      searchShopList:shopList
    })
  },
  isCityNull(){/* 是否切换了城市 */
    let city = getApp().globalData.city
    if(this.data.city == '')/* 未切换，使用定位 */{
      map = new qqmap({
        key:'BKEBZ-UVTK5-A3GI5-QTX37-TF3V3-PMBMO'
      })
      wx.getLocation({
        altitude: 'altitude',
        success:(res)=>{
          map.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success:(res)=>{
              let city = res.result.address_component.city.replace('市','')
              this.setData({
                city
              })
            }
          })
        }
      })
    }else{/* 切换，使用切换 */
      this.setData({
        city
      })
    }
  },
  selectShop(e){/* 选择店铺 */
    let shop = e.currentTarget.dataset.shop
    let location = e.currentTarget.dataset.location
    let km = e.currentTarget.dataset.km
    getApp().globalData.shop = shop
    getApp().globalData.location = location
    getApp().globalData.km = km
    this.setData({
      shop
    })
    wx.navigateBack({
      delta: 1,
    })

  },
  mapNavigation(e){/* 地图导航 */
    let latitude = Number(e.currentTarget.dataset.latitude)
    let longitude = Number(e.currentTarget.dataset.longitude)
    wx.openLocation({
      latitude,
      longitude
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
    let shopList = fakeData.shopList.sort((a,b)=>{return a.km-b.km})/* 根据距离排序 */
    this.setData({/* 数据赋值 */
      shopList
    })
    this.getHeight()
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.isCityNull()
    if(getApp().globalData.shop !='选择门店'){
      this.setData({
        shop:getApp().globalData.shop
      })
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