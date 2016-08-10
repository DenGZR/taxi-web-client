import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import { cookieCheker } from '../redux/modules/cookieUtils'
import { checkForReview, fetchAddons, fetchCurrentTariff } from '../redux/modules/order'

export default class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired
  }
  componentWillMount () {
    this._initialCheckIfTokenPresent
  }

  get content () {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    )
  }

  get devTools () {
    if (__DEBUG__) {
      if (__DEBUG_NEW_WINDOW__) {
        if (!window.devToolsExtension) {
          require('../redux/utils/createDevToolsWindow').default(this.props.store)
        } else {
          window.devToolsExtension.open()
        }
      } else if (!window.devToolsExtension) {
        const DevTools = require('containers/DevTools').default
        return <DevTools />
      }
    }
  }
  get _initialCheckIfTokenPresent () {
    const { store } = this.props
    store.dispatch(cookieCheker('token'))
    store.dispatch(fetchAddons())
    store.dispatch(fetchCurrentTariff())
    if (store.getState().cookieUtils.cookiePresent) {
      // store.dispatch(getCurrentOrder())
    } else {
      // console.log('Cookie not found')
    }
    if (window.localStorage.lastOrderIdForReview) {
      store.dispatch(checkForReview())
    }
  }
  render () {
    return (
      <Provider store={this.props.store}>
        <div className='Im_in_Provider_for_DEV-TOOLS'>
          {this.content}
          {this.devTools}
        </div>
      </Provider>
    )
  }
}
