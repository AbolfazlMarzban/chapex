<template>
  <div class="additional-data">
    <v-row>
      <v-col cols="12" class="d-flex">
        <h2 style="font-size: 16px">اطلاعات شغلی</h2>
      </v-col>

      <v-col cols="12" xl="4" lg="4" md="4" sm="4">
        <label for="">زمینه فعالیت</label>
        <v-select
          class="pt-0 mt-0"
          item-value="TD_FID"
          item-text="TD_FName"
          :items="defaults[125]"
          v-model="userData.TU_FID_Bussines"
          :disabled="readonly"
          :rules="[rules.required]"
        ></v-select>
      </v-col>

      <v-col cols="12" xl="4" lg="4" md="4" sm="4">
        <label for="">نام تجاری</label>
        <v-text-field
          class="mt-0 pt-0"
          :disabled="readonly"
          :rules="[rules.required]"
          v-model="userData.TU_FFamil"
        ></v-text-field>
      </v-col>

      <v-col cols="12" xl="4" lg="4" md="4" sm="4">
        <label for="">شرح فعالیت</label>
        <v-text-field
          class="mt-0 pt-0"
          v-model="userData.TU_FWork"
          :disabled="readonly"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>

      <v-col cols="12" xl="4" lg="4" md="4" sm="4">
        <label for="">روش آشنایی با ما</label>
        <v-select
          class="pt-0 mt-0"
          item-value="TD_FID"
          item-text="TD_FName"
          :items="defaults[126]"
          v-model="userData.TU_FID_Relation"
          :disabled="readonly"
          :rules="[rules.required]"
        ></v-select>
      </v-col>
      <v-col cols="12" xl="4" lg="4" md="4" sm="4">
        <label for="">آدرس وبسایت</label>
        <v-text-field
          class="pt-0 mt-0"
          v-model="userData.TU_FWebsite"
          :disabled="readonly"
        ></v-text-field>
      </v-col>
      <v-col cols="12" xl="4" lg="4" md="4" sm="4">
        <label for="">اینستاگرام</label>
        <v-text-field
          class="mt-0 pt-0"
          v-model="userData.TU_FInstagram"
          :disabled="readonly"
        ></v-text-field>
      </v-col>
      <v-col cols="12" xl="4" lg="4" md="4" sm="4">
        <label for="">تلگرام</label>
        <v-text-field
          class="mt-0 pt-0"
          v-model="userData.TU_FTelegram"
          :disabled="readonly"
        ></v-text-field>
      </v-col>
    </v-row>

    <ActionBar
      :readonly="readonly"
      @edit="$emit('edit')"
      @cancel="$emit('cancel')"
      @submit="$emit('submit')"
    />
  </div>
</template>

<script>
import ActionBar from "./ActionBar.vue";

export default {
  props: ["userData", "defaults", "readonly"],
  components: { ActionBar },

  data() {
    return {
      rules: {
        required: value => !!value || "الزامی."
      }
    };
  }
};
</script>

<style lang="scss">
.additional-data {
  .v-input__slot {
    input {
      padding-right: 10px;
    }
  }
  .v-input__slot::before {
    display: none !important;
  }
}
</style>
