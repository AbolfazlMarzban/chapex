export default {
  data() {
    return {
      data: {},


      defaults: {},
      addressesList: [],
      selectedAddress: {},

      deliveryStatusData: {
        deliveryMethod: '',
        selectedAddress: {
          address: '',
          receiverName: '',
          tell: ''
        },
        canThursday: '',
        canHolidaysOrFridays: '',
        sendingMethodToDeliver: ''
      },


    }
  }
}