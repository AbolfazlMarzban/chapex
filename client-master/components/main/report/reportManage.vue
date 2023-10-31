<template>
    <div>
        <ui-header-manager-simple :title="title" />

        <v-row v-if="table.data" class="bg-color-white">
            <ui-tab @clicked="changeEvent" :data="statusBar" :record="table.data.length" :default="26001" />
            <v-col v-if="showReportFilter" cols="12" class="bg-color-white">
                <v-row>
                    <v-col cols="12" xl="3" lg="3" md="12" sm="12" xs="12"
                        class="d-flex flex-column flex-lg-row align-end justify-center">
                        <span class="fns-12 width-span-label margin-label">نوع کالا / خدمات</span>

                        <ui-select class="width-select" :readonly="readonly" :options="{
                            fields: {
                                id: 'TGO_FID',
                                name: 'TGO_FName',
                                search: 'TGO_FName',
                            },
                            label: ' ',
                            count: 10,
                        }" />
                    </v-col>
                    <v-col cols="12" xl="3" lg="3" md="12" sm="12" xs="12"
                        class="d-flex flex-column flex-lg-row align-end justify-center">
                        <span class="fns-12 width-span-label margin-label">گروه کالا / خدمات</span>
                        <ui-select class="width-select" :readonly="readonly" :options="{
                            fields: {
                                id: 'TGO_FID',
                                name: 'TGO_FName',
                                search: 'TGO_FName',
                            },
                            label: '  ',
                            count: 10,
                        }" />
                    </v-col>
                    <v-col cols="12" xl="3" lg="3" md="12" sm="12" xs="12"
                        class="d-flex flex-column flex-lg-row align-end justify-center">
                        <span class="fns-12 width-span-label margin-label">نام کالا / خدمات</span>
                        <ui-select class="width-select" :readonly="readonly" :options="{
                            fields: {
                                id: 'TGO_FID',
                                name: 'TGO_FName',
                                search: 'TGO_FName',
                            },
                            label: ' ',
                            count: 10,
                        }" :items="data.table" v-model="data.table.TGO_FID" />
                    </v-col>
                    <v-col cols="12" xl="2" lg="2" md="12" sm="12" xs="12"
                        class="d-flex flex-column flex-lg-row align-end justify-center">
                        <span class="fns-12 margin-label width-span-label">کد کالا / خدمات</span>
                        <ui-select class="width-select" :readonly="readonly" :options="{
                            fields: {
                                id: 'TF_FID',
                                name: 'TF_FName',
                                search: 'TF_FName',
                            },
                            label: '  ',
                            count: 10,
                        }" />
                    </v-col>
                    <v-col @click="filterGoodsReport" cols="12" xl="1" lg="1" md="12" sm="12" xs="12"
                        class="d-flex flex-column flex-lg-row align-center pb-0">
                        <span class="btn-order w-100">گزارش</span>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" class="pa-0">
                <ui-table :tableBtn="table.tableBtn" v-if="tableGotSchema" :moneyFields="table.moneyField"
                    :customField="table.customField" :data="table.data" :class="['pt-5', toggleTableClass]"
                    @showChart="chartDialog" :dataSchema="mainTableSchema" :checkboxDisabled="table.checkboxEnabled"
                    :clearRows="table.unSelect" :hideCheckBoxAll="true" idField="TGB_FID">
                </ui-table>
            </v-col>
        </v-row>

        <v-dialog persistent v-model="chartDialogShow" width="100%" class="chart_dialog_style">
            <v-card class="chart_dialog_style">
                <v-row class="mx-0 image_table_dialog_row">
                    <span>نمایش تغییرات قیمت</span>

                    <v-icon class="image_table_dialog_btn mt-4" @click="chartDialogShow = false">
                        mdi-close
                    </v-icon>
                </v-row>
                <v-card-text class="mt-5">
                    <!-- <div class="image_table_dialog_text">

          </div> -->
                    <ui-select :readonly="readonly" :options="{
                        fields: {
                            id: 'F_Month_value',
                            name: 'F_Name',
                            search: 'F_Name',
                        },
                        label: ' بازه زمانی تغییرات ',
                        count: 10,
                    }" v-model="chartMonthSelect" @change="chartSelectMonthChange" :items="chartMonthItems" />
                    <!-- <LazyChart /> -->
                    <LazyChart class="mt-5" :chartData="chartData" v-if="loaded" />

                </v-card-text>

                <v-card-actions>
                </v-card-actions>
            </v-card>

        </v-dialog>

    </div>
</template>

<script>
import "../../../assets/style/tableHeaders/tableHeaders.scss";

