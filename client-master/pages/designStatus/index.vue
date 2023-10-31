<template lang="">
    <div>
        <LazyDesignStatusManage />     
    </div>  
</template>
<script>
export default {  
    middleware: ["init-auth", "is-auth", "init-cart"],
    layout : "mainOrg"
}
</script>
<style lang="">
    
</style>  