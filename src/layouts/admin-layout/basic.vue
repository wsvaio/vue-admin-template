<script setup lang="ts">
const {
	sliderWidth = 200,
	sliderCollapsedWidth = 64,

	sliderLeftMixFixed = false,
	sliderLeftMixWidth = 128,
	sliderLeftMixChildrenWidth = 200,
	sliderLeftMixCollapsedWidth = 64,

	headerHeight = 64,
	tabHeight = 48,
	footerHeight = 54,
} = defineProps<{
	sliderWidth?: number;
	sliderCollapsedWidth?: number;

	sliderLeftMixFixed?: boolean;
	sliderLeftMixWidth?: number;
	sliderLeftMixChildrenWidth?: number;
	sliderLeftMixCollapsedWidth?: number;

	headerHeight?: number;
	tabHeight?: number;
	footerHeight?: number;
}>();

let type = $(defineModel<string>("type", { default: "left" }));
let sliderCollapsed = $(defineModel<boolean>("sliderCollapsed", { default: false }));

const sliderRealWidth = computed(() =>
	type == "left-mix"
		? (sliderCollapsed ? sliderLeftMixCollapsedWidth : sliderLeftMixWidth)
		  + (sliderLeftMixFixed ? sliderLeftMixChildrenWidth : 0)
		: type == "mini"
			? sliderWidth
			: sliderCollapsed
				? sliderCollapsedWidth
				: sliderWidth
);

const handleIsMini = () => {
	console.log("wdf");
	const { clientWidth } = document.documentElement;
	if (clientWidth > 768) type = "left";
	else type = "mini";
};

useEventListener(["resize"], handleIsMini);
</script>

<template>
	<n-scrollbar>
		<article
			id="admin-layout"
			class="admin-layout"
			:class="type"
			:style="{
				'--silder-real-width': `${sliderRealWidth}px`,
				'--slider-mini-left': `${type == 'mini' && sliderCollapsed ? -sliderRealWidth : 0}px`,
				'--header-height': `${headerHeight}px`,
				'--tab-height': `${tabHeight}px`,
				'--footer-height': `${footerHeight}px`,
			}"
		>
			<aside class="slider">
				<slot name="slider" />
			</aside>
			<header class="header">
				<slot name="header" />
			</header>
			<nav class="tab">
				<slot name="tab" />
			</nav>
			<section class="content">
				<n-scrollbar :style="{ height: type != 'mini' ? undefined : `calc(100vh - ${headerHeight + tabHeight + footerHeight}px)` }">
					<slot />
				</n-scrollbar>
			</section>

			<footer class="footer mt-auto">
				<slot name="footer" />
			</footer>

			<transition name="fade">
				<div
					v-show="type == 'mini' && !sliderCollapsed"
					class="absolute inset-0 bg-[rgba(0,0,0,0.5)]"
					@click="sliderCollapsed = true"
				/>
			</transition>
		</article>
	</n-scrollbar>
</template>

<style lang="less" scoped>
.admin-layout {
	display: flex;
	position: relative;
	flex-direction: column;
	// height: 100%;
	min-height: 100vh;

	& > .slider {
		position: sticky;
		top: 0;
		bottom: 0;
		width: var(--silder-real-width);
		overflow: auto;
		background-color: var(--slider-bg-color);
		box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
	}

	& > .header {
		display: flex;
		position: sticky;
		top: 0;
		align-items: center;
		height: var(--header-height);
		background-color: var(--header-bg-color);
		box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
	}

	& > .tab {
		position: sticky;
		top: var(--header-height);
		height: var(--tab-height);
		background-color: var(--tab-bg-color);
		// box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
		// background-color: salmon;
	}

	& > .content {
		flex: 1 1 0;
		background-color: var(--content-bg-color);
	}

	& > .footer {
		position: sticky;
		bottom: 0;
		height: var(--footer-height);
		background-color: var(--footer-bg-color);
	}

	& > .slider,
	& > .header,
	& > .tab,
	& > .content,
	& > .footer {
		transition: all 0.3s var(--cubic-bezier-ease-in-out);
	}

	&.left {
		& > .slider {
			position: fixed;
			z-index: 1;
			top: 0;
			bottom: 0;
			left: 0;
		}

		& > .header,
		& > .tab,
		& > .content,
		& > .footer {
			padding-left: var(--silder-real-width);
		}
	}

	&.top {
		& > .slider {
			display: none;
		}
	}

	&.top-mix {
		& > .slider {
			position: absolute;
			z-index: 1;
			top: 0;
			bottom: 0;
			left: 0;
			padding-top: var(--header-height);
		}

		& > .header {
			z-index: 2;
		}

		& > .tab,
		& > .content,
		& > .footer {
			padding-left: var(--silder-real-width);
		}
	}

	&.left-mix {
		& > .slider {
			position: absolute;
			z-index: 1;
			top: 0;
			bottom: 0;
			left: 0;
		}

		& > .header,
		& > .tab,
		& > .content,
		& > .footer {
			padding-left: var(--silder-real-width);
		}
	}

	&.mini {
		& > .slider {
			position: absolute;
			z-index: 10;
			top: 0;
			bottom: 0;
			left: var(--slider-mini-left);
		}
	}
}
</style>
