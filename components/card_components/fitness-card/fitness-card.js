// components/fitness-card/fitness-card.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../../store/store'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
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
    carouselList:[/* 开通方式数据 */
      {tiem:'30天',current_price:'25.00',original_price:'50.00',hint:'一份价格，双份权益',hintElse:''}
    ],
    benefitList:[/* 特权数据 */
      {url:'/image/card_img/fitness_01.png',title:'美式￥10起'},
      {url:'/image/card_img/fitness_02.png',title:'气泡咖啡￥14起'},
      {url:'/image/card_img/fitness_03.png',title:'冰萃咖啡￥14起'},
      {url:'/image/card_img/fitness_04.png',title:'烘焙轻食5.2折'},
      {url:'/image/card_img/fitness_05.png',title:'训练计划'},
      {url:'/image/card_img/fitness_06.png',title:'会员专属课'},
      {url:'/image/card_img/fitness_07.png',title:'直播课程'},
      {url:'/image/card_img/fitness_08.png',title:'饮食分析'}
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes:{
    attached(){
      this.updatePayData(this.data.carouselList[0])
    }
  }
})
