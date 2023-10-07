<script setup lang="ts">
import type { DropdownOption } from "naive-ui";

defineProps<{
	options?: DropdownOption[];
	url?: string;
	title?: string;
}>();
defineEmits(["select"]);
</script>

<template>
	<n-dropdown trigger="hover" :options="options" @select="$emit('select', $event)">
		<n-button text class="h-full px-12px !hover:(bg-[var(--button-color2-hover)])">
			<n-avatar flex="none" size="small" :src="url" />
			<n-text ml=".5em" text="16px" font="medium">{{ title }}</n-text>
		</n-button>
	</n-dropdown>
</template>

<style lang="less"></style>
