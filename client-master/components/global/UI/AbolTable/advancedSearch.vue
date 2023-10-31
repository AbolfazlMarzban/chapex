<template>
    <v-row class="adv-search-box">
      <v-col cols="12" v-if="showRemove()" class="d-flex flex-wrap">
        <v-btn rounded class="remove-filters ml-2" @click="removeAllFilters">
          پاک کردن تمام فیلتر ها
          <v-icon style="font-size: 15px !important" class="pr-2" 
            >mdi-delete</v-icon                                         
          >
        </v-btn>
        <template v-for="(item,index) in adv"  class="mx-2" > 
          <v-chip class="filter-chips ma-1" v-if="showChip(item, index)" :key="index">
            {{ showIndex(index) }}:{{item }}             
            <v-avatar left style="cursor: pointer" @click="removeFilter(index)">
              <v-icon>mdi-close-circle</v-icon>
            </v-avatar>
          </v-chip>
        </template>
      </v-col>
      <v-col cols="2" v-for="(head,index) in filteredHeaders" :key="index">
        <label>{{ head.text }}</label>
        <input v-if="head.fieldType == 'عنوان' || head.fieldType == 'متن ساده'" type="text" class="adv-search-input" v-model="advSearch[head.value]" />
        <input
          v-if="head.fieldType == 'شناسه' || head.fieldType == 'عدد'"
          type="number"
          class="adv-search-input"
          v-model="advSearch[head.value]"
        />
        <input
          v-if="head.fieldType == 'تیک'"
          type="number"
          min="0"
          max="1"
          class="adv-search-input"
          v-model="advSearch[head.value]"
        />
        <div v-if="head.fieldType == 'چند انتخابی'" class="group-dialog">
          <v-btn  @click="head.showDialog = !head.showDialog" rounded falt depressed block>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-edit-dialog v-if="head.showDialog" width="250px" >
          <v-text-field label="جستجو...." v-model="groupSearch" class="mx-2">
          </v-text-field>
          <v-treeview
            selectable
            :items="head.tree"
            :search="groupSearch"
            item-key="id"
            v-model="advSearch[head.value]"
            selection-type="independent"
          >
            <template v-slot:append="{ item }" >
              <span class="mr-2">{{ item.id }}</span>
            </template>
          </v-treeview>
        </v-edit-dialog>
        </div>
        <v-row v-if="head.fieldType == 'قیمت'">
          <v-col cols="6" class="pl-1">
            <span>حداقل</span>
            <input
              type="number"
              class="adv-search-input"
              v-model="advSearch[head.value][0]"
            />
          </v-col>
          <v-col cols="6" class="pr-1">
            <span>حداکثر</span>
            <input
              type="number"
              class="adv-search-input"
              v-model="advSearch[head.value][1]"
            />
          </v-col>
        </v-row>
        <v-row v-if="head.fieldType == 'تاریخ'">
          <v-col cols="6" class="pl-1">
            <span>از تاریخ</span>
            <date-picker   v-model="advSearch[head.value][0]" ></date-picker>
          </v-col>
          <v-col cols="6" class="pr-1">
            <span>تا تاریخ</span>
            <date-picker  v-model="advSearch[head.value][1]"></date-picker>
          </v-col>
        </v-row>
        <v-row v-if="head.fieldType == 'ساعت'">
          <v-col cols="6" class="pr-1">
            <span>از ساعت</span>
            <date-picker type="time" v-model="advSearch[head.value][0]"></date-picker>
          </v-col>
          <v-col cols="6" class="pr-1">
            <span>تا ساعت</span>
            <date-picker type="time" v-model="advSearch[head.value][1]"></date-picker>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </template>
  
  <script>
