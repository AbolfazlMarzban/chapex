<template>
  <!-- تعداد نمایش اطلاعات در جدول  -->
  <div  class="VueTables__limit-field melodi"> 
    <!-- <v-select
      :id="props.selectAttrs.id"
      :value="props.selectAttrs.value"
      label="تعداد نمایش : "
      @change="props.selectEvents.change"
      :items="[...props.perPageValues]"
    />-->

    <v-select
      :items="[...props.perPageValues]"
      @change="props.selectEvents.change"
      :id="props.selectAttrs.id"
      :value="props.selectAttrs.value"
      label="تعداد نمایش"
      class="VT_per_page_selector"
      dense
      solo
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "VtPerPageSelector",
  props: ["props"],
};
</script>

<style lang="scss" >
.VT_per_page_selector {
  width: 100px;
  padding: 10px;
  //max-width: 70px !important;
  //margin-right: 10px !important;
  .v-select__slot {
    label {
      right: 4px !important;
      text-align: right;
      font-size: 0.7rem;
    }
  }
  .v-text-field__details {
    display: none;
  }
  .v-input__slot {
    box-shadow: unset !important;
    border: 1px solid rgb(212, 212, 212);
    padding: 3px 0px !important;
  }
  .v-select__selection {
	font-size: 0.7rem;
	padding-right: 5px;
  }
  input { 
	  display: none;
  }
}
</style>