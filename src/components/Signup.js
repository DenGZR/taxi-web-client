/* @flow */
import React, { PropTypes, Component } from 'react'
import { reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import axios from 'axios'
import MaskedInput from 'react-maskedinput'

import { fetchSignup, loginAS } from '../redux/modules/apiSignup'

import FormError from './FormError/FormError'
// import Spinner from './Spinner/Spinner'

export const fields = ['login', 'first_name', 'email', 'password', 'usePassword', 'confirmPassword', 'confirm']
let r = /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,32}[.](([a-zA-Z0-9]){2,32})+$/gi
const validate = (values) => {
  const errors = {}
  if (!values.first_name) {
    errors.first_name = 'Required'
  } else if (values.first_name.length <= 2) {
    errors.first_name = 'more then 2!'
  } else if (values.first_name.length > 32) {
    errors.first_name = 'no more then 32!'
  }
  if (!values.login) {
    errors.login = 'Phone used via login. Required!'
  } else if (values.login.length < 12) {
    errors.login = 'Incorrect phone number!'
  }
  if (!values.email) {
    // errors.email = 'Email is required field!'
  } else if (!values.email.match(r)) {
    errors.email = 'Incorrect email detected!'
  }
  if (!values.password) {
    // errors.password = 'Password is required!'
  } else if (values.password.length <= 5) {
    errors.password = 'Short password!'
  } else if (values.password.length > 32) {
    errors.password = 'Password too long!'
  }
  if (!values.confirmPassword) {
    // errors.confirmPassword = 'Required field!'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Password fields not same!'
  }
  return errors
}

const asyncValidate = (values) => {
  return new Promise((resolve, reject) => {
    let correctLogin = values.login.replace(/[\-\(\)]/g, '')
    if (!correctLogin) {
      resolve()
      return
    }
    axios.get(`https://api.psyco.com.ua:443/api/client/check/?login=${correctLogin}`)
      .then((response) => {
        console.log(response)
        if (response.data.result === 'user_exist') {
          reject({login: 'used'})
        } else {
          resolve()
        }
      })
  })
}

