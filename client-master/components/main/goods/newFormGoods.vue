<template>
  <div>
    <ui-header-manager
      :title="headerManagerForm.title"
      :Buttons="headerManagerForm.buttons"
      :status="headerManagerForm.status"
      @submit="submit"
      @cancel="showDialog = true"
    />
    <GoodsCancel
      @cancelProcessDialog="cancelProcessDialog"
      @hiddenDialog="showDialog = false"
      :showDialog="showDialog"
      :data="form.data"
    />
    <v-card color="basil" class="product_form_container" v-if="this.data">
      <v-card color="basil" flat>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="3">
                <label>نام کالا</label>
                <ui-input
                  type="text"
                  class="form_control_textInput mt-0"
                  placeholder=""
                  :readonly="readonly"
                  v-model="data.TGO_FName"
                />
              </v-col>
              <v-col cols="12" md="3">
                <label>عنوان کالا (در سبد خرید)</label>
                <ui-input
                  type="text"
                  class="form_control_textInput mt-0"
                  placeholder=""
                  :readonly="readonly"
                  v-model="data.TGO_FTag"
                />
              </v-col>
              <v-col cols="12" md="3" class="d-flex flex-column group-dialog">
                <label style="font-size: 14px"> گروه کالا</label>
                <v-btn
                  @click="treeView = !treeView"
                  rounded
                  falt
                  depressed
                  :disabled="readonly"
                >
                  <v-icon>mdi-magnify</v-icon>
                  <span v-if="this.group">{{ this.group.TD_FName }}</span>
                </v-btn>
                <v-edit-dialog v-if="treeView" width="250px">
                  <v-treeview
                    activatable
                    :items="groups"
                    item-key="id"
                    @update:active="getGroup"
                    selection-type="independent"
                  >
                  </v-treeview>
                </v-edit-dialog>
              </v-col>

              <v-col cols="12" md="3" class="d-flex flex-column group-dialog">
                <label style="font-size: 14px"> نوع کالا</label>
                <v-btn
                  @click="treeTypeView = !treeTypeView"
                  rounded
                  falt
                  depressed
                  :disabled="readonly"
                >
                  <v-icon>mdi-magnify</v-icon>
                  <span v-if="this.type">{{ this.type.TD_FName }}</span>
                </v-btn>
                <v-edit-dialog v-if="treeTypeView" width="250px">
                  <v-treeview
                    activatable
                    :items="types"
                    item-key="id"
                    @update:active="getType"
                    selection-type="independent"
                  >
                  </v-treeview>
                </v-edit-dialog>
              </v-col>

              <v-col cols="12" md="3" class="d-flex flex-column group-dialog">
                <label style="font-size: 14px">واحد اصلی</label>
                <v-btn
                  @click="treeUnitView = !treeUnitView"
                  rounded
                  falt
                  depressed
                  :disabled="readonly"
                >
                  <v-icon>mdi-magnify</v-icon>
                  <span v-if="this.mainUnit">{{ this.mainUnit.TD_FName }}</span>
                </v-btn>
                <v-edit-dialog v-if="treeUnitView" width="250px">
                  <v-treeview
                    activatable
                    :items="units"
                    item-key="id"
                    @update:active="getMainUnit"
                    selection-type="independent"
                  >
                  </v-treeview>
                </v-edit-dialog>
              </v-col>

              <v-col cols="12" md="3" class="d-flex flex-column group-dialog">
                <label style="font-size: 14px">واحد فرعی</label>
                <v-btn
                  @click="treeUnit2View = !treeUnit2View"
                  rounded
                  falt
                  depressed
                  :disabled="readonly"
                >
                  <v-icon>mdi-magnify</v-icon>
                  <span v-if="this.unit">{{ this.unit.TD_FName }}</span>
                </v-btn>
                <v-edit-dialog v-if="treeUnit2View" width="250px">
                  <v-treeview
                    activatable
                    :items="units"
                    item-key="id"
                    @update:active="getUnit"
                    selection-type="independent"
                  >
                  </v-treeview>
                </v-edit-dialog>
              </v-col>
              <v-col cols="12" md="3">
                <label>تعداد در واحد فرعی</label>
                <ui-input
                  type="number"
                  class="form_control_textInput mt-0"
                  placeholder=""
                  :readonly="readonly"
                  v-model="data.TGO_FCountINUnit"
                />
              </v-col>
              <v-col cols="12" md="3" class="d-flex flex-column group-dialog">
                <label style="font-size: 14px">بسته بندی</label>
                <v-btn
                  @click="treePackView = !treePackView"
                  rounded
                  falt
                  depressed
                  :disabled="readonly"
                >
                  <v-icon>mdi-magnify</v-icon>
                  <span v-if="this.pack">{{ this.pack.TD_FName }}</span>
                </v-btn>
                <v-edit-dialog v-if="treePackView" width="250px">
                  <v-treeview
                    activatable
                    :items="packaging"
                    item-key="id"
                    @update:active="getPack"
                    selection-type="independent"
                  >
                  </v-treeview>
                </v-edit-dialog>
              </v-col>

              <v-col cols="12" md="3">
                <label>تعداد در بسته بندی</label>
                <ui-input-money
                  type="money"
                  class="form_control_textInput mt-0"
                  placeholder=" "
                  :readonly="readonly"
                  v-model="data.TGO_FCountINBox"
                />
              </v-col>

              <v-col cols="12" md="3">
                <label>زمان تولید (روز)</label>
                <ui-input-money
                  type="money"
                  class="form_control_textInput mt-0"
                  placeholder=" "
                  :readonly="readonly"
                  v-model="data.TGO_FProductionTime"
                />
              </v-col>
              <v-col cols="12" md="3" class="d-flex flex-column group-dialog">
                <label style="font-size: 14px">مدیریت موجودی</label>
                <v-btn
                  @click="treeInvView = !treeInvView"
                  rounded
                  falt
                  depressed
                  :disabled="readonly"
                >
                  <v-icon>mdi-magnify</v-icon>
                  <span v-if="this.inventory">{{
                    this.inventory.TD_FName
                  }}</span>
                </v-btn>
                <v-edit-dialog v-if="treeInvView" width="250px">
                  <v-treeview
                    activatable
                    :items="inv"
                    item-key="id"
                    @update:active="getInv"
                    selection-type="independent"
                  >
                  </v-treeview>
                </v-edit-dialog>
              </v-col>
              <v-col cols="12" md="3">
                <label>حداقل تعداد فروش</label>
                <ui-input-money
                  type="money"
                  class="form_control_textInput mt-0"
                  placeholder=" "
                  :readonly="readonly"
                  v-model="data.TGO_FSaleMin"
                />
              </v-col>
              <v-col cols="12" md="3">
                <label>نقطه سفارش</label>
                <ui-input-money
                  type="money"
                  class="form_control_textInput mt-0"
                  placeholder=" "
                  :readonly="readonly"
                  v-model="data.TGO_FBuyPoint"
                />
              </v-col>
              <v-col cols="12" md="3">
                <label>قیمت فروش</label>
                <ui-input-money
                  class="form_control_textInput mt-0"
                  placeholder=""
                  :readonly="readonly"
                  v-model="data.TGO_FSalePriceMax"
                  @change="salePriceChange = true"
                />
              </v-col>
              <v-col cols="12" md="3">
                <label>قیمت همکار</label>
                <ui-input-money
                  type="money"
                  class="form_control_textInput mt-0"
                  placeholder=" "
                  :readonly="readonly"
                  v-model="data.TGO_FSalePriceMid"
                />
              </v-col>

              <v-col cols="12" md="3">
                <label>قیمت نماینده</label>
                <ui-input-money
                  type="money"
                  class="form_control_textInput mt-0"
                  placeholder=" "
                  :readonly="readonly"
                  v-model="data.TGO_FSalePriceMin"
                />
              </v-col>
              <v-col cols="12" md="3">
                <label>قیمت خرید</label>
                <ui-input-money
                  type="money"
                  class="form_control_textInput mt-0"
                  placeholder=" "
                  :readonly="readonly"
                  v-model="data.TGO_FBuyPrice"
                  @change="buyPriceChange = true"
                />
              </v-col>

              <v-col cols="12" md="3">
                <label>مبلغ ثابت کلیشه</label>
                <ui-input-money
                  type="money"
                  class="form_control_textInput mt-0"
                  placeholder=" "
                  :readonly="readonly"
                  v-model="data.TGO_FSalePriceFix"
                />
              </v-col>

              <v-col cols="12" md="3">
                <label>مبلغ ثابت فرم بندی</label>
                <ui-input-money
                  type="money"
                  class="form_control_textInput mt-0"
                  placeholder=""
                  :readonly="readonly"
                  v-model="data.TGO_FBuyPercent"
                />
              </v-col>
              <v-col cols="12" md="3" class="d-flex flex-column group-dialog">
                <label style="font-size: 14px">نام برند</label>
                <v-btn
                  @click="treeBrandView = !treeBrandView"
                  rounded
                  falt
                  depressed
                  :disabled="readonly"
                >
                  <v-icon>mdi-magnify</v-icon>
                  <span v-if="this.brandd">{{ this.brandd.TU_FName }}</span>
                </v-btn>
                <v-edit-dialog v-if="treeBrandView" width="250px">
                  <v-treeview
                    activatable
                    :items="brand"
                    item-key="id"
                    @update:active="getBrand"
                    selection-type="independent"
                  >
                  </v-treeview>
                </v-edit-dialog>
              </v-col>
              <v-col cols="12" md="3">
                <label>کد خرید</label>
                <ui-input
                  type="text"
                  class="form_control_textInput mt-0"
                  placeholder=""
                  :readonly="readonly"
                  v-model="data.TGO_FBuyCode"
                />
              </v-col>

              <v-col cols="12" md="3">
                <label>کد کالا</label>
                <ui-input
                  type="text"
                  class="form_control_textInput mt-0"
                  placeholder=""
                  :readonly="readonly"
                  v-model="data.TGO_FCode"
                />
              </v-col>
              <v-col cols="12" md="3">
                <ui-data-picker
                  type="text"
                  class="goods-datePicker"
                  label="تاریخ تغییر قیمت خرید"
                  placeholder=" "
                  :readonly="readonly"
                  v-model="data.TGO_FBuyLastDate"
                />
              </v-col>

              <v-col cols="12" md="3">
                <ui-data-picker
                  type="text"
                  class="goods-datePicker"
                  label="تاریخ تغییر قیمت فروش"
                  placeholder=" "
                  :readonly="readonly"
                  v-model="data.TGO_FSaleLastDate"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="mt-4">
                <ui-textarea
                  lable="شرح کالا"
                  row="5"
                  :readonly="readonly"
                  v-model="data.TGO_FComment"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>

      <v-card color="basil" flat>
        <v-card-text>
          <v-container>
            <v-row class="pt-0">
              <v-col cols="4" class="py-0">
                <v-checkbox
                  class="mt-0"
                  v-model="data.TGO_FActive"
                  label="فعال بودن"
                  :disabled="readonly"
                ></v-checkbox>
              </v-col>
              <v-col cols="4" class="py-0">
                <v-checkbox
                  class="mt-0"
                  v-model="data.TGO_FCanSale"
                  label="امکان فروش"
                  :disabled="readonly"
                ></v-checkbox>
              </v-col>
              <v-col cols="4" class="py-0">
                <v-checkbox
                  v-model="data.TGO_FArchive"
                  class="mt-0"
                  label="امکان نمایش در محصولات"
                  :disabled="readonly"
                ></v-checkbox>
              </v-col>
              <v-col cols="4" class="py-0">
                <v-checkbox
                  class="mt-0"
                  v-model="data.TGO_FCanChangePrice"
                  label="امکان تغییر قیمت"
                  :disabled="readonly"
                ></v-checkbox>
              </v-col>
              <v-col cols="4" class="py-0">
                <v-checkbox
                  class="mt-0"
                  v-model="data.TGO_FCanOff"
                  label="امکان اعمال تخفیف"
                  :disabled="readonly"
                ></v-checkbox>
              </v-col>
              <v-col cols="4" class="py-0">
                <v-checkbox
                  class="mt-0"
                  v-model="data.TGO_FCanTax"
                  label="اعمال ارزش افزوده اجباری "
                  :disabled="readonly"
                ></v-checkbox>
              </v-col>

              <v-col cols="4" class="py-0 form_goods_mange_link">
                <p>
                  <v-icon> mdi-square-rounded </v-icon>
                  <span> کاربرد در محصولات </span>
                </p>
              </v-col>
              <v-col cols="4" class="py-0 form_goods_mange_link">
                <p>
                  <v-icon> mdi-square-rounded </v-icon>
                  <span> گزارش فروش کالا </span>
                </p>
              </v-col>
              <v-col cols="4" class="py-0 form_goods_mange_link">
                <p>
                  <v-icon> mdi-square-rounded </v-icon>
                  <span> گزارش تغییرات قیمت </span>
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <ui-input
                  type="text"
                  class="form_control_textInput"
                  label="     سریال     "
                  placeholder=" "
                  :readonly="true"
                  v-model="data.TGO_FID"
                />
              </v-col>

              <v-col cols="12" md="4">
                <ui-input
                  type="text"
                  class="form_control_textInput"
                  label="تاریخ ثبت"
                  placeholder=" "
                  :readonly="true"
                  v-model="data.TGO_FDateReg"
                />
              </v-col>

              <v-col cols="12" md="4">
                <ui-input
                  type="text"
                  class="form_control_textInput"
                  label="کاربر ثبت"
                  placeholder=" "
                  :readonly="true"
                  v-model="data.TGO_FUserRegName"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import variablesGoods from './_mixins/variablesGoods';

