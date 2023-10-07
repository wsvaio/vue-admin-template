<script setup lang="ts">
import type { RouteLocationNormalizedLoaded, RouteRecordName, RouteRecordRaw } from "vue-router";
import Logo from "../../components/logo/index.vue";

const layout = useLayoutStore();
const { slider, header, tab, content, footer } = $(layout);
const auth = useAuthStore();

const currentActiveMenu = ref<RouteRecordName | undefined | null>("");
const route = useRoute();

const handleUpdate = (route: RouteLocationNormalizedLoaded | RouteRecordRaw) => {
	currentActiveMenu.value
			= deepFind(auth.routes, item => item.path == route?.meta?.data?.currentActiveMenu)?.name
			|| route.name;
};
onBeforeRouteUpdate(to => handleUpdate(to));
handleUpdate(route);
</script>

<template>
	<logo
		:show-title="!slider.collapsed || layout.type == 'mini'"
		:style="{
			height: `${header.height}px`,
		}"
	/>
	<n-menu
		:value="String(currentActiveMenu || '')"
		:options="auth.menus"
		:collapsed="slider.collapsed"
		:collapsed-width="layout.type == 'left-mix' ? slider.leftMixCollapsedWidth : slider.collapsedWidth"
	/>
</template>

<style lang="less" scoped></style>
