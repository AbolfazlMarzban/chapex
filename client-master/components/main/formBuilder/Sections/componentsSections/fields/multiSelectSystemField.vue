<template>
  <div class="components-select">
    <label>{{element.TFF_FLable}}</label>
    <ui-select :multiple="true" :options="{
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
        class="v-select-fbuilder inner-components-input"
        :readonly="!element.TFF_FActive"
            :required="element.TFF_FRequired"
            v-model="element.TFF_FDefault" 
            :append-icon="element.TFF_FIcon" 
            :hint="element.TFF_FToolTip" 
                     :placeholder="element.TFF_FPlaceHolder"
      :deleteForm="deleteForm"
     />
  </div>

</template>

<script>
export default {
  props: ["element", "readonly", "deleteForm"]
}
</script>