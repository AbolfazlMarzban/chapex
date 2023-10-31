<template>
    <div style="min-height:500px">
      <v-row>
  
        <v-col cols="12" class="py-1 px-3">      
          <ui-input
            class="form_control_textInput"
            label="عنوان"
            v-model="data.TFF_FLable"
          />
        </v-col>
  
        <!-- <v-col cols="12" class="py-1 px-3">
          <ui-input
            class="form_control_textInput"
            label="متن داخل آپلودر"
            v-model="data.TFF_FPlaceHolder"
          />
        </v-col> -->
  
        <v-col cols="6" class="py-1 px-3">
          <ui-input
            class="form_control_textInput"
            label="ستون"
            v-model="data.TFF_FColumn"
          />
        </v-col>
        <v-col cols="6" class="py-1 px-3">
          <ui-input
            class="form_control_textInput"
            label="ترتیب"
            v-model="data.TFF_FOrder"
          />
        </v-col>
        <!-- <v-col cols="12" class="py-1 px-3">
          <v-select
            label="انتخاب مسیر آپلود"  
            :items="routes"
            class="formatPicker"
            outlined
            dense
            v-model="route"
          ></v-select>
        </v-col> -->


        <v-col cols="12" class="py-1 px-3">
          <v-select
            label="انتخاب فرمت قابل قبول"  
            :items="['.pdf', '.ai', '.jpg', '.jpeg', '.psd', '.cdr', '.tif']"
            multiple
            class="formatPicker"
            outlined
            dense
            v-model="fileFormat"
          ></v-select>
        </v-col>
        
        <v-col cols="12" class="py-1 px-3">
          <v-select
            label="انتخاب فرمت رنگ قابل قبول"
            :items="['RGB', 'CMYK']"
            class="formatPicker"
            dense
            outlined
            v-model="data.TFF_FColorFormat"
          ></v-select>
        </v-col>
        <v-col cols="12" class="py-1 px-3">
          <ui-input
            class="form_control_textInput"
            label="لینک فایل قالب آپلودر"
            v-model="data.TFF_FTempLink"
          />
        </v-col>
        <v-col cols="12" class="py-1 px-3">
          <v-select            
            label="انتخاب واحد رزولوشن"
            :items="['centimeters', 'inches']"
            class="formatPicker"
            outlined
            dense
            v-model="data.TFF_FIcon"
          ></v-select>
        </v-col>
        <v-col cols="12" class="py-1 px-3">
          <v-row>
            <v-col cols="6">
              <ui-input
            class="form_control_textInput"
            label="حداقل رزولوشن دریافتی"
            type="number"
            v-model="data.TFF_FResMin"

          />
            </v-col>
            <v-col cols="6">
              <ui-input
               class="form_control_textInput"
              label="حداکثر رزولوشن دریافتی"
                type="number"
                v-model="data.TFF_FResMax"

          />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="py-1 px-3">
          <v-row>
            <v-col cols="6">
              <ui-input
            class="form_control_textInput"
            label="حداقل حجم دریافتی (MB)"
            type="number"
            v-model="data.TFF_FSizeMin"
          />
            </v-col>
            <v-col cols="6">
              <ui-input
               class="form_control_textInput"
              label="حداکثر حجم دریافتی (MB)"
                type="number"
                v-model="data.TFF_FSizeMax"
          />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" class="py-1 px-3">
          <v-row>
            <v-col cols="6">
              <ui-input
            class="form_control_textInput"
            label="عرض فایل دریافتی (mm)"
            type="number"
            v-model="data.TFF_FFileWidth"

          />
            </v-col>
            <v-col cols="6">
              <ui-input
               class="form_control_textInput"
              label="ارتفاع فایل دریافتی (mm)"
                type="number"
                v-model="data.TFF_FFileHeight"
          />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" class="py-1 px-3">
          <ui-input
            class="form_control_textInput"
            label="توضیحات (tooltip)"
            v-model="data.TFF_FToolTip"
          />
        </v-col>

        <v-col cols="6" class="py-1 px-3">
          <v-checkbox label="فعال" v-model="data.TFF_FActive"></v-checkbox>
        </v-col>
        <v-col cols="6" class="py-1 px-3">
          <v-checkbox label="اجباری بودن" v-model="data.TFF_FRequired"></v-checkbox>
        </v-col>
  
  
      </v-row>
    </div>
  </template>
  
  <script>
  export default {
    props: ["data"],
    data(){
      return{
        routes: [],
        fileFormat: [],
        route: '',
        routeItems: []
      }
    },
    computed: {
      title() {
        let type = this.data.type;
        let title;
        if (type == "input") {
          title = "متن ساده";
        } else if (type == "textarea") {
          title = "متن چند خطی";
        } else if (type == "number") {
          title = "عدد";
        } else if (type == "money") {
          title = "پولی";
        } else if (type == "phone") {
          title = "شماره تماس";
        } else if (type == "date") {
          title = "تاریخ";
        } else if (type == "time") {
          title = "زمان";
        } else if (type == "email") {
          title = "ایمیل";
        } else if (type == "link") {
          title = "دانلود";
        } else if (type == "file") {
          title = "آپلود";
        }
        return title;
      }
    },
    mounted(){
      this.getTable()
      if(this.data.TFF_FFileFormat.length > 0){
        this.fileFormat = this.data.TFF_FFileFormat.split(',')
        // console.log(this.fileFormat)
      }
      // if(this.data.TFF_FComment.length > 0){
      //   var route = this.routeItems.find(item => item.TD_FID == this.data.TFF_FComment)
      //   this.route = route.TD_FName
      //  console.log('route', route)
      // }
    },
    methods: {
      submit() {
        this.$emit("submit", this.data);
      },
      async getTable(groupID = 240) {         
      try {           
        const response = await this.$authAxios.$get(
          `/defaults/get/${groupID}?mode=table`
        ); 
        this.routeItems = response.data.table
        console.log('response', response.data.table)
        response.data.table.forEach(item =>{
          if(!this.routes.includes(item.TD_FName)){
            this.routes.push(item.TD_FName)
          }
        })
        // if(this.data.TFF_FComment.length > 0){
        //   var route = this.routeItems.find(item => item.TD_FID == this.data.TFF_FComment)
        //   console.log(route)
        //   this.route = route.TD_FName
        // }
        // console.log('routes', this.routes)
      } catch (error) {
        console.log(error);  
      }
    },
    },
    watch:{
      fileFormat(newValue){
        // console.log('fileFormat', newValue.toString())
        this.data.TFF_FFileFormat = newValue.toString()
      },
      route(newValue){
        var route = this.routeItems.find(item => item.TD_FName == newValue)
        this.data.TFF_FComment = route.TD_FID
        console.log('TFF_FComment', this.data.TFF_FComment)
      },
      routeItems(newValue){
        if(this.data.TFF_FComment){
          if(this.data.TFF_FComment.length > 0){
          var route = newValue.find(item => item.TD_FID == this.data.TFF_FComment)
        this.route = route.TD_FName
        }
        }
      }
    }
  };
  </script>
  
  <style lang="scss">
  .formatPicker{
    input{
      background: none !important;
      border: none !important;
    }
  }
</style>
  