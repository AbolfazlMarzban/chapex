<template>
  <v-data-table
    :headers="headers"
    :items="setData()"
    class="goodsSecondTable"
    :sort-by="'TGO_FName'"
    loading-text="در حال بارگذاری اطلاعات"
    show-select
    :search="search"
    v-model="selected"
    item-key="TGO_FName"
  >
    <template v-slot:top>
      <v-row>
        <v-col cols="12"> </v-col>
      </v-row>
      <advanced-search
        v-if="showSearchBox"
        class="mb-10"
        @advSearch="advSearch"
      ></advanced-search>
    </template>

    <template v-slot:item.TGO_FName="{ item }">
      <NuxtLink
        style="cursor: pointer; color: #016670"
        class="pa-1 px-2 font-weight-black"
        :to="`/goods/manage/${item.TGO_FID}`"
      >
        {{ item.TGO_FName }}
      </NuxtLink>
    </template>
    <template v-slot:item.TGO_FID_Category1="{ item }">
      <span>
        {{ showGroup(item.TGO_FID_Category1) }}
      </span>
    </template>
    <template v-slot:item.price="{ item }">
      <v-icon
        color="#016670"
        style="font-size: 20px"
        class="pa-3"
        @click="$emit('priceDialog', item)"
        >mdi-file-document
      </v-icon>
    </template>

    <template v-slot:item.TGO_FStock="{ item }">
      <v-icon
        color="#016670"
        style="font-size: 20px"
        class="pa-3"
        @click="$emit('stockDialog', item)"
        >mdi-file-document
      </v-icon>
    </template>

    <template v-slot:item.TGO_FComment="{ item }">
      <v-icon
        color="#016670"
        style="font-size: 20px"
        class="pa-3"
        @click="$emit('commentDialog', item)"
        >mdi-file-document
      </v-icon>
    </template>

    <template v-slot:item.TGO_FUsage="{ item }">
      <v-icon color="#016670" style="font-size: 20px" class="pa-3"
        >mdi-file-document</v-icon
      >
    </template>

    <template v-slot:[`item.TGO_FSaleReport`]>
      <v-icon color="#016670" style="font-size: 20px" class="pa-3"
        >mdi-file-document</v-icon
      >
    </template>

    <template v-slot:item.TGO_FActive="{ item }">
      <td v-if="item.TGO_FActive == 1">
        <v-icon color="#016670" style="font-size: 20px">mdi-check</v-icon>
      </td>
      <td v-else>
        <v-icon>mdi-close</v-icon>
      </td>
    </template>

    <template v-slot:item.TGO_FCanSale="{ item }">
      <td v-if="item.TGO_FCanSale == 1">
        <v-icon color="#016670" style="font-size: 20px">mdi-check</v-icon>
      </td>
      <td v-else>
        <v-icon>mdi-close</v-icon>
      </td>
    </template>

    <template v-slot:item.TGO_FArchive="{ item }">
      <td v-if="item.TGO_FArchive == 1">
        <v-icon color="#016670" style="font-size: 20px">mdi-check</v-icon>
      </td>
      <td v-else>
        <v-icon>mdi-close</v-icon>
      </td>
    </template>
  </v-data-table>
</template>
   
