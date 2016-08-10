import React, { Component, PropTypes } from 'react'
import MaskedInput from 'react-maskedinput'
import { connect } from 'react-redux'

import { checkUser, receiveUserPhone, sendOrderToServer } from '../../../redux/modules/order'
import { getOtp } from '../../../redux/modules/auth'
import { fetchSignup, loginAS } from '../../../redux/modules/apiSignup'

export class Order extends Component {
  constructor (props) {
    super(props)
    this._confirmPhone = this._confirmPhone.bind(this)
    this._inpChange = this._inpChange.bind(this)
    this._sendCodeAgain = this._sendCodeAgain.bind(this)
    this._confirmOtp = this._confirmOtp.bind(this)
    this._confirmStepOne = this._confirmStepOne.bind(this)
    this._sendOrder = this._sendOrder.bind(this)
    this.state = {
      toggleSmsBlock : false
    }
  }
  static propTypes = {
    cost: PropTypes.number,
    currency: PropTypes.string,
    correctPhone: PropTypes.func,
    sendCode: PropTypes.func,
    loading: PropTypes.bool,
    otpCorrect: PropTypes.func,
    otpCode: PropTypes.string,
    checkUser: PropTypes.func.isRequired,
    youCanOrder: PropTypes.bool,
    receiveUserPhone: PropTypes.func.isRequired,
    fetchSignup: PropTypes.func.isRequired,
    getOtp: PropTypes.func.isRequired,
    loginAS: PropTypes.func.isRequired,
    states: PropTypes.object.isRequired,
    sendOrderToServer: PropTypes.func.isRequired
  }
  _confirmPhone (e) {
    e.preventDefault()
    const { getOtp, fetchSignup } = this.props
    const { user, userPhone } = this.props.states
    let toggleBlockSms = !this.state.toggleSmsBlock;
    //debugger
    this.setState({ toggleSmsBlock : toggleBlockSms })
    if (user) {
      getOtp({login: userPhone})
    } else {
      fetchSignup({login: userPhone})
    }
  }
  _inpChange (e) {
    const { checkUser, receiveUserPhone } = this.props
    let valLength = e.target.value.length
    if (!(e.target.value.match(/\_/g) || valLength === 0)) {
      let result = e.target.value.replace(/[\-\(\)]/g, '')
      console.log('login check!')
      checkUser(result)
      receiveUserPhone(result)
    }
  }
  _sendCodeAgain () {
    console.log('send code ... TODO')
  }
  _confirmOtp (e) {
    const { otpCode, userPhone } = this.props.states
    const { loginAS } = this.props
    let result = e.target.value.replace(/[\-\_]/g, '')

    if (result.length === 4 || result === otpCode) {
      loginAS({login: userPhone, otp: result}, '/client/', false)
    }
  }
  _confirmStepOne () {
    const { distance, userPhone } = this.props.states
    if (userPhone && distance > 0) {
      return true
    } else {
      return false
    }
  }
  _sendOrder (e) {
    e.preventDefault()
    const { markersLength } = this.props.states
    if (markersLength < 2) {
      return
    }
    const { sendOrderToServer } = this.props
    sendOrderToServer()
  }
  render () {
    const { markersLength, otpCode, logged } = this.props.states
    const { cost, currency, loading } = this.props
    const confirmStepOne = this._confirmStepOne()
    let loggedUserPhoneBlock = logged ? null : (
      <label>
        <span className='title-textinput'>Телефон</span>
        <div className='input-wrapper'>
          <MaskedInput
            mask='38(011)-111-11-11'
            placeholder='38(097)000-00-00'
            name='phone'
            id='login_phone'
            onChange={this._inpChange}/>
          <button
            onClick={this._confirmPhone}
            className='button'
            disabled={confirmStepOne ? '' : 'disabled'}>ПОДТВЕРДИТЬ</button>
        </div>
      </label>
    )
    let loggedUserConfirmBlock = logged ? (
      <div className='order'>
        <div className='input-group-wrapper'>
          <button
            className={'button ' + (markersLength < 2 ? '' : 'btn-shadow')}
            disabled={markersLength < 2 ? 'disabled' : ''}
            onClick={this._sendOrder}>ЗАКАЗАТЬ</button>
        </div>
      </div>
      ) : (
      <div className={'order ' + (this.state.toggleSmsBlock ? '' : 'hidden-content')}>
        <div className='input-group-wrapper'>
          <label>Мы выслали Вам СМС с кодом подтверждения. Введите код:
            <br/>
            <MaskedInput
              mask='11-11'
              id='otpField'
              placeholder='Введите код'
              onChange={this._confirmOtp}/>
            {/* <input className='text-field half' type='text' name='otp-field' /> */}
          </label>
          <button className='button' onClick={this._sendCodeAgain}>ВЫСЛАТЬ КОД ЕЩЕ РАЗ</button>
        </div>
      </div>
      )
    let calculating = loading ? (<i className='order-spinner'></i>) : (
      <p className='order-cost-detail'>
        <i className='order-cost'>{cost || '0'}</i>
        <i className='order-currency'>{currency || 'ГРН'}</i>
      </p>
      )
    return (
      <div className='order-content'>
        <div className='order-confirm'>
          <span className='title-textinput order-fare'>
              СТОИМОСТЬ
          </span>
          {calculating}
          <br/>
          {loggedUserPhoneBlock}
        </div>
        {loggedUserConfirmBlock}
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  states: {
    distance: state.mapUtils.routeData.distance,
    ...state.order.userData,
    otpCode: state.apiSignup.OTP,
    logged: state.auth.logged,
    markersLength: state.mapUtils.mapMarkers.length
  }
})
export default connect((mapStateToProps), {
  checkUser,
  receiveUserPhone,
  getOtp,
  fetchSignup,
  loginAS,
  sendOrderToServer
})(Order)
