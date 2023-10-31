<template>
  <v-row class="row header_manager ml-1">
    <v-col cols="4" class="text-left">
      <div v-if="HeaderButtons" class="options float-right">
        <span class="header_manager_item" v-if="canShow('submit')" :disabled="!buttons.submit.enable"
          @click="submitButtonClicked">
          <span>تایید</span>
          <ui-icon icon="check" />
        </span>

        <span class="header_manager_item" v-if="canShow('edit')" :disabled="!buttons.edit.enable"
          @click="editButtonClicked">
          <span>ویرایش</span>
          <ui-icon icon="pencil-alt" />
        </span>

        <span class="header_manager_item" v-if="canShow('insert')" :disabled="!buttons.insert.enable"
          @click="insertButtonClicked">
          <span>افزودن</span>
          <ui-icon :icon="['fa', 'plus']" />
        </span>

        <span class="header_manager_item" v-if="canShow('copy')" :disabled="!buttons.copy.enable"
          @click="copyButtonClicked">
          <span>کپی</span>
          <ui-icon :icon="['fa', 'copy']" />
        </span>

        <span class="header_manager_item" v-if="canShow('delete')" :disabled="!buttons.delete.enable"
          @click="deleteButtonClicked">
          <span>حذف</span>
          <ui-icon :icon="['fa', 'trash-alt']" />
        </span>

        <span class="header_manager_item" v-if="canShow('cancel')" :disabled="!buttons.cancel.enable"
          @click="cancelButtonClicked">
          <span>انصراف</span>
          <ui-icon icon="redo" />
        </span>

        <span class="header_manager_item" v-if="canShow('return')" @click="$emit('return')">
          <span>بازگشت</span>
          <ui-icon :icon="['fa', 'arrow-left']" />
        </span>

        <span class="header_manager_item" v-if="canShow('json')" :disabled="!buttons.json.enable" @click="$emit('json')">
          <span>json</span>
          <ui-icon :icon="['fa', 'code']" />
        </span>

        <span class="header_manager_item" v-if="canShow('redo')" :disabled="!buttons.redo.enable" @click="$emit('redo')">
          <ui-icon :icon="['fa', 'redo']" />
        </span>

        <span class="header_manager_item" v-if="canShow('undo')" :disabled="!buttons.undo.enable" @click="$emit('undo')">
          <ui-icon :icon="['fa', 'undo']" />
        </span>
      </div>
    </v-col>
    <v-col cols="8">
      <div class="title-name float-left">
        <ui-icon :icon="title.icon" />
        <label>{{ title.fa }}</label>
        <span>{{ title.en }}</span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import HeaderMangerButtonsStatus from "./../../../plugins/mixins/headerManager/buttons";

