<template>
  <v-row class="adv-search-box">
    <v-col cols="12" v-if="showRemove()" class="d-flex flex-wrap">
      <v-btn rounded class="remove-filters ml-2" @click="removeAllFilters">                      
        پاک کردن تمام فیلتر ها
        <v-icon style="font-size: 15px !important" class="pr-2"
          >mdi-delete</v-icon
        >
      </v-btn>
      <template v-for="(item, index) in advSearch" class="mx-2">
        <v-chip v-if="showChip(item)" class="filter-chips ma-1" :key="index">
          {{ showIndex(index) }} : {{ showItem(index, item) }}
          <v-avatar left style="cursor: pointer" @click="removeFilter(index)">
            <v-icon>mdi-close-circle</v-icon>
          </v-avatar>
        </v-chip>
      </template>
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'name'))">
      <label style="font-size: 14px">نام کالا</label>
      <input v-model="advSearch.name" type="text" class="adv-search-input" />
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'title'))">
      <label style="font-size: 14px">عنوان کالا</label>
      <input v-model="advSearch.title" type="text" class="adv-search-input" />
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'buyCode'))">
      <label style="font-size: 14px">کد خرید</label>
      <input type="text" v-model="advSearch.buyCode" class="adv-search-input" />
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'code'))">
      <label style="font-size: 14px">کد کالا</label>
      <input type="text" v-model="advSearch.code" class="adv-search-input" />
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'serial'))">
      <label style="font-size: 14px">سریال</label>
      <input
        type="number"
        class="adv-search-input"
        v-model="advSearch.serial"
      />
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'regUser'))">
      <label style="font-size: 14px">کاربر ثبت</label>
      <input type="text" class="adv-search-input" v-model="advSearch.regUser" />
    </v-col>
    <v-col
      cols="2"
      class="group-dialog d-flex flex-column"
      v-if="showFilter((value = 'group'))"
    >
      <label style="font-size: 14px">جستجوی گروه</label>
      <v-btn @click="treeView = !treeView" rounded falt depressed>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-edit-dialog v-if="treeView" width="250px">
        <v-text-field label="جستجو...." v-model="groupSearch" class="mx-2">
        </v-text-field>
        <v-treeview
          selectable
          :items="treeGroups"    
          :search="groupSearch"
          item-key="id"
          v-model="advSearch.group"
          selection-type="independent"
        >
          <template v-slot:append="{ item }">
            <span class="mr-2">{{ item.id }}</span>
          </template>
        </v-treeview>
      </v-edit-dialog>
    </v-col>
    <v-col
      cols="2"
      class="group-dialog d-flex flex-column"
      v-if="showFilter((value = 'type'))"
    >
      <label style="font-size: 14px">نوع کالا</label>
      <v-btn @click="treeTypeView = !treeTypeView" rounded falt depressed>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-edit-dialog v-if="treeTypeView" width="250px">
        <v-text-field label="جستجو...." v-model="typeSearch" class="mx-2">
        </v-text-field>
        <v-treeview
          selectable
          :items="treeTypes"
          :search="typeSearch"
          item-key="id"
          v-model="advSearch.type"
          selection-type="independent"
        >
          <template v-slot:append="{ item }">
            <span class="mr-2">{{ item.id }}</span>
          </template>
        </v-treeview>
      </v-edit-dialog>
    </v-col>
    <v-col
      cols="1"
      class="group-dialog d-flex flex-column"
      v-if="showFilter((value = 'mainUnit'))"
    >
      <label style="font-size: 14px">واحد اصلی</label>
      <v-btn @click="treeUnitView = !treeUnitView" rounded falt depressed>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-edit-dialog v-if="treeUnitView" width="250px">
        <v-text-field label="جستجو...." v-model="mainUnitSearch" class="mx-2">
          <template v-slot:append="{ item }">
            <span class="mr-2">{{ item.id }}</span>
          </template>
        </v-text-field>
        <v-treeview
          selectable
          :items="treeUnits"
          :search="mainUnitSearch"
          item-key="id"
          v-model="advSearch.mainUnit"
          selection-type="independent"
        >
          <template v-slot:append="{ item }">
            <span class="mr-2">{{ item.id }}</span>
          </template>
        </v-treeview>
      </v-edit-dialog>
    </v-col>
    <v-col
      cols="1"
      class="group-dialog d-flex flex-column"
      v-if="showFilter((value = 'unit'))"
    >
      <label style="font-size: 14px">واحد فرعی</label>
      <v-btn @click="treeUnit2View = !treeUnit2View" rounded falt depressed>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-edit-dialog v-if="treeUnit2View" width="250px">
        <v-text-field label="جستجو...." v-model="unitSearch" class="mx-2">
        </v-text-field>
        <v-treeview
          selectable
          :items="treeUnits"
          :search="unitSearch"
          item-key="id"
          v-model="advSearch.unit"
          selection-type="independent"
        >
          <template v-slot:append="{ item }">
            <span class="mr-2">{{ item.id }}</span>
          </template>
        </v-treeview>
      </v-edit-dialog>
    </v-col>
    <v-col
      cols="2"
      class="group-dialog d-flex flex-column"
      v-if="showFilter((value = 'inventory'))"
    >
      <label style="font-size: 14px">مدیریت موجودی</label>
      <v-btn @click="treeInvView = !treeInvView" rounded falt depressed>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-edit-dialog v-if="treeInvView" width="250px">
        <v-text-field label="جستجو...." v-model="invSearch" class="mx-2">
        </v-text-field>
        <v-treeview
          selectable
          :items="treeInv"
          :search="invSearch"
          item-key="id"
          v-model="advSearch.inventory"
          selection-type="independent"
        >
          <template v-slot:append="{ item }">
            <span class="mr-2">{{ item.id }}</span>
          </template>
        </v-treeview>
      </v-edit-dialog>
    </v-col>
    <v-col
      cols="2"
      class="group-dialog d-flex flex-column"
      v-if="showFilter((value = 'packaging'))"
    >
      <label style="font-size: 14px">بسته بندی</label>
      <v-btn @click="treePackView = !treePackView" rounded falt depressed>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-edit-dialog v-if="treePackView" width="250px">
        <v-text-field label="جستجو...." v-model="packSearch" class="mx-2">
        </v-text-field>
        <v-treeview
          selectable
          :items="treePacks"
          :search="packSearch"
          item-key="id"
          v-model="advSearch.packaging"
          selection-type="independent"
        >
          <template v-slot:append="{ item }">
            <span class="mr-2">{{ item.id }}</span>
          </template>
        </v-treeview>
      </v-edit-dialog>
    </v-col>
    <v-col
      cols="2"
      class="group-dialog d-flex flex-column"
      v-if="showFilter((value = 'brand'))"
    >
      <label style="font-size: 14px">نام برند</label>
      <v-btn @click="treeBrandView = !treeBrandView" rounded falt depressed>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-edit-dialog v-if="treeBrandView" width="250px">
        <v-text-field label="جستجو...." v-model="brandSearch" class="mx-2">
        </v-text-field>
        <v-treeview
          selectable
          :items="treeBrand"
          item-key="id"
          :search="brandSearch"
          v-model="advSearch.brand"
          selection-type="independent"
        >
          <template v-slot:append="{ item }">
            <span class="mr-2">{{ item.id }}</span>
          </template>
        </v-treeview>
      </v-edit-dialog>
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'unitNumber'))">
      <label style="font-size: 14px">تعداد در واحد فرعی</label>
      <v-row>
        <v-col cols="6" class="pl-1">
          <span>حداقل</span>
          <input
            type="number"
            v-model="advSearch.minUnitNumber"
            class="adv-search-input"
          />
        </v-col>
        <v-col cols="6" class="pr-1">
          <span>حداکثر</span>
          <input
            type="number"
            v-model="advSearch.maxUnitNumber"
            class="adv-search-input"
          />
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="2" v-if="showFilter((value = 'packagingNumber'))">
      <label style="font-size: 14px">تعداد در بسته بندی</label>
      <v-row>
        <v-col cols="6" class="pl-1">
          <span>حداقل</span>
          <input
            type="number"
            v-model="advSearch.minPackagingNumber"
            class="adv-search-input"
          />
        </v-col>
        <v-col cols="6" class="pr-1">
          <span>حداکثر</span>
          <input
            type="number"
            v-model="advSearch.maxPackagingNumber"
            class="adv-search-input"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'productionTime'))">
      <label style="font-size: 14px">زمان تولید</label>
      <v-row>
        <v-col cols="6" class="pl-1">
          <span>حداقل</span>
          <input
            type="number"
            v-model="advSearch.minProductionTime"
            class="adv-search-input"
          />
        </v-col>
        <v-col cols="6" class="pr-1">
          <span>حداکثر</span>
          <input
            type="number"
            v-model="advSearch.maxProductionTime"
            class="adv-search-input"
          />
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="2" v-if="showFilter((value = 'minSale'))">
      <label style="font-size: 14px">حداقل تعداد فروش</label>
      <v-row>
        <v-col cols="6" class="pl-1">
          <span>حداقل</span>
          <input
            type="number"
            v-model="advSearch.minMinSale"
            class="adv-search-input"
          />
        </v-col>
        <v-col cols="6" class="pr-1">
          <span>حداکثر</span>
          <input
            type="number"
            v-model="advSearch.maxMinSale"
            class="adv-search-input"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'salePoint'))">
      <label style="font-size: 14px">نقطه سفارش</label>
      <v-row>
        <v-col cols="6" class="pl-1">
          <span>حداقل</span>
          <input
            type="number"
            v-model="advSearch.minSalePoint"
            class="adv-search-input"
          />
        </v-col>
        <v-col cols="6" class="pr-1">
          <span>حداکثر</span>
          <input
            type="number"
            v-model="advSearch.maxSalePoint"
            class="adv-search-input"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'salePrice'))">
      <label style="font-size: 14px">قیمت فروش</label>
      <v-row>
        <v-col cols="6" class="pl-1">
          <span>حداقل</span>
          <input
            type="number"
            v-model="advSearch.minSalePrice"
            class="adv-search-input"
          />
        </v-col>
        <v-col cols="6" class="pr-1">
          <span>حداکثر</span>
          <input
            type="number"
            v-model="advSearch.maxSalePrice"
            class="adv-search-input"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'coleaguePrice'))">
      <label style="font-size: 14px">قیمت همکار</label>
      <v-row>
        <v-col cols="6" class="pl-1">
          <span>حداقل</span>
          <input
            type="number"
            v-model="advSearch.minColeaguePrice"
            class="adv-search-input"
          />
        </v-col>
        <v-col cols="6" class="pr-1">
          <span>حداکثر</span>
          <input
            type="number"
            v-model="advSearch.maxColeaguePrice"
            class="adv-search-input"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'repPrice'))">
      <label style="font-size: 14px">قیمت نماینده</label>
      <v-row>
        <v-col cols="6" class="pl-1">
          <span>حداقل</span>
          <input
            type="number"
            v-model="advSearch.minRepPrice"
            class="adv-search-input"
          />
        </v-col>
        <v-col cols="6" class="pr-1">
          <span>حداکثر</span>
          <input
            type="number"
            v-model="advSearch.maxRepPrice"
            class="adv-search-input"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'buyPrice'))">
      <label style="font-size: 14px">قیمت خرید</label>
      <v-row>
        <v-col cols="6" class="pl-1">
          <span>حداقل</span>
          <input
            type="number"
            v-model="advSearch.minBuyPrice"
            class="adv-search-input"
          />
        </v-col>
        <v-col cols="6" class="pr-1">
          <span>حداکثر</span>
          <input
            type="number"
            v-model="advSearch.maxBuyPrice"
            class="adv-search-input"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'clichPrice'))">
      <label style="font-size: 14px">مبلغ ثابت کلیشه</label>
      <v-row>
        <v-col cols="6" class="pl-1">
          <span>حداقل</span>
          <input
            type="number"
            v-model="advSearch.minClichPrice"
            class="adv-search-input"
          />
        </v-col>
        <v-col cols="6" class="pr-1">
          <span>حداکثر</span>
          <input
            type="number"
            v-model="advSearch.maxClichPrice"
            class="adv-search-input"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'fixedPrice'))">
      <label style="font-size: 14px">مبلغ ثابت فرم بندی</label>
      <v-row>
        <v-col cols="6" class="pl-1">
          <span>حداقل</span>
          <input
            type="number"
            v-model="advSearch.minFixedPrice"
            class="adv-search-input"
          />
        </v-col>
        <v-col cols="6" class="pr-1">
          <span>حداکثر</span>
          <input
            type="number"
            v-model="advSearch.maxFixedPrice"
            class="adv-search-input"
          />
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="4" v-if="showFilter((value = 'buyPriceChange'))">
      <label style="font-size: 14px">تاریخ تغییر قیمت خرید</label>
      <v-row>
        <v-col cols="6" class="pl-1">
          <span>از تاریخ</span>
          <date-picker v-model="advSearch.minBuyPriceChange"></date-picker>
        </v-col>
        <v-col cols="6" class="pr-1">
          <span>تا تاریخ</span>
          <date-picker v-model="advSearch.maxBuyPriceChange"></date-picker>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4" v-if="showFilter((value = 'salePriceChange'))">
      <label style="font-size: 14px">تاریخ تغییر قیمت فروش</label>
      <v-row>
        <v-col cols="6" class="pl-1">
          <span>از تاریخ</span>
          <date-picker v-model="advSearch.minSalePriceChange"></date-picker>
        </v-col>
        <v-col cols="6" class="pr-1">
          <span>تا تاریخ</span>
          <date-picker v-model="advSearch.maxSalePriceChange"></date-picker>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4" v-if="showFilter((value = 'regDate'))">
      <label style="font-size: 14px">تاریخ ثبت</label>
      <v-row>
        <v-col cols="6" class="pl-1">
          <span>از تاریخ</span>
          <date-picker v-model="advSearch.minRegDate"></date-picker>
        </v-col>
        <v-col cols="6" class="pr-1">
          <span>تا تاریخ</span>
          <date-picker v-model="advSearch.maxRegDate"></date-picker>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" v-if="showFilter((value = 'caption'))">
      <label style="font-size: 14px">شرح کالا</label>
      <input v-model="advSearch.caption" type="text" class="adv-search-input" />
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'active'))">
      <label style="font-size: 14px">فعال بودن</label>
      <input
        type="number"
        v-model="advSearch.active"
        min="0"
        max="1"
        class="adv-search-input"
      />
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'sale'))">
      <label style="font-size: 14px">امکان فروش</label>
      <input
        type="number"
        v-model="advSearch.sale"
        min="0"
        max="1"
        class="adv-search-input"
      />
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'show'))">
      <label style="font-size: 14px">امکان نمایش در محصولات</label>
      <input
        type="number"
        v-model="advSearch.show"
        min="0"
        max="1"
        class="adv-search-input"
      />
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'priceChange'))">
      <label style="font-size: 14px">امکان تغییر قیمت</label>
      <input
        type="number"
        v-model="advSearch.priceChange"
        min="0"
        max="1"
        class="adv-search-input"
      />
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'off'))">
      <label style="font-size: 14px">امکان اعمال تخفیف</label>
      <input
        type="number"
        v-model="advSearch.off"
        min="0"
        max="1"
        class="adv-search-input"
      />
    </v-col>
    <v-col cols="2" v-if="showFilter((value = 'extraValue'))">
      <label style="font-size: 14px">اعمال ارزش افزوده</label>
      <input
        type="number"
        v-model="advSearch.extraValue"
        min="0"
        max="1"
        class="adv-search-input"
      />
    </v-col>
  </v-row>
