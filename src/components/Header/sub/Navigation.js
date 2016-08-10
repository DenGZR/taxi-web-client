import React, { PropTypes } from 'react'

import NavLeft from './NavLeft'
import NavRight from './NavRight'

export class Navigation extends React.Component {
  static propTypes = {
    path: PropTypes.string,
    user: PropTypes.object
  }
  render () {
    const { logged } = this.props.user
    return (
      <nav className={'navigation' + (logged ? ' logged' : '')}>
        <NavLeft />
        <NavRight {...this.props}/>
      </nav>
    )
  }
}

export default Navigation
