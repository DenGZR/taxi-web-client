/* @flow */
import React, { PropTypes } from 'react'
// import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import {Link} from 'react-router'
import MaskedInput from 'react-maskedinput'
// import { formAdd } from '../../redux/modules/formMok'
import { login, getOtp } from '../../redux/modules/auth'

const validate = (values) => {
  const errors = {}
  if (!values.login) {
    errors.login = 'Введите номер телефона, это ж логин!'
  }
  return errors
}

export class Login extends React.Component<void, Props, void> {
  constructor (props) {
    super(props)
    this._login = this._login.bind(this)
    this._getCode = this._getCode.bind(this)
    this._formatPhoneNumber = this._formatPhoneNumber.bind(this)
  }
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    getOtp: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    initializeForm: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }
  componentWillMount () {
    if (window.localStorage.getItem('shareLogin')) {
      this.props.initializeForm({
        login: window.localStorage.getItem('shareLogin'),
        password: ''
      })
    }
    window.localStorage.removeItem('shareLogin')
  }
  _login () {
    const { login, values } = this.props
    let path = this._getPath()
    console.log(`path from login -> ${path}`)
    login(values, path, true)
  }
  _getCode () {
    const { getOtp, values } = this.props
    let path = this._getPath()
    console.log(`path from getOtp -> ${path}`)
    console.log(values)
    getOtp({login: values.login, password: values.password}, path)
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
  _formatPhoneNumber (e) {
    const { login } = this.props.fields
    let valLength = e.target.value.length
    if (!(e.target.value.match(/\_/g) || valLength === 0)) {
      let result = e.target.value.replace(/[\-\(\)]/g, '')
      login.onChange(result)
    }
  }
  render () {
    const { fields: { login, password, otp }, handleSubmit } = this.props
    return (
      <section className='client-login'>
        <div className='submain'>
          <form onSubmit={handleSubmit(this._getCode)}>
            <div className='title-wrapper'>
              <h2 className='sub-title'>ВОЙТИ</h2>
            </div>
            <div className='content'>
              <label>
                <span className='title-textinput correct-M'>Телефон</span>
                <p className='input-wrapper'>
                  <MaskedInput
                    id='login_page'
                    mask='38(011)-111-11-11'
                    onChange={this._formatPhoneNumber}
                    placeholder='38(097)000-00-00'/>
                </p>
              </label>
              {login.touched &&
                login.error &&
                (<p className='input-wrapper' style={{ color: 'red' }}>
                  {login.error}
                </p>)}
              <br/>
              <label>
                <span className='title-textinput'>Пароль</span>
                <p className='input-wrapper'>
                  <input type='password' name='password' className='text-field' id='password' {...password} />
                </p>
              </label>
              {password.touched &&
                password.error &&
                (<p className='input-wrapper' style={{ color: 'red' }} >
                  {password.error}
                </p>)}
              <br/>
              <div className='input-group-wrapper'>
                <button type='submit' className='enter-button button'>Подтвердить</button>
                <Link to={'/forgot'} className='forgot-pass'>Забыли пароль?</Link>
              </div>
            </div>
          </form>
          <div className={'code-message ' + (this.props.user.otpSend ? 'show-code-message' : '')}>
            <div className='input-group-wrapper'>
              <p>Мы выслали Вам СМС с кодом подтверждения. Введите код:</p>
              <input
                type='text'
                name='enter-code'
                {...otp}
                className='text-field half'
                ref='otp-code'/>
              <button className='resend-code-button' disabled>Выслать код</button>
              <button className='button' onClick={this._login}>Войти</button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth
})
export default reduxForm({
  form: 'Login',
  fields: ['login', 'password', 'otp'],
  validate
}, (mapStateToProps), {
  login,
  getOtp
})(Login)

// <label>
//   <span className='title-textinput'></span>
// </label>
// <br/>
// <div className='input-group-wrapper'>
//   <label className='checkbox checkbox-wrapper'>
//     <input className='remember-me' type='checkbox' name='remember-me' />
//     <span className='checkbox-span'>Запомнить меня</span>
//   </label>
//   <button type='submit' className='enter-button button'>ВОЙТИ</button>
//   <Link to={'/forgot'} className='forgot-pass'>Забыли пароль?</Link>
// </div>
