import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Rating from 'react-rating'
import { sendTripReview, getOrderById } from '../../../../redux/modules/order'

export class TripReview extends Component {
  constructor (props) {
    super(props)
    this._sendRating = this._sendRating.bind(this)
    this._textareaChange = this._textareaChange.bind(this)
    this._ratingChange = this._ratingChange.bind(this)
    this.state = {
      textareaVal: null,
      rating: null
    }
  }
  static propTypes = {
    sendTripReview: PropTypes.func,
    orderInfo: PropTypes.object,
    getOrderById: PropTypes.func
  }
  componentWillMount () {
    const { getOrderById } = this.props
    if (!window.localStorage.currentOrderId) {
      getOrderById(window.localStorage.lastOrderIdForReview, true)
    }
  }
  _sendRating (e) {
    const { sendTripReview } = this.props
    const { textareaVal, rating } = this.state
    // const { orderId } = this.props.orderInfo

    if (window.localStorage.lastOrderIdForReview) {
      sendTripReview({
        order_id: parseInt(window.localStorage.lastOrderIdForReview),
        client_comment: textareaVal || '',
        rating: rating || 0
      })
    }
  }
  _textareaChange (e) {
    this.setState({
      textareaVal: e.target.value.substr(0, 200)
    })
  }
  _ratingChange (e) {
    this.setState({
      rating: e
    })
  }
  render () {
    const { carProfile } = this.props.orderInfo
    const { driverProfile } = this.props.orderInfo
    console.log("carProfile",carProfile);
    console.log("driverProfile",driverProfile);
    console.log(this.props);
    const FIO = driverProfile ? `
      ${driverProfile.first_name}
      ${driverProfile.middle_name}
      ${driverProfile.last_name}
     ` : 'loading...'
    const CAR = driverProfile ? `${carProfile.car_brand} ${carProfile.car_number}` : 'loading...'
    // console.log(this.props)
    return (
      <section className='unlogin-booking'>
        <div className='submain'>
          <div className='notification car-is-here'>
            <h3 className='notification-title'>
              Пожалуйста, оставьте свой отзыв
            </h3>
            <hr/>
            <div className='notification-content'>
              <div className='leave-review'>
                <img src={'http://image.combotaxi.com/face/small_'+ driverProfile.id +'.jpg'} alt='driver' className='driver-photo'/>
                <p className='boldText'>{FIO}</p>
                <p className='lightText'>{CAR}</p>
                <Rating
                  onChange={this._ratingChange}
                  initialRate={this.state.rating}
                  empty={'empty-star'}
                  full={'full-star'}
                  start={0}
                  stop={5}
                  step={1}/>
                <p><textarea
                  value={this.state.textareaVal}
                  rows='3'
                  name='text'
                  placeholder='Как покатались?'
                  onInput={this._textareaChange}/></p>
              </div>
            </div>
            <hr/>
            <div className='notification-cta'>
              <button className='notification-whiteButton'>Отмена</button>
              <button className='notification-blueButton' onClick={this._sendRating}>OK</button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
const mapStateToProps = (state) => ({
  orderInfo: state.order
})

export default connect((mapStateToProps), {
  sendTripReview,
  getOrderById
})(TripReview)
