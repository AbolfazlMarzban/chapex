<template>
    <div>
        <payment-manage />
    </div>  
</template>
<script>
export default {
    middleware: ["init-auth", "is-auth", "init-cart"],
    layout : "cart"
}
</script>
<style lang="">
    
</style>