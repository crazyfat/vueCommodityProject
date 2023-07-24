<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, index) of imgList" :key="img.id">
        <img :src="img.imgUrl" :class="{active:curIdx==index}" @click="changeIdx(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    data(){
      return {
        curIdx:0
      }
    },
    props:['imgList'],
    watch:{
      //监听数据，可以保证数据是ok的，但是不能保证v-for遍历结构是否结束
      imgList(newValue, oldValue){
        this.$nextTick(function(){
          new Swiper(".swiper-container",{
            slidesPerView:3,
            slidesPerGroup:3,
            navigation:{
              nextEl:".swiper-button-next",
              prevEl:".swiper-button-prev"
            }
          })
        })
      }
    },
    methods:{
      changeIdx(index){
        this.curIdx = index
        this.$bus.$emit('selectImg', index)
      }
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>