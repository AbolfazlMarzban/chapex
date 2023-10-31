<template>
    <v-row class="mt-xl-12 mt-lg-12 mt-md-12 mt-6 pb-5 px-5 pt-0 finalPriceTirajBox">
        <v-col cols="12" xl="5" lg="5" md="5">
            <TirajSelector />
        </v-col>
        <v-col cols="12" lg="7" xl="7" md="7">
            <FinalPrice />

            <v-row>
                <v-col cols="12" class=" pt-5 ma-0">
                    <AddToCartButton />
                </v-col>
            </v-row>

        </v-col>
    </v-row>
</template>

<script>
import FinalPrice from './FinalPriceTirajSections/FinalPrice.vue'
import TirajSelector from './FinalPriceTirajSections/TirajSelector.vue';
import AddToCartButton from './FinalPriceTirajSections/AddToCartButton.vue';
import userSaleMixin from '../../_mixins/userSaleMixin';

export default {
    mixins: [userSaleMixin],
    data() {
        return {
            seri: 1,
        }
    },
    methods: {
        seriChanged(seri) {
            this.seri = seri
            this.$emit('seriChanged', seri)
        }
    },
    components: { FinalPrice, TirajSelector, AddToCartButton }
}
</script>