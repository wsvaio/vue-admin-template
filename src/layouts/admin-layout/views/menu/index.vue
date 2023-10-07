<script setup lang="ts">
const menuOptions = [
	{
		label: "且听风吟",
		key: "hear-the-wind-sing",
		icon: () => h("div", { class: "i-ph:reddit-logo-bold" }),
	},
	{
		label: "1973年的弹珠玩具",
		key: "pinball-1973",
		icon: () => h("div", { class: "i-ph:reddit-logo-bold" }),
		disabled: true,
		children: [
			{
				label: "鼠",
				key: "rat",
			},
		],
	},
	{
		label: "寻羊冒险记",
		key: "a-wild-sheep-chase",
		disabled: true,
		icon: () => h("div", { class: "i-ph:reddit-logo-bold" }),
	},
	{
		label: "舞，舞，舞",
		key: "dance-dance-dance",
		icon: () => h("div", { class: "i-ph:reddit-logo-bold" }),
		children: [
			{
				type: "group",
				label: "人物",
				key: "people",
				children: [
					{
						label: "叙事者",
						key: "narrator",
						icon: () => h("div", { class: "i-ph:reddit-logo-bold" }),
					},
					{
						label: "羊男",
						key: "sheep-man",
						icon: () => h("div", { class: "i-ph:reddit-logo-bold" }),
					},
				],
			},
			{
				label: "饮品",
				key: "beverage",
				icon: () => h("div", { class: "i-ph:reddit-logo-bold" }),
				children: [
					{
						label: "威士忌",
						key: "whisky",
					},
				],
			},
			{
				label: "食物",
				key: "food",
				children: [
					{
						label: "三明治",
						key: "sandwich",
					},
				],
			},
			{
				label: "过去增多，未来减少",
				key: "the-past-increases-the-future-recedes",
			},
		],
	},
];

const layout = useLayoutStore();
const { slider, header, tab, content, footer } = $(layout);
</script>

<template>
	<n-menu
		:options="menuOptions"
		:collapsed="slider.collapsed"
		:collapsed-width="layout.type == 'left-mix' ? slider.leftMixCollapsedWidth : slider.collapsedWidth"
	/>
</template>

<style lang="less" scoped></style>
