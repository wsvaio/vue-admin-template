import type { App } from "vue";
import piniaPluginPersist from "@wsvaio/pinia-plugin-persist";

const pinia = createPinia();
// pinia 持久化
pinia.use(
	piniaPluginPersist({
		key: import.meta.env.VITE_PROJECT_NAME,
	})
);

export default (app: App) => {
	app.use(pinia);

	const html = document.documentElement;

	const layout = useLayoutStore();

	watchEffect(() => {
		html.classList.remove("dark");
		if (layout.isDark) html.classList.add("dark");
	});

	watchEffect(() => {
		for (const [k, v] of Object.entries(layout.themeVars))
			html.style.setProperty(`--${k.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`)}`, v);
	});
};
