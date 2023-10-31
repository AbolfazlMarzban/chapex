<template>
  <div class="text-center">
    <v-dialog persistent v-model="dialog" width="500" class="goods_dialogs_main">
      <v-card class="goods_dialog">
        <v-card-title>
          <v-row>
            <v-col cols="12" class="title">
              <span>{{ dialogTitle() }}</span>
            </v-col>
          </v-row>
        </v-card-title>

        <v-card-text>
          <v-divider></v-divider>
          <div class="goods_dialog_text">

            <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>نام خصوصیت: </label> </span>
              </v-col>
              <v-col cols="8">
                <v-text-field class="pt-0 mt-0" v-model="option.TD_FName"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span>
                  <label>مقدارهای انتخابی: </label>
                </span>
              </v-col>
              <v-col cols="8">
                <PressEnter :items="optionValues" :optionId="option.TD_FID"></PressEnter>
              </v-col>
              <v-col cols="4"> </v-col>
              <v-col cols="8">
                <PressEnterList :items="optionValues"></PressEnterList>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-checkbox label=" فعال " v-model="option.TD_FActive">
                </v-checkbox>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6" class="text-right">
                <v-btn v-if="OptionType == 21703" elevation="2" rounded dark color="#016670" @click="submitDialog"
                  class="px-6">
                  <span v-if="status == 'insert'">افزودن خصوصیت انتخابی</span>
                  <span v-else-if="status == 'edit'">ثبت</span>
                </v-btn>

                <v-btn v-else-if="OptionType == 21704" elevation="2" rounded dark color="pink" @click="submitDialog"
                  class="px-6">
                  ثبت خصوصیت طراحی
                </v-btn>

                <v-btn v-else-if="OptionType == 21705" elevation="2" rounded dark color="orange" @click="submitDialog"
                  class="px-6">
                  ثبت خصوصیت نظارت بر طراحی
                </v-btn>

                <v-btn v-else-if="OptionType == 21706" elevation="2" rounded dark color="indigo accent-2"
                  @click="submitDialog" class="px-6">
                  ثبت خصوصیت محاسباتی
                </v-btn>
              </v-col>

              <v-col cols="6" class="text-left">
                <v-btn outlined @click="$emit('cancel')" elevation="2" rounded dark color="#016670" class="px-6"> بستن
                </v-btn>
              </v-col>

            </v-row>
            
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

        </v-card-actions>
      </v-card>
      <!-- {{ option }} -->
    </v-dialog>
  </div>
</template>

<script>
import optionsMixins from "../options_copy/_mixins/optionsPageSaleMixin";
import saleManageMixin from "../_mixins/saleManageMixin";
import saleDataMixin from "../../sale/_mixins/saleDataMixin";
import { v4 as uuidv4 } from "uuid";

export default {
  mixins: [optionsMixins, saleManageMixin, saleDataMixin],
  props: ["OptionType", "salePage", "status", "optionForEdit"],

  data() {
    return {
      option: {},
      optionValues: [],
      dialog: true,
    };
  },
  async mounted() {

    if (this.status == 'insert') {
      this.option = {
        TD_FID: uuidv4(),
        isNew: true,
        TD_FName: "",
        TD_FType: this.OptionType,
        TD_FCaption: "",
        TD_FActive: 1,
        TD_FDelete: 0,
        TD_FOrder: this.salePage.options.length,
      }
    }

    else if (this.status == 'edit') {
      this.option = JSON.parse(JSON.stringify(this.optionForEdit))
      this.optionValues = JSON.parse(JSON.stringify(this.getOptionValues(this.salePage, this.option.TD_FID)))
      this.optionValues.forEach(ov => ov.newlyAdded = false)
    }
  },
  methods: {
    dialogTitle() {

      if (this.status == 'insert') {
        switch (this.OptionType) {
          case 21703:
            return 'افزودن خصوصیت انتخابی'

          case 21704:
            return 'خصوصیت طراحی'

          case 21705:
            return 'خصوصیت نظارت بر طراحی'

          case 21706:
            return 'افزودن خصوصیت محاسباتی'
        }
      }

      else if (this.status == 'edit') {
        switch (this.OptionType) {
          case 21703:
            return 'ویرایش خصوصیت انتخابی'

          case 21704:
            return 'خصوصیت طراحی'

          case 21705:
            return 'خصوصیت نظارت بر طراحی'

          case 21706:
            return 'ویرایش خصوصیت محاسباتی'
        }
      }
    },

    submitDialog() {
      if (this.status == 'insert') {
        this.salePage.options.push(this.option);

        this.optionValues.forEach(ov => {
          if (ov.newlyAdded && ov.TD_FDelete == 0) {
            ov.TD_FID_Group = this.option.TD_FID
            this.salePage.optionsValues.push(ov)
          }
        })
        this.$emit("submit");
      }

      else if (this.status == 'edit') {

        this.optionValues.forEach(ov => {
          if (ov.TD_FDelete == 1) {
            const optionValue = this.salePage.optionsValues.find(v => v.TD_FID == ov.TD_FID)
            if (optionValue)
              optionValue.TD_FDelete = 1
          }
          else if (ov.newlyAdded) {
            ov.TD_FID_Group = this.option.TD_FID
            this.salePage.optionsValues.push(ov)
          }
        })


        this.$emit("submit", this.option);
      }
    },

  },
};
</script>

<style lang="scss">
.mx_margitn-top-0 {
  .mx_Select {
    margin-top: 0 !important;
  }
}

.optInput input {
  height: 30px;
}
</style>

<style scoped>
.title {
  color: #016670;
  font-weight: bolder;
}
</style>