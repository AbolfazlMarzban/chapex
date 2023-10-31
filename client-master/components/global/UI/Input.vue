<template>
	<div class="mb-2">
		<input :placeholder="placeholder" :disabled="readonly" :class="['form-control form__field', className]" :id="[name]"
			@input="sendBackInputValue" @blur="clickInput" @keyup.enter="$emit('keyup')" :value="value"
			:maxlength="maxLength" :type="type" />
		<label class="labelInput">{{ label }}</label>
		<span class="input_errorMessages">{{ errorMessages[0] }}</span>
	</div>
</template>

<script>

import inputMixin from "../../../plugins/mixins/UI-mixins/input";

export default {
	props: ["value", "readonly", "maxLength", "deleteForm"],
	data() {
		return {
			showIcon: true,
			inputValue: "",
		};
	},
	mixins: [inputMixin],
	methods: {
		sendBackInputValue(e) {
			this.inputValue = e.target.value;
			this.$emit("input", this.inputValue);
		},
		clickInput() {
			this.validate(this.inputValue);
		},
	},
	watch: {
		inputValue(newValue) {
			this.validate(this.inputValue);
		},
		value() {
			// در صورت نبودن این خط دیگر اعتبار سنجی بر رویه دیتا غیر همزمان صورت نمیگیرد
			this.validate(this.value);
			this.$emit("change");
		},
	},
	destroyed() {
		this.validate(this.value);
	},
		deleteForm(){
			this.inputValue = ""
		}
};
</script>

<style lang="scss" src="../../../assets/style/Ul/Input.scss" ></style>
<style lang="scss">
.input_errorMessages {
	font-size: 0.6rem;
	color: rgb(228, 120, 120);
}
</style>