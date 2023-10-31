<template>
  <v-card color="basil">
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="4">
            <ui-select
              :readonly="readonly"
              :options="{
                fields: {
                  id: 'TD_FID',
                  name: 'TD_FName',
                  search: 'TD_FName',
                },
                label: 'خصوصیت',
                count: 10,
              }"
              :items="defaults[220]"
              v-model="data.TPP_FID_Option"
            />
          </v-col>
          <v-col cols="4">
            <ui-input
              type="text"
              label="الویت"
              class="form_control_textInput"
              :readonly="readonly"
              v-model="data.TPP_FOrder"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <ui-select
              :readonly="readonly"
              :options="{
                fields: {
                  id: 'id',
                  name: 'name',
                  search: 'name',
                },
                label: 'نوع خصوصیت',
                count: 10,
              }"
              v-model="data.TPP_FID_Type"
              :items="TGP_FType"
            />
          </v-col>
          <v-col cols="4" v-if="data.TPP_FID_Type == 4 && showDependency">
            <ui-select
              :multiple="true"
              :readonly="readonly"
              :options="{
                fields: {
                  id: 'TD_FID',
                  name: 'TD_FName',
                  search: 'TD_FName',
                },
                label: 'مقادیر',
              }"
              v-model="data.TPP_FIDs_Value"
              :items="defaultsDependency"
            />
          </v-col>
          <v-col
            cols="4"
            v-if="data.TPP_FID_Type == 1 || data.TPP_FID_Type == 2"
          >
            <ui-input
              type="text"
              label="مقدار پیش فرض"
              class="form_control_textInput"
              :readonly="readonly"
              v-model="data.TPP_FID_Default"
            />
          </v-col>
          <v-col
            cols="4"
            v-if="data.TPP_FID_Type == 1 || data.TPP_FID_Type == 2"
          >
            <ui-input
              type="text"
              label="حداقل"
              class="form_control_textInput"
              :readonly="readonly"
              v-model.number="data.TGP_FMinValue"
            />
          </v-col>
          <v-col
            cols="4"
            v-if="data.TPP_FID_Type == 1 || data.TPP_FID_Type == 2"
          >
            <ui-input
              type="text"
              label="حداکثر"
              class="form_control_textInput"
              :readonly="readonly"
              v-model.number="data.TGP_FMaxValue"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-checkbox
              label="فعال"
              value="close"
              :disabled="readonly"
            ></v-checkbox>
          </v-col>
          <v-col cols="3">
            <v-checkbox label="ثابت" :disabled="readonly"></v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="mt-4 product_form_txtarea">
            <ui-textarea
              lable="شرح "
              row="3"
              :readonly="readonly"
              v-model="data.TPP_FComment"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-tabs v-model="headerTabs" v-if="tabShow">
      <v-tab v-for="(item, index) of tabs" :key="index">
        <span>{{ item.item.name }}</span>
      </v-tab>
    </v-tabs>

    <v-tabs-items
      v-model="headerTabs"
      v-if="tabShow"
      class="pt-6 form_options_tabs_item px-6"
    >
      <v-tab-item v-for="(item, index) of tabs" :key="index">
        <v-row>
          <v-col cols="6">
            <ui-input
              type="text"
              label="عنوان مقدار "
              class="form_control_textInput"
              :readonly="readonly"
              v-model="
                tabs[item.item.id]['data' + item.item.id]['TPPV_FCaption']
              "
            />
          </v-col>
          <v-col cols="6">
            <ui-input
              type="text"
              label="شرح مقدار "
              class="form_control_textInput"
              :readonly="readonly"
              v-model.number="
                tabs[item.item.id]['data' + item.item.id]['TPPV_FComment']
              "
            />
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import optionsMixins from "./_mixins/optionsPageSaleMixin";
export default {
  mixins: [optionsMixins],
  props: ["defaults", "data", "productID"],
  data() {
    return {
      table: {
        checkboxEnabled: true,
        selectedItems: [],
        unSelect: false,
        show: false,
        data: [],
        schema: {
          TGPD_FID_OptionDepend: "خصوصیت",
          TGPD_FID_ValueDepend: "مقدار خصوصیت",
          TGPD_FID_Type: "نوع ارتباط",
          TGPD_FComment: "توضیحات",
        },
        tableBtn: [],
      },
      tabShow: true,
      headerTabs: null,
      defaultsDependency: [],
      defaultsDependency2: [],
      test: [],
      tabs: {},
      showDependency: true,
      showDependency2: true,
      TGP_FType: [
        {
          id: 4,
          name: "انتخابی",
        },
        {
          id: 1,
          name: "عددی",
        },
        {
          id: 2,
          name: "پولی",
        },
        {
          id: 3,
          name: "تاریخ",
        },
      ],
      TGPD_FID_Type: [
        {
          id: 1,
          name: "وابستگی",
        },
        {
          id: 2,
          name: "استثنا",
        },
      ],
    };
  },
  methods: {

    setOptionsTabsValue(data) {
      this.tabShow = false;
      this.tabs = data;
      this.tabShow = true;
      this.$emit("tabsUpdate", this.tabs);
    },
    async getSubValueForDependancy(data) {
      this.showDependency2 = false;
      const result = await this.getOptions(data);
      this.defaultsDependency2 = result.data.defaults.subGroup;
      this.showDependency2 = true;
    },
    addDependancy(data) {
      console.log("asdaseeeee" ,data);
      this.tabs[data.item.id].dependencyValue.push({
        ...data["dependency" + data.item.id],
      });
      this.table.show = true;
    },
  },
  watch: {
    async "data.TPP_FID_Option"(newValue) {
      this.tabShow = false;
      this.showDependency = false;
      this.data.TGP_FDependency = [];
      const result = await this.getOptions(newValue);
      this.defaultsDependency = result.data.defaults.subGroup;
      this.showDependency = true;
    },
    "data.TPP_FIDs_Value"(newValue, oldValue) {
      console.log("sdfhksjdfkshdfkjshdf",newValue);
      let optionsTabs = {};
      if (newValue[newValue.length - 1] === undefined) {
        return;
      } else if (oldValue.length > newValue.length) {
        optionsTabs = { ...this.tabs };
        let deletedItem = oldValue.filter(
          (itOld) =>
            newValue.filter((itNew) => itNew.id == itOld.id).length == 0
        );

        delete this.tabs[deletedItem[0].id];
      } else {
        optionsTabs = { ...this.tabs };
        optionsTabs[newValue[newValue.length - 1].id] = {
          item: newValue[newValue.length - 1],
          ["data" + newValue[newValue.length - 1].id]: {
            TPPV_FID_PageSale: this.productID,
            TPPV_FID_Option: "",
            TPPV_FID_Value: "",
            TPPV_FCaption: "",
            TPPV_FComment: "",
            TPPV_FActive: "",
            TPPV_FID_PageOption: "",
            TPPV_FDelete: "",
          },
        };
        this.setOptionsTabsValue(optionsTabs);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form_options_tabs_item {
  min-height: 300px !important;
}
</style>