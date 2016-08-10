import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import MaskedInput from 'react-maskedinput'
import { sendUserSettings } from '../../../redux/modules/fieldsUtils'

export const fields = [
  'login', 'first_name', 'email',
  'avatar', 'gender', 'last_name',
  'middle_name', 'old_password', 'password']

const validate = (values) => {
  const errors = {}
  if (!values.first_name) {
    errors.first_name = 'Введите ваше имя'
  } else if (values.first_name.length > 32) {
    errors.first_name = 'Имя должно содержать не больше 32 символов'
  } else if (values.first_name.length < 2) {
    errors.first_name = 'Имя должно содержать больше 2 символов'
  } else if (/[\d]/i.test(values.first_name)) {
    errors.first_name = 'Поле не должно содержать цифры'
  }
  if (!values.last_name) {
    // errors.last_name = 'Введите вашу Фамилию'
  } else if (values.last_name.length > 32) {
    errors.last_name = 'Фамилия должно содержать не больше 32 символов'
  } else if (values.last_name.length < 2) {
    errors.last_name = 'Фамилия должно содержать больше 2 символов'
  } else if (/[\d]/i.test(values.last_name)) {
    errors.last_name = 'Поле не должно содержать цифры'
  }
  if (!values.middle_name) {
    // errors.middle_name = 'Введите ваше отчество'
  } else if (values.middle_name.length > 32) {
    errors.middle_name = 'Отчество должно содержать не больше 32 символов'
  } else if (values.middle_name.length < 2) {
    errors.middle_name = 'Отчество должно содержать больше 2 символов'
  } else if (/[\d]/i.test(values.middle_name)) {
    errors.middle_name = 'Поле не должно содержать цифры'
  }
  if (!values.email) {
    errors.email = 'Укажите ваш email адрес'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Неправильный email адрес'
  }
  if (!values.login) {
    // errors.login = 'Введите телефон'
  }
  // if (values.avatar) {
  //   if (values.avatar[0].size > 5000) {
  //     errors.avatar = 'Размер файла должен быть не больше N байт'
  //   }
  // }
  if (!values.gender) {
    errors.gender = 'Укажите ваш пол'
  }
  return errors
}

