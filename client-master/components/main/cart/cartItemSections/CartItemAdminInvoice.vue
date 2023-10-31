<template>
    <div class="text-center">
        <v-dialog persistent width="80%" v-model="dialog" class="goods_dialogs_main">
            <v-card class="goods_dialog">

                <v-card-title>
                    <v-btn icon @click="$emit('hiddenDialog')">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                    <v-btn icon :href="`/invoice/${item.TOD_FID}`" target="_blank">
                        <v-icon>mdi-printer-outline</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text>
                    <CartItemAdminInvoiceCard :item="item" />
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                </v-card-actions>

            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import CartItemAdminInvoiceCard from './CartItemAdminInvoiceCard.vue';


export default {
    props: ["item"],
    data() {
        return {
            dialog: true,
        };
    },
    mounted() {
    },

    components: { CartItemAdminInvoiceCard }
}
</script>