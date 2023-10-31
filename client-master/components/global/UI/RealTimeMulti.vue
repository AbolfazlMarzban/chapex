<template>
  <div>
    <v-col cols="12" md="12">
      <p @click="openRealTimeDialog" class="real_time_multi_add_btn">
        <span> افزودن </span>
        <v-icon>mdi-plus</v-icon>
      </p> 
    </v-col>
    <ui-table
      v-if="table.show"
      class="pt-5 list_manage_customer_table"
      :dataSchema="table.schema"
      :tableBtn="table.tableBtn"
      :checkboxDisabled="table.checkboxEnabled" 
      :clearRows="table.unSelect" 
      :hideCheckBoxAll="true"
      :imageField="table.imageField"
      idField="TPIC_FID"
      :data="table.data"
      @delete="deleteItem"
      @selectedRowChanged="selectedRowChanged"
    />

    <v-dialog
      persistent
      v-model="realTimeDialog"
      width="500"
      class="goods_dialogs_main"
    >
      <v-card class="goods_dialog">
        <v-card-title> </v-card-title>

        <v-card-text>
          <div class="goods_dialog_title">انجام عملیات</div>
          <v-divider></v-divider>
          <div class="goods_dialog_text">
            <v-row>
              <v-col cols="12" md="12">
                <!-- v-model="data.TGO_FPicOrder"
        :id="'file4'"
        :readonly="readonly"
        label="تصویر"
        :options="{
          state: 'product',
        }"
        processSteps="upload" -->
                <ui-file-real-time
                  v-model="form.TPIC_FAddress"
                  :options="{
                    state: 'pageSale',
                  }"
                  processSteps="upload"
                  :id="'realTime'"
                />
              </v-col>

              <v-col cols="12" md="12">
                <ui-input
                  type="text"
                  class="form_control_textInput"
                  label="اسم"
                  v-model="form.TPIC_FName"
                />
                <!-- :readonly="readonly"
                  v-model="data.TGO_FName" -->
              </v-col>

              <v-col cols="12" md="12">
                <ui-input
                  type="text"
                  class="form_control_textInput"
                  label="ترتیب"
                  v-model="form.TPIC_FOrder"
                />
              </v-col>

              <v-col cols="12" md="12">
                <ui-input
                  type="text"
                  class="form_control_textInput"
                  label="متن جایگزین"
                  v-model="form.TPIC_FComment"
                />
              </v-col>
              <v-col cols="12" md="12">
                <!-- v-model="data.TGO_FActive"
                  :disabled="readonly" -->
                <v-checkbox
                  label="فعال بودن"
                  v-model="form.TPIC_FActive"
                ></v-checkbox>
              </v-col>
            </v-row>
          </div>
          <v-divider></v-divider>
          <v-btn
            text
            @click="realTimeDialog = false"
            class="goods_dialog_btn mt-4"
          >
            بستن
          </v-btn>
          <v-btn text @click="addFile" class="goods_dialog_btn mt-4">
            ثبت
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
import "../../../assets/style/goods/goodsDialogs.scss";
export default {
  props: ["options"],
  data() {
    return {
      realTimeDialog: false,
      form: {},
      table: {
        checkboxEnabled: true,
        selectedItems: [],
        unSelect: false,
        imageField: ["TPIC_FAddress"],
        show: true,
        data: [],
        schema: {
          TPIC_FID: "سریال",
          //   TPIC_FID_Parent: 0,
          TPIC_FForm: "فرم",
          TPIC_FName: "نام",
          TPIC_FComment: "متن جایگزین",
          TPIC_FOrder: "ترتیب",
          TPIC_FType: "نوع",
          TPIC_FActive: "فعال بودن",
          TPIC_FAddress: "",
          delete: "",
        },
        tableBtn: [
          {
            title: "trash",
            event: "delete",
            className: "show_icon",
            value: "1",
          },
        ],
      },
      files: [],
    };
  },
  mounted() {
    setTimeout(() => {
      this.updateTable();
    }, 1000);
  },
  methods: {
    async openRealTimeDialog() {
      try {  
        const response = await this.$authAxios.$get(
          `/fileUploader/get/0/all?mode=init`
        );
        if (response) {
          console.log("response",response);
          this.form = response.data.form;
          this.realTimeDialog = true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async addFile() {  
      // console.log(this.form)
      try {
        this.form.TPIC_FID_Parent = this.options.idForm;
        this.form.TPIC_FForm = this.options.form; 
        this.form.TPIC_FType = this.options.type;
        const result = await this.$authAxios.$post(`/fileUploader`, {
          data: this.form, 
        });
        if (result) {
          console.log("inserted");
          this.realTimeDialog = false;
          this.updateTable();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateTable() { 
      try {
        const response = await this.$authAxios.$get(
          `/fileUploader/get/${this.options.idForm}/${this.options.form}?mode=table`
        );
        console.log("121312312313")
        console.log(response);
        this.table.data = response.data.table;
        console.log(this.table.data)
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(row) {
      const result = await this.$authAxios.$delete(`/fileUploader/${row.TPIC_FID}`);
      if (result) { 
        this.updateTable()
      }
    },
    //   this.files.push({
    //     TPIC_FID_Parent: 0,
    //     TPIC_FForm: 0,
    //     TPIC_FAddress: 0,
    //     TPIC_FName: 0,
    //     TPIC_FComment: 0,
    //     TPIC_FOrder: 0,
    //     TPIC_FType: 0,
    //     TPIC_FActive: 0,
    //   });
  },
};
</script>
<style lang="scss">
.real_time_multi_add_btn {
  span {
    color: #016670;
    font-size: 0.8rem;
  }
  i {
    color: #016670 !important;
  }
}
</style>
