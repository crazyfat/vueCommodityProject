<template>
  <div id="app">
    <Header @myAlert="myAlert"/>
      <router-view></router-view>
<!--    在home和search显示-->
    <Footer v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  methods:{
    myAlert(){
      alert('7777')
    }
  },
  mounted(){
    //通知vuex发请求，获取数据，存储在仓库中
    this.$store.dispatch('homeStore/categoryList')

  }
}
</script>

<style>
</style>
