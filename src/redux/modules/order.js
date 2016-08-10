import axios from 'axios'
import { push } from 'react-router-redux'
import { incomingNotice } from './notifier'
import { clearMap } from './mapUtils'

import { cookieCheker } from './cookieUtils'
import { createConnectionWS } from './websockets'

export const ROOT_URL = 'https://api.psyco.com.ua:443/api'
export const CHECK_USER_URL = 'https://api.psyco.com.ua:443/api/client/check/?login='

export const RECEIVE_ADDITIONALS = 'RECEIVE_ADDITIONALS'
export const RECEIVE_TARIFF = 'RECEIVE_TARIFF'
export const USER_STATUS = 'USER_STATUS'
export const CALCULATING_ROUTES = 'CALCULATING_ROUTES'
export const CALCULATING = 'CALCULATING'
export const FARE = 'FARE'
export const SENDED_ORDER_DATA = 'SENDED_ORDER_DATA'
export const SET_TIMER = 'SET_TIMER'
export const CLEAR_TIMER = 'CLEAR_TIMER'
export const ORDER_EXIST = 'ORDER_EXIST'
export const ORDER_CONDITION_CHANGE = 'ORDER_CONDITION_CHANGE'
export const PREPARE_ORDER_ABORTING = 'PREPARE_ORDER_ABORTING'
export const DRIVER_DETAIL = 'DRIVER_DETAIL'
export const CHECK_LAST_ORDER = 'CHECK_LAST_ORDER'
export const ORDER_ID_EXIST = 'ORDER_ID_EXIST'
export const CLEAR_ORDER_ID = 'CLEAR_ORDER_ID'
export const REVIEW_SEND = 'REVIEW_SEND'
export const COMPLETE_ORDER = 'COMPLETE_ORDER'
export const REQUIRE_REVIEW = 'REQUIRE_REVIEW'
export const REFRESH_STATE = 'REFRESH_STATE'
export const USED_ADDONS_CHANGE = 'USED_ADDONS_CHANGE'
export const PASSENGERS_COUNT = 'PASSENGERS_COUNT'
export const ORDER_DESTINATION = 'ORDER_DESTINATION'
export const COMMENT = 'COMMENT'
export const USER_PHONE = 'USER_PHONE'
export const SCHEDULE_AT = 'SCHEDULE_AT'
export const GO_TO_CAR = 'GO_TO_CAR'
export const CLEAR_STATE = 'CLEAR_STATE'

export function clearPreviousOrderState (data = {}) {
  return {
    type: CLEAR_STATE,
    payload: data
  }
}
export function clientLeave (leave = false) {
  return {
    type: GO_TO_CAR,
    payload: leave
  }
}
export function scheduledAt (data = {}) {
  return {
    type: SCHEDULE_AT,
    payload: data
  }
}
export function receiveUserPhone (phone = 0) {
  return {
    type: USER_PHONE,
    payload: phone
  }
}
export function commentChange (comment = '') {
  return {
    type: COMMENT,
    payload: comment
  }
}
export function orderDestinations (data = {}) {
  return {
    type: ORDER_DESTINATION,
    payload: data
  }
}
export function passengersChange (event = {}) {
  return {
    type: PASSENGERS_COUNT,
    payload: parseInt(event.target.value)
  }
}
export function reviewWasSend (data = {}) {
  return {
    type: REVIEW_SEND,
    payload: data
  }
}
export function refreshState (data = {}) {
  return {
    type: REFRESH_STATE,
    payload: data
  }
}
export function reqReview (data = {}) {
  return {
    type: REQUIRE_REVIEW,
    payload: data
  }
}
export function orderComplete (data = {}) {
  return {
    type: COMPLETE_ORDER,
    payload: data
  }
}
export function clearOrderId (data = {}) {
  return {
    type: CLEAR_ORDER_ID,
    payload: data
  }
}
export function hasActiveOrder (orderId = 0) {
  return {
    type: ORDER_ID_EXIST,
    payload: orderId
  }
}
export function receiveOrderEscortInfo (data = {}) {
  return {
    type: DRIVER_DETAIL,
    payload: data
  }
}
export function orderAbort (data = {}) {
  return {
    type: PREPARE_ORDER_ABORTING,
    payload: data
  }
}
export function getOrderCondition (data = {}) {
  return {
    type: ORDER_CONDITION_CHANGE,
    payload: data
  }
}
export function setTimer (timerId = 0) {
  return {
    type: SET_TIMER,
    payload: timerId
  }
}
export function clearTimer (data = {}) {
  return {
    type: CLEAR_TIMER,
    payload: data
  }
}
export function orderExist (data = {}) {
  return {
    type: ORDER_EXIST,
    payload: data
  }
}
export function calculatingProcessed (data = {}) {
  return {
    type: CALCULATING,
    payload: data
  }
}
export function receiveDataAfterOrderSend (data = {}) {
  return {
    type: SENDED_ORDER_DATA,
    payload: data
  }
}

