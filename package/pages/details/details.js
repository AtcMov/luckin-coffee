// pages/details/details.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../../store/store'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // to:void 0,/* 从哪里跳转过来 */
    commodity:void 0,/* 原始数据 */
    capsuleMarginTop:'',/* 适配，胶囊距上距离 */
    capsuleHeight:'',/* 适配，胶囊高度 */
    select_0:0,/* 杯型 */
    select_1:0,/* 温度 */
    select_2:0,/* 糖度 */
    sizeName_0:'',/* 杯型 */
    sizeName_1:'',/* 温度 */
    sizeName_2:'',/* 糖度 */
    price_0:0,/* 杯型价格 */
    price_1:0,/* 温度价格 */
    price_2:0,/* 糖度价格 */
    allPrice:0,/* 总价 */
    num:1,/* 杯数 */
    flag:true
  },
  toBack(){/* 回退 */
    // if(this.data.to=='index'){/* 判断跳转 */
    //   wx.switchTab({
    //     url: '/pages/index/index',
    //   })
    // }else{
      wx.switchTab({
        url: '/pages/menu/menu'
      })
    // }
  },
  selectSize(e){/* 用户选择口味 */
    let index = e.target.dataset.index/* 选中口味 */
    let num = e.target.dataset.num/* 杯型、温度、糖度索引 */
    let price = e.target.dataset.price/* 价格 */
    let name = e.target.dataset.name/* 口味选择 */
    if(num==0){
      this.setData({
        select_0:index,
        sizeName_0:name,
        price_0:Number(price),
      })
      this.setData({/* 如果与上方合并会出现价格合并错误，因为price_0获取的不是实时的值，而是上次的值 */
        allPrice:Number(this.data.commodity.price)+this.data.price_0+this.data.price_1+this.data.price_2
      })
    }else if(num==1){
      this.setData({
        select_1:index,
        sizeName_1:name,
        price_1:Number(price)
      })
      this.setData({
        allPrice:Number(this.data.commodity.price)+this.data.price_0+this.data.price_1+this.data.price_2
      })
    }else{
      this.setData({
        select_2:index,
        sizeName_2:name,
        price_2:Number(price)
      })
      this.setData({
        allPrice:Number(this.data.commodity.price)+this.data.price_0+this.data.price_1+this.data.price_2
      })
    }
  },
  add(){/* 杯数，加 */
    this.setData({
      num:this.data.num+1
    })
  },
  minus(){/* 杯数，减 */
    if(this.data.num==1){
      return 0
    }else{
      this.setData({
        num:this.data.num-1
      })
    }
    
  },
  nowPay(){/* 立即购买 */
    let commodity = {
      title:this.data.commodity.title,
      url:this.data.commodity.url,
      price:this.data.allPrice,
      originalPrice:this.data.commodity.originalPrice,
      information:this.data.sizeName_0+'+'+this.data.price_0+'/'+this.data.sizeName_1+'+'+this.data.price_1+'/'+this.data.sizeName_2+'+'+this.data.price_2,
      num:this.data.num,
    }
    this.toPay(commodity)
    wx.navigateTo({
      url: '/package/pages/qrdd/qrdd?to=立即购买'
    })
  },
  addShop(){/* 加入购物车 */
    let commodity = {
      title:this.data.commodity.title,
      url:this.data.commodity.url,
      price:this.data.allPrice,
      originalPrice:this.data.commodity.originalPrice,
      information:this.data.sizeName_0+'+'+this.data.price_0+'/'+this.data.sizeName_1+'+'+this.data.price_1+'/'+this.data.sizeName_2+'+'+this.data.price_2,
      num:this.data.num,
      state:true
    }
    if(store.payShopData.length==0){/* 初识化处理，没数据时，添加一条数据 */
      this.updatePayShopData(commodity)
      this.toBack()
    }else{/* 有数据时 */
      store.payShopData.filter(item=>{/* 过滤，合并处理 */
        if(item.title == commodity.title){/* 商品名相同 */
          if(item.information == commodity.information ){/* 规格相同 */
            let i = item.title.indexOf(commodity.title)/* 获取商品所在索引 */
            this.updateNum(i,this.data.num)/* 修改数量 */
            this.toBack()/* 返回 */
          }else{/* 商品名相同，规则不同，添加数据 */
            if(this.data.flag){/* 只执行一次 */
              this.updatePayShopData(commodity)
              this.toBack()
              this.setData({
                flag:false
              })
            }else{
              return 0
            }
            
          }      
        }else{/* 都不相同，添加数 */
          if(this.data.flag){
            this.updatePayShopData(commodity)
            this.toBack()
            this.setData({
              flag:false
            })
          }else{
            return 0
          }
        }
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {/* 接收跳转参数 */
    this.setData({
      // to:options.to,/* 从哪里跳转 */
      commodity:JSON.parse(options.commodity)/* 数据 */
    })
    this.storeBindings = createStoreBindings(this,{
      store,/* 指定需要绑定的store */
      fields:['payShopData'],/* 指定需要绑定的数据 */
      actions:['updatePayShopData','updateNum','toPay']
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({/* 胶囊适配 */
      capsuleMarginTop:getApp().globalData.capsuleMarginTop,
      capsuleHeight:getApp().globalData.capsuleHeight
    })
    this.setData({/* 设置初始值 */
      sizeName_0:this.data.commodity.information[0].select[0].size,
      sizeName_1:this.data.commodity.information[1].select[0].size,
      sizeName_2:this.data.commodity.information[2].select[0].size,
      price_0:Number(this.data.commodity.information[0].select[0].price),
      price_1:Number(this.data.commodity.information[1].select[0].price),
      price_2:Number(this.data.commodity.information[2].select[0].price)
    })
    this.setData({/* 设置初识总价 */
      allPrice:Number(this.data.commodity.price)+this.data.price_0+this.data.price_1+this.data.price_2
    })
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