//   import goodsMixin from "../_mixins/goodsMixin";
  export default {
    //   mixins : [ goodsMixin ],
      props: [ "searchHeaders", "data", "customeHeaders"],
      data(){
          return{
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
              defaults: [],
              adv: {}
          }
      },
      mounted(){
        if(this.filteredHeaders){
          for(var i=0; i < this.filteredHeaders.length; i++){
            this.getDefaults(this.filteredHeaders[i])
          }
        }
      },
      computed:{
        filteredHeaders(){
          if(this.customeHeaders){
            var h = []
          for(var i=0; i < this.searchHeaders.length; i++){  
            if(this.searchHeaders[i].filterable == 1){
              h.push(this.searchHeaders[i])
            }
          }
          console.log("h", h) 
          return h
          } else {
            // console.log('boos')
            var heads = this.searchHeaders.filter(item => {
              var b = false
              if(item.filterable == 1){
                b = true
              }
              return b
            })
            // return this.searchHeaders
            return heads
          }
       
        },
        advSearch() {
          var search = {}
          if(this.filteredHeaders){
            console.log('filteredHeaders', this.filteredHeaders)
            for(var i=0; i < this.filteredHeaders.length; i++){
              if(this.filteredHeaders[i].fieldType == 'عنوان' || this.filteredHeaders[i].fieldType == 'متن ساده'){
                search[this.filteredHeaders[i].value] = ''
              } else if (this.filteredHeaders[i].fieldType == 'چند انتخابی'){
                search[this.filteredHeaders[i].value] = []
              } else if (this.filteredHeaders[i].fieldType == 'تیک'){
                search[this.filteredHeaders[i].value] = null
              } else if(this.filteredHeaders[i].fieldType == 'قیمت'){
                search[this.filteredHeaders[i].value] = [null, null]
              } else if(this.filteredHeaders[i].fieldType == 'تاریخ'){
                search[this.filteredHeaders[i].value] = [null, null]
              } else if(this.filteredHeaders[i].fieldType == 'ساعت'){
                search[this.filteredHeaders[i].value] = [null, null]
              } else if (this.filteredHeaders[i].fieldType == 'شناسه' || this.filteredHeaders[i].fieldType == 'عدد'){
                search[this.filteredHeaders[i].value] = null
              }
          }
          this.adv = search
          return search
        }
      },
    },

      methods:{
          getDefaults(head){
            var tree =[]
            if(head.relatedDefault){
              if(this.data.defaults){
                tree = this.data.defaults[head.relatedDefault].map(item => {
                return{
                  id: item.TD_FID,
                  name: item.TD_FName,
                  children: item.children
                }
               })
               for(var i=0; i < this.filteredHeaders.length; i++){
                if(this.filteredHeaders[i].value == head.value){
                  this.filteredHeaders[i].tree = tree
                }
               }
              }
            }
           
              
              //  return tree
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
          showRemove(){
              var searchValues = Object.values(this.advSearch)
              var nullBox = searchValues.filter(item => item == null)
              var emptyBox = searchValues.filter( item => item == "")
              if(nullBox.length + emptyBox.length != searchValues.length){
                  return true
              }
              return false
          },
          showChip(item,index){
            if(item){
              if(item == ''){
              return false
            } else if( item == []){
              return false
            } else if(Array.isArray(item) && item.some(element => element == null)){
              return false
            } else {
              return true
            }
            } else {
              return false
            }
            
          },
          showIndex(index){
            for(var i=0; i < this.filteredHeaders.length; i++){
              if(this.filteredHeaders[i].value == index){
                return this.filteredHeaders[i].text
              }
            }
          },
          // showItem(index, item){
          //   if(index == "group"){
          //     var group = []
          //     for(var i=0; i < item.length; i++){
          //       var gr = this.defaults[272].find(gr => gr.TD_FID == item[i])
          //       if(gr){
          //         group.push(gr.TD_FName)
          //       } else {
          //         this.defaults[272].forEach(element => {
          //           var child = element.children.find(ch => ch.TD_FID == item[i])
          //           if(child){
          //             group.push(child.TD_FName)
          //           }
          //         });
          //       }
          //     }
          //     return group
          //   }
          //   if(index == "type"){
          //     var group = []
          //     for(var i=0; i < item.length; i++){
          //       var gr = this.defaults[207].find(gr => gr.TD_FID == item[i])
          //       if(gr){
          //         group.push(gr.TD_FName)
          //       } else {
          //         this.defaults[207].forEach(element => {
          //           var child = element.children.find(ch => ch.TD_FID == item[i])
          //           if(child){
          //             group.push(child.TD_FName)
          //           }
          //         });
          //       }
          //     }
          //     return group
          //   }
          //            if(index == "mainUnit"){
          //     var group = []
          //     for(var i=0; i < item.length; i++){
          //       var gr = this.defaults[206].find(gr => gr.TD_FID == item[i])
          //       if(gr){
          //         group.push(gr.TD_FName)
          //       } else {
          //         this.defaults[206].forEach(element => {
          //           var child = element.children.find(ch => ch.TD_FID == item[i])
          //           if(child){
          //             group.push(child.TD_FName)
          //           }
          //         });
          //       }
          //     }
          //     return group
          //   }
          //            if(index == "unit"){
          //     var group = []
          //     for(var i=0; i < item.length; i++){
          //       var gr = this.defaults[206].find(gr => gr.TD_FID == item[i])
          //       if(gr){
          //         group.push(gr.TD_FName)
          //       } else {
          //         this.defaults[206].forEach(element => {
          //           var child = element.children.find(ch => ch.TD_FID == item[i])
          //           if(child){
          //             group.push(child.TD_FName)
          //           }
          //         });
          //       }
          //     }
          //     return group
          //   }
          //            if(index == "packaging"){
          //     var group = []
          //     for(var i=0; i < item.length; i++){
          //       var gr = this.defaults[227].find(gr => gr.TD_FID == item[i])
          //       if(gr){
          //         group.push(gr.TD_FName)
          //       } else {
          //         this.defaults[227].forEach(element => {
          //           var child = element.children.find(ch => ch.TD_FID == item[i])
          //           if(child){
          //             group.push(child.TD_FName)
          //           }
          //         });
          //       }
          //     }
          //     return group
          //   }
          //   if(index == "inventory"){
          //     var group = []
          //     for(var i=0; i < item.length; i++){
          //       var gr = this.defaults[222].find(gr => gr.TD_FID == item[i])
          //       if(gr){
          //         group.push(gr.TD_FName)
          //       } else {
          //         this.defaults[222].forEach(element => {
          //           var child = element.children.find(ch => ch.TD_FID == item[i])
          //           if(child){
          //             group.push(child.TD_FName)
          //           }
          //         });
          //       }
          //     }
          //     return group
          //   }
          //   if(index == "brand"){
          //     var group = []
          //     for(var i=0; i < item.length; i++){
          //       var gr = this.defaults[223].find(gr => gr.TD_FID == item[i])
          //       if(gr){
          //         group.push(gr.TD_FName)
          //       } else {
          //         this.defaults[223].forEach(element => {
          //           var child = element.children.find(ch => ch.TD_FID == item[i])
          //           if(child){
          //             group.push(child.TD_FName)
          //           }
          //         });
          //       }
          //     }
          //     return group
          //   }
          //   return item
          // },
          removeAllFilters(){
            for(var i=0; i < this.filteredHeaders.length; i++){
                   if(this.filteredHeaders[i].fieldType == 'عنوان' || this.filteredHeaders[i].fieldType == 'متن ساده'){
                  this.advSearch[this.filteredHeaders[i].value] = ''
                  this.$emit('advSearch', this.advSearch, this.filteredHeaders[i])
                } else if(this.filteredHeaders[i].fieldType == 'تیک'){
                  this.advSearch[this.filteredHeaders[i].value] = null
                  this.$emit('advSearch', this.advSearch, this.filteredHeaders[i])
                } else if(this.filteredHeaders[i].fieldType == 'چند انتخابی'){
                  this.advSearch[this.filteredHeaders[i].value] = []
                  this.$emit('advSearch', this.advSearch, this.filteredHeaders[i])
                } else if(this.filteredHeaders[i].fieldType == 'قیمت' || this.filteredHeaders[i].fieldType == 'تاریخ' || this.filteredHeaders[i].fieldType == 'ساعت' ){
                  this.advSearch[this.filteredHeaders[i].value] = [null, null]
                  this.$emit('advSearch', this.advSearch, this.filteredHeaders[i])
                } else if(this.filteredHeaders[i].fieldType == 'شناسه' || this.filteredHeaders[i].fieldType == 'عدد'){
                  this.advSearch[this.filteredHeaders[i].value] = null
                  this.$emit('advSearch', this.advSearch, this.filteredHeaders[i])
                }
            }
          },
          removeFilter(index){
            for(var i=0; i < this.filteredHeaders.length; i++){
              if(this.filteredHeaders[i].value == index){
                console.log("filterRemove", index)
                console.log(this.filteredHeaders)
                if(this.filteredHeaders[i].fieldType == 'عنوان' || this.filteredHeaders[i].fieldType == 'متن ساده'){
                  this.advSearch[this.filteredHeaders[i].value] = ''
                  this.$emit('advSearch', this.advSearch, this.filteredHeaders[i])
                } else if(this.filteredHeaders[i].fieldType == 'تیک'){
                  this.advSearch[this.filteredHeaders[i].value] = null
                  this.$emit('advSearch', this.advSearch, this.filteredHeaders[i])
                } else if(this.filteredHeaders[i].fieldType == 'چند انتخابی'){
                  this.advSearch[this.filteredHeaders[i].value] = []
                  this.$emit('advSearch', this.advSearch, this.filteredHeaders[i])
                } else if(this.filteredHeaders[i].fieldType == 'قیمت' || this.filteredHeaders[i].fieldType == 'تاریخ' || this.filteredHeaders[i].fieldType == 'ساعت' ){
                  this.advSearch[this.filteredHeaders[i].value] = [null, null]
                  this.$emit('advSearch', this.advSearch, this.filteredHeaders[i])
                } else if(this.filteredHeaders[i].fieldType == 'شناسه' || this.filteredHeaders[i].fieldType == 'عدد'){
                  this.advSearch[this.filteredHeaders[i].value] = null
                  this.$emit('advSearch', this.advSearch, this.filteredHeaders[i])
                }
              }
              // console.log("adv", this.adv)
              // console.log('advSearch', this.advSearch)
            }
          }
      },
     watch:{
      adv:{
          handler(newValue){
              // console.log("fuckingHeader", newValue)
              this.$emit('advSearch', newValue)
          },
          deep: true
      },
      
     }
  
  }
  </script>
   
  <style lang="scss">
  .group-dialog {
    .v-small-dialog__activator {
      position: absolute;
      // margin-top: 60px;
      z-index: 10;
      background: white;
      border-radius: 10px;
      box-shadow: 8px 5px 14px -10px #000000;
    }
  }
  .adv-search-input {
    width: 100%;
  }
  </style>