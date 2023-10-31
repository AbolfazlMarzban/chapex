<template>
    <v-row v-if="salePageStatus.finalProduct" class="finalProductMemoBox pt-4">
        <v-col v-if="salePageStatus.finalProduct.TGO_FProductionTime" cols="12" class="pb-0">
            <span>زمان مورد نیاز برای چاپ این محصول:</span>
            <span>{{ salePageStatus.finalProduct.TGO_FProductionTime }}</span>
            <span>روز کاری</span>
        </v-col>
        <v-col cols="12" class="pt-0">
            <span>{{ salePageStatus.finalProduct.TGO_FComment }}</span>
        </v-col>
    </v-row>
</template>


<script>

export default {
    inject: ['salePageStatus']
}
</script>