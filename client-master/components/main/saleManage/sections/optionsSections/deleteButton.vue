<template>
    <div v-if="item.TD_FDelete == 0 || item.TGO_FDelete == 0 || item.TPIC_FDelete == 0">

        <SalePageAlertDialog v-if="alertDialog" :title="alertTitle" :comment="alertComment" @cancel="alertDialog = false"
            @submit="doDel" />

        <SaleManageOptionDelete :showDeleteDialog="showDeleteDialog" @hiddenDialog="showDeleteDialog = false"
            :selectedRowData="item" @deleteItemFromTable="del">
        </SaleManageOptionDelete>

        <v-btn @click="showDeleteDialog = true" icon color="pink">
            <v-icon>mdi-delete-forever</v-icon>
        </v-btn>
    </div>
    <div v-else>
        <span class="font-italic">حذف شده</span>
        <v-btn @click="recover" icon color="indigo accent-3">
            <v-icon>mdi-arrow-u-left-top-bold</v-icon>
        </v-btn>
    </div>
</template>

<script>
import SalePageAlertDialog from '../../dialog/SalePageAlertDialog.vue'
import saleManageMixin from '../../_mixins/saleManageMixin';
import saleDataMixin from '../../../sale/_mixins/saleDataMixin';

export default {
    props: ["items", "item", "salePage", "state"],
    mixins: [saleManageMixin, saleDataMixin],
    data() {
        return {
            showDeleteDialog: false,
            alertDialog: false,
            alertTitle: '',
            alertComment: ''
        };
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
            else if (this.state == 'option') {
                const productOptions = this.getOptionInProductsOptionValue(this.salePage, this.item.TD_FID)
                if (productOptions && productOptions.length > 0) {
                    this.alertTitle = 'حذف خصوصیت'
                    this.alertComment = 'خصوصیتی که قصد حذف آن را دارید، در یک یا چند محصول انتساب داده شده است. آیا ادامه میدهید؟'
                    this.alertDialog = true
                }
                else
                    this.doDel()
            }
            else if (this.state == 'product') {
                this.doDel()
            }
            else if (this.state == 'picture') {
                this.doDel()
            }

            this.showDeleteDialog = false;
        },
        doDel() {
            this.item.TD_FDelete = 1;
            this.item.TGO_FDelete = 1;
            this.item.TPIC_FDelete = 1;
            this.alertDialog = false
        },
        recover() {
            this.item.TD_FDelete = 0;
            this.item.TGO_FDelete = 0;
            this.item.TPIC_FDelete = 0;
            this.alertDialog = false
        }
    },
    components: { SalePageAlertDialog }
}
</script>