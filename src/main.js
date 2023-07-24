import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import store from "@/store";
import '@/mock/mockServer'
import 'swiper/css/swiper.css'
import VueLazyload from "vue-lazyload";
import * as API from '@/api'
import logo from '@/assets/logo.png'
import {Button, MessageBox, Form, FormItem, Input} from "element-ui";
Vue.config.productionTip = false
//三级联动注册为全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)




Vue.prototype.$API = API
Vue.prototype.$msgBox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.use(VueLazyload, {
  loading:logo
})
new Vue({
  render: h => h(App),
  router, //组件实例会多两个属性 $route和$router
  store, //组件实例身上会多一个$store
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  mounted(){
    this.$store.dispatch('homeStore/categoryList')
    let arr = []
    arr.push(1)
  }
}).$mount('#app')
