<template>
  <div>
    <ui-header-manager :title="headerManager.title" :Buttons="headerManager.buttons" :status="headerManager.status"
      @submit="submit" @cancel="cancel" @json="json" @delete="deleted" @undo="undo" @redo="redo" />

    <FormBuilderCancel @cancelProcessDialog="cancelProcessDialog" @hiddenDialog="doHiddenDialog"
      :showDialog="showDialog" /> 
                                                 
    <FormBuilderDelete @deleteItemFromTable="deleteItemFromTable" @hiddenDialog="doHiddenDialog"
      :showDeleteDialog="showDeleteDialog" :selected="[data]" />      

    <FormMakerInFormBuilder :showFormMaker="showFormMaker" @hidePreview="showFormMaker=false"
      :formBuilderData="{ data:data, fields: fields }" :readonly="readonly" />


    <v-expansion-panels v-model="accordianValues" multiple>
      <FormInfo :data="data" :lastsaved_data="lastsaved_data" :readonly="readonly"  @deleteFormPic="data.TF_FPic = ''" :FID="FID" />
      <!-- <FormMemo :data="data" :lastsaved_data="lastsaved_data" :readonly="readonly" />   -->
      <!-- <FormWorkspace :fieldsSettingShow="fieldsSettingShow" :selectedField="selectedField" :palleteShow="palleteShow" :fields="fields" :readonly="readonly" /> -->

      <v-expansion-panel class="togglebox">
        <accordian-title title="طراحی صفحه" :unsaved="sections_changed()" />   

        <v-expansion-panel-content>
          <v-row class="col-12 ma-0 pa-0 mb-15">                  

            <v-col cols="4" md="3" class="draggable_fields_list">
              <Transition name="bounce">

                <FieldSetting style="top:auto" v-if="fieldsSettingShow" :element="selectedField" :form="data"
                  @FOrderChanged="FOrderChanged" @hideSetting="fieldsSettingShow=false; palleteShow=true ">
                </FieldSetting>

                <FormButtons :fields="defaultFields" v-else-if="palleteShow" @addField="addField" @drag="drag($event)" />

              </Transition>
            </v-col>

            <v-col cols="8" md="9" class="draggable_background">
              <FormComponents @dropped="dropped" @set_FOrders="set_FOrders" @deleteField="deleteField"
                @copyField="copyField" @showFormMaker="showFormMaker = true" @select="select"
                @setting="fieldsSettingShow=true" :formBuilderFields="fields" :readonly="readonly" :isadmin="isadmin" />
            </v-col>

          </v-row>
        </v-expansion-panel-content>


        
      </v-expansion-panel>
      
      <v-expansion-panel class="togglebox">
        <accordian-title title="عملیات" :unsaved="sections_changed()" /> 

        <v-expansion-panel-content>
          <v-row class="col-12 ma-0 pa-0 mb-15">

            <v-col cols="12" md="12">
                <set-activity :data="data" @setFormActivity="value => setFormActivity(value)"
                    @setFormText="value => data.TF_FCaption = value"
                    @setSignature="value => setSignature(value)"
                    @setSMSActivity="value => smsShow = value"
                    @setEmailActivity="value => emailShow = value"
                  ></set-activity>
            </v-col>

            <v-col cols="6" md="6" class="draggable_fields_list" v-if="smsShow">
              <Transition name="bounce">

                <send-sms  :listSmsNumbers="listSmsNumbers"></send-sms>

              </Transition>
            </v-col>

            <v-col cols="6" md="6" class="draggable_background" v-if="emailShow">
            <Transition name="bounce">

                <send-email  :listEmails="listEmails"></send-email>

            </Transition>
            </v-col>

          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import formBuilderMixins from "./_mixins/formBuilderMixin";
