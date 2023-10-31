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
                        search: 'TD_FName'
                      },
                      label: 'خصوصیت',
                      count: 10
                    }"
                :items="defaults[220]"
                v-model="data.TGP_FID_Option"
              />
            </v-col>

            <v-col cols="4">
              <ui-input
                type="text"
                class="form_control_textInput"
                label="نام خصوصیت"
                :readonly="readonly"
                v-model="data.TGP_FLabel"
              />
            </v-col>
            <v-col cols="4">
              <ui-input
                type="text"
                label="اولویت"
                class="form_control_textInput"
                :readonly="readonly"
                v-model="data.TGP_FOrder"
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
                        search: 'name'
                      },
                      label: 'نوع خصوصیت',
                      count: 10
                    }"
                v-model="data.TGP_FType"
                :items="TGP_FType"
              />
            </v-col>
            <v-col cols="4" v-if="data.TGP_FType == 4 && showDependency">
              <ui-select
                :multiple="true"
                :readonly="readonly"
                :options="{
                      fields: {
                        id: 'TD_FID',
                        name: 'TD_FName',
                        search: 'TD_FName'
                      },
                      label: 'مقادیر',
                    }"
                v-model="data.TGP_FDependency"
                :items="defaultsDependency"
              />
            </v-col>
            <v-col cols="4" v-if="data.TGP_FType == 1 || data.TGP_FType == 2 ">
              <ui-input
                type="text"
                label="مقدار پیش فرض"
                class="form_control_textInput"
                :readonly="readonly"
                v-model="data.TGP_FIndexDef"
              />
            </v-col>
            <v-col cols="4" v-if="data.TGP_FType == 1 || data.TGP_FType == 2 ">
              <ui-input
                type="text"
                label="حداقل"
                class="form_control_textInput"
                :readonly="readonly"
                v-model.number="data.TGP_FMinValue"
              />
            </v-col>
            <v-col cols="4" v-if="data.TGP_FType == 1 || data.TGP_FType == 2 ">
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
              <v-checkbox label="فعال" value="close" :disabled="readonly"></v-checkbox>
            </v-col>
            <v-col cols="3">
              <v-checkbox label="ثابت" :disabled="readonly"></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="mt-4 product_form_txtarea">
              <ui-textarea lable="شرح " row="3" :readonly="readonly" v-model="data.TGP_FValue" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-tabs v-model="headerTabs" v-if="tabShow">
        <v-tab v-for="(item, index) of tabs " :key="index">
          <span>{{item.item.name}}</span>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="headerTabs" v-if="tabShow" class="pt-6 form_options_tabs_item px-6">
        <v-tab-item v-for="(item, index) of tabs" :key="index">
          <v-row>
            <v-col cols="3">
              <ui-select
                :readonly="readonly"
                :options="{
                      fields: {
                        id: 'TGO_FID',
                        name: 'TGO_FName',
                        search: 'TGO_FName'
                      },
                      label: 'کالا',
                    }"
                :items="defaults['goodsList']"
                v-model="tabs[item.item.id]['data' + item.item.id]['TGPV_FID_Goods']"
              />
            </v-col>
            <v-col cols="4">
              <ui-input
                v-model="item['data' + item.item.id].TGPV_FComment"
                label="شرح"
                class="form_control_textInput"
                :readonly="readonly"
              />
            </v-col>
            <v-col cols="1">
              <ui-input
                label="ضریب"
                class="form_control_textInput"
                :readonly="readonly"
                v-model="tabs[item.item.id]['data' + item.item.id]['TGPV_FCount']"
              />
            </v-col>
            <v-col cols="1">
              <ui-input
                label="تکرار"
                class="form_control_textInput"
                :readonly="readonly"
                v-model="tabs[item.item.id]['data' + item.item.id]['TGPV_FRepet']"
              />
            </v-col>
            <v-col cols="3">
              <ui-select
                :readonly="readonly"
                :options="{
                      fields: {
                        id: 'TD_FID',
                        name: 'TD_FName',
                        search: 'TD_FName'
                      },
                      label: 'مدیریت موجودی',
                    }"
                :items="defaults[222]"
                v-model="tabs[item.item.id]['data' + item.item.id]['TGPV_FID_Option']"
              />
            </v-col>
          </v-row>

          <v-row class="mt-8">
            <v-col cols="12" md="3" sm="6">
              <ui-select
                :readonly="readonly"
                :options="{
                      fields: {
                        id: 'id',
                        name: 'name',
                        search: 'name'
                      },
                      label: 'نوع ارتباط',
                    }"
                :items="TGPD_FID_Type"
                v-model="tabs[item.item.id]['dependency' + item.item.id]['TGPD_FID_Type']"
              />
              <!--  -->
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <ui-select
                :readonly="readonly"
                :options="{
                      fields: {
                        id: 'TD_FID',
                        name: 'TD_FName',
                        search: 'TD_FName'
                      },
                      label: 'خصوصیت',
                    }"
                :items="defaults[220]"
                v-model="tabs[item.item.id]['dependency' + item.item.id]['TGPD_FID_OptionDepend']"
                @change="getSubValueForDependancy(tabs[item.item.id]['dependency' + item.item.id]['TGPD_FID_OptionDepend'])"
              />
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <ui-select
                v-if="showDependency2"
                :readonly="readonly"
                :options="{
                      fields: {
                        id: 'TD_FID',
                        name: 'TD_FName',
                        search: 'TD_FName'
                      },
                      label: 'مقدار خصوصیت',
                    }"
                v-model="tabs[item.item.id]['dependency' + item.item.id]['TGPD_FID_ValueDepend']"
                :items="defaultsDependency2"
              />
            </v-col>
            <v-col cols="12" md="2" sm="6">
              <ui-input
                v-model="tabs[item.item.id]['dependency' + item.item.id]['TGPD_FComment']"
                label="شرح"
                class="form_control_textInput"
                :readonly="readonly"
              />
            </v-col>
            <v-col cols="12" md="1" class="form_options_dependancy_add_btn">
              <p @click="addDependancy(tabs[item.item.id])">
                <span>افزودن</span>
                <v-icon>mdi-plus</v-icon>
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <!-- tabs[item.item.id][dependencyValue] -->
              <ui-table
                :data="tabs[item.item.id].dependencyValue || []"
                v-if="table.show"
                class="pt-5 list_manage_customer_table"
                :dataSchema="table.schema"
              />
              <!-- idField="TGPD_FComment" -->
              <!-- :tableBtn="table.tableBtn" -->
              <!-- :checkboxDisabled="table.checkboxEnabled" -->
              <!-- :clearRows="table.unSelect" -->
              <!-- :hideCheckBoxAll="true" -->
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
</template>

