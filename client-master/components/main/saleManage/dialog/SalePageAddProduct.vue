<template>
  <div>
    <v-dialog persistent class="goods_dialogs_main" width="90%" v-model="dialog">
      <v-card color="basil" class="product_form_container">
        <v-card-title>
          <v-row>
            <v-col cols="12" class="title">
              <span v-if="status == 'insert'">تعریف محصول جدید</span>
              <span v-if="status == 'edit'">ویرایش محصول</span>
              <v-btn icon class="float-left" @click="$emit('cancel')">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>

        <v-card-text v-if="product.TGO_FID">
          <v-container>

            <v-expansion-panels v-model="accordianValues" multiple>

              <AddProductBaseInfo :salePage="salePage" :product="product" :readonly="readonly" :defaults="defaults"
                @errorUpdate="e => hasError = e" />

              <AddProductSettings :product="product" :readonly="readonly" />

            </v-expansion-panels>

            <v-row class="justify-center">
              <v-col cols="2" v-if="salePageStatus == 'insert' || salePageStatus == 'edit'">
                <v-btn :disabled="hasError" class="goods_dialog_btn mt-4" @click="submit">
                  <v-icon size="16" class="ml-2">mdi-check</v-icon>
                  <span>تایید</span>
                </v-btn>
              </v-col>
              <v-col cols="2" v-else>
                <v-btn class="goods_dialog_btn mt-4" @click="$emit('gotoEdit');">
                  <v-icon size="16" class="ml-2">mdi-pencil</v-icon>
                  <span>ویرایش</span>
                </v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn @click="$emit('cancel')" class="goods_dialog_btn mt-4">
                  <v-icon size="16" class="ml-2">mdi-close</v-icon>
                  <span>انصراف</span>
                </v-btn>
              </v-col>
            </v-row>

          </v-container>
        </v-card-text>
      </v-card>

    </v-dialog>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import "../../../../assets/style/formsStyle/form.scss";
import AddProductSettings from "./AddProductSections/AddProductSettings.vue";
import AddProductBaseInfo from "./AddProductSections/AddProductBaseInfo.vue";

export default {
  props: ["salePage", "formData", "defaults", "readonly", "status", "salePageStatus"],
  data() {
    return {
      dialog: true,
      hasError: false,
      product: {},
      tab: null,
      selected: [],
      dialogConpopup1: false,
      accordianValues: [0],
    };
  },
  methods: {
    submit() {
      if (this.status == "insert") {
        this.product.isNew = true;
        this.product.TGO_FActive = 1;
        this.product.TGO_FDelete = 0;
        this.salePage.products.push(this.product);
        this.$emit("submit");
      }
      else if (this.status == "edit") {
        this.$emit("update", this.product);
      }
    },
  },
  mounted() {
    this.product = JSON.parse(JSON.stringify(this.formData));
    if (this.status == "insert") {
      this.product.TGO_FID = uuidv4();
    }
    else if (this.status == "edit") {
    }
  },
  components: { AddProductSettings, AddProductBaseInfo }
};
</script>
<style lang="scss">
.form_product_mange_link {
  p {
    padding-right: 8px;
    color: #016670;
    font-weight: 700;

    i {
      color: #016670 !important;
    }
  }
}
</style>
