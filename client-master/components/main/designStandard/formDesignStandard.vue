<template>
  <v-container class="bg-white 
  
  design_standard_container
 
  product_form_items">
    <v-row>
      <v-col cols="6">
        <ui-input
          type="text"
          class="form_control_textInput"
          label="تاریخ ایجاد "
          :readonly="true"
        />
      </v-col>
      <v-col cols="6">
        <ui-input
          type="text"
          class="form_control_textInput"
          label="کاربر ایجاد "
          :readonly="true"
        />
      </v-col>
      <v-col cols="6">
        <ui-input
          type="text"
          class="form_control_textInput"
          label=" نام استاندارد "
          :readonly="readonly"
        />
      </v-col>
      <v-col cols="6">
        <ui-input
          type="text"
          class="form_control_textInput"
          label=" شرح استاندارد "
          :readonly="readonly"
        />
      </v-col>
      <v-col cols="6">
        <ui-input
          type="text"
          class="form_control_textInput"
          label="  تایتل صفحه "
          :readonly="readonly"
        />
      </v-col>
      <v-col cols="6">
        <ui-input
          type="text"
          class="form_control_textInput"
          label=" لینک صفحه  "
          :readonly="readonly"
        />
      </v-col>
      <v-col cols="6">
        <ui-input
          type="text"
          class="form_control_textInput"
          label=" سر عنوان صفحه  "
          :readonly="readonly"
        />
      </v-col>
      <v-col cols="6">
        <ui-input
          type="text"
          class="form_control_textInput"
          label="  شرح سر عنوان صفحه "
          :readonly="readonly"
        />
      </v-col>
      <v-col cols="2">
        <v-checkbox
          v-model="selected"
          label="کادر رسته شغلی "
          :disabled="readonly"
        ></v-checkbox>
      </v-col>
      <v-col cols="2">
        <v-checkbox
          v-model="selected"
          label="کادر  انتخاب رنگ  "
          :disabled="readonly"
        ></v-checkbox>
      </v-col>
      <v-col cols="2">
        <v-checkbox
          v-model="selected"
          label="انتخاب بررسی تخصصی "
          :disabled="readonly"
        ></v-checkbox>
      </v-col>
      <v-col cols="3">
        <v-checkbox
          v-model="selected"
          label=" امضا و تائید "
          :disabled="readonly"
        ></v-checkbox>
      </v-col>
      <v-col cols="3">
        <v-checkbox
          v-model="selected"
          label="  لینک اتوماتیک  "
          :disabled="readonly"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <ui-button
          class="product_form_final-btn"
          label="فهرست کاربرد در صفحات محصول   "
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-checkbox
          v-model="selected"
          label="  فرم ساز "
          :disabled="readonly"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row class="design_standard_btns">
      <ui-button class="product_form_final-btn" label="متن خطی" />
      <ui-button class="product_form_final-btn" label="شماره  " />
      <ui-button class="product_form_final-btn" label="پاراگراف " />
      <ui-button class="product_form_final-btn" label="چک باکس  " />
      <ui-button class="product_form_final-btn" label="آبشاری  " />
      <ui-button class="product_form_final-btn" label="چند انتخابی " />
      <ui-button class="product_form_final-btn" label="دکمه رادیوئی " />
    </v-row>
    <v-row>
      <v-col cols="12">
        <p>جـــــــــــدول</p>
      </v-col>
    </v-row>
  
   
  </v-container>
</template>
