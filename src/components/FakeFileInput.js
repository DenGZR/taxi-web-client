import React, { Component } from 'react'

export class FFI extends Component {
  static propTypes = {
    customClass: PropTypes.string
  }
  render () {
    return (
      <input type='file' />
    )
  }
}
