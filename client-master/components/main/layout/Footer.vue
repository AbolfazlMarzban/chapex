<template lang="">
    <v-container style="margin:0px;max-width:inherit;">
        <v-row style="background: #016670;justify-content:center; align-items:center;">
            <v-col lg="5" md="12" sm="12" cols="12" style="text-align:center;">

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
            <v-col lg="1" style="text-align:center;" md="1" sm="12" cols="6" >
                <img src="../../../assets/img/Group 210.png" style="border-radius:0px;max-width:100%;">
            </v-col>
            <v-col lg="5" md="12" sm="12" cols="12" style="text-align:center;">
                <ul class="secondfootermenu">
                    <li style="font-size:14px; margin-left: 10px">
                        کلیه حقوق این سرویس (وب‌سایت و اپلیکیشن‌های موبایل) محفوظ و متعلق به چاپکس می‌باشد.
                    </li>
                    <li>
                        <v-icon style="color:white; font-size:20px;">mdi-instagram</v-icon>
                    </li>
                    <li>
                        <v-icon  style="color:white;font-size:20px;">mdi-pinterest</v-icon>
                    </li>
                    <li style="font-size:14px;">
                        ما را دنبال کنید
                    </li>
                </ul>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>

export default {

}
</script>
<style lang="scss">
@charset "UTF-8";


.footermenu li {
  font-family: bakhtiari !important;
  color: white;
  display: inline;
  margin: 0px 10px;
}

.footermenu li:hover {
  cursor: pointer;
}

.secondfootermenu li {
  font-family: bakhtiari !important;

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
  .footermenu li {
    font-size: 13px !important;
    margin: 0px 27px;
  }
}
</style>