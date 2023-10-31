<template>
	<v-app>
		<nuxt class="app" />
		<Footer class="app pb-0" />
	</v-app>
</template>

<script>
	import Footer from "../components/main/layout/Footer";
	export default {
		data() {
			return {
				components: {
					Footer,
				},
			};
		},
	};
</script>

<style lang="scss">
	.app {
		background: #f2f2f2;
	}
</style>
