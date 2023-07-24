import Vuex from 'vuex'
import Vue from "vue";
import home from "@/store/home";
import search from "@/store/search";
import detail from "@/store/detail";
import cart from "@/store/cart";
import user from "@/store/user";
import trade from "@/store/trade"
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        homeStore:home,
        searchStore:search,
        detailStore:detail,
        cartStore:cart,
        userStore:user,
        tradeStore:trade
    }
})