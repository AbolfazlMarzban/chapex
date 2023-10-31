<template>
  <v-data-table show-expand class="elevation-1 ma-1 mt-3" :headers="readonly ? optionHeadersReadonly : optionHeaders"
    :items.sync="salePage.options" item-key="TD_FID" :expanded.sync="optionExpanded" :sort-by.sync="optionsSortBy">

    <template v-slot:item.TD_FOrder="{ item }">
      <UpDownButtons v-if="item.TD_FDelete == 0" :items="salePage.options" :item="item" FieldName="TD_FOrder" :readonly="readonly">
      </UpDownButtons>
    </template>

    <template v-slot:item.children="{ item }">
      <td v-if="item.TD_FDelete == 0" class="py-4">
        <v-row>
          <v-col cols="12">
            <OptionName v-if="item.TD_FDelete == 0" :option="item" @editDialog="option => $emit('editDialog', option)" />
            <span v-else class="font-italic text-decoration-line-through">{{ item.TD_FName }}</span>
          </v-col>
        </v-row>

        <span v-for="(child, i) in getOptionValues(salePage, item.TD_FID)" :key="i">
          <template v-if="child.TD_FDelete == 0">

            <v-chip v-if="item.TD_FType == 21703" class="pa-1 px-2 ma-1 text-caption"
              :color="child.TD_FActive ? '#a8e3e9' : '#aaadad'">
              <Transition name="bounce">
                <span v-if="child.TD_FDefault" class="ml-2">
                  <v-icon dark right>mdi-crosshairs-gps</v-icon>
                </span>
              </Transition>

              <span class="font-weight-black text-decoration-underline" v-if="child.TD_FDefault">{{
                child.TD_FName
              }}</span>
              <span v-else>{{ child.TD_FName }}</span>

              <ChipDeleteButton :items="getOptionValues(salePage, item.TD_FID)" :item="child" v-if="!readonly"
                :salePage="salePage" state="optionValue"></ChipDeleteButton>

            </v-chip>

            <v-chip v-else-if="item.TD_FType == 21704" class="pa-1 px-2 ma-1 text-caption" color="pink lighten-3">
              <span>{{ child.TD_FName }}</span>
              <ChipDeleteButton :items="getOptionValues(salePage, item.TD_FID)" :item="child" v-if="!readonly"
                :salePage="salePage" state="optionValue"></ChipDeleteButton>
            </v-chip>

            <v-chip v-else-if="item.TD_FType == 21705" class="pa-1 px-2 ma-1 text-caption" color="orange lighten-3">
              <span>{{ child.TD_FName }}</span>
              <ChipDeleteButton :items="getOptionValues(salePage, item.TD_FID)" :item="child" v-if="!readonly"
                :salePage="salePage" state="optionValue"></ChipDeleteButton>
            </v-chip>

            <v-chip v-else-if="item.TD_FType == 21706" class="pa-1 px-2 ma-1 text-caption" color="blue lighten-4">
              <span>{{ child.TD_FName }}</span>
              <ChipDeleteButton :items="getOptionValues(salePage, item.TD_FID)" :item="child" v-if="!readonly"
                :salePage="salePage" state="optionValue"></ChipDeleteButton>
            </v-chip>
          </template>
        </span>
      </td>
    </template>

    <template v-slot:item.TD_FActive="{ item }">
      <div v-if="item.TD_FDelete == 0">
        <v-switch v-if="!readonly" v-model="item.TD_FActive" :true-value="1" :false-value="0" inset></v-switch>
        <v-icon v-else-if="item.TD_FActive" color="green" size="36">mdi-check</v-icon>
      </div>
    </template>

    <template v-slot:item.TD_FRequired="{ item }">
      <div v-if="item.TD_FDelete == 0">
        <v-switch v-if="!readonly" v-model="item.TD_FRequired" :true-value="1" :false-value="0" inset></v-switch>
        <v-icon v-else-if="item.TD_FRequired" color="red" size="x-large">mdi-asterisk</v-icon>
      </div>
    </template>

    <template v-slot:item.delete="{ item }">
      <DeleteButton :items="salePage.options" :item="item" v-if="!readonly" :salePage="salePage" state="option">
      </DeleteButton>
    </template>

    <template v-slot:item.TD_FCaption="props">
      <div v-if="props.item.TD_FDelete == 0" class="pa-1 px-2 rounded" v-html="props.item.TD_FCaption"></div>
      <div v-else class="font-italic text-decoration-line-through" v-html="props.item.TD_FName"></div>
    </template>

    <template v-slot:expanded-item="{ item }">
      <td v-if="item.TD_FDelete == 0" colspan="8">
        <ChildrenTable :salePage="salePage" :option="item" :defaults="defaults" :readonly="readonly">
        </ChildrenTable>
      </td>
    </template>

  </v-data-table>
