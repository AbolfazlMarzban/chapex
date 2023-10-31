export default {
  props: {
    label: {
      type: String,
      required: false
    }, 
    name: {
      type: String,
      required: false
    },
    value: {
      required: false
    },
    required: {
      type: Boolean,  
      default: false
    },
    minLength: {
      type: Number,
      default: 0
    },
    maxLength: {
      type: Number,
      default: 50
    },
    icon: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      errorMessages: []
    };
  },
  methods: {
    validate() {
      this.errorMessages = [];
      this.checkRequired();
      // type checking

      /// new for options in Bime
      if (!isNaN(this.minLength)) {
        this.checkMinLength(this.value);
      }

      // maxLength working except 0 value
      if (!isNaN(this.maxLength) && this.maxLength !== 0) {
        this.checkMaxLength(this.value);
      }
      if (this.errorMessages.length) {
        this.$emit("invalidInput", false);
      } else {
        this.$emit("invalidInput", true);
      }
      ///
    },

    // requirement
    checkRequired() {
      // check requirement
      if (this.required) {
        if (this.value == 0 && this.value !== 0) {
          this.errorMessages.push("required");
        }
      }
    },
    checkMinLength(value) {
      // valiating for number
      if (this.type) {
        if (value && value < this.minLength) {
          this.errorMessages.push(
            "حداقل عدد ورودی  " + this.minLength + " می باشد"
          );
        }
      } else {
        if (value && value.length < this.minLength) {
          this.errorMessages.push(
            "حداقل تعداد کاراکتر " + this.minLength + "  "
          );
        }
      }
    },
    checkMaxLength(value) {
      // valiating for number
      if (this.type) {
        if (value && value > this.maxLength) {
          this.errorMessages.push(
            "حداکثر عدد ورودی" + this.maxLength + " می باشد"
          );
        }
      } else {
        if (value && value.length > this.maxLength) {
          this.errorMessages.push(
            "حداکثر تعداد کاراکتر " + this.maxLength + "  "
          );
        }
      }
    }
  }
};
