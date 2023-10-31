<template>
	<div></div>
</template>

<script>
	export default {
		mounted() {
			this.$store.dispatch("login/loggout");
		},
	};
</script>

<style lang="scss" scoped>
</style>