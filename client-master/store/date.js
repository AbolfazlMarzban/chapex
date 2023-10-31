export const state = () => ({
  currentDate: {
    currentDate: '',
    currentTime: '',
    currentYear: '',
    currentMonth: '',
    currentDay: '',
    currentHour: '',
    currentMinute: '',
    weekdayName: '',
    timeWithSecond: '',
    currentSecond: ''
  }


})

export const mutations = {
  setDate: (state, date) => {
    state.currentDate = {
      ...date
    }
  },

}

export const actions = {
  setDate: (vuexContext, date) => {
    vuexContext.commit('setDate', date)
  },
}

export const getters = {
  getCurrentDate(state) {
    return state.currentDate
  },
}
