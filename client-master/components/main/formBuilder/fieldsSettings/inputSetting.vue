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
        <ui-input
          class="form_control_textInput"
          label="متن داخل فیلد"
          placeholder="placeholder"
          v-model="data.TFF_FPlaceHolder"
        />
      </v-col>

      <v-col cols="12" class="py-1 px-3">
        <ui-input
          class="form_control_textInput"
          label="مقدار پیشفرض"
          v-model="data.TFF_FDefault"
        />
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
        <ui-input
          class="form_control_textInput"
          label="حداقل"
          v-model="data.TFF_FLenMin"
        />
      </v-col>
      <v-col cols="6" class="py-1 px-3">
        <ui-input
          class="form_control_textInput"
          label="حداکثر"
          v-model="data.TFF_FLenMax"
        />
      </v-col>
      <v-col cols="6" class="py-1 px-3">
        <v-checkbox label="فعال" v-model="data.TFF_FActive"  ></v-checkbox>
      </v-col>
      <v-col cols="6" class="py-1 px-3">
        <v-checkbox label="اجباری بودن" v-model="data.TFF_FRequired"></v-checkbox>
      </v-col>

      <!-- <v-col cols="12" class="py-1 px-3">
        <v-btn class="inputs_settings_cancel_btn" @click="$emit('closeSetting')">انصراف</v-btn>
        <v-btn class="inputs_settings_submit_btn" @click="submit">تایید</v-btn>
      </v-col> -->
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["data"],
  computed: {
    title() {
      let type = this.data.TFF_FID_TypeFieldName;
      let title;
      if (type == "input") {
        title = "متن ساده";
      } else if (type == "textarea") {
        title = "متن چند خطی";
      } else if (type == "number") {
        title = "عدد";
      } else if (type == "money") {
        title = "پولی";
      } else if (type == "phone") {
        title = "شماره تماس";
      } else if (type == "date") {
        title = "تاریخ";
      } else if (type == "time") {
        title = "زمان";
      } else if (type == "email") {
        title = "ایمیل";
      }
      return title;
    }
  },
  methods: {
    submit() {
      this.$emit("submit", this.data);
    }
  }
};
</script>

<style lang="scss"></style>
