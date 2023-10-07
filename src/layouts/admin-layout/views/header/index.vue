<script setup lang="ts">
import Collapse from "../../components/collapse/index.vue";
import BreadCrumb from "../../components/bread-crumb/index.vue";
import FullScreen from "../../components/full-screen/index.vue";
import Avatar from "../../components/avatar/index.vue";
import DarkModeSwitch from "../../components/dark-mode-switch/index.vue";

const layout = useLayoutStore();
const { slider, header, tab, content, footer } = $(layout);

const auth = useAuthStore();

const handleSelect = ev => {
	console.log("fsdaklfj", ev);
};
</script>

<template>
	<collapse v-model="slider.collapsed" />
	<!-- <refresh @click="layout.refresh($route.name)" /> -->
	<bread-crumb />

	<!-- <n-menu :options="auth.menus" mode="horizontal" /> -->
	<full-screen class="ml-auto" />
	<dark-mode-switch v-model="layout.isDark" customize-transition />
	<avatar
		url="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
		title="hh"
		:options="[{ label: '退出登录', key: '退出登录' }, { label: '系统设置', key: '系统设置' }]"
		@select="handleSelect"
	/>

	<n-drawer />
</template>

<style lang="less" scoped></style>
