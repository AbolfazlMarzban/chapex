<template>
    <v-card>
        <v-card-title class="justify-space-between">
            <label> آپلود فایل های طراحی </label>
            <v-icon @click="$router.push(`/profile/orders/${$route.params.orderId}`)">mdi-arrow-left-circle</v-icon>
        </v-card-title>
        <LazyFormViewer v-for="option in options" v-if="option.TOP_FID_UploadForm" :FID="option.TOP_FID_UploadForm" :readonly="false"
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

                if (this.order.TOD_FID_LastStatusDetail != 2450401 && this.order.TOD_FID_LastStatusDetail != 2450402)
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
            let nextStatus = 24505 //چاپ و تولید
            let nextStatusDetail = 2450501 //فرم بندی و چیدمان

            if (Number(this.order.TOD_FID_Review) > 0) {
                nextStatus = 24504 //آپلود فایل
                nextStatusDetail = 2450403 //در انتظار تعیین ناظر
            }

            const value = {
                state: 'Insert',
                userReg: this.User.TU_FID,
                status1: this.order.TOD_FID_LastStatus,
                statusDetail1: this.order.TOD_FID_LastStatusDetail,
                status2: nextStatus,
                statusDetail2: nextStatusDetail,
                orderHeadID: this.order.TOD_FID_Header,
                orderID: this.order.TOD_FID,
                caption: 'آپلود فایل طراحی توسط کاربر انجام شد',
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
  
<style></style>