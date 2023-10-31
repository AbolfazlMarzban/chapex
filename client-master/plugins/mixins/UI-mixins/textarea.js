export default {
  props: {
    lable: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    placeholder: {
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
      type: String,
      default: '0'
    },
    maxLength: {
      // type: an,
      default: 200
    },
    row: {
      type: String
    }
  },
  data() {
    return {
      errorMessages: []
    }
  },
  methods: {
    // انجام عملیات کلی ولیدیت کردن
    validate() {
      this.errorMessages = []
      this.checkRequired()
      this.checkMinLength()
      this.checkMaxLength()

    },
    //  فیلدها required چک کردن 
    checkRequired() {
      if (this.required) {
        if (this.value == '') {
          this.errorMessages.push('پر کردن این فیلد الزامی می باشد')
        }
      }
    },
    // چک کردن حداقل تعداد کاراکتر 
    checkMinLength() {
      if (this.TextareaValue.length < this.minLength) {
        this.errorMessages.push('minLength')
      }
    },
    // چک کردن حداکثر تعداد کاراکتر 
    checkMaxLength() {
      if (this.TextareaValue.length > this.maxLength) {
        this.errorMessages.push('maxLength')
        return true
      }
      return false
    }
  }
}
