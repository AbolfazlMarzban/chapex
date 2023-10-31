<template>
    <v-card class="userProfile-formViewer">
        <v-card-title class="justify-end pa-3">
            <!-- <label> فرم سفارش طراحی </label> -->
            <v-icon @click="$router.push(`/profile/orders/${$route.params.orderId}`)">mdi-arrow-left-circle</v-icon>
        </v-card-title>
        <LazyFormViewer v-for="option in options" :key="option.TOP_FID" v-if="option.TOP_FID_DesignForm" :orderID="order.TOD_FID" :FID="option.TOP_FID_DesignForm" :readonly="false"
            @cancelForm="cancelForm" @formSaved="formSaved" />
    </v-card>
</template>
  
<script>
import userProfileMixin from '../../_mixins/userProfileMixin';
export default {
    mixins: [userProfileMixin],
    data() {
        return {
            order: {},
            steps: [],
            options: [],
        }
    },
    async mounted() {

        if (this.$route.params.orderId) {
            const result = await this.getUserOrder(this.$route.params.orderId)
            if (result.order.length > 0) {
                this.order = result.order[0]
                this.steps = result.steps
                this.options = result.options
                console.log('result', result)
                if (this.order.TOD_FID_LastStatusDetail != 2450301 && this.order.TOD_FID_LastStatusDetail != 2450305)
                    this.$router.push(`/profile/orders/${this.$route.params.orderId}`)
            }
            else {
                this.$router.push(`/profile/orders/`)
            }
        }

    },

    methods: {
        cancelForm() {
            this.$router.push(`/profile/orders/${this.$route.params.orderId}`)
        },

        async formSaved() {

            const value = {
                state: 'Insert',
                userReg: this.User.TU_FID,
                status1: this.order.TOD_FID_LastStatus,
                statusDetail1: this.order.TOD_FID_LastStatusDetail,
                status2: 24503,
                statusDetail2: 2450302,
                orderHeadID: this.order.TOD_FID_Header,
                orderID: this.order.TOD_FID,
                caption: 'فرم سفارش طراحی توسط کاربر تکمیل شد',
            }

            try {
                const result = await this.$authAxios.$post("/order/changeStatus", { value })
                if (result) {
                    this.$router.push(`/profile/orders/${this.$route.params.orderId}`)
                }
            } catch (error) {
                console.log(error)
            }

        },
    },
}
</script>
  
<style lang="scss">
.userProfile-formViewer{
    background: none !important;
    box-shadow: none !important;
}
</style>