export function fare (num = 0) {
  return {
    type: FARE,
    payload: {fare: num}
  }
}
export function receiveAddons (addons = []) {
  return {
    type: RECEIVE_ADDITIONALS,
    payload: addons
  }
}

export function userStatus (user = false) {
  return {
    type: USER_STATUS,
    payload: user
  }
}

export function receiveTariff (tariffs = []) {
  return {
    type: RECEIVE_TARIFF,
    payload: tariffs
  }
}
export function usedAddonsChange (addon = []) {
  return {
    type: USED_ADDONS_CHANGE,
    payload: addon
  }
}

export function distanceAndDuration (routesData = {}) {
  return {
    type: CALCULATING_ROUTES,
    payload: routesData
  }
}
export function fetchCurrentTariff (path = '/client/') {
  return function (dispatch) {
    return axios.get(`${ROOT_URL}${path}tariff/list`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    .then(function (response) {
      dispatch(receiveTariff(response.data[0]))
    })
    .catch((response) => {
      dispatch(incomingNotice({
        isError: true,
        errorMessage: `Error in fetchCurrentTariff --> ${response}`
      }))
    })
  }
}

export function fetchAddons (path = '/client/') {
  return function (dispatch) {
    return axios.get(`${ROOT_URL}${path}tariff/list_addons`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    .then(function (response) {
      dispatch(receiveAddons(response.data))
    })
    .catch((response) => {
      dispatch(incomingNotice({
        isError: true,
        errorMessage: `Error in fetchAddons --> ${response}`
      }))
    })
  }
}

export function checkUser (login = {}) {
  return function (dispatch) {
    return axios.get(`${CHECK_USER_URL}${login}`)
      .then((response) => {
        //debugger
        console.log(response)
        if (response.data.result === 'user_exist') {
          console.log({user: true})
          dispatch(userStatus(true))
        } else {
          console.log({user: false})
          dispatch(userStatus(false))
        }
      })
  }
}

export function calculateTripCost () {
  return function (dispatch, getState) {
    dispatch(calculatingProcessed({calculating: true}))
    const { km_price, boarding_price, distance_included } = getState().order.fetchedTariffs
    const { distance, duration } = getState().mapUtils.routeData
    const additional = [...getState().order.fetchedAddons]
    const usedAddons = [...getState().order.prepareOrder.tariff_addons]

    console.log(distance_included, boarding_price, distance, duration, km_price)
    let overIncludeDistancePrice = 0
    if (distance_included * 1000 < distance) {
      overIncludeDistancePrice = ((distance - distance_included * 1000) * km_price) / 1000
    }

    var addonsCost = 0
    usedAddons.forEach(function (item) {
      var addon = null
      additional.forEach((addItem) => {
        if (addItem.id === item) {
          addon = addItem
        }
      })
      switch (addon.price_type) {
        case 'fixed':
          addonsCost += addon.price
          break
        case 'per_hour':
          addonsCost += addon.price * (duration / 3600)
          break
        case 'per_distance':
          addonsCost += addon.price * (distance / 1000)
          break
        default:
          addonsCost += 0
      }
    })
    var cost = Math.ceil(boarding_price + overIncludeDistancePrice + addonsCost)
    console.log(cost)
    // dispatch(toPay(cost))
    setTimeout(() => {
      dispatch(fare(cost))
      dispatch(calculatingProcessed({calculating: false}))
    }, 2000)
  }
}

export function sendOrderToServer () {
  return function (dispatch, getState) {
    dispatch(createConnectionWS())
    //debugger;
    const orderData = getState().order.prepareOrder
    dispatch(cookieCheker('token'))
    return axios.post(`${ROOT_URL}/client/neworder`, orderData, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization-Token': getState().cookieUtils.cookieToken
      }
    })
    .then((response) => {
      if (response.data.error || response.data.error_code) {
        dispatch(incomingNotice({
          isFail: true,
          errorMessage: 'Ошибка на сервере попробуйте позже.'
        }))
        console.log(response)
      } else {
        window.localStorage.setItem('currentOrderId', response.data.order_id)
        dispatch(receiveDataAfterOrderSend({
          orderSuccess: true,
          orderId: response.data.order_id,
          receivedData: response.data,
          orderComplete: false
        }))
        console.log(response)
      }
    })
  }
}

