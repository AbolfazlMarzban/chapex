<template></template>

<script>
import paymentMixin from "../../components/main/payment/_mixins/paymentMixins";

export default {
    middleware: ["init-auth"],

    mixins: [paymentMixin],

    async asyncData({ req, res }) {

        if (process.server) {
            if (req.method === 'POST') {
                let formData = await req.body;
                let formDataJson = JSON.parse(JSON.stringify(formData));

                if (formDataJson.State == 'OK') {
                    return {
                        RefNum: formDataJson.RefNum,
                        authority: formDataJson.Token,
                        status: formDataJson.State,
                    }
                }
            }
        }
        return {}
    },

    async mounted() {

        if (this.status == 'OK') {
            const verifyResult = await this.verifyPayment(this.authority, this.RefNum)

            if (verifyResult.firstPass) {
                this.$router.replace(`/payment/success?orderId=${verifyResult.orderId}&refId=${verifyResult.refId}`);
            }
            else {
                this.$router.replace("/")
            }
        }
        else if (this.status == 'NOK') {
            this.$router.replace(`/payment/failed?gateway=zp&authority=${this.authority}`);
        }
    }
}
</script>