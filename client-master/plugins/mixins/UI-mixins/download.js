export default {
    props:{
        label:{
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
          },
        placeholder:{
            type: String,
            required: true,
        },
    },
data() {
    return {
      errorMessages: []
    };
  },
  methods: {
    validate(value) {
      this.errorMessages = [];
      this.checkRequired(value);
      this.checkMinLength(value);
      // type checking
      this.checkType(value);
    },

    // requirement
    checkRequired(value) {
      // check requirement
      if (this.required) {
        if (!value) {
          this.errorMessages.push("پر کردن این فیلد الزامی می باشد");
        }
      }
    },
  }
}