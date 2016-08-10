import React from 'react'

function orderSuccess () {
  return (
    <div className='submain'>
      <div className='notification order-success'>
        <h3 className='notification-title'>
          Ваш заказ обрабатывается
        </h3>
        <hr/>
        <div className='notification-content'>
          <p className='notification-lightText'>Пожалуйста подождите...<i className='clock-spinner'></i></p>
        </div>
      </div>
    </div>
  )
}

// orderSuccess.propTypes = {
//   activateTimer: PropTypes.func,
//   timerWasSet: PropTypes.number
// }

export default orderSuccess
