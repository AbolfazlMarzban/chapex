<template>
  <div>
    <v-row>

      <v-col cols="12" class="py-1 px-3">
        <ui-input
          class="form_control_textInput"
          label="عنوان"
          v-model="data.TFF_FLable"
        />
      </v-col>

      <v-col cols="12" class="py-1 px-3">
        <v-checkbox label="مقدار پیشفرض" v-model="data.TFF_FDefault"></v-checkbox>
      </v-col>

      <v-col cols="6" class="py-1 px-3">
        <ui-input
          class="form_control_textInput"
          label="ستون"
          v-model="data.TFF_FColumn"
        />
      </v-col>

      <v-col cols="6" class="py-1 px-3">
        <ui-input
          class="form_control_textInput"
          label="ترتیب"
          v-model="data.TFF_FOrder"
        />
      </v-col>

      <v-col cols="12" class="py-1 px-3">
        <ui-input
          class="form_control_textInput"
          label="ایکون"
          v-model="data.TFF_FIcon"
        />
      </v-col>

      <v-col cols="12" class="py-1 px-3">
        <ui-input
          class="form_control_textInput"
          label="توضیحات"
          v-model="data.TFF_FToolTip"
        />
      </v-col>

      <v-col cols="6" class="py-1 px-3">
        <v-checkbox label="فعال" v-model="data.TFF_FActive"></v-checkbox>
      </v-col>

      <v-col cols="6" class="py-1 px-3">
        <v-checkbox label="اجباری بودن" v-model="data.TFF_FRequired"></v-checkbox>
      </v-col>

    </v-row>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    submit() {
      this.$emit("submit", this.data);
    }
  }
};
</script>

<style lang="scss"></style>