<script>
import optionsMixins from "./_mixins/optionsMixin";
export default {
  mixins: [optionsMixins],
  props: ["defaults", "data"],
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
  async mounted() {
    // this.data.TGP_FDependency
    // if (this.data.TGP_FDependency.length > 0) {
    //   this.showDependency = false;
    //   const result = await this.getOptions(this.data.TGP_FID_Option);
    //   this.defaultsDependency = result.data.defaults.subGroup;
    //   this.setMountedDependancyValue();
    // const dependancy = this.data.TGP_FDependency.split(",");
    // dependancy.pop();
    // // console.log(dependancy);
    // for(let item of dependancy) { 
    //   let value = this.defaultsDependency.filter(val => val.TD_FID == item )
    //   console.log("value", typeof this.data.TGP_FDependency )
    //   this.tabs.push(value)
    // }

    //   this.showDependency = true;
    // }
  },
  computed: {},
  methods: {
    setMountedDependancyValue() {
    },
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
      console.log("add dependancy ", data);
      this.tabs[data.item.id].dependencyValue.push({
        ...data["dependency" + data.item.id],
      });
      this.table.show = true;
    },
  },
  watch: {
    async "data.TGP_FID_Option"(newValue) {
      this.tabShow = false;
      this.showDependency = false;
      this.data.TGP_FDependency = [];
      const result = await this.getOptions(newValue);
      this.defaultsDependency = result.data.defaults.subGroup;
      this.showDependency = true;
    },
    "data.TGP_FDependency"(newValue, oldValue) {
      let optionsTabs = {};
      if (newValue[newValue.length - 1] === undefined) {
        return;
      } else if (oldValue.length > newValue.length) {
        // if (typeof oldValue === "string") {
        //   this.setMountedDependancyValue();
        //   return;
        // }
        // //deleted
        console.log("old", typeof oldValue);
        console.log("new", typeof newValue);
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
            TGPV_FID_Goods: "",
            TGPV_FID_Option: "",
            TGPV_FCount: "",
            TGPV_FRepet: "",
            TGPV_FComment: "",
          },
          ["dependency" + newValue[newValue.length - 1].id]: {
            TGPD_FID_OptionDepend: "",
            TGPD_FID_ValueDepend: "",
            TGPD_FID_Type: "",
            TGPD_FComment: "",
          },
          dependencyValue: [],
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