<template>
  <div>
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor, index) of floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>

import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor/Floor";
import Brand from "@/pages/Home/Brand";
import {mapGetters,mapActions,mapMutations, mapState} from "vuex";
import {reqUpdateChecked} from "@/api";

export default {
  name: "index",
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed:{
    ...mapState('homeStore', ['floorList'])
  },
  mounted() {
    console.log(this)
    this.$store.dispatch('homeStore/floorList')
    this.$store.dispatch('userStore/getUserInfo').then(
        value => {
          console.log('获取用户信息成功',value)
        },
        reason => {
          console.log('获取用户信息失败',reason)
        }
    )
  }


}
</script>

<style scoped>

</style>