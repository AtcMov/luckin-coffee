// package/pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHintFalg:false,/* 提示文本 */
    hintText:'',
    isTrueFalg:false,/* 协议按钮变量 */
  },
  phoneLogin(){/* 手机号登录 */
    this.setData({
      hintText:'请使用微信一键登录',
      isHintFalg:true
    })
    setTimeout(() => {
      this.setData({
        isHintFalg:false
      })
    }, 1500);
  },
  WeChatLogin(){/* 微信登录 */
    if(this.data.isTrueFalg){/* 判读是否勾选协议 */
      /* 本地存储用户数据 */
      let userData = {/* 用户数据 */
        userName:'测试用户001',
        grade:'Lv1 小蓝鹿',
        experience:0
      }
      getApp().globalData.userData = userData/* 本地存储 */
      wx.navigateBack({/* 返回上一级 */
        delta: 0,
      })
    }else{
      this.setData({
        hintText:'请阅读并勾选底部协议',
        isHintFalg:true
      })
      setTimeout(() => {
        this.setData({
          isHintFalg:false
        })
      }, 1500);
    }
  },
  isTrue(){/* 协议按钮点击样式，取反 */
    if(this.data.isTrueFalg){
      this.setData({
        isTrueFalg:false
      })
    }else{
      this.setData({
        isTrueFalg:true
      })
    }
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