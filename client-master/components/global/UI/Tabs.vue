<template>
  <div class="my-tab">
    <ul>
      <li v-for="(item, index) in data" :key="index" id="btn-profile">
        <NuxtLink :to="item.link" tag="span">
          <span class="tab_item">{{item.title}}</span>
          <span class="vl-line"></span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style lang="scss" src="../../../assets/style/Ul/Tabs.scss" scoped>
</style>