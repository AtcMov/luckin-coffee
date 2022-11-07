// components/luckin-card/luckin-card.js
import { createStoreBindings, storeBindingsBehavior } from 'mobx-miniprogram-bindings'
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
      {tiem:'30天(连续包月)',current_price:'9.90',original_price:'19.90',hint:'省心自动续费',hintElse:''},
      {tiem:'30天',current_price:'15.90',original_price:'19.90',hint:'最高可省',hintElse:'673元'},
    ],
    benefitList:[/* 开通特权数据 */
      {url:'/image/card_img/benefit_01.png',title:'首杯￥10.9',hint:'限量开'},
      {url:'/image/card_img/benefit_02.png',title:'每期8杯特价',hint:'￥10起'},
      {url:'/image/card_img/benefit_03.png',title:'无限量折扣',hint:'4.8折起'}
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
