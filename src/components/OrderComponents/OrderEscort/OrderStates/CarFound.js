import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import AbortOrder from './AbortOrder'

export class TaxiDetail extends Component {
  constructor (props) {
    super(props)
    this._idleTimer = null
    this.elapsed = 0
    this._tick = this._tick.bind(this)
    this.state = {
      idleTime: null
    }
  }
  static propTypes = {
    orderState: PropTypes.string,
    driverProfile: PropTypes.object,
    driver: PropTypes.object,
    car: PropTypes.object,
    cost: PropTypes.number
  }
  componentWillReceiveProps (nextProp) {
    if (nextProp.orderState === 'idle_time' && !this._idleTimer) {
      this._tick()
    } else if (nextProp.orderState !== 'idle_time' && this._idleTimer) {
      this._clearTimerState()
    }
  }
  componentWillUnmount () {
    if (this._idleTimer) {
      this._clearTimerState()
    }
  }
  _clearTimerState () {
    // TIP: if dont need to save previous timer state clear this.elapsed
    clearInterval(this._idleTimer)
    this._idleTimer = null
    this.setState({
      idleTime: null
    })
    console.log('timer stop -->', this._idleTimer)
  }
  _tick () {
    var lastTime = new Date().getTime()
    this._idleTimer = setInterval(() => {
      var nextTikTime = new Date().getTime()
      this.elapsed += (nextTikTime - lastTime)
      let time = moment.duration(this.elapsed)
      const Minutes = time.minutes() < 10 ? `0${time.minutes()}` : time.minutes()
      const Seconds = time.seconds() < 10 ? `0${time.seconds()}` : time.seconds()
      this.setState({
        idleTime: `${Minutes}:${Seconds}`
      })
      lastTime = nextTikTime
    }, 16)
  }
  render () {
    const { orderState, driver, car, cost } = this.props
    console.log("TaxiDetail", this.props);
    const FIO = driver ? `${driver.first_name} ${driver.middle_name} ${driver.last_name}` : 'loading...'
    return (
      <div className='submain'>
        <div className='notification car-is-here'>
          <h3 className='notification-title'>
            {(() => {
              switch (orderState) {
                case 'drive_to_client': return 'Авто направляется к Вам'
                case 'waiting_for_client': return 'Авто подано'
                case 'idle_time': return 'IDLE ' + this.state.idleTime
                default: return 'удачной поездки'
              }
            })()}
          </h3>
          <hr/>
          <div className='notification-content'>
            <div className='car-is-here-driver'>
              <img src={'http://image.combotaxi.com/face/small_'+ driver.id +'.jpg'} alt='driver' className='driver-photo'/>
              <p className='boldText'>{FIO}</p>
              <p className='lightText'>Водитель</p>
            </div>
            <div className='car-is-here-car'>
              <img src={'http://image.combotaxi.com/car/small_'+ driver.id +'.jpg'} alt='car' className='car-photo'/>
              <p className='boldText'>{car ? car.car_brand : 'loading...'}</p>
              <p className='boldText'>{car ? car.car_number : 'loading...'}</p>
              <p className='lightText'>{car ? car.car_color : 'loading...'}</p>
            </div>
            <div className='car-is-here-price'>
              <p className='lightText'>Цена</p>
              <p className='boldText price'>{cost} грн</p>
            </div>
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

export default TaxiDetail
