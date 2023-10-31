<template>
	<div
		class="form-group form__group field"
		:class="{ 'form-group--error': errorMessages.length > 0 }"
	> 
		<div class="errorStyle">{{ errorMessages[0] }}</div>
		<input
			:placeholder="placeholder"
			:disabled="readonly"
			class="form-control form__field"
			:id="[name]"
			v-model="inputValue"
			@blur="validate"
			@input="input"
			@change="change"
		/>
		<!-- <img :src="`/${icon}.png`" v-show="showIcon" class="inputIcon" /> -->
		<label :for="[name]" class="form__label">{{ label }}</label>
	</div>
</template>
<script>
	import InputMoney from "../../../plugins/mixins/UI-mixins/inputMoney";
	// import "../../assets/sass/components/UI/Input.scss";

	export default {
		name: "Input",
		props: ["readonly"],
		mixins: [InputMoney],
		data() {
			return {
				showIcon: true,
				inputValue: "",
				inputValueWithNumberStatus: null,
			};
		},
		mounted() {
			if (this.value) {
				this.setInputValue(this.value);
			} else {
				this.setInputValue(0);
				this.$emit("input", 0);
			}
		},
		methods: {
			sendBackInputValue() {},
			input(e, newValue) {
				let value = e.target.value;

				value = this.reformatMoney(value);
				this.inputValue = value;
				this.inputValue = this.formatMoneyTwo(this.inputValue, 0);
				this.inputValueWithNumberStatus = value;
				this.validate();
				this.$emit("input", value);
			},
			setInputValue(newValue) {
				let value = newValue;
				this.inputValue = value;
				this.inputValue = this.formatMoneyTwo(this.inputValue, 0);
				this.inputValueWithNumberStatus = value;
				this.validate();
			},

			reformatMoney(value) {
				let letter = "";
				for (let i = 0; i < value.length; i++) {
					if (value[i] != ",") {
						if (!isNaN(value[i])) {
							letter += value[i];
						}
					}
				}
				return letter;
			},
			change() {
				this.$emit("change");
			},
		},
		watch: {
			value() {
				if (this.value) {
					this.setInputValue(this.value);
				} else {
					this.setInputValue(0);
					this.$emit("input", 0);
				}
				this.$emit("change");
			},
		},
	};
</script>
