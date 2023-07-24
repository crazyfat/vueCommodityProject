//统一管理api接口
import requests from "@/api/request";
import mockRequest from "@/api/mock"

//三级联动接口
// /api/product/getBaseCategoryList/api/product/getBaseCategoryList  get请求无参数

export const reqCategoryList = ()=>{
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}

export const reqBannerList = ()=>{
    return mockRequest({
        url:'/banner',
        method:'get'
    })
}

export const reqFloorList = ()=>{
    return mockRequest({
        url:'/floors',
        method:'get'
    })
}

export const reqGetSearchInfo = (params)=>{
    return requests({
        url:'/list',
        method:'post',
        data:params
    })
}

export const reqGoodInfo =(skuId)=> {
    return requests({
        url: `/item/${skuId}`,
        method: 'get',
    })
}

export const reqAddOrUpdateShopCart = (skuId, skuNum)=>{
        return requests({
            url:`/cart/addToCart/${skuId}/${skuNum}`,
            method:'post'
        })
}

export const reqCartList = ()=>{
    return requests({
        url:'/cart/cartList',
        method:'get'
    })
}

export const delCart = (skuId)=>{
    return requests({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}

export const reqUpdateChecked = (skuId, isChecked)=>{
    return requests({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}

export const reqSendCode = (phone)=>{
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:'get'
    })
}

export const reqRegiser = (data)=>{
    return requests({
        url:"/user/passport/register",
        data,
        method:'post'
    })
}

export const reqLogin = (data)=>{
    return requests({
        url:"/user/passport/login",
        data,
        method:'post'
    })
}

//获取用户信息 token放在请求头
export const reqUserInfo = ()=>{
    return requests({
        url:"/user/passport/auth/getUserInfo",
        method:'get'
    })
}

export const reqLogOut = ()=>{
    return requests({
        url:"/user/passport/logout",
        method:'get'
    })
}

export const reqGetUserAddress = ()=>{
    return requests({
        url:"/user/userAddress/auth/findUserAddressList",
        method:'get'
    })
}

export const reqGetTrade = ()=>{
    return requests({
        url:"/order/auth/trade",
        method:'get'
    })
}

export const reqSubmitOrder = (tradeNo, tradeInfo) =>{
    return requests({
        url:`/order/auth/submitOrder/?tradeNo=${tradeNo}`,
        method:'post',
        data:tradeInfo
    })
}

export const reqPayInfo = (orderId)=>{
    return requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}

export const reqOrderStatus = (orderId)=>{
    return requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}

export const reqMyOrder = (page, limit) =>{
    return requests({
        url:`/order/auth/${page}/${limit}`,
        methods:'get'
    })
}