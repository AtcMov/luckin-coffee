// components/card-open-vip/card-open-vip.js
import { createStoreBindings, storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../../store/store'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    carouselList:Object,
    hint:String
  },
  options:{
    styleIsolation:"isolated"
  },
  behaviors:[storeBindingsBehavior],
  storeBindings:{
    store,
    actions:{
      updatePayData:'updatePayData'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    i:0/* 点击索引 */
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectVip(e){/* 开通方式选择 */
      let i = e.currentTarget.dataset.i
      this.setData({
        i
      })
      this.updatePayData(this.data.carouselList[i])
    },
  }
})
