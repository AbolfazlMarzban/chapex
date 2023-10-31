import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons"; // Ensure you are using css-loader
import Vue from "vue";
import Vuetify from "vuetify/lib";
// import Input from './../components/UI/Input'
// library.add(fas)

// Vue.component('font-awesome-icon', FontAwesomeIcon)
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// UI global components
// import Input from "./../components/UI/Input";
// import DataPicker from "./../components/UI/DataPicker";
// import Button from "./../components/UI/Button";
// import Select from "../components/UI/Select"

import Table from "vue-tables-2";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import VtDataTable from "../components/global/UI/Table/VtDataTable.vue";
import VtTable from "../components/global/UI/Table/VtTable";
import VtGenericFilter from "../components/global/UI/Table/VtGenericFilter";
import VtSortControl from "../components/global/UI/Table/VtSortControl";
import VtPagination from "../components/global/UI/Table/VtPagination";
import VtPerPageSelector from "../components/global/UI/Table/VtPerPageSelector";
import VtTableHeading from "../components/global/UI/Table/VtTableHeading";
import VtFiltersRow from "../components/global/UI/Table/VtFiltersRow";

Vue.use(Table.ClientTable, {}, false, "bootstrap4", {
  table: VtTable,
  genericFilter: VtGenericFilter,
  dataTable: VtDataTable,
  sortControl: VtSortControl,
  pagination: VtPagination,
  perPageSelector: VtPerPageSelector,
  tableHeading: VtTableHeading,
  filtersRow: VtFiltersRow
});



Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("date-picker", VuePersianDatetimePicker);
library.add(fas);
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "fa"
  },
});

const components = {
  // DataPicker
  // Input,
  // Button,
  // Select
};

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component);
});
