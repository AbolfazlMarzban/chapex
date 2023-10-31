<template>
  <v-expansion-panel class="togglebox">
    <accordian-title title="محصولات" :unsaved="sections_changed()" :readonly="readonly" />

    <v-expansion-panel-content>
      <v-row>
        <v-col>
          <v-divider></v-divider> 
        </v-col>
      </v-row>

      <v-row class="mb-4">
        <SalePageProductContent v-if="showAddDialog" :salePage="data" :formData="formData" :defaults="formDefaults"
          :status="productDialogStatus" @cancel="showAddDialog = false" @submit="showAddDialog = false"
          @update="updateProduct" :readonly="readonly" @gotoEdit="$emit('gotoEdit')" :salePageStatus="salePageStatus">
        </SalePageProductContent>

        <v-col cols="12" v-if="data.products && data.products.length == 0">
          <span>محصولی تعریف نشده</span>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <ProductsContentTable v-if="data.products && data.products.length > 0" :salePage="data"
            @editProduct="editProduct" :formDefaults="formDefaults" :readonly="readonly"
            :itemLoading="updateProductLoadingId">
          </ProductsContentTable>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import OptionsMixins from "../options_copy/_mixins/optionsPageSaleMixin";
import SalePageProductContent from "../dialog/SalePageProductContent.vue";
import ProductsContentTable from "./productsContentSection/ProductsContentTable.vue";
import { v4 as uuidv4 } from "uuid";
import SalePageAlertDialog from "../dialog/SalePageAlertDialog.vue";

export default {
  props: ["data", "readonly", "wizardView", "lastsaved_data", "salePageStatus"],
  mixins: [OptionsMixins],
  data() {
    return {
      products: [],
      showAddDialog: false,
      showDuplicateDialog: false,
      productDialogStatus: "insert",
      formData: {},
      formDefaults: null,
      insertProductLoading: false,
      updateProductLoadingId: null,
      itemForDuplicate: null
    };
  },
  async mounted() { },
  methods: {
    async insertProduct() {
      this.productDialogStatus = "insert";
      this.insertProductLoading = true;

      const result = await this.addProduct();
      this.formData = result.data.form;
      this.formDefaults = result.data.defaults;

      this.showAddDialog = true;
      this.insertProductLoading = false;
    },

    async editProduct(item) {
      this.updateProductLoadingId = item.TGO_FID;

      const localProduct = this.data.products.find(
        p => p.TGO_FID == item.TGO_FID
      );
      if (localProduct) {
        this.formData = localProduct;
        this.productDialogStatus = "edit";

        // if (!this.formDefaults) {
        //   const result = await this.addProduct();
        //   if (result) {
        //     this.formDefaults = result.data.defaults;
        //   }
        // }

        this.showAddDialog = true;
        this.updateProductLoadingId = null;
      }
    },

    async updateProduct(item) {
      this.showAddDialog = false;

      const localProduct = this.data.products.find(
        p => p.TGO_FID == item.TGO_FID
      );

      if (localProduct) {
        Object.assign(localProduct, item);
      }
    },

    duplicateDialog(item) {
      this.itemForDuplicate = item;
      this.showDuplicateDialog = true;
    },

    async duplicateProduct() {
      try {
        const newProduct = JSON.parse(JSON.stringify(this.itemForDuplicate));
        newProduct.TGO_FID = uuidv4();
        newProduct.TGO_FName = "کپی_" + this.itemForDuplicate.TGO_FName;
        newProduct.isNew = true;
        newProduct.TGO_FActive = 1;
        newProduct.TGO_FDelete = 0;
        this.data.products.push(newProduct);

        const productOptionValue = this.data.productsOptionValue.filter(
          pov =>
            pov.TGPV_FID_Product == this.itemForDuplicate.TGO_FID &&
            pov.TGPV_FDelete == 0
        );
        if (productOptionValue && productOptionValue.length > 0) {
          const newProductOptionValue = JSON.parse(
            JSON.stringify(productOptionValue)
          );

          newProductOptionValue.forEach(pov => {
            pov.TGPV_FID = uuidv4();
            pov.isNew = true;
            pov.TGPV_FID_Product = newProduct.TGO_FID;

            this.data.productsOptionValue.push(pov);
          });
        }

        this.showDuplicateDialog = false;
      } catch (error) {
        console.log(error);
      }
    },

    sections_changed() {
      var local_data = JSON.parse(JSON.stringify(this.data));
      var obj1 = local_data.products;

      var local_lastsaved_data = JSON.parse(
        JSON.stringify(this.lastsaved_data)
      );
      var obj2 = local_lastsaved_data.products;

      return !(JSON.stringify(obj1) === JSON.stringify(obj2));
    }
  },
  components: { SalePageProductContent, ProductsContentTable, SalePageAlertDialog }
};
</script>
