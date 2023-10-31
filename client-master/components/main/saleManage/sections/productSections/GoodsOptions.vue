<template>
  <div class="pa-0 ma-0">
    <v-data-table class="pa-6" :headers="childrenHeaders"
      :items="getOptionValues(salePage, option.TD_FID).sort((a, b) => a.TD_FOrder - b.TD_FOrder)"
      :item-key="get_keyItem()">

      <template v-slot:item.active="{ item }">
        <RelationButton :salePage="salePage" :product="product" :readonly="readonly" :optionValue="item"
          @addOptionValue="addLink" @removeOptionValue="removeLink" />
      </template>

      <template v-slot:item.TGPV_FID_Goods="{ item }">
        <div v-if="isSelected(item.TD_FID)">
          <ProductGoodsOptionValue
            v-for="(pov, index) in getProductOptionValues(salePage, product.TGO_FID).filter(o => o.TGPV_FDelete == 0).sort((a, b) => a.TD_FOrder - b.TD_FOrder)"
            :optionValue="item" :productOptionValue="pov" :goodsDefaults="goodsDefaults" @removeObject="removeSubLink"
            :readonly="readonly" />
        </div>
      </template>


      <template v-slot:item.addGoods="{ item }">
        <v-btn v-if="isSelected(item.TD_FID) && !readonly" icon color="teal darken-4" @click="addSubLink(item)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

    </v-data-table>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import "../../../../../assets/style/tableHeaders/tableHeaders.scss";
import ProductGoodsOptionValue from "./ProductGoodsOptionValue.vue";
import saleManageMixin from "../../_mixins/saleManageMixin";
import saleDataMixin from "../../../sale/_mixins/saleDataMixin";
import RelationButton from "./RelationButton.vue";

export default {
  props: ["salePage", "product", "option", "formDefaults", "goodsDefaults", "readonly"],
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
          width: "35%"
        },
        {
          text: "انتساب کالا / خدمات",
          align: "right",
          sortable: false,
          value: "addGoods",
          width: "10%"
        },
        {
          text: "کالا / خدمات مرتبط",
          align: "right",
          sortable: false,
          value: "TGPV_FID_Goods",
          width: "60%"
        },
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

    addLink(optionValue) {
      const emptyObject = this.getProductOptionValues(this.salePage, this.product.TGO_FID).find(pov => pov.TGPV_FDelete == 1 && pov.TGPV_FID_Value == optionValue.TD_FID && pov.empty)

      if (emptyObject) {
        emptyObject.TGPV_FDelete = 0
        emptyObject.empty = true
      }
      else
        this.addObject(optionValue, true)
    },

    removeLink(optionValue) {
      const productOptionValues = this.getProductOptionValues(this.salePage, this.product.TGO_FID).filter(pov => pov.TGPV_FDelete == 0 && pov.TGPV_FID_Value == optionValue.TD_FID);

      if (productOptionValues.length > 0) {
        const emptyObject = productOptionValues[0]
        emptyObject.TGPV_FDelete = 1
        emptyObject.TGPV_FID_Goods = null;
        emptyObject.TGPV_FCount = 0;
        emptyObject.TGPV_FRepet = 0;
        emptyObject.TGPV_FWaste = 0;
        emptyObject.empty = true

        productOptionValues.forEach(pov => {
          pov.TGPV_FDelete = 1
        })
      }
    },

    addSubLink(optionValue) {
      const emptyObject = this.getProductOptionValues(this.salePage, this.product.TGO_FID).find(pov => pov.TGPV_FDelete == 0 && pov.TGPV_FID_Value == optionValue.TD_FID && pov.empty)

      if (emptyObject) {
        emptyObject.empty = false
      }
      else
        this.addObject(optionValue, false)

      // console.log(this.getProductOptionValues(this.salePage, this.product.TGO_FID).length);
    },

    removeSubLink(productOptionValue) {
      const productOptionValues = this.getProductOptionValues(this.salePage, this.product.TGO_FID).filter(pov => pov.TGPV_FDelete == 0 && pov.TGPV_FID_Value == productOptionValue.TGPV_FID_Value);


      if (productOptionValues.length == 1) {
        productOptionValue.empty = true
        productOptionValue.TGPV_FID_Goods = null;
        productOptionValue.TGPV_FCount = 0;
        productOptionValue.TGPV_FRepet = 0;
        productOptionValue.TGPV_FWaste = 0;
      }
      else {
        productOptionValue.TGPV_FDelete = 1
      }
    },

    addObject(optionValue, empty) {

      var obj = {
        isSelected: true,
        TGPV_FID: uuidv4(),
        isNew: true,
        TD_FName: optionValue.TD_FName,
        TGPV_FID_Option: this.option.TD_FID,
        TGPV_FID_Value: optionValue.TD_FID,
        TGPV_FID_Product: this.product.TGO_FID,
        TGPV_FID_Goods: null,
        TGPV_FCount: 0,
        TGPV_FRepet: 0,
        TGPV_FWaste: 0,
        TGPV_FDelete: 0,
        empty: empty
      }

      this.salePage.productsOptionValue.push(obj);
    },

    get_keyItem() {
      if (this.option.TD_FID) {
        return "TD_FID";
      }
      else {
        return "tempid";
      }
    },

  },
  watch: {

  },
  components: { ProductGoodsOptionValue, RelationButton }
};
</script>

<style
  lang
  src="../../../../../assets/style/tableHeaders/tableHeaders.scss"
></style>
