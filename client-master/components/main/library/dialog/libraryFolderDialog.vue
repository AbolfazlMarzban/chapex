<template>
  <div class="text-center">
    <v-dialog v-model="show" width="500" class="goods_dialogs_main rounded-xl">
      <v-card class="goods_dialog rounded-xl">
        <v-card-text class="pt-5">
          <div class="goods_dialog_title d-flex justify-end">
            <v-icon @click="$emit('close')">mdi-close</v-icon>
          </div>
          <div class="goods_dialog_text pa-0">
            <div>
              <v-col cols="12" class="d-flex flex-column">
                <span v-if="showError" style="color: red;"
                  >تمام فیلد ها را پر کنید!</span
                >
                <span v-if="serverError" style="color: red;"
                  >دسترسی به مسیر ذخیره سازی مورد نظر شما قطع شده است. لطفا مسیر
                  دیگری را برای ذخیره سازی انتخاب نموده یا در زمان دیگری تلاش
                  نمایید</span
                >
                <div v-if="!FID && isAdmin" class="d-flex flex-column justify-start">
                  <label for="" style="font-weight: bold;" class="text-right"
                    >مسیر ذخیره سازی</label
                  >
                  <v-select
                    dense
                    outlined
                    :items="rootsNames"
                    class="root-selector"
                    v-model="folderRoot"
                    @change="setFolderHost"
                  ></v-select>
                </div>
                <label for="" style="font-weight: bold;" class="text-right"
                  >نام فولدر جدید</label
                >
                <ui-input
                  type="text"
                  v-model="folderName"
                  class="mt-2 makefolder-input"
                ></ui-input>
                <label for="" style="font-weight: bold;" class="text-right"
                  >ظرفیت فولدر (MB)</label
                >
                <span v-if="showCapError" style="color: red;"
                  >ظرفیت درخواستی از حداکثر در دسترس شما بیشتر است. حداکثر ظرفیت
                  این فولدر میتواند {{ maxCap / 1000000 }} MB باشد</span
                >
                <ui-input
                  v-model="folderCapacity"
                  type="number"
                  class="mt-2 makefolder-input"
                ></ui-input>
              </v-col>
            </div>
          </div>
          <v-btn text @click="submit" class="goods_dialog_btn">
            ایجاد پوشه
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import "../../../../assets/style/goods/goodsDialogs.scss";
export default {
  props: [
    "show",
    "selected",
    "roots",
    "FID",
    "maxCap",
    "serverError",
    "isAdmin"
  ],

  data() {
    return {
      folderName: "",
      folderRoot: "",
      folderHost: null,
      showError: false,
      folderCapacity: null,
      rootsNames: [],
      showCapError: false
    };
  },
  methods: {
    setFolderHost() {
      var root = this.roots.find(item => item.TD_FName == this.folderRoot);
      if (root) {
        this.folderHost = root.TD_FID;
      }
    },
    hiddenDialog() {
      this.$emit("hiddenDialog");
    },
    deleteItemFromTable() {
      this.$emit("deleteItemFromTable");
    },
    submit() {
      if (
        this.maxCap &&
        this.maxCap != 0 &&
        this.maxCap / 1000000 <= this.folderCapacity
      ) {
        this.showCapError = true;
      } else if (this.folderName.length <= 0) {
        this.showError = true;
      } else {
        this.$emit(
          "insertFolder",
          this.folderName,
          this.folderCapacity,
          this.folderHost
        );
      }
    }
  },
  watch: {
    roots(newValue) {
      this.rootsNames = newValue.map(item => item.TD_FName);
    },
    show(newValue) {
      this.folderName = "";
      this.folderCapacity = "";
      this.showCapError = false;
      this.showError = false;
      this.$emit("hideServerError");
    }
  }
};
</script>
<style lang="scss">
.root-selector {
  input {
    border: none !important;
  }
}
.makefolder-input{
  .form-control{
    padding: 3px 10px;
  }
}
</style>
