<template>
    <v-cointainer>
        <v-row class="ma-2">

            <v-col cols="5" class="my-col text-right">
                <span>نام صفحه محصول: </span>
                <span class="font-weight-black">{{ item.salePage.TPS_FTitle }}</span>
            </v-col>

            <v-col cols="7" class="my-col text-right">
                <span>نام محصول: </span>
                <span class="font-weight-bold">{{ item.finalProduct.TGO_FName }}</span>
            </v-col>

        </v-row>

        <v-row class="ma-2">
            <v-col cols="3" class="my-col text-right">
                <span>زمان تولید: </span>
                <span class="font-weight-black mx-1"></span>
            </v-col>
            <v-col cols="3" class="my-col text-right">
                <span>تاریخ: </span>
                <span class="font-weight-black mx-1"></span>
            </v-col>
            <v-col cols="3" class="my-col text-right">
                <span>ساعت: </span>
                <span class="font-weight-black mx-1"></span>
            </v-col>
            <v-col cols="3" class="my-col text-right">
                <span>کاربر: </span>
                <span class="font-weight-black mx-1"></span>
            </v-col>
            <v-col cols="3" class="my-col text-right">
                <span>تعداد: </span>
                <span class="font-weight-black mx-1">{{ item.tiraj }}</span>
            </v-col>
            <v-col cols="3" class="my-col text-right">
                <span>مبغ واحد: </span>
                <span class="font-weight-black mx-1">
                    {{ numberSeparate(calc_price(item.salePage, item.finalProduct,
                            item.selectedChildren, item.tiraj) / item.tiraj, 0)
                    }}
                </span>
                <span>تومان</span>
            </v-col>
            <v-col cols="6" class="my-col text-right">
                <span>مبلغ کل: </span>
                <span class="font-weight-black mx-1">
                    {{ numberSeparate(calc_price(item.salePage, item.finalProduct,
                            item.selectedChildren, item.tiraj))
                    }}
                </span>
                <span>تومان</span>
            </v-col>
            <v-col cols="12" class="my-col text-right">
                <span>شرح محصول: </span>
                <span class="font-weight-black mx-1"></span>
            </v-col>
        </v-row>

        <v-row class="ma-2">
            <v-col cols="12" class="my-col">مشخصات تولید</v-col>

            <v-col cols="1" class="my-col font-weight-black">ردیف</v-col>
            <v-col cols="2" class="my-col font-weight-black text-right">مشخصات</v-col>
            <v-col cols="3" class="my-col font-weight-black text-right">شرح</v-col>
            <v-col cols="2" class="my-col font-weight-black text-right">کالای مرتبط</v-col>
            <v-col cols="1" class="my-col font-weight-black">تکرار</v-col>
            <v-col cols="1" class="my-col font-weight-black">تعداد سفارش</v-col>
            <v-col cols="1" class="my-col font-weight-black">مبلغ واحد</v-col>
            <v-col cols="1" class="my-col font-weight-black">مبلغ کل</v-col>

            <template v-for="(child, index) in getChildren()">
                
                <v-col cols="1" class="my-col">{{ index + 1 }}</v-col>

                <v-col cols="2" class="my-col text-right">{{ child.option.TD_FName }}</v-col>

                <v-col cols="3" class="my-col text-right">{{ child.TD_FName }}</v-col>

                <v-col cols="2" class="my-col">
                    <span class="text-right" v-if="child.childInProduct.realted_good">{{
                            child.childInProduct.realted_good.TGO_FName
                    }}</span>
                    <span v-else>---</span>
                </v-col>

                <v-col cols="1" class="my-col">
                    <span class="text-right" v-if="child.childInProduct.TGPV_FRepet">{{
                            child.childInProduct.TGPV_FRepet
                    }}</span>
                    <span v-else>-</span>
                </v-col>

                <v-col cols="1" class="my-col">
                    <span class="text-right" v-if="child.childInProduct.TGPV_FCount">{{
                            numberSeparate(count(child), 2)
                    }}</span>
                    <span v-else>-</span>
                </v-col>

                <v-col cols="1" class="my-col">
                    <span class="text-right" v-if="child.childInProduct.realted_good">{{
                            numberSeparate(good_price(child) / count(child), 0)
                    }}</span>
                    <span v-else>0</span>
                </v-col>

                <v-col cols="1" class="my-col">{{ numberSeparate(good_price(child))
                }}
                </v-col>

            </template>
        </v-row>
    </v-cointainer>
</template>

<script>

export default {
    props: ["item"],

    methods: {
        getChildren() {
            var ret = [];
            if (this.item && this.item.selectedChildren && this.item.salePage) {
                var childrenInProduct = this.childrenInProduct(this.item.salePage, this.item.finalProduct, this.item.selectedChildren);
                if (childrenInProduct) {
                    childrenInProduct.forEach(optionValue => {
                        var child = this.item.selectedChildren.find(sc => sc.TD_FID == optionValue.TGPV_FID_Value);
                        if (child) {
                            var option = this.item.salePage.options.find(o => o.TD_FID == child.TD_FID_Group);
                            if (option)
                                child.option = option;
                            child.childInProduct = optionValue;
                            ret.push(child);
                        }
                    });
                    // this.item.selectedChildren.forEach(child => {
                    //     var option = this.item.salePage.options.find(o => o.TD_FID == child.TD_FID_Group)
                    //     if (option)
                    //         child.option = option
                    //     ret.push(child)
                    // })
                    // ret.forEach(optionValue => {
                    //     const childInProduct = childrenInProduct.find(c => c.TGPV_FID_Value == optionValue.TD_FID)
                    //     if (childInProduct)
                    //         optionValue.childInProduct = childInProduct
                    //     // console.log(optionValue.childInProduct.realted_good.TGO_FName);
                    // })
                }
            }
            return ret;
        },
        count(child) {
            if (child.TD_FType == 21704 || child.TD_FType == 21705)
                return 1;
            return (this.item.tiraj + child.childInProduct.TGPV_FWaste) * child.childInProduct.TGPV_FCount;
        },
        good_price(child) {
            if (child.TD_FType == 21703)
                return this.calc_good_price(child.childInProduct, this.item.tiraj);
            if (child.TD_FType == 21704)
                return this.calc_designPrice(this.item.salePage, this.item.finalProduct, this.item.selectedChildren, this.item.tiraj);
            if (child.TD_FType == 21705)
                return this.calc_reviewPrice(this.item.salePage, this.item.finalProduct, this.item.selectedChildren, this.item.tiraj);
        },
    },
}
</script>

<style scoped>
.my-col {
    border: 1px solid black;
}
</style>