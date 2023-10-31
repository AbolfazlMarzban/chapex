<template>
    <div class="components-select">
      <label>{{element.TFF_FLable}}</label>
      <ui-select v-if="isadmin" class="select-field inner-components-input" :options="{
        fields: {
          id: 'id',
          name: 'name',
          search: 'name'
        },
        
        count: 7
      }" 
      :items="this.element.items"
          item-text="name"
          item-value="name"
      :readonly="!element.TFF_FActive"
              :required="!element.TFF_FRequired"
              v-model="element.TFF_FDefault" 
              :append-icon="element.TFF_FIcon" 
              :hint="element.TFF_FToolTip" 
                       :placeholder="element.TFF_FPlaceHolder"
                       :deleteForm="deleteForm"
  
       />
  
       <v-combobox v-else-if="this.selectitems.length >0" 
            multiple
            class="userselect"
            :class="{ notempty : element.TFF_FDefault !=''&& element.TFF_FDefault != null }"
            outlined
            dense
            :items="selectitems"
            :readonly="!element.TFF_FActive"
            :required="!element.TFF_FRequired"
            v-model="element.TFF_FDefault" 
            :append-icon="element.TFF_FIcon" 
            :hint="element.TFF_FToolTip" 
            :placeholder="element.TFF_FPlaceHolder"
        ></v-combobox>
      
    </div>
  
  </template>
  
  <script>
  export default {
    props: ["element", "readonly","isadmin", "deleteForm"],
    data(){
      return{
        selectitems:[]
      }
    },
    created(){
      if(this.element){
        for(var i =0; i< this.element.items.length; i++){
          // console.log("select items",this.element.items[i].name);
          this.selectitems[i] = this.element.items[i].name;
          
        }
            
  
      }
    },
    watch:{
      deleteForm(){
        this.element.TFF_FDefault = ""
      }
    }
  }
  </script>
  <style lang="scss" >
  .components-select{
    label{
      color:#000;
    }
  }
   .notempty fieldset {
        border: 2px solid rgba(1, 102, 112, 0.5)!important;
  
  }
  //  .notemptyselect{
            
  //             input{
  //             color: #016670;
  //             font-weight: 600;
  //             }
  //             fieldset{
  //               border: 2px solid rgba(1, 102, 112, 0.5)!important;
  //             }
            
  //         } 
  .select-field{
    margin-top: 20px;
      margin-bottom: 8px;
  }
  .components-select{
    .mx_Select input{
      background: #FFFFFF!important;
      border-radius: 20px!important;
      border: 1px solid #D9D9D9!important;
  
    }
    .mx_Select input:focus{
      background: rgba(1, 102, 112, 0.1)!important;
      border: 1px solid rgba(1, 102, 112, 0.2)!important;
      border-radius: 20px!important;
    }
    .multiSelect{
      display: none  !important;
    }
    .v-icon {
      z-index: 2!important;
      width: 8px!important;
    }
    .userselect{
      margin-top: 17px;
      input{
            background: #fff!important;
            border: none!important;
            color: #016670;
            font-weight: 600;
      }
      fieldset{
        border-radius: 20px!important;
        background: #fff!important;
      }
      fieldset:focus{
        border: 1px solid rgba(1, 102, 112, 0.2)!important;
        background: rgba(1, 102, 112, 0.1)!important;
         color: #016670;
              font-weight: 600;
        input{
          border: none;
          color: #016670;
              font-weight: 600;
        }
      }
    }
  }
  
  </style>
<!-- <template>
    <div class="components-select">
        <label>{{element.TFF_FLable}}</label>
        <v-select  multiple
        :items="element.items"
        item-text="name"
        item-value="name"
        class="v-select-fbuilder inner-components-input"
        :readonly="element.TFF_FActive"
            :required="!element.TFF_FRequired"
            v-model="element.TFF_FDefault" 
            :append-icon="element.TFF_FIcon" 
            :hint="element.TFF_FToolTip" 
        :placeholder="element.TFF_FPlaceHolder"
        ></v-select>
    </div>
</template>

<script>
export default {
    props: ["element", "readonly", "deleteForm"],
    data(){
        return{
            itm:[]
        }
    },
    mounted(){
        // console.log("my test",this.element.items.name);
    },
    methods:{
        test(){
            // console.log(this.element.items[0].name)
        }
    },
    watch:{
        deleteForm(){
            this.element.TFF_FDefault = ""
        }
    }
}
</script> -->