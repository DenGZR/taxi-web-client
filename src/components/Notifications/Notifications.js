/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import {Link} from 'react-router'
import { formAdd } from '../../redux/modules/formMok'

export class Notifications extends React.Component<void, Props, void> {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  render () {
    const { fields: { phone, password }, handleSubmit } = this.props
    return (

    )
  }
}

// const mapStateToProps = (state) => ({
//   counter: state.counter
// })
export default reduxForm({
  form: 'Notifications',
  fields: ['phone', 'password'],
  validate
}, null, { formAdd })(Notifications)
