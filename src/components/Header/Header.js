import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchInfo, logout } from '../../redux/modules/auth'
import { hasCookie } from '../../redux/modules/cookieUtils'

import Navigation from './sub/Navigation'
import DropdownMenu from './sub/DropdownMenu'

export class Header extends React.Component {
  static PropTypes = {
    path: PropTypes.string,
    menuPath: PropTypes.string,
    openMenu: PropTypes.bool,
    user: PropTypes.object,
    hasCookie: PropTypes.func
  }
  render () {
    // console.log(this.props)
    return (
      <header className='header '>
        <Navigation {...this.props} />
        <DropdownMenu {...this.props} />
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
  cookieState: state.cookieUtils
})
export default connect((mapStateToProps), {
  fetchInfo,
  logout,
  hasCookie
})(Header)
