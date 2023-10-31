<template>
  <div>
    <v-data-table
      :items="setData()"
      :headers="customHeaders"
      class="goodsCustomeTable"
      show-select             
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      v-model="selected"
      hide-default-header
      item-key="TGO_FID"
    >
      <template v-slot:top>
        <advanced-search
          v-if="showSearchBox"
          class="mx-6 mb-10"
          @advSearch="advSearch"
          :searchHeaders="headers"
        ></advanced-search>
      </template>
      <template v-slot:header="{ props }">
        <thead>
          <tr>
            <th
              v-for="head in props.headers"
              :key="head.value"
              class="text-center pt-2"
            >
              <span class="custome-head">
                {{ head.text }}
              </span>
              <v-icon
                @click="sortColumn(head.value)"
                v-if="sortDesc"
                style="font-size: 12px"
                >mdi-arrow-up</v-icon
              >
              <v-icon
                @click="sortColumn(head.value)"
                v-if="!sortDesc"
                style="font-size: 12px"
                >mdi-arrow-down</v-icon
              >
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:item.TGO_FName="{ item }">
        <NuxtLink
          style="cursor: pointer; color: #016670"
          class="pb-1 px-2 font-weight-black"
          :to="`/goods/manage/${item.TGO_FID}`"
        >
          {{ item.TGO_FName }}
        </NuxtLink>
      </template>
      <template v-slot:item.TGO_FID_Category1="{ item }">
        {{ showGroup(item.TGO_FID_Category1) }}
      </template>
      <template v-slot:item.TGO_FID_Brand="{ item }">
        {{ showBrand(item.TGO_FID_Brand) }}
      </template>
      <template v-slot:item.TGO_FID_Type="{ item }">
        {{ showType(item.TGO_FID_Type) }}
      </template>
      <template v-slot:item.TGO_FID_TypeSale="{ item }">
        {{ showTypeSale(item.TGO_FID_TypeSale) }}
      </template>
      <template v-slot:item.TGO_FActive="{ item }">
        <v-icon
          v-if="item.TGO_FActive == 1"
          color="#016670"
          style="font-size: 20px"
          >mdi-check</v-icon
        >
        <v-icon v-else color="red">mdi-close</v-icon>
      </template>

      <template v-slot:item.TGO_FCanSale="{ item }">
        <v-icon
          v-if="item.TGO_FCanSale == 1"
          color="#016670"
          style="font-size: 20px"
          >mdi-check</v-icon
        >
        <v-icon v-else color="red">mdi-close</v-icon>
      </template>

      <template v-slot:item.TGO_FArchive="{ item }">
        <v-icon v-if="item.TGO_FArchive == 1" color="#016670">mdi-check</v-icon>
        <v-icon v-else color="red">mdi-close</v-icon>
      </template>
      <template v-slot:item.TGO_FCanTax="{ item }">
        <v-icon v-if="item.TGO_FCanTax == 1" color="#016670">mdi-check</v-icon>
        <v-icon v-else color="red">mdi-close</v-icon>
      </template>
      <template v-slot:item.TGO_FCanOff="{ item }">
        <v-icon v-if="item.TGO_FCanOff == 1" color="#016670">mdi-check</v-icon>
        <v-icon v-else color="red">mdi-close</v-icon>
      </template>
      <template v-slot:item.TGO_FCanChangePrice="{ item }">
        <v-icon v-if="item.TGO_FCanChangePrice == 1" color="#016670"
          >mdi-check</v-icon
        >
        <v-icon v-else color="red">mdi-close</v-icon>
      </template>
      <template v-slot:item.TGO_FSalePriceMax="{ item }">
        {{ numberWithCommas(item.TGO_FSalePriceMax) }}
      </template>
      <template v-slot:item.TGO_FSalePriceMid="{ item }">
        {{ numberWithCommas(item.TGO_FSalePriceMid) }}
      </template>
      <template v-slot:item.TGO_FSalePriceMin="{ item }">
        {{ numberWithCommas(item.TGO_FSalePriceMin) }}
      </template>
      <template v-slot:item.TGO_FBuyPercent="{ item }">
        {{ numberWithCommas(item.TGO_FBuyPercent) }}
      </template>
      <template v-slot:item.TGO_FSalePriceFix="{ item }">
        {{ numberWithCommas(item.TGO_FSalePriceFix) }}
      </template>
      <template v-slot:item.TGO_FBuyPrice="{ item }">
        {{ numberWithCommas(item.TGO_FBuyPrice) }}
      </template>
    </v-data-table>
    <downloadExcel></downloadExcel>
  </div>
