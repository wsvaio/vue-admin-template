<script setup lang="ts">
const collapsed = defineModel<boolean>();
</script>

<template>
	<n-button text class="h-full px-12px !hover:(bg-[var(--button-color2-hover)])" @click="collapsed = !collapsed">
		<template #icon>
			<div v-if="!collapsed" class="i-line-md:menu-fold-left" />
			<div v-else class="i-line-md:menu-unfold-right" />
		</template>
	</n-button>
</template>
