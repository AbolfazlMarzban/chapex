<template>
  <Transition name="slide-fade">
    lockClicked:{{ lockClicked }}
    <span class="option-title-lock-warn pr-xl-3 pr-lg-3 pr-md-3 pr-sm-3"
      v-if="lockClicked && lockClicked.TD_FID_Group == option.TD_FID" @click="disableSelected()">
      <v-icon>mdi-lock-outline</v-icon>
      <span>برای این انتخاب، </span>
      <span class="optionName">{{
        return_optionTitle(lockClicked.disableReason)
      }}</span>
      <span class="optionName">{{ lockClicked.disableReason.TD_FName }}</span>
      <span> را غیر فعال کنید</span>
    </span>
  </Transition>
</template>                        

<script>

export default {
  props: ["option", "lockClicked"],
  inject: ["salePageStatus", "itemClicked", "hideLockMemo"],

  methods: {
    return_optionTitle(child) {
      var option = this.salePageStatus.salePage.options.find(o => o.TD_FID == child.TD_FID_Group)

      if (option)
        return option.TD_FName
    },

    disableSelected() {
      this.lockClicked.disableReason.isSelected = 0

      this.hideLockMemo()
      this.itemClicked()
      // this.$emit('userSelectedOptionChanged')
    },
  },
}
</script>

<style scoped>
.optionName {
  font-family: boldbakhtiari !important;
}
</style>