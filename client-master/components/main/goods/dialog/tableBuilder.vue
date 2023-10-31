<template>
  <div class="text-center">
    <v-dialog
      persistent
      v-model="showTableBuilder"
      width="500"
      class="goods_dialogs_main"
    >
      <v-card class="goods_dialog">
        <v-card-title> </v-card-title>
        <v-card-text>
          <div class="goods_dialog_title">ساخت جدول</div>
          <v-divider class="mx-0" style="width: 100%"></v-divider>
          <div class="goods_dialog_text">
            <v-row>
              <v-col cols="12" class="px-10">
                <v-combobox
                  v-model="tableColumns"
                  :items="tableFields"
                  label="ستون های انتخابی جدول"
                  multiple
                  chips
                  class="selectTableField"
                  outlined
                  dense
                  @change="showError"
                >
                  <template
                    v-slot:selection="{ attrs, item, parent, selected }"
                  >
                    <v-chip
                      v-if="item === Object(item)"
                      v-bind="attrs"
                      :color="`${item.color} lighten-3`"
                      :input-value="selected"
                      label
                      small
                      class="ma-1"
                    >
                      <span class="pr-2">
                        {{ item.text }}
                      </span>
                      <v-icon small @click="parent.selectItem(item)">
                        $delete
                      </v-icon>
                    </v-chip>
                  </template>
                </v-combobox>
                <span v-if="error" class="tableBuilder-error">
                  {{ this.error }}
                </span>
              </v-col>
            </v-row>
          </div>
          <div>
            <span v-if="tableColumns.length > 0"
              >ترتیب ستون های جدول را بچینید:</span
            >
            <draggable
              v-model="tableColumns"
              group="tableColumns"
              @start="drag = true"
              @end="drag = false"
              class="d-flex flex-column align-center justify-center"
              style="padding: 0px 100px"
            >
              <v-chip
                v-for="column in tableColumns"
                :key="column.text"
                class="ma-2 justify-center column-chip"
                style="width: 100%"
                >{{ column.text }}
                <v-checkbox
                  label="قابل جستجو"
                  v-model="column.filterable"
                ></v-checkbox>
              </v-chip>
            </draggable>
          </div>
          <v-divider class="mx-0 my-5" style="width: 100%"></v-divider>
          <div class="d-flex flex-column justify-center">
            <span style="font-size: 16px; color: #930149"
              >جدول مورد نظر شما ساخته شود؟</span
            >
            <!-- <br> -->
            <div class="d-flex justify-center">
              <v-btn text class="goods_dialog_btn mt-1 mx-1" @click="setTable">
                بله
              </v-btn>
              <v-btn
                text
                class="goods_dialog_cancel_btn mt-1 mx-1"
                @click="$emit('closeDialog')"
              >
                خیر
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
props: [ "showTableBuilder", "tableItems" ],
components: { draggable },