</template>

<script>
import UpDownButtons from "../upDownButtons.vue";
import saleManageMixin from "../../_mixins/saleManageMixin";
import saleDataMixin from "../../../sale/_mixins/saleDataMixin";
import ChipDeleteButton from "../optionsSections/chipDeleteButton.vue";
import { v4 as uuidv4 } from "uuid";
import OptionName from "./OptionName.vue";

export default {
  props: ["salePage", "defaults", "readonly"],
  mixins: [saleManageMixin,saleDataMixin],
  data() {
    return {
      optionSelected: [],
      optionExpanded: [],
      optionHeaders: [
        {
          text: "ترتیب",
          align: "center",
          sortable: false,
          value: "TD_FOrder",
          width: '10%'
        },
        {
          text: "اجباری",
          align: "center",
          sortable: false,
          value: "TD_FRequired",
          width: '5%',
        },
        {
          text: "مقدارهای خصوصیت",
          align: "right",
          sortable: false,
          value: "children",
          width: '60%',
        },
        {
          text: "شرح خصوصیت",
          align: "center",
          sortable: false,
          value: "TD_FCaption",
          width: '15%',
        },
        {
          text: "فعال",
          align: "center",
          sortable: false,
          value: "TD_FActive",
          width: '5%',
        },
        {
          text: "حذف",
          align: "center",
          sortable: false,
          value: "delete",
          width: '5%'
        }
      ],
      optionHeadersReadonly: [
        {
          text: "اجباری",
          align: "center",
          sortable: false,
          value: "TD_FRequired",
          width: '5%',
        },
        {
          text: "فعال",
          align: "center",
          sortable: false,
          value: "TD_FActive",
          width: '5%',
        },
        {
          text: "مقدارهای خصوصیت",
          align: "right",
          sortable: false,
          value: "children",
          width: '70%',
        },
        {
          text: "شرح خصوصیت",
          align: "center",
          sortable: false,
          value: "TD_FCaption",
          width: '25%',
        },
      ],
      optionsSortBy: "TD_FOrder",
      myData: this.salePage.options
    };
  },
  components: { UpDownButtons, ChipDeleteButton, OptionName },

  methods: {

    assignFOrder() {
      if (this.salePage.options) {

        this.salePage.options.sort((a, b) => {
          a.TD_FOrder - b.TD_FOrder
        })


        for (var i = 0; i <= this.salePage.options.length - 1; i++) {

          if (this.salePage.options[i]) {
            var option = this.salePage.options[i]

            this.salePage.options[i].TD_FOrder = i

            const optionValues = this.getOptionValues(this.salePage, option.TD_FID)

            if (optionValues) {
              optionValues.sort((a, b) => {
                a.TD_FOrder - b.TD_FOrder
              })

              for (var j = 0; j <= optionValues.length - 1; j++) {
                var child = optionValues[j]

                if (child) {
                  optionValues[j].TD_FOrder = j
                }
              }
            }
          }
        }
      }
    },

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
    },
  },
  mounted() {
    this.$vuetify.rtl = true;
    this.assignFOrder();
  },
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
}</style>
