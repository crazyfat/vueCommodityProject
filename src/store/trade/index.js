import {reqGetUserAddress, reqGetTrade} from "@/api";

export default {
    namespaced:true,
    state:{
        userAddressList:[],
        userOrder:{},
        orderInfo:{}
    },
    actions:{
        getUserAddress(context){
            return new Promise((resolve, reject)=>{
                reqGetUserAddress().then(
                    value => {
                        if(value.code==200){
                            console.log('获取用户地址成功',value.data)
                            context.commit('GETUSERADDRESS', value.data)
                            resolve(value)
                        }else{
                            reject(value)
                        }
                    },
                    reason => {
                        reject(reason)
                    }
                )
            })
        },
        getUserOrder(context){
            return new Promise((resolve,reject)=>{
                reqGetTrade().then(
                    value => {
                        if(value.code==200){
                            console.log('商品列表', value.data)
                            context.commit('GETUSERORDER', value.data)
                            resolve(value)
                        }else{
                            reject(value)
                        }
                    },
                    reason => { reject(reason) }
                )
            })
        }
    },
    mutations:{
        GETUSERADDRESS(state, data){
            state.userAddressList = data
        },
        GETUSERORDER(state, data){
            state.userOrder = data
        }
    },
    getters:{}
}