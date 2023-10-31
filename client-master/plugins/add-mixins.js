import Vue from 'vue'

import setDocumentTitle from './mixins/global-mixins/setDocumentTitle'
import isAuthenticated from './mixins/global-mixins/isAuthenticated'
import UserAccess from './mixins/global-mixins/UserAccess'
import isUser from './mixins/global-mixins/isUser'
import cartItemsCount from './mixins/global-mixins/userCartItems'
import numberSeparate from './mixins/global-mixins/numberSeparate'
import salePage from './mixins/global-mixins/salePage'
// import getUserGroupType from './mixins/global-mixins/getUserGroupType'
import toasted from './mixins/global-mixins/toasted'
import CurrentDate from './mixins/global-mixins/date'
import User from './mixins/global-mixins/user'
import setImageUrl from './mixins/global-mixins/setImageUrl'
// import getImageProfilePath from './mixins/global-mixins/getImageProfilePath'
import FormData from './mixins/global-mixins/FormData'
// import setNavbarOptions from './mixins/global-mixins/setNavbarOptions'
// import userCartItems from './mixins/global-mixins/userCartItems'
import currenyFormat from './mixins/global-mixins/currenyFormat'
import setDownloadUrl from './mixins/global-mixins/setDownloadUrl'
import download from './mixins/global-mixins/download'
// import setLoadingButtonHeaderManager from './mixins/global-mixins/setLoadingButtonHeaderManager'
// import UserAccess from './mixins/global-mixins/UserAccess'
// import timer from './mixins/global-mixins/timer'
// import getAndSetStaticSiteData from './mixins/global-mixins/getAndSetStaticSiteData'

Vue.mixin(setDocumentTitle)
Vue.mixin(isAuthenticated)
Vue.mixin(UserAccess)
Vue.mixin(isUser)
Vue.mixin(cartItemsCount)
Vue.mixin(numberSeparate)
Vue.mixin(salePage)
Vue.mixin(toasted)
Vue.mixin(CurrentDate)
Vue.mixin(User)
Vue.mixin(setImageUrl)
// Vue.mixin(getImageProfilePath)
Vue.mixin(FormData)
// Vue.mixin(getUserGroupType)
// Vue.mixin(setNavbarOptions)
// Vue.mixin(userCartItems)
Vue.mixin(currenyFormat)
Vue.mixin(setDownloadUrl)
Vue.mixin(download)
// Vue.mixin(setLoadingButtonHeaderManager)
// Vue.mixin(UserAccess)
// Vue.mixin(timer)
// Vue.mixin(getAndSetStaticSiteData)
