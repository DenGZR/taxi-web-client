import React, { Component, PropTypes } from 'react'

import AbortOrder from './AbortOrder'

export class SuccessAndSearch extends Component {
  static propTypes = {
    orderState: PropTypes.string
  }
  render () {
    return (
      <div className='submain'>
        <div className='notification car-is-here'>
          <h3 className='notification-title'>
            Заказ был успешно создан
          </h3>
          <hr/>
          <div className='notification-content'>
            <p className='notification-lightText'>Поиск машины</p>
            <p className='notification-lightText'>Пожалуйста подождите...</p>
          </div>
          <hr/>
          <div className='notification-cta'>
            <AbortOrder />
          </div>
        </div>
      </div>
    )
  }
}

export default SuccessAndSearch
