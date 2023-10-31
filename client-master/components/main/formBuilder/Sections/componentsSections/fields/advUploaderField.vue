<template>
  <div>
    <label>{{element.TFF_FLable}}</label>
    <!-- <ui-advance-uploader 
        :id="element.TFF_FID" 
        :placeholder="element.TFF_FPlaceHolder" 
        :readonly="element.TFF_FActive == 0"
        :required="element.TFF_FRequired"
        v-model="element.TFF_FDefault" 
        :append-icon="element.TFF_FIcon"             
        :hint="element.TFF_FToolTip"      
        :tempLink="element.TFF_FTempLink"
        :accept="element.TFF_FFileFormat.toString()" 
        :minSize="element.TFF_FSizeMin"
        :maxSize="element.TFF_FSizeMax"
        :colorFormat="element.TFF_FColorFormat"
        :fileHeight="element.TFF_FFileHeight"
        :fileWidth="element.TFF_FFileWidth"
        :minRes="element.TFF_FResMin"
        :maxRes="element.TFF_FResMax"   
        :resUnit="element.TFF_FIcon"
        :route="element.TFF_FComment" 
        @input="sendElement"
        :deleteForm="deleteForm"
    />           -->
      <library-adv-uploader 
      @input="value => sendElement(value)"    
        :id="element.TFF_FID" 
        :placeholder="element.TFF_FPlaceHolder" 
        :readonly="element.TFF_FActive == 0"
        :required="element.TFF_FRequired"
        v-model="element.TFF_FDefault" 
        :append-icon="element.TFF_FIcon"             
        :hint="element.TFF_FToolTip"      
        :tempLink="element.TFF_FTempLink"
        :accept="element.TFF_FFileFormat.toString()" 
        :minSize="element.TFF_FSizeMin"
        :maxSize="element.TFF_FSizeMax"
        :colorFormat="element.TFF_FColorFormat"
        :fileHeight="element.TFF_FFileHeight"
        :fileWidth="element.TFF_FFileWidth"
        :minRes="element.TFF_FResMin"
        :maxRes="element.TFF_FResMax"   
        :resUnit="element.TFF_FIcon"
        :route="element.TFF_FComment" 
        :deleteForm="deleteForm"
 />
  </div>          
</template>

<script>
export default {
    props: ["element", "readonly", "deleteForm"],
    methods:{
        sendElement(value){
            this.$emit('toformField', this.element, value)
        }
    }
}
</script>

<style>

</style>