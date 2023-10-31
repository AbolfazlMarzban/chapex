<template>
  <!-- hamon selectV4 hast -->
  <div class="mx_Select" ref="mx_Select">
    <!-- <label
      :class="[
        'selectLable',
        { selectLableActive: showSelectedListWithCondition },
      ]"
      >{{ options.label }}</label
    > -->
    <label class="labelInput">{{ options.label }}</label>

    <div :class="['mx_selectHeader', { mx_select_disabled: readonly }]">
      <div
        :class="[
          'multiSelect',
          { multiSelectBorder: showSelectedListWithCondition },
        ]"
      >
        <div v-for="(selectedItem, index) in select.selectedItems" :key="index">
          <span
            v-if="!limited || index < limited"
            :class="[{ multiSelect_seleced: options.multiple }]"
            @click="addOrRemoveItem(selectedItem[options.fields.id])"
            >{{ selectedItem[options.fields.name] }}</span
          >
        </div>
        <span
          class="multiSelect_lengthSelected"
          v-if="select.selectedItems.length - limited > 0"
          >+ {{ select.selectedItems.length - limited }} مورد بیشتر</span
        >
        <!-- <span v-if="limited">...</span> -->
      </div>
      <input
        class="inputSearch"
        :disabled="readonly"
        :placeholder="options.searchPlaceholder || 'جستجو...'"
        ref="selectSearchInput"
        @keydown.up="setNextCurrentItem(-1)"
        @keydown.down="setNextCurrentItem(+1)"
        @keydown.enter="addOrRemoveItem(select.currentItem, 'Object')"
        @focus="searchInputFocus"
        @blur="searchInputBlur"
        v-model="select.searchValue"
      />
      <v-icon
        :class="[
          { selectIconCloseAndOpenRotate: showSelectedListWithCondition },
          'selectIconCloseAndOpen',
        ]"
        >mdi-chevron-down</v-icon
      >
      <!-- <v-icon
        @click="refreshSelectMethod"
        :class="['selectIconRefresh' , {'selectIconRefreshAnimation' : refreshSelect}]"
      >mdi-refresh</v-icon>-->
    </div>
    <ul
      class="selectList"
      ref="ulList"
      v-if="showSelectedListWithCondition && !readonly"
      :style="{ 'max-height': selectListHeight }"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
    >
      <li
        v-for="(item, index) in labels"
        :id="'li' + item[options.fields.id]"
        :key="index"
        @click="addOrRemoveItem(item[options.fields.id])"
        :class="{
          selectListSelected: findByIdInSelectedItems(item[options.fields.id]),
          selectListHover: setCurrentItemClass(item[options.fields.id]),
        }"
        @mousemove="setCurrentItem(item[options.fields.id])"
      >
        <v-icon
          class="selectedItem_checkIcon"
          v-if="findByIdInSelectedItems(item[options.fields.id])"
          >mdi-check-bold</v-icon
        >
        {{ item[options.fields.name] }}
        <v-icon
          class="selectedItem_closeIcon"
          v-if="
            setCurrentItemClass(item[options.fields.id]) &&
            findByIdInSelectedItems(item[options.fields.id])
          "
          >mdi-close</v-icon
        >
      </li>
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
    limited: {},
  },
  data() {
    return {
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
        selectedItems: [],
        currentItem: null,
        searchMode: false,
        searchValue: "",
        searchedItems: [],
      },
    };
  },
  computed: {
    labels() {
      const data = this.select.searchMode
        ? this.select.searchedItems
        : this.data;
      const dataWithoutSelectedItems = data.filter((el) => {
        let isThere = true;
        for (const selectedItem of this.select.selectedItems) {
          if (
            selectedItem[this.options.fields.id] == el[this.options.fields.id]
          ) {
            return false;
          }
        }
        return true;
      });
      return [...this.select.selectedItems, ...dataWithoutSelectedItems];
    },
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
      let value = [];
      for (const item of this.select.selectedItems) {
        value.push({
          TD_FID: item[this.options.fields.id],
          TD_FName: item[this.options.fields.name],
        });
      }

      if (this.options.returnType == "String") {
        const stringValue = value.join(",");
        return stringValue;
      } else {
        return value;
      }
    },
    selectListHeight() {
      const count = this.options.count;
      if (count) {
        return count * 35 + "px";
      }
      return "200px";
    },
    computedValue() {
      if (this.options.returnType == "String") {
        let value = this.value.length ? this.value : "";
        return value.split(",");
      } else {
        this.value;
      }
    },
  },
  created() {
    this.setSelectedItems(this.value);
  },
  mounted() {
    this.needChangePlaceOFListItems();
    // this.select.selectedItems = this.value;
    // if (this.value) {
    //   for (const item of this.value) {
    //     this.select.selectedItems.push(item);
    //   }
    // }
  },
  methods: {
    setValue() {},
    searchInputFocus() {
      this.select.selectList.focus = true;
    },
    searchInputBlur() {
      this.select.selectList.focus = false;
      // clear current item
      this.select.currentItem = null;
    },
    mouseenter() {
      this.select.selectList.hover = true;
    },
    mouseleave() {
      this.select.selectList.hover = false;
    },

    setCurrentItem(id) {
      this.select.currentItem = this.findByIdInItems(id);
    },
    // use current class for listItems
    setCurrentItemClass(id) {
      if (this.select.currentItem) {
        return this.select.currentItem[this.options.fields.id] == id
          ? true
          : false;
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
        let listItems = this.$refs["ulList"];
        let currentItem = document.getElementById(
          "li" + this.select.currentItem[this.options.fields.id]
        );
        listItems.scroll(0, currentItem.offsetTop);
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
        if (this.findByIdInSelectedItems(itemId)) {
          this.removeFromSelectedItem(itemId);
        } else {
          this.addToSelectedItems(itemId);
        }
        // console.log(this.returnValue);
        this.$emit("input", this.returnValue);
      }
    },
    addToSelectedItems(id) {
      const item = this.findByIdInItems(id);
      if (item) {
        this.select.selectedItems.push(item);
      }
    },
    removeFromSelectedItem(id) {
      this.select.selectedItems = this.select.selectedItems.filter(
        (el) => el[this.options.fields.id] != id
      );
    },
    // ok
    findByIdInItems(id) {
      const item = this.data.filter(
        (el) => el[this.options.fields.id] == id
      )[0];
      return item;
    },
    //
    findByIdInSelectedItems(id) {
      const item = this.select.selectedItems.filter(
        (el) => el[this.options.fields.id] == id
      )[0];
      return item;
    },
    findByIdSearchedValueItems(searchValue) {
      const searchedItem = this.data.filter((el) =>
        el[this.options.fields.search].includes(searchValue)
      );
      return searchedItem.length ? searchedItem : [];
    },
    findRelatedItems(relValue) {
      const items = this.items.filter((el) => el.TD_FID_Group == relValue);
      return items;
    },
    setSelectedItems(newValue) {
      const values = newValue;
      // this.select.selectedItems = [];
      if (values) {
        for (const value of values) {
          if (!this.findByIdInSelectedItems(value)) {
            const item = this.findByIdInItems(value);
            if (item) {
              this.select.selectedItems.push(item);
            }
          }
        }
      }
    },
    needChangePlaceOFListItems() {
      let body = document.body,
        html = document.documentElement;

      let height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      let listItems = this.$refs["mx_Select"];
      let listItemsUl = this.$refs["ulList"];
      if (
        height <
        listItems.getBoundingClientRect().bottom +
          window.scrollY +
          this.options.count * 35
      ) {
        this.select.selectList.top = true;
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
      if (newValue) {
        this.setSelectedItems(this.computedValue);
        this.select.selectedItems = this.value;
      }
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