export function sendTripReview (data = {}) {
  console.log(data)
  debugger
  // доделать редирект после оценки заказа
  return function (dispatch, getState) {
    return axios.post(`${ROOT_URL}/client/orders/feedback`, data , {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization-Token': getState().cookieUtils.cookieToken
      }
    })
    .then((response) => {
      //debugger
      if (response.data.error || response.data.error_code) {
        dispatch(incomingNotice({
          isFail: true,
          errorMessage: response.data.error
        }))
        console.log('error detected', response)
      } else {
        console.log(response.data)
        window.localStorage.removeItem('lastOrderIdForReview')
        dispatch(incomingNotice({
          notice: response.data.note
        }))
        dispatch(reviewWasSend({orderReview: true, requireReview: false}))
        dispatch(push('/passenger/'))
      }
    })
    .catch((response) => {
      console.log(response)
    })
  }
}

export function getCurrentOrder () {
  console.log('ENTER --- CHECK CURRENT ORDER')
  return function (dispatch, getState) {
    console.log('state', getState());
    const cookiesState = getState().cookieUtils
    const orderState = getState().order

    return axios.get(`${ROOT_URL}/client/orders/current`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization-Token': getState().cookieUtils.cookieToken
      }
    })
    .then((response) => {
      if (response.data.error || response.data.error_code) {
        dispatch(incomingNotice({
          isFail: true,
          errorMessage: response.data.error
        }))
        console.log('error detected', response)
      } else {
        console.log(response.data)
        if (response.data.note === 'No active orders') {
          window.localStorage.removeItem('currentOrderId')
          dispatch(clearOrderId({orderId: null}))
          dispatch(stopTimer())
          dispatch(incomingNotice({
            notice: response.data.note
          }))
        } else if (cookiesState.cookiePresent) {
          if (!window.localStorage.currentOrderId) {
            window.localStorage.setItem('currentOrderId', response.data.id)
          }
          if (!window.localStorage.lastOrderIdForReview) {
            window.localStorage.setItem('lastOrderIdForReview', response.data.id)
          }
          if (!orderState.timerID && window.localStorage.currentOrderId) {
            dispatch(runTimer())
          }
          dispatch(receiveOrderEscortInfo({
            driverProfile: response.data.driver,
            carProfile: response.data.car,
            serverPrice: response.data.calculated_price,
            orderId: response.data.id
          }))
        }
        console.log('EXIT --- CHECK CURRENT ORDER')
      }
    })
    .catch((response) => {
      dispatch(incomingNotice({
        isError: true,
        errorMessage: `Error in getCurrentOrder --> ${response}`
      }))
    })
  }
}
export function getOrdersList (status = 'new') {
  return function (dispatch, getState) {
    return axios.get(`${ROOT_URL}/client/orders/list?status=${status}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization-Token': getState().cookieUtils.cookieToken
      }
    })
    .then((response) => {
      if (response.data.error || response.data.error_code) {
        dispatch(incomingNotice({
          isFail: true,
          errorMessage: response.data.error
        }))
        console.log('error detected', response)
      } else {
        console.log(response)
      }
    })
    .catch((response) => {
      console.log(response)
    })
  }
}
export function getOrderStatus (orderId) {
  return function (dispatch, getState) {
    let orderID = orderId || getState().order.orderId
    return axios.get(`${ROOT_URL}/client/orders/get/status?id=${orderID}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization-Token': getState().cookieUtils.cookieToken
      }
    })
    .then((response) => {
      if (response.data.error || response.data.error_code) {
        dispatch(incomingNotice({
          isFail: true,
          errorMessage: response.data.error
        }))
        console.log('error detected', response)
      } else {
        // console.log(response.data)
        const currentStatus = getState().order.orderCondition.orderStatus
        const responseStatus = response.data.order_status
        const currentState = getState().order.orderCondition.orderState
        const responseState = response.data.order_state
        if (currentStatus !== responseStatus || currentState !== responseState) {
          if (response.data.order_status === 'active') {
            dispatch(getCurrentOrder())
          }
          if (responseState === 'on_route') {
            dispatch(clientLeave({goToCar: false}))
          }
          dispatch(getOrderCondition({
            orderStatus: response.data.order_status,
            orderState: response.data.order_state
          }))
        }
      }
    })
    .catch((response) => {
      console.log('catch error', response)
    })
  }
}
export const refreshOrderCondition = (data = {}) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch(getOrderCondition(data))
      resolve()
    })
  }
}
export function getOrderById (id = 2, parseDriverProfile = false) {
  return function (dispatch, getState) {
    const orderId = id || getState().order.orderId
    return axios.get(`${ROOT_URL}/client/orders/get?id=${orderId}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization-Token': getState().cookieUtils.cookieToken
      }
    })
    .then((response) => {
      if (response.data.error || response.data.error_code) {
        dispatch(incomingNotice({
          isFail: true,
          errorMessage: response.data.error
        }))
        console.log('error detected', response)
      } else {
        console.log(response)
        if (parseDriverProfile) {
          dispatch(receiveOrderEscortInfo({
            driverProfile: response.data.driver,
            carProfile: response.data.car
          }))
        }
      }
    })
    .catch((response) => {
      console.log(response)
    })
  }
}

export function cancelOrderById (comment = '') {
  return function (dispatch, getState) {
    return axios.post(`${ROOT_URL}/client/orders/cancel`, {
      comment: comment,
      order_id: getState().order.orderId || window.localStorage.currentOrderId
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization-Token': getState().cookieUtils.cookieToken
      }
    })
    .then((response) => {
      if (response.data.error || response.data.error_code) {
        dispatch(incomingNotice({
          isFail: true,
          errorMessage: response.data.error
        }))
        console.log('error detected', response)
      } else {
        console.log(response.data)
        window.localStorage.removeItem('lastOrderIdForReview')
        window.localStorage.removeItem('currentOrderId')
        dispatch(stopTimer())
        dispatch(clearOrderId({orderId: null}))
        dispatch(clearMap())
        dispatch(redirectToPage())
        dispatch(incomingNotice({
          notice: response.data.note
        }))
      }
    })
    .catch((response) => {
      console.log(response)
    })
  }
}
export function runTimer () {
  return function (dispatch, getState) {
    // run timer for status checker and write for statuses and states parser
    const timerID = setInterval(() => {
      dispatch(getOrderStatus(getState().order.orderId))
    }, 5000)
    dispatch(setTimer(timerID))
  }
}
export function stopTimer () {
  return function (dispatch, getState) {
    clearInterval(getState().order.timerID)
    dispatch(clearTimer({timerID: null}))
  }
}
export function lastOrderChecker () {
  return function (dispatch, getState) {
    // check if saved order id in localStorage has status active do magic
    // check current order if present use id to escort client in app
  }
}
export const redirectToPage = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return new Promise((resolve: Function): void => {
      setTimeout(() => {
        console.log('redirect')
        dispatch(orderComplete({orderComplete: true, fare: null}))
        dispatch(clearPreviousOrderState({
          start_point: null,
          end_point: null,
          client_comment: null,
          way_points: [],
          scheduled: false,
          scheduled_at: '',
          passengers: 1,
          tariff_addons: [],
          on_city: false
        }))
        setTimeout(() => {
          dispatch(refreshState({shouldRefresh: true}))
        }, 500)
        resolve()
      }, 200)
    })
  }
}
export const checkForReview = ():Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return new Promise((resolve: Function): void => {
      dispatch(reqReview({requireReview: true}))
      resolve()
    })
  }
}
export const goToCar = () => {
  return (dispatch, getState) => {
    return axios.get(`${ROOT_URL}/client/orders/go_to_car`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization-Token': getState().cookieUtils.cookieToken
      }
    })
    .then((response) => {
      if (response.data.error || response.data.error_code) {
        dispatch(incomingNotice({
          isFail: true,
          errorMessage: response.data.error
        }))
        console.log('error detected', response)
      } else {
        console.log(response)
        dispatch(clientLeave({goToCar: true}))
      }
    })
    .catch((response) => {
      console.log(response)
    })
  }
}
export const actions = {
  goToCar,
  reqReview,
  refreshState,
  refreshOrderCondition,
  checkForReview,
  redirectToPage,
  calculateTripCost,
  checkUser,
  userStatus,
  receiveAddons,
  receiveTariff,
  fetchAddons,
  fetchCurrentTariff,
  distanceAndDuration,
  fare,
  sendOrderToServer,
  sendTripReview,
  getCurrentOrder,
  getOrderById,
  getOrdersList,
  orderAbort,
  cancelOrderById,
  getOrderStatus,
  setTimer,
  stopTimer,
  clearTimer,
  runTimer,
  orderExist,
  getOrderCondition,
  receiveOrderEscortInfo,
  hasActiveOrder,
  clearOrderId,
  orderComplete,
  usedAddonsChange,
  passengersChange,
  orderDestinations,
  commentChange,
  receiveUserPhone,
  scheduledAt,
  clientLeave,
  clearPreviousOrderState
}

const ACTION_HANDLERS = {
  [RECEIVE_TARIFF]: (state, action) => Object.assign({}, state, {
    fetchedTariffs: action.payload
  }),
  [RECEIVE_ADDITIONALS]: (state, action) => Object.assign({}, state, {
    fetchedAddons: [...action.payload]
  }),
  [USER_STATUS]: (state, action) => {
    const userData = Object.assign({}, state.userData, {user: action.payload})
    return Object.assign({}, state, { userData })
  },
  [USER_PHONE]: (state, action) => {
    const userData = Object.assign({}, state.userData, {userPhone: action.payload})
    return Object.assign({}, state, { userData })
  },
  [SCHEDULE_AT]: (state, action) => {
    const prepareOrder = Object.assign({}, state.prepareOrder, action.payload)
    return Object.assign({}, state, { prepareOrder })
  },
  [CALCULATING_ROUTES]: (state, action) => Object.assign({}, state, {calculatedRoutes: action.payload}),
  [CALCULATING]: (state, action) => Object.assign({}, state, action.payload),
  [FARE]: (state, action) => Object.assign({}, state, action.payload),
  [SET_TIMER]: (state, action) => Object.assign({}, state, {timerID: action.payload}),
  [CLEAR_TIMER]: (state, action) => Object.assign({}, state, action.payload),
  [SENDED_ORDER_DATA]: (state, action) => Object.assign({}, state, action.payload),
  [ORDER_EXIST]: (state, action) => Object.assign({}, state, action.payload),
  [ORDER_CONDITION_CHANGE]: (state, action) => Object.assign({}, state, {orderCondition: action.payload}),
  [PREPARE_ORDER_ABORTING]: (state, action) => Object.assign({}, state, action.payload),
  [DRIVER_DETAIL]: (state, action) => Object.assign({}, state, action.payload),
  [CLEAR_ORDER_ID]: (state, action) => Object.assign({}, state, action.payload),
  [REVIEW_SEND]: (state, action) => Object.assign({}, state, action.payload),
  [COMPLETE_ORDER]: (state, action) => Object.assign({}, state, action.payload),
  [REQUIRE_REVIEW]: (state, action) => Object.assign({}, state, action.payload),
  [CLEAR_STATE]: (state, action) => Object.assign({}, state, {prepareOrder: action.payload}),
  [GO_TO_CAR]: (state, action) => Object.assign({}, state, action.payload),
  [PASSENGERS_COUNT]: (state, action) => {
    const prepareOrder = Object.assign({}, state.prepareOrder, {passengers: action.payload})
    return Object.assign({}, state, {prepareOrder: prepareOrder})
  },
  [REFRESH_STATE]: (state, action) => Object.assign({}, state, action.payload),
  [USED_ADDONS_CHANGE]: (state, action) => {
    const prepareOrder = Object.assign({}, state.prepareOrder, {tariff_addons: [...action.payload]})
    return Object.assign({}, state, {prepareOrder: prepareOrder})
  },
  [ORDER_DESTINATION]: (state, action) => {
    const prepareOrder = Object.assign({}, state.prepareOrder, action.payload)
    return Object.assign({}, state, {prepareOrder: prepareOrder})
  },
  [COMMENT]: (state, action) => {
    const prepareOrder = Object.assign({}, state.prepareOrder, action.payload)
    return Object.assign({}, state, {prepareOrder: prepareOrder})
  }
}

const initial = {
  calculating: false,
  fetchedAddons: [],
  fetchedTariffs: null,
  isFetching: false,
  fare: null,
  userData: {
    user: false,
    userPhone: null
  },
  calculatedRoutes: null,
  orderSuccess: false,
  orderExist: false,
  orderId: null,
  receivedData: null,
  orderList: null,
  currentOrder: null,
  timerID: null,
  aborting: false,
  driverProfile: null,
  serverPrice: null,
  orderReview: false,
  orderCondition: {
    orderStatus: false,
    orderState: null
  },
  orderComplete: true,
  goToCar: false,
  requireReview: false,
  shouldRefresh: false,
  prepareOrder: {
    start_point: null,
    end_point: null,
    client_comment: null,
    way_points: [],
    scheduled: false,
    scheduled_at: '',
    passengers: 1,
    tariff_addons: [],
    on_city: false
  }
}

export default function order (state = initial, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
