import { data } from "jquery"

export const state = () => ({

  deliveryStatusData: {
    deliveryMethod: '',
    selectedAddress: '',
    canThursday: '',
    canHolidaysOrFriday: '',
    sendingMethodToDeliver: ''
  },

  paymentData: {
    discountCode: '',
    userCredit: '',
    paymentMethod: '',
    factor: '',
    sendFactor: '',
    gateWay: ''
  },

  cartData: [],
  legalInfo: []
})

export const mutations = {
  setDeliveryStatusData: (state, data) => {
    state.deliveryStatusData = {
      ...data
    }
  },
  setPaymentData: (state, data) => {
    state.paymentData = {
      ...data
    }
  },
  setCartData: (state, data) => {
    state.cartData = data
    // console.log('setCartData', state.cartData);
  },
  setLegalInfo: (state, data) =>{
    state.legalInfo = data
  },
  clearCartData: (state, data) => {
    state.cartData = []
  },
  addToCart: (state, data) => {
    state.cartData.push({ ...data })
  },
  removeCartItem: (state, itemId) => {

    const index = state.cartData.findIndex(i => i.TOD_FID = itemId)
    if (index > -1) {
      state.cartData.splice(index, 1)
    }
    // console.log('addToCart', state.cartData);
  },
}

export const actions = {
  setDeliveryStatusData: (vuexContext, data) => {
    vuexContext.commit('setDeliveryStatusData', data);
  },
  setPaymentData: (vuexContext, data) => {
    vuexContext.commit('setPaymentData', data);
  },
  async initCart({ rootState, commit, dispatch }, req) {
    try {
      // if (rootState.login.user.token) {
      //   const authAxios = this.$axios.create({})
      //   authAxios.onRequest((config) => {
      //     config.headers.Authorization = 'Bearer ' + rootState.login.user.token
      //   })
      //   const response = await authAxios.$get(`/cart/get/`)

      //   if (response) {
      //     commit('setCartData', response.data);
      //     rootState.login.user.cartItemsCount = response.data.length
      //     changeValueOfCartItemsCookie(response.data.length)
      //   }
      // }
    }
    catch (error) {
      console.log(error);
    }
  },
  async setCartData(vuexContext, data) {
    // vuexContext.rootState.login.user.cartItemsCount = data.length
    vuexContext.commit('setCartData', data);
  },
    setLegalInfo(vuexContext, data){
      vuexContext.commit('setLegalInfo', data)
    },
  clearCartData: (vuexContext) => {
    vuexContext.commit('clearCartData');
  },
  async addToCart(vuexContext, data) {
    vuexContext.rootState.login.user.cartItemsCount++
    vuexContext.commit('addToCart', data);
  },
  async removeCartItem(vuexContext, itemId) {
    vuexContext.rootState.login.user.cartItemsCount--
    vuexContext.commit('removeCartItem', itemId);
  },
}

export const getters = {
  getDeliveryStatusData(state) {
    return state.deliveryStatusData
  },
  getPaymentData(state) {
    return state.paymentData
  },
  getCartData(state) {
    // console.log('getCartData');
    return state.cartData
  },
  getLegalInfo(state){
    return state.legalInfo
  }
}
