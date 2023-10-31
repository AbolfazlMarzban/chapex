<template>
  <v-col cols="12" xl="12" lg="12" md="12" class="mrg-top-10 pt-0 profile-page animate__animated">
    <div class="left-menu">

      <PersonalInfo :userData="userData" :defaults="defaults" :readonly="readonly" @edit="edit" @cancel="cancel"
        @submit="submit" @closeComponent="$emit('closeComponent')" />

      <AdditionalInfo :userData="userData" :defaults="defaults" :readonly="readonly" @edit="edit" @cancel="cancel"
        @submit="submit" class="my-6" />

      <AddressInfo :userData="userData" :defaults="defaults" :readonly="readonly" @edit="edit" @cancel="cancel"
        @submit="submit" />
      <LegalInfo :userData="userData" :readonly="readonly" @edit="edit" @cancel="cancel" @submit="submit" />

      <ChangePassword :userData="userData" class="my-6" />

    </div>
  </v-col>
</template>

<script>
import SubmitDataMixin from "../../../plugins/mixins/user/submitData";
import 'animate.css';
import PersonalInfo from "./sections/profile/PersonalInfo.vue";
// import LegalInfo from "./sections/profile/LegalInfo.vue";
import AdditionalInfo from "./sections/profile/AdditionalInfo.vue";
import AddressInfo from "./sections/profile/AddressInfo.vue";
import ChangePassword from "./sections/profile/ChangePasswordInProfile.vue";

export default {
  props: ["userData", "defaults"],
  components: { PersonalInfo, AdditionalInfo, AddressInfo, ChangePassword },
  mixins: [SubmitDataMixin],
  data() {
    return {
      readonly: true,
      selectOptions: {
        fields: {
          id: "TD_FID",
          name: "TD_FName",
          search: "TD_FName",
        },
        count: 10,
      },
      userDataTemp: {},
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "ردیف",
          align: "center",
          sortable: false
        },
        {
          text: "نام و نام خانوادگی",
          align: "center",
          sortable: false
        },
        {
          text: "ایمیل",
          align: "center",
          sortable: false
        },
        {
          text: "سمت",
          align: "center",
          sortable: false
        },
        {
          text: "جنسیت",
          align: "center",
          sortable: false
        },
        {
          text: "تاریخ تولد",
          align: "center",
          sortable: false
        },
        {
          text: "کد ملی",
          align: "center",
          sortable: false
        },
        {
          text: "شماره تماس",
          align: "center",
          sortable: "false"
        },
      ];
    },
    legalHeaders() {
      return [
        {
          text: "ردیف",
          align: "center",
          sortable: false
        },
        {
          text: "شخصیت تجاری",
          align: "center",
          sortable: false
        },
        {
          text: "نام",
          align: "center",
          sortable: false
        },
        {
          text: "شماره / شناسه ملی",
          align: "center",
          sortable: false
        },
        {
          text: "کد اقتصادی",
          align: "center",
          sortable: false
        },
        {
          text: "شماره تماس",
          align: "center",
          sortable: false
        },
        {
          text: "نشانی",
          align: "center",
          sortable: false
        }
      ];
    },
    addressTable() {
      return [
        {
          text: "ردیف",
          align: "center",
          sortable: false
        },
        {
          text: "نام مکان",
          align: "center",
          sortable: false
        },
        {
          text: "استان",
          align: "center",
          sortable: false
        },
        {
          text: "شهر",
          align: "center",
          sortable: false
        },
        {
          text: "کد پستی",
          align: "center",
          sortable: false
        },
        {
          text: "نشانی",
          align: "center",
          sortable: false
        },
        {
          text: "پلاک",
          align: "center",
          sortable: false
        },
        {
          text: "نام گیرنده",
          align: "center",
          sortable: false
        },
        {
          text: "شماره تماس",
          align: "center",
          sortable: false
        }
      ];
    }
  },
  mounted() {
    this.$vuetify.rtl = true;
    console.log('userData', this.userData)
  },
  methods: {
    async submit() {
      const result = await this.Submit().updateProfile(this.userData);
      if (result) {
        this.$store.dispatch("login/login", result.updatedUserData);
        this.readonly = true
      }
    },

    edit() {
      this.userDataTemp = JSON.parse(JSON.stringify(this.userData))
      this.readonly = false
    },

    cancel() {
      this.userData = JSON.parse(JSON.stringify(this.userDataTemp))
      this.readonly = true
    },
  },
};
</script>

<style lang="scss" src="../../../assets/style/auth/Profile.scss"></style>
<style lang="scss">
@media (max-width: 600px) {
  .profile-page {
    padding: 0px;
    margin-top: 0px;
  }
}
</style>