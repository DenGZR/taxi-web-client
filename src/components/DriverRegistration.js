/* @flow */
import React from 'react'
import { connect } from 'react-redux'

export class DriverRegistration extends React.Component<void, Props, void> {

  render () {
    return (
      <section className='client-login'>
        <div className='submain'>
          <div className='title-wrapper'>
            <h2 className='sub-title'>РЕГИСТРАЦИЯ ВОДИТЕЛЯ</h2>
          </div>
          <div className='content'>
            <label forName='enter-name'>
              <span className='title-textinput'>Имя</span>
            </label>
            <p className='input-wrapper'>
              <input type='text' name='enter-name' className='text-field' id='enter-name' />
            </p>
            <br/>
            <label forName='enter-phone'>
              <span className='title-textinput'>Телефон</span>
            </label>
            <p className='input-wrapper'>
              <input type='text' name='enter-phone' className='text-field' id='enter-phone' />
            </p>
            <br/>
            <label forName='enter-email'>
              <span className='title-textinput'>E-mail</span>
            </label>
            <p className='input-wrapper'>
              <input type='text' name='enter-email' className='text-field' id='enter-email' />
            </p>
            <br/>
            <label forName='password'>
              <span className='title-textinput'>Пароль</span>
            </label>
            <p className='input-wrapper'>
              <input type='password' name='password' className='text-field' id='password' />
            </p>
            <br/>
            <label forName='password'>
              <span className='title-textinput'>Подтвердите пароль</span>
            </label>
            <p className='input-wrapper'>
              <input type='password' name='password' className='text-field' id='password' />
            </p>
            <br/>
            <div className='input-group-wrapper'>
              <button type='submit' className='enter-button button'>ЗАРЕГИСТРИРОВАТЬСЯ</button>
            </div>
          </div>
          <div className='code-message'>
            <div className='input-group-wrapper'>
              <p>Мы выслали Вам СМС с кодом подтверждения. Введите код:</p>
              <input type='text' name='enter-code' className='text-field half' id='enter-code' />
              <button className='button half'>ПОДТВЕРДИТЬ</button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

// const mapStateToProps = (state) => ({
//   counter: state.counter
// })
export default connect(null, null)(DriverRegistration)
