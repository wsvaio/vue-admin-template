<script setup lang="ts">
import Basic from "./basic.vue";
import ContentView from "./views/content/index.vue";
import SliderView from "./views/slider/index.vue";
import HeaderView from "./views/header/index.vue";
import TabView from "./views/tab/index.vue";

const layout = useLayoutStore();
const { slider, header, tab, content, footer } = $(layout);
</script>

<template>
	<basic
		v-model:type="layout.type"
		v-model:sliderCollapsed="slider.collapsed"
		:slider-collapsed-width="slider.collapsedWidth"
		:slider-left-mix-children-width="slider.leftMixChildMenuWidth"
		:slider-left-mix-collapsed-width="slider.leftMixCollapsedWidth"
		:slider-left-mix-fixed="slider.leftMixFixed"
		:slider-left-mix-width="slider.leftMixWidth"
		:slider-width="slider.width"
		:header-height="header.height"
		:tab-height="tab.height"
		:footer-height="footer.height"
	>
		<template #slider>
			<slider-view />
		</template>

		<template #header>
			<header-view />
		</template>

		<template #tab>
			<tab-view />
		</template>

		<template #default>
			<content-view />
		</template>
	</basic>
</template>