export class Signup extends Component {
  constructor (props) {
    super(props)
    this._loginUsed = this._loginUsed.bind(this)
    this._login = this._login.bind(this)
    this._secure = this._secure.bind(this)
    this._preSignup = this._preSignup.bind(this)
    this.state = {
      secure: false
    }
  }
  static propTypes = {
    asyncValidating: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool
    ]),
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    signupState: PropTypes.object.isRequired,
    fetchSignup: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    loginAS: PropTypes.func.isRequired,
    valid: PropTypes.bool
  }
  _loginUsed () {
    /* regexp to take from path driver or passenger */
    const path = this.props.location.pathname.split(/(^[\/\w]+\/)/)[1]
    this.props.dispatch(push(`${path}signin`))
  }
  componentWillUnmount () {
    const { login } = this.props.fields
    const { values } = this.props
    if (login.error === 'used') {
      window.localStorage.setItem('shareLogin', values.login)
    }
  }
  _login () {
    let path = this._getPath()
    const { loginAS } = this.props
    const { login, password, confirm } = this.props.values
    console.log({login, password, otp: confirm})
    let correctPhone = login.replace(/[\-\(\)]/g, '')

    loginAS({login: correctPhone, password, otp: confirm}, path)
  }
  _secure (e) {
    this.setState({
      secure: e.target.checked
    })
  }
  _preSignup () {
    let path = this._getPath()
    const { values, valid, fetchSignup } = this.props
    if (valid) {
      fetchSignup(values, path)
    }
  }
  _getPath () {
    /* regexp to take from path driver or passenger */
    var path = this.props.location.pathname.split(/(^[\/\w]+\/)/)[1]
    if (path === '/passenger/') {
      /* for correct api call */
      path = '/client/'
      return path
    }
    return path
  }
  render () {
    console.log(this.props)
    const {
      asyncValidating, // usePassword
      fields: {login, first_name, email, password, confirmPassword, confirm},
      handleSubmit,
      submitting
    } = this.props
    const { OTP } = this.props.signupState
    return (
      <section className='client-login'>
        <div className='submain'>
          <div className='title-wrapper'>
            <h2 className='sub-title'>РЕГИСТРАЦИЯ ПАССАЖИРА</h2>
          </div>
          <div className={'login-used ' + ((login.error === 'used') ? 'open-signup-redirect' : '')}>
            <p>Уже зарегистрированы? Используйте номер телефона как логин</p>
            {/* <p>Тут бага с высотой на маленьких скринах height не бро!</p> */}
            <button className='login-used-button' onClick={this._loginUsed}>ВОЙТИ</button>
          </div>
          <form name='PassengerSignup' onSubmit={handleSubmit(this._preSignup)}>
            <div className='content'>
              <label forName='enter-name'>
                <span className='title-textinput'>Имя</span>
              </label>
              <p className='input-wrapper'>
                <input type='text' className='text-field' id='enter-name' placeholder='Введите имя' {...first_name}/>
              </p>
              {first_name.touched && first_name.error &&
                <FormError error={first_name.error} customClass={'form-error'}/>}
              <br/>
              <label forName='enter-phone'>
                <span className='title-textinput'>Телефон</span>
              </label>
              <p className='input-wrapper'>
                <MaskedInput
                  id='login_page'
                  mask='38(011)-111-11-11'
                  {...login}
                  placeholder='38(097)000-00-00'/>
                 {asyncValidating === 'login' && <i>loading...</i>}
              </p>
              {login.touched && login.error !== 'used' && <FormError error={login.error} customClass={'form-error'}/>}
              <br/>
              <div>
                <label className='checkbox checkbox-wrapper' style={{padding: '11px 0 11px'}}>
                  <input className='use-password' type='checkbox' name='use-password' onClick={this._secure}/>
                  <span className='checkbox-span'>Использовать пароль</span>
                </label>
                <div className={(this.state.secure ? 'more-secure' : 'less-secure')}>
                  <label forName='enter-email'>
                    <span className='title-textinput'>E-mail</span>
                  </label>
                  <p className='input-wrapper'>
                    <input type='text'
                      className='text-field'
                      id='enter-email'
                      placeholder='some.email@mail.com'
                      {...email} />
                  </p>
                  {email.touched && email.error && <FormError error={email.error} customClass={'form-error'}/>}
                  <br/>
                  <label forName='password'>
                    <span className='title-textinput'>Пароль</span>
                  </label>
                  <p className='input-wrapper'>
                    <input
                      type='password'
                      className='text-field'
                      id='password'
                      placeholder='Введите пароль'
                      {...password}/>
                  </p>
                  {password.touched && password.error && <FormError error={password.error} customClass={'form-error'}/>}
                  <br/>
                  <label forName='password'>
                    <span className='title-textinput'>Подтвердите пароль</span>
                  </label>
                  <p className='input-wrapper'>
                    <input type='password' className='text-field' id='confirmPassword'
                      placeholder='Подтвердите пароль' {...confirmPassword}/>
                  </p>
                  {
                    confirmPassword.touched &&
                    confirmPassword.error &&
                      <FormError error={confirmPassword.error} customClass={'form-error'}/>
                  }
                  <br/>
                </div>
              </div>
              <div className='input-group-wrapper'>
                <button
                  type='submit'
                  disabled={submitting}
                  className='enter-button button'>
                  {submitting ? 'Отправка' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
                </button>
              </div>
            </div>
          </form>
          <div className={'code-message ' + (OTP ? 'show-code-message' : '')}>
            <div className='input-group-wrapper'>
              <p>Мы выслали Вам СМС с кодом подтверждения. Введите код:</p>
              <input
                type='text'
                name='enter-code'
                className='text-field half'
                ref='otp-code'
                id='enter-code' {...confirm} />
              <button className='button half' onClick={this._login}>Войти</button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  signupState: state.apiSignup
})

export default reduxForm({
  form: 'Signup',
  fields,
  asyncValidate,
  asyncBlurFields: ['login'],
  validate
}, (mapStateToProps), {
  fetchSignup,
  loginAS
})(Signup)
