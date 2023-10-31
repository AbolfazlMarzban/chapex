<template>
    <v-card>
        <v-card-title class="justify-end pa-3">
            <v-icon @click="$router.push('/profile/orders')">mdi-arrow-left-circle</v-icon>
        </v-card-title>
        <UserOrderDialogMobile :data="order" :steps="steps" :options="options" @closeOrder="closeOrder" />
    </v-card>
</template>
  
<script>
import UserOrderDialogMobile from './UserOrderDialogMobile.vue';
import userProfileMixin from '../../_mixins/userProfileMixin';
export default {
    components: { UserOrderDialogMobile },
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
            }
            else {
                this.$router.push(`/profile/orders/`)
            }
        }

    },

    methods: {
        closeOrder() {
            this.$router.push(`/profile/orders/`)
        },
    },
}
</script>
  
<style></style>