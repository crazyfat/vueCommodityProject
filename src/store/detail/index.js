import {reqGoodInfo, reqAddOrUpdateShopCart} from "@/api";
import {getID} from "@/utils/nanoid_token";
export default {
    namespaced:true,
    state:{
        goodInfo:{},
        nanoid_token:getID()
    },
    actions:{
        getGoodInfo(context, skuId){
            reqGoodInfo(skuId).then(
                value => {
                    if(value.code==200){
                        context.commit('GETGOOODINFO', value.data)
                    }
                }
            )
        },
        addOrUpdateShopCart(context, {skuId, skuNum}){
            // console.log(skuId, skuNum)
            return  reqAddOrUpdateShopCart(skuId, skuNum)
        }
    },
    mutations:{
        GETGOOODINFO(state, data){
            state.goodInfo = data
        }
    },
    getters:{
        categoryView(state){
            return state.goodInfo.categoryView || {}
        },
        price(state){
            return state.goodInfo.price
        },
        skuInfo(state){
            return state.goodInfo.skuInfo || {}
        },
        spuSaleAttrList(state){
            return state.goodInfo.spuSaleAttrList
        },
        valuesSkuJson(state){
            return state.goodInfo.valuesSkuJson
        }

    }
}