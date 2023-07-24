<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo', pageNo-1)" >上一页</button>
    <button v-show="starlocation>=4" @click="$emit('getPageNo', 1)">1</button>
    <button v-show="starlocation>=4">···</button>
    <button v-for="(page, index) in endlocation" :key="index" v-show="page>=starlocation" @click="$emit('getPageNo', index+1)" :class="{active:pageNo==index+1}">{{page}}</button>
    <button v-show="pageNo!=totalPage">···</button>
    <button v-show="starlocation<(totalPage-continues)">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo', pageNo+1)" >下一页</button>

    <button style="margin-left: 30px" @click="show">共 {{total}} 条</button>
  </div>

</template>

<script>
export default {
  name: "pagination",
  props:['pageNo', 'pageSize', 'total', 'continues'],
  computed:{
    totalPage(){
      return Math.ceil(this.total/this.pageSize)
    },
    //计算连续页码的起始和结束数字
    starlocation(){
      let radius = (this.continues-1)/2
      if(radius>=this.pageNo) return 1
      else if(radius<this.pageNo && this.pageNo<(this.totalPage-radius))
        return this.pageNo-radius
      else
        return this.totalPage-this.continues+1
    },
    endlocation(){
      return Math.min(this.starlocation+this.continues-1, this.totalPage)
    }
  },
  methods:{
    show(){
      alert(this.starlocation)
    }
  },
  mounted() {
  }
}
</script>

<style lang="less">
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}

</style>