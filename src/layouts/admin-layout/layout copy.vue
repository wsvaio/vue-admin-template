<script setup lang="ts">
import MenuView from "./views/menu/index.vue";

const layout = useLayoutStore();

const paddingLeft = computed(() => `${layout.slider.collapsed ? layout.slider.collapseddWidth : layout.slider.width}px`);
</script>

<template>
	<n-layout class="admin-layout" :native-scrollbar="false">
		<n-layout-sider
			v-model:collapsed="layout.slider.collapsed"
			:style="{
				position: 'absolute',
				left: 0,
				top: 0,
				bottom: 0,
			}"
			show-trigger="bar"
			:width="layout.slider.width"
		>
			<menu-view />
		</n-layout-sider>
		<n-layout-header
			:style="{
				paddingLeft,
				transition: 'all .3s cubic-bezier(.4, 0, .2, 1)',
			}"
		>
			header
		</n-layout-header>
		<n-layout-content
			:native-scrollbar="false"
			:style="{
				paddingLeft,
				transition: 'all .3s cubic-bezier(.4, 0, .2, 1)',
			}"
		>
			123
		</n-layout-content>
		<n-layout-footer
			:style="{
				paddingLeft,
				transition: 'all .3s cubic-bezier(.4, 0, .2, 1)',
			}"
		>
			footer
		</n-layout-footer>
	</n-layout>
</template>

<style lang="less" scoped>
.admin-layout {
	position: relative;
	height: 100%;
}
</style>
