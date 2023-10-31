<template>
  <div>
    <LazyManageOrders :state="state" />
  </div>
</template>

<script>
export default {
  middleware: ["init-auth", "is-auth", "is-user"],
  layout: "manage",
  data(){
    return{
        state: "myOrders"
    }
  }
}
</script>

<style>

</style>