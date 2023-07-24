<template>
	<div>
		<!-- 三级分类导航 -->
		<TypeNav/>
		<!-- 列表 -->
		<ListContainer/>
		<!-- 今日推荐 -->
		<Recommend/>
		<!-- 商品排行 -->
		<Rank/>
		<!-- 喜欢 -->
		<Like/>
		<!-- 楼层 -->
		<Floor/>
		<Floor/>
		<!-- 商标 -->
		<Brand/>
	</div>
</template>

<script>
	import TypeNav from './TypeNav'
	import ListContainer from './ListContainer'
	import Recommend from './Recommend'
	import Rank from './Rank'
	import Like from './Like'
	import Floor from './Floor'
	import Brand from './Brand'

	export default {
		name:'Home',
		components:{ListContainer,Recommend,Rank,Like,Floor,Brand,TypeNav}
	}
</script>