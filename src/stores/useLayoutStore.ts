import { defineStore } from "pinia";
import type { RouteLocationNormalizedLoaded, RouteRecordName, RouteRecordRaw } from "vue-router";

export default defineStore("layout", {
	state: () => ({
		isDark: true,
		type: "left" as "left" | "top" | "top-mix" | "left-mix" | "mini",
		slider: {
			inverted: false,
			collapsed: false,

			width: 220,
			collapsedWidth: 64,

			leftMixFixed: false,
			leftMixWidth: 80,
			leftMixCollapsedWidth: 48,
			leftMixChildMenuWidth: 200,
		},
		header: {
			inverted: false,
			height: 56,
			crumb: {
				visible: true,
				showIcon: true,
			},
		},
		tab: {
			visible: true,
			height: 44,
			isCache: true,
		},
		content: {},
		footer: {
			visible: true,
			fixed: false,
			right: true,
			height: 48,
			inverted: false,
		},

		tabs: [] as (RouteLocationNormalizedLoaded | RouteRecordRaw)[],
		excludes: [] as (RouteRecordName | undefined | null)[],
		includes: [] as (RouteRecordName | undefined | null)[],
		isRouteView: true,

		overwriteThemeVars: {} as Record<any, any>,
	}),
	actions: {
		findByName(name?: RouteRecordName | null) {
			return this.tabs.find(item => item.name == name);
		},
		findIndexByName(name?: RouteRecordName | null) {
			return this.tabs.findIndex(item => item.name == name);
		},
		insert(index: number, route: RouteLocationNormalizedLoaded | RouteRecordRaw) {
			this.tabs.splice(index, 0, { ...route });
		},
		append(route: RouteLocationNormalizedLoaded | RouteRecordRaw) {
			if (!this.findByName(route.name)) this.tabs.push({ ...route });
		},
		replace(route: RouteLocationNormalizedLoaded | RouteRecordRaw) {
			const index = this.findIndexByName(route.name);
			if (index != -1) {
				this.insert(index, route);
				this.deleteByName(route.name);
			}
		},
		appendOrReplace(route?: RouteLocationNormalizedLoaded | RouteRecordRaw) {
			if (!route) return;
			const index = this.findIndexByName(route.name);
			if (index != -1) this.replace(route);
			else this.append(route);
		},
		deleteByName(name?: RouteRecordName | null) {
			const index = this.findIndexByName(name);
			if (index != -1) this.tabs.splice(index, 1);
		},

		async refresh(name?: RouteRecordName | null) {
			if (!name) return;
			this.excludes.push(name);
			await nextTick();
			this.isRouteView = false;
			await nextTick();
			this.isRouteView = true;
			this.excludes.pop();
		},
	},
	getters: {
		include(): string[] {
			return [
				...this.includes.map(item => String(item)),
				...this.tabs
					.map(item => item.name)
					.filter(item => !!item)
					.map(item => String(item)),
			];
		},
		exclude(): string[] {
			return this.excludes.filter(item => !!item).map(item => String(item));
		},
		themeVars(): Record<any, any> {
			const t = {
				...generateColor(
					[
						["primaryColor", "#1890ff"],
						["infoColor", "#096dd9"],
						["successColor", "#52c41a"],
						["warningColor", "#faad14"],
						["errorColor", "#f5222d"],
					],
					this.isDark
				),
				fontFamily:
					"v-sans, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
				fontFamilyMono: "v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace",
				fontWeight: "400",
				fontWeightStrong: "500",
				cubicBezierEaseInOut: "cubic-bezier(.4, 0, .2, 1)",
				cubicBezierEaseOut: "cubic-bezier(0, 0, .2, 1)",
				cubicBezierEaseIn: "cubic-bezier(.4, 0, 1, 1)",
				borderRadius: "3px",
				borderRadiusSmall: "2px",
				fontSize: "14px",
				fontSizeMini: "12px",
				fontSizeTiny: "12px",
				fontSizeSmall: "14px",
				fontSizeMedium: "14px",
				fontSizeLarge: "15px",
				fontSizeHuge: "16px",
				lineHeight: "1.6",
				heightMini: "16px",
				heightTiny: "22px",
				heightSmall: "28px",
				heightMedium: "34px",
				heightLarge: "40px",
				heightHuge: "46px",
				scrollbarWidth: "5px",
				scrollbarHeight: "5px",
				scrollbarBorderRadius: "5px",

				...this.overwriteThemeVars,
			};
			return this.isDark
				? {
					baseColor: "#000",
					textColorBase: "#fff",
					textColor1: "rgba(255, 255, 255, 0.9)",
					textColor2: "rgba(255, 255, 255, 0.82)",
					textColor3: "rgba(255, 255, 255, 0.52)",
					textColorDisabled: "rgba(255, 255, 255, 0.38)",
					placeholderColor: "rgba(255, 255, 255, 0.38)",
					placeholderColorDisabled: "rgba(255, 255, 255, 0.28)",
					iconColor: "rgba(255, 255, 255, 0.38)",
					iconColorDisabled: "rgba(255, 255, 255, 0.28)",
					iconColorHover: "rgba(255, 255, 255, 0.475)",
					iconColorPressed: "rgba(255, 255, 255, 0.30400000000000005)",
					opacity1: "0.9",
					opacity2: "0.82",
					opacity3: "0.52",
					opacity4: "0.38",
					opacity5: "0.28",
					dividerColor: "rgba(255, 255, 255, 0.09)",
					borderColor: "rgba(255, 255, 255, 0.24)",
					closeIconColorHover: "rgba(255, 255, 255, 0.52)",
					closeIconColor: "rgba(255, 255, 255, 0.52)",
					closeIconColorPressed: "rgba(255, 255, 255, 0.52)",
					closeColorHover: "rgba(255, 255, 255, .12)",
					closeColorPressed: "rgba(255, 255, 255, .08)",
					clearColor: "rgba(255, 255, 255, 0.38)",
					clearColorHover: "rgba(255, 255, 255, 0.48)",
					clearColorPressed: "rgba(255, 255, 255, 0.3)",
					scrollbarColor: "rgba(255, 255, 255, 0.2)",
					scrollbarColorHover: "rgba(255, 255, 255, 0.3)",

					progressRailColor: "rgba(255, 255, 255, 0.12)",
					railColor: "rgba(255, 255, 255, 0.2)",
					popoverColor: "rgb(72, 72, 78)",
					tableColor: "rgb(24, 24, 28)",
					cardColor: "rgb(24, 24, 28)",
					modalColor: "rgb(44, 44, 50)",
					bodyColor: "rgb(16, 16, 20)",
					tagColor: "rgba(51, 51, 51, 1)",
					avatarColor: "rgba(255, 255, 255, 0.18)",
					invertedColor: "#000",
					inputColor: "rgba(255, 255, 255, 0.1)",
					codeColor: "rgba(255, 255, 255, 0.12)",
					tabColor: "rgba(255, 255, 255, 0.04)",
					actionColor: "rgba(255, 255, 255, 0.06)",
					tableHeaderColor: "rgba(255, 255, 255, 0.06)",
					hoverColor: "rgba(255, 255, 255, 0.09)",
					tableColorHover: "rgba(255, 255, 255, 0.06)",
					tableColorStriped: "rgba(255, 255, 255, 0.05)",
					pressedColor: "rgba(255, 255, 255, 0.05)",
					opacityDisabled: "0.38",
					inputColorDisabled: "rgba(255, 255, 255, 0.06)",
					buttonColor2: "rgba(255, 255, 255, .08)",
					buttonColor2Hover: "rgba(255, 255, 255, .12)",
					buttonColor2Pressed: "rgba(255, 255, 255, .08)",
					boxShadow1:
							"0 1px 2px -2px rgba(0, 0, 0, .24), 0 3px 6px 0 rgba(0, 0, 0, .18), 0 5px 12px 4px rgba(0, 0, 0, .12)",
					boxShadow2:
							"0 3px 6px -4px rgba(0, 0, 0, .24), 0 6px 12px 0 rgba(0, 0, 0, .16), 0 9px 18px 8px rgba(0, 0, 0, .10)",
					boxShadow3:
							"0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)",

					sliderBgColor: "#18181c",
					headerBgColor: "#18181c",
					tabBgColor: "#101014",
					contentBgColor: "#101014",
					footerBgColor: "#18181c",
					...t,
				  }
				: {
					baseColor: "#FFF",
					textColorBase: "#000",
					textColor1: "rgb(31, 34, 37)",
					textColor2: "rgb(51, 54, 57)",
					textColor3: "rgb(118, 124, 130)",
					textColorDisabled: "rgba(194, 194, 194, 1)",
					placeholderColor: "rgba(194, 194, 194, 1)",
					placeholderColorDisabled: "rgba(209, 209, 209, 1)",
					iconColor: "rgba(194, 194, 194, 1)",
					iconColorHover: "rgba(146, 146, 146, 1)",
					iconColorPressed: "rgba(175, 175, 175, 1)",
					iconColorDisabled: "rgba(209, 209, 209, 1)",
					opacity1: "0.82",
					opacity2: "0.72",
					opacity3: "0.38",
					opacity4: "0.24",
					opacity5: "0.18",
					dividerColor: "rgb(239, 239, 245)",
					borderColor: "rgb(224, 224, 230)",
					closeIconColor: "rgba(102, 102, 102, 1)",
					closeIconColorHover: "rgba(102, 102, 102, 1)",
					closeIconColorPressed: "rgba(102, 102, 102, 1)",
					closeColorHover: "rgba(0, 0, 0, .09)",
					closeColorPressed: "rgba(0, 0, 0, .13)",
					clearColor: "rgba(194, 194, 194, 1)",
					clearColorHover: "rgba(146, 146, 146, 1)",
					clearColorPressed: "rgba(175, 175, 175, 1)",
					scrollbarColor: "rgba(0, 0, 0, 0.25)",
					scrollbarColorHover: "rgba(0, 0, 0, 0.4)",

					progressRailColor: "rgba(235, 235, 235, 1)",
					railColor: "rgb(219, 219, 223)",
					popoverColor: "#fff",
					tableColor: "#fff",
					cardColor: "#fff",
					modalColor: "#fff",
					bodyColor: "#fff",
					tagColor: "#eee",
					avatarColor: "rgba(204, 204, 204, 1)",
					invertedColor: "rgb(0, 20, 40)",
					inputColor: "rgba(255, 255, 255, 1)",
					codeColor: "rgb(244, 244, 248)",
					tabColor: "rgb(247, 247, 250)",
					actionColor: "rgb(250, 250, 252)",
					tableHeaderColor: "rgb(250, 250, 252)",
					hoverColor: "rgb(243, 243, 245)",
					tableColorHover: "rgba(0, 0, 100, 0.03)",
					tableColorStriped: "rgba(0, 0, 100, 0.02)",
					pressedColor: "rgb(237, 237, 239)",
					opacityDisabled: "0.5",
					inputColorDisabled: "rgb(250, 250, 252)",
					buttonColor2: "rgba(46, 51, 56, .05)",
					buttonColor2Hover: "rgba(46, 51, 56, .09)",
					buttonColor2Pressed: "rgba(46, 51, 56, .13)",
					boxShadow1:
							"0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
					boxShadow2:
							"0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
					boxShadow3:
							"0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)",

					sliderBgColor: "#fff",
					headerBgColor: "#fff",
					tabBgColor: "#f7f9f8",
					contentBgColor: "#f7f9f8",
					footerBgColor: "#fff",
					...t,
				  };
		},
	},
	// persist: true,
});