</template>

<script>
import goodsMixin from '../_mixins/goodsMixin';
export default {
props: [ "headers" , "update", "showSearchBox", "saveT"],
mixins: [ goodsMixin ] ,
middleware: ["init-auth", "init-cart"],
data(){
    return{
        data: [],
        selected: [],
        defaults: [],
        advanced : null,
        searchHeaders: [],
        sortBy: '',
        sortDesc: false
    }
},
computed:{
    customHeaders(){
       return this.headers
    }
},
mounted(){
        this.getCustomeTable();    
},
methods:{
  setData(){
        if(this.advanced){
          return this.advanced
        } else {
          return this.data
        }
      },
async getCustomeTable(){
    const result = await this.getTable()
    if(result){
        console.log("customeResult", result)
        this.data = result.data.table
        this.defaults = result.data.defaults
        this.tableSize()
    }
},
showGroup(item){
  var gr = this.defaults[272].find(group => group.TD_FID == item)
        if(gr){
          return gr.TD_FName
        } else {
         for(var i=0; i < this.defaults[272].length; i++){
            this.defaults[272][i].children.forEach(
              child => {
                if(child.TD_FID == item){
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
showBrand(item){
  var br = this.defaults[223].find(brand => brand.TD_FID == item)
        if(br){
          return br.TD_FName
        } else {
         for(var i=0; i < this.defaults[223].length; i++){
            this.defaults[223][i].children.forEach(
              child => {
                if(child.TD_FID == item){
                  br = child.TD_FName
                }
              }
            )
          }
          if(br){
            return br
          }
        }
      },
showType(item){
  var br = this.defaults[207].find(brand => brand.TD_FID == item)
        if(br){
          return br.TD_FName
        } else {
         for(var i=0; i < this.defaults[207].length; i++){
            this.defaults[207][i].children.forEach(
              child => {
                if(child.TD_FID == item){
                  br = child.TD_FName
                }
              }
            )
          }
          if(br){
            return br
          }
        }
},
showTypeSale(item){
  var br = this.defaults[222].find(brand => brand.TD_FID == item)
        if(br){
          return br.TD_FName
        } else {
         for(var i=0; i < this.defaults[222].length; i++){
            this.defaults[222][i].children.forEach(
              child => {
                if(child.TD_FID == item){
                  br = child.TD_FName
                }
              }
            )
          }
          if(br){
            return br
          }
        }
},
tableSize(){
  var tables = document.getElementsByClassName('goodsCustomeTable');
  for (var i=0; i<tables.length;i++){
    resizableGrid(tables[i]);
  }
 function resizableGrid(table) {
 var row = table.getElementsByTagName('tr')[0],
 cols = row ? row.children : undefined;
 if (!cols) return;
 
 table.style.overflow = 'hidden';
 var tableHeight = table.offsetHeight;
 
 for (var i=0;i<cols.length;i++){
  // console.log("asdasdasdas", cols[i])
  var div = createDiv(tableHeight);
  // console.log("div", div)
  cols[i].appendChild(div);
  cols[i].style.position = 'relative';
  setListeners(div);
 }

 function setListeners(div){
  var pageX,curCol,nxtCol,curColWidth,nxtColWidth;
  div.addEventListener('mousedown',  (e) => {
   curCol = e.target.parentElement;

   nxtCol = curCol.nextElementSibling;

   pageX = e.pageX; 
   var padding = paddingDiff(curCol);
 
   curColWidth = curCol.offsetWidth - padding;
   if (nxtCol)
    nxtColWidth = nxtCol.offsetWidth - padding;
  });

  div.addEventListener('mouseover', (e) => {
   e.target.style.borderRight = '1px solid #0000ff';

  })

  div.addEventListener('mouseout', (e) => {
   e.target.style.borderRight = '';
  })

  document.addEventListener('mousemove', (e) => {
   if (curCol) {
    var diffX = e.pageX - pageX;
 
    if (nxtCol)
     nxtCol.style.width = (nxtColWidth + (diffX))+'px';

    curCol.style.width = (curColWidth - diffX)+'px';
   }
  });

  document.addEventListener('mouseup', (e) => { 
   curCol = undefined;
   nxtCol = undefined;
   pageX = undefined;
   nxtColWidth = undefined;
   curColWidth = undefined
  });
 }
 
 function createDiv(height){
  var div = document.createElement('div');
  div.style.top = 0;
  div.style.left = 0;
  div.style.width = '5px';
  div.style.position = 'absolute';
  div.style.cursor = 'col-resize';
  div.style.userSelect = 'none';
  // div.style.height = height + 'px';
  div.style.height = '1000px';  
  return div;
 }
 
 function paddingDiff(col){
 
  if (getStyleVal(col,'box-sizing') == 'border-box'){
   return 0;
  }
 
  var padLeft = getStyleVal(col,'padding-left');
  var padRight = getStyleVal(col,'padding-right');
  return (parseInt(padLeft) + parseInt(padRight));
 }

 function getStyleVal(elm,css){
  return (window.getComputedStyle(elm, null).getPropertyValue(css))
 }
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
          if( value.mainUnit[i] == item.TGO_FID_Unit){
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
          if( value.unit[i] == item.TGO_FID_Unit2){
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
        console.log("advTable", advTable)
        this.advanced = advTable
      }
    },
    numberWithCommas(e) {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    sortColumn(value){
      console.log(value)
      this.sortBy = value.toString()
      this.sortDesc = !this.sortDesc
    }
},
watch:{
      selected(newValue){
        this.$emit("select", newValue)
      },
      update(newValue){
        console.log(newValue)
        this.getCustomeTable()
        this.selected = []
      },
          saveT(newValue){
      console.log("saveTable", newValue)
      console.log("Headers", this.headers)
      var cols = document.getElementsByTagName('th')
      var widths = []
      for(var i=0; i < cols.length; i++){
        widths.push(cols[i].offsetWidth)
      }
      console.log("widths", widths)
      const a = this.$store.getters["login/getUserData"]();
      console.log("user : ", a);   
      var obj = {
        header: this.headers,
        columnWidth: widths,
      }
      console.log("obj", obj)
      console.log("headers", this.headers)
      var excelJson = []
      this.data.map(dat => {
        var obj = {}
        for(var i=0; i < this.headers.length; i++){
          var ob = {
            [this.headers[i].text] : dat[this.headers[i].value]}
                   obj =  Object.assign(ob, obj)
        }
        excelJson.push(obj)
      })

      console.log('excelJson', excelJson)  
      this.$emit('excelJson', excelJson)  
    }
    },
}
</script>


<style lang="scss">
.goodsCustomeTable {
  padding: 10px;
  th,
  td {
    border-left: 1px solid lightgray;
    padding: 12px 3px !important;
    .text-start {
      padding-top: 12px !important;
    }
  }    
  thead {
    tr {
      th {
        text-align: center !important;
      }
    }
  }
  table {
    tbody {
      tr {
        td {
          text-align: center !important;
          height: 36px !important;
        }
      }
    }
  }
}
</style>