import { observable, action } from 'mobx-miniprogram'
export const store = observable({
  payData:'',/* 会员开通数据 */
  payShopData:[],/* 选购商品数据 */
  toPayData:[],/* 立即购买暂存数据 */
  paySuccessData:[],/* 支付完成商品数据 */
  updatePayData:action(function(step){/* 使用箭头函数会导致拿不到payData,会员开通数据 */
    this.payData = step
  }),
  updatePayShopData:action(function(step){/* 商品数据 */
    this.payShopData.push(step)
  }),
  updateNum:action(function(step,num){/* 更新商品数量 */
    this.payShopData[step].num = this.payShopData[step].num+num
  }),
  delpayShopData:action(function(){/* 清空购物车 */
    this.payShopData = []
  }),
  paySuccess:action(function(step){/* 加入购物车支付 */
    let date = new Date()
    let allPrice = 0
    for(let i = 0;i<this.payShopData.length;i++){
      allPrice += this.payShopData[i].price*this.payShopData[i].num
    }
    let time = date.getFullYear()+'-'+Number(date.getUTCMonth()+1)+'-'+Number(date.getUTCDay()-1)
    let data = {shop:step.shop,way:step.way,payShopData:this.payShopData,time,allPrice}
    this.paySuccessData.push(data)
    this.payShopData = []
  }),
  toPay:action(function(step){/* 支付 */
    this.toPayData = []
    this.toPayData.push(step)
  }),
  paymentSuccess:action(function(step){/* 直接支付 */
    let date = new Date()
    let allPrice = 0
    for(let i = 0;i<this.toPayData.length;i++){
      allPrice += this.toPayData[i].price*this.toPayData[i].num
    }
    let time = date.getFullYear()+'-'+Number(date.getUTCMonth()+1)+'-'+Number(date.getUTCDay()-1)
    let data = {shop:step.shop,way:step.way,payShopData:this.toPayData,time,allPrice}
    this.paySuccessData.push(data)
    this.toPayData = []
  })
})