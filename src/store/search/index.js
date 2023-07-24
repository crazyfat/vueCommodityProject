import {reqGetSearchInfo} from "@/api";
export default {
    namespaced:true,
    state : {
        searchList:{}
    },
    actions : {
        getSearchList(context, params={}){
            reqGetSearchInfo(params).then(
                value => {
                    if(value.code==200)
                        context.commit('GETSEARCHLIST', value.data)
                }
            )
        }
    },
    mutations : {
        GETSEARCHLIST(state, searchList){
            state.searchList = searchList
        }
    },
    getters : {
        goodsList(state){
            // 这么写有问题，可能没网，则state.searchList是一个{}
            return state.searchList.goodsList||[]
        },
        attrsList(state){
            return state.searchList.attrsList||[]
        },
        trademarkList(state){
            return state.searchList.trademarkList||[]
        }
    },
}