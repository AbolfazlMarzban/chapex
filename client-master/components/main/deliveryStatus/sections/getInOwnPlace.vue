<template>
    <v-col v-if="deliveryStatusData.deliveryMethod == 23201" cols="12" lg="6" md="6" class="d-flex justify-start">

        <v-dialog v-model="companyAddressDialog" width="700">
            <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on" class="gr-color fns-16 fn-bold mb-lg-8 mb-md-8"
                    @click="companyAddressDialog = true">مشاهده آدرس چاپخانه</span>
            </template>
            <v-card class="submitComment_dialog">
                <v-card-title>
                    <div style="min-width: 100%">
                        <v-row class="submitComment_title">
                            <v-col cols="6">
                                <div class="popup-title">آدرس چاپخانه</div>
                            </v-col>
                            <v-col cols="6" class="text-left">
                                <div class="user-opinion float-left">
                                    <div class="" text @click="companyAddressDialog = false">
                                        <v-icon class="cursor-pointer">mdi-close-thick</v-icon>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-card-title>

                <v-card-text>
                    <div class="user-opinion fns-16">
                        لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی
                        و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.
                        طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن
                        صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده
                        می نماید
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-row> </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-col>
</template>

<script>

export default {
    props: ["deliveryStatusData"],
    data() {
        return {
            companyAddressDialog: false,
        }
    },
}
</script>