import goodsMixin from './_mixins/goodsMixin';
import "../../../assets/style/goods/goods.scss";
export default {
mixins: [goodsMixin, variablesGoods],
props: [ "ID", "readonly" ],
data(){
    return{
        showDialog: false,
        data:null,
        defaults: null,
        dialogConpopup1: false,
        dialogConpopup2: false,
       dialogConpopup3: false,
       groups: [],
       group: null,
      treeView: false,
      types: [],
        type: null,
      treeTypeView: false,
      units: [],
      mainUnit: null,
      unit: null,
      treeUnitView: false,
      treeUnit2View: false,
      packaging: [],
      pack: false,
      treePackView: false,
      inv: [],
      inventory: null,
      treeInvView: false,
      brand: [],
      brandd: null,
      treeBrandView: false,
      salePriceChange: false,
      buyPriceChange: false,
      date: '',
      providers: []
    }
},
mounted(){
  var date = new Date()
  var options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }
  console.log('today',date.toLocaleDateString("fa-IR", options))
  this.date = date.toLocaleDateString("fa-IR", options)
  // console.log("shit", this.headerManagerForm.show)
    if(this.ID){
        this.editMode()
    } else {
        this.insertMode()
    }
    this.getBrands()
 },
 methods: {
    async getBrands(){
      try {
        let response = await this.$authAxios.$get(
          "/user/get/0?mode=table&status=provider"
        );
        // return response.data;
        this.providers = response.data.table
          this.brand = this.providers.map(ty => {
        return{
          id: ty.TU_FID,
          name: ty.TU_FName,
        }
      })       

      } catch (error) {
        console.log(error);
      }
    },
    async insertMode(){
      this.headerManagerForm.status = "insert"
      const result = await  this.getInit()
      if(result){
        console.log("insert", result)
        this.data = result.data.form
        this.defaults = result.data.defaults;
        this.headerManagerForm.show = true
        this.configDefaults()

      }
    },
    async editMode(){
        this.headerManagerForm.status = "edit"
        const result = await this.getShow(this.ID)
        console.log("result", result)
        if(result.form){
            this.data = result.form
            this.defaults = result.defaults;
            this.headerManagerForm.show = true
            this.configDefaults()
        }
    },
    configDefaults(){
    //  this.data.TGO_FCanSale = true;
    //  this.data.TGO_FArchive = true;
    //  this.data.TGO_FActive = true;
     this.groups = this.defaults[272].map(gr => {
                return {
                    id : gr.TD_FID,
                    name: gr.TD_FName,
                    children : gr.children}
                })
                console.log("groups", this.groups)

      this.group = this.defaults[272].find(gr => gr.TD_FID == this.data.TGO_FID_Category1)
      if(!this.group){
         this.defaults[272].forEach(gr => {
          if(gr.children){
            if(gr.children.length > 0){
          var gro = gr.children.find( ch => ch.TD_FID == this.data.TGO_FID_Category1)
          // console.log('gro', gro)
          if(gro){
            this.group = gro

          }
          }
          }
         })
      }
      console.log("thisGroup", this.group)
      this.types = this.defaults[207].map(ty => {
        return{
          id: ty.TD_FID,
          name: ty.TD_FName,
          children: ty.children
        }
      })          
      this.type = this.defaults[207].find(gr => gr.TD_FID == this.data.TGO_FID_Type)
      if(!this.type){
         this.defaults[207].forEach(gr => {
          if(gr.children){
          if(gr.children.length > 0){
          var ty = gr.children.find( ch => ch.TD_FID == this.data.TGO_FID_Type)
          if(ty){
            this.type = ty
          }
          }
        }
         })
      }
      this.units = this.defaults[206].map(ty => {
        return{
          id: ty.TD_FID,
          name: ty.TD_FName,
          children: ty.children
        }
      })          
      this.mainUnit = this.defaults[206].find(gr => gr.TD_FID == this.data.TGO_FID_Unit)
      if(!this.mainUnit){
         this.defaults[206].forEach(gr => {
          if(gr.children){
          if(gr.children.length > 0){
          var uni = gr.children.find( ch => ch.TD_FID == this.data.TGO_FID_Unit)
          if(uni){
            this.mainUnit = uni
          }
          }
        }
         })
      }
      this.unit = this.defaults[206].find(gr => gr.TD_FID == this.data.TGO_FID_Unit2)
      if(!this.unit){
         this.defaults[206].forEach(gr => {
          if(gr.children){

          if(gr.children.length > 0){
          var uni = gr.children.find( ch => ch.TD_FID == this.data.TGO_FID_Unit2)
          if(uni){
            this.unit = uni
          }
          }
        }
         })
      }
      this.packaging = this.defaults[227].map(ty => {
        return{
          id: ty.TD_FID,
          name: ty.TD_FName,
          children: ty.children
        }
      })          
      this.pack = this.defaults[227].find(gr => gr.TD_FID == this.data.TGO_FID_TypeBox)
      if(!this.pack){
         this.defaults[227].forEach(gr => {
          if(gr.children){

          if(gr.children.length > 0){
          var pac = gr.children.find( ch => ch.TD_FID == this.data.TGO_FID_TypeBox)
          if(pac){
            this.pack = pac
          }
          }
        }
         })
      }
      this.inv = this.defaults[222].map(ty => {
        return{
          id: ty.TD_FID,
          name: ty.TD_FName,
          children: ty.children
        }
      })       
      this.inventory = this.defaults[222].find(gr => gr.TD_FID == this.data.TGO_FID_TypeSale)
      if(!this.inventory){
         this.defaults[222].forEach(gr => {
          if(gr.children){

          if(gr.children.length > 0){
          var inve = gr.children.find( ch => ch.TD_FID == this.data.TGO_FID_TypeSale)
          if(inve){
            this.inventory = inve
          }
          }
        }
         })
      }  
      this.brandd = this.providers.find(gr => gr.TU_FID == this.data.TGO_FID_Brand)
      // this.brandd = this.defaults[223].find(gr => gr.TD_FID == this.data.TGO_FID_Brand)
    //   if(!this.brandd){
    //      this.defaults[223].forEach(gr => {
    //       if(gr.children){
    //         if(gr.children.length > 0){
    //       var bra = gr.children.find( ch => ch.TD_FID == this.data.TGO_FID_Brand)
    //       if(bra){
    //         this.brandd = bra
    //       }
    //       }
    //       }
    //      })   
    // }
      },
      numberWithCommas(e) {
    return e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getGroup(value){
      console.log("group", value)
     if(value) {
    this.data.TGO_FID_Category1 = value[0]
    this.group = this.defaults[272].find(gr => gr.TD_FID == this.data.TGO_FID_Category1)
    console.log(this.group)
    if(!this.group){
         this.defaults[272].forEach(gr => {
          if(gr.children.length > 0){
            // console.log("gr", gr)
          var child = gr.children.find( ch =>{
            return ch.TD_FID == this.data.TGO_FID_Category1
          } )
            if(child){
              this.group = child 
            } 
          }
         })
      }
  }
  this.treeView = !this.treeView
},
getType(value){
  if(value){
    this.data.TGO_FID_Type = value[0]
    this.type = this.defaults[207].find(gr => gr.TD_FID == this.data.TGO_FID_Type)
    if(!this.type){
         this.defaults[207].forEach(gr => {
          if(gr.children.length > 0){
          var child = gr.children.find( ch =>{
            return ch.TD_FID == this.data.TGO_FID_Type
          } )
          if(child){
              this.type = child 
            } 
          }
         })
      }
  } 
  this.treeTypeView = ! this.treeTypeView
},
getMainUnit(value){
  if(value){
    this.data.TGO_FID_Unit = value[0]
    this.mainUnit = this.defaults[206].find(gr => gr.TD_FID == this.data.TGO_FID_Unit)
    if(!this.mainUnit){
         this.defaults[206].forEach(gr => {
          if(gr.children.length > 0){
          var child = gr.children.find( ch =>{
            return  ch.TD_FID == this.data.TGO_FID_Unit
          } )
          if(child){
              this.mainUnit = child 
            } 
          }
         })
      }
  }
  this.treeUnitView = ! this.treeUnitView
},
getUnit(value){
  if(value){
    this.data.TGO_FID_Unit2 = value[0]
    this.unit = this.defaults[206].find(gr => gr.TD_FID == this.data.TGO_FID_Unit2)
    if(!this.unit){
         this.defaults[206].forEach(gr => {
          if(gr.children.length > 0){ 
          var child = gr.children.find( ch =>{
            return ch.TD_FID == this.data.TGO_FID_Unit2
          } )
          if(child){
              this.unit = child 
            } 
          }
         })
      }
  } 
  this.treeUnit2View = ! this.treeUnit2View
},
getPack(value){
  if(value){
    this.data.TGO_FID_TypeBox = value[0]
    this.pack = this.defaults[227].find(gr => gr.TD_FID == this.data.TGO_FID_TypeBox)
    if(!this.pack){
         this.defaults[227].forEach(gr => {
          if(gr.children.length > 0){
          var child = gr.children.find( ch =>{
            return ch.TD_FID == this.data.TGO_FID_TypeBox
          } )
          if(child){
              this.pack = child 
            } 
          }
         })
      }
  } 
  this.treePackView = ! this.treePackView
},
getInv(value){
  if(value){
    this.data.TGO_FID_TypeSale = value[0]
    this.inventory = this.defaults[222].find(gr => gr.TD_FID == this.data.TGO_FID_TypeSale)
    if(!this.inventory){
         this.defaults[222].forEach(gr => {
          if(gr.children.length > 0){
           var child = gr.children.find( ch =>{
            return ch.TD_FID == this.data.TGO_FID_TypeSale
           } )
           if(child){
              this.inventory = child 
            } 
          }
         })
      }
  }
  this.treeInvView = ! this.treeInvView
},
getBrand(value){
  if(value){
    this.data.TGO_FID_Brand = value[0]
    this.brandd = this.providers.find(gr => gr.TU_FID == value[0])
    console.log('brand name', this.brandd.TU_FName)
    this.data.TGO_FID_BrandName = this.brandd.TU_FName
  } 
  this.treeBrandView = ! this.treeBrandView
},
cancelProcessDialog(){
  this.$nuxt.$options.router.push({ path: "/admin/goods/" });},
  async submit(){
    if(this.salePriceChange){
      this.data.TGO_FSaleLastDate = this.date
      console.log('change the date')
    }
    if(this.buyPriceChange){
      this.data.TGO_FBuyLastDate = this.date
    }
    const result = await this.Submit(this.headerManagerForm.status, this.data);
    if(result){
      this.$nuxt.$options.router.push({ path: "/admin/goods/" });
    }
  }
 }
}
</script>

<style lang="scss">
.group-dialog {
  .v-small-dialog__activator {
    position: absolute;
    margin-top: 60px;
    z-index: 10;
    background: white;
    border-radius: 10px;
    box-shadow: 8px 5px 14px -10px #000000;
  }
}
.form_goods_mange_link {
  p {
    padding-right: 8px;
    color: #016670;
    font-weight: 700;
    i {
      color: #016670 !important;
    }
  }
}
.goods-datePicker {
  .form__label {
    color: black !important;
  }
  span {
    label {
      border-radius: 10px 0px 0px 10px !important;
    }
  }
}
</style>