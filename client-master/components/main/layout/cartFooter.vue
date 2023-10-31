<template>
    <v-row class="footer-main cartMainFooter" style="background: #016670;justify-content:center; align-items:center; width: 100%; margin: 0px;">
        <v-col lg="4" md="12" sm="12" cols="12" style="text-align:center;">
            <v-row>
                <v-col cols="12">
                    <ul class="footermenu">
                        <li>
                            <v-icon style="color: #C8C5C5; font-size: 10px;">mdi-square</v-icon>
                            <router-link to="/about">
                                درباره چاپکس
                            </router-link>
                        </li>
                        <li>
                            <v-icon style="color: #C8C5C5; font-size: 10px;">mdi-square</v-icon>
                            <router-link to="/whyChapex">
                                چرا چاپکس
                            </router-link>

                        </li>
                        <li>
                            <v-icon style="color: #C8C5C5; font-size: 10px;">mdi-square</v-icon>
                            <router-link to="/jobs">
                                فرصت های شغلی
                            </router-link>
                        </li>
                        <li>
                            <v-icon style="color: #C8C5C5; font-size: 10px;">mdi-square</v-icon>
                            <router-link to="/rules">
                                قوانین سفارش
                            </router-link>

                        </li>
                    </ul>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <ul class="footermenu">
                        <li>
                            <v-icon style="color: #C8C5C5; font-size: 10px;">mdi-square</v-icon>
                            <router-link to="/Partners">
                                همکاری با چاپکس
                            </router-link>
                        </li>
                        <li>
                            <v-icon style="color: #C8C5C5; font-size: 10px;">mdi-square</v-icon>
                            <router-link to="/faq">
                                سوالات متداول
                            </router-link>

                        </li>
                        <li>
                            <v-icon style="color: #C8C5C5; font-size: 10px;">mdi-square</v-icon>
                            <router-link to="/helpcenter">
                                راهنمای خرید
                            </router-link>
                        </li>
                        <li>
                            <v-icon style="color: #C8C5C5; font-size: 10px;">mdi-square</v-icon>
                            <router-link to="/privacy">
                                حریم خصوصی
                            </router-link>

                        </li>
                    </ul>
                </v-col>
            </v-row>
        </v-col>
        <v-col lg="2" style="text-align:center;" xl="1" md="12" sm="12" cols="12">
            <!-- <img src="../../../../assets/img/Group 210.png" style="border-radius:0px;max-width:100%;"> -->
            <div class="d-flex flex-column">
                <span style="color: white;">با ما تماس بگیرید</span>
                <a href="tel:+982191017919" style="font-size: 18px;">021-91017919</a>
            </div>
        </v-col>

        <v-col lg="2" style="text-align:center;" xl="1" md="12" sm="12" cols="12">
            <!-- <img src="../../../../assets/img/Group 210.png" style="border-radius:0px;max-width:100%;"> -->
            <div class="d-flex flex-column">
                <a referrerpolicy="origin" target="_blank"
                    href="https://trustseal.enamad.ir/?id=309106&amp;Code=qfDduAUQLWGfguhX1GL7"><img referrerpolicy="origin"
                        src="https://Trustseal.eNamad.ir/logo.aspx?id=309106&amp;Code=qfDduAUQLWGfguhX1GL7" alt=""
                        style="cursor:pointer" id="qfDduAUQLWGfguhX1GL7"></a>
            </div>
        </v-col>

        <v-col lg="4" md="12" sm="12" cols="12" style="text-align:center;">
            <ul class="secondfootermenu">
                <li style="font-size:14px; margin-left: 10px">
                    کلیه حقوق این سرویس (وب‌سایت و اپلیکیشن‌های موبایل) محفوظ و متعلق به چاپکس می‌باشد.
                </li>
                <!-- <li>
                        <v-icon style="color:white; font-size:20px;">mdi-instagram</v-icon>
                    </li>
                    <li>
                        <v-icon  style="color:white;font-size:20px;">mdi-pinterest</v-icon>
                    </li>
                    <li style="font-size:14px;">
                        ما را دنبال کنید
                    </li> -->
            </ul>
        </v-col>
    </v-row>
</template>
<script>

export default {

}
</script>
<style lang="scss">
.footermenu li {
    color: white;
    display: inline;
    margin: 0px 10px;
}

.footermenu li:hover {
    cursor: pointer;
}

.secondfootermenu li {
    color: white;
    display: inline;
}

.secondfootermenu {
    padding-left: 10px !important;
}

.v-application a {
    color: white;
}

@media (max-width: 600px) {
    .secondfootermenu li {
        font-size: 12px !important;
    }
}

@media (max-width: 600px) {

    .footermenu {
        padding-left: 0px !important;

        li {
            font-size: 13px !important;
            margin: 0px 36px;
        }
    }
}
.cartMainFooter{
  margin-bottom: 85px !important;
}
@media (max-width:600px) {
  .cartMainFooter{
    margin-bottom: 80px !important;
  }
}

</style>