export class PassengerSettings extends Component {
  constructor (props) {
    super(props)
    this._fileIncoming = this._fileIncoming.bind(this)
    this._triggerFileInput = this._triggerFileInput.bind(this)
    this._sendDataToServer = this._sendDataToServer.bind(this)
    this.state = {
      file: ''
    }
  }
  static propTypes = {
    handleSubmit: PropTypes.func,
    fields: PropTypes.object,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    sendUserSettings: PropTypes.func.isRequired,
    location: PropTypes.object
  }
  _fileIncoming (e) {
    const { avatar } = this.props.fields
    console.log(e.target.files)
    avatar.onChange(e.target.files)
    this.setState({
      file: e.target.files[0].name
    })
  }
  _triggerFileInput (e) {
    this.refs.original.click()
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
  _sendDataToServer (data) {
    const { sendUserSettings } = this.props
    if (data.login) {
      Object.assign(data, { login: data.login.replace(/[\-\(\)]/g, '') })
    }

    sendUserSettings(data)
  }
  render () {
    console.log(this.props)
    const {
      // avatar, old_password, password
      fields: {
        first_name, login,
        email, gender,
        last_name, middle_name
      },
      handleSubmit,
      submitting
    } = this.props
    return (
      <section className='client-login'>
        <div className='submain'>
          <div className='title-wrapper'>
            <h2 className='sub-title'>НАСТРОЙКИ</h2>
          </div>
          <div className='content'>
            <form onSubmit={handleSubmit(this._sendDataToServer)}>
              <label >
                <span className='title-textinput correct-M'>Имя</span>
                <p className='input-wrapper'>
                  <input
                    className='text-field input-group correct-h'
                    placeholder='Введите имя'
                    type='text' name='enter-name' {...first_name}/>
                </p>
              </label>
              {first_name.touched && first_name.error && (<p className='error-settings'>{first_name.error}</p>)}
              <br/>
              <label >
                <span className='title-textinput correct-M'>Фамилия</span>
                <p className='input-wrapper'>
                  <input
                    className='text-field input-group correct-h'
                    placeholder='Введите фамилию'
                    type='text' name='enter-name' {...last_name}/>
                </p>
              </label>
              {last_name.touched && last_name.error && (<p className='error-settings'>{last_name.error}</p>)}
              <br/>
              <label >
                <span className='title-textinput correct-M'>Отчество</span>
                <p className='input-wrapper'>
                  <input
                    className='text-field input-group correct-h'
                    placeholder='Введите отчество'
                    type='text' name='enter-name' {...middle_name}/>
                </p>
              </label>
              {middle_name.touched && middle_name.error && (<p className='error-settings'>{middle_name.error}</p>)}
              <br/>
              <label>
                <span className='title-textinput correct-M'>Телефон</span>
                <p className='input-wrapper'>
                  <MaskedInput
                    id='clientSettingsPhone'
                    mask='38(011)-111-11-11'
                    placeholder='38(097)000-00-00' {...login}/>
                </p>
              </label>
              {login.touched && login.error && (<p className='error-settings'>{login.error}</p>)}
              <br/>
              <label>
                <span className='title-textinput correct-M'>E-mail</span>
                <p className='input-wrapper'>
                  <input
                    className='text-field input-group correct-h'
                    type='text' name='enter-email'
                    placeholder='example@mail.com'
                    {...email}/>
                </p>
              </label>
              {email.touched && email.error && (<p className='error-settings'>{email.error}</p>)}
              <br/>
            {/*  <label htmlFor='avatar'> avatar field
                <span className='title-textinput correct-M'>Фото профиля</span>
              <p className='input-wrapper'>
                <input className='original-input' id='avatar' type='file'
                onChange={this._fileIncoming} ref={'original'}/>
                <input
                  className='text-field input-group correct-h'
                  type='text'
                  name='enter-photo'
                  placeholder='Выберите файл'
                  onClick={this._triggerFileInput}
                  value={ this.state.file }
                  readOnly
                  />
              </p>
              </label>
              {avatar.touched && avatar.error && (<p className='error-settings'>{avatar.error}</p>)}
              <br/> */}
              <label>
                <span className='title-textinput correct-M'>Пол</span>
                <p className='input-wrapper'>
                  <select
                    className='driver-gender text-field input-group correct-h select-middler'
                    name='enter-lang'
                    {...gender}
                    value={gender.value || 'default'}>
                    <option value='default' disabled hidden>Выберите пол</option>
                    <option value='male'>Мужской</option>
                    <option value='female'>Женский</option>
                  </select>
                </p>
              </label>
              {gender.touched && gender.error && (<p className='error-settings'>{gender.error}</p>)}
              <br/>
          {/*      <label >
                  <span className='title-textinput correct-M'>Новый Пароль</span>
                  <p className='input-wrapper'>
                    <input
                      className='text-field input-group correct-h'
                      placeholder='Введите новый пароль'
                      type='text' name='enter-name' {...password}/>
                  </p>
                </label>
                {password.touched && password.error && (<p className='error-settings'>{password.error}</p>)}
                <br/>
                <label >
                  <span className='title-textinput correct-M'>Старый пароль</span>
                  <p className='input-wrapper'>
                    <input
                      className='text-field input-group correct-h'
                      placeholder='Введите старый пароль'
                      type='text' name='enter-name' {...old_password}/>
                  </p>
                </label>
                {old_password.touched && old_password.error && (<p className='error-settings'>{old_password.error}</p>)}
                <br/> */}
              <div className='input-group-wrapper'>
                <button
                  type='submit'
                  className='enter-button button'
                  disabled={submitting}>
                  СОХРАНИТЬ
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  fieldsUtils: state.fieldsUtils
})

export default reduxForm({
  form: 'clientSettings',
  fields,
  validate
}, (mapStateToProps), { sendUserSettings })(PassengerSettings)
