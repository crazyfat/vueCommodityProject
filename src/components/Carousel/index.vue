<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) of list" :key="carousel.id">
        <img :src="carousel.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "carousel",
  props:['list'],
  watch:{
    list:{
      immediate:true,
      handler(newValue, oldValue){
        this.$nextTick(()=>{
          new Swiper((this.$refs.mySwiper), {
            loop:true,
            pagination:{
              el:".swiper-pagination",
              clickable:true
            },
            navigation:{
              nextEl:".swiper-button-next",
              prevEl:".swiper-button-prev"
            }
          })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>