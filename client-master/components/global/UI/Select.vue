<template>
	<div>
		<div v-if="multiple">
			<select-multiple
				:options="fullOptions"
				:items="itemsWithConsideringExceptions"
				v-model="selectedItems"
				:rel="rel"
				:readonly="readonly"
				:limited="limited"
				:allowNull="allowNull"   
				:emptyValue="emptyValue"
			/>
		</div>
		<div v-else>
			<select-single
				:options="fullOptions"
				:items="itemsWithConsideringExceptions"
				v-model="selectedItem"
				:rel="rel"
				:readonly="readonly"
				:allowNull="allowNull"
				:emptyValue="emptyValue"
				:tableMode="tableMode"
			/>
		</div>
	</div>
</template>

<script>
	import SelectMultiple from "./mx-select/Select-Multiple.vue";
	import SelectSingle from "./mx-select/Select-Single.vue";
	// import SelectMultiple from "./mx-select/Select-Multiple";
	// import SelectSingle from "./mx-select/Select-Single";
	export default {
		props: [
			"options",
			"items",
			"value",
			"multiple",
			"rel",
			"readonly",
			"limited",
			"allowNull",
			"exceptions",
			"emptyValue",
			"hasDependency",
			"dependency",
			"currentDependentValue",
			"tableMode",
			"deleteForm"
		],
		components: {
			SelectMultiple,
			SelectSingle,
			// SelectMultiple,
			// SelectSingle,
		},
		computed: {
			data: {
				// getter
				get: function () {
					if (this.multiple) {
						return this.selectedItems;
					} else {
						return this.selectedItem;
					}
				},
				// setter
				set: function (newValue) {
					if (this.multiple) {
						this.selectedItems = newValue;
					} else {
						this.selectedItem = newValue;
					}
				},
			},
			fullOptions() {
				return { ...this.options, multiple: this.multiple };
			},
			itemsWithConsideringExceptions() {
				let items = [];

				if (this.hasDependency) {
					let currentRefValue = this.currentDependentValue;
					let exceptedItemsList = [];
					for (let rule of this.dependency.rules) {
						if (rule.dependentOnValue == currentRefValue) {
							exceptedItemsList = rule.excludedValue;
						}
					}
					items = this.items.filter((item) => {
						for (let excepetedValue of exceptedItemsList) {
							if (excepetedValue == item[this.options.fields.id]) {
								return false;
							}
						}
						return true;
					});
				} else if (this.exceptions) {
					if (typeof this.exceptions == "string") {
						const exceptions = this.exceptions.split(",");
						items = this.items.filter((i) => {
							for (let exp of exceptions) {
								if (exp == i[this.options.fields.id]) {
									return false;
								}
							}
							return true;
						});
					} else {
						const exceptions = this.exceptions;
						items = this.items.filter((i) => {
							for (let exp of exceptions) {
								// فعلا td_fid باشد
								if (exp == i[this.options.fields.id]) {
									return false;
								}
							}
							return true;
						});
					}
				} else {
					items = this.items;
				}
				return items;
			},
		},
		data() {
			return {
				selectedItems: [],
				selectedItem: "",
			};
		},
		created() {
			this.setData(this.value);
		},
		methods: {
			setData(newValue) {
				this.data = newValue;
			},
		},
		watch: {
			data(newValue) {
				this.$emit("input", newValue);
				this.$emit("change", newValue);
			},
			value(newValue) {
				this.setData(newValue);
			},
			currentDependentValue() {
				if (this.hasDependency) {
					this.selectedItems = [];
					this.selectedItem = 0;
				}
			},
			rel() {
					this.selectedItems = [];
					this.selectedItem = 0;
			},
			deleteForm(){
				this.selectedItem = ""
				this.selectedItems = []
			}
		},
	};
</script>
<style lang="scss" src="../../../assets/style/Ul/Select.scss" >
</style>
