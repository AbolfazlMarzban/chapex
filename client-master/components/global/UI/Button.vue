<template>
	<div>
		<button type="submit" class="btn-green" @click="click">{{ label }}</button>
	</div>
</template>

<script>
	export default {
		props: ["label"],
		methods: {
			click() {
				this.$emit("click");
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>