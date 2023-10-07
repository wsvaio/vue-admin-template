<script setup lang="ts">
import { darkTheme, dateZhCN, lightTheme, useThemeVars, zhCN } from "naive-ui";

const layout = useLayoutStore();
const themeVars = useThemeVars();

watchEffect(() => {
	console.log(themeVars.value, darkTheme);
});
</script>

<template>
	<n-config-provider
		abstract
		:theme="layout.isDark ? darkTheme : lightTheme"
		:theme-overrides="{
			common: {
				...layout.themeVars,

			},
		}"
		:locale="zhCN"
		:date-locale="dateZhCN"
	>
		<router-view />
	</n-config-provider>
</template>

<style lang="less" scoped></style>
