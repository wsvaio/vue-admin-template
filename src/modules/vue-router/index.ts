import { createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";
import routes from "@/routes";

export const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE),
	routes,
});

// router.beforeEach(() => Progress.start());
const whites = ["/404", "/403", "/500", "/share", "/loading", "/login1", "/login2"];
router.beforeEach((to, _from, next) => {
	if (whites.includes(to.path)) return next();
	const { isLogin } = useAuthStore();
	if (to.path.startsWith("/login")) isLogin ? next("/") : next();
	else isLogin ? next() : next({ name: "login" });
});

router.beforeEach(async (to, _from, next) => {
	if (whites.includes(to.path)) return next();
	const auth = useAuthStore();
	if (auth.routes.length <= 0 && auth.isLogin) next({ path: "/loading", replace: true });
	else next();
});

// 注册路由
// router.beforeEach(async (to, _from, next) => {
// 	const auth = useAuthStore();
// 	if (auth.routes.length) return next();
// 	await auth.addOrReplaceRoute().then(() => {
// 		next({ ...to, replace: true });
// 	}).catch(() => {
// 		next({ path: "/500", replace: true });
// 	});
// });

// router.afterEach(() => Progress.clear());

export default (app: App) => app.use(router);
