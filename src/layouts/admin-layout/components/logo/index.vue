<script setup lang="ts">
defineProps<{
	/** 显示名字 */
	showTitle?: boolean;
}>();
</script>

<template>
	<div class="flex-center w-full nowrap-hidden text-[var(--primary-color)]">
		<i class="i-ph:reddit-logo-bold text-32px text-primary" />
		<h2 v-show="showTitle" class="pl-8px text-16px font-bold text-primary transition duration-300 ease-in-out">
			天下无双
		</h2>
	</div>
</template>

<style scoped></style>
