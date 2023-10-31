<template>
  <div>
    <v-card color="basil" class="order_container mt-3">
    <v-card color="basil" flat>
      <v-card-text>
        <v-container>
            <v-row>  
      <v-col cols="12">
        <v-btn
          color="#016670"
          rounded
          dark
          class="mb-3"
          @click="$router.go(-1)"
        >
          بازگشت
          <v-icon>mdi-keyboard-return</v-icon>

        </v-btn>
        <v-chip class="status-chip" 
          >وضعیت فعلی سفارش  {{ data.TOD_FID_LastStatusName }}</v-chip
        >
      </v-col>
    </v-row>
    <v-row class="order-item mt-2">
      <v-col cols="2">
        <img :src="setImageUrl(data.TOD_FPicAdd1)" alt=""  style="width: 100%;"/>
      </v-col>
      <v-col cols="3" class="pr-1 d-flex flex-column justify-center">
        <ul class="details pl-0">
          <li>
            عنوان محصول: 
            <span>{{ data.TOD_FName }}</span>
          </li>
          <li>
            نام مشتری: 
            <span>{{ data.TOH_FID_CustomerName }}</span>
          </li>
          <li>
            شماره سفارش: 
            <span>{{ data.TOD_FID }}</span>
          </li>
          <li>
            وضعیت: 
            <span>{{ data.TOD_FID_LastStatusName }}</span>
          </li>
          <li>
            تاریخ سفارش: 
            <span>{{ data.TOH_FDateReg }}</span>
          </li>
          <li>
            ساعت سفارش: 
            <span>{{ data.TOH_FTimeReg }}</span>
          </li>
          <li>
            تعداد سفارش: 
            <span>{{ data.TOD_FCount }}</span>
          </li>
          <li>
            مبلغ کل سفارش: 
            <span>{{ data.TOH_FPriceTotal }} تومان</span>
          </li>
        </ul>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-expansion-panels accordion class="order-panels mt-5">
          <v-expansion-panel>
            <v-expansion-panel-header style="box-shadow: none !important">
              فرآیند گردش سفارش
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <OrderCircle :data="status" :last="data.TOD_FID_LastStatusName" :lastChild="data.TOD_FID_LastStatusDetailName" @changeStat="changeStat"/>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header style="box-shadow: none !important">
              جزئیات سفارش
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <OrderOptions :data="options" :title="data.TOD_FName"/>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header style="box-shadow: none !important">
              طراحی و نظارت سفارش
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <!-- <LazyFormViewer v-if="designForm.length > 0" /> -->
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              فایل های نهایی تایید شده</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <LazyFormViewer v-if="uploadForm.length > 0" />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              گزارش عملکرد</v-expansion-panel-header>
            <v-expansion-panel-content>
              <ul class="order-log">
                <li>
                  1402/02/05
                  <span>ثبت سفارش</span>
                </li>
                <li>
                  1402/02/06
                  <span>تایید مالی</span>
                </li>
                <li>
                  1402/02/07
                  <span>طراحی</span>
                </li>
              </ul>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header> گزارش مالی</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="justify-center">
                <v-col
                  cols="10"
                  xl="8"
                  lg="8"
                  md="8"
                  class="text-center d-flex flex-column px-0 order-alarm"
                >
                  <!-- <v-icon color="red">mdi-shield-alert-outline</v-icon>
                  <span>سفارش شما هنوز وارد مرحله ارسال نشده است</span> -->
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
        </v-container>
      </v-card-text>
      </v-card>
    </v-card>  
  </div>
</template>

<script>
export default {
props: [ "ID" ],
data(){
  return{
    data: [],
    options: [],
    designForm: [],
    uploadForm: [],
    status: []
  }
},
mounted(){
    if(this.ID){
        this.getData()
    }
},
computed:{
  statuss(){
    if(this.status){
      return this.status
    }
  }
},
methods:{
    async getData(){
            try{
            const result = await this.$authAxios.$get(`/order/getOrder/${this.ID}`)
            // console.log('result', result)
            if(result){
              this.data = result.data[0]
              this.options = result.options
              // console.log('options', this.options)
              if(result.designFormResult){
                this.designForm = result.designFormResult
              }
              if(result.uploadFormResult){
                this.uploadForm = result.uploadFormResult
              }
              if(result.status){
                this.status = result.status
                // console.log('status', this.status)
              }
            }
        }catch(error){
            console.log(error)
        }
        },
        changeStat(value, parent, caption){
          const a = this.$store.getters["login/getUserData"]();
          if(value || parent){
          //  var parent = steps.find(item => item.children.some(i => i.id == value))
          var data = {
            "userReg": Number(a.TU_FID),
            "status1": Number(this.data.TOD_FID_LastStatus),
            "statusDetail1": Number(this.data.TOD_FID_LastStatusDetail),
            "status2": parent,
            "statusDetail2": value,
            "orderHeadID": Number(this.data.TOD_FID_Header),
            "orderID": Number(this.data.TOD_FID),
            "caption": caption,
            "time": '',
            "date": ''
          }
          // console.log('data', data)
          this.sendStatus(data)
        }
        },
        async sendStatus(value){
          // console.log('postValue', [value])
          try{
           const result = await this.$authAxios.$post("/order/changeStatus", 
              {value}
            )
            if(result){
              console.log(result)
              this.getData()
            }
          }catch(error){
            console.log(error)
            this.getData()
          }
        }
    }
}
</script>

<style lang="scss">
.order_container{
    h1{
        font-family: boldbakhtiari !important;
    }
}
.status-chip {
  width: 100%;
  justify-content: center;
  background: #d9d9d9;
  span {
    font-family: boldbakhtiari !important;
    color: #016670;
  }
}
.order-panels {
  .v-expansion-panel-header {
    font-family: bakhtiari !important;
  }
  .v-expansion-panel-header--active {
    font-family: boldbakhtiari !important;
    color: #016670;
  }
  .v-expansion-panel-header__icon {
    margin-left: 0px;
    margin-right: auto;
  }
  .v-expansion-panel::before {
    box-shadow: none !important;
  }
}
.order-log {
  li {
    font-family: boldbakhtiari !important;
    color: black;
    span {
      padding-right: 10px;
      font-family: boldbakhtiari !important;
      color: #016670;
    }
  }
}
</style>