import reportVariables from "./_mixins/reportVariables";
import reportMixins from "./_mixins/reportMixins";
export default {
    mixins: [reportVariables, reportMixins],
    data() {
        return {
            showReportFilter: false,
            tableGotSchema: false,
            mainTableSchema: {},
            chartDialogShow: false,
            toggleTableClass: "optionsInProductsTableHeaderts",

            title: "گزارش کاربرد خصوصیت ها",
            loaded: false
        };
    },

    methods: {
        async chartSelectMonthChange() {
            if (this.chartMonthSelect == 1) {
                await this.getChartData(
                    this.tableOneRowData.TGPC_FID_Goods,
                    this.chartMonthSelect,
                    this.tableOneRowData.TGPC_FID_TypePrice
                )
            } else if (this.chartMonthSelect == 2) {
                await this.getChartData(
                    this.tableOneRowData.TGPC_FID_Goods,
                    this.chartMonthSelect,
                    this.tableOneRowData.TGPC_FID_TypePrice
                )
            } else if (this.chartMonthSelect == 3) {
                await this.getChartData(
                    this.tableOneRowData.TGPC_FID_Goods,
                    this.chartMonthSelect,
                    this.tableOneRowData.TGPC_FID_TypePrice
                )
            } else if (this.chartMonthSelect == 6) {
                await this.getChartData(
                    this.tableOneRowData.TGPC_FID_Goods,
                    this.chartMonthSelect,
                    this.tableOneRowData.TGPC_FID_TypePrice
                )
            } else if (this.chartMonthSelect == 12) {
                await this.getChartData(
                    this.tableOneRowData.TGPC_FID_Goods,
                    this.chartMonthSelect,
                    this.tableOneRowData.TGPC_FID_TypePrice
                )
            } else if (this.chartMonthSelect == 18) {
                await this.getChartData(
                    this.tableOneRowData.TGPC_FID_Goods,
                    this.chartMonthSelect,
                    this.tableOneRowData.TGPC_FID_TypePrice
                )
            }
        },
        async changeEvent(data) {
            this.getReports(data);
        },

        async getAllGoodsToFilet() {
            try {
                const result = await this.getGoods();
                this.data.table = result.data.table;
            } catch (error) {
                console.log(error);
            }
        },

        async filterGoodsReport() {
            try {
                const result = await this.get("goodsInProducts", this.data.table.TGO_FID);
                if (result) {
                    this.table.data = result.data.table;
                }
            } catch (error) {
                console.log(error);
            }
        },

        async getChartData(goodsRowId, timeRange, pricetype) {
            try {
                const result = await this.getChart(goodsRowId, timeRange, pricetype);
                if (result) {
                    this.loaded = false
                    setTimeout(() => {
                        this.chartData = result.data;
                        this.loaded = true
                        // console.log(this.chartData);
                    }, 500);

                }
            } catch (error) {
                console.log(error);
            }
        },

        async chartDialog(row) {
            this.tableOneRowData = row;
            await this.getChartData(
                this.tableOneRowData.TGPC_FID_Goods,
                3,
                this.tableOneRowData.TGPC_FID_TypePrice
            )
            this.chartDialogShow = true;
        },

        async getReports(tabInfo, mode) {
            this.tableGotSchema = false;
            this.mainTableSchema = {};
            if (tabInfo.TD_FID == 0 || mode === "init") {
                this.mainTableSchema = await this.table.optionsInProductsSchema;
                this.title = "گزارش کاربرد خصوصیت ها";
                this.toggleTableClass = "optionsInProductsTableHeaders"

                this.showReportFilter = false;
                const result = await this.get("optionsInProducts");
                this.table.data = result.data.table;
                this.tableGotSchema = true;
            } else if (tabInfo.TD_FID == 1) {
                this.mainTableSchema = await this.table.goodsInProductsSchema;
                this.title = "گزارش کاربرد کالا در محصولات";
                this.toggleTableClass = "goodsInProductsTableHeaders"

                this.tableGotSchema = true;
                this.showReportFilter = true;
                this.table.data = [];
                await this.getAllGoodsToFilet();
            } else if (tabInfo.TD_FID == 2) {
                this.mainTableSchema = await this.table.productsInSalePagesSchema;
                this.title = "گزارش کاربرد محصولات در صفحات فروش";
                this.toggleTableClass = "productsInSalePagesTableHeaders"

                this.showReportFilter = false;
                const result = await this.get("productsInSalePages");
                this.table.data = result.data.table;
                this.tableGotSchema = true;
            } else if (tabInfo.TD_FID == 3) {
                this.mainTableSchema = await this.table.SaleGoodsSchema;
                this.title = "گزارش فروش کالا";
                this.toggleTableClass = "SaleGoodsTableHeaders"

                this.tableGotSchema = true;
                this.showReportFilter = true;
                this.table.data = [];
                await this.getAllGoodsToFilet();
            } else if (tabInfo.TD_FID == 4) {
                this.mainTableSchema = await this.table.SaleProductSchema;
                this.title = "گزارش فروش محصولات";
                this.toggleTableClass = "SaleGoodsTableHeaders"

                this.showReportFilter = false;
                const result = await this.get("SaleProduct");
                this.table.data = result.data.table;
                this.tableGotSchema = true;
            } else if (tabInfo.TD_FID == 5) {
                this.mainTableSchema = await this.table.reportGoodsChangePrice;
                this.title = "گزارش تغییرات قیمت کالاها";
                this.toggleTableClass = "ppriceChangesTableHeaders"

                this.showReportFilter = false;
                const result = await this.get("priceChanges");
                this.table.data = result.data.table;
                this.tableGotSchema = true;
            }
            // this.title = statusbar.TD_FName
        },
    },
    mounted() {
        this.mainTableSchema = {};
        this.tableGotSchema = false;
        this.mainTableSchema = this.table.optionsInProductsSchema;
        this.tableGotSchema = true;

        this.getReports(0, "init");
    },
};
</script>

<style lang="scss" src="../../../assets/style/Ul/Tab.scss"></style>
