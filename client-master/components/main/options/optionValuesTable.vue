<template>
  <v-simple-table class="option_values_table pb-5">
      
      <thead>
        <tr>
          <th>مقدار</th>
          <th>اولیوت</th> 
          <th>کالا / خدمات مرتبط</th>
          <th>عنوان برای نمایش در فاکتور</th>
          <th class="option_value_table_header_count">تعداد</th>
          <th class="option_value_table_header_count">تکرار</th>
          <th>شرح کالا / خدمات</th>
          <!-- <th>پیش نیاز</th>
          <th>خصوصیت انتخابی</th>
          <th>مقدار انتخابی</th> -->
        </tr>
      </thead>
      
      <tbody>
        
        <tr v-for="(item, index) in data" :key="index">
          <td>
            {{ item.TGPV_FID_ValueName }}
          </td>
          <td>
            {{ item.TGPV_FROWNUM }}
          </td>
          <td>
            <ui-select
              :readonly="readonly"
              :options="{
                fields: {
                  id: 'TGO_FID',
                  name: 'TGO_FName',
                  search: 'TGO_FName',
                },
                count: 4
              }"
              :items="defaults['goodsList']"
              v-model="item.TGPV_FID_Product"
              class="option_value_table_select"
            />
          </td>
          <td>
            <!-- عنوان برای نمایش در فاکتور  -->
            <ui-input
              v-model="item.TGPV_FComment"
              class="form_control_textInput my-0"
            />
          </td>
          <td>
            <!-- ضریب تعداد  -->
            <ui-input
              class="form_control_textInput my-0"
              v-model="item.TGPV_FCount"
            />
          </td>
          <td>
            <!-- ضریب تکرار  -->
            <ui-input
              class="form_control_textInput my-0"
              :readonly="readonly"
              v-model="item.TGPV_FRepet" 
            />
          </td>
          <td>
            <v-icon>mdi-file-document-outline</v-icon>
          </td>
          <!-- <td>
            <ui-select
              :options="{
                fields: {
                  id: 'id',
                  name: 'name',
                  search: 'name',
                },
              }"
              :items="TGPD_FID_Type"
              v-model="item.TGPD_FID_Type"
              class="option_value_table_select "
            />
          </td>
          <td>
            <ui-select
              :readonly="readonly"
              :options="{
                fields: {
                  id: 'TD_FID',
                  name: 'TD_FName',
                  search: 'TD_FName',
                },
              }"
              :items="defaults[220]"
              v-model="item.TGPD_FID_OptionDepend"
              @change="getSubValueForDependancy(item.TGPD_FID_OptionDepend)"
              class="option_value_table_select"
            />
          </td>
          <td>
            <ui-select
              :readonly="readonly"
              :options="{
                fields: {
                  id: 'TD_FID',
                  name: 'TD_FName',
                  search: 'TD_FName',
                },
              }"
              v-model="item.TGPD_FID_ValueDepend"
              :items="defaultsDependency2"
              class="option_value_table_select"
            />
          </td> -->
          <td>
            <ui-button
              class="option_value_table_btn"
              label="تایید"
              @click="submit(item)"
            />
          </td>
        </tr>
      </tbody>
  </v-simple-table>

  

</template>

<script>
import OptionsMixins from "./_mixins/optionsMixin";
import "../../../assets/style/Ul/optionValueTable.scss";
import VtDataTable from '../../global/UI/Table/VtDataTable.vue';
export default {
  components: { VtDataTable },
  props: ["data", "defaults"],
  mixins: [OptionsMixins],
  data() {
    return {
      defaultsDependency2: [],
      TGPD_FID_Type: [
        {
          id: 1,
          name: "وابستگی",
        },
        {
          id: 2,
          name: "استثنا",
        },
      ],
    };
  },

  methods: {
    async getSubValueForDependancy(data) {
      const result = await this.getOptions(data);
      this.defaultsDependency2 = result.data.defaults.subGroup;
    },
    submit(data) {
      this.$emit("submit", data);
      // data.TGPD_FID_Goods =
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
