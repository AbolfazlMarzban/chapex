<template>
  <div
    class="form-group form__group field"
    :class="{ 'form-group--error': errorMessages.length > 0 }"
  >
    <div class="errorStyleTextarea" v-if="true">{{ errorMessages[0] }}</div>
    <div class="errorStyleTextarea" v-if="false">حداقل {{'aaaaaaaaa'}} کاراکتر.</div>
    <textarea
      :rows="row"
      :disabled="readonly" 
      class="form-control form__field"
      :id="[name]"
      @input="sendBackInputValue"
      @blur="clickInput"
      :value="value"
      :placeholder="placeholder"
    ></textarea>
    <label :for="[name]" class="form__label">{{lable}}</label>
  </div>
</template>
<script>
import TextareaMixin from "./../../../plugins/mixins/UI-mixins/textarea";

export default {
  name: "Input",
  props: ["value", "readonly", "deleteForm"],
  mixins: [TextareaMixin],
  data() {
    return {
      TextareaValue: "",
    };
  },
  methods: {
    sendBackInputValue(e) {
      // ولیدت کردن فیلد
      this.validate();
      if (!this.checkMaxLength()) {
        this.$emit("input", e.target.value);
      }
    },
    clickInput() {
      this.validate();
    },
  }
};
</script>

<style lang="scss" src="../../../assets/style/Ul/Textarea.scss">
</style>