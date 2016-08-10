import React, { PropTypes } from 'react'
import { Link } from 'react-router'

function NavRight (props) {
  const { logged, profile, token } = props.user
  const { path, logout } = props
  let fakeID = 100500
  var signout = function () {
    logout((path === '/passenger/' ? '/client/' : '/driver/'), token)
  }
  if (logged) {
    return (
      <div className='nav-right'>
        <Link
          to={`${path}profile/${profile.Id || profile.id || fakeID}`}
          className='userName'>
            {profile.FirstName || profile.Login || profile.first_name || profile.login}
        </Link>
        <Link to={`${path}profile/${profile.Id || profile.id || fakeID}`}>
          <img className='avatar' src={profile.avatar || '/files/boy-512.png'}></img>
        </Link>
        <a href='#'
          onClick={signout}
          className='nav-logout' activeClassName='active'>Выйти</a>
      </div>
    )
  } else {
    return (
      <div className='nav-right'>
        <Link
          to={`${path}signin`}
          className='nav-enter'
          activeClassName='active'>
          Вход
        </Link>
        <Link
          to={`${path}signup`}
          className='nav-registration'
          activeClassName='active'>
          Регистрация
        </Link>
      </div>
    )
  }
}

NavRight.propTypes = {
  props: PropTypes.element,
  path: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default NavRight
