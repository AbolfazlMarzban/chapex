<template>
  <div class="d-flex flex-wrap flex-row align-center">
    <span class="option-title">{{ option.TD_FName }}</span>

    <v-icon v-if="option.TD_FCaption || album.length > 0" color="grey" style="font-size:20px" class="pr-2"
      @click="openInfo">mdi-information</v-icon>

    <v-dialog v-model="showInfo" width="300">
      <v-card class="pt-2" style="border-radius: 15px;">
        <div class="d-flex justify-end pl-3">
          <v-icon color="#016670" @click="showInfo = false">mdi-close</v-icon>
        </div>
        <v-card-text>
          <div class="d-flex flex-column justify-center align-center">
            <span v-if="option.TD_FCaption" v-html="option.TD_FCaption" class="option-caption"
              style="font-size: 16px !important; color: black;"></span>
            <hr v-if="album.length > 0 && option.TD_FCaption" style="width: 100%" class="my-1">
          </div>
          <div v-if="album.length > 0">
            <v-carousel hide-delimiters style="height: 380px !important;" class="dialog-slider">
              <v-carousel-item v-for="(pic, index) in album" :key="index">
                <v-row>
                  <v-col cols="12" class="d-flex flex-column justify-center align-center">
                    <label>{{ pic.name }}</label>
                    <img :src="setImageUrl(pic.TPIC_FAddress)" :alt="pic.name" style="width: 100%" class="mt-2">
                    <v-btn depressed text block color="#016670" class="mt-3 slider-selector" :disabled="pic.disabled"
                      @click="chooseItem(pic.TPIC_FID_Parent)">انتخاب</v-btn>
                  </v-col>
                </v-row>
              </v-carousel-item>
            </v-carousel>
          </div>
        </v-card-text>
      </v-card>

    </v-dialog>

    <!-- <div v-if="option.TD_FCaption" class="d-xl-block d-lg-block d-md-block d-none">
      <span class="option-caption pr-3 ">{{ option.TD_FCaption }}</span>
    </div> -->

    <span class="option-title-warn pr-3" v-if="notSelected && option.TD_FRequired == 1">
      را انتخاب نکرده اید.</span>
    <br>

    <LazyAutoChangeMemo v-if="option.autoChangeReason" />

    <LazyLockMemo :option="option" :lockClicked=lockClicked />

    <LazyNoBalanceMemo :option="option" />

    <LazyNoBalanceAllowMemo :option="option" />

    <LazyNoSaleMemo :option="option" />

  </div>
</template>


<script>
import LockMemo from './OptionTitleSections/LockMemo.vue';
import NoBalanceAllowMemo from './OptionTitleSections/NoBalanceAllowMemo.vue';
import NoBalanceMemo from './OptionTitleSections/NoBalanceMemo.vue';
import NoSaleMemo from './OptionTitleSections/NoSaleMemo.vue';
import userSaleMixin from '../../../_mixins/userSaleMixin'
import saleDataMixin from '../../../_mixins/saleDataMixin'
export default {
  props: ["option", "lockClicked"],
  inject: ["salePageStatus", "optionsValues", "itemClicked"],
  mixins: [userSaleMixin, saleDataMixin],
  data() {
    return {
      showInfo: false,
      album: [],
      notSelected: false
    }
  },
  mounted() {
    this.infoBox(this.option)
    this.setSelected(this.option)
  },
  methods: {

    childDisabled(option, child) {
      if (this.option.TD_FActionToDeps == 23102) //نمایش همیشگی
        return false

      return this.childDisabledByDeps(this.state, this.salePageStatus.salePage, option, child)
    },
    chooseItem(id) {
      let child = this.optionsValues.find(i => i.TD_FID == id)
      if (child) {
        if (!this.optionsValues.filter(ov => ov.isSelected).some(c => c.TD_FID == id)) {
          // this.$emit('userSelectedOptionChanged', child)
          this.itemClicked(child)
        }
      }
      this.showInfo = false
    },
    openInfo() {
      const child = this.optionsValues.filter(ov => ov.isSelected).find(i => i.TD_FID_Group === this.option.TD_FID)
      if (child) {
        var firstPic = this.salePageStatus.optionGallery.find(p => p.TPIC_FID_Parent == child.TD_FID)
        if (firstPic) {
          const index = this.album.indexOf(firstPic)
          this.album.splice(0, 0, this.album.splice(index, 1)[0])
        }
      }
      this.album.forEach(a => {
        let child = this.optionsValues.find(i => i.TD_FID == a.TPIC_FID_Parent)
        // console.log('child', child)
        if (this.optionsValues.filter(ov => ov.isSelected).some(i => i.TD_FID == a.TPIC_FID_Parent) || this.childDisabled(this.option, child)) {
          a.disabled = true
        } else {
          a.disabled = false
        }
      })
      this.showInfo = true
    },
    setSelected(option) {
      var index = this.optionsValues.filter(ov => ov.isSelected).findIndex(child => child.TD_FID_Group == option.TD_FID);
      if (index == -1) {
        this.notSelected = true;
      }
      else {
        this.notSelected = false;
      }
    },
    infoBox(value) {
      let pic = this.salePageStatus.optionGallery.filter(p => p.TPIC_FID_Parent.includes(value.TD_FID))
      for (var i = 0; i < pic.length; i++) {
        const name = this.optionsValues.find(item => item.TD_FID == pic[i].TPIC_FID_Parent)
        pic[i].name = name.TD_FName
        pic[i].disabled = false
      }
      this.album = pic
    }
  },
  watch: {
    "salePageStatus.changed": {
      handler(newValue, oldValue) {
        this.setSelected(this.option)
      },
      immediate: true
    },
  },
  components: { LockMemo, NoBalanceMemo, NoBalanceAllowMemo, NoSaleMemo }
}
</script>

<style lang="scss">
.dialog-slider {
  .v-btn--icon.v-size--default {
    width: 30px;
    height: 30px;
  }

  label {
    font-family: boldbakhtiari !important;
    font-size: 16px;
    color: #930149;
  }

  img {
    border-radius: 10px;
  }

  button {
    border-radius: 10px;
  }
}

.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}

.slider-selector {
  span {
    letter-spacing: normal;
    font-size: 16px;
    font-family: boldbakhtiari !important;
  }
}
</style>