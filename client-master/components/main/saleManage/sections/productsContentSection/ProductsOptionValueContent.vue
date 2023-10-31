<template>
  <div class="pa-0 ma-0">
    <v-data-table class="pa-6" :headers="childrenHeaders"
      :items="getOptionValues(salePage, option.TD_FID).filter(ov => isSelected(ov.TD_FID)).sort((a, b) => a.TD_FOrder - b.TD_FOrder)"
      :item-key="get_keyItem()">

      <template v-slot:item.active="{ item }">
        <RelationButton :salePage="salePage" :product="product" :readonly="true" :optionValue="item" />
      </template>

      <template v-slot:item.TD_FName="{ item }">
        <v-row>
          <v-col cols="12">
            <span style="font-size: 24px;">{{ item.TD_FName }}</span>
          </v-col>
          <v-col cols="12">
            <div>
              <ProductsOptionValueGoods :productOptionValue="getPov(item)" :readonly="readonly"
                :formList="salePage.formList" :salePage="salePage" />
            </div>
          </v-col>
        </v-row>
      </template>

    </v-data-table>
  </div>
</template>
  
<script>
import { v4 as uuidv4 } from "uuid";
import "../../../../../assets/style/tableHeaders/tableHeaders.scss";
import ProductsOptionValueGoods from "./ProductsOptionValueGoods.vue";
import saleManageMixin from "../../_mixins/saleManageMixin";
import saleDataMixin from "../../../sale/_mixins/saleDataMixin";
import RelationButton from "../productSections/RelationButton.vue";

export default {
  props: ["salePage", "product", "option", "formDefaults", "readonly"],
  mixins: [saleManageMixin, saleDataMixin],
  data() {
    return {
      childrenHeaders: [
        {
          text: "فعال",
          align: "right",
          sortable: false,
          value: "active",
          width: "5%"
        },
        {
          text: "مقدار",
          align: "right",
          sortable: false,
          value: "TD_FName",
          width: "95%"
        },
        // {
        //   text: "کالا / خدمات مرتبط",
        //   align: "right",
        //   sortable: false,
        //   value: "TGPV_FID_Goods",
        //   width: "60%"
        // },
      ],
      childrenSortBy: "TD_FOrder",
      TD_FName: "",
      newRel: "",
      tree: [],
      treeItems: []
      // myData: [],
    };
  },

  async mounted() {
  },

  methods: {
    isSelected(optionValueId) {
      const productOptionValues = this.getProductOptionValues(this.salePage, this.product.TGO_FID);

      const index = productOptionValues.findIndex(pov => pov.TGPV_FID_Value == optionValueId && pov.TGPV_FID_Product == this.product.TGO_FID && pov.TGPV_FDelete == 0)

      if (index > -1)
        return true

      return false
    },

    get_keyItem() {
      if (this.option.TD_FID) {
        return "TD_FID";
      }
      else {
        return "tempid";
      }
    },

    getPov(ov) {
      const povs = this.getProductOptionValues(this.salePage, this.product.TGO_FID).sort((a, b) => a.TD_FOrder - b.TD_FOrder)

      if (povs.length > 0) {
        return povs.find(pov => pov.TGPV_FID_Value == ov.TD_FID)
      }
    }
  },
  watch: {

  },
  components: { ProductsOptionValueGoods, RelationButton }
};
</script>
  
<style
    lang
    src="../../../../../assets/style/tableHeaders/tableHeaders.scss"
  ></style>
  