import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { showMenu } from '../../../redux/modules/helperModule'

export class NavLeft extends Component {
  constructor (props) {
    super(props)
    this._preventEvent = this._preventEvent.bind(this)
  }
  static propTypes = {
    showMenu: PropTypes.func.isRequired,
    userInfo: PropTypes.object
  }
  _preventEvent (e) {
    //debugger;

    const { userType } = this.props.userInfo
    const eventUserType = e.target.href.indexOf('passenger') !== -1 ? 'passenger' : 'driver'
    console.log("eventUserType", eventUserType);
    if (userType !== eventUserType) {
      e.preventDefault()
      return
    }
  }
  render () {
    const { showMenu } = this.props

    return (
      <div className='nav-left'>
        <button className='header-menu menu-icon' onClick={showMenu}/>
        <span className='header-menu-logo'>COMBOTAXI</span>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.cookieUtils
})

export default connect((mapStateToProps), {
  showMenu
})(NavLeft)
// onClick={this._preventEvent}
// onClick={this._preventEvent}
// if (userType) {
//   var disableClient = (!userType && user === 'passenger' ? '' : 'inactive')
//   var disableDriver = (!userType && user === 'driver' ? '' : 'inactive')
// }


// <div className='nav-left'>
//   <button className='header-menu menu-icon' onClick={showMenu}/>
//   <Link
//     to={'/passenger/'}
//     onClick={this._preventEvent}
//     className='nav-passenger '
//     activeClassName='active'>Пассажир</Link>
//   <Link
//     to={'/driver/'}
//     onClick={this._preventEvent}
//     className='nav-driver '
//     activeClassName='active'>Водитель</Link>
// </div>
