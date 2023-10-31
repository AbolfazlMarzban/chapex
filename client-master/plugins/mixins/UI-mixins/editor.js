export default{
    props:{
        label: {
            type: String,
            required: false
          },
          name: {
            type: String,
            required: false
          },
          required: {
            type: Boolean,
            default: false
          },
          value:{
              type: String,
              default: false
          },
            icon: {
              type: String,
              default: ""
            },
            placeholder: {
              type: String,
              default: ""
            },
    },
    data(){
        return{
          errorMessages: []
        }
    },
    methods:{
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
          checkType(value) {
            const type = this.type;
            if (type) {
              if (type == "Number") {
                if (isNaN(value)) {
                  this.errorMessages.push("عدد وارد کنید");
                }
              } else if (type == "Int") {
                if (!isNaN(value)) {
                  if (!Number.isInteger(Number(value))) {
                    this.errorMessages.push("عدد صحیح وارد کنید");
                  }
                } else {
                  this.errorMessages.push("عدد وارد کنید");
                }
              }
            }
          }
        }
}