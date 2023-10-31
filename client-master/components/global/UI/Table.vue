<template>
  <div class="main_table col-12">
    <p :class="[{ pleaseWait: refresh }, { 'd-none': !refresh }]">
      <v-progress-circular 
        :width="5"   
        color="white"
        :size="55"  
        indeterminate
      ></v-progress-circular>      
      <br />
      <span> در حال دریافت اطلاعات...</span>
    </p>
    <div :class="['text-right Table', { TableBlur: refresh }]">
      <no-ssr>
        <div id="app">                           
          <v-client-table
            :columns="columns"
            v-model="tableData"
            :options="options"
            class="pa-0"
          >
            <button
              v-if="breadcrumb"
              :class="[
                'subgroup',
                { activeSubGroup: currentParentGroupID == props.row[idField] },
              ]"
              :slot="clickableColumn"
              slot-scope="props"
              @click="addToBreadcrumb(props.row)"
            >
              {{ props.row[clickableColumn] }}
            </button>

            <!-- چک باکس هدر  -->
            <div slot="filter__checkbox" v-if="!hideCheckBoxAll">
              <input
                type="checkbox"
                class
                @click="checkedAll"
                v-model="allSelected"
                id="allSelected"
              />
            </div>
            <!-- چک باکس داخل جدول  -->
            <!-- <div
              v-if="overlaySelect"
              slot="checkbox"
              slot-scope="{ row }"
              :class="[
								{ table_selected_row: checked(row[idField]) },
								'table_selected',
							]"
            >
              <div class :id="'checkbox' + row[idField]" style="height: 100%">
                <input
                  type="checkbox"
                  :disabled="!checkboxDisabled"
                  :checked="checked(row[idField])"
                  :value="row[idField]"
                  @change="change"
                />
              </div>
            </div>-->

            <input
              slot="checkbox"
              slot-scope="{ row }"
              type="checkbox"
              class="checkbox_table"
              :disabled="!checkboxDisabled"
              :checked="checked(row[idField])"
              :value="row[idField]"
              @change="change"
              @click="selectedRowData(row)"
            />

            <div
              slot-scope="props"
              v-for="(pic, index) in tablePic"
              :slot="pic"
              :key="index"
              class="w-100 text-center"
              disabled
            >
              <a
                @click="
                  download(
                    props.row[pic],
                    props.row[idField] + '-' + (+index + 1)
                  )
                "
                :class="[
                  { tableBtnDownloadImages: props.row[pic] },
                  { tableBtnDownloadImages_Disabled: !props.row[pic] },
                ]"
              >
                <v-icon>mdi-file-download</v-icon>
              </a>
            </div>

            <!-- order tooltip for comment field -->
            <!-- <v-tooltip
							:open-on-click="enableClickTooltip"
							:open-on-hover="!enableClickTooltip"
							slot="TOD_FComment"
							slot-scope="props"
							content-class="aaaa"
							right
						>
							<template v-slot:activator="{ on }">
								<v-btn icon v-on="on" class="table_commentTooltipBtn">
									<p class="table_commentTooltipP">توضیحات</p>
								</v-btn>
							</template>
							<span class="tableTooltip_span">{{
								props.row.TOD_FComment
							}}</span>
            </v-tooltip>-->
            <!-- end order tooltip for comment field -->

            <div slot="TC_FComment" slot-scope="props">
              <v-tooltip
                v-if="props.row.TC_FComment"
                :open-on-click="enableClickTooltip"
                :open-on-hover="!enableClickTooltip"
                content-class="aaaa"
                right
              >
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" class="table_commentTooltipBtn">
                    <p class="table_commentTooltipP">
                      {{ props.row.TC_FComment }}
                    </p>
                  </v-btn>
                </template>
                <span class="tableTooltip_span">{{
                  props.row.TC_FComment
                }}</span>
              </v-tooltip>
            </div>
            <div
              slot-scope="props"
              v-for="(field, index) in moneyFields"
              :slot="field"
              :key="index"
              class="w-100 text-center yekan"
              disabled
            >
              {{ formatMoney(props.row[field], 0) }}
            </div>

            <div
              slot="TOD_FCount"
              slot-scope="{ row }"
              class="w-100 text-center"
            >
              <span>{{ row.TOD_FCount }}</span>
              <span>,000</span>
            </div>

            <div
              slot-scope="props"
              v-for="(btn, index) in tableBtn"
              :key="index"
              :slot="btn.event"
              class="text-center"
            >
              <a @click="tableBtnHandle(props.row, btn)" :value="btn.value">
                <font-awesome-icon :class="btn.className" :icon="btn.title" />
              </a>
            </div>

            <div
              slot-scope="props"
              v-for="(field, index) in customField"
              :key="index"
              :slot="field.field"
              class="text-center"
            >
              <div v-for="(value, index2) in field.value" :key="index2">
                <v-icon
                  v-if="props.row[field.field] == value.value"
                  :class="value.className"
                  >{{ value.icon }}</v-icon
                >
              </div>
            </div>

            <div
              v-for="(image, index) of imageField"
              :key="index"
              :slot="image"
              slot-scope="props"
              class="tableImage"
            >
              <img
                :src="setImageUrl(props.row[image])"
                @click="openImageDialog(props.row[image])"
              />
            </div>

            <!-- <div v-if="imageField" slot="image" slot-scope="{ row }" class="tableImage">
              <img :src="setImageUrl(row[imageField])" />
            </div> -->
            <!-- منو باز شو زیر هر سطر جدول  -->
            <!-- <div slot="child_row" slot-scope="props">

            </div>-->
          </v-client-table>             
        </div>
      </no-ssr>
    </div>
    <v-dialog
      persistent
      v-model="imageDialog"
      width="1200"
      class="image_table_dialogs_main"
    >
      <v-card class="image_table_dialog">
        <v-row class="mx-0 image_table_dialog_row">
          <span>نمایش تصویر</span>
          <v-icon class="image_table_dialog_icon" @click="download(imageAdd)">mdi-download</v-icon>
          
          <v-spacer></v-spacer>

          <v-icon
            class="image_table_dialog_btn mt-4"
            @click="imageDialog = false"
          >
            mdi-close
          </v-icon>
        </v-row>
        <v-card-text class="mt-5">
          <div class="image_table_dialog_text">
            <img :src="setImageUrl(imageAdd)" />
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// اندازه های اولیه هر ستون جدول
// import "./../../assets/sass/components/columnSize/profile.scss";
export default {
  props: [
    "data",
    "dataSchema",
    "clearRows",
    "checkboxDisabled",
    "breadcrumb",
    "clickableColumn",
    "imageField",
    "idField",
    "currentParentGroupID",
    "tableBtn", 
    "tablePic",
    "moneyFields",
    "overlaySelect",
    "hideCheckBox",
    "hideCheckBoxAll",
    "customField",
    "filterable",
    "filterType",
    "listColumns"
  ],
  computed: {
    // تعریف ستون های جدول

    columns() {
      // custom columns name and table Schema data
      let columns = [];
      if (!this.hideCheckBox) {
        columns.push("checkbox");
      }
      for (const key in this.dataSchema) {
        columns.push(key);
      }
      return columns.reverse();
    },
    // تنظیمات جدول
    options() {
      // custom columns name and table Schema data
      return {
        texts: {
          filterBy: " ",
          noResults: "  اطلاعات جهت نمایش وجود ندارد",
        },

        // عنوان ستون های جدول
        headings: {
          ...this.dataSchema,
          checkbox: "",
        },
        //  بودن در هر ستون جستوجو انجام میشود  true  در صورت
        filterByColumn: {
          ...this.dataSchema,
        },

        // برای صورت کردن هر ستون استفاده میشود
        // درصورت پاک کردن این خط صورت کردن بر روی همه ستون ها اعمال میشود
        sortable: true,
        perPageValues: [10,20,30,40,50,60],
        perPage: 100,
        filterable: true,
        listColumns:{ 
          ...this.listColumns
        }
      };
    },
    globalSearch() {
      return this.$store.getters["table/search"];
    },
    refresh() {
      return this.$store.getters["tableRefresh/refresh"];
    },

    refreshButtonClicked() {
      return this.$store.getters["tableRefresh/refreshButtonClicked"];
    },
  },
  data: function () { 
    return {
      enableClickTooltip: false,
      enableHoverTooltip: false,
      dialog: false,
      TableRefreshImgAnimation: false,
      selectedRow: [],
      searchResult: [],
      tableData: [],
      allSelected: false,
      imageDialog: false,
      imageAdd: "",
      show: true,
      rows: [],
      rowID: null
    };
  },
  methods: {
    openImageDialog(image) {
      console.log(image);
      this.imageAdd = "";
      this.imageAdd = image;
      this.imageDialog = true;
    },
    tableBtnHandle(data, btn) {
      this.$emit(btn.event, data);
    },

    RefreshTable() {
      this.TableRefreshImgAnimation = !this.TableRefreshImgAnimation;
    },
    checkedAll() {
      this.selectedRow = [];
      if (this.data.length) {
        if (!this.allSelected) {
          for (const singleData of this.data) {
            this.selectedRow.push(singleData[this.idField]);
          }
        }
      }
      this.$emit("selectedRowChanged", this.selectedRow);
    },
    change(e) {
      // سطر های انتخاب گردیده توسط کاربری
      this.selectedRow = [];
      if (e.target.checked) { 
        this.selectedRow.push(e.target.value);
          //document.querySelector(".VueTables__row ").style.background = "red"
        this.rows = document.getElementsByClassName("VueTables__row ")
        //console.log(fuck)
         this.rowID = this.selectedRow[0] - 1;
        // this.rows[this.rowID].style.background = "#F2F2F2"
        //console.log(this.selectedRow)
      } else {
        //document.querySelector(".VueTables__row ").style.background = "none"
        // this.rows[this.rowID].style.background = "none"
        this.selectedRow = this.selectedRow.filter(
          (el) => el !== e.target.value
        );
      }
      this.$emit("selectedRowChanged", this.selectedRow);
    },
    checked(value) {
      for (const row of this.selectedRow) {
        if (row == value) {
          if (this.overlaySelect) {
            let id = document.getElementById("checkbox" + row).id;
           
            let elHeight = document.querySelector(
              "#checkbox" + row
            ).offsetHeight;

            let elWidth =
              document.querySelector("#checkbox" + row).offsetWidth + 36;

            let afterElement = document.createElement("style");

            afterElement.innerHTML =
              ".table_selected_row #" +
              id +
              "::after {  display: block; content: ' '; width: calc(100%" +
              ` - ${elWidth}px` +
              "); height:" +
              elHeight +
              "px; position: absolute; background: rgba(190,239,243,0.36078) !important; left: 13px; margin-top: -20px; }";

            document.body.appendChild(afterElement);
          }
          return true;
        }
      }
      return false;
    },

    globalFilter(searchValue) {
      if (searchValue) {
        this.searchResult = this.data.filter((row) => {
          let founded = false;
          for (const key in row) {
            const attribute = row[key] ? row[key].toString() : "";
            if (attribute.search(searchValue) != -1) {
              founded = true;
            }
          }
          if (founded) return true;
        });
      } else {
        this.searchResult = this.data;
      }
      return this.searchResult;
    },

    // تابع کامل کردن مسیر زیر گروه ها
    addToBreadcrumb(e) {
      this.$emit("addToBreadcrumb", e);
    },
     selectedRowData(rowData){
          this.$emit("selectedRowData" , rowData);
    },
  },
  mounted() {
    // if Page width less than 860 order tooltip work with click
    if (this.$vuetify.breakpoint.width < 960) {
      this.enableClickTooltip = true;
    }
    for (const row of this.tableData) {
      row.id = row[this.idField];
    }
    const refs = this.$refs;
  },
  watch: {
    data() {
      this.tableData = this.data;
      for (const row of this.tableData) {
        row.id = row[this.idField];
      }
    },
    selectedRow() {
      if (!this.hideCheckBoxAll) {
        const allSelectedId = document.getElementById("allSelected");
        if (this.selectedRow.length < this.data.length) {
          allSelectedId.checked = false;
          this.allSelected = false;
        } else {
          allSelectedId.checked = true;
        }
      }
    },
    clearRows(newValue) {
      this.selectedRow = [];
      this.$emit("selectedRowChanged", this.selectedRow);
    },
    globalSearch(search) {
      this.tableData = this.globalFilter(search);
    },
    refreshButtonClicked(value) {
      this.$emit("refresh"); 
    },
  },
  async created() {
    this.tableData = this.data;
  },
};
</script>

<style lang="scss"  src="../../../assets/style/Ul/Table.scss" >
</style>