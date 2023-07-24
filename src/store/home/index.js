import {reqCategoryList, reqBannerList, reqFloorList} from "@/api";
export default {
    namespaced:true,
    state : {
        // 默认初始值不要乱写 服务器是对象，初始空对象，服务器对象，服务器空对象
        categoryList:[],
        bannerList:[],
        floorList:[]
    },

    actions : {
        categoryList(context){
            reqCategoryList().then(
                value => {
                    if(value.code==200)
                        context.commit('CATEGORYLIST',value.data)
                }
            )
        },
        bannerList(context){
            reqBannerList().then(
                value => {
                    if(value.code==200)
                        context.commit('BANNERLIST', value.data)
                }
            )
        },
        floorList(context){
            reqFloorList().then(
                value => {
                    if(value.code==200)
                        context.commit('FLOORLIST', value.data)
                }
            )
        }
    },

    mutations : {
        CATEGORYLIST(state, categoryList){
            state.categoryList = categoryList || []
        },
        BANNERLIST(state, bannerList){
            state.bannerList = bannerList || []
        },
        FLOORLIST(state, floorList){
            state.floorList = floorList || []
        }

    },

    getters : {},
}