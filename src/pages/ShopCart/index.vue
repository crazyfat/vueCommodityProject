<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(skuInfo, index) of cartListInfo" :key="skuInfo.skuId">
          <li class="cart-list-con1">
            <input type="checkbox"
                   name="chk_list"
                   :checked="skuInfo.isChecked==1"
                   @click="updateChecked(skuInfo.skuId, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="skuInfo.imgUrl">
            <div class="item-msg">{{skuInfo.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{skuInfo.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="subNum(index)">-</a>
            <input autocomplete="off" type="text" :value="skuInfo.skuNum" minnum="1" class="itxt"
                   @change="changeNum(index, $event)">
            <a href="javascript:void(0)" class="plus" @click="addNum(index)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ skuInfo.skuNum*skuInfo.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(skuInfo.skuId)">删除</a>
            <br>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="selected" >
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteChecked">删除选中的商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}.00</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn" href="###" >结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
  import {reqAddOrUpdateShopCart, delCart, reqUpdateChecked} from "@/api";
  import {throttle} from 'lodash'
  export default {
    name: 'ShopCart',
    data(){
      return {

      }
    },
    methods:{
      changeNum(index, e){
        let skuId = this.cartListInfo[index].skuId, sub = e.target.value-this.cartListInfo[index].skuNum
        reqAddOrUpdateShopCart(skuId, sub).then(
            value => {
              this.$store.dispatch('cartStore/getCartList')
            },
            reason => {console.log(reason)}
        )
      },
      addNum:throttle(function (index){
        let skuId = this.cartListInfo[index].skuId
        reqAddOrUpdateShopCart(skuId, 1).then(
            value => {
              this.$store.dispatch('cartStore/getCartList')
            }
        )
      }, 1000),
      subNum:throttle(function (index){
        let skuId = this.cartListInfo[index].skuId
        reqAddOrUpdateShopCart(skuId, -1).then(
            value => {
              this.$store.dispatch('cartStore/getCartList')
            }
        )
      }, 1000),
      deleteCart(id){
        delCart(id).then(
            value => {
              this.$store.dispatch('cartStore/getCartList')
            }
        )
      },
      updateChecked(skuId, e){
        let isChecked = e.target.checked? "1":"0"
        reqUpdateChecked(skuId.toString(), isChecked).then(
            value => {
              this.$store.dispatch('cartStore/getCartList')
            }
        )
      },
      deleteChecked(){
        let PromiseAll = []
        this.cartListInfo.forEach(item=>{
          if(item.isChecked==1) PromiseAll.push(delCart(item.skuId))
        })
        Promise.all(PromiseAll).then(
            value => {console.log(value);this.$store.dispatch('cartStore/getCartList')}
        )
      }
    },
    computed:{
      ...mapState('cartStore',['cartList']),
      ...mapGetters('cartStore', ['cartListInfo']),
      totalPrice(){
        let sum = 0
        for(let cart of this.cartListInfo){
          if(cart.isChecked==1){
            sum += cart.skuNum*cart.cartPrice
          }
        }
        return sum
      },
      selected:{
        get(){
          if(!this.cartListInfo.length){
            return false
          }
          let len = this.cartListInfo.length || 0, cnt = 0
          this.cartList.cartInfoList.forEach(list=>{
            if(list.isChecked==1)
              cnt++
          })
          return len == cnt
        },
        set(val){
          if(!this.cartListInfo.length)
            return
          this.cartListInfo.forEach(list=>{
            list.isChecked=val
          })
        }
      }
    },
    mounted() {
      this.$store.dispatch('cartStore/getCartList')
    }
  }

</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }
  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      & > div {
        float: left;
      }
      .cart-th1 {
        width: 25%;
        input {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .cart-th2 {
        width: 25%;
      }
      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }
    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        & > li {
          float: left;
        }
        .cart-list-con1 {
          width: 15%;
        }
        .cart-list-con2 {
          width: 35%;
          img {
            width: 82px;
            height: 82px;
            float: left;
          }
          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }
        .cart-list-con5 {
          width: 17%;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
						text-decoration: none;
          }
          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 31px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
						text-decoration: none;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }
  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }
			

      .sumbtn {
        float: right;
        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
					text-decoration: none;
					&hover {
						color: white !important;
					}
        }
      }
    }
  }
}
</style>