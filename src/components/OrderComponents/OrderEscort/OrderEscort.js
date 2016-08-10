import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { runTimer, stopTimer, clearOrderId, redirectToPage } from '../../../redux/modules/order'
import { clearMap } from '../../../redux/modules/mapUtils'

import TripReview from './OrderStates/TripReview'
import CarFound from './OrderStates/CarFound'
import RevokeOrder from './OrderStates/RevokeOrder'
import SuccessAndSearch from './OrderStates/SuccessAndSearch'
import OrderSuccess from './OrderStates/OrderSuccess'
import OrderClosed from './OrderStates/OrderClosed'

export class OrderEscort extends Component {
  constructor () {
    super()
    this._runTimerFunc = this._runTimerFunc.bind(this)
  }
  static propTypes = {
    uberState: PropTypes.object,
    runTimer: PropTypes.func,
    stopTimer: PropTypes.func,
    clearMap: PropTypes.func,
    clearOrderId: PropTypes.func,
    redirectToPage: PropTypes.func
  }
  componentWillMount () {
    const { timerID, orderId } = this.props.uberState
    if (!timerID && orderId) {
      console.log('should set timer')
      this._runTimerFunc()
    }
  }
  _runTimerFunc () {
    console.log('---Timer was activated---')
    const { runTimer } = this.props
    runTimer()
  }
  render () {
    const { orderStatus, orderState } = this.props.uberState.orderCondition
    const { aborting, driverProfile, carProfile, serverPrice } = this.props.uberState
    const { stopTimer, clearMap, clearOrderId, redirectToPage } = this.props

    // отдебажить сопровождение, проверить проверку на наличие заказа в Root.js,
    // а то не работает, и дотестить сопровождение и все такое, проверить все последние правки.
    // const orderStatus = 'closed'
    // const orderState = 'waiting_for_client'
    // lassName='order-escort-block'

    if (aborting) {
      return (
        <RevokeOrder />
      )
    }
    if (window.localStorage.lastOrderIdForReview && !orderStatus && !window.localStorage.currentOrderId) {
      return <TripReview />
    }
    return (
      <section className='unlogin-booking'>
        {(() => {
          switch (orderStatus) {
            case 'new': return <SuccessAndSearch />
            case 'active': return <CarFound
              orderState={orderState}
              driver={driverProfile}
              car={carProfile}
              cost={serverPrice}/>
            case 'closed': return <OrderClosed
              orderState={orderState}
              clearMap={clearMap}
              clearOrderId={clearOrderId}
              redirectToPage={redirectToPage}
              stopTimer={stopTimer}/>
            default: return <OrderSuccess />
          }
        })()}
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  uberState: state.order
})

export default connect((mapStateToProps), {
  runTimer,
  stopTimer,
  clearMap,
  clearOrderId,
  redirectToPage
})(OrderEscort)
