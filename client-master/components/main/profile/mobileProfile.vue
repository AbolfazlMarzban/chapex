<template>
  <v-col cols="12">
    <v-row class="align-center" v-if="!showComponent">
      <v-col cols="3">
        <img
          :src="setImageUrl(userData.TU_FPicAdd1)"  
          alt="profile"
          style="width: 100%"
          class="profile-pic"
        />
      </v-col>
      <v-col cols="9" class="d-flex flex-column user-short">
        <label>{{ userData.TU_FName }}</label>
        <span>{{ userData.TU_FID_BussinesName }}</span>
      </v-col>
    </v-row>
    <v-row v-if="!showComponent">
      <v-col cols="4" class="pl-1">
        <v-badge
          left
          overlap
          color="#D9D9D9"
          style="min-width: 100%"
          :content="messages"
          :value="messages"
        >
          <v-btn color="#016670" dark rounded block>پیام ها</v-btn>
        </v-badge>
      </v-col>
      <v-col cols="4" class="px-1" @click="toggleOffBox">
        <v-btn color="#016670" dark rounded block>تخفیف</v-btn>
      </v-col>
      <v-col cols="4" class="pr-1">
        <v-btn color="#016670" dark rounded block @click="show('profile')"
          >پروفایل</v-btn
        >
      </v-col>
    </v-row>
    <OffBox
      v-if="showOffBox"
      :user="userData"
      :defaults="defaults"
      class="animate__animated animate__fadeInUp"
    />

    <v-row v-if="!showComponent">
      <v-col cols="12">
        <v-list class="profile-list">
          <v-list-item @click="show('mobileDashboard')">
            <v-list-item-title>داشبورد</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-chevron-left</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider class="my-0 mx-4"></v-divider>
          <v-list-item @click="$router.push('/profile/orders')">
            <v-list-item-title>سفارشات</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-chevron-left</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider class="my-0 mx-4"></v-divider>
          <v-list-item @click="$router.push('/profile/filemanager')">
            <v-list-item-title>مدیریت فایل</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-chevron-left</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <!-- <v-list-item>
            <v-list-item-title>ارسال</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-chevron-left</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider class="my-0 mx-4"></v-divider>
          <v-list-item>
            <v-list-item-title>گردش حساب</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-chevron-left</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider class="my-0 mx-4"></v-divider>
          <v-list-item>
            <v-list-item-title>افزایش موجودی</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-chevron-left</v-icon>
            </v-list-item-icon>
          </v-list-item> -->
        </v-list>
        <!-- <v-col
          cols="12"
          class="profile-box my-2 d-flex justify-center align-center"
        >
          <span>تبلیغات</span>
        </v-col>
        <v-col
          cols="12"
          class="profile-box my-2 d-flex justify-center align-center"
        >
          <span>هشدارها</span>
        </v-col>
        <v-col cols="12" class="text-center">
          <a @click="logout" class="logout">خروج</a>
        </v-col> -->
      </v-col>
    </v-row>
    <component
      v-if="showComponent"
      :is="component"
      :userData="userData"
      :defaults="defaults"
      @closeComponent="closeComponent"
      class="mobile-component animate__animated animate__fadeInUp d-flex flex-column align-center"
    />
  </v-col>
</template>  

<script>
import 'animate.css';
import Profile from './Profile.vue'
import MobileDashboard from './userDashboard.vue'
import MobileOrders from './sections/userOrders.vue'
import library from '../library/library.vue';
export default {
    props: ["userData", "defaults"],
    components: { Profile, MobileDashboard,MobileOrders, library },
    data(){
        return{
            messages: 0,
            showOffBox: false,
            showProfile: false,
            showDashboard: false,
            showOrders: false,
            component: "",
            showComponent: false
        }
    },
    methods:{
           logout() {
      this.$store.dispatch("login/loggout");
      this.$router.replace("/");
    },
    closeProfile(){
         document.getElementsByClassName("profile-page")[1].classList.add("animate__fadeOutDown")
         setTimeout(()=>{
        this.showProfile = false
      }, 800)
        
    },
    closeDashboard(){
      document.getElementsByClassName("mobile-dashboard")[0].classList.add("animate__fadeOutDown")
      setTimeout(()=>{
        this.showDashboard = false
      }, 800)
      
    },
    toggleOffBox(){
               setTimeout(()=>{
        this.showOffBox = !this.showOffBox
      }, 500)
      if(document.getElementsByClassName("off-box")[0]){
document.getElementsByClassName("off-box")[0].classList.add("animate__fadeOutDown")
      }
    },
    show(value){
        if(value == "profile"){
            this.component = Profile
        } else if (value == "mobileDashboard"){
          this.component = MobileDashboard
        } else if(value == "mobileOrders"){
          this.component = MobileOrders
        } else if(value == "library"){
          this.component = library
        }
      this.showComponent = true
},
    closeComponent(){
      console.log(document.getElementsByClassName("mobile-component")[0])
      document.getElementsByClassName("mobile-component")[0].classList.add("animate__fadeOutDown")
          setTimeout(()=>{
      this.showComponent = false
      }, 800)
      // this.showComponent = false
    }

    },    
}
</script>

<style lang="scss">
@charset "UTF-8";
.profile-pic {
  border-radius: 50px;
  background: white;
  padding: 5px;
}
.user-short {
  label {
    color: #016670;
    font-family: boldbakhtiari !important;
    letter-spacing: normal;
    font-size: 14px;
  }
  span {
    font-size: 14px;
    color: black;
  }
}
.profile-list {
  border-radius: 20px !important;
  .v-list-item__title {
    font-family: boldbakhtiari !important;
    color: #016670;
  }
  .v-icon {
    color: #016670 !important;
  }
}
.profile-box {
  text-align: center;
  background: white;
  border-radius: 20px;
  height: 100px;
  span {
    font-family: boldbakhtiari !important;
    color: #016670;
  }
}
.logout {
  font-family: boldbakhtiari !important;
  color: #016670 !important;
}

// .slide-enter-active {
//   transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
// }

// .slide-leave-active {
//   transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
// }

// .slide-enter-from,
// .slide-leave-to {
//   transform: translateY(80px);
//   opacity: 0;
// }
</style>