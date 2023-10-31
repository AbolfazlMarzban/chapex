<template>
  <div class="datapicker form-group form__group field">
    <span class="errorMessages" v-if="errorMessages.length > 0">
      {{ errorMessages[0] }}  
    </span>
    <VuePersianDatetimePicker
      class="datapickers"
      :disabled="readonly"
      :type="dateType"
      :min="min"
      placeholder="YYYY/MM/DD"
      :color="colors"
      @input="showInput"   
      v-model="value"
      :editable="true"
      @mousedown.right="mousedown"
    ></VuePersianDatetimePicker>
    <input
      v-model="value"
      @input="dataPickerValidate"
      :disabled="readonly"
      @blur="dataPickerValidate"
      class="showInput"
      :maxlength="maxlength"
      v-on:keyup="keymonitor"
      @mousedown.right="mousedown"
      @contextmenu.prevent
    />
    <label for="[name]" class="form__label">{{ label }}</label>
    <div v-if="optionsMenu.show" class="date_picker_right_click_menu"> 
      <p @click="setFirstOfThisMonth">
        اول ماه
        <v-icon>mdi-calendar-import</v-icon>
      </p>
      <p @click="setEndOfThisMonth">
        اخر ماه
        <v-icon>mdi-calendar-export</v-icon>
      </p>
      <p @click="setFirstOfThisYear">
        اول سال
        <v-icon> mdi-calendar-arrow-right </v-icon>
      </p>
      <p @click="setEndOfThisYear">
        آخر سال
        <v-icon> mdi-calendar-arrow-left </v-icon>
      </p>
      <p @click="setBeforeOfThisMonth">
        ماه قبل
        <v-icon> mdi-calendar-end </v-icon>
      </p>
      <p @click="setNextOfThisMonth">
        ماه آتی
        <v-icon> mdi-calendar-end </v-icon>
      </p>
      <p @click="setToday">
        امروز
        <v-icon> mdi-calendar </v-icon>
      </p>
    </div>
  </div>
