<script setup lang="ts">
const { customizeTransition } = defineProps<{ customizeTransition?: boolean }>();

let isDark = $(defineModel<boolean>());

async function handleSwitch(event: MouseEvent) {
	const x = event.clientX;
	const y = event.clientY;

	if (!customizeTransition || !document.startViewTransition) {
		isDark = !isDark;
		return;
	}

	const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

	const transition = document.startViewTransition(() => {
		isDark = !isDark;
	});

	await transition.ready;

	const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];

	document.documentElement.animate(
		{
			clipPath: isDark ? clipPath : [...clipPath].reverse(),
		},
		{
			duration: 300,
			easing: "ease-in",
			pseudoElement: isDark ? "::view-transition-new(root)" : "::view-transition-old(root)",
		}
	);
}
</script>

<template>
	<n-button text class="h-full px-12px !hover:(bg-[var(--button-color2-hover)])" @click="handleSwitch">
		<template #icon>
			<div v-if="isDark" class="i-mdi-moon-waning-crescent" />
			<div v-else class="i-mdi-white-balance-sunny" />
		</template>
	</n-button>
</template>

<style>
html {
	&::view-transition-old(root),
	&::view-transition-new(root) {
		z-index: 1;
		animation: none;
		mix-blend-mode: normal;
	}

	&::view-transition-old(root) {
		z-index: 9999;
	}

	&.dark::view-transition-new(root) {
		z-index: 9999;
	}
}
</style>
