<template>
  <div>
    <p class="px-2 white--text">
      <span>فرم عملیات</span>
      <span class="float-left">
        <v-btn icon color="white" small @click="$emit('showFormMaker')">
          <v-icon small>mdi-eye</v-icon>
        </v-btn>
      </span>
    </p>                            
    <v-row class="pa-4">
      <v-card class=" col-12 md-6 ">

        <div @click="selected=null" class="dropzonepurple" elevation="2" style="min-height:550px" @dragenter.prevent
          @dragover.prevent @drop="dropped">
  
          <v-container>
            <v-row>
              <draggable v-if="formBuilderFields.length>0" class="dragArea list-group" group="fields"
                :list="formBuilderFields" @change="log">
                
                <template v-for="(element,i) in formBuilderFields">           
                  <template v-if="element.TFF_FDelete==0">
                     
                    <FormComponent :element="element" :selected="selected==element" @deleteField="deleteField" :key="i"
                      @copyField="copyField" @select="select(element)" @setting="$emit('setting', element)" :isadmin="isadmin">
                    </FormComponent>       

                  </template>
                </template>
              </draggable>
            </v-row>
          </v-container>


          <v-card-text v-if="formBuilderFields.filter(f=>f.TFF_FDelete==0).length==0" class="text-center my-auto"
            style="padding-top:20%">
            <v-icon>mdi-arrow-all</v-icon>
            <span>فیلدها را بکشید و رها کنید</span>
          </v-card-text>


        </div>

      </v-card>
    </v-row>
  </div>
</template>
<script>
// import { emit } from "process";
import draggable from "vuedraggable";
export default {
  components: { draggable },

  props: ["formBuilderFields", "readonly","isadmin"],
  data() {
    return {
      fields: this.formBuilderFields,
      selected: null
    }
  },
  mounted(){
    // console.log('formFields',this.formBuilderFields)
  },
  methods: {
    dropped() {
      this.$emit("dropped");
    },

    deleteField(element) {
      this.$emit("deleteField", element);
    },

    select(element) {
      this.selected = element
      this.$emit('select', element)
    },

    copyField(element) {
      this.$emit("copyField", element);
    },

    log() {
      this.$emit("set_FOrders");
    }
  }
};
</script>
<style
  lang="scss"
  src="../../../../assets/style/formBuilder/formBuilder.scss"
>

</style>
