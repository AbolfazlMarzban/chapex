<template>
    <div>
        <PaymentGateways />
    </div>
</template>

<script>
import PaymentGateways from '../../../components/main/paymentGateways/PaymentGateways.vue';

export default {
    middleware: ["init-auth", "is-auth", "is-user"],
    layout: "manage",
    components: { PaymentGateways }
};
</script>


