import React, { Component, PropTypes } from 'react'
import EasyTransition from 'react-easy-transition'
import { connect } from 'react-redux'

import Header from '../../components/Header/Header'
import MapLayout from '../../components/MapLayout/MapLayout'
import Notice from '../../components/Notice/Notice'
import MainPage from 'components/mainPage/MainPage.js'

import { askUserLocation } from '../../redux/modules/mapUtils'

export class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.element,
    location: PropTypes.object,
    askUserLocation: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      showMap: true,
      coords: {
        isLocated: null,
        zoom: 6,
        latitude: 50.4501,
        longitude: 30.523400000000038
      }
    }
  }
  componentWillMount () {
    const { askUserLocation } = this.props
    // console.log('askUserLocation');
    askUserLocation()
  }
  _checkPath () {
    const Path = this.props.location.pathname
    if (Path === '/passenger/' && Path.length <= 11 || Path === '/passenger/order' && Path.length <= 16) {
      return true
    }
    return false
  }
  render () {
    const { children } = this.props
    // console.log("CoreLayout props",this.props);
    if (children) {
      const { path } = children.props.route
      var menuPath = 'Заказ'
      if (path === '/driver/') {
        menuPath = 'statistic'
      }
      if (path === '*') {
        return <div className='not-found-wrapper'>{children}</div>
      }
    }
    const renderBlock = children ? (
      <div className='main-wrapper'>
        <Header path={'/passenger/'} menuPath={menuPath} openMenu={this.state.open}/>
        <Notice />
        <EasyTransition
          path={location.pathname}
          initialStyle={{opacity: 0}}
          transition='opacity 0.3s ease-in'
          finalStyle={{opacity: 1}}>
          {children}
        </EasyTransition>
      </div>) : <MainPage />
    return (
      <div className='handler'>
        <MapLayout displayMap={true} />
        {renderBlock}
      </div>
    )
  }

  // render () {
  //   const { children } = this.props
  //   const { path } = children.props.route
  //
  //   let menuPath = 'order'
  //   if (path === '/driver/') {
  //     menuPath = 'statistic'
  //   }
  //   if (path === '*') {
  //     return <div className='not-found-wrapper'>{children}</div>
  //   }
  //   return (
  //     <div className='handler'>
  //       <MapLayout
  //         coords={this.state.coords}
  //         displayMap={this._checkPath()}
  //       />
  //       <div className='main-wrapper'>
  //         <Header path={path} menuPath={menuPath} openMenu={this.state.open}/>
  //         <Notice />
  //         <EasyTransition
  //           path={location.pathname}
  //           initialStyle={{opacity: 0}}
  //           transition='opacity 0.3s ease-in'
  //           finalStyle={{opacity: 1}}>
  //           {children}
  //         </EasyTransition>
  //       </div>
  //     </div>
  //   )
  // }
}

export default connect(null, {
  askUserLocation
})(CoreLayout)
