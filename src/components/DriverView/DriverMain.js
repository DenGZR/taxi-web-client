import React, { Component, PropTypes } from 'react'

export class DriverMain extends Component {
  static propTypes = {
    children: PropTypes.node
  }
  render () {
    const { children } = this.props
    if (children) {
      return (
        <div className='hi-im-in-Driver' style={{position: 'relative', height: '100%'}}>
          {children}
        </div>
      )
    } else {
      return (
        <div className='driver-info'>
          <div style={{backgroundColor: '#FFFFFF', height: '100%'}}>
            <div>
              <h1>Ввойдите в систему</h1>
              <h3>И получите доступ следить за своим балансом, историей поездок</h3>
              Тут можно было бы что то придумать что бы когда таксист заходит, что то типа наши достоинства и тд
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
              esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
              in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </div>
      )
    }
  }
}

export default DriverMain
