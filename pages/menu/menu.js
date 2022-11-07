// pages/menu/menu.js
let fakeData =require( '../../fakeData/menu/fakeData.js')/* 假数据 */
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
const computedBehavior = require("miniprogram-computed").behavior;
Page({
  /**
   * 页面的初始数据
   */
  behaviors:[computedBehavior],
  data: {
    way: '', /* 首页跳转参数 */
    menuHeight: '',/* 胶囊适配高度 */
    menuTop: '',/* 胶囊适配，距顶 */
    searchTitle: '开学第一杯',/* 搜索框文字 */
    shop:'',/* 选择门店 */
    km:'',/* 距离 */
    isUnfold: void 0,/* 箭头旋转控制 */
    textList: void 0,/* 文字数据 */
    textHeight:void 0,/* 文字每次滚动距离 */
    i: 0,/* 文字滚动标记索引 */
    usableHeight:'',/* 商品滚动高度 */
    commodityList: void 0,/* 商品列表 */
    anchorI: 0,/* 锚标记索引 */
    to:'to000',/* 锚跳转id */
    showPay:false,/* 结算样式控制 */
    payShopData:'',/* 选购商品数据 */
    shade:false,/* 遮罩 */
    allState:true,/* 全选 */
  },
  initData(){/* 初始化数据，为空数据赋值 */
    this.setData({
      textList:fakeData.textList,
      commodityList:fakeData.commodityList
    })
  },
  selectShop(){/* 选择门店 */
    wx.navigateTo({
      url: '/package/pages/selectShop/selectShop',
    })
  },
  selectWay(e) {/* 点击选择，自提/外送 */
    let way = e.currentTarget.dataset.way
    this.setData({
      way
    })
    getApp().globalData.wayType = way
  },
  unfold() {/* 下拉详情图片 */
    if (this.data.isUnfold) {
      this.setData({
        isUnfold: false
      })
    } else {
      this.setData({
        isUnfold: true
      })
    }
  },
  swiper() { /* 文字滚动 */
    wx.createSelectorQuery().selectAll('.text').boundingClientRect((rect)=>{/* 获取显示区域的高度，赋值给滚动，每次滚动距离=i*显示区域高度 */
      let height = rect[0].height
      this.setData({
        textHeight:height
      })
    }).exec()
    setInterval(() => {
      if (this.data.i == this.data.textList.length) {
        /* 为最后一条，置为第一条 */
        this.setData({
          i: 0
        })
      } else {
        /* 否则，索引自增 */
        this.setData({
          i: this.data.i + 1
        })
      }
    }, 5000)
  },
  selectAnchor(e) {/* 导航点击，添加样式、跳转 */
    let anchorI = e.currentTarget.dataset.index
    this.setData({
      anchorI
    })
    this.setData({
      to:'to00'+anchorI
    })
  },
  getHeight(){/* 获取高度，适配商品高度 */
    wx.createSelectorQuery().selectAll('.menu').boundingClientRect((rect)=>{
      let searchMarginTop = 7.5/* 搜索框距上距离 */
      let menuTop = wx.getMenuButtonBoundingClientRect().top/* 胶囊距上距离 */
      let distTop = rect[0].top+15/* 元素距上距离，15为上边距 */
      let windowHeight = wx.getSystemInfoSync().windowHeight/* 屏幕总高 */
      let tabBarHeight = wx.getSystemInfoSync().screenHeight-windowHeight-wx.getSystemInfoSync().statusBarHeight/* tabBar高度 */
      let capsuleHeight = wx.getMenuButtonBoundingClientRect().height/* 胶囊高度 */
      this.setData({
        usableHeight:windowHeight-searchMarginTop-menuTop-distTop-tabBarHeight-capsuleHeight,
        /* 商品高度=屏幕高度-搜索框上边距-胶囊上边距-元素距上高度-tabBar高度-胶囊高度 */
      })
    }).exec()
  },
  scroll(e){/* 菜单导航栏随滑动变化 */
    wx.createSelectorQuery().selectAll('.commoditys').boundingClientRect((rect)=>{
      let elmHeight = Math.floor(rect[0].height+15)/* 单个元素高度+外边距 */
      let scrollTop = Math.floor(e.detail.scrollTop)/* 滑动距离 */
      this.setData({
        anchorI:Math.floor(scrollTop / elmHeight)/* 元素高度/滑动距离 */
      })
    }).exec()
    if(this.data.showPay){
      this.setData({
        showPay:false
      })
    }
  },
  toDetail(e){/* 跳转详情页 */
    let title = e.currentTarget.dataset.title
    let commodity = this.data.commodityList.find(item=>item.title == title)
    wx.navigateTo({
      url: '../../package/pages/details/details?to=menu&commodity='+JSON.stringify(commodity),
    })
  },
  isShowPay(){/* 结算样式控制 */
    if(this.data.payShopData == ''){/* 判断是否有选购的商品 */
      if(this.data.showPay){/* 没有，判断结算样式状态进行取反 */
        this.setData({
          showPay:false
        })
      }else{
        this.setData({
          showPay:true
        })
      }
    }else{/* 有，判断遮罩状态，这里已经对有选购商品时结算样式显示进行处理，所以只需要对遮罩状态进行判断 */
      if(this.data.shade){/* 进行取反 */
        this.setData({
          shade:false
        })
      }else{
        this.setData({
          shade:true
        })
      }
    }
  },
  isShade(){/* 遮罩控制 */
    if(this.data.shade){
      this.setData({
        shade:false
      })
    }else{
      if(this.data.payShopData != ''){
        this.setData({
          shade:true
        })
      }
    }
    
  },
  isState(e){/* 是否选购商品 */
    let i = e.currentTarget.dataset.index
    let payShopData = this.data.payShopData
    let shopI = 0/* 标记，商品的选中 */
    if(payShopData[i].state){/* 判断是否选中 */
      payShopData[i].state = false/* 选中修改为未选中 */
      this.setData({/* 重新赋值 */
        payShopData
      })
    }else{/* 反之 */
      payShopData[i].state = true
      this.setData({
        payShopData
      })
    }
    for(let i = 0;i<payShopData.length;i++){
      if(payShopData[i].state){/* 当商品选中时 */
        shopI++/* 标记自增1 */
        if(shopI==payShopData.length){/* 当标记==商品的长度，则代表所有选中 */
          this.setData({
            allState:true
          })
        }else{/* 否则代表没全选 */
          this.setData({
            allState:false
          })
        }
      }
    }
  },
  isAllState(){/* 全选控制 */
    let payShopData = this.data.payShopData
    if(this.data.allState){/* 取反 */
      for(let i = 0;i<payShopData.length;i++){
        payShopData[i].state = false
      }
      this.setData({
        allState:false,
        payShopData
      })
    }else{
      for(let i = 0;i<payShopData.length;i++){
        payShopData[i].state = true
      }
      this.setData({
        allState:true,
        payShopData
      })
    }
  },
  delAllShops(){/* 清空购物车 */
    this.setData({
      shade:false
    })
    this.delpayShopData()
  },
  num_add(e){/* 添加杯数 */
    let i = e.currentTarget.dataset.index/* 传递索引 */
    let num  = this.data.payShopData[i].num/* 获取目标num */
    let num_add = Number(num)+1/* 目标num+1 */
    let payShopData = this.data.payShopData
    payShopData[i].num = num_add/* 为num重新赋值 */
    this.setData({/* 重新赋值 */
      payShopData
    })
  },
  num_minus(e){/* 减少杯数 */
    let payShopData = this.data.payShopData
    let i = e.currentTarget.dataset.index/* 传递索引 */
    let num  = payShopData[i].num/* 获取目标num */
    if(num == 1){/* 为1时再次点击减，删除该商品 */
      payShopData.splice(i,1)/* 删除 */
      this.setData({/* 重新赋值 */
        payShopData,
      })
      if(this.data.payShopData.length == 0){/* 为最后一条数据且点击删除时 */
        this.setData({/* 隐藏选购商品 */
          shade:false
        })
      }
    }else{
      let num_add = Number(num)-1/* 目标num+1 */
      payShopData[i].num = num_add/* 为num重新赋值 */
      this.setData({/* 重新赋值 */
        payShopData
      })
    }
    
  },
  toPay(){/* 结算 */
    if(this.data.payShopData==''){
      return 0
    }else{
      wx.navigateTo({
        url: '/package/pages/qrdd/qrdd'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  computed:{/* 计算总价 */
    allPrice(data){
      let price = 0
      for(let i = 0;i<data.payShopData.length;i++){
        price += data.payShopData[i].price*data.payShopData[i].num
      }
      return price
    }
  },
  onLoad(options) {
    this.storeBindings = createStoreBindings(this,{
      store,/* 指定需要绑定的store */
      fields:['payShopData'],/* 指定需要绑定的数据 */
      actions:['delpayShopData']
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.initData()/* 初始化设置 */
    this.getHeight()/* 获取高度 */
    let endData = [] /* 空数组 */
    endData.push(this.data.textList[0]) /* 将文字数据最后一条添加到空数组 */
    this.setData({ /* 胶囊适配 */
      menuHeight: wx.getMenuButtonBoundingClientRect().height + 'px',
      menuTop: wx.getMenuButtonBoundingClientRect().top + 'px'
    })
    this.setData({ /* 合并数组，复制第一条到最后一条 */
      textList: [...this.data.textList, ...endData]
    })
    this.setData({ /* 初识调用一次文字滚动，避免等待5s */
      i: this.data.i + 1
    })
    this.swiper() /* 调用文字滚动 */
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      /* 获取全局变量，复制到way */
      way: getApp().globalData.wayType,
      shop:getApp().globalData.shop,
      km:getApp().globalData.km
    })
    this.setData({
      payShopData:store.payShopData
    })
    let shop = getApp().globalData.shop
    if(shop=='选择门店'){
      wx.navigateTo({
        url: '/package/pages/selectShop/selectShop',
      })
    }else{
      return 0
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