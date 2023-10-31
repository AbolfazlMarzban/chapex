<template>
    <Loading v-if="loading" text="در حال دریافت اطلاعات..." />

    <div v-else>
        <ui-header-manager :title="headerManager.title" :Buttons="headerManager.buttons" :status="headerManager.status"
            @insert="insert" @return="do_return" />

        <v-card color="teal lighten-1" class="mb-6">
            <v-breadcrumbs :items="abolData.breadcrumb"></v-breadcrumbs>
        </v-card>

        <ui-abol-table v-if="abolData" :tableData="abolData" :title="headerManager.title"></ui-abol-table>
    </div>
</template>

<script>
import defaultMixins from "./_mixins/defaultMxin";
import variables from "./_mixins/defaultVariables";
import Loading from "../saleManage/Loading.vue";

export default {
    props: ["TD_FID"],
    mixins: [defaultMixins, variables],
    data() {
        return {
            loading: true,
            abolData: {},
        }
    },

    async mounted() {
        await this.initTable(this.TD_FID)
    },

    methods: {
        async initTable(FID) {
            this.headerManager.status = 'list'
            const result = await this.getTable(FID);
            // console.log('result', result);
            this.abolData = result

            if (FID)
                this.headerManager.status = 'childList'

            this.loading = false
        },

        async insert() {
            if (this.TD_FID)
                this.$router.push(`/admin/defaults/insert/${this.TD_FID}`)
            else
                this.$router.push('/admin/defaults/insert/')
        },

        do_return() {
            if (this.abolData.parentId > 0)
                this.$router.push(`/admin/defaults/${this.abolData.parentId}`)
            else
                this.$router.push('/admin/defaults/')
        },
    },

    watch: {
        async TD_FID(newValue) {
            this.loading = true
            await this.initTable(newValue)
        },
    },

    components: { Loading }
}
</script>