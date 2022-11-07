// components/toLast/toLast.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    stylelsolation:"isolated"
  },
  properties: {
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    menuHeight:void 0,
    menuTop:void 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toNext(){
      wx.navigateBack({
        delta: 1,
      })
    }
  },
  attached(){
    this.setData({ /* 胶囊适配 */
      menuHeight: wx.getMenuButtonBoundingClientRect().height,
      menuTop: wx.getMenuButtonBoundingClientRect().top
    })
  }
})
