<template>
  <div>
    <v-row class="justify-center">
        <v-col cols="12">
            <div class="d-flex">
                <v-btn color="#016670" class="mb-3" dark @click="showMore = ! showMore">
                <span v-if="showMore">اطلاعات کمتر</span>
                <span v-else> اطلاعات بیشتر</span>
            </v-btn>
            <download-excel :data="json_data" worksheet="My Worksheet" :name="exportName">

            <v-btn class="mb-3 mr-3"  depressed @click="exportTable">
                    خروجی اکسل 
                <v-icon color="#016670" class="mr-1" style="font-size: 20px;">mdi-file-excel</v-icon>
            </v-btn>
            </download-excel>
            </div>
           

            <v-data-table  
                :items="data"
                :headers="headers"
                hide-default-footer
                class="mb-10"
            >
            <template v-slot:item.number="{item}">
                {{ data.indexOf(item) + 1 }}
            </template>
            <template v-slot:item.goodUse="{item}">
                {{ item.TOP_Np + item.TOP_Nw }}
            </template>
            <template v-slot:item.wholeCount="{item}">
                {{ item.TOP_TGPV_FRepet*(item.TOP_Np + item.TOP_Nw) }}
            </template>
            <template v-slot:item.finalPrice="{item}">
                {{ numberWithCommas(calc_price(item)) }}
            </template>
            <template v-slot:item.TOP_FSalePriceMax="{item}">
                {{ numberWithCommas(item.TOP_FSalePriceMax) }}
            </template>
        </v-data-table>
        </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