<script>
import goodsMixin from "../_mixins/goodsMixin";
import variables from "../_mixins/variablesGoods";
import TableMixins from "../../../../plugins/mixins/table/table";
import "../../../../assets/style/goods/goods.scss";
import "../../../../assets/style/tableHeaders/tableHeaders.scss";
export default {
    mixins: [goodsMixin, variables, TableMixins],
    props:[ "data", "priceRange", "dateRange", "prodTypes", "prodGroups", "min", "max", "defaults", "showSearchBox"],
    data(){
        return{
            selected: [],
            table : [],
            advanced : null,
            search: ''
        }
    },
    methods:{
      showGroup(item){
        var gr = this.defaults[272].find(group => group.TD_FID == item)
        if(gr){
          return gr.TD_FName
        } else {
         for(var i=0; i < this.defaults[272].length; i++){
            this.defaults[272][i].children.forEach(
              child => {
                if(child.TD_FID == item){
                  console.log("child", child)
                  gr = child.TD_FName
                }
              }
            )
          }
          if(gr){
            return gr
          }
        }
      },
      setData(){
        if(this.advanced){
          return this.advanced
        } else {
          return this.data
        }
      },
    advSearch(value){
      var advTable = this.data
    if(value.active){
      advTable = advTable.filter( item => item.TGO_FActive == value.active)
    }
    if(value.name.length > 0){  
      advTable = advTable.filter( item => item.TGO_FName.includes(value.name))
    } 
    if(value.show){
      advTable = advTable.filter( item => value.show == item.TGO_FArchive )
      console.log("show",value.show)
    } 
    if(value.title.length > 0){
      advTable = advTable.filter( item => item.TGO_FTag.includes(value.title))
        console.log("title",value.title)
    }  
    if(value.group.length > 0){
      console.log("group",value.group)
      advTable = advTable.filter( item => {
        var x = false 
        for(var i=0; i < value.group.length; i++){
          if( value.group[i] == item.TGO_FID_Category1){
            x = true
          }
        }
        return x
      })
    }  
    if(value.type.length > 0){
      console.log("type",value.type);
      advTable = advTable.filter( item => {
        var x = false 
        for(var i=0; i < value.type.length; i++){
          if( value.type[i] == item.TGO_FID_Type){
            x = true
          }
        }
        return x
      })
    } 
    if(value.mainUnit.length > 0){
      console.log("mainUnit", value.mainUnit)
      advTable = advTable.filter( item => {
        var x = false 
        for(var i=0; i < value.mainUnit.length; i++){
          if( value.mainUnit[i] == item.TGO_FID_UnitName){
            x = true
          }
        }
        return x
      })
    } 
    if(value.unit.length > 0){
      console.log("unit", value.unit)
      advTable = advTable.filter( item => {
        var x = false 
        for(var i=0; i < value.unit.length; i++){
          if( value.unit[i] == item.TGO_FID_Unit2Name){
            x = true
          }
        }
        return x
      })
    }  
    if(value.minUnitNumber){
      advTable = advTable.filter( item => value.minUnitNumber < item.TGO_FCountINUnit)
    } 
    if(value.maxUnitNumber){
      advTable = advTable.filter( item => value.maxUnitNumber > item.TGO_FCountINUnit)
    } 
    if(value.packaging.length > 0){
      console.log("packaging", value.packaging)
      advTable = advTable.filter( item => {
        var x = false 
        for(var i=0; i < value.packaging.length; i++){
          if( value.packaging[i] == item.TGO_FID_TypeBox){
            x = true
          }
        }
        return x
      })
    } 
    if(value.minPackagingNumber){
      advTable = advTable.filter( item => value.minPackagingNumber < item.TGO_FCountINBox)
    }   
    if(value.maxPackagingNumber){
      advTable = advTable.filter( item => value.maxPackagingNumber > item.TGO_FCountINBox)
    }   
    if(value.minProductionTime){
      advTable = advTable.filter( item => value.minProductionTime < item.TGO_FProductionTime)
    }   
    if(value.maxProductionTime){
      advTable = advTable.filter( item => value.maxProductionTime > item.TGO_FProductionTime)
    }   
    if(value.inventory.length > 0){
      advTable = advTable.filter( item => {
        var x = false 
        for(var i=0; i < value.packaging.length; i++){
          if( value.inventory[i] == item.TGO_FID_TypeSale){
            x = true
          }
        }
        return x
      })
    }  
    if(value.minMinSale) {
      advTable = advTable.filter( item => value.minMinSale < item.TGO_FSaleMin)
    } 
    if(value.maxMinSale) {
      advTable = advTable.filter( item => value.maxMinSale > item.TGO_FSaleMin)
    } 
    if(value.minSalePoint) {
      advTable = advTable.filter( item => value.minSalePoint < item.TGO_FBuyPoint)
    }  
    if(value.maxSalePoint) {
      advTable = advTable.filter( item => value.maxSalePoint > item.TGO_FBuyPoint)
    }  
    if(value.minSalePrice && value.maxSalePrice){
      advTable = advTable.filter( item =>{
        var s = false
        if(value.minSalePrice <= parseInt(item.TGO_FSalePriceMax.split(',').join('')) && value.maxSalePrice >= parseInt(item.TGO_FSalePriceMax.split(',').join(''))){
          s = true
        }
        return s
      })
    }   
    if(value.minColeaguePrice){
      advTable = advTable.filter( item => value.minColeaguePrice < item.TGO_FSalePriceMid)
    }  
    if(value.maxColeaguePrice){
      advTable = advTable.filter( item => value.maxColeaguePrice > item.TGO_FSalePriceMid)
    }  
    if(value.minRepPrice){
      advTable = advTable.filter( item => value.minRepPrice < item.TGO_FSalePriceMin)
    }  
    if(value.maxRepPrice){
      advTable = advTable.filter( item => value.maxRepPrice > item.TGO_FSalePriceMin)
    }  
    if(value.minBuyPrice){
      advTable = advTable.filter( item => value.minBuyPrice < item.TGO_FBuyPrice)
    }  
    if(value.maxBuyPrice){
      advTable = advTable.filter( item => value.maxBuyPrice > item.TGO_FBuyPrice)
    }  
    if(value.minClichPrice && value.maxClichPrice){
      advTable = advTable.filter( item =>{
        var s = false
        if( value.minClichPrice <= parseInt(item.TGO_FSalePriceFix.split(',').join('')) &&  value.maxClichPrice >=  parseInt(item.TGO_FSalePriceFix.split(',').join(''))){
          s = true
        }
        return s
      } )
    }   
    if(value.minFixedPrice && value.maxFixedPrice){
      advTable = advTable.filter( item =>{
        var s = false
        if(value.minFixedPrice <= parseInt(item.TGO_FBuyPercent.split(',').join('')) && value.maxFixedPrice >= parseInt(item.TGO_FBuyPercent.split(',').join(''))){
          s = true
        }
        return s
      } )
    }  
    if(value.brand.length > 0){
      advTable = advTable.filter( item => {
        var x = false 
        for(var i=0; i < value.brand.length; i++){
          if( value.brand[i] == item.TGO_FID_Brand){
            x = true
          }
        }
        return x
      })
    }  
    if(value.buyCode.length > 0) {
      advTable = advTable.filter( item => item.TGO_FBuyCode.includes(value.buyCode))
    } 
    if(value.code.length > 0){
      advTable = advTable.filter( item => item.TGO_FCode.includes(value.code))
    }  
    if(value.minBuyPriceChange.length > 0){
      advTable = advTable.filter( item => value.minBuyPriceChange <= item.TGO_FBuyLastDate)
    }   
    if(value.maxBuyPriceChange.length > 0){
      advTable = advTable.filter( item => value.maxBuyPriceChange >= item.TGO_FBuyLastDate)
    }   
    if(value.minSalePriceChange.length > 0){
      advTable = advTable.filter( item => value.minSalePriceChange <= item.TGO_FSaleLastDate)
    }  
    if(value.maxSalePriceChange.length > 0){
      advTable = advTable.filter( item => value.maxSalePriceChange >= item.TGO_FSaleLastDate)
    }  
    if(value.caption.length > 0) {
      advTable = advTable.filter( item =>  item.TGO_FComment.includes(value.caption))
      }  
    if(value.sale){
      advTable = advTable.filter( item => value.sale == item.TGO_FCanSale)
    }  
    if(value.priceChange){
      advTable = advTable.filter( item => value.priceChange == item.TGO_FCanChangePrice)
    }  
    if(value.off) {
      advTable = advTable.filter( item => value.off == item.TGO_FCanOff)
    }
    if(value.extraValue){
      advTable = advTable.filter( item => value.extraValue == item.TGO_FCanTax)
    }   
    if(value.serial.length > 0){
      advTable = advTable.filter( item => item.TGO_FID.includes(value.serial))
    }   
    if(value.minRegDate.length > 0){
      advTable = advTable.filter( item => value.minRegDate <= item.TGO_FDateReg)
    } 
    if(value.maxRegDate.length > 0){
      advTable = advTable.filter( item => value.maxRegDate >= item.TGO_FDateReg)
    }   
    if(value.regUser.length > 0) {
      advTable = advTable.filter( item =>  item.TGO_FUserRegName.includes(value.regUser))
    }
      if(advTable){
        // console.log("advTable", advTable)
        // this.tableData(advTable)
        this.advanced = advTable
      }
    }  
    },
    watch:{
      selected(newValue){
        this.$emit("select", newValue)
      }
    }

}
</script>

<style>
</style>