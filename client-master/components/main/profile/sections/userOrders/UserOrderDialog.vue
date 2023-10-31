<template>
  <v-dialog v-model="show" width="800">
    <v-card>
      <v-card-title class="justify-end pa-3">
        <!-- <label> کاربرگ سفارش </label> -->
        <v-icon @click="closeOrder">mdi-close-circle</v-icon>
      </v-card-title>
      <UserOrderDialogMobile :data="data" :steps="steps" :options="options" @closeOrder="closeOrder" />
    </v-card>
  </v-dialog>
</template>

<script>
import UserOrderDialogMobile from './UserOrderDialogMobile.vue';

export default {
  props: ["data", "steps", "options"],
  components: { UserOrderDialogMobile },
  data() { return { show: true } },
  methods: {
    closeOrder() {
      // this.$router.push('/profile/orders')
      this.$emit('closeOrder')
    },
  },
}
</script>

<style></style>