<template lang="">
    
                  <v-row>
                            <v-col cols="12" class="mt-4">
                        <div class="order-box">

                            <div class="obox">
                            
                                <v-row>
                                    <v-col v-for="(field, index) in formBuilderDataFromFirstTab.fields" :key="index" cols="12" xl="6" lg="6" :md="field.TFF_FColumn" sm="12" xs="12">
                                        <ui-input
                                             v-model="formDataPropsFromParent[index].data" 
                                             v-if="field.TFF_FID_TypeField == 11100 "
                                            :label="field.TFF_FLable"
                                            class="form_control_textInput"
                                            :readonly="readonly"
                                        />
                                        <ui-textarea
                                            v-else-if="field.TFF_FID_TypeField == 11101 "
                                            class="form_control_textInput"
                                            :label="field.TFF_FLable"
                                            lable="توضیحات"
                                            maxlength="500"
                                            :readonly="readonly"
                                            row="3"
                                        />
                                                <v-checkbox
                                                    v-else-if="field.TFF_FID_TypeField == 11103 "
                                                    :label="field.TFF_FLable"
                                                    :readonly="readonly"
                                                ></v-checkbox>
                                          <!-- <v-radio-group v-else-if="field.TFF_FID_TypeField ==  11104">
                                            <span class="text-right">{{ element.label }}</span>
                                            <v-radio
                                                v-for="(radio, index) in element.items"
                                                :key="index"
                                                :label="field.TFF_FLable"
                                                :value="radio.value"
                                                :readonly="readonly"
                                            ></v-radio>
                                            </v-radio-group> -->
                                           <ui-select
                                                v-else-if="field.TFF_FID_TypeField == 11105 "
                                                :options="{
                                                fields: {
                                                    id: 'TFF_FID', 
                                                    name: 'TFF_FLable',
                                                    search: 'TFF_FLable',
                                                }, 
                                                label: field.TFF_FLable,
                                                count: 7,
                                                }"
                                                :items="field.items"
                                                :readonly="readonly"
                                            />

                                             <ui-select
                                                v-else-if="field.TFF_FID_TypeField == 11106 "
                                                :multiple="true"
                                                :options="{
                                                    fields: {
                                                    id: 'id',
                                                    name: 'name',
                                                    search: 'name',
                                                    },
                                                    label: field.TFF_FLable,
                                                    count: 7,
                                                }"
                                                :items="field.items"
                                                :readonly="readonly"
                                                />

                                                <ui-select
                                                v-else-if="field.TFF_FID_TypeField == 11107 "
                                                :options="{
                                                    fields: {
                                                    id: 'id',
                                                    name: 'name',
                                                    search: 'name',
                                                    },
                                                    label: field.TFF_FLable,
                                                    count: 7,
                                                }"
                                                :items="field.items"
                                                :readonly="readonly"
                                                />
                                                    <ui-select
                                                v-else-if="field.TFF_FID_TypeField == 11108 "
                                                :multiple="true"
                                                :options="{
                                                    fields: {
                                                    id: 'id',
                                                    name: 'name',
                                                    search: 'name',
                                                    },
                                                    label: field.TFF_FLable,
                                                    count: 7,
                                                }"
                                                :items="field.items"
                                                :readonly="readonly"
                                                />


                                                 <ui-file-real-time
                                                 v-else-if="field.TFF_FID_TypeField == 11109 "
                                                 :id="element.id"
                                                 :label="field.TFF_FLable"
                                                 :options="{
                                                     state: 'user',
                                                 }"
                                                 processSteps="upload"
                                                 :readonly="readonly"
                                                 />
                                                 
                                                <ui-input-money
                                                v-else-if="field.TFF_FID_TypeField == 11118 "
                                                class="form_control_textInput"
                                                :label="field.TFF_FLable"
                                                />

                                            <ui-input
                                             v-if="field.TFF_FID_TypeField == 11119 "
                                            :label="field.TFF_FLable"
                                            
                                            class="form_control_textInput"
                                            :readonly="readonly"
                                            />
                                           

                                                

                                    </v-col>
                                </v-row>
                           
                            </div>

                        </div>
                         
                    </v-col>
                        <pre>
                            {{formBuilderDataFromFirstTab}}
                        </pre>
                  </v-row>


</template>
<script>
import "../../../assets/style/designStatus/designStatus.scss";


export default {
  props: ["formBuilderDataFromFirstTab" , "formDataPropsFromParent"],

  data() {
    return {
           
           };
  },

  methods: {},
  created() {
    for (let [
      index,
      field,
    ] of this.formBuilderDataFromFirstTab.fields.entries()) {
      this.formDataPropsFromParent.push({
        data: "",
        formID: this.formBuilderDataFromFirstTab.form.TF_FID,
        fieldID: field.TFF_FID,
      });
    }
  },
  mounted() {
    console.log("adsaskdjalsdjl" , this.formDataPropsFromParent);  
  },
};
</script>
<style lang="">
</style>