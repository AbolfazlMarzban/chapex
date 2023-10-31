<template>
  <v-card class="mb-3 pa-2 text-center">
    <v-btn @click="$emit('openAll')" class="ma-1 float-right" small rounded>
      <span class="ml-2">باز کردن همه</span>
      <v-icon>mdi-swap-vertical-bold</v-icon>
    </v-btn>

    <NavigationButton
      v-for="(tab, index) in Tabs"
      :key="index"
      :accordianValues="accordianValues"
      :text="tab"
      :value="index"
    ></NavigationButton>

    <!-- <NavigationButton
      :accordianValues="accordianValues"
      text="اطلاعات اولیه"
      value="0"
    ></NavigationButton>
    <NavigationButton
      :accordianValues="accordianValues"
      text="تعداد"
      value="1"
    ></NavigationButton>
    <NavigationButton
      :accordianValues="accordianValues"
      text="خصوصیات"
      value="2"
    ></NavigationButton>
    <NavigationButton
      :accordianValues="accordianValues"
      text="محصولات"
      value="3"
    ></NavigationButton>
    <NavigationButton
      :accordianValues="accordianValues"
      text="توضیحات"
      value="4"
    ></NavigationButton>
    <NavigationButton
      :accordianValues="accordianValues"
      text="گالری تصاویر"
      value="5"
    >
    </NavigationButton> -->

    <v-btn @click="$emit('closeAll')" class="ma-1 float-left" small rounded>
      <span class="ml-2">بستن همه</span>
      <v-icon>mdi-format-vertical-align-center</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: ["Tabs", "accordianValues", "status"]
};
</script>
