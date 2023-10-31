<template>
    <div class="order-levels">
        <!-- <label class="lbl-titlee">مراحل سفارش شما</label> -->
        <v-row class="justify-center">
            <v-col cols="12">
                <v-sheet style="direction: ltr" class="slider-menu">

                    <v-slide-group multiple show-arrows>
                        
                        <v-slide-item>
                            <div class=" d-flex align-center">
                                <NuxtLink :style="{ cursor: 'pointer' }" to="/cart" class=" pa-0 cart-navbar"
                                    :class="currentStep == 'cart' ? ' red-color ' : ' text-color-gray '">
                                    <v-icon>mdi-cart</v-icon>
                                    سبد خرید
                                </NuxtLink>
                            </div>
                        </v-slide-item>

                        <v-slide-item>
                            <div class="d-flex align-center">
                                <v-divider style="width: 50px" class="mx-3"></v-divider>
                                    <span :style="{ cursor: 'pointer' }" class="pa-0 cart-navbar"
                                    :class="currentStep == 'payment' ? ' red-color ' : ' text-color-gray '" @click="$emit('next')">
                                    <v-icon>mdi-currency-usd</v-icon>
                                    پرداخت</span>
                            </div>
                        </v-slide-item>

                    </v-slide-group>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props: ["currentStep"]
}
</script>