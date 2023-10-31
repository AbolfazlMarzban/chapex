<template>
  <div>
    <ul class="bread_crumb_ul">
      <li
        v-for="(breadcrumb, index) in breadcrumb.values"
        :key="index"
        @click="removeFromBreadcrumb"
      >
        {{ breadcrumb.TD_FName }}
      </li>
    </ul>
  </div>
</template>

<script>
import "../../../assets/style/Ul/BreadCrumb.scss"
  export default {
    props: ["breadcrumb"],
  }
</script>

<style lang="scss" scoped>

</style>