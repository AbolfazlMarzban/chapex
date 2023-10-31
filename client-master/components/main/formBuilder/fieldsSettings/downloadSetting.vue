<template>
  <div>
    <v-row>  

      <v-col cols="12" class="py-1 px-3">
        <ui-input class="form_control_textInput" label="عنوان" v-model="data.TFF_FLable" />
      </v-col>

      <v-col cols="8" class="py-1 px-3"></v-col>

      <v-col cols="12" class="py-1 px-3">
        <ui-input class="form_control_textInput" label=" لینک دانلود" v-model="data.TFF_FDefault" />
      </v-col>

      <v-col cols="6" class="py-1 px-3">
        <ui-input class="form_control_textInput" label="ستون" v-model="data.TFF_FColumn" />
      </v-col>

      <v-col cols="6" class="py-1 px-3">
        <ui-input class="form_control_textInput" label="ترتیب" v-model="data.TFF_FOrder" />
      </v-col>
      
      <v-col cols="12" class="py-1 px-3">
        <ui-input class="form_control_textInput" label="توضیحات" v-model="data.TFF_FToolTip" />
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
  computed: {
    title() {
      let type = this.data.type;
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
      } else if (type == "link") {
          title = "دانلود";
      }
      return title;
    },
  },
  methods: {
    submit() {
      this.$emit("submit", this.data);
    },
  },
};
</script>

<style lang="scss" >
</style>