<template>
  <v-expansion-panel>
    <v-expansion-panel-header>نتایج فرم</v-expansion-panel-header>
    <v-expansion-panel-content>
      <template v-if="designFormResult.length > 0">
        <template v-for="(item, i) in designFormResult">
          <v-row
            style="font-size: 14px"
            v-if="
              (item.TFD_FData || item.pic) &&
              (item.TFF_FID_TypeField == 11100 ||
                item.TFF_FID_TypeField == 11101 ||
                item.TFF_FID_TypeField == 11102 ||
                item.TFF_FID_TypeField == 11103 ||
                item.TFF_FID_TypeField == 11104 ||
                item.TFF_FID_TypeField == 11105 ||
                item.TFF_FID_TypeField == 11106 ||
                item.TFF_FID_TypeField == 11109 ||
                item.TFF_FID_TypeField == 11111 ||
                item.TFF_FID_TypeField == 11113 ||
                item.TFF_FID_TypeField == 11115 ||
                item.TFF_FID_TypeField == 11116 ||
                item.TFF_FID_TypeField == 11117 ||
                item.TFF_FID_TypeField == 11118 ||
                item.TFF_FID_TypeField == 11119 ||
                item.TFF_FID_TypeField == 11120 ||
                item.TFF_FID_TypeField == 11125)
            "
            :key="i"
          >
            <v-col
              cols="12"
              :class="`${item.pic ? `d-flex flex-column items-start` : ``}py-2`"
            >
              <span>{{ item.TFF_FLable }} :</span>
              <img
                v-if="
                  item.pic &&
                  (item.pic.TPIC_FType == 'jpg' ||
                    item.pic.TPIC_FType == 'jpeg' ||
                    item.pic.TPIC_FType == 'png' ||
                    item.pic.TPIC_FType == 'gif' ||
                    item.pic.TPIC_FType == 'webp' ||
                    item.pic.TPIC_FType == 'bmp' ||
                    item.pic.TPIC_FType == 'svg')
                "
                :src="item.pic.TPU_FAddress"
                alt=""
                style="width: fit-content"
              />
              <a
                v-else-if="
                  item.pic &&
                  (item.pic.TPIC_FType == 'psd' ||
                    item.pic.TPIC_FType == 'tiff' ||
                    item.pic.TPIC_FType == 'xlsx' ||
                    item.pic.TPIC_FType == 'csv' ||
                    item.pic.TPIC_FType == 'doc' ||
                    item.pic.TPIC_FType == 'pdf' ||
                    item.pic.TPIC_FType == 'zip' ||
                    item.pic.TPIC_FType == 'cdr' ||
                    item.TPIC_FType == 'ai')
                "
                :href="item.pic.TPU_FAddress"
              ></a>
              <video
                v-else-if="
                  item.pic &&
                  (item.TPIC_FType == 'mov' ||
                    item.TPIC_FType == 'mp4' ||
                    item.TPIC_FType == 'avi')
                "
                controls
              >
                <source :src="item.pic.TPU_FAddress" :type="`video/${item.pic.TPIC_FType}`" >
            </video>
            <audio  v-else-if="
                  item.pic &&
                  (item.pic.TPIC_FType == 'mp3')
                " controls>
                <source :src="item.pic.TPU_FAddress" :type="`audio/${item.pic.TPIC_FType}`" >
            </audio>
              <span v-if="!item.pic" style="color: #016670; font-weight: bold">{{
                showResult(item)
              }}</span>
            </v-col>
          </v-row>
        </template>
      </template>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import userProfileMixin from "../../../_mixins/userProfileMixin";
export default {
  props: ["data"],
  mixins: [userProfileMixin],
  mounted() {
    if (this.data.TOD_FID) {
      this.getData(this.data.TOD_FID);
    }
  },
  data() {
    return {
      designFormResult: [],
      uploadFormResult: [],
      orderID: "",
    };
  },
  methods: {
    async getData(id) {
      const result = await this.getUserOrder(id);
      this.orderID = result.order[0].TOD_FID;
      var options = result.options;
      for (var i = 0; i < options.length; i++) {
        if (options[i].TOP_FID_DesignForm) {
          this.getDesignForm(options[i].TOP_FID_DesignForm);
        }
        if (options[i].TOP_FID_UploadForm) {
          this.getUploadForm(options[i].TOP_FID_UploadForm);
        }
      }
    },
    async getDesignForm(id) {
      try {
        const result = await this.$authAxios.$get(
          `/formBuilder/getResult?id=${id}&orderID=${this.orderID}`
        );
        this.designFormResult = result;
        console.log("designFormResult", result);
      } catch (error) {
        console.log(error);
      }
    },
    async getUploadForm(id) {
      try {
        const result = await this.$authAxios.$get(
          `/formBuilder/getResult?id=${id}&orderID=${this.orderID}`
        );
        // console.log('uploadFormResult', result)
        this.uploadFormResult = result;
      } catch (error) {
        console.log(error);
      }
    },
    showResult(item) {
      if (item.TFD_FData) {
        if (item.TFD_FData == "true") {
          return "انتخاب شده";
        }
        return item.TFD_FData;
      }
    },
  },
  watch: {
    data(newValue) {
      if (newValue.TOD_FID) {
        this.getData(newValue.TOD_FID);
      }
    },
  },
};
</script>
