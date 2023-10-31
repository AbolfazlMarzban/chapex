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
    id: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    }
  }
};