</template>

<script>
import goodsMixin from "../_mixins/goodsMixin";
export default {
    mixins : [ goodsMixin ],
    props: [ "searchHeaders"],
    data(){
        return{
            advSearch:{
                name: '',
                title: '',
                group: [],
                type: [],
                mainUnit: [],
                unit: [],
                minUnitNumber: null,
                maxUnitNumber: null,
                packaging: [],
                minPackagingNumber: null,
                maxPackagingNumber: null,
                minProductionTime: null,
                maxProductionTime: null,
                inventory: [],
                minMinSale: null,
                maxMinSale: null,
                minSalePoint: null,
                maxSalePoint: null,
                minSalePrice: null,
                maxSalePrice: null,
                minColeaguePrice: null,
                maxColeaguePrice: null,
                minRepPrice: null,
                maxRepPrice: null,
                minBuyPrice: null,
                maxBuyPrice: null,
                minClichPrice: null,
                maxClichPrice: null,
                minFixedPrice: null,
                maxFixedPrice: null,
                brand: [],
                buyCode: '',
                code: '',
                minBuyPriceChange: '',
                maxBuyPriceChange: '',
                minSalePriceChange: '',
                maxSalePriceChange: '',
                caption: '',
                active: null,
                sale:null,
                show: null,
                priceChange:null,
                off: null,
                extraValue: null,
                serial: '',
                minRegDate: '',
                maxRegDate: '',
                regUser: ''
            },
            treeGroups: [],
            treeTypes: [],
            treeUnits: [],
            treePacks: [],
            treeInv: [],
            treeBrand: [],
            treeView: false,
            treeTypeView: false,
            treeUnitView: false,
            treeUnit2View: false,
            treePackView: false,
            treeInvView: false,
            treeBrandView: false,
            groupSearch: '',
            typeSearch: '',
            mainUnitSearch: '',
            unitSearch: '',
            invSearch: '',
            packSearch: '',
            brandSearch: '',
            defaults: []
        }
    },
    methods:{
        async getDefaults(){
            const result = await this.getTable();
            this.defaults = result.data.defaults
            this.treeGroups = result.data.defaults[272].map( gr => {
                return {
                    id : gr.TD_FID,
                    name: gr.TD_FName,
                    children : gr.children
                }
            })
            this.treeTypes = result.data.defaults[207].map( gr => {
                return {
                    id : gr.TD_FID,
                    name: gr.TD_FName,
                    children : gr.children
                }
            })
            this.treeUnits = result.data.defaults[206].map( gr => {
                return {
                    id : gr.TD_FID,
                    name: gr.TD_FName,
                    children : gr.children
                }
            })
            this.treePacks = result.data.defaults[227].map( gr => {
                return {
                    id : gr.TD_FID,
                    name: gr.TD_FName,
                    children : gr.children
                }
            })
            this.treeInv = result.data.defaults[222].map( gr => {
                return {
                    id : gr.TD_FID,
                    name: gr.TD_FName,
                    children : gr.children
                }
            })
            this.treeBrand = result.data.defaults[223].map( gr => {
                return {
                    id : gr.TD_FID,
                    name: gr.TD_FName,
                    children : gr.children
                }
            })
        },
        showBox(field){
            var obj = this.searchHeaders.find(obj => obj.value == field)
            if(obj){
                if(obj.filterable == true){
                    return true
                }
            }
            return false
        },
        showFilter(value){
          if(this.searchHeaders){
                switch(value){
                case 'name': 
                return this.showBox("TGO_FName")        
                case 'title': 
                return this.showBox("TGO_FTag")
                case 'buyCode':
                return this.showBox("TGO_FBuyCode")
                case 'code':
                return this.showBox("TGO_FCode")    
                case 'serial':
                return this.showBox("TGO_FID")
                case 'regUser':
                return this.showBox("TGO_FUserRegName")
                case 'group':
                return this.showBox("TGO_FID_Category1")
                case 'type':
                return this.showBox("TGO_FID_TypeName")
                case 'mainUnit':
                return this.showBox("TGO_FID_UnitName")
                case 'unit':
                return this.showBox("TGO_FID_Unit2Name")
                case 'inventory':
                return this.showBox("TGO_FID_TypeSale")
                case 'packaging':
                return this.showBox("TGO_FID_TypeBox")
                case 'brand':
                return this.showBox("TGO_FID_Brand")
                case 'unitNumber':
                return this.showBox("TGO_FCountINUnit")
                case 'packagingNumber':
                return this.showBox("TGO_FCountINBox")
                case 'productionTime':
                return this.showBox("TGO_FProductionTime")
                case 'minSale':
                return this.showBox("TGO_FSaleMin")
                case 'salePoint':
                return this.showBox("TGO_FBuyPoint")
                case 'salePrice':
                return this.showBox("TGO_FSalePriceMax")
                case 'coleaguePrice':
                return this.showBox("TGO_FSalePriceMid")
                case 'repPrice':
                return this.showBox("TGO_FSalePriceMin")
                case 'buyPrice':
                return this.showBox("TGO_FBuyPrice")
                case 'clichPrice':
                  return this.showBox("TGO_FSalePriceFix")
                case 'fixedPrice':
                  return this.showBox("TGO_FBuyPercent")
                case 'buyPriceChange':
                  return this.showBox("TGO_FBuyLastDate")
                case 'salePriceChange':
                  return this.showBox("TGO_FSaleLastDate")  
                case 'regDate':
                  return this.showBox("TGO_FDateReg")
                case 'caption':
                  return this.showBox("TGO_FComment")
                case 'active':
                  return this.showBox("TGO_FActive")
                case 'value':
                  return this.showBox("TGO_FCanSale")
                case 'show':
                  return this.showBox("TGO_FArchive")
                case 'priceChange':
                  return this.showBox("TGO_FCanChangePrice")
                case 'off':
                  return this.showBox("TGO_FCanOff")
                case 'extraValue':
                  return this.showBox("TGO_FCanTax")
            }
          } else {
             return true
          }

        },
        showRemove(){
            var searchValues = Object.values(this.advSearch)
            // console.log("fuck face", searchValues)
            var nullBox = searchValues.filter(item => item == null)
            var emptyBox = searchValues.filter( item => item == "")
            if(nullBox.length + emptyBox.length != searchValues.length){
                return true
            }
            return false
        },
        showChip(item){
          if(item){
            if(item.length > 0){
                console.log("item", item)
                return true
            }
          }
        },
        showIndex(index){
            switch(index){
                case 'name': 
                    return 'نام کالا'
                case 'title':
                    return 'عنوان کالا'
                case 'group': 
                    return 'گروه کالا'
                case 'type':
                    return 'نوع کالا'
                case 'mainUnit':
                    return 'واحد اصلی'
                case 'unit':
                    return 'واحد فرعی'
                case 'minUnitNumber':
                    return 'حداقل تعداد در واحد فرعی'   
                case 'maxUnitNumber':
                    return 'حداکثر تعداد در واحد فرعی'
                case 'packaging':
                    return 'بسته بندی'
                case 'minPackagingNumber':
                    return 'حداقل تعداد در بسته بندی'
                case 'maxPackagingNumber':
                    return 'حداکثر تعداد در بسته بندی'
                case 'minProductionTime':
                    return 'حداقل زمان تولید'
                case 'maxProductionTime':
                    return 'حداکثر زمان تولید'      
                case 'inventory':
                    return 'مدیریت موجودی'
                case 'minMinSale':
                    return 'حداقل تعداد فروش از'    
                case 'maxMinSale':
                    return 'حداثل تعداد فروش تا'
                case 'minSalePoint':
                    return 'حداقل نقطه سفارش'
                case 'maxSalePoint':
                    return 'حداکثر نقطه سفارش'
                case 'minSalePrice':
                    return 'حداقل قیمت قروش'
                case 'maxSalePrice':
                    return 'حداکثر قیمت فروش'
                case 'minColeaguePrice':
                    return 'حداقل قیمت همکار'
                case 'maxColeaguePrice':
                    return 'حداکثر قیمت همکار'
                case 'minRepPrice':
                    return 'حداقل قیمت نماینده'
                case 'maxRepPrice':
                    return 'حداکثر قیمت نماینده'
                case 'minBuyPrice':
                    return 'حداقل قیمت خرید'
                case 'maxBuyPrice':
                    return 'حداکثر مبلغ خرید'
                case 'minClichPrice':
                    return 'حداقل مبلغ ثابت کلیشه'
                case 'maxClichPrice':
                    return 'حداکثر مبلغ ثابت کلیشه'
                case 'minFixedPrice':
                    return 'حداقل مبلغ ثابت فرم بندی'
                case 'maxFixedPrice':
                    return 'حداکثر مبلغ ثابت فرم بندی'
                case 'brand':
                    return 'برند'                
                case 'buyCode':
                    return 'کد خرید'
                case 'code':
                    return 'کد کالا'
                case 'minBuyPriceChange':
                    return 'تاریخ تغییر قیمت خرید از'
                case 'maxBuyPriceChange':
                    return 'تاریخ تغییر قیمت خرید تا'
                case 'minSalePriceChange':
                    return 'تاریخ تغییر قیمت فروش از'
                case 'maxSalePriceChange':
                    return 'تاریخ تغییر قیمت فروش تا' 
                case 'caption':
                    return 'شرح کالا'
                case 'active':
                    return 'فعال بودن'
                case 'sale':
                    return 'امکان فروش'
                case 'show': 
                    return 'امکان نمایش محصولات'
                case 'priceChange':
                    return 'امکان تغییرقیمت'
                case 'off':
                    return 'امکان اعمال تخفیف'
                case 'extraValue':
                    return 'اعمال ارزش افزوده'
                case 'serial':
                    return 'سریال کالا'
                case 'minRegDate':
                    return 'تاریخ ثبت از'
                case 'maxRegDate':
                    return 'تاریخ ثبت تا'          
                case 'regUser':
                    return 'کاربر ثبت'
            }
        },
        showItem(index, item){
          if(index == "group"){
            var group = []
            for(var i=0; i < item.length; i++){
              var gr = this.defaults[272].find(gr => gr.TD_FID == item[i])
              if(gr){
                group.push(gr.TD_FName)
              } else {
                this.defaults[272].forEach(element => {
                  var child = element.children.find(ch => ch.TD_FID == item[i])
                  if(child){
                    group.push(child.TD_FName)
                  }
                });
              }
            }
            return group
          }
          if(index == "type"){
            var group = []
            for(var i=0; i < item.length; i++){
              var gr = this.defaults[207].find(gr => gr.TD_FID == item[i])
              if(gr){
                group.push(gr.TD_FName)
              } else {
                this.defaults[207].forEach(element => {
                  var child = element.children.find(ch => ch.TD_FID == item[i])
                  if(child){
                    group.push(child.TD_FName)
                  }
                });
              }
            }
            return group
          }
                   if(index == "mainUnit"){
            var group = []
            for(var i=0; i < item.length; i++){
              var gr = this.defaults[206].find(gr => gr.TD_FID == item[i])
              if(gr){
                group.push(gr.TD_FName)
              } else {
                this.defaults[206].forEach(element => {
                  var child = element.children.find(ch => ch.TD_FID == item[i])
                  if(child){
                    group.push(child.TD_FName)
                  }
                });
              }
            }
            return group
          }
                   if(index == "unit"){
            var group = []
            for(var i=0; i < item.length; i++){
              var gr = this.defaults[206].find(gr => gr.TD_FID == item[i])
              if(gr){
                group.push(gr.TD_FName)
              } else {
                this.defaults[206].forEach(element => {
                  var child = element.children.find(ch => ch.TD_FID == item[i])
                  if(child){
                    group.push(child.TD_FName)
                  }
                });
              }
            }
            return group
          }
                   if(index == "packaging"){
            var group = []
            for(var i=0; i < item.length; i++){
              var gr = this.defaults[227].find(gr => gr.TD_FID == item[i])
              if(gr){
                group.push(gr.TD_FName)
              } else {
                this.defaults[227].forEach(element => {
                  var child = element.children.find(ch => ch.TD_FID == item[i])
                  if(child){
                    group.push(child.TD_FName)
                  }
                });
              }
            }
            return group
          }
          if(index == "inventory"){
            var group = []
            for(var i=0; i < item.length; i++){
              var gr = this.defaults[222].find(gr => gr.TD_FID == item[i])
              if(gr){
                group.push(gr.TD_FName)
              } else {
                this.defaults[222].forEach(element => {
                  var child = element.children.find(ch => ch.TD_FID == item[i])
                  if(child){
                    group.push(child.TD_FName)
                  }
                });
              }
            }
            return group
          }
          if(index == "brand"){
            var group = []
            for(var i=0; i < item.length; i++){
              var gr = this.defaults[223].find(gr => gr.TD_FID == item[i])
              if(gr){
                group.push(gr.TD_FName)
              } else {
                this.defaults[223].forEach(element => {
                  var child = element.children.find(ch => ch.TD_FID == item[i])
                  if(child){
                    group.push(child.TD_FName)
                  }
                });
              }
            }
            return group
          }
          return item
        },
        removeAllFilters(){
          this.advSearch = {
                name: '',
                title: '',
                group: [],
                type: [],
                mainUnit: [],
                unit: [],
                minUnitNumber: null,
                maxUnitNumber: null,
                packaging: [],
                minPackagingNumber: null,
                maxPackagingNumber: null,
                minProductionTime: null,
                maxProductionTime: null,
                inventory: [],
                minMinSale: null,
                maxMinSale: null,
                minSalePoint: null,
                maxSalePoint: null,
                minSalePrice: null,
                maxSalePrice: null,
                minColeaguePrice: null,
                maxColeaguePrice: null,
                minRepPrice: null,
                maxRepPrice: null,
                minBuyPrice: null,
                maxBuyPrice: null,
                minClichPrice: null,
                maxClichPrice: null,
                minFixedPrice: null,
                maxFixedPrice: null,
                brand: [],
                buyCode: '',
                code: '',
                minBuyPriceChange: '',
                maxBuyPriceChange: '',
                minSalePriceChange: '',
                maxSalePriceChange: '',
                caption: '',
                active: null,
                sale:null,
                show: null,
                priceChange:null,
                off: null,
                extraValue: null,
                serial: '',
                minRegDate: '',
                maxRegDate: '',
                regUser: ''
          }
        },
        removeFilter(index){
            console.log("filterRemove", index)
            switch(index){
                case 'name': 
                     this.advSearch.name = ''
                     break;
                case 'title':
                    this.advSearch.title = ''
                    break;
                case 'group': 
                    this.advSearch.group = []
                    break;
                case 'type':
                    this.advSearch.type = []
                    break;
                case 'mainUnit':
                    this.advSearch.mainUnit = []
                    break;
                case 'unit':
                    this.advSearch.unit = []
                    break;
                case 'minUnitNumber':
                    this.advSearch.minUnitNumber = null
                    break; 
                case 'maxUnitNumber':
                    this.advSearch.maxUnitNumber = null
                    break;
                case 'packaging':
                    this.advSearch.packaging = []
                case 'minPackagingNumber':
                   this.advSearch.minPackagingNumber = null
                   break;
                case 'maxPackagingNumber':
                    this.advSearch.maxPackagingNumber = null
                    break;
                case 'minProductionTime':
                    this.advSearch.minProductionTime =  null
                    break;
                case 'maxProductionTime':
                    this.advSearch.maxProductionTime = null
                    break;
                case 'inventory':
                    this.advSearch.inventory = []
                    break;
                case 'minMinSale':
                   this.advSearch.minMinSale = null
                   break;
                case 'maxMinSale':
                    this.advSearch.maxMinSale = null
                    break;
                case 'minSalePoint':
                    this.advSearch.minSalePoint = null
                    break;
                case 'maxSalePoint':
                    this.advSearch.maxSalePoint = null
                    break;
                case 'minSalePrice':
                    this.advSearch.minSalePrice = null
                    break;
                case 'maxSalePrice':
                    this.advSearch.maxSalePrice = null
                    break;
                case 'minColeaguePrice':
                    this.advSearch.minColeaguePrice = null
                    break;
                case 'maxColeaguePrice':
                    this.advSearch.maxColeaguePrice = null
                    break;
                case 'minRepPrice':
                    this.advSearch.minRepPrice = null
                    break;
                case 'maxRepPrice':
                    this.advSearch.maxRepPrice = null
                    break;
                case 'minBuyPrice':
                    this.advSearch.minBuyPrice = null
                    break;
                case 'maxBuyPrice':
                    this.advSearch.maxBuyPrice = null
                    break;
                case 'minClichPrice':
                    this.advSearch.minClichPrice = null
                    break;
                case 'maxClichPrice':
                    this.advSearch.maxClichPrice = null
                    break;
                case 'minFixedPrice':
                    this.advSearch.minFixedPrice = null
                    break;
                case 'maxFixedPrice':
                    this.advSearch.maxFixedPrice = null
                    break;
                case 'brand':
                   this.advSearch.brand = []
                   break;             
                case 'buyCode':
                    this.advSearch.buyCode = ''
                    break;
                case 'code':
                    this.advSearch.code = ''
                    break;
                case 'minBuyPriceChange':
                    this.advSearch.minBuyPriceChange = ''
                    break;
                case 'maxBuyPriceChange':
                    this.advSearch.maxBuyPriceChange = ''
                    break;
                case 'minSalePriceChange':
                    this.advSearch.minSalePriceChange = ''
                    break;
                case 'maxSalePriceChange':
                    this.advSearch.maxSalePriceChange = ''
                     break;
                case 'caption':
                    this.advSearch.caption = ''
                    break;
                case 'active':
                    this.advSearch.active = null
                    break;
                case 'sale':
                    this.advSearch.sale = null
                    break;
                case 'show': 
                    this.advSearch.show = null
                    break;
                case 'priceChange':
                    this.advSearch.priceChange = null
                    break;
                case 'off':
                    this.advSearch.off = null
                    break;
                case 'extraValue':
                    this.advSearch.extraValue = null
                    break;
                case 'serial':
                    this.advSearch.serial = ''
                    break;
                case 'minRegDate':
                    this.advSearch.minRegDate = ''
                    break;
                case 'maxRegDate':
                    this.advSearch.maxRegDate = ''
                    break;        
                case 'regUser':
                    this.advSearch.regUser = ''
                    break;
            }
        }
    },
    mounted(){
        this.getDefaults()
    },
   watch:{
    advSearch: {
        handler(newValue, oldValue) {
        this.$emit('advSearch', newValue)
      },
      deep: true
    },
    searchHeaders:{
        handler(newValue){
            console.log("fuckingHeader", newValue)
        },
        deep: true
    }
   }

}
</script>
 
<style lang="scss">
// .group-dialog {
//   .v-small-dialog__activator {
//     position: absolute;
//     margin-top: 60px;
//     z-index: 10;
//     background: white;
//     border-radius: 10px;
//     box-shadow: 8px 5px 14px -10px #000000;
//   }
// }
// .adv-search-input {
//   width: 100%;
// }
</style>