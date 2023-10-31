<template>
    <!-- <v-col cols="3" xl="3" lg="3" md="0" sm="12" xs="12"> -->
        <div class="right-content">
            <v-container class="my-final-price">
                <v-row class="text-right align-center">
                    <v-col cols="5" >
                        <label for="" style="color: #016670;" class="fns-16">خرید های جاری</label>
                    </v-col>
                    <v-col cols="3" xl="3" lg="3" md="5" sm="5" class="text-left"> 
                        <v-icon @click="$router.push('/cart')" style="cursor: pointer;">mdi-table-edit</v-icon>
                    </v-col>
                    <v-col cols="4" xl="4" lg="4" md="2" sm="2">
                        <v-chip> {{ cartData.currentCartItems.length }} محصول</v-chip>
                    </v-col>
                </v-row>
                <hr>
                <v-row v-for="item in cartData.currentCartItems" :key="item.TOD_FID">
                    <v-col cols="3" xl="3" lg="3" md="1" class="px-0">
                        <img :src="getItemPic(item)" :alt="item.TGO_FName" style="width: 100%;">
                    </v-col>
                    <v-col cols="9" class="d-flex flex-column justify-center">
                        <div class="d-flex flex-column text-right">
                            <span class="fns-14">{{ item.TOD_FName }}</span>
                            <span class="fns-14"> تیراژ:    {{ item.TOD_FCount }}</span>
                            <span class="fns-12">{{ productName(item) }}</span>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    <!-- </v-col> -->
</template>

<script>
import cartDetailMixins from '../../cart/_mixins/cartDetailMixins';
import saleDataMixin from '../../sale/_mixins/saleDataMixin';
export default {
props: [ "cartData" ],
mixins: [ cartDetailMixins, saleDataMixin ],
methods:{
    getItemPic(item){
        const salePage = this.getSalePage(this.cartData, item.TOD_FID_SalePage)
        // console.log('salePage', salePage)
        var pic  = this.getSalePagePicture(salePage)
        // console.log('pic', pic)
        return this.setImageUrl(pic.path)
    },
    productName(item){
        const salePage = this.getSalePage(this.cartData, item.TOD_FID_SalePage)
        const product = this.getProduct(salePage, item.TOD_FID_Goods)
        return product.TGO_FName
    }
}
}
</script>

<style>

</style>