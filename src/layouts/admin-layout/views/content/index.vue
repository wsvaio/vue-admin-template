<script setup lang="ts">
const layout = useLayoutStore();
const { slider, header, tab, content, footer } = $(layout);
</script>

<template>
	<section class="content">
		<router-view #="{ Component }">
			<transition mode="out-in" name="fade">
				<keep-alive :include="layout.include" :exclude="layout.exclude">
					<component :is="Component" v-if="layout.isRouteView" :key="$route.fullPath" />
				</keep-alive>
			</transition>
		</router-view>
	</section>
</template>

<style lang="less" scoped>
.content {
}
</style>
