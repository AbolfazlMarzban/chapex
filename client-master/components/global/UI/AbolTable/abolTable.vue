<template>
  <div>
    <v-card color="basil" class="product_form_container">
      <v-row>
        <v-col cols="12" class="pr-10 py-5 d-flex justify-center">
          <v-btn class="remove-filters mx-2" rounded @click="showSearchBox = !showSearchBox"
            style="background: #930149 !important; color: white !important">جستجو</v-btn>
          <v-btn class="remove-filters mx-2" rounded @click="tableSize">تغییر عرض ستون</v-btn>
          <v-btn class="remove-filters mx-2" rounded @click="showTableBuilder = true">تنظیمات جدول</v-btn>
          <v-btn class="remove-filters mx-2" rounded @click="saveTable" :disabled="isSaved" :loading="isSaved">ذخیره ی
            جدول
            <v-icon class="mr-2">mdi-content-save</v-icon>
          </v-btn>
          <v-menu bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="remove-filters mx-2" v-bind="attrs" v-on="on" rounded>خروجی جدول <v-icon
                  class="mr-2">mdi-file-export</v-icon>
              </v-btn>
            </template>
            <v-list class="export-list">
              <v-list-item class="export-list-item">
                <download-excel :data="json_data" class="btn btn-default" worksheet="My Worksheet" :name="exportName">
                  <v-list-item-title>
                    <v-icon>mdi-file-excel</v-icon>
                    Excel</v-list-item-title>
                </download-excel>
              </v-list-item>
              <!-- <v-list-item>
                <v-list-item-title>
                  <v-icon>mdi-file-pdf-box</v-icon>
                  PDF
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-icon>mdi-file-word</v-icon>
                  word</v-list-item-title
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-icon>mdi-file-jpg-box</v-icon>
                  JPG</v-list-item-title
                >
              </v-list-item> -->
            </v-list>
          </v-menu>
        </v-col>
        <v-spacer />
      </v-row>
    </v-card>

    <ui-table-builder @newTable="newTable" :tableFields="tableFields" :customHeaders="customHeaders"
      @closeDialog="showTableBuilder = false" :showTableBuilder="showTableBuilder"></ui-table-builder>

    <v-data-table v-if="tableKey" :headers="customHeaders" :items="setData()" class="goodsCustomeTable" show-select
      :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" v-model="selected" hide-default-header :item-key="tableKey">

      <template v-slot:top>
        <ui-advanced-search v-if="showSearchBox" class="mx-6 mb-10" @advSearch="advSearch" :data="tableData"
          :searchHeaders="customHeaders" :customeHeaders="customizedHeaders"></ui-advanced-search>
      </template>

      <template v-slot:header="{ props }">
        <thead>
          <tr>
            <th v-for="head in props.headers" :key="head.order" class="text-center pt-2"
              :style="`width: ${head.width}px`">
              <span class="custome-head">
                {{ head.text }}
              </span>
              <v-icon @click="sortColumn(head.value)" v-if="sortDesc" style="font-size: 12px">mdi-arrow-up</v-icon>
              <v-icon @click="sortColumn(head.value)" v-if="!sortDesc" style="font-size: 12px">mdi-arrow-down</v-icon>
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:body="{ items }">
        <tr v-for="(item, index) in items" :key="index" style="border-bottom: 1px solid lightgray" class="abol-rows">
          <td class="justify-center text-center" style="width:10px">
            <input type="checkbox" @click="selectItem(item, $event)" />
          </td>
          <td v-for="header in customHeaders" :key="header.ID" class="text-center" :id="header.value">

            <NuxtLink v-if="header.fieldType == 'عنوان'" style="cursor: pointer; color: #016670"
              class="pb-1 px-2 font-weight-black" :to="`${header.pattern}${item[header.ID]}`">
              {{ item[header.value] }}
            </NuxtLink>

            <span v-else-if="header.fieldType == 'چند انتخابی' && tableData.defaults">
              {{ showDefault(item[header.value], header.relatedDefault) }}
            </span>

            <span v-else-if="header.fieldType == 'تیک'">
              <v-icon v-if="item[header.value] == 1" color="#016670" style="font-size: 20px">mdi-check</v-icon>
              <v-icon v-else color="red">mdi-close</v-icon>
            </span>

            <span v-else-if="header.fieldType == 'قیمت'">
              {{ numberWithCommas(item[header.value]) }}
            </span>

            <span v-else-if="header.fieldType == 'دکمه'">
              <v-btn v-if="header.icon" icon :to="`${header.pattern}${item[header.ID]}`">
                <v-icon>{{ header.icon }}</v-icon>
              </v-btn>
              <v-btn v-else :to="`${header.pattern}${item[header.ID]}`">
                {{ header.text }}
              </v-btn>
            </span>

            <span v-else>
              {{ item[header.value] }}
            </span>

          </td>
        </tr>
      </template>

    </v-data-table>
    <!-- <downloadExcel></downloadExcel> -->
  </div>
