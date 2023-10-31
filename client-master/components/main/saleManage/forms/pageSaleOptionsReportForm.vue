<template>
  <div>
      <v-card color="basil" flat>
        <v-card-text>
          <v-container>
            <v-row>
               <v-col cols="12" md="4" sm="12">
                <ui-select
                :multiple="true"
                :readonly="readonly"
                :options="{
                  fields: {
                    id: '',
                    name: '',
                    search: ''
                  },
                  label: '   نام خصوصیت  ',
                  count: 10
                }"
              />
              <!-- :items="defaults[207]" -->
              </v-col>
                <v-col cols="12" md="4" sm="12" class="sell_page_btns">
                          <v-spacer />

              <ui-button
                class="features_form_final-btn"
                label="  محصولات مشابه     "
              />
            </v-col>
              <v-col cols="12" md="4" sm="12">
              <p class="features_form_attention" mt-5>  
 1. محصولاتی که دارای خصوصیت های مشابه هستند را نمایش میدهد
              <br>
                
  2. ستون مقدار پیش فرض باید با رنگ دیگر و کاملا مشخص باشد 
              </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
