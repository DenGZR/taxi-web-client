import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { showMenu } from '../../../redux/modules/helperModule'

export class DropdownMenu extends React.Component {
  constructor (props) {
    super(props)
    this._hideMenuWhenMouseLeave = this._hideMenuWhenMouseLeave.bind(this)
  }
  static propTypes = {
    path: PropTypes.string,
    menuPath: PropTypes.string,
    menuState: PropTypes.object,
    showMenu: PropTypes.func
  }
  _hideMenuWhenMouseLeave (e) {
    const { showMenu } = this.props
    showMenu()
  }
  render () {
    const { path, menuPath, showMenu } = this.props
    const { showDropdown } = this.props.menuState.dropdown
    return (
      <div className={'dropdown-header-menu' + (showDropdown ? ' open' : '')}
        onMouseLeave={this._hideMenuWhenMouseLeave}>
        <ul className='dropdown-menu'>
          <li className='dropdown-menu-item' onClick={showMenu}>
            {/* TO DO change icon for statistic/order */}
            {/* {`${path}${menuPath}`} */}
            <Link className='menu-order-icon' to='/passenger/'>{menuPath}</Link>
          </li>
          <li className='dropdown-menu-item' onClick={showMenu}>
            <Link className='menu-settings-icon' to={`${path}settings`}>Настройки</Link>
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  menuState: state.helperModule
})

export default connect((mapStateToProps), {
  showMenu
})(DropdownMenu)
