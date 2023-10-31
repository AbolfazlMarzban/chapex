<template>
  <v-card>
    <v-card-title></v-card-title>

    <v-card-text>
      <v-data-table class="elevation-1 mx-3" :headers="readonly ? childrenHeadersReadOnly : childrenHeaders"
        :items="getOptionValues(salePage, optionId)" :item-key="get_keyItem()" :sort-by.sync="childrenSortBy">

        <template v-slot:item.picture="{ item }">
          <OptionImageUploader :salePage="salePage" :item="item" :readonly="readonly"></OptionImageUploader>
        </template>

        <template v-slot:item.TD_FName="props">
          <span>
            <span class="selectiveOption">{{ props.item.TD_FName }}</span>
            <v-chip v-if="props.item.TD_FDefault == 1" color="success">پیشفرض</v-chip>
          </span>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import OptionImageUploader from "../optionsSections/OptionImageUploader.vue";
import saleManageMixin from "../../_mixins/saleManageMixin";
import saleDataMixin from "../../../sale/_mixins/saleDataMixin";

export default {
  props: ["salePage", "optionId", "defaults", "readonly"],
  mixins: [saleManageMixin, saleDataMixin],
  data() {
    return {
      childrenHeaders: [
        {
          text: "",
          align: "center",
          sortable: false,
          value: "trim",
          width: "5%"
        },
        {
          text: "مقدار",
          align: "right",
          sortable: false,
          value: "TD_FName",
          width: "80%"
        },
        {
          text: "عکس",
          align: "center",
          sortable: false,
          value: "picture",
          width: "10%"
        },
        {
          text: "",
          align: "center",
          sortable: false,
          value: "trim",
          width: "5%"
        }
      ],
      childrenHeadersReadOnly: [
        {
          text: "",
          align: "center",
          sortable: false,
          value: "trim1",
          width: "5%"
        },
        {
          text: "مقدار",
          align: "right",
          sortable: false,
          value: "TD_FName",
          width: "80%"
        },
        {
          text: "عکس",
          align: "center",
          sortable: false,
          value: "picture",
          width: "10%"
        },
        {
          text: "",
          align: "center",
          sortable: false,
          value: "trim",
          width: "5%"
        }
      ],
      childrenSortBy: "TD_FOrder",
      TD_FName: "",
      newRel: "",
      tree: [],
      treeItems: [],
      myData: this.salePage.options
    };
  },
  mounted() {
    this.assignTreeView();
  },
  methods: {
    addChild() {
      this.salePage.optionsValues.push({
        TD_FID: uuidv4(),
        isNew: true,
        newlyAdded: true,
        TD_FID_Group: this.optionId,
        TD_FName: this.TD_FName,
        TD_FCaption: "",
        TD_FActive: 1,
        TD_FDelete: 0,
        TD_FOrder: this.getOptionValues(this.salePage, this.optionId).length
      });
      this.TD_FName = "";
    },
    getDependecyName(id) {
      var ret = "";

      const option = this.getOptionForValue(this.salePage, id);
      this.salePage.optionsValues.forEach(child => {
        if (child.TD_FID == id) {
          ret = option.TD_FName + " > " + child.TD_FName;
        }
      });
      return ret;
    },
    assignTreeView() {
      // this.treeItems = []
      this.salePage.options.forEach(option => {
        var obj = {
          id: option.TD_FID,
          name: option.TD_FName,
          children: []
        };
        this.treeItems.push(obj);
        this.getOptionValues(this.salePage, option.TD_FID).forEach(child => {
          var obj1 = {
            id: child.TD_FID,
            name: child.TD_FName
          };
          obj.children.push(obj1);
        });
      });
      // console.log('this.treeItems', this.treeItems);
    },
    get_keyItem() {
      return "TD_FID";
      // if (this.salePage.options.length > 0 && this.salePage.options[0].TD_FID) {
      // }
      // else {
      //     return "tempid";
      // }
    },
    defaultOptionChanged(child) {
      if (child.TD_FDefault) {
        this.getOptionValues(this.salePage, this.optionId)
          .filter(c => !(c.TD_FID == child.TD_FID))
          .forEach(p => {
            p.TD_FDefault = 0;
          });
      }
    }
  },
  components: { OptionImageUploader }
};
</script>

<style scoped>
.selectiveOption {
  color: #016670;
  font-family: boldbakhtiari !important;
  font-size: 26px;
}
</style>
