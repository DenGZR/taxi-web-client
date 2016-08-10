import axios from 'axios'
export const ROOT_URL = 'https://api.psyco.com.ua:443/api'
// ------------------------------------
// Constants
// ------------------------------------
export const RECEIVE_BALANCE = 'RECEIVE_BALANCE'
export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS'
export const FETCHING_DATA = 'FETCHING_DATA'
// ------------------------------------
// Actions
// ------------------------------------
export function fetchingData (data = false) {
  return {
    type: FETCHING_DATA,
    payload: data
  }
}
export function receiveBalance (data = {}) {
  return {
    type: RECEIVE_BALANCE,
    payload: data
  }
}
export function receiveTransactions (data = {}) {
  return {
    type: RECEIVE_TRANSACTIONS,
    payload: data
  }
}

export const getBalance = () => {
  return (dispatch, getState) => {
    dispatch(fetchingData({isFetching: true}))
    return axios.get(`${ROOT_URL}/driver/balance`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization-Token': getState().cookieUtils.cookieToken
      }
    })
    .then((response) => {
      console.log(response.data.data)
      dispatch(receiveBalance(response.data.data))
      dispatch(fetchingData({isFetching: false}))
    })
  }
}
export const getTransactions = () => {
  return (dispatch, getState) => {
    return axios.get(`${ROOT_URL}/driver/balance/transactions`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization-Token': getState().cookieUtils.cookieToken
      }
    })
    .then((response) => {
      console.log(response.data.data)
    })
  }
}

export const actions = {
  getBalance,
  getTransactions,
  receiveBalance,
  receiveTransactions,
  fetchingData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCHING_DATA]: (state, action) => Object.assign({}, state, action.payload),
  [RECEIVE_BALANCE]: (state, action) => Object.assign({}, state, {balance: action.payload}),
  [RECEIVE_TRANSACTIONS]: (state, action) => Object.assign({}, state, action.payload)
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  balance: {
    Amount: 100,
    Bonus: 100,
    Fuel: 100,
    DriverId: null,
    Id: null
  },
  transactions: [
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 555,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 756,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 111,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 2,
      'CreatedAt': '2016-06-15T19:00:07+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 10000,
      'Direction': 'out',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 11
    },
    {
      'Id': 1,
      'CreatedAt': '2016-06-15T18:59:45+02:00',
      'DriverId': 1,
      'SubType': 'account',
      'Amount': 158,
      'Direction': 'in',
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      'OrderId': 0
    }
  ]
}
export default function driverModule (state: number = initialState, action: Action): number {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
