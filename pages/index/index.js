// pages/index/index.js
let fakeData = require('../../fakeData/index/fakeData.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    meduTop:'',/* 适配胶囊 */
    meduHeight:'',
    bananaList:[],/* 轮播图 */
    isLogin:null,/* 登录判断 */
    activityList:[],/* 福利中心 */
    isloading:false,/* 节流阀 */
    coffeeList:[],/* 原始数据 */
    commodityList:[]/* 模拟数据库数据 */
  },
  initData(){/* 初始化数据 */
    this.setData({
      bananaList:fakeData.bananaList,
      activityList:fakeData.activityList,
      commodityList:fakeData.commodityList
    })
  },
  richScan(){/* 扫一扫 */
    wx.scanCode({
      scanType:['qrCode']/* 只扫描二维码类型 */
    })
  },
  logIn(){/* 跳转登录 */
    wx.navigateTo({
      url: '/package/pages/login/login',
    })
  },
  toMenu(e){/* 跳转菜单页 */
    let way = e.currentTarget.dataset.way
    getApp().globalData.wayType = way
    wx.switchTab({
      url: '../../pages/menu/menu',
    })
  },
  toDetails(e){
      let title = e.currentTarget.dataset.title
      let commodity = this.data.commodityList.find(item=>item.title == title)
      wx.navigateTo({
        url: '../../package/pages/details/details?to=index&commodity='+JSON.stringify(commodity),
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
    this.initData()/* 初始化数据 */
    this.setData({/* 胶囊适配 */
      meduHeight:getApp().globalData.capsuleHeight+'px',
      meduTop:getApp().globalData.capsuleMarginTop+'px'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {/* 页面显示初始化 */
    if(getApp().globalData.userData == null){/* 判断全局变量是否有数据 */
      this.setData({
        isLogin:true
      })
    }else{
      this.setData({
        isLogin:false
      })
    }
    this.setData({/* 清空之前数据 */
      coffeeList:[]
    })
    let randomData = []/* 临时存储请求数据 */
    for(let i = 0;i<4;i++){/* 随机从模拟数据库提取4条数据 */
      randomData.push(fakeData.commodityList[Math.floor(Math.random()*21)])
    }
    this.setData({/* 原始数据和模拟请求数据合并 */
      coffeeList:[...this.data.coffeeList,...randomData]/* 解构赋值 */
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
    let _this = this.data
    if(!_this.isloading){/* 判断节流阀状态 */
      this.setData({
        isloading:true
      })
      let randomData = []
      for(let i = 0;i<4;i++){
        randomData.push(_this.commodityList[Math.floor(Math.random()*21)])
      }
      this.setData({
        coffeeList:[..._this.coffeeList,...randomData]
      })
      setTimeout(() => {/* 模拟网络请求，3s延时后节流阀归位 */
        this.setData({
          isloading:false
        })
      }, 3000)
    }else return/* 已发起请求，不作处理 */
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})