props: [ "data", "title" ],
data(){
    return{
        simpleheaders:[
            {
                text: 'عنوان',
                value: 'number',
                sortable: true,
                align: 'center'
            },
            {
                text: 'مشخصات',
                value: 'TOP_FID_OptionName',
                sortable: true,
                align: 'center'
            },
            {
                text: 'شرح',
                value: 'TOP_FID_OptionValueName',
                sortable: true,
                align: 'center'
            },
            {
                text: 'کالای مرتبط',
                value: 'TOP_FID_ProductName',
                sortable: true,
                align: 'center'
            },
            {
                text: 'تعداد مصرف کالا',
                value: 'goodUse',
                sortable: true,
                align: 'center'
            },
            {
                text: 'ضریب تکرار',
                value: 'TOP_TGPV_FRepet',
                sortable: true,
                align: 'center'
            },
            {
                text: 'تعداد کل',
                value: 'wholeCount',
                sortable: true,
                align: 'center'
            },
            {
                text: 'قیمت واحد کالا',
                value: 'TOP_FSalePriceMax',
                sortable: true,
                align: 'center'
            },
            {
                text: 'مبلغ کلیشه',
                value: 'TOP_FSalePriceFix',
                sortable: true,
                align: 'center'
            },
            {
                text: 'مبلغ فرم بندی',
                value: 'TOP_FBuyPercent',
                sortable: true,
                align: 'center'
            },
            {
                text: 'مبلغ کل',
                value: 'finalPrice',
                sortable: true,
                align: 'center'
            }
        ],
        advheaders:[
        {
                text: 'عنوان',
                value: 'number',
                sortable: true,
                align: 'center'
            },
            {
                text: 'مشخصات',
                value: 'TOP_FID_OptionName',
                sortable: true,
                align: 'center'
            },
            {
                text: 'شرح',
                value: 'TOP_FID_OptionValueName',
                sortable: true,
                align: 'center'
            },
            {
                text: 'کالای مرتبط',
                value: 'TOP_FID_ProductName',
                sortable: true,
                align: 'center'
            },
            {
                text: 'حداقل کالا',
                value: 'TOP_FSalePriceMin',
                sortable: true,
                align: 'center'
            },
            {
                text: 'ضریب تعداد',
                value: 'TOP_TGPV_FCount',
                sortable: true,
                align: 'center'
            },
            {
                text: 'تعداد مصرف کالا',
                value: 'TOP_Np',
                sortable: true,
                align: 'center'
            },
            {
                text: 'تعداد ضایعات',
                value: 'TOP_TGPV_FWaste',
                sortable: true,
                align: 'center'
            },
            {
                text: 'تعداد مصرف کل کالا',
                value: 'goodUse',
                sortable: true,
                align: 'center'
            },
            {
                text: 'ضریب تکرار',
                value: 'TOP_TGPV_FRepet',
                sortable: true,
                align: 'center'
            },
            {
                text: 'تعداد کل',
                value: 'wholeCount',
                sortable: true,
                align: 'center'
            },
            {
                text: 'ضریب قیمت',
                value: 'TOP_TGPV_FPrice',
                sortable: true,
                align: 'center'
            },
            {
                text: 'قیمت واحد کالا',
                value: 'TOP_FSalePriceMax',
                sortable: true,
                align: 'center'
            },
            {
                text: 'قیمت واحد کالا در محصول',
                value: 'TOP_Pu',
                sortable: true,
                align: 'center'
            },
            {
                text: 'مبلغ کلیشه',
                value: 'TOP_FSalePriceFix',
                sortable: true,
                align: 'center'
            },
            {
                text: 'مبلغ فرم بندی',
                value: 'TOP_FBuyPercent',
                sortable: true,
                align: 'center'
            },
            {
                text: 'مبلغ کل',
                value: 'finalPrice',
                sortable: true,
                align: 'center'
            }
        ],
        showMore: false,
        exportName: '',
        json_data: [],
        date: ''
    }
},
computed:{
    headers(){
        if(!this.showMore){
            return this.simpleheaders
        } else{
            return this.advheaders
        }
    }
},
mounted(){
    var date = new Date()
  var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }
  // console.log('today',date.toLocaleDateString("fa-IR", options))
  this.date = date.toLocaleDateString("fa-IR", options)
  if(this.title){
    this.exportName = `${this.title} -- ${this.date} `
  }
},
methods:{
    numberWithCommas(e) {
        if(e){  
            return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    exportTable(){
        var excelJson = []
        this.data.map(dat => {
            var obj = {}
            for(var i=0; i < this.headers.length; i++){
                var ob = {}
                if(this.headers[i].value == 'number'){
                    ob = {[this.headers[i].text] : [this.data.indexOf(dat) + 1]}
                } else if(this.headers[i].value == 'finalPrice'){
                    ob = {[this.headers[i].text] : [this.calc_price(dat)]}
                } else if(this.headers[i].value == 'goodUse'){
                    ob = {[this.headers[i].text]: [dat.TOP_Np + dat.TOP_Nw]}
                } else if(this.headers[i].value == "wholeCount"){
                    ob = {[this.headers[i].text] : [dat.TOP_TGPV_FRepet*(dat.TOP_Np + dat.TOP_Nw)]}
                }
                else {
                    ob = {[this.headers[i].text] : dat[this.headers[i].value]}
                }
                    obj = Object.assign(ob, obj)
                }
                excelJson.push(obj)
            })
            this.json_data = excelJson
    },
    calc_price(item) {
                var FCount = item.TOP_TGPV_FCount ? item.TOP_TGPV_FCount : 1;
                var Np = item.TOP_Np

                // if (item.TOP_FSalePriceMin > Np) {
                //     if (item.TOP_FSalePriceMin)
                //         Np = relatedGood.TGO_FSaleMin;
                // }

                var FWaste = item.TOP_TGPV_FWaste ? item.TOP_TGPV_FWaste : 0
                var FPrice = item.TOP_TGPV_FPrice ? item.TOP_TGPV_FPrice : 1

                var FSalePriceMax = item.TOP_FSalePriceMax
                    ? item.TOP_FSalePriceMax
                    : 0;
                var FSalePriceFix = item.TOP_FSalePriceFix
                    ? item.TOP_FSalePriceFix
                    : 0;
                var FBuyPercent = item.TOP_FBuyPercent
                    ? item.TOP_FBuyPercent
                    : 0;
                var FRepet = item.TOP_TGPV_FRepet ? item.TOP_TGPV_FRepet : 1;

                var Pu = FSalePriceMax * FPrice
                var Nw = FWaste * FCount

                var res = Np * Pu;
                res += Nw * Pu;
                res += FSalePriceFix + FBuyPercent;

                res *= FRepet;

                return res
            },
}
}
</script>

<style>

</style>