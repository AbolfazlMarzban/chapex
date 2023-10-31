<template>
<div>
    <ui-tab @clicked="changeEvent" :record="table.data.length" :data="statusBar" :default="26001"/> 

        <Dialog v-if="showDialog" @updateTable="updateChangedTable" :dataDialog="dialogData" @closeDialog="showDialog = false" />

       <ui-table
      v-if="table.show"
      class="pt-5 list_manage_customer_table"
      :data="table.data"
      :dataSchema="table.schema"
      :tableBtn="table.tableBtn"
      :checkboxDisabled="table.checkboxEnabled"
      :clearRows="table.unSelect"
      :hideCheckBoxAll="true"
      idField="TGO_FID"
      @show="show"
      @selectedRowChanged="selectedRowChanged"
    />
</div>
</template>
<script>

    import faqMixin from  "./_mixins/faqMixins"
    import variables from "./_mixins/variablesFaq"
    export default {
        mixins : [faqMixin , variables] ,
        data() {
            return {
                showDialog : false , 
                dialogData : '' , 
                currentTable : ''
            }
        },

        methods: {

            async updateChangedTable(){
                 const result = await this.getTable(this.currentTable)
                this.table.data = result.table
            } , 
            
            async changeEvent(data){
                console.log(data.TD_FID);
                const result = await this.getTable(data.TD_FID)
                this.table.data = result.table
                this.currentTable = data.TD_FID;
            },

            async updateTable(){
                const result = await this.getTable();
                console.log(result)
                this.table.data = result.table;
            },

            async getStatusBar(){
                const result = await this.getInit()
                console.log("this we want"  ,  result)
                this.statusBar = result.defaults[260]
                console.log("1");
               this.updateTable()
            } , 
            show(e){
                // console.log(e);
                this.dialogData = e;
                this.showDialog = true
            }

        },

        mounted(){
            this.getStatusBar()
          }
        
    }
</script>

<style lang="" src="../../../assets/style/Ul/Tab.scss">  
    
</style>



