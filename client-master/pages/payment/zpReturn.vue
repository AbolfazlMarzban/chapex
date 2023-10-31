<template></template>

<script>
import paymentMixin from "../../components/main/payment/_mixins/paymentMixins";

export default {
    middleware: ["init-auth", "is-auth"],

    mixins: [paymentMixin],

    async mounted() {
        const status = this.$route.query.Status
        const authority = this.$route.query.Authority

        if (status == 'OK') {
            const verifyResult = await this.verifyPayment(authority)

            if (verifyResult.firstPass) {
                this.$router.replace(`/payment/success?orderId=${verifyResult.orderId}&refId=${verifyResult.refId}`);
            }
            else {
                this.$router.replace("/")
            }
        }
        else if (status == 'NOK') {
            this.$router.replace(`/payment/failed?gateway=zp&authority=${authority}`);
        }
    }
}
</script>