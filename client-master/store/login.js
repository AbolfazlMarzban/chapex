import Cookie from 'js-cookie'

export const state = () => ({
  user: {
    TU_FID: null,
    TU_FUserName: null,

    TU_FActive: null,
    TU_FUserLevel: null,

    TU_FNameFamil: null,
    TU_FCodeMeli: null,

    expiresIn: null,
    token: null,
    TU_FIsUser: null,
    TU_FPicAdd1: "",
    TU_FID_Access: 0,
    TU_FID_Group: 0,
    expiresInDay: 0,
    cartItemsCount: 0,
    // ...otherdata
  }
})

export const mutations = {
  setUserDataAfterlogin: (state, userData) => {
    state.user = userData

    for (const userKey in userData) {
      localStorage.setItem([userKey], userData[userKey])
    }
    for (const userKey in userData) {
      Cookie.set([userKey], (userData[userKey]), {
        expires: userData.expiresInDay
      })
    }
  },
  setUserPercent: (state, userPercent) => {
    state.user.TU_FUserLevel = userPercent

    localStorage.setItem('TU_FUserLevel', userPercent)
    Cookie.set('TU_FUserLevel', userPercent)
  },
  setUserData(state, userData) {
    state.user = {
      ...userData
    }
  },
  clearUserData: (state) => {
    for (const userKey in state.user) {
      state.user[userKey] = null
    }
  },
  setActiveUser: (state) => {
    state.user.TU_FActive = 1
    setUserActiveInCookieAndLocalStorage()
  },
  updateProfile: (state, updatedProfileData) => {
    for (const newDataKey in updatedProfileData) {
      state.user[newDataKey] = updatedProfileData[newDataKey]
    }
    updateCookieAndLocalStorage(updatedProfileData)
  },
  loggout: (state) => {
    clearSessionAndCookie(state.user, null, true)
  },
  changeCartItemsCount: (state, newCount) => {

    // chnageValueOfCartItemsCookieAndSession(newCount)
    state.user.cartItemsCount = newCount
  }
}

export const actions = {
  login: (vuexContext, userData) => {
    vuexContext.commit('setUserDataAfterlogin', userData)
  },
  setUserPercent: (vuexContext, userPercent) => {
    vuexContext.commit('setUserPercent', userPercent)
  },
  loggout: (vuexContext) => {
    vuexContext.commit('clearUserData')
    vuexContext.commit('loggout')
  },
  // nuxtServerInit({
  //   dispatch
  // }, {
  //   req
  // }) {
  //   dispatch('login/initAuth', req)
  // },
  initAuth: (vuexContext, req) => {
    let user = {
      TU_FID: null,
      TU_FUserName: null,

      TU_FActive: null,
      TU_FUserLevel: null,

      TU_FNameFamil: null,
      TU_FCodeMeli: null,

      expiresIn: null,
      token: null,
      TU_FIsUser: null,
      TU_FID_Group: 0,
      TU_FPicAdd1: "",
      TU_FID_Access: "",
      expiresInDay: 0,
      cartItemsCount: 0
    }
    if (req) {
      if (!req.headers.cookie) {
        return
      }
      user = {
        ...createDataFromCookie(user, req)
      }
    } else {
      for (const userKey in user) {
        user[userKey] = localStorage.getItem([userKey])
      }
    }
    // checkhing for right values in user
    // for (const userKey in user) {
    //     if (!user[userKey]) {
    //         return
    //     }
    // }
    if (isTokenExpired(user.expiresIn)) {
      // loggout the user
      vuexContext.commit('clearUserData')
      clearSessionAndCookie(user, req)
    } else {
      vuexContext.commit('setUserData', user)


    }
  },
  setActiveUser: (vuexContext) => {
    vuexContext.commit('setActiveUser')
  },
  updateProfile: (vuexContext, updatedProfileData) => {
    vuexContext.commit('updateProfile', updatedProfileData)
  },
  changeCartItemsCount: (vuexContext, newCount) => {
    vuexContext.commit('changeCartItemsCount', newCount)
  },
  async initCartItems(vuexContext, req) {
    try {

      const authAxios = this.$axios.create({})
      authAxios.onRequest((config) => {
        config.headers.Authorization = 'Bearer ' + vuexContext.state.user.token
      })
      const response = await authAxios.$get(`/cart/get/itemCount/0`)

      if (response) {
        vuexContext.commit('changeCartItemsCount', response.data)
        Cookie.remove("cartItemsCount")
        Cookie.set("cartItemsCount", response.data)
      }
    }
    catch (error) {
      console.log(error);
    }
  },
}

export const getters = {
  isAuthenticated(state) {
    return (state.user.token != null) ? state.user.token : null
  },
  isUser: state => () => {
    return Number(state.user.TU_FIsUser)
  },
  getUserData: state => () => {
    let encodeUser = {}
    for (let key in state.user) {
      // حل مشکل کوکی برای حروف فارسی
      encodeUser[key] = decodeURIComponent(state.user[key] ? state.user[key] : '')
    }
    return encodeUser
  },
  getUserLevel: state => () => {
    return Number(state.user.TU_FUserLevel)
  },
  isUserActive: state => () => {
    return Number(state.user.TU_FActive)
  },
  // last number of TU_FID_Group
  groupType(state) {
    let group = 0
    if (state.user && state.user.TU_FID_Group) {
      group = Number(state.user.TU_FID_Group.split('').reverse()[0])
    }
    if (group == 0) {
      group = 1
    }
    return group
  },
  cartItemsCount(state) {
    return Number(state.user.cartItemsCount)
  }
}

function createDataFromCookie(neededData, req) {
  let extractedData = {
    ...neededData
  }
  const cookiesData = req.headers.cookie
    .split(";")
  for (const key in neededData) {
    for (const cookieData of cookiesData) {
      if (cookieData.trim().startsWith([key] + "=")) {
        extractedData[key] = cookieData.trim().split('=')[1]
      }
    }
  }
  // حل مشکل / کوکی در نمایش
  extractedData.TU_FPicAdd1 = createCorrectUrls(extractedData.TU_FPicAdd1)
  return extractedData
}

function isTokenExpired(tokenExpiration) {
  const expire = new Date(Number.parseInt(tokenExpiration) * 1000).getTime()
  const now = new Date().getTime()

  if (now > expire) {
    return true
  }

  return false
}

function clearSessionAndCookie(userData, req, loggout = false) {
  if (!loggout) {
    if (req) {
      for (const userKey in userData) {
        Cookie.remove([userKey])
      }
    } else {
      for (const userKey in userData) {
        localStorage.removeItem([userKey])
      }
    }
  } else {
    for (const userKey in userData) {
      Cookie.remove([userKey])
    }
    for (const userKey in userData) {
      localStorage.removeItem([userKey])
    }
  }
}

function setUserActiveInCookieAndLocalStorage() {
  Cookie.remove('TU_FActive')
  localStorage.removeItem('TU_FActive')

  Cookie.set('TU_FActive', 1)
  localStorage.setItem('TU_FActive', 1)
}
// urls that have  %5C instead of / or \
function createCorrectUrls(path) {
  let newPath = ''
  for (const [index, p] of path.split('%5C').entries()) {
    if (index === 0) {
      newPath += p
    } else {
      newPath += '/' + p
    }
  }
  return newPath
}

// for updating profile
function updateCookieAndLocalStorage(newData) {
  for (const key in newData) {
    localStorage.removeItem([key])
    Cookie.remove([key])
    localStorage.setItem([key], newData[key])
    Cookie.set([key], newData[key])
  }
}
