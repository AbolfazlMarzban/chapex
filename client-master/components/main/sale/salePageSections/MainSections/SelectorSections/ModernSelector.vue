<template>
  <v-row class="mt-xl-1 mt-lg-1 mt-md-1 mt-0 justify-start"
    v-if="optionsValues">
    <ModernSelectorItem :option="option" :optionValue="child" v-for="child in optionsValues.filter(
      c => c.TD_FID_Group == option.TD_FID
    )" :key="child.TD_FOrder" />
  </v-row>
</template>

<script>
import userSaleMixin from "../../../_mixins/userSaleMixin";
import saleDataMixin from "../../../_mixins/saleDataMixin";
import designMixin from '../../../_mixins/designMixin';

import ModernSelectorItem from "./modernSelector/ModernSelectorItem.vue";

export default {
  props: ["option"],
  inject: ["salePageStatus", "optionsValues"],

  data() {
    return {
      canShow: true,
    };
  },

  mounted() {
    this.setCanShow()
  },

  components: { ModernSelectorItem },
  mixins: [userSaleMixin, saleDataMixin, designMixin],
  methods: {
    setCanShow() {

      if (this.option.TD_FActionToDeps == 23102) { //نمایش همیشگی
        this.canShow = true
        return
      }

      if (this.salePageStatus.state == 'backgroundSet') {
        if (this.option.TD_ActionToBgSet) {
          this.canShow = false
          return
        }
      }
      else {
        if (this.option.TD_FFormType == 1) {
          if (!this.depSelected(this.salePageStatus.salePage, this.option)) {
            this.canShow = false
            return
          }
        }

        if (this.option.TD_FHideOnAloneSet == 1) {
          const activeItems = this.getActiveItems(this.salePageStatus.state, this.salePageStatus.salePage, this.option)
          if (activeItems.length <= 1) {
            this.canShow = false
            return
          }
        }

        if (this.option.TD_FActive == 0) {
          this.canShow = false
          return
        }
      }

      this.canShow = true

    },
  },

  watch: {
    "salePageStatus.changed": {
      handler(newValue, oldValue) {
        if (this.option) {
          this.setCanShow()
        }
      },
      immediate: true
    },
  }
};
</script>
