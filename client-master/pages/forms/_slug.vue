<template>
    <div>
        <LazyFormViewer :FID="this.$route.params.slug" :readonly="false" :order="order"></LazyFormViewer>
    </div>
</template> 
  
<script>
export default {
    middleware: ["init-auth", "is-auth", "is-user"],
    layout: "salePagelayout",
    props: ["order"] 
};
</script>
