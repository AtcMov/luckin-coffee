// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData:{},/* 预设用户数据 */
    fakeData:[
      {icon:'/image/my_img/my_01.png',title:'我的订单'},
      {icon:'/image/my_img/my_02.png',title:'咖啡钱包'},
      {icon:'/image/my_img/my_03.png',title:'优惠卷'},
      {icon:'/image/my_img/my_04.png',title:'礼品卡'},
      {icon:'/image/my_img/my_05.png',title:'账户余额'},
      {icon:'/image/my_img/my_06.png',title:'发票管理'},
      {icon:'/image/my_img/my_07.png',title:'兑换优惠'},
      {icon:'/image/my_img/my_08.png',title:'帮助反馈'},
      {icon:'/image/my_img/my_09.png',title:'招商加盟'},
      {icon:'/image/my_img/my_10.png',title:'口味定制'}
    ],
    dropDown:true/* 下拉 */
  },
  logIn(){/* 登录/注册 */
    if(getApp().globalData.userData == null){/* 判断用户是否登录，未登录 => 跳转登录 */
      wx.navigateTo({
        url: '/package/pages/login/login',
      })
    }else{/* 登录 => 跳转个人资料 */
      wx.navigateTo({
        url: '/package/pages/datum/datum',
      })
    }
    
  },
  isDropDown(){/* 是否下拉 */
    this.setData({
      dropDown:!this.data.dropDown
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
    let userData = {/* 预设用户数据 */
      userName:'登录/注册',
      grade:'欢迎~Luckin新朋友',
      experience:0
    }
    if(getApp().globalData.userData == null){/* 判断是否登录，登录=>写入数据 */
      this.setData({
        userData
      })
    }else{
      this.setData({
        userData:getApp().globalData.userData
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