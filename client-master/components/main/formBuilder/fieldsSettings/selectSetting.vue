<template>
  <div>
    <v-row>

      <template v-if="data.TFF_FType == 'select' || data.TFF_FType == 'multiselect'">
        <v-col cols="12" class="py-1 px-3">
          <ui-input class="form_control_textInput" label="افزودن مقادیر" v-model="item" @keyup="addItem" />
          <span class="float-left">بعد از ورود Enter بزنید</span>
        </v-col>

        <v-col cols="12" class="py-1 px-3 pt-5 mb-5">
          <div class="d-flex flex-wrap">
            <template v-for="item in data.items">
              <v-chip v-if="item.TFF_FDelete==0" class="ml-1 mb-1">
                <span>{{ item.name }}</span>
                <v-btn icon class="mr-2">
                  <v-icon @click="removeItem(item)">mdi-close</v-icon>
                </v-btn>
              </v-chip>
            </template>
          </div>
        </v-col>
      </template>

      <template v-if="data.TFF_FType == 'selectSystem' || data.TFF_FType == 'multiSelectSystem'">
        <v-col cols="12" class="py-1 px-3 my-5">
          <ui-input class="form_control_textInput" label="مقدار سیستمی" v-model="data.sysItem" />
        </v-col>

      </template>

      <v-col cols="12" class="py-1 px-3">
        <ui-input class="form_control_textInput" label="عنوان" v-model="data.TFF_FLable" />
      </v-col>

      <v-col cols="12" class="py-1 px-3">
        <ui-input class="form_control_textInput" label="متن داخل فیلد" placeholder="placeholder"
          v-model="data.TFF_FPlaceHolder" />
      </v-col>

      <v-col cols="12" class="py-1 px-3">
        <ui-input class="form_control_textInput" label="مقدار پیشفرض" v-model="data.TFF_FDefault" />
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
        <v-checkbox label="اجباری بودن" v-model="data.TFF_FRequire"></v-checkbox>
      </v-col>

    </v-row>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      id: 0,
      item: ""
    };
  },
  computed: {

    itemID() {
      let idList = [];
      for (const item of this.data.items) {
        idList.push(item.id);
      }
      let id = Math.max(...idList);
      id++;
      return id;
    }
  },
  methods: {
    addItem() {
      this.data.items.push({
        name: this.item,
        isnew: true,
        TFF_FDelete: 0
      });
      
      this.item = "";
    },

    removeItem(item) {
      const index = this.data.items.indexOf(item);
      console.log(index);
      if (index > -1) {
        // this.data.items.splice(index, 1);
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
