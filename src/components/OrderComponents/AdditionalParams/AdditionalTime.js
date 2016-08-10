import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// import DateTime from 'react-datetime-gasya'
import moment from 'moment'
import DateTime from 'react-datetime'

import { incomingNotice } from '../../../redux/modules/notifier'
import { scheduledAt } from '../../../redux/modules/order'

export class AdditionalTime extends Component {
  constructor (props) {
    super(props)
    this._changeDate = this._changeDate.bind(this)
    this._timeout
  }
  static propTypes = {
    scheduled: PropTypes.bool.isRequired,
    incomingNotice: PropTypes.func.isRequired,
    scheduledAt: PropTypes.func.isRequired
  }
  _changeDate (e) {
    const { incomingNotice, scheduledAt } = this.props
    clearTimeout(this._timeout)
    this._timeout = setTimeout(() => {
      const Delta = parseInt(((e.format('x') - new Date().getTime()) / 1000) / 60)
      if (Delta >= 30) {
        scheduledAt({
          scheduled: true,
          scheduled_at: e.format('YYYY-MM-DD HH:mm')
        })
        console.log(e.format('YYYY-MM-dd HH:mm'))
      } else {
        incomingNotice({
          isFail: true,
          errorMessage: '\"Время подачи\": не раньше, чем за 30 минут.'
        })
      }
    }, 700)
  }
  render () {
    const closeOnSelect = true
    const YESTERDAY = moment().subtract(1, 'day')
    const VALID = function (current) {
      return current.isAfter(YESTERDAY)
    }
    return (
      <div style={{position: 'relative'}}>
        <label htmlFor='dataField'>
          <span className='title-textinput'>Время подачи</span>
        </label>
        <div className='input-wrapper'>
          <DateTime
            onChange={this._changeDate}
            defaultValue={new Date()}
            isValidDate={VALID}
            className='date-block'
            closeOnSelect={closeOnSelect}
            inputProps={{'readOnly': 'readOnly', 'className': 'datetime-date input-date', 'id': 'dataField'}}
            dateFormat='DD.MM.YYYY'
            timeFormat='HH:mm'
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  scheduled: state.order.prepareOrder.scheduled
})
export default connect((mapStateToProps), {
  incomingNotice,
  scheduledAt
})(AdditionalTime)

// <DateTime
//   ref='timeField'
//   onChange={this._changeTime}
//   defaultValue={new Date()}
//   className='time-block'
//   viewMode='time'
//   timeFormat='HH:mm'
//   inputProps={{'readOnly': 'readOnly', 'className': 'datetime-time input-time', 'ref': 'timeSpot'}}
//   dateFormat={false}/>
