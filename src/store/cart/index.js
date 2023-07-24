import {reqCartList} from "@/api";
export default {
    namespaced:true,
    state:{
        cartList:{}
    },
    actions:{
        getCartList(context){
            reqCartList().then(
                value => {
                    if(value.code==200)
                        context.commit('GETCARTLIST', value.data[0])
                }
            )
        }
    },
    mutations:{
        GETCARTLIST(state, carList){
            state.cartList = carList || {}
        }
    },
    getters:{
        cartListInfo(state){
            console.log(state.cartList.cartInfoList)
            return state.cartList.cartInfoList || []
        }
    }
}