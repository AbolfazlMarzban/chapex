<template>
  <v-row class="
                  mt-1
                  pr-xl-4
                  pr-lg-4
                  pr-md-4
                  pl-xl-2
                  pl-md-2
                  pl-lg-2
                  justify-center
                  justify-sm-center
                  justify-xl-start
                  justify-lg-start
                  justify-md-start
                  align-center
                ">
    <v-select flat outlined rounded solo return-object
      :items="getOptionValues(salePageStatus.salePage, option.TD_FID).filter((c) => childCanShow(option, c))"
      item-text="TD_FName" item-value="TD_FID" :item-disabled="(child) => childDisabled(option, child)"
      v-model="selectedChild" :value="selectedValue()" @change="userSelectedOptionChanged"
      class="pt-0 mt-0 classicSelector">
    </v-select>

    <v-btn v-if="selectedChild" icon @click="clearSelection()" color="#930149">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-row>
</template>


<script>
import userSaleMixin from '../../../_mixins/userSaleMixin'
import saleDataMixin from '../../../_mixins/saleDataMixin'

export default {
  props: ["option"],
  inject: ["salePageStatus", "itemClicked"],

  mixins: [userSaleMixin, saleDataMixin],

  data() {
    return {
      selectedChild: null
    }
  },

  methods: {

    childDisabled(option, child) {
      if (this.option.TD_FActionToDeps == 23102) //نمایش همیشگی
        return false

      return this.childDisabledByDeps(this.salePageStatus.state, this.salePageStatus.salePage, option, child)
    },

    childCanShow(option, child) {
      if (this.option.TD_FActionToDeps == 23103) {//نمایش مشروط 
        const check = this.childDisabledByDeps(this.salePageStatus.state, this.salePageStatus.salePage, option, child)
        if (check)
          return false
      }

      const activeCheck = this.optionValue_isActive(this.salePageStatus.salePage, this.salePageStatus.finalProduct, child)
      if (!activeCheck)
        return false

      const showInProductCheck = this.optionValue_showInProducts(this.salePageStatus.salePage, this.salePageStatus.finalProduct, child)
      if (!showInProductCheck)
        return false

      if (child.TD_FActive == 0)
        return false

      return true
    },

    selectedValue() {

      var ret = null
      this.getOptionValues(this.salePageStatus.salePage, this.option.TD_FID).forEach(child => {
        if (this.salePageStatus.state == 'userSet') {
          const selectedChild = this.salePageStatus.salePage.optionsValues.find(ov => ov.TD_FID == child.TD_FID && ov.isSelected)

          if (selectedChild)
            ret = selectedChild

        }

        if (this.salePageStatus.state == 'backgroundSet') {
          if (child.TD_FDefault)
            ret = child
        }
      })

      this.selectedChild = ret
      return ret
    },

    showWarn(option) {
      var index = this.salePageStatus.salePage.optionsValues.findIndex(ov => ov.TD_FID_Group == option.TD_FID && ov.isSelected);
      if (index == -1) {
        return true;
      }
      return false;
    },

    isdotted(child) {
      if (this.hoverChild) {
        if (this.hoverChild.disableReason) {
          if (child.TD_FID == this.hoverChild.disableReason.TD_FID)
            return true;
        }
      }
    },

    userSelectedOptionChanged(child) {
      this.itemClicked(child)
      // this.$emit('userSelectedOptionChanged', child)
    },

    clearSelection() {
      this.itemClicked(null)
      // this.$emit('userSelectedOptionChanged', null)

      this.selectedChild = null

      var sel = this.salePageStatus.salePage.optionsValues.find(ov => ov.TD_FID_Group == this.option.TD_FID && ov.isSelected)
      if (sel)
        sel.isSelected = null
    },
  },
}
</script>

<style lang="scss">
.classicSelector {
  background: none !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: 1px solid #D9D9D9;

  .v-text-field__details {
    display: none;
  }

  .v-input__slot {
    min-height: 45px !important;
    height: 0px;
    margin-bottom: 0px;
  }

  .v-input__control {
    min-height: 44px !important;
  }

  fieldset {
    height: 50px;
    border: none !important;
  }

  .v-select__slot {
    height: 50px;
  }

  label {
    font-family: "bakhtiari" !important;
    font-size: 16px !important;
    font-weight: normal;
    padding-left: 50px;
    left: auto;
  }

  input {
    background: none !important;
    border: none !important;
  }

  .v-select__selections {
    justify-content: start;

    input {
      display: none;
    }
  }
}

// .classicSelector.v-text-field>.v-input__control>.v-input__slot:before {
//     border-style: none;
// }

// .classicSelector.v-text-field>.v-input__control>.v-input__slot:after {
//     border-style: none;
// }
</style>