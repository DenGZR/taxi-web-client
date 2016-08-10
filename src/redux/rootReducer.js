import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import auth from './modules/auth'
import normalizePhone from '../components/utils/normalizePhone'
import apiSignup from './modules/apiSignup'
import order from './modules/order'
import fieldsUtils from './modules/fieldsUtils'
import mapUtils from './modules/mapUtils'
import cookieUtils from './modules/cookieUtils'
import notifier from './modules/notifier'
import helperModule from './modules/helperModule'
import websockets from './modules/websockets'
import driverModule from './modules/driverModule'

export default combineReducers({
  auth,
  order,
  apiSignup,
  router,
  fieldsUtils,
  mapUtils,
  cookieUtils,
  notifier,
  websockets,
  driverModule,
  helperModule,
  form: formReducer.normalize({
    PasswordRestore: {
      phone: normalizePhone
    },
    PassengerRegistartion: {
      login: normalizePhone
    }
  })
})
