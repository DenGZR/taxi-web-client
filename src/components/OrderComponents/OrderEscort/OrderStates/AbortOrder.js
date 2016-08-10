import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { orderAbort, goToCar } from '../../../../redux/modules/order'

export class AbortOrder extends Component {
  constructor () {
    super()
    this._goToCar = this._goToCar.bind(this)
    this._cancelCurrentOrder = this._cancelCurrentOrder.bind(this)
  }
  static propTypes = {
    orderCondition: PropTypes.object.isRequired,
    orderAbort: PropTypes.func.isRequired,
    goToCar: PropTypes.func.isRequired
  }
  _goToCar (e) {
    const { goToCar } = this.props
    goToCar()
  }
  _cancelCurrentOrder (e) {
    const { orderAbort } = this.props
    orderAbort({aborting: true})
  }
  render () {
    const { orderState, goToCar } = this.props.orderCondition
    const showOK = (orderState === 'waiting_for_client') && !goToCar ? 'true' : ''
    return (
      <div className='aborting'>
        <button className='notification-whiteButton' onClick={this._cancelCurrentOrder}>Отмена заказ</button>
        {showOK ? <button className='notification-blueButton' onClick={this._goToCar}>OK</button> : null}
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  orderCondition: {
    ...state.order.orderCondition,
    goToCar: state.order.goToCar
  }
})
export default connect((mapStateToProps), {
  orderAbort,
  goToCar
})(AbortOrder)
