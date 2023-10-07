<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen(document.documentElement);
</script>

<template>
	<n-button class="h-full px-12px !hover:(bg-[var(--button-color2-hover)])" text @click="toggle">
		<template #icon>
			<div v-if="!isFullscreen" class="i-majesticons:arrows-expand-full-line" />
			<div v-else class="i-majesticons:arrows-collapse-full-line" />
		</template>
	</n-button>
</template>
