<template>
  <div class="text-center">
    <v-dialog persistent v-model="dialog" width="500" class="goods_dialogs_main">
      <v-card class="goods_dialog">
        <v-card-title> </v-card-title>
        {{this.data.TPP_FID_Option}}
        <v-card-text>
          <div class="goods_dialog_title">افزودن خصوصیت</div>
          <v-divider></v-divider>
          <div class="goods_dialog_text">
            <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>نام خصوصیت : </label> </span>
              </v-col>
              <v-col cols="8">
                <ui-select class="mx_margitn-top-0" :options="{
                  fields: {
                    id: 'TD_FID',
                    name: 'TD_FName',
                    search: 'TD_FName',
                  },
                  label: '',
                  count: 10,
                }" :items="defaults[220]" v-model="data.TPP_FID_Option" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>الویت : </label> </span>
              </v-col>
               <v-col cols="8">
            <ui-input
              type="text"
              label=""
              class="form_control_textInput mt-0"
              v-model="data.TPP_FOrder"
            />
          </v-col>
            </v-row>

            <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>نوع خصوصیت : </label> </span>
              </v-col>
                 <v-col cols="8">
            <ui-select
           class="mx_margitn-top-0"
              :options="{
                fields: {
                  id: 'id',
                  name: 'name',
                  search: 'name',
                },
                label: '',
                count: 10,
              }"
              v-model="data.TPP_FID_Type"
              :items="TGP_FType"
            />
          </v-col>
            </v-row>
            <v-row v-if="data.TPP_FID_Type == 4 && showDependency">
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>مقادیر : </label> </span>
              </v-col>
              <v-col cols="8">
                <ui-select
            class="mx_margitn-top-0"
              :multiple="true"
              :options="{
                fields: {
                  id: 'TD_FID',
                  name: 'TD_FName',
                  search: 'TD_FName',
                },
                label: '',
              }"
              v-model="data.TPP_FIDs_Value"
              :items="defaultsDependency"
            />
              </v-col>
            </v-row>
            <v-row v-if="data.TPP_FID_Type == 1 || data.TPP_FID_Type == 2">
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>مقدار پیش فرض : </label> </span>
              </v-col>
              <v-col cols="8">
                <ui-input type="text" label="" class="form_control_textInput mt-0"
                  v-model="data.TPP_FID_Default" />
              </v-col>
            </v-row>

            <v-row v-if="data.TPP_FID_Type == 1 || data.TPP_FID_Type == 2">
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>حداقل : </label> </span>
              </v-col>
              <v-col cols="8">
                <ui-input type="text" label="" class="form_control_textInput mt-0"
                  v-model.number="data.TGP_FMinValue" />
              </v-col>
            </v-row>

            <v-row v-if="data.TPP_FID_Type == 1 || data.TPP_FID_Type == 2">
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label> حداکثر : </label> </span>
              </v-col>
              <v-col cols="8">
                <ui-input type="text" label="" class="form_control_textInput mt-0"
                  v-model.number="data.TGP_FMaxValue" />
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>شرح : </label> </span>
              </v-col>
              <v-col cols="8" class="mt-4 product_form_txtarea">
                <ui-textarea lable="" row="3" v-model="data.TPP_FComment" />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="2" class="goods_dialog_align_left">
                <v-checkbox class="float-left" label=" فعال " value="close">
                </v-checkbox>
              </v-col>


              <v-col cols="2" class="goods_dialog_align_left">
                <v-checkbox class="float-left" label="ثابت "></v-checkbox>
              </v-col>
               <v-col cols="4" class="goods_dialog_align_left">
                <v-checkbox class="float-left" label="دکمه ی رادیویی "></v-checkbox>
              </v-col>
              <v-col cols="4" class="goods_dialog_align_left">
                <v-checkbox class="float-left" label="کمبو لیست "></v-checkbox>
              </v-col>
            </v-row>

          </div>
          <v-divider></v-divider>
          <v-btn text v-if="status == 'insert'" @click="$emit('submit')" class="goods_dialog_btn mt-4">
            تایید
          </v-btn>
          <!-- <v-btn text v-if="status == 'show'" @click="updateMode" class="goods_dialog_btn mt-4">
            تایید
          </v-btn> -->

          <v-btn text @click="$emit('cancel')" class="goods_dialog_btn mt-4">
            بستن
          </v-btn>


        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import optionsMixins from "../options_copy/_mixins/optionsPageSaleMixin";
export default {
  mixins: [optionsMixins],
  props: ["defaults", "data", "productID", "status"],

  async mounted() {
    if (this.status == "show") {
      const result = await this.getOptions(this.data.TPP_FID_Option);
      this.defaultsDependency = result.data.defaults.subGroup;
      let dependencyList = this.data.TPP_FIDs_Value.split(",");
      this.data.TPP_FIDs_Value = [];
      this.dependancyListShow = false;
      for (let dependency of dependencyList) {
        let dependancyNumber = Number(dependency);
        let name = this.defaultsDependency.find(
          (item) => item.TD_FID === dependancyNumber
        );
        this.data.TPP_FIDs_Value.push({
          TD_FID: dependancyNumber,
          TD_FName: name.TD_FName,
        });
      }
      this.dependancyListShow = true;
      this.oldData = [...this.data.TPP_FIDs_Value];
    }
  },
  data() {
    return {
      optString: '',
      optValues:[],
      optValue: '',
      dialog: true,
      oldData: [],
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
    addOptionValue(){
      this.optValues.push(this.optValue)
      this.optValue = ''
      this.data.TPP_FIDs_ValueName = this.optValues.toString()
    },
    updateMode() {
      const newDependancy = this.data.TPP_FIDs_Value;
      let differentsID;
      let status;
      if (this.oldData.length > newDependancy.length) {
        status = "delete";
        differentsID = this.oldData.filter(
          (obj) =>
            !newDependancy.some((oldValue) => oldValue.TD_FID === obj.TD_FID)
        );
      } else if (this.oldData.length < newDependancy.length) {
        status = "insert";
        differentsID = newDependancy.filter(
          (obj) =>
            !this.oldData.some((oldValue) => oldValue.TD_FID === obj.TD_FID)
        );
      } else if (this.oldData.length == newDependancy.length) {
        status = "dontChange";
      }
      this.$emit("update", differentsID, status);
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
      // this.data.TGP_FDependency = [];
      const result = await this.getOptions(newValue);
      this.defaultsDependency = result.data.defaults.subGroup;
      this.showDependency = true;
    },
    "data.TPP_FIDs_Value"(newValue, oldValue) {
      console.log(newValue);
    },
  },
};
</script>

<style lang="scss">
.mx_margitn-top-0 {
  .mx_Select {
    margin-top: 0 !important;
  }
}
.optInput input{
  height: 30px;
}
</style>

