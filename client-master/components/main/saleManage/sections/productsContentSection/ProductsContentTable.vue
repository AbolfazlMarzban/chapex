<template>
    <v-data-table :items="salePage.products" :headers="readonly ? productHeadersReadonly : productHeaders"
      item-key="TGO_FName" show-expand v-model="selectedProduct" :expanded.sync="productExpanded" :search="search">
  
      <template v-slot:top>
        <v-row class="mb-3 mt-1" style="justify-content:center;">
          <v-col cols="3" lg="3" class="searchboxx">
            <v-text-field class="mt-0" label="جستجو کنید..." v-model="search" style="direction: rtl;"></v-text-field>
          </v-col>
        </v-row>
      </template>
  
      <template v-slot:item.TGO_FActive="{ item }">
        <v-icon v-if="item.TGO_FActive" color="green" size="x-large">mdi-check</v-icon>
      </template>
  
      <template v-slot:item.TGO_FName="props">
        <span v-if="itemLoading == props.item.TGO_FID">
          <v-progress-circular color="primary" indeterminate></v-progress-circular>
        </span>
        <span v-else-if="props.item.TGO_FDelete == 0" @click="$emit('editProduct', props.item)" style="cursor:pointer;">
          <span>{{ props.item.TGO_FName }}</span>
        </span>
        <span v-else class="font-italic text-decoration-line-through">{{ props.item.TGO_FName }}</span>
      </template>
  
      <template v-slot:item.TGO_FDateReg="{ item }">
        <div>{{ item.TGO_FDateReg }}</div>
      </template>
  
      <template v-slot:item.TGO_FUserReg="{ item }">
        <div>{{ item.TGO_FUserReg }}</div>
      </template>
  
      <template v-slot:item.formButtons="{ item }">
        <v-row>
          <v-col cols="12">
            <v-btn v-if="!readonly" @click="$emit('editProduct', item)" icon color="blue">
              <span v-if="itemLoading == item.TGO_FID">
                <v-progress-circular color="primary" indeterminate></v-progress-circular>
              </span>
              <v-icon v-else>mdi-pencil</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
  
      <template v-slot:item.selectedValues="{ item }">
        <ProductsTableOptionsChip :salePage="salePage" :product="item" />
      </template>                                   
  
  
      <template v-slot:expanded-item="{ item }">
        <td v-if="item.TGO_FDelete == 0" colspan="8">
          <ProductsOptionsContent :salePage="salePage" :product="item" :formDefaults="formDefaults" :readonly="readonly">
          </ProductsOptionsContent>
        </td>
      </template>
    </v-data-table>
  </template>
  
  <script>
  import OptionsMixins from "../../options_copy/_mixins/optionsPageSaleMixin";
  import ProductsTableOptionsChip from "../productSections/ProductsTableOptionsChip.vue";
  
  
  export default {
    props: ["salePage", "readonly", "itemLoading"],
    mixins: [OptionsMixins],
    data() {
      return {
        showUpdateDialog: false,
        search: '',
        formData: {},
        formDefaults: {},
        selectedProduct: [],
        productExpanded: [],
        productHeaders: [
          {
            text: "فعال",
            align: "center",
            sortable: false,
            value: "TGO_FActive",
            width: "5%",
          },
          {
            text: "نام محصول",
            align: "right",
            sortable: true,
            value: "TGO_FName",
            width: "25%",
          },
          {
            text: "مقادیر انتساب داده شده",
            align: "right",
            sortable: false,
            value: "selectedValues",
            width: "50%",
          },
          {
            text: "تاریخ و ساعت ثبت",
            align: "center",
            sortable: false,
            value: "TGO_FDateReg",
            width: "5%",
          },
          {
            text: "کاربر ثبت",
            align: "center",
            sortable: false,
            value: "TGO_FUserReg",
            width: "5%",
          },
          {
            text: 'عملیات',
            value: 'formButtons',
            align: "center",
            sortable: false,
            width: "5%"
          },
        ],
        productHeadersReadonly: [
          {
            text: "فعال",
            align: "center",
            sortable: false,
            value: "TGO_FActive",
            width: "5%",
          },
          {
            text: "نام محصول",
            align: "right",
            sortable: true,
            value: "TGO_FName",
            width: "30%",
          },
          {
            text: "مقادیر انتساب داده شده",
            align: "right",
            sortable: false,
            value: "selectedValues",
            width: "50%",
          },
          {
            text: "تاریخ و ساعت ثبت",
            align: "center",
            sortable: false,
            value: "TGO_FDateReg",
            width: "5%",
            showInReadonly: true
          },
          {
            text: "کاربر ثبت",
            align: "center",
            sortable: false,
            value: "TGO_FUserReg",
            width: "5%",
          },
        ],
      };
    },
    mounted() {
      this.$vuetify.rtl = true;
    },
    methods: {
      defaultProductChanged(product) {
        this.salePage.products.filter(p => p.TGO_FID != product.TGO_FID).forEach(p => {
          p.TGO_FDefault = 0
        });
      }
    },
    components: { ProductsTableOptionsChip }
  };
  </script>
  