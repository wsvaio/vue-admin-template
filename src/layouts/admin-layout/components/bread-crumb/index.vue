<script setup lang='ts'>

</script>

<template>
	<n-breadcrumb>
		<n-breadcrumb-item v-for="item in $route.matched.filter(item => item.meta.title)">
			<n-icon :component="h('div', { class: item.meta.icon })" />
			{{ item.meta.title }}
		</n-breadcrumb-item>
	</n-breadcrumb>
</template>

<style lang='less'>

</style>
