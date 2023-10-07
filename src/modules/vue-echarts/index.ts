// import ECharts from "vue-echarts";
// import type { ComposeOption } from "echarts/core";
// import { use } from "echarts/core";
// import type { App } from "vue";

// // 手动引入 ECharts 各模块来减小打包体积
// import { CanvasRenderer } from "echarts/renderers";
// import type { BarSeriesOption, GaugeSeriesOption, LineSeriesOption, PieSeriesOption } from "echarts/charts";
// import { BarChart, GaugeChart, LineChart, PieChart } from "echarts/charts";
// import {
// 	DataZoomComponent,
// 	DatasetComponent,
// 	GridComponent,
// 	LegendComponent,
// 	PolarComponent,
// 	TitleComponent,
// 	TooltipComponent,
// } from "echarts/components";
// import type {
// 	DataZoomComponentOption,
// 	DatasetComponentOption,
// 	GridComponentOption,
// 	LegendComponentOption,
// 	PolarComponentOption,
// 	TitleComponentOption,
// 	TooltipComponentOption,
// } from "echarts/components";

// use([
// 	DatasetComponent,
// 	TooltipComponent,
// 	GridComponent,
// 	LegendComponent,
// 	CanvasRenderer,
// 	TitleComponent,
// 	PolarComponent,
// 	DataZoomComponent,

// 	PieChart,
// 	LineChart,
// 	BarChart,
// 	GaugeChart,
// ]);

// declare module "vue" {
// 	export interface GlobalComponents {
// 		VChart: typeof ECharts;
// 	}
// }

// declare global {
// 	type ECOption = ComposeOption<
// 	| LineSeriesOption
// 	| PieSeriesOption
// 	|	GaugeSeriesOption
// 	| DatasetComponentOption
// 	| TooltipComponentOption
// 	| GridComponentOption
// 	| LegendComponentOption
// 	| BarSeriesOption
// 	| TitleComponentOption
// 	| PolarComponentOption
// 	| DataZoomComponentOption
// 	>;
// }

// export default (app: App) => {
// 	// 全局注册组件（也可以使用局部注册）
// 	app.component("VChart", ECharts);
// };
// export {};
