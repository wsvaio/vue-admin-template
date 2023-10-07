import type { RouteRecordRaw } from "vue-router";

declare module "vue-router" {
	interface RouteMeta {
		title?: string;
		icon?: string;
		show?: boolean;
		disabled?: boolean;
		sort?: number;

		data?: {
			id?: string;
			parentId?: string;
			ancestors?: string;
			clientId?: string;
			name?: string;
			icon?: string;
			type?: "C" | "M" | "F";
			perms?: string;
			path?: string;
			component?: string;
			currentActiveMenu?: string;
			isExternalLink?: 1 | 0;
			isCache?: 0 | 1;
			isDisplay?: 0 | 1;
			sort?: number;
			state?: 0 | 1;
			remark?: string;
			createTime?: string;
			createById?: string;
			createBy?: string;
		};
	}
}

export const components = Object.entries<AnyObject>(import.meta.glob("@/pages/**/Index.vue", { eager: true })).map(
	([k, v]) => {
		return {
			path: k.replace("/src/pages", "").replace("/Index.vue", ""),
			component: v.default,
		};
	}
);

export const getComponent = (path: string) =>
	components.find(item => item.path == path)?.component || (() => import("@/pages/404/Index.vue"));

// 获取动态路由
export const getDynamicRoutes = async () => {
	const data = [];
	return deepMap(data as any[], item => {
		item.children = item?.children?.filter(item => item.type != "F");
		return {
			path: item.path,
			name: item.component || item.name,
			meta: {
				title: item.name,
				icon: item.icon,
				show: item.isDisplay != 0,
				sort: item.sort,
				data: { ...item },
			},
			component: item.type == "M" ? getComponent(item.component) : undefined,
		} as RouteRecordRaw;
	});
};
// 获取静态路由
export const getStaticRoutes = (): RouteRecordRaw[] => [
	{
		path: "/home",
		name: "Home",
		meta: { title: "主页", icon: "i-line-md:menu-fold-left", sort: -10 },
		component: getComponent("/home"),
	},
	{
		path: "/about",
		name: "About",
		meta: { title: "关于", icon: "i-line-md:menu-fold-left", sort: -10 },
		component: getComponent("/about"),
	},

	{
		path: "/list1",
		name: "List1",
		meta: { title: "列表1", icon: "i-line-md:menu-fold-left", sort: -10 },
		// component: getComponent("/about"),
		children: [
			{
				path: "/list1/item1",
				name: "item1",
				meta: { title: "啊？", icon: "i-line-md:menu-fold-left", sort: -10 },
				component: getComponent("/list1/item1"),
			},
			// {
			// 	path: "list2",
			// 	name: "list2",
			// 	meta: { title: "关于", icon: "i-line-md:menu-fold-left", sort: -10 },
			// 	children: [
			// 		{
			// 			path: "item2",
			// 			name: "item2",
			// 			meta: { title: "关于", icon: "i-line-md:menu-fold-left", sort: -10 },
			// 			component: getComponent("/list1/list2/item2"),
			// 		},
			// 	],
			// },
		],
	},

	{
		path: "/403",
		name: "403",
		meta: { title: "403", show: false },
		component: getComponent("/403"),
	},
	{
		path: "/404",
		name: "404",
		meta: { title: "404", show: false },
		component: getComponent("/404"),
	},
	{
		path: "/500",
		name: "500",
		meta: { title: "500", show: false },
		component: getComponent("/500"),
	},
];

export default [
	{
		path: "/login",
		name: "login",
		component: getComponent("/login"),
	},
	{
		path: "/403",
		name: "403",
		meta: { title: "403", show: false },
		component: getComponent("/403"),
	},
	{
		path: "/404",
		name: "404",
		meta: { title: "404", show: false },
		component: getComponent("/404"),
	},
	{
		path: "/500",
		name: "500",
		meta: { title: "500", show: false },
		component: getComponent("/500"),
	},
	{
		path: "/loading",
		name: "loading",
		component: getComponent("/loading"),
	},
	{ path: "/:pathMatch(.*)", component: getComponent("/404") },
] as RouteRecordRaw[];
