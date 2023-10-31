<template>
  <div>
    <ui-header-manager
      :title="headerManager.title"
      :Buttons="headerManager.buttons"
      :status="headerManager.status"
    />

    <v-row>
      <v-col cols="2">
        <v-data-table :items="tables" :headers="headers">
          <template v-slot:item.TD_FName="{ item }">
            <NuxtLink
              style="cursor: pointer; color: #016670"
              class="pa-1 px-2 font-weight-black"
              :to="`/admin/tables/${item.TD_FID}`"
            >
              {{ item.TD_FName }}
            </NuxtLink>
          </template>
        </v-data-table>
      </v-col>

      <v-col cols="10" v-if="tableId">
        <v-card v-if="showAddDialog" class="mb-3 pa-2 d-flex d-flex-row">
          <v-btn @click="submit" outlined small color="accent">
            <v-icon>mdi-check</v-icon>
            <span>تایید و ثبت</span>
          </v-btn>

          <v-btn
            @click="showAddDialog = false"
            outlined
            small
            class="mr-2"
            color="pink"
          >
            <v-icon>mdi-close</v-icon>
            <span>انصراف و لغو</span>
          </v-btn>

          <v-btn
            v-if="state == 'edit'"
            outlined
            small
            class="mr-auto"
            color="pink"
            @click="deleteColumn"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
            <span>حذف</span>
          </v-btn>
        </v-card>

        <v-card v-else class="mb-3 pa-2">
          <v-btn @click="initItem()" outlined small color="accent">
            <v-icon>mdi-plus</v-icon>
            <span>افزودن فیلد جدید</span>
          </v-btn>

          <!-- <v-btn outlined small class="mr-2">
            <v-icon>mdi-plus</v-icon>
            <span>ویرایش ترتیب</span>
          </v-btn> -->

          <v-btn
            @click="deleteUserSetting()"
            outlined
            small
            class="mr-2"
            color="pink"
          >
            <span>حذف تنظیمات کاربران</span>
          </v-btn>
        </v-card>

        <v-card v-if="showAddDialog" class="mb-3 pa-2">
          <v-row>
            <v-col cols="4" class="text-center">
              <v-text-field
                v-model="editFormItem.TABL_FFieldTitle"
                label="عنوان ستون"
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field
                v-model="editFormItem.TABL_FFieldName"
                label="نام ستون در بانک"
              ></v-text-field>
            </v-col>

            <v-col cols="4">
            <!-- {{ editFormItem.TABL_FID_FieldType }} -->
              <v-combobox
                clearable
                label="نوع ستون"
                v-model="editFormItem.TABL_FID_FieldType"
                :items="defaults[113]"
                item-text="TD_FName"
                item-value="TD_FID"
                :return-object="false"
              ></v-combobox>
            </v-col>

            <v-col cols="2">
              <!-- {{ editFormItem.TABL_FDefault }} -->
              <v-switch
                label="پیشفرض"
                v-model="editFormItem.TABL_FDefault"
                :true-value="1"
                :false-value="0"
              ></v-switch>
            </v-col>

            <v-col cols="2">
              <v-switch
                label="قابل جستجو"
                v-model="editFormItem.TABL_FFiltrable"
                :true-value="1"
                :false-value="0"
              ></v-switch>
            </v-col>

            <v-col cols="2">
              <v-switch
                label="قابل مرتب سازی"
                v-model="editFormItem.TABL_FSortable"
                :true-value="1"
                :false-value="0"
              ></v-switch>
            </v-col>

            <v-col cols="2">
              <v-text-field
                v-model="editFormItem.TABL_FOrder"
                label="ترتیب"
              ></v-text-field>
            </v-col>

            <v-col cols="4"></v-col>

            <v-col cols="4">
              <v-text-field
                v-model="editFormItem.TABL_FID_RelatedDefault"
                label="کد تعریف پایه مرتبط"
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field
                v-model="editFormItem.TABL_FUrlPattern"
                label="الگوی آدرس"
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field
                v-model="editFormItem.TABL_FIcon"
                label="آیکن"
              ></v-text-field>
            </v-col>
            
          </v-row>
        </v-card>

        <v-data-table
          v-if="columns && columns.length > 0"
          :items="columns"
          :headers="col_headers"
        >
          <template v-slot:item.TABL_FDefault="{ item }">
            <v-icon v-if="item.TABL_FDefault == 1" color="green"
              >mdi-check</v-icon
            >
            <v-icon v-else color="gray">mdi-close</v-icon>
          </template>

          <template v-slot:item.TABL_FFiltrable="{ item }">
            <v-icon v-if="item.TABL_FFiltrable == 1" color="green"
              >mdi-check</v-icon
            >
            <v-icon v-else color="gray">mdi-close</v-icon>
          </template>

          <template v-slot:item.TABL_FSortable="{ item }">
            <v-icon v-if="item.TABL_FSortable == 1" color="green"
              >mdi-check</v-icon
            >
            <v-icon v-else color="gray">mdi-close</v-icon>
          </template>

          <template v-slot:item.TABL_FID_RelatedDefault="{ item }">
            <div v-if="item.TABL_FID_RelatedDefault">
              {{ item.TABL_RelatedDefault }}
            </div>
            <div v-if="item.TABL_FID_RelatedDefault">
              ({{ item.TABL_FID_RelatedDefault }})
            </div>
          </template>

          <template v-slot:item.edit="{ item }">
            <v-btn icon @click="editItem(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["tableId"],
  async mounted() {
    this.$vuetify.rtl = true;
    this.headerManager.status = "start";
    await this.updateTable();
  },

  data() {
    return {
      state: "insert",
      showAddDialog: false,
      editFormItem: null,
      tables: [],
      columns: [],
      defaults: {},

      headerManager: {
        show: true,
        status: "start",
        title: {
          fa: "مدیریت جداول سامانه",
          en: "Table Manage",
          icon: "mdi-close"
        },
        buttons: {}
      },

      headers: [
        {
          text: "نام جدول",
          value: "TD_FName",
          align: "center",
          sortable: true
        }
      ],

      col_headers: [
        {
          text: "پیشفرض",
          value: "TABL_FDefault",
          align: "center",
          sortable: true
        },

        {
          text: "ردیف",
          value: "TABL_FOrder",
          align: "center",
          sortable: true
        },
        {
          text: "عنوان ستون",
          value: "TABL_FFieldTitle",
          align: "center",
          sortable: true
        },

        {
          text: "نام ستون در بانک",
          value: "TABL_FFieldName",
          align: "center",
          sortable: true
        },

        {
          text: "نوع ستون",
          value: "TABL_FieldType",
          align: "center",
          sortable: true
        },

        {
          text: "قابل فیلتر",
          value: "TABL_FFiltrable",
          align: "center",
          sortable: true
        },

        {
          text: "قابل مرتب سازی",
          value: "TABL_FSortable",
          align: "center",
          sortable: true
        },

        {
          text: "تعریف پایه مرتبط",
          value: "TABL_FID_RelatedDefault",
          align: "center",
          sortable: true
        },

        {
          text: "الگوی آدرس",
          value: "TABL_FUrlPattern",
          align: "center",
          sortable: true
        },

        {
          text: "",
          value: "edit",
          align: "center",
          sortable: true
        }
      ]
    };
  },

  methods: {
    async updateTable() {
      try {
        const result = await this.$authAxios.$get(`/abolTable/0?mode=tables`);
        if (result) {
          this.tables = result.data.table;
          this.defaults = result.data.defaults;

          if (this.tableId) {
            const cols_result = await this.$authAxios.$get(
              `/abolTable/${this.tableId}?mode=columns`
            );

            if (cols_result) {
              this.columns = cols_result.data.table;
              this.defaults = result.data.defaults;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    async editItem(item) {
      this.state = "edit";
      this.editFormItem = JSON.parse(JSON.stringify(item));
      this.showAddDialog = true;
    },

    async initItem() {
      this.state = "insert";
      const result = await this.$authAxios.$get(`/abolTable/0?mode=init`);
      if (result) {
        this.editFormItem = result.data.form;
        this.editFormItem.TABL_FID_Table = this.tableId;
        this.showAddDialog = true;
      }
    },

    async submit() {
      if (this.state == "insert") {
        const result = await this.$authAxios.$post(`/abolTable/column`, {
          data: this.editFormItem
        });
        if (result) {
          this.showAddDialog = false;
          this.showResponseSuccessMessages(result);
          this.updateTable();
        } else {
          this.showResponseErrors(error);
        }
      } else if (this.state == "edit") {
        const result = await this.$authAxios.$patch(`/abolTable/column`, {
          data: this.editFormItem
        });
        if (result) {
          this.showAddDialog = false;
          this.showResponseSuccessMessages(result);
          this.updateTable();
        } else {
          this.showResponseErrors(error);
        }
      }
    },

    async deleteColumn() {
      const result = await this.$authAxios.$delete(
        `/abolTable/column/${this.editFormItem.TABL_FID}`
      );
      if (result) {
        this.showAddDialog = false;
        this.showResponseSuccessMessages(result);
        this.updateTable();
      } else {
        this.showResponseErrors(error);
      }
    },

    async deleteUserSetting() {
      const result = await this.$authAxios.$delete(
        `/abolTable/usersetting/${this.tableId}`
      );
      if (result) {
        this.showAddDialog = false;
        this.showResponseSuccessMessages(result);
        this.updateTable();
      } else {
        this.showResponseErrors(error);
      }
    }
  },

  watch: {
    tableId(newValue) {
      this.updateTable();
    }
  }
};
</script>
