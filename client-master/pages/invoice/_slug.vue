<template>
    <div>
        <LazyCartItemAdminInvoiceCard  :item="item" />
    </div>
</template>

<script>
import cartDetailMixins from "../../components/main/cart/_mixins/cartDetailMixins";

export default {

    middleware: ["init-auth", "is-auth", "init-cart"],
    mixins: [cartDetailMixins],

    async asyncData({ params }) {
        const slug = params.slug; // When calling /abc the slug will be "abc"
        return { slug };
    },

    data() {
        return {
            item: null
        }
    },
    mounted() {
        this.getItem()
    },
    methods: {
        async getItem() {
            const currentCartItems = await this.getBascket(0);

            if (currentCartItems)
                this.item = currentCartItems.find(i => i.TOD_FID == this.slug)
        },
    },
    layout: "print"
}
</script>