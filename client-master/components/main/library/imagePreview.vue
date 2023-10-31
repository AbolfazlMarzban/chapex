<template>
  <div class="text-center">
    <v-dialog v-model="imagePrev" fullscreen>
      <div class="pa-4 d-flex flex-column" style="background: #01010175; height: 100%; width: 100%;">
        <div class="d-flex justify-end" style="width: 100%;">
          <v-icon @click="$emit('closePrev')" color="white">mdi-close</v-icon>
        </div>
        <div class="d-flex justify-center align-center pa-2" style="height: 100%; width: 100%;">
          <img v-if="image" :src="setImageUrl(image.TPIC_FAddress)" alt="" style="max-height: 90%; max-width: 100%; width: auto;">
        </div>
      </div>
      <!-- <v-card style="border-radius: 20px;">
        <v-row class="pa-2 ma-0">
          <v-col cols="12" class="d-flex justify-end">
            <v-icon color="#016670" @click="$emit('closePrev')"
              >mdi-close</v-icon
            > 
          </v-col>
          <v-col cols="12" class="d-flex flex-column justify-center px-4">
            <img
              :src="setImageUrl(image.TPIC_FAddress)"
              alt=""
              style="width: 100%;"
            />
          </v-col>
          <v-col cols="12">
            <label>اسم فایل</label>
            <v-row style="width: 100%; margin-left: 0px;">
              <v-col cols="11">
                <v-text-field
                  class="mt-0 pa-1"
                  v-model="image.TPIC_FName"
                  :disabled="editName"
                  style="border: none"
                ></v-text-field
              ></v-col>
              <v-col cols="1">
                <v-icon color="#016670" @click="editName = false"
                  >mdi-pencil</v-icon
                >
              </v-col>
            </v-row>
              <label for="">alt</label>
              <v-row style="width: 100%; margin-left: 0px;">
                <v-col cols="11">
                  <v-text-field
                    class="mt-0 pa-1"
                    v-model="image.TPIC_FComment"
                    :disabled="editAlt"
                    style="border: none"
                  ></v-text-field
                ></v-col>
                <v-col cols="1">
                  <v-icon color="#016670" @click="editAlt = false"
                    >mdi-pencil</v-icon
                  >
                </v-col>
              </v-row>

              <label for="">link</label>
              <v-row style="width: 100%; margin-left: 0px;">
                <v-col cols="11">
                    <span style="font-size: 12px;">
                        {{ setImageUrl(image.TPIC_FAddress) }}
                    </span>
                </v-col>
                <v-col cols="1">
                  <v-icon color="#016670" @click="copyLink"
                    >mdi-content-copy</v-icon
                  >
                </v-col>
              </v-row>

            <v-btn
              color="#016670"
              dark
              block
              rounded
              style="letter-spacing: normal;"
              @click="$emit('editSubmit', image)"
              >تایید</v-btn
            >
          </v-col>
        </v-row>
      </v-card> -->
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["imagePrev", "image"],
  data() {
    return {
      editName: true,
      editAlt: true
    };
  },
};
</script>
