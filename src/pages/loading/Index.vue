<script setup lang="ts">
const auth = useAuthStore();
const router = useRouter();
const route = useRoute();
auth
	.addOrReplaceRoute()
	.then(() => {
		router.replace(route.redirectedFrom || { path: "/" });
	})
	.catch(() => {
		if (auth.isLogin)
			router.replace("/500");
		else
			router.replace({ name: "login", params: { id: localStorage.getItem("loginPrefix") || "" } });
	});
</script>

<template>
	<div class="app-loading">
		<div class="app-loading-wrap">
			<div class="app-loading-dots">
				<span class="dot dot-spin">
					<i />
					<i />
					<i />
					<i />
				</span>
			</div>
		</div>
	</div>
</template>

<style lang="less"></style>
