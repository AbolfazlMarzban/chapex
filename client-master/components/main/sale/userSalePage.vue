<template>
  <div>
    <ui-loading v-if="loading" />

    <v-container v-else>

      <v-row>
        <LazySideContent />

        <LazyMainContent />
      </v-row>

      <LazyBottomContent class="mt-xl-3 mt-lg-3 mt-md-3 mt-12 mb-14" />

      <LazyDesktopFooter class="d-none d-xl-block d-lg-block d-md-block d-sm-none " />

      <LazyMobileFooter class="d-xl-none d-lg-none d-md-none d-sm-block d-block" />

      <scroll-arrow />
    </v-container>
  </div>
</template> 

<script>
import { computed } from 'vue'
import userSalePageMixnis from "./_mixins/userSaleMixin";
import saleDataMixin from "./_mixins/saleDataMixin";
import designMixin from "./_mixins/designMixin";
import variable from "./_mixins/variableUserSale";
// import scrollArrowVue from '../scrollTop/scrollArrow.vue';

export default {
  props: ["salePageFLink", "content", "data", "productID"],
  mixins: [userSalePageMixnis, variable, saleDataMixin, designMixin],

  data() {
    return {
      salePageStatus: {
        changed: false,
        salePage: {},
        finalProduct: null,
        finalProductNotInRange: null,
        state: "backgroundSet",
        finalPrice: 0,
        tiraj: null,
        seri: 1,
        designStatus: -1,
        gallery: [],
        optionGallery: [],
        designTemplates: [],
      },

      commaPrice: "",
      loading: true,
    };
  },

  provide() {
    return {
      salePageStatus: computed(() => this.salePageStatus),
      optionsValues: computed(() => this.salePageStatus.salePage.optionsValues),
      itemClicked: this.userSelectedOptionChanged,
      reviewNeedChanged: this.reviewNeedChanged,
      designStatusChanged: this.designStatusChanged,
      clearSelection: this.clearSelection,
      tirajChanged: this.tirajChanged,
      seriChanged: this.seriChanged,
    };
  },

  head() {
    return {
      title: this.salePageStatus.salePage.TPS_FCaption,
      htmlAttrs: {
        lang: "fa"
      },
      meta: [
        {
          hid: "salepage",
          name: "description",
          content: this.salePageStatus.salePage.TPS_FSEO1
        },
        {
          hid: "og:local",
          property: "og:local",
          content: "fa_IR"
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "website"
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.salePageStatus.salePage.TPS_FCaption
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.salePageStatus.salePage.TPS_FSEO1
        },
        {
          hid: "og:url",
          property: "og:url",
          content:
            "https://chapex.ir/salePage/" +
            this.salePageStatus.salePage.TPS_FLink
        },
        {
          hid: "og:site_name",
          property: "og_site_name",
          content: "Chapex"
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.salePageStatus.salePage.TPS_FIDs_KeyWord
        }
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href:
            "https://chapex.ir/salePage/" +
            this.salePageStatus.salePage.TPS_FLink
        }
      ],
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          type: "application/ld+json",
          innerHTML: this.salePageStatus.salePage.TPS_FSEO2
        }
      ]
    };
  },

  //notSelected:0
  //backgroundSet:1
  //userSet:2
  //aloneSet:3
  //systemSet:4
  //design:5
  //review:6
  //staySet:7

  async mounted() {
    const res = await this.getSalePage(this.salePageFLink);
    if (res) {
      // console.log('res', res)
      this.salePageStatus.salePage = res;
      this.salePageStatus.salePage.designStatus = -1;
      this.salePageStatus.salePage.reviewNeed = false;
      this.finalCount = this.salePageStatus.salePage.TPS_FNumberDefault;
      this.salePageStatus.gallery = this.salePageStatus.salePage.gallery.filter(
        p => p.TPIC_FForm == "pageSale"
      );
      this.salePageStatus.optionGallery = this.salePageStatus.salePage.gallery.filter(
        p => p.TPIC_FForm == "optionImage"
      );
      // this.optionChildren = this.salePageStatus.salePage.optionsValues;
      this.setDefaultProduct();
      this.loading = false;
    }
  },

  methods: {
    clearSelection(state) {
      if (state == "All") {
        this.salePageStatus.salePage.optionsValues.forEach(
          ov => (ov.isSelected = 0)
        );
        this.designStatus = -1;
        this.salePageStatus.salePage.optionsValues.forEach(ov => ov.isSelected = 0)
        this.salePageStatus.designStatus = -1;
        this.salePageStatus.salePage.designStatus = -1;
        this.salePageStatus.salePage.reviewNeed = false;
        this.salePageStatus.changed = !this.salePageStatus.changed
        window.scrollTo(0, 0);
      }
      else if (state == "BackgroundSet") {
        this.salePageStatus.designStatus = -1;
        this.salePageStatus.salePage.designStatus = -1;
        this.salePageStatus.salePage.reviewNeed = false;
        this.salePageStatus.salePage.optionsValues.filter(ov => ov.isSelected == 1).forEach(ov => ov.isSelected = 0)
      }
      else if (state == "AloneSet") {
        this.salePageStatus.salePage.optionsValues.filter(ov => ov.isSelected == 3).forEach(ov => ov.isSelected = 0)
      }
      else if (state == "ProductGallery") {
        this.salePageStatus.gallery.filter(p => p.TPIC_FForm == "product").forEach(p => {
          var index = this.salePageStatus.gallery.findIndex(pi => pi.TPIC_FID == p.TPIC_FID);
          if (index > -1) {
            this.salePageStatus.gallery.splice(index, 1);
          }
        });
      }
      else if (state == "Design") {
        this.salePageStatus.salePage.optionsValues.filter(ov => ov.isSelected == 5).forEach(ov => ov.isSelected = 0)
        this.salePageStatus.salePage.designStatus = 0
      }
      else if (state == "Review") {
        this.salePageStatus.salePage.optionsValues.filter(ov => ov.isSelected == 6).forEach(ov => ov.isSelected = null)
        this.salePageStatus.salePage.reviewNeed = false
      }
      else if (state == "DesignAndReviewIfNotExist") {
        const designOption = this.salePageStatus.salePage.options.find(o => o.TD_FType == 21704)
        if (designOption && this.finalProduct) {
          if (!this.productHasDesignOptionValue(this.salePageStatus.salePage, this.finalProduct.TGO_FID)) {
            this.clearSelection("Design");
            this.clearSelection("Review");
          }
        }
      }
    },

    userSelectedOptionChanged(optionValue) {
      if (this.salePageStatus.state == "backgroundSet") {
        this.salePageStatus.state = "userSet";
        this.clearSelection("BackgroundSet");
      }

      this.clearSelection("AloneSet");

      if (optionValue) {
        const option = this.salePageStatus.salePage.options.find(o => o.TD_FID == optionValue.TD_FID_Group)

        if (option) {
          if (
            !optionValue.isSelected ||
            optionValue.isSelected == 1 ||
            optionValue.isSelected == 7
          ) {

            optionValue.isSelected = 2;

            option.autoChangeReason = null;
            this.clearSelectionForOption(
              this.salePageStatus.salePage,
              option.TD_FID,
              optionValue.TD_FID
            );
            if (option.TD_FActionToDeps == 23102) {
              //نمایش همیشکی
              this.clearSelectionNotInDeps(
                this.salePageStatus.salePage,
                option,
                optionValue
              );
            }

          } else {
            optionValue.isSelected = 0;
            option.autoChangeReason = null;
          }
        }
        this.autoActiveAloneItem(optionValue);
        this.setOptionValuePicture(optionValue);
      }

      this.setFinalProduct();
      this.clearSelection("DesignAndReviewIfNotExist");
      this.setFinalPrice();

      this.salePageStatus.changed = !this.salePageStatus.changed
    },

    tirajChanged(newTiraj) {
      this.salePageStatus.tiraj = newTiraj;
      this.setFinalProduct();
      this.setFinalPrice();
      this.salePageStatus.changed = !this.salePageStatus.changed
    },
    seriChanged(newSeri) {
      this.salePageStatus.seri = newSeri;
      this.setFinalProduct();
      this.setFinalPrice();
      this.salePageStatus.changed = !this.salePageStatus.changed
    },
    designStatusChanged(designStatus) {
      this.salePageStatus.designStatus = designStatus;
      this.salePageStatus.salePage.designStatus = designStatus;
      if (designStatus == -1) {
        this.clearSelection("Design");
        this.clearSelection("Review");
      } else if (designStatus == 0) {
        this.clearSelection("Design");
      } else if (designStatus == 1) {
        this.clearSelection("Review");
        const designOptionValues = this.getDesignOptionValues(
          this.salePageStatus.salePage
        );
        designOptionValues.forEach(dov => {
          dov.isSelected = 5;
        });
      }
      this.setFinalPrice();

      this.salePageStatus.changed = !this.salePageStatus.changed
    },
    reviewNeedChanged(reviewNeed) {
      this.salePageStatus.salePage.reviewNeed = reviewNeed;
      if (reviewNeed) {
        this.clearSelection("Design");
        const reviewOptionValues = this.getReviewOptionValues(
          this.salePageStatus.salePage
        );
        reviewOptionValues.forEach(rov => {
          rov.isSelected = 6;
        });
      } else {
        this.clearSelection("Review");
      }
      this.setFinalPrice();

      this.salePageStatus.changed = !this.salePageStatus.changed
    },
    setFinalProduct() {
      const finalProduct = this.findFinalProduct(
        this.salePageStatus.salePage,
        this.salePageStatus.tiraj
      );
      if (finalProduct && finalProduct.TGO_FID) {
        if (this.salePageStatus.finalProduct && this.salePageStatus.finalProduct.TGO_FID) {
          if (finalProduct.TGO_FID != this.salePageStatus.finalProduct.TGO_FID) {
            this.clearSelection("Desgin");
            this.clearSelection("Review");
            this.clearSelection("ProductGallery");
            this.setProductGallery(finalProduct.TGO_FID);
          }
        }
      } else {
        this.finalProductNotInRange = this.findFinalProductNotInRange(
          this.salePageStatus.salePage
        );
      }
      this.salePageStatus.finalProduct = finalProduct;
    },
    setFinalPrice() {
      if (this.salePageStatus.finalProduct) {
        this.salePageStatus.finalPrice = this.calcPrice(
          this.salePageStatus.salePage,
          this.salePageStatus.finalProduct.TGO_FID,
          this.salePageStatus.tiraj,
          this.salePageStatus.seri
        );
      } else {
        this.salePageStatus.finalPrice = null;
      }
    },
    autoActiveAloneItem(optionValue) {
      this.salePageStatus.salePage.options
        .filter(c => c.TD_FType == 21703)
        .forEach(option => {
          if (option.TD_FActionToDeps != 23102) { // استثنا کردن نمایش همیشگی
            const activeItems = this.getActiveItems(
              this.salePageStatus.state,
              this.salePageStatus.salePage,
              option
            );

            if (activeItems.length == 1) {
              if (!activeItems[0].isSelected) {
                if (!optionValue || optionValue.TD_FID != activeItems[0].TD_FID) {
                  this.clearSelectionForOption(
                    this.salePageStatus.salePage,
                    option.TD_FID,
                    optionValue.TD_FID
                  );

                  activeItems[0].isSelected = 3;

                  this.autoActiveAloneItem(activeItems[0]);
                }
              }
            }
          }
        });
    },
    setDefaultProduct() {
      this.salePageStatus.salePage.optionsValues.forEach(optionValue => {
        if (optionValue.TD_FDefault) {
          const option = this.getOption(
            this.salePageStatus.salePage,
            optionValue.TD_FID_Group
          );
          if (option.TD_FActionToDeps == 23102) optionValue.isSelected = 7;
          else optionValue.isSelected = 1;
        }
      });
      this.setFinalProduct();
      this.setFinalPrice();
    },
    setOptionValuePicture(optionValue) {
      var index = this.salePageStatus.gallery.findIndex(p => p.optionPic);
      if (index > -1) {
        this.salePageStatus.gallery.splice(index, 1);
      }
      if (optionValue && optionValue.picture) {
        var obj = JSON.parse(JSON.stringify(optionValue.picture));
        obj.optionPic = true;
        this.salePageStatus.gallery.splice(0, 0, obj);
      }
    },
    setProductGallery(productID) {
      const pictures = this.salePageStatus.salePage.gallery.filter(
        p => p.TPIC_FID_Parent == productID
      );
      if (pictures && pictures.length > 0) {
        pictures.forEach(p => this.salePageStatus.gallery.splice(0, 0, p));
      }
    }
  }

};
</script>