import variable from "./_mixins/variablesFormBuilder";
export default {
  mixins: [formBuilderMixins, variable],
  props: ["FID"],
  data() {
    return {
      data: {},
      lastsaved_data: {},
      dataHistory: [],
      historyIndex: 0,
      historyLimit: 100,
      historyDelay: false,
      fromUndoRedo: false,
      fields: [],
      fieldsSettingShow: false,
      palleteShow: true,
      selectedField: null,
      getfieldData: this.getShowRowFields,
      showDialog: false,
      draggedItem: null,
      readonly: false,
      jsonDialog: false,
      showDeleteDialog: false,
      showFormMaker: false,
      accordianValues: [0],
      isadmin:true,
      listSmsNumbers: {
        listSmsNumbersPhones: [],
        listSmsNumbersMessage: '',
      },
      listEmails: {
        listEmailsAddress: [],
        listEmailsMessage: '',
      },
      defaultFields: [],
      smsShow: true,
      emailShow: true,
    };
  },
  async mounted() {
    this.$vuetify.rtl = true;
    if (this.FID)
      await this.editMode();
    else
      await this.insertMode();
  },
  methods: {
    setSignature(value){
      if(value){
        this.data.TF_FCenter = 1
      } else {
        this.data.TF_FCenter = 0
      }
    },
    setFormActivity(value){
      if(value){
        this.data.TF_FActive = 1
      } else {
        this.data.TF_FActive = 0
      }
    },
    async insertMode() {
      this.headerManager.status = "insert";
      this.readonly = false;
      const result = await this.getInit();
      console.log("insertFormBuilder", result);
      this.data = result.form;
      this.defaultFields = result.fields.fields
      console.log(result);
      // console.log("insertForm", this.data);
    },
    async editMode() {
      this.headerManager.status = "edit";
      this.readonly = false;  
      const result = await this.getShow(this.FID);
      console.log('edit result', result)
      if (result.form) {
        this.data = result.form;
        this.fields = result.formFields;
        this.defaultFields = result.fields.fields
        this.appendHistory();
        // console.log('default Fields', this.defaultFields)
        this.form.data = this.data;
        this.form.data.fields = this.fields;
        this.lastsaved_data = JSON.parse(JSON.stringify(this.form.data));
      }
      else {
        // this.$nuxt.$options.router.push({ path: "/admin/formBuilder/" });
      }
    },
    FOrderChanged(element, oldVal) {
      // console.log(oldVal, '->', element.TFF_FOrder);
      if (this.fields) {
        this.fields.splice(oldVal, 1);
        this.fields.splice(element.TFF_FOrder, 0, element);
        this.set_FOrders();
      }
    },
    set_FOrders() {
      if (this.fields) {
        var counter = 0;
        for (var i = 0; i <= this.fields.length - 1; i++) {
          if (this.fields[i]) {
            if (this.fields[i].TFF_FDelete == 0) {
              this.fields[i].TFF_FOrder = counter;
              counter++;
            }
          }
        }
      }
    },
    async submit() {
      this.form.data = this.data;
      this.form.data.fields = this.fields;
      // console.log('formdata', this.form.data)
      const result = await this.SubmitFormBuilder(this.headerManager.status, this.form.data);
      if (result) { 
        // console.log(result);
        this.lastsaved_data = JSON.parse(JSON.stringify(this.form.data));

        if (this.headerManager.status == "insert"){
          this.$nuxt.$options.router.push({ path: `/admin/formBuilder/manage/${result.otherData.ReturnFID}` });
        } else {
          location.reload()
        }
      }
    },
    select(element) {
      this.fieldsSettingShow = false;
      this.palleteShow = false;
      this.selectedField = element;
      setTimeout(() => {
        this.fieldsSettingShow = true;
      }, 200);
    },
    cancel() {
      if (this.headerManager.status == "edit") {
        this.showDialog = true;
      }
      else if (this.headerManager.status == "insert") {
        this.showDialog = true;
      }
      else {
        this.$nuxt.$options.router.push({ path: "/admin/formBuilder/" });
      }
    },
    cancelProcessDialog() {
      this.$nuxt.$options.router.push({ path: "/admin/formBuilder/" });
    },
    doHiddenDialog() {
      this.showDialog = false;
      this.showDeleteDialog = false;
    },
    deleted() {
      this.showDeleteDialog = true;
    },
    copyField(element) {
      var obj = JSON.parse(JSON.stringify(element));
      // console.log('obj', obj)
      obj.TFF_FLable = "کپی_" + obj.TFF_FLable;
      obj.TFF_FID = 0;
      obj.TFF_FOrder++;
      obj.isnew = true;
      if (element.items) {
        obj.items = [];
        element.items.forEach(item => {
          obj.items.push({
            isnew: true,
            title: item.title,
            name: item.name,
            value: item.value,
            TFF_FDelete: 0
          });
        });
      }
      const deletedCount = this.fields.filter(f => f.TFF_FDelete == 1 && f.TFF_FOrder < obj.TFF_FOrder);
      this.fields.splice(obj.TFF_FOrder + deletedCount.length, 0, obj);
      this.set_FOrders();
    },
    async deleteItemFromTable() {
      const result = await this.SubmitFormBuilder("delete", this.data.TF_FID);
      if (result) {
        this.$nuxt.$options.router.push({ path: "/admin/formBuilder/" });
      }
    },
    //مربوط به درگ اند دراپ
    drag(item) {
      console.log('drag', item)
      this.draggedItem = item;
    },
    dropped(){
      if(this.draggedItem){
        this.addField(this.draggedItem)
      }
    },
    deleteField(element) {
      var index = this.fields.findIndex(el => el == element);
      if (index > -1) {
        this.fields[index].TFF_FDelete = 1;
        this.selectedField = null;
        this.fieldsSettingShow = false;
        this.palleteShow = true
        // this.fieldsSettingShow = false
        this.set_FOrders();
      }
    },
    closeSetting() {
      this.showFieldList = !this.showFieldList;
    },
    addField(item){
      this.fields.push({
          TFF_FLable: item.TD_FName,
          TFF_FType: item.TD_FComment,
          TFF_FComment: "",
          TFF_FFileFormat: "",
          TFF_FColorFormat: "",
          TFF_FTempLink: "",
          TFF_FResMin: 0,
          TFF_FResMax: 0,
          TFF_FSizeMin: 0,
          TFF_FSizeMax: 0,
          TFF_FileWidth: 0,
          TFF_FFileHeight: 0,
          TFF_FPlaceHolder: "",
          TFF_FOrder: this.fields.length ? (this.fields.length) : 0,
          TFF_FIcon: "",
          TFF_FToolTip: "",
          TFF_FLenMin: "",
          TFF_FLenMax: "",
          TFF_FActive: true,
          TFF_FRequired: false,
          TFF_FToolTip: "",
          TFF_FID: 0,
          TFF_FColumn: 12,
          TFF_FID_TypeField: item.TD_FID,
          TFF_FDelete: 0,
          isnew: true,
          values: {
            checked: "",
            unChecked: ""
          },
          items: [],
      })
    },
    sections_changed() {
      var local_data = JSON.parse(JSON.stringify(this.fields))
      var obj1 = {
        fields: local_data,
      }


      var local_lastsaved_data = JSON.parse(JSON.stringify(this.lastsaved_data))
      var obj2 = {
        fields: local_lastsaved_data.fields,
      }

      return !(JSON.stringify(obj1) === JSON.stringify(obj2))
    },

    appendHistory() {
      // console.log('appendHistory', this.data);
      this.setUndoRedo();
      if (this.fromUndoRedo) {
        this.fromUndoRedo = false;
        return;
      }
      if (this.historyDelay)
        return;
      this.historyDelay = true;
      if (this.historyIndex < this.dataHistory.length) {
        this.dataHistory = this.dataHistory.slice(0, this.historyIndex);
      }
      this.form.data = this.data;
      this.form.data.fields = this.fields;
      this.dataHistory.push(JSON.parse(JSON.stringify(this.form.data)));
      this.historyIndex++;
      if (this.dataHistory.length > this.historyLimit) {
        // console.log('before', this.dataHistory);
        this.dataHistory = this.dataHistory.slice(this.dataHistory.length - this.historyLimit, this.dataHistory.length);
        this.historyIndex = this.dataHistory.length;
        // console.log('after', this.dataHistory);
      }
      // console.log(this.dataHistory);
      this.historyDelay = false;
    },
    setUndoRedo() {
      if (this.dataHistory.length > 1 && this.historyIndex > 1) {
        this.headerManager.buttons.undo.enable = true;
      }
      else
        this.headerManager.buttons.undo.enable = false;
      if (this.historyIndex < this.dataHistory.length)
        this.headerManager.buttons.redo.enable = true;
      else
        this.headerManager.buttons.redo.enable = false;
    },
    undo() {
      if (this.dataHistory.length > 1 && this.historyIndex > 1) {
        this.fromUndoRedo = true;
        this.historyIndex--;
        this.data = JSON.parse(JSON.stringify(this.dataHistory[this.historyIndex - 1]));
        this.fields = this.data.fields;
        // console.log('undo', this.data);
      }
    },
    redo() {
      if (this.dataHistory.length > 1 &&
        this.historyIndex < this.dataHistory.length) {
        this.fromUndoRedo = true;
        this.historyIndex++;
        this.data = JSON.parse(JSON.stringify(this.dataHistory[this.historyIndex - 1]));
        this.fields = this.data.fields;
      }
    },
    json() {
      this.jsonDialog = true;
      this.form.data = this.data;
      this.form.data.fields = this.fields;
      console.log("json");
      console.log("this.form.data:");
      console.log(JSON.parse(JSON.stringify(this.form.data)));
    }
  },
  watch: {
    data: {
      handler(val, oldVal) {
        this.appendHistory();
      },
      deep: true
    }
  },
  // components: { FormMemo, FormActions, ActionButtons, Actioncomponents, SendSMS, SendEmail, FieldSettingActions }
};
</script>,
    
<style
  lang="scss"
  src="../../../assets/style/formBuilder/formBuilder.scss"
>

</style>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.3s;
}

.bounce-leave-active {
  animation: bounce-in 0.2s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>
