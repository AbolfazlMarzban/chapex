<template>
  <div>
    <LazyNewManageGoods/>
  </div>
</template>

<script>
export default {
  middleware: ["init-auth", "is-auth", "is-user"],
  layout: "manage",
  
  
};
</script>