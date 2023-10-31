<template>
<div>
    <v-row class="bg-color-white">
        <ui-tab @clicked="changeEvent" :data="statusBar" />
        <v-col cols="12" class="pa-0">
            <ui-table v-if="table.show" class="pt-5 list_manage_customer_table" :data="table.data" :dataSchema="table.schema" :tableBtn="table.tableBtn" :checkboxDisabled="table.checkboxEnabled" :clearRows="table.unSelect" :hideCheckBoxAll="true" idField="TGO_FID" @show="show" @selectedRowChanged="selectedRowChanged" />
        </v-col>
    </v-row>

</div>
</template>

<script>
import commentsMixin from "./_mixins/commentsMixin"  
import variables from "./_mixins/variablesComments"
export default {
    mixins: [commentsMixin, variables],

    methods: {
        async changeEvent(data) {
            const result = await this.getTable(data.id);
        },
        async updateTable() {
            const result = await this.getTable();
            console.log(result);
            this.table.data = result.table;
        },
        async getStatusBar() {
            const result = await this.getInit();
            console.log(result)
            this.statusBar = result.Defaults
        }

    },

    mounted() {
        this.getStatusBar()
    }

}
</script>

<style>
.bg-color-white {
    background-color: #fff !important;
}
</style>