export default {
  mixins: [
    HeaderMangerButtonsStatus,
  ],
  props: [
    "title",
    "Buttons",
    "status",
  ],
  data() {
    return {
      dropdown: {
        show: false,
        items: [],
      },
      submit: false,
      cancel: false,
      HeaderButtons: this.buttons,
    };
  },
  mounted() {
    // window.addEventListener("scroll", this.onScroll);
    for (let btn in this.buttons) {
      if (this.Buttons[btn]) {
        this.buttons[btn].show = this.Buttons[btn].show;
        this.buttons[btn].enable = this.Buttons[btn].enable;
      }
      this.HeaderButtons = this.buttons
    }
  },
  methods: {
    canShow(buttonName) {
      if (this.status == "start") {
        if (buttonName == 'insert')
          return true
      }
      else if (this.status == "insert") {
        if (buttonName == 'submit')
          return true

        if (buttonName == 'cancel')
          return true

        if (buttonName == 'undo')
          return true

        if (buttonName == 'redo')
          return true

        if (buttonName == 'json')
          return true
      }
      else if (this.status == "update") {
        if (buttonName == 'insert')
          return true

        if (buttonName == 'show')
          return true

        if (buttonName == 'cancel')
          return true
      }
      else if (this.status == "show") {
        if (buttonName == 'edit')
          return true

        if (buttonName == 'return')
          return true
      }
      else if (this.status == "edit") {
        if (buttonName == 'delete')
          return true

        if (buttonName == 'submit')
          return true

        if (buttonName == 'cancel')
          return true

        if (buttonName == 'undo')
          return true

        if (buttonName == 'redo')
          return true

        if (buttonName == 'json')
          return true
      }
      else if (this.status == "selecting") {
        if (buttonName == 'delete')
          return true

        if (buttonName == 'insert')
          return true

        if (buttonName == 'show')
          return true
      }
      else if (this.status == "multi-selecting") {
        if (buttonName == 'insert')
          return true
      }
      else if (this.status == "not-selected") {
        if (buttonName == 'insert')
          return true
      }
      else if (this.status == "list") {
        if (buttonName == 'insert')
          return true
      }
      else if (this.status == "childList") {
        if (buttonName == 'insert')
          return true

        if (buttonName == 'return')
          return true
      }
      else if (this.status == "none") {
      }

      return false
    },

    editButtonClicked() {
      this.$emit("edit");
      this.toTop();
    },

    showButtonClicked() {
      this.toTop();
      this.$emit("show");
    },
    async deleteButtonClicked() {
      if (this.HeaderButtons.delete.enable) {
        this.$emit("delete");
      }
      // this.dialog = false;
    },

    insertButtonClicked() {
      this.toTop();
      this.$emit("insert");
    },
    copyButtonClicked() {
      this.toTop();
      this.$emit("copy")
    },

    submitButtonClicked() {
      this.submit = !this.submit;
      this.$emit("submit", this.submit);
      //      this.HeaderButtons.insert.show = true;
      //  this.HeaderButtons.cancel.show = false;
      //  this.HeaderButtons.submit.show = false;
    },
    cancelButtonClicked() {
      this.cancel = !this.cancel;
      this.$emit("cancel", this.cancel);
      //     this.HeaderButtons.insert.show = true;
      //  this.HeaderButtons.cancel.show = false;
      //  this.HeaderButtons.submit.show = false;
    },


    setSubmitAndCancelVisibility(enable) {
      // this.buttons.submit.enable = enable;
      // this.buttons.cancel.enable = enable;
    },

    loading(buttonName) {
      // const button = this.$store.getters[
      //   "headerManager/getButtonLoadingAndStatus"
      // ];
      // if (button.status == this.generalHeaderStatus) {
      //   if (button.buttonName == buttonName) {
      //     return button.loading;
      //   }
      // }
      // return false;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
  watch: {
    // status(status) {
    //   // console.log('headerManager status changed', status)
    //   if (status == "start") {
    //     this.HeaderButtons.insert.enable = true;
    //     this.HeaderButtons.insert.show = true;
    //     this.HeaderButtons.edit.enable = false;
    //     this.HeaderButtons.edit.show = false;
    //     this.HeaderButtons.delete.enable = false;
    //     this.HeaderButtons.delete.show = true;
    //     this.HeaderButtons.show.enable = false;
    //     this.HeaderButtons.show.show = false;
    //     this.HeaderButtons.submit.enable = false;
    //     this.HeaderButtons.submit.show = false;
    //     this.HeaderButtons.cancel.enable = false;
    //     this.HeaderButtons.cancel.show = false;
    //     this.HeaderButtons.undo.show = false;
    //     this.HeaderButtons.redo.show = false;
    //   } else if (status == "insert") {
    //     // console.log('insert')

    //     this.HeaderButtons.insert.enable = false;
    //     this.HeaderButtons.insert.show = false;
    //     this.HeaderButtons.edit.enable = false;
    //     this.HeaderButtons.edit.show = false;
    //     this.HeaderButtons.delete.enable = false;
    //     this.HeaderButtons.delete.show = false;
    //     this.HeaderButtons.show.enable = false;
    //     this.HeaderButtons.show.show = false;
    //     this.HeaderButtons.submit.enable = true;
    //     this.HeaderButtons.submit.show = true;
    //     this.HeaderButtons.cancel.enable = true;
    //     this.HeaderButtons.cancel.show = true;
    //     this.HeaderButtons.undo.show = true;
    //     this.HeaderButtons.redo.show = true;
    //     this.HeaderButtons.json.show = true;
    //     this.HeaderButtons.json.enable = true;
    //   } else if (status == "update") {
    //     this.HeaderButtons.insert.enable = true;
    //     this.HeaderButtons.insert.show = true;
    //     this.HeaderButtons.edit.enable = false;
    //     this.HeaderButtons.edit.show = false;
    //     this.HeaderButtons.delete.enable = false;
    //     this.HeaderButtons.delete.show = false;
    //     this.HeaderButtons.show.enable = true;
    //     this.HeaderButtons.show.show = true;
    //     this.HeaderButtons.submit.enable = true;
    //     this.HeaderButtons.submit.show = true;
    //     this.HeaderButtons.cancel.enable = true;
    //     this.HeaderButtons.undo.show = false;
    //     this.HeaderButtons.redo.show = false;

    //     this.HeaderButtons.cancel.show = true;
    //   } else if (status == "show") {
    //     this.HeaderButtons.insert.enable = false;
    //     this.HeaderButtons.insert.show = false;
    //     this.HeaderButtons.edit.enable = true;
    //     this.HeaderButtons.edit.show = true;
    //     this.HeaderButtons.delete.enable = false;
    //     this.HeaderButtons.delete.show = false;
    //     this.HeaderButtons.show.enable = false;
    //     this.HeaderButtons.show.show = false;
    //     this.HeaderButtons.submit.enable = false;
    //     this.HeaderButtons.submit.show = false;
    //     this.HeaderButtons.cancel.enable = true;
    //     this.HeaderButtons.cancel.show = true;
    //     this.HeaderButtons.undo.show = false;
    //     this.HeaderButtons.redo.show = false;
    //   } else if (status == "edit") {
    //     // console.log('edit')
    //     this.HeaderButtons.insert.enable = false;
    //     this.HeaderButtons.insert.show = false;
    //     this.HeaderButtons.edit.enable = false;
    //     this.HeaderButtons.edit.show = false;
    //     this.HeaderButtons.delete.enable = true;
    //     this.HeaderButtons.delete.show = true;
    //     this.HeaderButtons.show.enable = false;
    //     this.HeaderButtons.show.show = false;
    //     this.HeaderButtons.submit.enable = true;
    //     this.HeaderButtons.submit.show = true;
    //     this.HeaderButtons.cancel.enable = true;
    //     this.HeaderButtons.cancel.show = true;
    //     this.HeaderButtons.undo.show = true;
    //     this.HeaderButtons.redo.show = true;
    //     this.HeaderButtons.json.show = true;
    //     this.HeaderButtons.json.enable = true;
    //   } else if (status == "selecting") {
    //     this.HeaderButtons.insert.enable = true;
    //     this.HeaderButtons.edit.enable = true;
    //     this.HeaderButtons.delete.enable = true;
    //     this.HeaderButtons.show.enable = true;
    //     this.HeaderButtons.submit.enable = false;
    //     this.HeaderButtons.cancel.enable = false;
    //   } else if (status == "multi-selecting") {
    //     this.HeaderButtons.insert.enable = true;
    //     this.HeaderButtons.edit.enable = false;
    //     this.HeaderButtons.delete.enable = false;
    //     this.HeaderButtons.show.enable = false;
    //     this.HeaderButtons.submit.enable = false;
    //     this.HeaderButtons.cancel.enable = false;
    //   } else if (status == "not-selected") {
    //     this.HeaderButtons.insert.enable = true;
    //     this.HeaderButtons.edit.enable = false;
    //     this.HeaderButtons.delete.enable = false;
    //     this.HeaderButtons.show.enable = false;
    //     this.HeaderButtons.submit.enable = false;
    //     this.HeaderButtons.cancel.enable = false;
    //   } else if (status == "none") {
    //     this.HeaderButtons.insert.show = false;
    //     this.HeaderButtons.edit.show = false;
    //     this.HeaderButtons.delete.show = false;
    //     this.HeaderButtons.show.show = false;
    //     this.HeaderButtons.submit.show = false;
    //     this.HeaderButtons.cancel.show = false;
    //     this.HeaderButtons.undo.show = false;
    //     this.HeaderButtons.redo.show = false;
    //     this.HeaderButtons.json.show = false;
    //   }
    //   else if (status == "list") {
    //     this.HeaderButtons.insert.show = true;
    //     this.HeaderButtons.insert.enable = true;
    //     this.HeaderButtons.edit.show = false;
    //     this.HeaderButtons.delete.show = false;
    //     this.HeaderButtons.show.show = false;
    //     this.HeaderButtons.submit.show = false;
    //     this.HeaderButtons.cancel.show = false;
    //     this.HeaderButtons.undo.show = false;
    //     this.HeaderButtons.redo.show = false;
    //     this.HeaderButtons.json.show = false;
    //   }
    // },
    Buttons: {
      handler(btn, oldVal) {
        for (let btn in this.HeaderButtons) {
          if (this.Buttons[btn]) {
            this.HeaderButtons[btn].enable = this.Buttons[btn].enable;
          }
        }
      },
      deep: true
    }
  },
};
</script>



<style lang="scss" src="../../../assets/style/Ul/HeaderManager.scss"></style>