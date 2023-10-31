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
          //سایز ستاره ها
          minLength: {
            type: Number,
            required: false,
            default: 20
          },
          //تعداد ستاره ها
          maxLength: {
            type: Number,
            required: false,
            default: 4
          },
          //مقدار پیشفرض ستاره ها
          placeholder: {
            type: Number,
            required: false,
            default: 2
          },
          //رنگ ستاره های فعال
          icon: {
            type: String,
            default: "orange",
            required: false
          },
          //رنگ ستاره ها 
          tooltip: {
            type: String,
            required: false,
            default: "orange"
          }
    },
    data(){
        return{
            errorMessages: []
        }
    },
    methods:{
         
      }
}