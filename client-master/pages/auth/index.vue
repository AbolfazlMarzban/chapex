<template>
	<div>
		<LazyAuth />
	</div>
</template>

<script>
	export default {
		middleware: ["init-auth", "not-auth"],
		data() {
			return {};
		},
	};
</script>

<style lang="scss" scoped>
</style>