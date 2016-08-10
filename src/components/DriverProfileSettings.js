/* @flow */
import React, { PropTypes, Component } from 'react'
import { reduxForm } from 'redux-form'
import MaskedInput from 'react-maskedinput'

import { sendUserSettings } from '../redux/modules/fieldsUtils'
import { validate } from './componentsHelper/DriverValidatorRules' /* validator rulse */

export const fields = [
  'email', 'first_name', 'last_name', 'middle_name', 'birthday',
  'address', 'inn', 'passport', 'car_brand', 'car_model',
  'car_color', 'car_type', 'car_year', 'car_number', 'car_seats',
  'gender', 'car_photo', 'second_phone', 'driver_photo', 'password', 'old_password']

export class DriverProfileSettings extends Component {
  constructor (props) {
    super(props)
    this._showBlockA = this._showBlockA.bind(this)
    this._showBlockB = this._showBlockB.bind(this)
    this._showBlockC = this._showBlockC.bind(this)
    this._fileIncoming = this._fileIncoming.bind(this)
    this._triggerFileInput = this._triggerFileInput.bind(this)
    this._sendDataToServer = this._sendDataToServer.bind(this)
    this.state = {
      blockA: true,
      blockB: true,
      blockC: true,
      carPhoto: '',
      avatar: ''
    }
  }
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    sendUserSettings: PropTypes.func.isRequired
  }
  _showBlockA (e) {
    this.setState({
      blockA: !this.state.blockA
    })
  }
  _showBlockB (e) {
    this.setState({
      blockB: !this.state.blockB
    })
  }
  _showBlockC (e) {
    this.setState({
      blockC: !this.state.blockC
    })
  }
  _fileIncoming (e) {
    const { driver_photo, car_photo } = this.props.fields

    if (e.target.name === 'car-field') {
      this.setState({
        carPhoto: e.target.files[0].name || ''
      })
      car_photo.onChange(e.target.files[0])
    } else if (e.target.name === 'avatar-field') {
      this.setState({
        avatar: e.target.files[0].name || ''
      })
      driver_photo.onChange(e.target.files[0])
    }
  }
  _triggerFileInput (e) {
    if (e.target.name === 'car') {
      this.refs.original_car.click()
    } else if (e.target.name === 'avatar') {
      this.refs.original_avatar.click()
    }
  }
  _sendDataToServer (data) {
    const { sendUserSettings } = this.props
    if (data.second_phone) {
      Object.assign(data, { second_phone: data.second_phone.replace(/[\-\(\)]/g, '') })
    }
    console.log(data)
    sendUserSettings(data, '/driver/')
  }
  render () {
    console.log(this.props)
    // email car_photo driver_photo
    const {
      fields: { first_name, last_name, middle_name, gender,
        birthday, second_phone, address, inn,
        passport, car_brand, car_model, car_color,
        car_type, car_year, car_number, car_seats, password, old_password },
        handleSubmit } = this.props
    return (
      <section className='client-login'>
        <div className='submain driver-profile'>
          <form id='driverForm' name='driverProfile' onSubmit={handleSubmit(this._sendDataToServer)}>
            <div className='title-wrapper title-cursor' onClick={this._showBlockA}>
              <h2 className='sub-title'>
                Профиль водителя
                <i className='triangle'></i>
              </h2>
            </div>
            <div className={'content ' + (this.state.blockA ? '' : 'hidden-content')}>
              <label>
                <span className='title-textinput correct-M'>Имя</span>
                <p className='input-wrapper'>
                  <input
                    type='text'
                    name='first_name'
                    placeholder='Введите ваше Имя'
                    className='text-field input-group correct-h'
                    id='first_name'
                    {...first_name} />
                </p>
              </label>
              {first_name.touched && first_name.error && <p className='error-settings'>{first_name.error}</p>}
              <br/>
              <label>
                <span className='title-textinput correct-M'>Фамилия</span>
                <p className='input-wrapper'>
                  <input
                    type='text' name='last_name'
                    placeholder='Введите ваше фамилию'
                    className='text-field input-group correct-h'
                    id='last_name'
                    {...last_name} />
                </p>
              </label>
              {last_name.touched && last_name.error && <p className='error-settings'>{last_name.error}</p>}
              <br/>
              <label>
                <span className='title-textinput correct-M'>Отчество</span>
                <p className='input-wrapper'>
                  <input
                    type='text'
                    placeholder='Введите ваше отчество'
                    name='middle_name'
                    className='text-field input-group correct-h'
                    id='middle_name'
                    {...middle_name}/>
                </p>
              </label>
              {middle_name.touched && middle_name.error && <p className='error-settings'>{middle_name.error}</p>}
              <br/>
              <label>
                <span className='title-textinput correct-M'>Пол</span>
                <p className='input-wrapper'>
                  <select
                    className='driver-gender text-field input-group correct-h'
                    name='gender'
                    id='gender'
                    value={gender.value || 'default'}
                    {...gender}>
                    <option value='default' disabled hidden>Выберите ваш пол</option>
                    <option value='male'>Мужской</option>
                    <option value='female'>Женский</option>
                  </select>
                </p>
              </label>
              {gender.touched && gender.error && <p className='error-settings'>{gender.error}</p>}
              <br/>
              <label>
                <span className='title-textinput correct-M'>Дата Рождения</span>
                <p className='input-wrapper'>
                  <input
                    type='text'
                    placeholder='Введите дату рождения'
                    name='birthdate'
                    className='text-field input-group correct-h'
                    id='birthdate'
                    {...birthday}/>
                </p>
              </label>
              {birthday.touched && birthday.error && <p className='error-settings'>{birthday.error}</p>}
            </div>
            <div className='title-wrapper title-cursor' onClick={this._showBlockB}>
              <h2 className='sub-title'>Личные данные
                <i className='triangle'></i>
              </h2>
            </div>
            <div className={'content ' + (this.state.blockB ? '' : 'hidden-content')}>
              <label>
                <span className='title-textinput correct-M'>Новый пароль</span>
                <p className='input-wrapper'>
                  <input
                    type='password'
                    placeholder='Введите новый пароль'
                    name='password'
                    className='text-field input-group correct-h'
                    id='new_password'
                    {...password}/>
                </p>
              </label>
              {password.touched && password.error && <p className='error-settings'>{password.error}</p>}
              <br/>
              <label>
                <span className='title-textinput correct-M'>Старый пароль</span>
                <p className='input-wrapper'>
                  <input
                    type='password'
                    placeholder='Введите старый пароль'
                    name='address'
                    className='text-field input-group correct-h'
                    id='old_password'
                    {...old_password}/>
                </p>
              </label>
              {old_password.touched && old_password.error && <p className='error-settings'>{old_password.error}</p>}
              <br/>
              <label>
                <span className='title-textinput correct-M'>Телефон №2</span>
                <p className='input-wrapper'>
                  <MaskedInput
                    id='clientSettingsPhone'
                    mask='38(011)-111-11-11'
                    placeholder='38(097)000-00-00' {...second_phone}/>
                </p>
              </label>
              {second_phone.touched && second_phone.error && <p className='error-settings'>{second_phone.error}</p>}
              <br/>
              <label>
                <span className='title-textinput correct-M'>Адрес</span>
                <p className='input-wrapper'>
                  <input
                    type='text'
                    placeholder='Введите адрес'
                    name='address'
                    className='text-field input-group correct-h'
                    id='address'
                    {...address}/>
                </p>
              </label>
              {address.touched && address.error && <p className='error-settings'>{address.error}</p>}
              <br/>
              <label>
                <span className='title-textinput correct-M'>ИНН</span>
                <p className='input-wrapper'>
                  <input
                    type='text'
                    name='inn'
                    placeholder='Идентификационый код'
                    className='text-field input-group correct-h'
                    id='inn'
                    {...inn}/>
                </p>
              </label>
              {inn.touched &&
                inn.error &&
                <p className='error-settings'>{inn.error}</p>}
              <br/>
              <label>
                <span className='title-textinput correct-M'>Паспорт</span>
                <p className='input-wrapper'>
                  <input
                    type='text'
                    name='passport'
                    placeholder='Паспортные данные'
                    className='text-field input-group correct-h'
                    id='passport'
                    {...passport}/>
                </p>
              </label>
              {passport.touched && passport.error && <p className='error-settings'>{passport.error}</p>}
            {/*  <br/>
              <label htmlFor='avatar'>
                <span className='title-textinput correct-M'>Аватар</span>
              <p className='input-wrapper'>
                <input
                  className='text-field input-group correct-h'
                  type='text'
                  name='avatar'
                  placeholder='Выберите файл'
                  onClick={this._triggerFileInput}
                  value={this.state.avatar}
                  readOnly/>
                <input
                  className='original-input'
                  id='avatar'
                  name='avatar-field'
                  type='file'
                  onChange={this._fileIncoming}
                  ref={'original_avatar'}/>
              </p>
              </label>
              {driver_photo.touched && driver_photo.error && <p className='error-settings'>{driver_photo.error}</p>} */}
            </div>
            <div className='title-wrapper title-cursor' onClick={this._showBlockC}>
              <h2 className='sub-title'>Данные об автомобиле
                <i className='triangle'></i>
              </h2>
            </div>
            <div className={'content ' + (this.state.blockC ? '' : 'hidden-content')}>
              <label>
                <span className='title-textinput correct-M'>Марка авто</span>
                <p className='input-wrapper'>
                  <input
                    type='text'
                    name='car_brand'
                    placeholder='BMW'
                    className='text-field input-group correct-h'
                    id='car_brand'
                    {...car_brand}/>
                </p>
              </label>
              {car_brand.touched && car_brand.error && <p className='error-settings'>{car_brand.error}</p>}
              <br/>
              <label>
                <span className='title-textinput correct-M'>Модель авто</span>
                <p className='input-wrapper'>
                  <input
                    type='text'
                    placeholder='X-5'
                    name='car_model'
                    className='text-field input-group correct-h'
                    id='car_model'
                    {...car_model}/>
                </p>
              </label>
              {car_model.touched && car_model.error && <p className='error-settings'>{car_model.error}</p>}
              <br/>
              <label>
                <span className='title-textinput correct-M'>Цвет авто</span>
                <p className='input-wrapper'>
                  <input
                    type='text'
                    name='car_color'
                    placeholder='Цвет машины'
                    className='text-field input-group correct-h'
                    id='car_color'
                    {...car_color}/>
                </p>
              </label>
              {car_color.touched && car_color.error && <p className='error-settings'>{car_color.error}</p>}
              <br/>
              <label>
                <span className='title-textinput correct-M'>Тип авто</span>
                <p className='input-wrapper'>
                  <select
                    className='driver-gender text-field input-group correct-h'
                    name='gender'
                    id='car_type'
                    {...car_type}
                    value={car_type.value || 'default'}>
                    <option value='default' disabled hidden>Выберите тип кузова</option>
                    <option value='sedan'>Седан</option>
                    <option value='Crossover'>Универсал</option>
                    <option value='Hatchback'>Хетчбэк</option>
                    <option value='coupe'>Купе</option>
                    <option value='Limousine'>Лимузин</option>
                    <option value='microBus'>Микроавтобус</option>
                  </select>
                </p>
              </label>
              {car_type.touched && car_type.error && <p className='error-settings'>{car_type.error}</p>}
              <br/>
              <label>
                <span className='title-textinput correct-M'>Год выпуска</span>
                <p className='input-wrapper'>
                  <input
                    type='text'
                    placeholder='Год выпуска авто'
                    name='car_year'
                    className='text-field input-group correct-h'
                    id='car_year'
                    {...car_year}/>
                </p>
              </label>
              {car_year.touched && car_year.error && <p className='error-settings'>{car_year.error}</p>}
              <br/>
              <label>
                <span className='title-textinput correct-M'>Номер</span>
                <p className='input-wrapper'>
                  <input
                    type='text'
                    name='car_number'
                    placeholder='Номер автомобиля'
                    className='text-field input-group correct-h'
                    id='car_number'
                    {...car_number}/>
                </p>
              </label>
              {car_number.touched && car_number.error && <p className='error-settings'>{car_number.error}</p>}
              <br/>
              <label>
                <span className='title-textinput correct-M'>Количество мест</span>
                <p className='input-wrapper'>
                  <select
                    className='driver-gender text-field input-group correct-h'
                    name='seats'
                    id='carSeats'
                    {...car_seats}
                    value={car_seats.value || 'default'}>
                    <option value='default' disabled hidden>Укажите количество мест</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                  </select>
                </p>
              </label>
              {car_seats.touched && car_seats.error && <p className='error-settings'>{car_seats.error}</p>}
            {/*  <br/>
              <label htmlFor='car_photo'>
                <span className='title-textinput correct-M'>Фото машины</span>
              <p className='input-wrapper'>
                <input
                  className='text-field input-group correct-h'
                  type='text'
                  name='car'
                  placeholder='Выберите файл'
                  onClick={this._triggerFileInput}
                  value={this.state.carPhoto}
                  readOnly/>
                <input
                  className='original-input'
                  id='car_photo'
                  type='file'
                  name='car-field'
                  onChange={this._fileIncoming}
                  ref={'original_car'}/>
              </p>
              </label>
              {car_photo.touched && car_photo.error && <p className='error-settings'>{car_photo.error}</p>} */}
            </div>
            <hr className='profile-line'/>
            <div className='content'>
              <div className='input-group-wrapper'>
                <button type='submit' className='enter-button button'>ГОТОВО</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  fieldsUtils: state.fieldsUtils
})
export default reduxForm({
  form: 'driverProfileSettings',
  fields: fields,
  validate
}, (mapStateToProps), {sendUserSettings})(DriverProfileSettings)
