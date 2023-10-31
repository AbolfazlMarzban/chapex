<template>
  <v-dialog v-model="openItem" width="500 " :fullscreen="$vuetify.breakpoint.xsOnly">
    <v-card>
      <v-card-title class="d-flex justify-end">
        <v-icon @click="$emit('closeItem')">mdi-close-circle</v-icon>
      </v-card-title>
      <div class="order-page pa-xl-4 pa-lg-4 pa-md-4 pa-sm-4 pa-3 pt-0" v-if="salePage">
        <v-row class="align-center" style="width: 100%; margin: 0px;">
          <v-col cols="4" xl="3" lg="3" md="4" sm="4" class="pl-0">
            <img v-if="picture" :src="setImageUrl(picture.path)" :alt="picture.alt" class="img-responsive" />
          </v-col>
          <v-col v-if="salePage && item" cols="8" xl="6" lg="6" md="8" sm="8" class="d-flex flex-column">
            <label class="my-lbl-title-16" style="color: #016670 !important">{{ salePage.TPS_FTitle }}</label>
            <span class="my-fn-14">({{ getProductName(salePage, item.TOD_FID_Goods) }})</span>
            <p class="my-lbl-title-14 mb-0" style="color: #016670 m !important"> تیراژ سفارش: {{ item.TOD_FCount }}</p>
            <!-- <span>{{ date }}</span> -->
            <span>{{ item.TOD_FDateReg }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-expansion-panels accordion class="order-panels mt-xl-5 mt-lg-5">
              <v-expansion-panel>
                <v-expansion-panel-header style="box-shadow: none !important">
                  تیراژ انتخابی
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <CartItemTiraj :salePage="salePage" :item="item" :finalPrice="finalPrice" />

                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel v-if="selectDesignOptionValues(salePage, item.TOD_FID_SelectedOptions).length > 0">

                <v-expansion-panel-header>
                  وضعیت طراحی سفارش
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <CartItemDesignStatus :salePage="salePage" :item="item" :finalPrice="finalPrice" />
                </v-expansion-panel-content>

              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header> مشخصات تولیدی محصول </v-expansion-panel-header>

                <v-expansion-panel-content class="text-center pt-0">
                  <CartItemOptions :salePage="salePage" :item="item" />
                </v-expansion-panel-content>

              </v-expansion-panel>

            </v-expansion-panels>

            <v-row>
              <v-col cols="12">
                <v-row style="width: 100%; margin: 0px;background: #D9D9D9; border-radius: 15px;">
                  <v-col cols="12" class="d-flex align-center justify-space-between"
                    style="border: 1px solid rgba(140, 140, 140, 0.2); border-radius: 15px;">
                    <p class="mb-0" style="font-weight: bold;">قیمت سفارش:</p>
                    <span class="my-green my-lbl-title-16">
                      <!-- <ICountUp :endVal="finalPrice" /> تومان -->
                      {{ numberSeparate(Math.round(finalPrice)) }}
                    </span>
                  </v-col>
                </v-row>
              </v-col>
              <!-- <v-col cols="12" xl="5" lg="5" md="12">
                    <v-row style="width: 100%; margin: 0px;">
                        <v-col cols="12" class="d-flex align-center justify-space-between" style="border: 1px solid rgba(140, 140, 140, 0.2); border-radius: 5px;">
                            <p class="mb-0">قیمت سفارش:</p>
                            <span class="my-green my-lbl-title-16">
                    <ICountUp :endVal="calcPriceInCart(salePage, item.TOD_FID_Goods, item.TOD_FID_SelectedOptions,
                        item.TOD_FCount, 1, item.TOD_FDesignStatus, item.TOD_FReviewNeed)" /> تومان
                </span>
                        </v-col> -->
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import userSaleMixin from "../../sale/_mixins/userSaleMixin"
import saleDataMixin from "../../sale/_mixins/saleDataMixin"
import designMixin from "../../sale/_mixins/designMixin";
import cartDetailMixins from '../../cart/_mixins/cartDetailMixins';
import ICountUp from 'vue-countup-v2';

export default {
  props: ["openItem", "salePage", "item", "picture", "date", "finalPrice"],
  mixins: [userSaleMixin, saleDataMixin, cartDetailMixins, designMixin],
  components: { ICountUp }
}
</script>

<style lang="scss">
@charset "UTF-8";

.order-item {
  width: 100%;
  margin: auto;
}

.status-chip {
  width: 100%;
  justify-content: center;
  background: #d9d9d9;

  span {
    font-family: boldbakhtiari !important;
    color: #016670;
  }
}

.order-panels {
  .v-expansion-panel-header {
    font-family: bakhtiari !important;
  }

  .v-expansion-panel-header--active {
    font-family: boldbakhtiari !important;
    color: #016670;
  }

  .v-expansion-panel-header__icon {
    margin-left: 0px;
    margin-right: auto;
  }

  .v-expansion-panel::before {
    box-shadow: none !important;
  }
}

.order-log {
  li {
    font-family: boldbakhtiari !important;
    color: black;

    span {
      padding-right: 10px;
      font-family: boldbakhtiari !important;
      color: #016670;
    }
  }
}

.order-alarm {
  span {
    margin-top: 15px;
    font-size: 14px;
    color: red;
  }
}

.order-panels {
  .v-expansion-panel-content__wrap {
    padding: 10px;
  }
}
</style>