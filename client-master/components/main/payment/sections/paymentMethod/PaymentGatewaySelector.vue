<template>
    <v-container>

        <v-row>
            <v-col v-for="(gateway, i) in paymentGateways" :key="i" cols="6" xl="2" lg="3" md="3" sm="6">
                <v-card class="pa-1" :outlined="paymentData.TP_FID_Bank == gateway.TD_FID ? true : false"
                    style="cursor: pointer; border-radius: 15px;" @click="gatewayChanged(gateway.TD_FID)">
                    <v-img height="100" :src="setImageUrl(gateway.TD_FPicAdd1)"></v-img>
                </v-card>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>

import paymentMixin from "../../_mixins/paymentMixins";
export default {
    mixins: [paymentMixin],
    props: ["cartData", "paymentData"],
    data() {
        return {
            paymentGateways: null,
            // selectedGateway: null,
            // pMethod: []
        }
    },

    async mounted() {
        this.getPayments()
    },

    methods: {
        gatewayChanged(gatewayFID) {
            this.paymentData.TP_FID_Bank = gatewayFID
        },

        async getPayments() {
            if (this.paymentData.TP_FID_Payment) {
                const gateways = await this.getPaymentGateways(this.paymentData.TP_FID_Payment)
                if (gateways) {
                    this.paymentGateways = gateways.filter(gateway => this.isInRange(gateway))
                }

                if (this.paymentGateways && this.paymentGateways.length > 0) {
                    this.paymentData.TP_FID_Bank = this.paymentGateways[0].TD_FID
                }
            }
        },

        isInRange(gateway) {
            return (this.paymentData.TP_FPrice >= gateway.TD_FValue1 && this.paymentData.TP_FPrice <= gateway.TD_FValue2)
        },
    },
    watch: {
        "paymentData.TP_FID_Bank"(newValue) {
            this.paymentData.finalizeOrderRequested = false
        }
    }
}
</script>