</template>
<script>
import Datapicker from "./../../../plugins/mixins/UI-mixins/datapicker";
import "../../../assets/style/Ul/Datapicker.scss";
export default {
  props: {
    readonly: {
      default: false,
    },
    dateType: {
      default: "date",
    },
    value: {
      type: String,
    },
    min: {
      type: String,
    },
    label: {
      type: String
    },
  },
  mixins: [Datapicker],
  data() {
    return {
      optionsMenu: {
        show: false,
      },
      currentValue: [],
      currentDate: {},
      date: "",
      colors: "#00aab9",
      datetime: null,
      newValue: "",
    };
  },
  computed: {
    maxlength() {
      let length;
      if (this.dateType == "date") length = 10;
      if (this.dateType == "time") length = 5;
      return length;
    },
  },

  created() {
    window.addEventListener("mousedown", (e) => {
      if (e.buttons == 1) {
        setTimeout(() => {
          this.optionsMenu.show = false;
        }, 200);
      }
    });
  },
  mounted() {
    // get date from vuex
    this.currentDate = this.$store.getters["date/getCurrentDate"];
    // console.log(this.currentDate);
  },
  methods: {
    checkCurrentValue() {
      if (this.value) {
        this.currentValue = this.value.split("/");
      } else if (this.currentDate.date == undefined) { 
        this.$emit("input", "1400/01/01");
      }
      else {
        this.$emit("input", this.currentDate.date);
        this.currentValue = this.currentDate.date.split("/");
      }
      console.log("currentValue", this.currentValue);
    },
    mousedown() {
      this.optionsMenu.show = !this.optionsMenu.show;
      this.checkCurrentValue();
    },
    setFirstOfThisMonth() {
      this.checkCurrentValue();
      const setDate =
        this.currentValue[0] + "/" + this.currentValue[1] + "/" + "01";
      this.$emit("input", setDate);
    },

    setEndOfThisMonth() {
      this.checkCurrentValue();
      let setDate;
      if (
        this.currentValue[1] == "01" ||
        this.currentValue[1] == "02" ||
        this.currentValue[1] == "03" ||
        this.currentValue[1] == "04" ||
        this.currentValue[1] == "05" ||
        this.currentValue[1] == "06"
      ) {
        setDate =
          this.currentValue[0] + "/" + this.currentValue[1] + "/" + "31";
      } else if (
        this.currentValue[1] == "07" ||
        this.currentValue[1] == "08" ||
        this.currentValue[1] == "09" ||
        this.currentValue[1] == "10" ||
        this.currentValue[1] == "11" ||
        this.currentValue[1] == "12"
      ) {
        setDate =
          this.currentValue[0] + "/" + this.currentValue[1] + "/" + "30";
      }
      this.$emit("input", setDate);
    },
    setToday() {
      this.$emit("input", this.currentDate.date);
    },
    setNextOfThisMonth() {
      this.checkCurrentValue();
      let year = this.currentValue[0];
      let month = this.currentValue[1];
      let monthNum = Number(month);
      let day = this.currentValue[2];
      let setDate;

      if (monthNum == 12) {
        month = "01";
        Number(year);
        year++;
      } else if (monthNum > 5) {
        if (day == "31") {
          day = "30";
        }
        if (monthNum == 9 || monthNum == 10 || monthNum == 11) {
          month = monthNum + 1;
        } else {
          month = "0" + (monthNum + 1);
        }
      } else {
        month = "0" + (monthNum + 1);
      }
      setDate = year + "/" + month + "/" + day;
      this.$emit("input", setDate);
    },
    setBeforeOfThisMonth() {
      this.checkCurrentValue();
      let year = this.currentValue[0];
      let month = this.currentValue[1];
      let monthNum = Number(month);
      let day = this.currentValue[2];
      let setDate;

      if (monthNum == 1) {
        month = "12";
        Number(year);
        year--;
      } else if (monthNum > 5) {
        if (monthNum == 11 || monthNum == 12) {
          month = monthNum - 1;
        } else {
          month = "0" + (monthNum - 1);
        }
      } else {
        month = "0" + (monthNum - 1);
      }
      setDate = year + "/" + month + "/" + day;
      this.$emit("input", setDate);
    },
    setFirstOfThisYear() {
      this.checkCurrentValue();
      let setDate = this.currentValue[0] + "/01/01";
      this.$emit("input", setDate);
    },
    setEndOfThisYear() {
      this.checkCurrentValue();
      let setDate = this.currentValue[0] + "/12/30";
      this.$emit("input", setDate);
    },
    keymonitor: function (event) {
      if (event.key == "Control") {
        let currentDate = this.$store.getters["date/getCurrentDate"];
        this.$emit("input", currentDate.date);
      }
    },
    changeValue() {
      let newValue = "";
      let newValue2 = "";
      let validValue = "";

      if (this.dateType == "date" && this.value) {
        // validation

        for (let i = 0; i < this.value.length; i++) {
          if (this.value[i] == "/" || !isNaN(this.value[i])) {
            if (this.value[i] != " ") {
              this.validateDate(this.value);
              validValue += this.value[i];
            }
          }
        }

        for (let i = 0; i < validValue.length; i++) {
          if (validValue[i] != "/") {
            newValue += validValue[i];
          }
        }

        for (let i = 0; i < newValue.length; i++) {
          if (i === 4) {
            if (newValue[i + 1] !== "") {
              newValue2 += "/";
            }
          }
          if (i === 6) {
            if (newValue[i + 1] !== "") {
              newValue2 += "/";
            }
          }
          newValue2 += newValue[i];
        }
      } else if (this.dateType == "time" && this.value) {
        // validation
        for (let i = 0; i < this.value.length; i++) {
          if (this.value[i] == ":" || !isNaN(this.value[i])) {
            if (this.value[i] != " ") {
              this.validateTime(this.value);
              validValue += this.value[i];
            }
          }
        }

        for (let i = 0; i < validValue.length; i++) {
          if (validValue[i] != ":") {
            newValue += validValue[i];
          }
        }

        for (let i = 0; i < newValue.length; i++) {
          if (i === 2) {
            if (newValue[i + 1] !== "") {
              newValue2 += ":";
            }
          }
          newValue2 += newValue[i];
        }
      }

      this.value = newValue2;
      this.$emit("input", this.value);
    },

    showInput(e) {
      if (this.validateDate) {
        this.errorMessages = [];
      }
      this.$emit("input", e);
    },
  },

  watch: {},
};
</script>

