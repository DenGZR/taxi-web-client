/* @flow */
import React, { PropTypes } from 'react'
// import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
// import { Link, browserHistory } from 'react-router'
import { formAdd } from '../redux/modules/formMok'

const validate = (values) => {
  const errors = {}
  if (!values.phone) {
    errors.phone = 'Введите номер телефона!'
  } else if (values.phone.length > 12) {
    errors.phone = 'Номер должен быть не больше 12 символов!'
  }
  return errors
}

export class PasswordRestore extends React.Component<void, Props, void> {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  render () {
    const { fields: { phone }, handleSubmit } = this.props
    return (
      <section className='client-login'>
        <form name='restorePassword' className='submain' onSubmit={handleSubmit(formAdd)}>
          <div className='title-wrapper'>
            <h2 className='sub-title'>Востановить пароль</h2>
          </div>
          <div className='content'>
            <label forName='restorePhone'>
              <span className='title-textinput'>Телефон</span>
            </label>
            <p className='input-wrapper'>
              <input
                type='text'
                name='restorePhone'
                className='text-field'
                id='restorePhone'
                placeholder='000-000-0000'
                {...phone} />
            </p>
            {phone.touched &&
              phone.error &&
              <p className='input-wrapper' style={{ color: 'red' }}>
                {phone.error}
              </p>}
            <br/>
            <div className='input-group-wrapper'>
              <button type='submit' className='enter-button button'>Выслать пароль</button>
            </div>
          </div>
        </form>
      </section>
    )
  }
}

// const mapStateToProps = (state) => ({
//   counter: state.counter
// })
export default reduxForm({
  form: 'PasswordRestore',
  fields: ['phone'],
  validate
}, null, { formAdd })(PasswordRestore)
