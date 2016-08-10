import React from 'react'
import { Route, IndexRedirect, Redirect, IndexRoute } from 'react-router'

import { hasCookie, getCookie } from '../redux/modules/cookieUtils'
// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.

import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import OrderView from 'views/OrderView/OrderView'
import Login from 'components/Login/Login'
import DriverProfileSettings from 'components/DriverProfileSettings'
import Signup from 'components/Signup'
import DriverView from 'components/DriverView/DriverView'
import DriverMain from 'components/DriverView/DriverMain'
import NotFound from 'components/NotFound'
import PasswordRestore from 'components/PasswordRestore'
import PassengerSettings from 'components/PassengerView/sub/PassengerSettings'
import PublicOffer from 'components/PublicOffer'


function requireAuthClient (nextState, replace) {
  console.log(getCookie('userType'))
  const userType = getCookie('userType')
  if (hasCookie('token') && userType === 'driver') {
    replace({
      pathname: '/driver/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
  if (!hasCookie('token')) {
    replace({
      pathname: '/passenger/signin',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
function requireAuthDriver (nextState, replace) {
  console.log(getCookie('userType'))
  const userType = getCookie('userType')
  if (hasCookie('token') && userType === 'passenger') {
    replace({
      pathname: '/passenger/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
  if (!hasCookie('token')) {
    replace({
      pathname: '/driver/signin',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
// <IndexRedirect to='passenger/' />
export default (store) => (
  <Route path='/' component={CoreLayout}>
    <Route path='/passenger/' component={OrderView}>
      <Route path='/passenger/order' component={OrderView} />
      <Route path='/passenger/signin' component={Login} />
      <Route path='/passenger/settings' component={PassengerSettings} onEnter={requireAuthClient} />
      <Route path='/passenger/profile/:id' component={Login} />
      <Route path='/passenger/signup' component={Signup} />
      <Redirect from='passenger/order' to='passenger/' />
    </Route>
    <Route path='/driver/' component={DriverMain}>
      <IndexRedirect to='/driver/info' />
      <Route path='/driver/signin' component={Login} />
      <Route path='/driver/info' component={DriverView} onEnter={requireAuthDriver}/>
      <Route path='/driver/settings' component={DriverProfileSettings} onEnter={requireAuthDriver}/>
      <Route path='/driver/signup' component={Signup} />
    </Route>
    <Route path='/forgot' component={PasswordRestore} />
    <Route path='/publicoffer' component={PublicOffer} />
    <Route path='*' component={NotFound}/>
  </Route>
)
// `/${mountPoint}` mountPoint = loggedUserType ? 'passenger' : 'driver'
