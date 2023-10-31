<template>
  <v-expansion-panel class="togglebox">
    <accordian-title title="اطلاعات اولیه" :unsaved="sections_changed()" :readonly="readonly" />

    <v-expansion-panel-content>
      <v-row>
        <v-col>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <label class="">مشخصات محصول</label>
        </v-col>

        <v-col cols="3">
          <ui-input type="text" class="form_control_textInput" label="نام صفحه محصول" placeholder=" " :readonly="readonly"
            v-model.lazy="data.TPS_FTitle" />
        </v-col>

        <v-col cols="3">
          <ui-input type="text" class="form_control_textInput" label=" عنوان (تگ تایتل)" placeholder=" "
            :readonly="readonly" v-model.lazy="data.TPS_FCaption" />
        </v-col>

        <v-col cols="3">
          <ui-input type="text" class="form_control_textInput" label=" عنوان (تگ H1)" placeholder=" " :readonly="readonly"
            v-model.lazy="data.TPS_FH1" />
        </v-col>

        <v-col cols="3">
          <ui-input type="text" class="form_control_textInput" label="لینک" placeholder=" " :readonly="readonly"
            v-model.lazy="data.TPS_FLink" />
        </v-col>

        <v-col cols="12">
          <v-divider></v-divider>
          <label class="">ابزار های سئو</label>
        </v-col>

        <v-col cols="3">
          <ui-input type="text" class="form_control_textInput" label="کلمات کلیدی" v-model.lazy="data.TPS_FIDs_KeyWord"
            :readonly="readonly" placeholder="کلمات کلیدی را با ، از هم جدا کنید" maxLength="5000" />
        </v-col>

        <v-col cols="3">
          <ui-input class="form_control_textInput" label=" متای توضیحات " :readonly="readonly" placeholder="  "
            v-model.lazy="data.TPS_FSEO1" maxLength="5000" />
        </v-col>

        <v-col cols="3">
          <ui-input class="form_control_textInput" label="اسکیما" :readonly="readonly" placeholder="  "
            v-model.lazy="data.TPS_FSEO2" maxLength="5000" />
        </v-col>

        <v-col cols="3"></v-col>

        <v-col cols="12">
          <v-divider></v-divider>
          <label class="">طبقه بندی محصول</label>
        </v-col>

        <v-col cols="3">
          <label>معیارهای کیفی</label>
          <v-select v-model.lazy="data.TPS_FIDs_Quality" :items="defaults[228]" item-text="TD_FName" item-value="TD_FID"
            multiple chips class="pt-0" style="margin-top: -6px !important" :disabled="readonly"></v-select>
        </v-col>

        <v-col cols="3">
          <ui-select :readonly="readonly" :options="{
            fields: {
              id: 'TF_FID',
              name: 'TF_FName',
              search: 'TF_FName',
            },
            label: '   محصولات مشابه  ',
            count: 10,
          }" v-model="data.TPS_FIDs_PageRelation" :items="data.formList.filter(f => f.TF_FID_FType == 11409)" />
        </v-col>

        <v-col cols="6"></v-col>

        <v-col cols="12">
          <v-divider></v-divider>
          <label class="">دسته نمایش</label>
        </v-col>

        <v-col cols="3">
          <label>دسته بندی منو</label>

          <v-treeview :selectable="!readonly" :items="defaults273" item-key="TD_FID" v-model="data.TPS_FIDs_Category">
          </v-treeview>

        </v-col>

        <v-col cols="3">
          <label>دسته بندی صفحه نخست</label>
          <v-treeview :selectable="!readonly" :items="defaults275" item-key="TD_FID"
            v-model="data.TPS_FIDs_CategoryIndex">
          </v-treeview>

        </v-col>

        <v-col cols="6"></v-col>

        <v-col cols="12">
          <v-divider></v-divider>
          <label class="">زمان و کاربر</label>
        </v-col>

        <v-col cols="3">
          <ui-input type="text" class="form_control_textInput" label="تاریخ ایجاد   " placeholder=" " :readonly="true"
            v-model.lazy="data.TPS_FDateReg" />
        </v-col>
        <v-col cols="3">
          <ui-input type="text" class="form_control_textInput" label="ساعت ایجاد   " placeholder=" " :readonly="true"
            v-model.lazy="data.TPS_FDateReg" />
        </v-col>
        <v-col cols="3">
          <ui-input type="text" class="form_control_textInput" label="کاربر ایجاد کننده   " placeholder=" "
            :readonly="true" v-model.lazy="data.TPS_FUserReg" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-divider></v-divider>
          <label class="">ویژگی های صفحه</label>
        </v-col>
        <v-col cols="3" class="mt-0" md="2" sm="12">
          <v-checkbox v-model.lazy="seoOptionsArray" label="   Add Canonical   " value="noCanonical" :disabled="readonly"
            @change="seoOptionsSendToParent"></v-checkbox>
        </v-col>
        <v-col cols="3" class="mt-0" md="2" sm="12">
          <v-checkbox v-model.lazy="seoOptionsArray" label="   Add Nofollow  " value="noFollow" :disabled="readonly"
            @change="seoOptionsSendToParent"></v-checkbox>
        </v-col>
        <v-col cols="3" class="mt-0" md="2" sm="12">
          <v-checkbox v-model.lazy="seoOptionsArray" label="  Add Noindex    " value="noIndex" :disabled="readonly"
            @change="seoOptionsSendToParent"></v-checkbox>
        </v-col>

        <v-col cols="3" class="mt-0" md="2" sm="12">
          <v-checkbox v-model="data.TPS_FActive" label=" فعال و نشر " :value="data.TPS_FActive" :true-value="1"
            :false-value="0" :disabled="readonly">
          </v-checkbox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-divider></v-divider>
          <label class="">اشتراک گذاری در شبکه های اجتماعی</label>
        </v-col>
        <v-col cols="3" class="mt-0" md="2" sm="12">
          <v-checkbox v-model.lazy="socialMediasArray" label="  Whatsapp     " value="Whatsapp" :disabled="readonly"
            @change="socialMediasSendToParent"></v-checkbox>
        </v-col>
        <v-col cols="3" class="mt-0" md="2" sm="12">
          <v-checkbox v-model.lazy="socialMediasArray" label="  Telegram     " value="Telegram" :disabled="readonly"
            @change="socialMediasSendToParent"></v-checkbox>
        </v-col>
        <v-col cols="3" class="mt-0" md="2" sm="12">
          <v-checkbox v-model.lazy="socialMediasArray" label="  Facebook     " value="Facebook" :disabled="readonly"
            @change="socialMediasSendToParent"></v-checkbox>
        </v-col>

        <v-col cols="3" class="mt-0" md="2" sm="12">
          <v-checkbox v-model.lazy="socialMediasArray" label="  instagram     " value="instagram" :disabled="readonly"
            @change="socialMediasSendToParent"></v-checkbox>
        </v-col>
      </v-row>

    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props: ["data", "defaults", "readonly", "wizardView", "lastsaved_data"],
  data() {
    return {
      salePagesForRelatedPagesSelect: [],
      socialMediasArray: [],
      seoOptionsArray: [],
    };
  },
  mounted() {

  },
  computed: {
    defaults273: function () {
      if (this.readonly)
        return this.defaults[273].filter(d => this.isInSelected(this.data.TPS_FIDs_Category, d))
      else
        return this.defaults[273]
    },
    defaults275: function () {
      if (this.readonly)
        return this.defaults[275].filter(d => this.isInSelected(this.data.TPS_FIDs_CategoryIndex, d))
      else
        return this.defaults[275]
    }
  },

  methods: {
    isInSelected(items, def) {
      const rootIndex = items.findIndex(i => i == def.TD_FID)
      if (rootIndex > -1) {
        return true
      }

      if (def.children && def.children.length > 0) {
        for (var i = 0; i <= def.children.length - 1; i++) {
          const child = def.children[i]
          const childIndex = items.findIndex(i => i == child.TD_FID)
          if (childIndex > -1) {
            return true
          }
        }
      }

      return false
    },
    sections_changed() {

      var local_data = JSON.parse(JSON.stringify(this.data))
      var obj1 = {
        TPS_FTitle: local_data.TPS_FTitle,
        TPS_FLink: local_data.TPS_FLink,
        TPS_FIDs_Category: local_data.TPS_FIDs_Category,
        TPS_FIDs_CategoryIndex: local_data.TPS_FIDs_CategoryIndex,
        TPS_FIDs_PageRelation: local_data.TPS_FIDs_PageRelation,
        TPS_FCaption: local_data.TPS_FCaption,
        TPS_FIntroduction: local_data.TPS_FIntroduction,
        TPS_FIDs_Quality: local_data.TPS_FIDs_Quality,
        TPS_FIDs_KeyWord: local_data.TPS_FIDs_KeyWord,
        TPS_FSEO1: local_data.TPS_FSEO1,
        TPS_FSEO2: local_data.TPS_FSEO2,
        TPS_FSEOProp: local_data.TPS_FSEOProp,
        TPS_FSEONetwork: local_data.TPS_FSEONetwork,
        TPS_FIcon: local_data.TPS_FIcon,
      }


      var local_lastsaved_data = JSON.parse(JSON.stringify(this.lastsaved_data))
      var obj2 = {
        TPS_FTitle: local_lastsaved_data.TPS_FTitle,
        TPS_FLink: local_lastsaved_data.TPS_FLink,
        TPS_FIDs_Category: local_lastsaved_data.TPS_FIDs_Category,
        TPS_FIDs_CategoryIndex: local_lastsaved_data.TPS_FIDs_CategoryIndex,
        TPS_FIDs_PageRelation: local_lastsaved_data.TPS_FIDs_PageRelation,
        TPS_FCaption: local_lastsaved_data.TPS_FCaption,
        TPS_FIntroduction: local_lastsaved_data.TPS_FIntroduction,
        TPS_FIDs_Quality: local_lastsaved_data.TPS_FIDs_Quality,
        TPS_FIDs_KeyWord: local_lastsaved_data.TPS_FIDs_KeyWord,
        TPS_FSEO1: local_lastsaved_data.TPS_FSEO1,
        TPS_FSEO2: local_lastsaved_data.TPS_FSEO2,
        TPS_FSEOProp: local_lastsaved_data.TPS_FSEOProp,
        TPS_FSEONetwork: local_lastsaved_data.TPS_FSEONetwork,
        TPS_FIcon: local_lastsaved_data.TPS_FIcon,
      }

      return !(JSON.stringify(obj1) === JSON.stringify(obj2))
    },

    socialMediasSendToParent() {
      console.log("socialMediasArray", this.socialMediasArray);
      this.$emit("socialMediasArray", this.socialMediasArray);
    },

    seoOptionsSendToParent() {
      console.log("seoOptionsArray", this.seoOptionsArray);
      this.$emit("seoOptionsArray", this.seoOptionsArray);
    },
  },
};
</script>