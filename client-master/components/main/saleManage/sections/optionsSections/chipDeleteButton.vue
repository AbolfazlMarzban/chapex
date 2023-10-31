<template>
    <div>
        <SalePageAlertDialog v-if="alertDialog" :title="alertTitle" :comment="alertComment" @cancel="alertDialog = false"
            @submit="doDel" />

        <SaleManageOptionDelete :showDeleteDialog="showDeleteDialog" @hiddenDialog="showDeleteDialog = false"
            :selectedRowData="item" @deleteItemFromTable="del">
        </SaleManageOptionDelete>
        <v-btn @click="showDeleteDialog = true" icon class="mr-2">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </div>
</template>

<script>
import saleManageMixin from '../../_mixins/saleManageMixin'
import saleDataMixin from '../../../sale/_mixins/saleDataMixin'

export default {
    props: ["items", "item", "deleteFromList", "salePage", "state"],
    mixins: [saleManageMixin, saleDataMixin],
    data() {
        return {
            showDeleteDialog: false,
            alertDialog: false,
            alertTitle: '',
            alertComment: ''
        }
    },
    methods: {
        del() {
            if (this.state == 'optionValue') {
                const productOptionValues = this.getOptionValueInProductsOptionValue(this.salePage, this.item.TD_FID)
                if (productOptionValues && productOptionValues.length > 0) {
                    this.alertTitle = 'حذف مقدار خصوصیت'
                    this.alertComment = 'خصوصیتی که قصد حذف آن را دارید، در یک یا چند محصول انتساب داده شده است. آیا ادامه میدهید؟'
                    this.alertDialog = true
                }
                else
                    this.doDel()
            }
        },
        doDel() {
            if (this.deleteFromList) {
                var index = this.items.findIndex(i => i == this.item)
                if (index > -1)
                    this.items.splice(index, 1)

                this.showDeleteDialog = false
            }
            else {
                this.showDeleteDialog = false
                this.item.TD_FDelete = 1
                this.item.TGO_FDelete = 1
            }
        }
    }
}
</script>