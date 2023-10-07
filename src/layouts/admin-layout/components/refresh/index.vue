<script setup lang="ts">
let i = $ref(0);
</script>

<template>
	<n-button text class="h-full px-12px !hover:(bg-[var(--button-color2-hover)])" @click="i++">
		<template #icon>
			<div
				class="i-iconoir:refresh" :style="{
					transition: 'all 0.3s var(--cubic-bezier-ease-in-out)',
					transform: `rotate(${i * 360}deg)`,
				}"
			/>
		</template>
	</n-button>
</template>
