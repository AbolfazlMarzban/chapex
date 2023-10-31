<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
      persistent
      class="goods_dialogs_main"
    >
      <v-card class="goods_dialog">
        <v-card-title> </v-card-title>

        <v-card-text>
          <div class="goods_dialog_title">تعریف خصوصیت</div>
          <v-divider></v-divider>

          <div class="goods_dialog_text">
            <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>خصوصیت : </label> </span>
              </v-col>
              <v-col cols="8">
                <ui-select
                  class="mx_margitn-top-0"
                  :readonly="readonly"
                  :options="{
                    fields: {
                      id: 'TD_FID',
                      name: 'TD_FName',
                      search: 'TD_FName',
                    },
                    label: '',
                    count: 10,
                  }"
                  :items="defaults[220]"
                  v-model="data.TGP_FID_Option"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>نام خصوصیت : </label> </span>
              </v-col>
              <v-col cols="8">
                <ui-input
                  type="text"
                  class="form_control_textInput mt-0"
                  label=""
                  :readonly="readonly"
                  v-model="data.TGP_FLabel"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>اولویت : </label> </span>
              </v-col>
              <v-col cols="8">
                <ui-input
                  type="text"
                  label=""
                  class="form_control_textInput mt-0"
                  :readonly="readonly"
                  v-model="data.TGP_FOrder"
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
                  :readonly="readonly"
                  :options="{
                    fields: {
                      id: 'id',
                      name: 'name',
                      search: 'name',
                    },
                    label: '',
                    count: 10,
                  }"
                  v-model="data.TGP_FType"
                  :items="TGP_FType"
                />
              </v-col>
            </v-row>
            <v-row v-if="data.TGP_FType == 4">
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>مقادیر : </label> </span>
              </v-col>
              <v-col cols="8">
                <ui-select
                  v-if="dependancyListShow"
                  class="mx_margitn-top-0"
                  :multiple="true"
                  :readonly="readonly"
                  :options="{
                    fields: {
                      id: 'TD_FID',
                      name: 'TD_FName',
                      search: 'TD_FName',
                    },
                    label: '',
                  }"
                  v-model="data.TGP_FDependency"
                  :items="defaultsDependency"
                />
              </v-col>
            </v-row>
            <v-row v-if="data.TGP_FType == 1 || data.TGP_FType == 2">
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>مقدار پیش فرض : </label> </span>
              </v-col>
              <v-col cols="8">
                <ui-input
                  type="text"
                  label=""
                  class="form_control_textInput mt-0"
                  :readonly="readonly"
                  v-model="data.TGP_FIndexDef"
                />
              </v-col>
            </v-row>
            <v-row v-if="data.TGP_FType == 1 || data.TGP_FType == 2">
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>حداقل : </label> </span>
              </v-col>
              <v-col cols="8">
                <ui-input
                  type="text"
                  label=""
                  class="form_control_textInput mt-0"
                  :readonly="readonly"
                  v-model.number="data.TGP_FMinValue"
                />
              </v-col>
            </v-row>
            <v-row v-if="data.TGP_FType == 1 || data.TGP_FType == 2">
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>حداکثر : </label> </span>
              </v-col>
              <v-col cols="8">
                <ui-input
                  type="text"
                  label=""
                  class="form_control_textInput mt-0"
                  :readonly="readonly"
                  v-model.number="data.TGP_FMaxValue"
                />
              </v-col>
            </v-row>

            <v-row class="align-center">
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label> شرح : </label> </span>
              </v-col>
              <v-col cols="8" class="product_form_txtarea">
                <ui-textarea
                  lable=" "
                  row="3"
                  :readonly="readonly"
                  v-model="data.TGP_FValue"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-checkbox
                  class="float-left"
                  label="فعال"
                  v-model="data.TGP_FActive"  
                  :value="1"
                  :disabled="readonly"
                ></v-checkbox>
              </v-col>

              <v-col cols="6">
                <v-checkbox
                  class="float-left"
                  label="ثابت"
                  :disabled="readonly"
                ></v-checkbox>
              </v-col>
            </v-row>
          </div>
          <v-divider></v-divider>
          <v-btn
            text
            v-if="status == 'insert'"
            @click="insert"
            class="goods_dialog_btn mt-4"
          >
            ثبت
          </v-btn>
          <v-btn
            text
            @click="updateMode"
            v-if="status == 'show'"
            class="goods_dialog_btn mt-4"
          >
            ثبت
          </v-btn>
          <v-btn
            text
            @click="$emit('closeDialog')"
            class="goods_dialog_btn mt-4"
          >
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
import "../../../assets/style/product/productDialog.scss";
import optionsMixins from "./_mixins/optionsMixin";

export default {
  props: ["defaults", "data", "status"],
  mixins: [optionsMixins],
  data() {
    return {
      oldData: [],
      dependancyListShow: true,
      defaultsDependency: [],

      dialog: true,
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
    };
  },
  async mounted() {
    if (this.status == "show") {
      const result = await this.getOptions(this.data.TGP_FID_Option);
      this.defaultsDependency = result.data.defaults.subGroup;
      let dependencyList = this.data.TGP_FDependency.split(",");
      this.data.TGP_FDependency = [];
      dependencyList.pop();
      this.dependancyListShow = false;
      for (let dependency of dependencyList) {
        let dependancyNumber = Number(dependency);
        let name = this.defaultsDependency.find(
          (item) => item.TD_FID === dependancyNumber
        );
        this.data.TGP_FDependency.push({
          TD_FID: dependancyNumber,
          TD_FName: name.TD_FName,
        });
      }
      this.dependancyListShow = true;
      this.oldData = [...this.data.TGP_FDependency];
    }
  },
  methods: {
    updateMode() {
      const newDependancy = this.data.TGP_FDependency;
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
    insert() {
      if (this.status == "show") {
        this.updateMode();
        return;
      }
      this.$emit("insert");
    },
  },
  watch: {
    "this.oldData.TGP_FDependency"(newValue) {
      console.log(newValue);
    },
    async "data.TGP_FID_Option"(newValue) {
      this.data.TGP_FDependency = [];
      const result = await this.getOptions(newValue);
      this.defaultsDependency = result.data.defaults.subGroup;
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
</style>