<style lang="scss" src="../../../assets/style/Ul/OptionList.scss"></style>
<style lang="scss" src="../../../assets/main/style.scss"></style>
<style lang="css" src="../../../assets/main/style.css"></style>
<style lang="css" src="../../../node_modules/hooper/dist/hooper.css"></style>
<style>
.mytabs .v-slide-group__content {
  justify-content: center;
}

.mytabs .v-tab {
  letter-spacing: 0px;
  font-size: 16px !important;
  margin: 0px 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-weight: bold;
}

.mytabs .v-tabs-bar {
  background: none !important;
}

.mytabs .v-tabs-slider-wrapper {
  display: none;
}

.my-tabs .v-tab :hover {
  background: none;
}

.mytabs .v-tab--active {
  background-color: white !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: black !important;
  font-size: 16px !important;
  font-weight: bold;
}

.mytabs .v-window__container {
  background-color: white;
  padding: 20px;
  border-radius: 20px;
}

.mytabs .theme--light.v-tabs-items {
  background: none;
}

/* .new-main .final-content p {
  font-size: 14px;
  color: #212121;
  letter-spacing: -0.2px;
} */

.v-card__text {
  padding: 60px 100px;
}

.v-list-item__content .v-list-item__title {
  font-family: "bakhtiari" !important;
}

.v-list-item__title {
  font-family: "bakhtiari" !important;
}
</style>