data(){
    return{
        copyGoods: false,
        tableColumns : [],
        tableFields:[
            {
                text: 'نام کالا',
                value: 'TGO_FName',
                filterable: false,
                sortable: false
            },
            {
                text: 'عنوان کالا',
                value: 'TGO_FTag',
                filterable: false,
                sortable: false
            },
            {
                text: 'گروه کالا',
                value: 'TGO_FID_Category1',
                filterable: false,
                sortable: false
            },
            {
                text: 'نوع کالا',
                value: 'TGO_FID_TypeName',
                filterable: false,
                sortable: false
            },
            {
                text: 'واحد اصلی',
                value: 'TGO_FID_UnitName',
                filterable: false,
                sortable: false
            },
            {
                text: 'واحد فرعی',
                value: 'TGO_FID_Unit2Name',
                filterable: false,
                sortable: false
            },
            {
                text: 'تعداد در واحد فرعی',
                value: 'TGO_FCountINUnit',
                filterable: false,
                sortable: false
            },
            {
                text: 'بسته بندی',
                value: 'TGO_FID_TypeBox',
                filterable: false, 
                sortable: false
            }, 
            {
                text: 'تعداد در بسته بندی',
                value: 'TGO_FCountINBox',
                filterable: false,
                sortable: false
            }, 
            {
                text: 'زمان تولید',
                value: 'TGO_FProductionTime',
                filterable: false,
                sortable: false
            },
            {
                text: 'مدیریت موجودی',
                value: 'TGO_FID_TypeSale',
                filterable: false,
                sortable: false
            }, 
            {
                text: 'حداقل تعداد فروش',
                value: 'TGO_FSaleMin',
                filterable: false,
                sortable: false
            },
            {
                text: 'نقطه سفارش',
                value: 'TGO_FBuyPoint',
                filterable: false,
                sortable: false
            },
            {
                text: 'قیمت فروش',
                value: 'TGO_FSalePriceMax',
                filterable: false,
                sortable: false
            },
            {
                text: 'قیمت همکار',
                value: 'TGO_FSalePriceMid',
                filterable: false,
                sortable: false
            },
            {
                text: 'قیمت نماینده',
                value: 'TGO_FSalePriceMin',
                filterable: false,
                sortable: false
            },
            {
                text: 'قیمت خرید',
                value: 'TGO_FBuyPrice',
                filterable: false,
                sortable: false
            }, 
            {
                text: 'مبلغ ثابت کلیشه',
                value: 'TGO_FSalePriceFix',
                filterable: false, 
                sortable: false
            }, 
            {
                text: 'مبلغ ثابت فرم بندی',
                value: 'TGO_FBuyPercent',
                filterable: false,
                sortable: false
            },
            {
                text: 'نام برند',
                value: 'TGO_FID_Brand',
                filterable: false,
                sortable: false
            },
            {
                text: 'کد خرید',
                value: 'TGO_FBuyCode',
                filterable: false,
                sortable: false
            },
            {
                text: 'کد کالا',
                value: 'TGO_FCode',
                filterable: false,
                sortable: false
            },
            {
                text: 'تاریخ تغییر قیمت خرید',
                value: 'TGO_FBuyLastDate',
                filterable: false,
                sortable: false
            },
            {
                text: 'تاریخ تغییر قیمت فروش',
                value: 'TGO_FSaleLastDate',
                filterable: false,
                sortable: false
            },
            {
                text: 'شرح کالا', 
                value: 'TGO_FComment',
                filterable: false,
                sortable: false
            },
            {
                text: 'فعال',
                value: 'TGO_FActive',
                filterable: false,
                sortable: false
            },
            {
                text: 'امکان فروش',
                value: 'TGO_FCanSale',
                filterable: false,
                sortable: false
            },
            {
                text: 'امکان نمایش در محصولات',
                value: 'TGO_FArchive',
                filterable: false,
                sortable: false
            },
            {
                text: 'امکان تغییر قیمت',
                value: 'TGO_FCanChangePrice',
                filterable: false,
                sortable: false
            },
            {
                text: 'امکان اعمال تخفیف',
                value: 'TGO_FCanOff',
                filterable: false,
            sortable: false,
            },
            {
                text: 'ارزش افزوده',
                value: 'TGO_FCanTax',
                filterable: false,
                sortable: false
            },
            {
                text: 'سریال',
                value: 'TGO_FID',
                filterable: false,
                sortable: false
            },
            {
                text: 'تاریخ ثبت',
                value: 'TGO_FDateReg',
                filterable: false,
                sortable: false
            },
            {
                text: 'کاربر ثبت',
                value: 'TGO_FUserRegName',
                filterable: false,
                sortable: false
            }
        ],
        error: null
    }
},
methods:{
    setTable(){
        if(this.tableColumns.length > 0){
            this.$emit('newTable', this.tableColumns)
        } else {
            this.error = 'هنوز آیتم های جدول را انتخاب نکرده اید'
        }
    },
    showError(){
        if(this.tableColumns.length > 0){
            this.error = null
        }
    },
},
}
</script>

<style lang="scss">
.selectTableField {
  label {
    font-family: "bakhtiari" !important;
    font-size: 16px !important;
    font-weight: normal;
    padding-left: 20px;
  }
  input {
    background: none !important;
    border: none !important;
  }
}
.tableBuilder-error {
  font-size: 16px;
  color: red;
}
// .v-list-item {
//   height: 30px !important;
//   min-height: 30px !important;
// }
</style>