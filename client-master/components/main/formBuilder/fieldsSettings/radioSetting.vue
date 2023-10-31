<template>
  <div>
    <v-row>

      <v-col cols="12" class="py-1 px-3">
        <ui-input class="form_control_textInput" label="افزودن رادیو" v-model="title" @keyup="addItem" />
        <span class="float-left">بعد از ورود Enter بزنید</span>
      </v-col>
      
      <v-col cols="12" class="py-1 px-3 pt-5 mb-5">
        <div class="d-flex flex-wrap">
          <template v-for="item in data.items">
            <v-chip v-if="item.TFF_FDelete==0" class="ml-1 mb-1">
              <span class="">{{ item.title }}</span>
              <v-btn icon class="mr-1">
                <v-icon @click="removeItem(item)">mdi-close</v-icon>
              </v-btn>
            </v-chip>
          </template>
        </div>
      </v-col>

      <v-col cols="12" class="py-1 px-3">
        <ui-input class="form_control_textInput" label="عنوان" v-model="data.TFF_FLable" />
      </v-col>

      <v-col cols="6" class="py-1 px-3">
        <ui-input class="form_control_textInput" label="ستون" v-model="data.TFF_FColumn" />
      </v-col>

      <v-col cols="6" class="py-1 px-3">
        <ui-input class="form_control_textInput" label="ترتیب" v-model="data.TFF_FOrder" />
      </v-col>

      <v-col cols="12" class="py-1 px-3">
        <ui-input class="form_control_textInput" label="ایکون" v-model="data.TFF_FIcon" />
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
  data() {
    return {
      title: "",
      value: ""
    };
  },
  methods: {
    addItem() {
      this.data.items.push({ title: this.title, isnew: true, TFF_FDelete: 0 });
      this.title = "";
      this.value = "";
    },
    removeItem(item) {
      const index = this.data.items.indexOf(item);
      console.log(index);
      if (index > -1) {
        this.data.items[index].TFF_FDelete = 1;
      }
    },
    submit() {
      this.$emit("submit", this.data);
    }
  }
};
</script>

<style lang="scss">

</style>
