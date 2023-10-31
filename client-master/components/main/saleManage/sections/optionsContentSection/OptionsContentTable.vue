<template>
  <v-data-table show-expand class="elevation-1 ma-1 mt-3" :headers="readonly ? optionHeadersReadonly : optionHeaders"
    :items.sync="salePage.options" item-key="TD_FID" :expanded.sync="optionExpanded" :sort-by.sync="optionsSortBy">

    <template v-slot:item.TD_FCaption="props"> 
      <div class="pa-1 px-2 rounded" v-html="props.item.TD_FCaption"></div>
    </template>

    <template v-slot:item.children="{ item }">
      <!-- <td class="py-4"> -->
      <OptionName :salePage="salePage" :option="item" />
      <!-- </td> -->
    </template>

    <template v-slot:expanded-item="{ item }">
      <td colspan="8">
        <v-card class="elevation-1 ma-5">
          <label>شرح خصوصیت</label>
          <ui-textarea v-if="readonly" row="5" :readonly="readonly" v-model="item.TD_FCaption" />
          <ui-editor v-else row="5" :readonly="readonly" :value="item.TD_FCaption" v-model="item.TD_FCaption" />
        </v-card>

        <OptionValuesContentTable :salePage="salePage" :optionId="item.TD_FID" :defaults="defaults" :readonly="readonly">
        </OptionValuesContentTable>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import saleManageMixin from "../../_mixins/saleManageMixin";
import saleDataMixin from "../../../sale/_mixins/saleDataMixin";
import OptionName from "./ContentOptionName.vue";
import OptionValuesContentTable from "./OptionValuesContentTable.vue";

export default {
  props: ["salePage", "defaults", "readonly"],
  mixins: [saleManageMixin, saleDataMixin],
  data() {
    return {
      optionSelected: [],
      optionExpanded: [],
      optionHeaders: [
        {
          text: "مقدارهای خصوصیت",
          align: "right",
          sortable: false,
          value: "children",
          width: "80%"
        },
        {
          text: "شرح خصوصیت",
          align: "center",
          sortable: false,
          value: "TD_FCaption",
          width: "20%"
        }
      ],
      optionHeadersReadonly: [
        {
          text: "مقدارهای خصوصیت",
          align: "right",
          sortable: false,
          value: "children",
          width: "80%"
        },
        {
          text: "شرح خصوصیت",
          align: "center",
          sortable: false,
          value: "TD_FCaption",
          width: "20%"
        }
      ],
      optionsSortBy: "TD_FOrder",
      myData: this.salePage.options
    };
  },
  components: { OptionName, OptionValuesContentTable },

  methods: {
    save() {
      // this.snack = true
      // this.snackColor = 'success'
      // this.snackText = 'Data saved'
    },
    cancel() {
      // this.snack = true
      // this.snackColor = 'error'
      // this.snackText = 'Canceled'
    },
    open() {
      // this.snack = true
      // this.snackColor = 'info'
      // this.snackText = 'Dialog opened'
    },
    close() {
      // console.log('Dialog closed')
    }
  },
  mounted() {
    this.$vuetify.rtl = true;
  }
};
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.3s;
}

.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}
</style>