</template>

<script>
// import goodsMixin from '../_mixins/goodsMixin';
import "../../../../assets/style/goods/goods.scss"
import "../../../../assets/style/tableHeaders/tableHeaders.scss"
import "../../../../assets/style/formsStyle/form.scss"
export default {
  props: ["update", "tableData", "title"],
  // mixins: [ goodsMixin ] ,
  middleware: ["init-auth", "init-cart"],
  data() {
    return {
      data: [],
      selected: [],
      defaults: [],
      advanced: null,
      searchHeaders: [],
      sortBy: '',
      sortDesc: false,
      headers: [],
      showSearchBox: false,
      showTableBuilder: false,
      json_data: [],
      customizedHeaders: null,
      saveT: false,
      itemChecked: false,
      id: "",
      advTable: [],
      date: '',
      exportName: '',
      isSaved: false,
    }
  },
  mounted() {
    var date = new Date()
    var options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }
    // console.log('today',date.toLocaleDateString("fa-IR", options))
    this.date = date.toLocaleDateString("fa-IR", options)
    if (this.title) {
      this.exportName = `${this.title.fa} -- ${this.date} `
    }
    // console.log(this.exportName)
  },
  computed: {
    defaultHeaders() {
      let _userHeaders = null

      if (this.tableData.tableHeaders) {
        _userHeaders = this.tableData.tableHeaders.filter(h => h.TABL_FID_User == null)
      }

      return _userHeaders
    },

    userHeaders() {
      let _userHeaders = null

      if (this.tableData.tableHeaders) {
        _userHeaders = this.tableData.tableHeaders.filter(h => h.TABL_FID_User == this.User.TU_FID)
        if (_userHeaders.length == 0)
          _userHeaders = this.tableData.tableHeaders
      }

      return _userHeaders
    },
    tableFields() {
      if (this.tableData.tableHeaders) {
        var tFields = []
        for (var i = 0; i < this.tableData.tableHeaders.length; i++) {
          var item = this.tableData.tableHeaders[i]
          if (item.TABL_FieldType == 'شناسه') {
            var id = item.TABL_FFieldName
          }
          var field = {
            text: item.TABL_FFieldTitle,
            value: item.TABL_FFieldName,
            sortable: false,
            align: 'center',
            filterable: false,
            showDialog: false,
            fieldType: item.TABL_FieldType,
            relatedDefault: item.TABL_FID_RelatedDefault
          }
          tFields.push(field)
        }
        for (var i = 0; i < tFields.length; i++) {
          if (tFields[i].fieldType == 'عنوان') {
            tFields[i].ID = id
          }
        }
      }
      // console.log(tFields)
      return tFields
    },
    customHeaders() {
      if (this.customizedHeaders) {
        // console.log('customizedHeaders', this.customizedHeaders)
        return this.customizedHeaders
      } else {
        if (this.headers.length == 0) {
          if (this.userHeaders) {
            for (var i = 0; i < this.userHeaders.length; i++) {
              var userItem = this.userHeaders[i]
              var defaultItem = this.defaultHeaders.find(dh => dh.TABL_FFieldName == userItem.TABL_FFieldName)

              if (userItem.TABL_FieldType == 'شناسه') {
                this.id = userItem.TABL_FFieldName
              }

              if (userItem.TABL_FDefault == 1) {
                var head = {
                  text: userItem.TABL_FFieldTitle,
                  value: userItem.TABL_FFieldName,
                  sortable: false,
                  align: 'center',
                  showDialog: false,
                  fieldType: userItem.TABL_FieldType,
                  relatedDefault: userItem.TABL_FID_RelatedDefault,
                  order: userItem.TABL_FOrder,
                  width: userItem.TABL_FDefaultWidth,
                  filterable: userItem.TABL_FFiltrable,
                  pattern: defaultItem ? defaultItem.TABL_FUrlPattern : '',
                  icon: defaultItem ? defaultItem.TABL_FIcon : '',
                }

                this.headers.push(head)
              }
            }
          }
        }

        for (var i = 0; i < this.headers.length; i++) {
          if (this.headers[i].fieldType == 'عنوان' || this.headers[i].fieldType == 'دکمه') {
            this.headers[i].ID = this.id
          }
        }
        return this.headers
      }

    },
    tableKey() {
      if (this.tableData && this.tableData.tableHeaders) {
        for (var i = 0; i < this.tableData.tableHeaders.length; i++) {
          var item = this.tableData.tableHeaders[i]
          if (item.TABL_FieldType == 'شناسه') {
            return item.TABL_FFieldName
          }
        }
      }

      return null
    },
  },

  methods: {
    selectItem(item, event) {
      // console.log(item)
      // console.log(event.target.checked)
      if (event.target.checked) {
        this.selected.push(item)
      } else {
        var index = this.selected.findIndex(s => s === item)
        //  console.log(index)
        this.selected.splice(index, 1)
      }
    },
    async saveTable() {
      this.saveT = !this.saveT
      var data = this.tableData.tableHeaders
      const a = this.$store.getters["login/getUserData"]();
      // console.log('user', a.TU_FID)
      // console.log('custom', this.customHeaders)
      data.forEach(item => {
        item.TABL_FID_User = parseInt(a.TU_FID)
        var index = this.customHeaders.findIndex(head => head.value == item.TABL_FFieldName)
        item.TABL_FOrder = index
        // console.log('index', index)
        if (index != -1) {
          item.TABL_FDefault = 1
          var fildex = this.customHeaders.findIndex(head => {
            var s = false
            if (head.filterable) {
              if (head.value == item.TABL_FFieldName && head.filterable == true) {
                s = true
              }
            }
            return s
          }) 
          if (fildex != -1) {
            item.TABL_FFiltrable = 1
          } else {
            item.TABL_FFiltrable = 0
          }
          // console.log('fildex', fildex)
          var width = document.getElementById(`${item.TABL_FFieldName}`).offsetWidth
          item.TABL_FDefaultWidth = width
        } else {
          item.TABL_FDefault = 0
        }
      })

      // console.log('abolData', data)   

      try {
        let result;
        result = await this.$authAxios.$post("abolTable/", {
          data
        })
        this.isSaved = true
        if (result) {
          this.showResponseSuccessMessages(result);
          this.isSaved = false
          return result;
        }
      }
      catch (error) {
        console.log(error);
        this.showResponseErrors(error);
      }
      // console.log("saveTable")
    },
    newTable(value) {
      // console.log("newTable", value)
      this.showTableBuilder = false
      this.customizedHeaders = value
    },
    setData() {
      if (this.advanced) {
        return this.advanced
      } else {
        this.getCustomeTable()
        return this.data
      }
    },
    getCustomeTable() {
      // console.log("tableData", this.tableData)
      if (this.tableData) {
        this.data = this.tableData.table
        this.defaults = this.tableData.defaults
      }
    },
    showDefault(value, def) {
      var gr = this.tableData.defaults[def].find(item => item.TD_FID == value)
      if (gr) {
        return gr.TD_FName
      } else {
        for (var i = 0; i < this.tableData.defaults[def].length; i++) {
          this.tableData.defaults[def][i].children.forEach(
            child => {
              if (child.TD_FID == value) {
                gr = this.tableData.defaults[def][i].TD_FName + '-' + child.TD_FName
              }
            }
          )
        }

        if (gr) {
          return gr
        }
      }
    },
    showGroup(item) {
      var gr = this.defaults[272].find(group => group.TD_FID == item)
      if (gr) {
        return gr.TD_FName
      } else {
        for (var i = 0; i < this.defaults[272].length; i++) {
          this.defaults[272][i].children.forEach(
            child => {
              if (child.TD_FID == item) {
                gr = child.TD_FName
              }
            }
          )
        }
        if (gr) {
          return gr
        }
      }
    },
    showBrand(item) {
      var br = this.defaults[223].find(brand => brand.TD_FID == item)
      if (br) {
        return br.TD_FName
      } else {
        for (var i = 0; i < this.defaults[223].length; i++) {
          this.defaults[223][i].children.forEach(
            child => {
              if (child.TD_FID == item) {
                br = child.TD_FName
              }
            }
          )
        }
        if (br) {
          return br
        }
      }
    },
    showType(item) {
      var br = this.defaults[207].find(brand => brand.TD_FID == item)
      if (br) {
        return br.TD_FName
      } else {
        for (var i = 0; i < this.defaults[207].length; i++) {
          this.defaults[207][i].children.forEach(
            child => {
              if (child.TD_FID == item) {
                br = child.TD_FName
              }
            }
          )
        }
        if (br) {
          return br
        }
      }
    },
    showTypeSale(item) {
      var br = this.defaults[222].find(brand => brand.TD_FID == item)
      if (br) {
        return br.TD_FName
      } else {
        for (var i = 0; i < this.defaults[222].length; i++) {
          this.defaults[222][i].children.forEach(
            child => {
              if (child.TD_FID == item) {
                br = child.TD_FName
              }
            }
          )
        }
        if (br) {
          return br
        }
      }
    },
    tableSize() {
      var tables = document.getElementsByClassName('goodsCustomeTable');
      for (var i = 0; i < tables.length; i++) {
        resizableGrid(tables[i]);
      }
      function resizableGrid(table) {
        var row = table.getElementsByTagName('tr')[0],
          cols = row ? row.children : undefined;
        if (!cols) return;

        table.style.overflow = 'hidden';
        var tableHeight = table.offsetHeight;
        for (var i = 0; i < cols.length; i++) {
          var div = createDiv(tableHeight);
          // console.log("div", div)
          cols[i].appendChild(div);
          cols[i].style.position = 'relative';
          setListeners(div);
        }

        function setListeners(div) {
          var pageX, curCol, nxtCol, curColWidth, nxtColWidth;
          div.addEventListener('mousedown', (e) => {
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
                nxtCol.style.width = (nxtColWidth + (diffX)) + 'px';

              curCol.style.width = (curColWidth - diffX) + 'px';
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

        function createDiv(height) {
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

        function paddingDiff(col) {

          if (getStyleVal(col, 'box-sizing') == 'border-box') {
            return 0;
          }

          var padLeft = getStyleVal(col, 'padding-left');
          var padRight = getStyleVal(col, 'padding-right');
          return (parseInt(padLeft) + parseInt(padRight));
        }

        function getStyleVal(elm, css) {
          return (window.getComputedStyle(elm, null).getPropertyValue(css))
        }
      }
    },
    advSearch(value) {
      var advTable = this.tableData.table
      // console.log('value', value)
      for (var index in value) {
        var head = this.customHeaders.find(item => item.value == index)
        if (head.fieldType == 'عنوان' || head.fieldType == 'متن ساده' || head.fieldType == 'شناسه' || head.fieldType == 'عدد') {
          if (value[head.value] && value[head.value].length > 0) {
            advTable = advTable.filter(item => item[head.value].includes(value[head.value]))
          }
        }
        if (head.fieldType == 'تیک') {
          if (value[head.value]) {
            advTable = advTable.filter(item => item[head.value] == value[head.value])
          }
        }
        if (head.fieldType == 'قیمت' || head.fieldType == 'تاریخ' || head.fieldType == 'ساعت') {
          if (!value[head.value].some(element => element == null)) {
            console.log(value[head.value])
            advTable = advTable.filter(item => {
              var pok = false
              if (item[head.value] >= value[head.value][0] && item[head.value] <= value[head.value][1]) {
                pok = true
              }
              return pok
            })
          }
        }
        if (head.fieldType == 'چند انتخابی') {
          if (value[head.value].length > 0) {
            advTable = advTable.filter(item => {
              var x = false
              for (var i = 0; i < value[head.value].length; i++) {
                if (item[head.value] == value[head.value][i]) {
                  // console.log(value[head.value][i])
                  x = true
                }
              }
              return x
            })
          }
        }
      }
      if (advTable) {
        // console.log("advTable", advTable)
        this.advanced = advTable
      }
    },
    numberWithCommas(e) {
      return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    sortColumn(value) {
      // console.log(value)
      this.sortBy = value.toString()
      this.sortDesc = !this.sortDesc
    }
  },
  watch: {
    selected(newValue) {
      // console.log(newValue)
      this.$emit("select", newValue)
    },
    update(newValue) {
      // console.log(newValue)
      this.getCustomeTable()
      this.selected = []
    },
    saveT(newValue) {
      // console.log("saveTable", newValue)
      var cols = document.getElementsByTagName('th')
      var widths = []
      for (var i = 0; i < cols.length; i++) {
        widths.push(cols[i].offsetWidth)
      }
      // console.log("widths", widths)
      // console.log("user : ", a);   
      var obj = {
        header: this.headers,
        columnWidth: widths,
      }
      // console.log("obj", obj)
      var excelJson = []
      var data = this.setData()
      data.map(dat => {
        var obj = {}
        for (var i = 0; i < this.customHeaders.length; i++) {
          var ob = {
            [this.customHeaders[i].text]: dat[this.customHeaders[i].value]
          }
          obj = Object.assign(ob, obj)
        }
        excelJson.push(obj)
      })
      // console.log('excelJson', excelJson)  
      this.json_data = excelJson
    }
  },
}
</script>


<style lang="scss">
.abol-rows:nth-child(even) {
  background: #e6e6e6;
}

.abol-rows {
  td {
    border-radius: 0px !important;
  }
}

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