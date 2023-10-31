<template>

  <div>
   
    <v-card color="basil" flat>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="4">
              
              <ui-input
                type="text"
                class="form_control_textInput"
                label="تاریخ ایجاد   "
                placeholder=" "
                :readonly="true"
                v-model="data.TPS_FDateReg"
              />
            </v-col>
            <v-col cols="4">
              <ui-input
                type="text"
                class="form_control_textInput"
                label="کاربر ایجاد کننده   "
                placeholder=" "
                :readonly="true"
                v-model="data.TPS_FUserReg"
              />
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="data.TPS_FActive"
                label="   فعال و نشر "
                value="close"
                :disabled="readonly"
                
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ui-input
                type="text"
                class="form_control_textInput"
                label="تایتل صفحه     "
                placeholder=" "
                :readonly="readonly"
                v-model="data.TPS_FTitle"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ui-input
                type="text"
                class="form_control_textInput"
                label="لینک صفحه     "
                placeholder=" "
                :readonly="readonly"
                v-model="data.TPS_FLink"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ui-select
                :multiple="true"
                :readonly="readonly"
                :options="{
                  fields: {
                    id: '',
                    name: '',
                    search: ''
                  },
                  label: '  دسته نمایش  ',
                  count: 10
                }"
                v-model="data.TPS_FIDs_Category"
              />
              <!-- :items="defaults[207]" -->
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ui-select
                :multiple="true"
                :readonly="readonly"
                :options="{
                  fields: {
                    id: '',
                    name: '',
                    search: ''
                  },
                  label: '  صفحات فروش مرتبط   ',
                  count: 10
                }"
                v-model="data.TPS_FIDs_PageRelation"
              />
              <!-- :items="defaults[207]" -->
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ui-input
                type="text"
                class="form_control_textInput"
                label=" عنوان صفحه     "
                placeholder=" "
                :readonly="readonly"
                v-model="data.TPS_FCaption"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="mt-4">
              <ui-textarea
                lable="متن زیرعنوان صفحه "
                row="5"
                :readonly="readonly"
                placeholder="ادیتور با قابلیت لینک سازی"
                v-model="data.TPS_FDetails"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="mt-4">
              <ui-textarea
                lable="توضیحات "
                row="5"
                :readonly="readonly"
                placeholder=" ادیتور با قابلیت لینک سازی، توضیحات کنار قیمت"
                v-model="data.TPS_FComment"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="mt-4">
              <ui-textarea
                lable="راهنمای طراحی "
                row="5"
                :readonly="readonly"
                placeholder="  ادیتور با قابلیت لینک سازی "
                v-model="data.TPS_FDesign"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="mt-4">
              <ui-textarea
                lable="سوالات متداول "
                row="5"
                :readonly="readonly"
                placeholder="  ادیتور با قابلیت لینک سازی "
                v-model="data.TPS_FQuestion"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="mt-4">
              <ui-textarea
                lable="معرفی محصول "
                row="5"
                :readonly="readonly"
                placeholder="  ادیتور با قابلیت لینک سازی "
                v-model="data.TPS_FIntroduction"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ui-input
                type="text"
                class="form_control_textInput"
                label="معیارهای کیفی"
                placeholder=" در این فیلد میتوان چندین معیار کیفی که قبلادر اطلاعات پایه وارد شده است را انتخاب کرد"
                :readonly="readonly"
                v-model="data.TPS_FIDs_Quality"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-file-input
                accept="video/*"
                label=" افزودن ویدئو "
              ></v-file-input>
            </v-col>
            <v-col cols="6">
              <ui-input
                type="text"
                class="form_control_textInput"
                label=" متن جایگزین ویدئو "
                placeholder="    "
                :readonly="readonly"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <ui-file-real-time
                :id="'file1'"
                :readonly="readonly"
                label="تصویر"
                :options="{
                  state: 'pageSale'
                }"
                processSteps="upload"
                v-model="data.TPS_FComment"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
 
  props: ["data", "defaults", "readonly"],
  data() {
    return {
      tab: null,
      selected: []
    };
  },
  
};
</script>

<style lang="scss" scoped></style>
