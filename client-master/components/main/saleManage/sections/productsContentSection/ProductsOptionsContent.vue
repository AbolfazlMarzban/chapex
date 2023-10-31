<template>
  <v-data-table
    show-expand
    class="pl-3 pt-5 pr-10 pb-5"
    style="background: #E1F5FE !important;"
    :headers="optionHeaders"
    :items.sync="salePage.options"
    :item-key="get_keyItem()"
    :expanded.sync="optionExpanded"
    :sort-by.sync="optionsSortBy"
  >
    <template v-slot:item.children="_option">
      <div class="pa-1 ma-1">
        <template
          v-if="_option.item.TD_FDelete == 0"
          v-for="prod_op in return_productOptions(_option.item).sort(
            (a, b) => a.optionValue_TD_FOrder - b.optionValue_TD_FOrder
          )"
        >
          <v-chip small class="ml-1" color="green" text-color="white">
            <span>{{ return_childName(prod_op) }}</span>
          </v-chip>
        </template>
      </div>
    </template>

    <template v-slot:item.TD_FName="{ item }">
      <div class="pa-1 ma-1">
        <span v-if="item.TD_FDelete == 0">{{ item.TD_FName }}</span>
        <span v-else class="font-italic text-decoration-line-through"
          >{{ item.TD_FName }} (حذف شده)</span
        >
      </div>
    </template>

    <template v-slot:item.TD_FActive="{ item }">
      <div>
        <v-icon v-if="item.TD_FActive" color="green">mdi-check-bold</v-icon>
        <v-icon v-else color="red">mdi-close-thick</v-icon>
      </div>
    </template>

    <template v-slot:expanded-item="{ item }">
      <td v-if="item.TD_FDelete == 0" colspan="8">
        <ProductsOptionValueContent
          :salePage="salePage"
          :product="product"
          :option="item"
          :formDefaults="formDefaults"
          :readonly="readonly"
        >
        </ProductsOptionValueContent>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import goodsMixin from "../../../goods/_mixins/goodsMixin";
import "../../../../../assets/style/tableHeaders/tableHeaders.scss";
import ProductsOptionValueContent from "./ProductsOptionValueContent.vue";
import saleManageMixin from "../../_mixins/saleManageMixin";
import saleDataMixin from "../../../sale/_mixins/saleDataMixin";

export default {
  props: ["salePage", "product", "formDefaults", "readonly"],
  data() {
    return {
      optionSelected: [],
      optionExpanded: [],
      optionHeaders: [
        {
          text: "خصوصیت",
          align: "right",
          sortable: false,
          value: "TD_FName",
          width: "20%"
        },
        {
          text: "مقدارهای انتخاب شده",
          align: "right",
          sortable: false,
          value: "children",
          width: "60%"
        },
        {
          text: "فعال",
          align: "center",
          sortable: false,
          value: "TD_FActive",
          width: "20%"
        }
      ],
      optionsSortBy: "TD_FOrder",
      myData: [],
      goodsDefaults: []
    };
  },
  methods: {
    return_childName(product_option) {
      var ret = null;
      this.salePage.options.forEach(option => {
        const optionValues = this.getOptionValues(this.salePage, option.TD_FID);
        optionValues.forEach(child => {
          if (product_option.TGPV_FID_Value == child.TD_FID)
            ret = child.TD_FName;
        });
      });
      return ret;
    },
    get_keyItem() {
      if (this.salePage.options.length > 0 && this.salePage.options[0].TD_FID) {
        return "TD_FID";
      } else {
        return "tempid";
      }
    },
    return_productOptions(salePage_option) {
      var ret = [];
      const productOptionValues = this.getProductOptionValues(
        this.salePage,
        this.product.TGO_FID
      );
      productOptionValues
        .filter(
          o =>
            o.TGPV_FDelete == 0 && salePage_option.TD_FID == o.TGPV_FID_Option
        )
        .forEach(prod_op => {
          const index = ret.findIndex(
            i => i.TGPV_FID_Value == prod_op.TGPV_FID_Value
          );
          if (index == -1) {
            const optionValue = this.salePage.optionsValues.find(
              ov => ov.TD_FID == prod_op.TGPV_FID_Value
            );
            prod_op.optionValue_TD_FOrder = optionValue.TD_FOrder;
            ret.push(prod_op);
          }
        });
      return ret;
    }
  },
  async mounted() {
    this.$vuetify.rtl = true;
  },
  mixins: [goodsMixin, saleManageMixin, saleDataMixin],
  components: { ProductsOptionValueContent }
};
</script>

<style
  lang
  src="../../../../../assets/style/tableHeaders/tableHeaders.scss"
></style>
