<template>
  <v-expansion-panel class="togglebox">
    <accordian-title title="اطلاعات صفحه" :unsaved="sections_changed()" />

    <v-expansion-panel-content>
      <v-row class="form_builder_header col-12">
        <v-col cols="12" md="4">
          <ui-input
            class="form_control_textInput"
            label="نام فرم"
            v-model="data.TF_FName"
            :readonly="readonly"
          />
        </v-col> 
        <v-col cols="12" md="4">
          <ui-input
            class="form_control_textInput"
            label="عنوان (تگ تایتل)"
            v-model="data.TF_FTitle"
            :readonly="readonly"
          />
        </v-col>
        <v-col cols="12" md="4" v-if="getType()">
          <label style="font-size: 14px;">نوع فرم</label>
          <v-select
            v-if="formTypes.length > 0"
            :items="formTypes"
            v-model="type"
            rounded
            dense
            class="mt-0"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4" v-if="getType() && children.length > 0" >
          <label style="font-size: 14px;"> نام فرم در لینک</label>
          <v-select
            :items="children"
            v-model="child"
            rounded
            dense
            class="mt-0"
            @change="setLink"
          ></v-select>
        </v-col>
        <!-- <v-col cols="12" md="4">
          <ui-input
            class="form_control_textInput"
            label="وضعیت چینش در صفحه"
            placeholder="center"
            v-model="data.TF_FCenter"
            :readonly="readonly"
          />
        </v-col> -->
        <!-- <v-col cols="12" md="4">
          <ui-input
            class="form_control_textInput"
            label="ستون ها"
            placeholder="12"
            v-model="data.TF_FColumn"
            :readonly="readonly"
          />
        </v-col> -->
        
        <v-col cols="12" md="4">
          <ui-input
            class="form_control_textInput"
            label="کلمات کلیدی"
            placeholder="کلمات کلیدی"
            v-model="data.TF_FKeywords"
            :readonly="readonly"
          />
        </v-col>
        
        <v-col cols="12" md="4">
          <ui-input
            class="form_control_textInput"
            label="متای توضیحات"
            placeholder="متای توضیحات"
            v-model="data.TF_FMeta"
            :readonly="readonly"
          />
        </v-col>

        <v-col cols="12" md="4">
          <ui-input
            class="form_control_textInput"
            label="لینک فرم"
            placeholder="لینک فرم"
            style="direction: ltr !important;"
            v-model="link"
            :readonly="readonly"
            @change="data.TF_FLink = link"
          />
        </v-col>

        <v-col cols="12" md="4">
          <div class="text-center">
            <nuxt-link
              class="blue--text"
              v-if="data.TF_FID" 
              :to="`/forms/${data.TF_FID}`"
              target="_blank"
            >
              <v-icon color="blue">mdi-arrow-top-right-bold-box-outline</v-icon>
              <span>مشاهده</span>
            </nuxt-link>
          </div>
        </v-col>
        <!-- <v-col cols="12" md="12">
          <div class="d-flex justify-space-between">
            <label>آپلود عکس هدر</label>
            <v-tooltip top v-if="data.TF_FPic">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  color="#016670"
                  dark
                  v-bind="attrs"
                  @click="$emit('deleteFormPic')"
                  v-on="on"
                  >حذف عکس فرم</v-btn
                >
              </template>
              <img
                :src="setImageUrl(data.TF_FPic)"
                alt=""
                style="width: 300px;"
              />
            </v-tooltip>
          </div>
          <ui-uploader
            class="form_control_textInput main-header-img"
            @input="setImage"
            :route="24014"
          />
        </v-col> -->
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
export default {
  props: ["data", "lastsaved_data", "readonly", "FID"],
  data() {
    return {
      formTypes: [],
      type: "",
      typeArr: [],
      children: [],
      child: "",
      childs: [],
      link: ''
    };
  },
  mounted() {
    this.getFormTypes();

  },
  methods: {
    setImage(value) {
      console.log("image", value);
      this.data.formPic = value;
    },
    getType() {
      if (this.data.TF_FID_FType) {
        if (this.data.TF_FID_FType.length > 0) {
          var typ = this.typeArr.find(
            item => item.TD_FID == this.data.TF_FID_FType
          );
          if (typ) {
            this.type = typ.TD_FName;
          }
        }
      }
      return true;
    },
    sections_changed() {
      var local_data = JSON.parse(JSON.stringify(this.data));
      var obj1 = {
        TF_FName: local_data.TF_FName,
        TF_FTitle: local_data.TF_FTitle,
        TF_FID_FType: local_data.TF_FID_FType,
        TF_FCenter: local_data.TF_FCenter,
        TF_FColumn: local_data.TF_FColumn,
        TF_FID: local_data.TF_FID
      };

      var local_lastsaved_data = JSON.parse(
        JSON.stringify(this.lastsaved_data)
      );
      var obj2 = {
        TF_FName: local_lastsaved_data.TF_FName,
        TF_FTitle: local_lastsaved_data.TF_FTitle,
        TF_FID_FType: local_lastsaved_data.TF_FID_FType,
        TF_FCenter: local_lastsaved_data.TF_FCenter,
        TF_FColumn: local_lastsaved_data.TF_FColumn,
        TF_FID: local_lastsaved_data.TF_FID
      };

      return !(JSON.stringify(obj1) === JSON.stringify(obj2));
    },
    async getFormTypes(groupID = 114) {
      try {
        const result = await this.$authAxios.$get(
          `/defaults/get/${groupID}?mode=table`
        );
        if (result) {
          // console.log('types', result)
          this.typeArr = result.data.table;
          this.formTypes = this.typeArr.map(item => {
            return item.TD_FName;
          });
          // console.log("formTypes", this.formTypes);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getChildren(id){
      try{
        const result = await this.$authAxios.$get( `/defaults/get/${id}?mode=tablechildren`)
        if(result){
          this.childs = result.data.table[0].children
          // console.log('childs', this.childs)
          this.children = this.childs.map(item => {
            return item.TD_FName
          })
          const ch = this.childs.find(item => this.link.includes(item.TD_FValue4))
          if(ch && this.FID){ 
            // console.log('FID', this.FID)
            this.child = ch.TD_FName
          }
        }
      } catch(error){
        console.log(error)
      }
    },
    setLink(){
      // console.log('child', this.child)
      // console.log('childs', this.childs)
      var ch = this.childs.find(item => item.TD_FName == this.child)
      // console.log('ch', ch)
      if(ch){
        this.link = '/' + ch.TD_FValue4

      }
    }
  },
  watch: {
    type(newValue) {
      var type = this.typeArr.find(item => item.TD_FName == newValue);
      this.data.TF_FID_FType = type.TD_FID;
      this.getChildren(type.TD_FID)
    },
    data(newValue){
      if(newValue.TF_FLink.length > 0){
      this.link = newValue.TF_FLink
    }
    }
  }
};
</script>
<style
  lang="scss"
  src="../../../../assets/style/formBuilder/formBuilder.scss"
></style>
<style>
.main-header-img label {
  top: 0 !important;
}
.main-header-img .uploader {
  padding: 43px !important;
}
</style>
