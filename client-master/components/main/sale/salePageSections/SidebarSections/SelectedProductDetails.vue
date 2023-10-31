<template>
    <div class="mt-lg-15 mt-xl-15 mt-md-5 mt-5  pl-lg-16">
        <v-row>
            <v-expansion-panels variant="accordion" flat focusable>

                <v-divider></v-divider>

                <LazyProductDetails />

                <v-divider></v-divider>

                <LazyPriceTable />

                <v-divider></v-divider>

            </v-expansion-panels>
        </v-row>
    </div>
</template>

<script>
import ProductDetails from './ProductDetailsSections/ProductDetails.vue';
import PriceTable from './PriceTable.vue';


export default {
    components: { ProductDetails, PriceTable },
}
</script>