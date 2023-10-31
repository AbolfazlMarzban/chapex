<template lang="">
    <div>
        <deliveryStatusManage  />
    </div>  
</template>
<script>
import deliveryStatusManage from '../../components/main/mainCart/deliveryStatusManage.vue';
export default {   
    middleware: ["init-auth", "is-auth", "is-user", "init-cart"],
    components: { deliveryStatusManage },
    layout : "mainOrg"
}
</script>
<style lang="">
    
</style>