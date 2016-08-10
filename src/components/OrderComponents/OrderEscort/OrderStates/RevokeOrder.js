import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { cancelOrderById, orderAbort } from '../../../../redux/modules/order'

export class RevokeOrder extends Component {
  constructor (props) {
    super(props)
    this._cancelOrder = this._cancelOrder.bind(this)
    this._textareaChange = this._textareaChange.bind(this)
    this._cancelOrderAborting = this._cancelOrderAborting.bind(this)
    this.state = {
      comment: ''
    }
  }
  static propTypes = {
    cancelOrderById: PropTypes.func,
    orderAbort: PropTypes.func
  }
  _cancelOrder () {
    const { cancelOrderById } = this.props
    const { comment } = this.state
    cancelOrderById(comment)
  }
  _textareaChange (e) {
    this.setState({
      comment: e.target.value.substr(0, 200)
    })
  }
  _cancelOrderAborting (e) {
    const { orderAbort } = this.props
    orderAbort({aborting: false})
  }
  render () {
    return (
      <section className='unlogin-booking'>
        <div className='submain'>
          <div className='notification order-success'>
            <h3 className='notification-title'>
              Отменить заказ?
            </h3>
            <hr/>
            <div className='notification-content'>
              <p className='notification-lightText'>Пожалуйста, укажите причину </p>
              <p><textarea
                onInput={this._textareaChange}
                value={this.state.comment}
                rows='3'
                name='text'
                placeholder='причина отмены заказа'/></p>
            </div>
            <hr/>
            <div className='notification-cta'>
              <button className='notification-whiteButton' onClick={this._cancelOrderAborting}>Нет</button>
              <button className='notification-blueButton' onClick={this._cancelOrder}>Да</button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default connect(null, {
  cancelOrderById,
  orderAbort
})(RevokeOrder)
