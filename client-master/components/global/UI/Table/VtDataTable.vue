<template>
  <v-container
    fluid
    :class="`VueTables VueTables--${props.source}`"
    slot-scope="props" 
    >
    <v-row class="justify-center" style="background: white;">
      <!-- تعداد نمایش اطلاعات -->
     <v-col
        lg="8"
        v-if="props.perPageValues.length > 1"
        :class="`${props.theme.field} ${props.theme.inline} ${props.theme.right} VueTables__limit d-flex justify-center`"
      >
        <vnodes :vnodes="props.slots.beforeLimit" />
        <vt-per-page-selector/>
          <vt-pagination class />
        <vnodes :vnodes="props.slots.afterLimit" />
      </v-col>
 
      <!-- <v-spacer />  -->
      <!-- فیلد جستوجو کلی  -->
      <!-- <v-col
					:cols="props.perPageValues.length > 1 ? '10' : '12'"
					class="SearchInTable rtl"
				>
					<v-row>
						<v-col cols="3" class="mt-0 dis-flex pb-2 pt-2">
							<input
								type="text"
								v-model.trim="searchValue"
								@keypress.enter="globalSearch = searchValue"
								placeholder="جستجو ..."
							/>
							<button>
								<v-icon
									class="TableGlobalSearch_Input_icon"
									@click="globalSearch = searchValue"
									>mdi-magnify</v-icon
								>
							</button>
						</v-col>

						<v-col
							cols="1"
							:class="[
								' TableRefreshImg pt-1 pl-0 pb-0',
								{ TableRefreshImgAnimation: refresh },
							]"
						>
      < <img src="/refresh.png" @click="refreshClick" />-->
      <!-- <v-icon @click="refreshClick" class="TableRefresh_Icon">
								mdi-refresh
							</v-icon>
      </v-col>-->
      <!-- <v-col cols="1" class="TableDeleteImg pt-2 pb-0 pr-0"> -->
      <!-- <img src="/delete.png" /> -->
      <!-- <v-icon class="TableDelete_Icon"> mdi-delete </v-icon>
						</v-col>
					</v-row>
      </v-col>-->
    </v-row>

    <!-- فیلدهای نمایش جستوجو در هر ستون 
     <v-col cols="12" class="p-0">
				<div
					v-if="!props.opts.filterByColumn && props.opts.filterable"
					:class="`${props.theme.field} ${props.theme.inline} ${props.theme.left} VueTables__search`"
				>
					<vnodes :vnodes="props.slots.beforeFilter" />
					<vt-generic-filter />
					<vnodes :vnodes="props.slots.afterFilter" />
				</div>
    </v-col> -->

    <vnodes :vnodes="props.slots.beforeTable" />
    <div class="table-responsive">
      <!-- جدول -->
      <vt-table ref="vt_table" />
    </div>
    <vnodes :vnodes="props.slots.afterTable" />
  </v-container>
</template>

<script>
import VtColumnsDropdown from "vue-tables-2/compiled/components/VtColumnsDropdown";
import VtTableHeading from "vue-tables-2/compiled/components/VtTableHeading";
import VtFiltersRow from "vue-tables-2/compiled/components/VtFiltersRow";

import VtDropdownPagination from "vue-tables-2/compiled/components/VtDropdownPagination";
import VtGenericFilter from "vue-tables-2/compiled/components/VtGenericFilter";
import VtPerPageSelector from "vue-tables-2/compiled/components/VtPerPageSelector";
import VtPagination from "vue-tables-2/compiled/components/VtPagination";
import VtTable from "vue-tables-2/compiled/components/VtTable";

export default {
  data() {
    return {
      globalSearch: "",
      searchValue: "",
    };
  },
  name: "VtDataTable",
  props: ["props"],
  components: {
    VtGenericFilter,
    VtTableHeading,
    VtFiltersRow,
    VtPerPageSelector,
    VtColumnsDropdown,
    VtDropdownPagination,
    VtTable,
    VtPagination,
    vnodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  computed: {
    refresh() {
      return this.$store.getters["tableRefresh/refresh"];
    },
  },
  methods: {
    refreshClick() {
      this.$store.dispatch("tableRefresh/refreshButtonClicked");
    },
  },
  watch: {
    globalSearch(newValue) {
      this.$store.dispatch("table/setSearch", newValue);
    },
    searchValue(newValue) {
      // گرفتن اطلاعات اولیه در صورت خالی بودن فبلد جستجو
      if (newValue === "") {
        this.globalSearch = "";
      }
    },
  },
};
</script>