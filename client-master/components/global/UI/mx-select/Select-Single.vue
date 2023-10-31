<template>
  <!-- hamon selectV4 hast -->
  <div class="mx_Select">
    <!-- <label
      :class="[
        'selectLable',
        { selectLableActive: showSelectedListWithCondition },
      ]"
      >{{ options.label }}</label
    > -->
    <label class="labelInput" v-if="options.label">{{ options.label }}</label>


    <div :class="['mx_selectHeader', { mx_select_disabled: readonly }]">
      <div :class="[
        { multiSelect: select.selectedItem },
        { title_no_bottom_border: showSelectedListWithCondition },
      ]">
        <span v-if="select.selectedItem" @click="clickOnSelectItem" class="singleSelect_seleced">{{
        select.selectedItem[options.fields.name] }}</span>
      </div>
      <input :class="[
        'inputSearch',
        { select_empty_value: select.selectedItem },
        { input_search_no_bottom_border: showSelectedListWithCondition },
      ]" :disabled="readonly" :placeholder="placeholder" ref="selectSearchInput" @keydown.up="setNextCurrentItem(-1)"
        @keydown.down="setNextCurrentItem(+1)" @keydown.enter="addOrRemoveItem(select.currentItem, 'Object')"
        @focus="searchInputFocus" @blur="searchInputBlur" v-model="select.searchValue" />
      <v-icon :class="[
        { selectIconCloseAndOpenRotate: showSelectedListWithCondition },
        'selectIconCloseAndOpen',
      ]" @click="clickOnSelectItem">mdi-chevron-down</v-icon>
      <!-- <v-icon
        @click="refreshSelectMethod"
        :class="['selectIconRefresh' , {'selectIconRefreshAnimation' : refreshSelect}]"
      >mdi-refresh</v-icon>-->
    </div>
    <!-- showSelectedListWithCondition && !readonly -->
    <ul :class="['selectList', { selectList_top: upOrDownOpenList }]"
      v-if="(showSelectedListWithCondition && !readonly && !tableMode)" :style="{ 'max-height': selectListHeight }"
      @mouseenter="mouseenter" @mouseleave="mouseleave">
      <li v-for="(item, index) in labels" :key="index" @click="addOrRemoveItem(item[options.fields.id])" :class="{
        selectListSelected: findByIdInSelectedItem(item[options.fields.id]),
        selectListHover: setCurrentItemClass(item[options.fields.id]),
      }" @mousemove="setCurrentItem(item[options.fields.id])">
        <v-icon class="selected_item_icon" v-if="findByIdInSelectedItem(item[options.fields.id])">mdi-check-bold
        </v-icon>
        {{ item[options.fields.name] }}
        <v-icon class="selectedItem_closeIcon" v-if="
          setCurrentItemClass(item[options.fields.id]) &&
          findByIdInSelectedItem(item[options.fields.id])
        ">mdi-close</v-icon>
      </li>
    </ul>

    <ul v-if="showSelectedListWithCondition && !readonly && tableMode" :class="[
      'selectList',
      { selectList_top: upOrDownOpenList },
      'selectList_tableMode',
    ]" :style="{ 'max-height': selectListHeight }" @mouseenter="mouseenter" @mouseleave="mouseleave">
      <thead>
        <tr>
          <th v-for="(header, index) of tableMode.headers" :key="index">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tr v-for="(item, index) in labels" :key="index" @click="addOrRemoveItem(item[options.fields.id])"
        @mousemove="setCurrentItem(item[options.fields.id])" :class="{
          selectListSelected: findByIdInSelectedItem(item[options.fields.id]),
          selectListHover: setCurrentItemClass(item[options.fields.id]),
        }">
        <td v-for="itemShowList in tableMode.items" :key="itemShowList.field">
          <v-icon class="selected_item_icon" v-if="findByIdInSelectedItem(item[options.fields.id])">mdi-check-bold
          </v-icon>
          <span>{{ item[itemShowList.field] }}</span>
          <v-icon class="selectedItem_closeIcon" v-if="
            setCurrentItemClass(item[options.fields.id]) &&
            findByIdInSelectedItem(item[options.fields.id])
          ">mdi-close</v-icon>
        </td>
      </tr>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    value: {},
    items: {
      type: Array,
      default: [],
    },
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
    rel: {},
    readonly: {},
    allowNull: {
      default: false,
    },
    emptyValue: {
      default: false,
    },
    tableMode: {
      type: Object,
    },
  },
  data() {
    return {
      windowHeight: 0,
      offsetTop: 0,
      refreshSelect: false,
      select: {
        selectList: {
          focus: false,
          hover: false,
        },
        searchInput: {
          value: "",
          items: [],
        },
        selectedItem: null,
        currentItem: null,
        searchMode: false,
        searchValue: "",
        searchedItems: [],
      },
    };
  },
  mounted() {
    this.windowHeight = window.innerHeight;
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  computed: {
    upOrDownOpenList() {
      if (this.options.openTop) {
        return true;
      }
      if (this.options.openBottom) {
        return false;
      }
      const data = this.select.searchMode
        ? this.select.searchedItems
        : this.data;
      const offsetBottom = this.windowHeight - this.offsetTop;

      if (data.length > this.options.count) {
        if (offsetBottom > this.options.count * 40) {
          return false;
        } else {
          return true;
        }
      } else {
        if (offsetBottom > data.length * 40) {
          return false;
        } else {
          return true;
        }
      }
    },
    labels() {
      const data = this.select.searchMode
        ? this.select.searchedItems
        : this.data;
      //   const dataWithoutSelectedItems = data.filter((el) => {
      //     if (this.select.selectedItem) {
      //       return (
      //         this.select.selectedItem[this.options.fields.id] !=
      //         el[this.options.fields.id]
      //       );
      //     }
      //     return true;
      //   });
      //   if (this.select.selectedItem) {
      // return [this.select.selectedItem, ...dataWithoutSelectedItems];
      //   } else {
      return data;
      //   }
    },
    placeholder() {
      if (!this.select.selectedItem || this.select.selectList.focus) {
        if (this.options.searchPlaceholder) {
          return this.options.searchPlaceholder;
        } else {
          return "جستجو...";
        }
      }
    },
    itemsWithConsideringExceptions() { },
    showSelectedListWithCondition() {
      if (this.select.selectList.hover) {
        return true;
      } else {
        return this.select.selectList.focus;
      }
    },
    data() {
      if (this.rel) {
        return this.findRelatedItems(this.rel);
      } else {
        return this.items;
      }
    },
    returnValue() {
      let value = "0";
      if (this.allowNull) {
        value = null;
      }
      if (this.select.selectedItem) {
        value = this.select.selectedItem[this.options.fields.id];
      }
      // }
      return value;
    },
    selectListHeight() {
      const count = this.options.count;
      if (count) {
        return count * 40 + "px";
      }
      return "200px";
    },
  },
  created() {
    this.setSelectedItem(this.value);
  },
  methods: {
    onResize() {
      this.windowHeight = window.innerHeight;
    },
    searchInputFocus() {
      this.offsetTop = this.$refs.selectSearchInput.getBoundingClientRect().top;

      this.select.selectList.focus = true;
    },
    searchInputBlur() {
      this.select.selectList.focus = false;
      // clear current item
      setTimeout(() => {
        this.select.searchValue = "";
        this.select.currentItem = null;
      }, 300);
    },
    mouseenter() {
      this.select.selectList.hover = true;
    },
    mouseleave() {
      this.select.selectList.hover = false;
    },
    setCurrentItem(id) {
      this.select.currentItem = this.findByIdInItem(id);
    },
    clickOnSelectItem() {
      this.$refs.selectSearchInput.focus();
    },
    // use current class for listItems
    setCurrentItemClass(id) {
      const currentItem = this.select.currentItem;
      if (currentItem) {
        if (currentItem[this.options.fields.id] == id) {
          return true;
        }
        return false;
      }
      return false;
    },
    setNextCurrentItem(step) {
      let data = this.labels;
      if (this.select.currentItem) {
        const index = data.indexOf(this.select.currentItem);
        if (index + step < data.length && index + step >= 0) {
          this.select.currentItem = data[index + step];
        }
      } else if (!this.select.currentItem) {
        this.select.currentItem = data[0];
      }
    },
    /// find methods
    addOrRemoveItem(id, entryType) {
      let itemId = null;
      if (entryType == "Object") {
        if (id) {
          itemId = id[this.options.fields.id];
        }
      } else {
        itemId = id;
      }
      // }
      if (itemId) {
        if (this.findByIdInSelectedItem(itemId)) {
          if (this.emptyValue) {
            this.removeFromSelectedItem(itemId);
          }
        } else {
          this.addToSelectedItems(itemId);
        }
        this.$refs["selectSearchInput"].blur();
        this.select.selectList.hover = false;
        this.$emit("input", this.returnValue);
      }
    },
    addToSelectedItems(id) {
      const item = this.findByIdInItem(id);

      if (item) {
        this.select.selectedItem = item;
      }
    },
    removeFromSelectedItem(id) {
      this.select.selectedItem = null;
    },
    findByIdInItem(id) {
      const item = this.data.filter(
        (el) => el[this.options.fields.id] == id
      )[0];
      return item ? item : null;
    },
    //

    findByIdInSelectedItem(id) {
      if (this.select.selectedItem) {
        if (this.select.selectedItem[this.options.fields.id] == id) {
          return this.select.selectedItem;
        }
        return null;
      }
      return null;
    },
    findByIdSearchedValueItems(searchValue) {
      let searchedItem = [];
      if (this.tableMode) {
        for (const [
          index,
          searchField,
        ] of this.tableMode.searchableField.entries()) {
          const searchResult = this.data.filter((el) =>
            el[this.tableMode.searchableField[index]].includes(searchValue)
          );
          if (searchResult.length) {
            for (const item of searchResult) {
              const repItem = searchedItem.filter((el) => el == item);
              if (!repItem.length) {
                searchedItem.push(item);
              }
            }
          }
        }
      } else {
        searchedItem = this.data.filter((el) =>
          el[this.options.fields.search].includes(searchValue)
        );
      }
      return searchedItem.length ? searchedItem : [];
    },
    findRelatedItems(relValue) {
      const items = this.items.filter((el) => el.TD_FID_Group == relValue);
      return items;
    },
    setSelectedItem(newValue) {
      const item = this.findByIdInItem(newValue);
      if (item) {
        this.select.selectedItem = item;
      } else {
        this.select.selectedItem = null;
      }
    },
  },
  watch: {
    "select.searchValue"(newValue) {
      if (newValue.trim()) {
        this.select.searchMode = true;
        this.select.searchedItems = this.findByIdSearchedValueItems(newValue);
      } else {
        this.select.searchMode = false;
      }
    },
    value(newValue) {
      this.setSelectedItem(newValue);
    },
    labels(newValue) {
      if (!newValue.length) {
        this.select.currentItem = null;
      }
    },
  },
};
</script>
<style lang="scss" src="../../../../assets/style/Ul/Select.scss" >

</style>
