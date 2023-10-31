<template>
    <v-expansion-panel class="togglebox">
        <accordian-title title="تنظیمات" :unsaved="false" />
        <v-expansion-panel-content>
            <v-row>
                <v-col cols="4" class="py-0">
                    <v-checkbox v-model="product.TGO_FActive" label="فعال بودن" :disabled="readonly">
                    </v-checkbox>
                </v-col>

                <v-col cols="4" class="py-0">
                    <v-checkbox label="امکان فروش" v-model="product.TGO_FCanSale" :disabled="readonly">
                    </v-checkbox>
                </v-col>

                <v-col cols="4" class="py-0">
                    <v-checkbox v-model="product.TGO_FArchive" label=" امکان نمایش در صفحه فروش " :disabled="readonly">
                    </v-checkbox>
                </v-col>

                <v-col cols="4" class="py-0">
                    <v-checkbox label="نمایش قالب روی طرح " :disabled="readonly"></v-checkbox>
                </v-col>

                <v-col cols="4" class="py-0">
                    <v-checkbox v-model="product.TGO_FCanOff" label="امکان اعمال تخفیف   " :disabled="readonly">
                    </v-checkbox>
                </v-col>
                <v-col cols="4" class="py-0">
                    <v-checkbox v-model="product.TGO_FCanTax" label="اعمال ارزش افزوده اجباری" :disabled="readonly">
                    </v-checkbox>
                </v-col>
                <v-col cols="4" class="py-0 form_product_mange_link">
                    <p>
                        <v-icon> mdi-square-rounded </v-icon>
                        <span> کاربرد در محصولات </span>
                    </p>
                </v-col>
                <v-col cols="4" class="py-0 form_product_mange_link">
                    <p>
                        <v-icon> mdi-square-rounded </v-icon>
                        <span> گزارش فروش کالا </span>
                    </p>
                </v-col>
                <v-col cols="4" class="py-0 form_product_mange_link">
                    <p>
                        <v-icon> mdi-square-rounded </v-icon>
                        <span> گزارش تغییرات قیمت </span>
                    </p>
                </v-col>
            </v-row>

            <v-row class="mt-5">
                <v-col cols="4">
                    <ui-input type="text" class="form_control_textInput" label="     سریال     " placeholder=" "
                        :readonly="true" v-model="product.TGO_FID" />
                </v-col>

                <v-col cols="4">
                    <ui-input type="text" class="form_control_textInput" label="تاریخ ثبت" placeholder=" " :readonly="true"
                        v-model="product.TGO_FDateReg" />
                </v-col>

                <v-col cols="4">
                    <ui-input type="text" class="form_control_textInput" label="کاربر ثبت" placeholder=" " :readonly="true"
                        v-model="product.TGO_FUserRegName" />
                </v-col>
            </v-row>
        </v-expansion-panel-content>

    </v-expansion-panel>
</template>

<script>

export default {
    props: ["product", "readonly"],
}
</script>