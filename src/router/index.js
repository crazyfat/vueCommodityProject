import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/myOrder";
import GroupOrder from "@/pages/Center/groupOrder";
import store from "@/store";

let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location, resolve, reject){
    if(reject && reject){
        originPush.call(this, location, resolve, reject)
    }else{
        originPush.call(this, location, ()=>{}, ()=>{})
    }
}

//配置路由
let router =  new VueRouter({
    routes:[
        {
            name:'Home',
            path:'/home',
            component:Home,
            meta:{
                showFooter:true
            }
        },
        {
            name:'Search',
            path:'/search/:keyword?',
            component:Search,
            meta:{
                showFooter:true
            }
        },
        {
            name:'Login',
            path:'/login',
            component:Login,
            meta:{
                showFooter:false
            }
        },
        {
            name:'Register',
            path:'/register',
            component:Register,
            meta:{
                showFooter:false
            }
        },
        {
            name:'Detail',
            path:'/detail/:skuId',
            component:Detail,

        },
        {
          name:'AddCartSuccess',
          path:'/addCartSucess/:skuId/:skuNum',
          component:AddCartSuccess,
        },
        {
          name:'ShopCart',
          path:'/shopCart',
          component:ShopCart
        },
        {
            name:'Trade',
            path:'/trade',
            component:Trade,
            beforeEnter:(to, from, next)=>{
                if(from.path=='/shopCart')
                    next()
                else
                    next(false)
            }
        },
        {
            name:'Pay',
            path:'/pay/:orderId',
            component:Pay,
            beforeEnter:(to, from, next)=>{
                if(from.path=='/trade')
                    next()
                else
                    next(false)
            }
        },
        {
          name:'PaySuccess',
          path:'/PaySuccess/:orderId',
          component:PaySuccess
        },
        {
            name:'Center',
            path:'/center',
            component:Center,
            children:[
                {
                    name:'MyOrder',
                    path:'myorder',
                    component:MyOrder
                },
                {
                    name:'GroupOrder',
                    path:'grouporder',
                    component:GroupOrder
                },{
                    path:'/center',
                    redirect:'/center/myorder'
                }
            ]

        },
        //重定向
        {
            path:'*',
            redirect:'/home'
        }
    ],
    scrollBehavior(to,from, savedPosition){
        return {y:0}
    }
})
router.beforeEach((to, from, next)=>{
    let token = localStorage.getItem('user_token')
    let name = store.state.userStore.userInfo.name
    if(token){
        if(to.path=='/login'||to.path=='/register'){
            next('/')
        }else{
            //已经登录了并且拥有用户信息
            if(name){
                next()
            }else{
                store.dispatch('userStore/getUserInfo').then(
                    () =>{
                        next()
                    },
                    () => {
                        alert('token过期')
                        store.dispatch('userStore/userLogOut').then(
                            ()=>{next('/login')},
                            ()=>{alert('退出失败')}
                        )
                    }
                )
            }
        }
    }else{
        let toPath = to.path
        if(toPath.includes('/trade')||toPath.includes('/center')||toPath.includes('/poay')){
            next('/login?redirect='+toPath)
        }else
            next()
    }
})


export default router
