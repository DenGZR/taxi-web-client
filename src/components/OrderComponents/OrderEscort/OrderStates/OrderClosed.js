import React, { Component, PropTypes } from 'react'

export class OrderClosed extends Component {
  static propTypes = {
    orderState: PropTypes.string,
    stopTimer: PropTypes.func,
    clearMap: PropTypes.func,
    clearOrderId: PropTypes.func,
    redirectToPage: PropTypes.func
  }
  componentDidMount () {
    const { stopTimer, clearMap, clearOrderId } = this.props
    setTimeout(() => {
      window.localStorage.removeItem('currentOrderId')
      stopTimer()
      clearMap()
      clearOrderId({orderId: null})
      console.log('Timer was deactivated, and Map cleared')
    }, 3000)
  }
  render () {
    const { orderState, redirectToPage } = this.props
    return (
      <div className='submain'>
        <div className='notification car-is-here'>
          <h3 className='notification-title'>
            {(() => {
              switch (orderState) {
                case 'complete': return 'Заказ завершен'
                default: return 'Ваш заказ был завершен'
              }
            })()}
          </h3>
          <hr/>
          <div className='notification-content'>
            <p className='notification-lightText'>
              {(() => {
                switch (orderState) {
                  case 'canceled_by_client': return 'Заказ отменен клиентом'
                  case 'canceled_by_driver': return 'Заказ отменен водителем'
                  case 'canceled_by_operator': return 'Заказ отменен оператором'
                  case 'complete': return 'Спасибо. Ваш заказ был успешно завершен'
                  default: return 'Никто еще не отменил Ваш заказ'
                }
              })()}
            </p>
          </div>
          <hr/>
          <div className='notification-cta'>
            <button onClick={redirectToPage} className='notification-blueButton'>Новый заказ?</button>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderClosed
