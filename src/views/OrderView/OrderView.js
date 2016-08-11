/* @flow */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
/* Import Actions */
import {
  calculateTripCost, sendOrderToServer,
  getOrderById, getCurrentOrder, getOrdersList, getOrderStatus,
  runTimer, stopTimer, refreshState, refreshOrderCondition,
  usedAddonsChange, commentChange
} from '../../redux/modules/order'

import {
  drawDirections,
  clearMap,
  setCurrentPositionToMap
} from '../../redux/modules/mapUtils'

import { createConnectionWS } from '../../redux/modules/websockets'
import { cookieCheker } from '../../redux/modules/cookieUtils'

import Autocomplete from '../../components/OrderComponents/Autocomplete/Autocomplete'
import AdditionalParams from '../../components/OrderComponents/AdditionalParams/AdditionalParams'
import Passengers from '../../components/OrderComponents/AdditionalParams/Passengers'
import AdditionalTime from '../../components/OrderComponents/AdditionalParams/AdditionalTime'
import Order from '../../components/OrderComponents/Order/Order'
import OrderEscort from '../../components/OrderComponents/OrderEscort/OrderEscort'

export class OrderView extends Component {
  constructor (props) {
    super(props)
    this._showAddons = this._showAddons.bind(this)
    this._addMoreAutocomplete = this._addMoreAutocomplete.bind(this)
    this._removeAutocomplete = this._removeAutocomplete.bind(this)
    this._parsePlaceResponse = this._parsePlaceResponse.bind(this)
    this._checkboxChange = this._checkboxChange.bind(this)
    this._startPoint = this._startPoint.bind(this)
    this._onCityCheck = this._onCityCheck.bind(this)
    this._middlePoints = this._middlePoints.bind(this)
    this._commentChange = this._commentChange.bind(this)
    this._addSchedule = this._addSchedule.bind(this)
    this.state = {
      showAddon: false,
      correctPhone: null,
      orderState: {
        cost: null,
        user: false,
        otpReceived: false,
        tokenReceived: false,
        orderDetail: null
      },
      prepareOrder: {
        startPoint: null,
        endPoint: null,
        latlng: null,
        usedAddons: [],
        onCity: false,
        waypoints: [],
        comment: null,
        scheduleAt: {
          date: null,
          time: null
        }
      },
      addonPlaces: [],
      autocompleteId: 1
    }
  }
  static propTypes = {
    children: PropTypes.node,
    mapUtils: PropTypes.object.isRequired,
    calculateTripCost: PropTypes.func.isRequired,
    drawDirections: PropTypes.func.isRequired,
    aOrder: PropTypes.object,
    cookieToken: PropTypes.string,
    sendOrderToServer: PropTypes.func.isRequired,
    getOrderById: PropTypes.func,
    getOrdersList: PropTypes.func,
    getCurrentOrder: PropTypes.func,
    runTimer: PropTypes.func,
    setCurrentPositionToMap: PropTypes.func,
    refreshState: PropTypes.func,
    refreshOrderCondition: PropTypes.func,
    usedAddonsChange: PropTypes.func.isRequired,
    commentChange: PropTypes.func.isRequired,
    createConnectionWS: PropTypes.func.isRequired,
    cookieCheker: PropTypes.func.isRequired,
    socketOpen: PropTypes.bool.isRequired
  }
  componentWillReceiveProps (props) {
    const { mapMarkers } = this.props.mapUtils
    const newMarkerArr = props.mapUtils.mapMarkers
    const { shouldRefresh } = props.aOrder

    if (shouldRefresh) {
      const { refreshState, refreshOrderCondition } = this.props
      for (var i = this.state.autocompleteId; i > 1; i--) {
        this._removeAutocomplete()
      }
      refreshOrderCondition({
        orderStatus: false,
        orderState: null
      })
      refreshState({shouldRefresh: false})
    }
    if (mapMarkers.length >= 2 && mapMarkers.length === this.state.autocompleteId) {
      this._addMoreAutocomplete()
    } else if (mapMarkers.length >= 2 && newMarkerArr.length < mapMarkers.length) {
      this._removeAutocomplete()
    }
  }

  componentDidMount () {
    const { createConnectionWS, cookieCheker, cookieToken, socketOpen } = this.props

    if (this.state.addonPlaces.length <= 0) {
      this._addMoreAutocomplete()
    }
    // check cookie if not checked
    if (!cookieToken) {
      cookieCheker('token')
    }
    // init websocket connection if not
    if (!socketOpen) {
      createConnectionWS()
    }
  }
  _showAddons () {
    this.setState({
      showAddon: !this.state.showAddon
    })
  }
  _addMoreAutocomplete () {
    const { addonPlaces, autocompleteId } = this.state
    if (addonPlaces.length > 4) {
      return
    }
    let inc = parseInt(autocompleteId)
    addonPlaces.push(<Autocomplete refId={inc}/>)
    this.setState({
      addonPlaces: addonPlaces,
      autocompleteId: inc + 1
    })
  }
  _removeAutocomplete () {
    const { addonPlaces, autocompleteId } = this.state
    if (addonPlaces.length <= 1) {
      return
    }
    addonPlaces.pop()
    let dec = parseInt(autocompleteId)
    this.setState({
      addonPlaces: addonPlaces,
      autocompleteId: dec - 1
    })
  }
  _parsPlace (arr, searchWord) {
    // Deprecated: Moved to mapUtils reducer 18.06.16
    console.log('Deprecated: Moved to mapUtils reducer 18.06.16')
    // let result = null
    // arr.forEach(function (i) {
    //   if (i.types.indexOf(searchWord) !== -1) {
    //     result = i.long_name
    //   }
    // })
    // return result
  }
  _parsePlaceResponse (place) {
    // Deprecated: Moved to mapUtils reducer 18.06.16
    console.log('Deprecated: Moved to mapUtils reducer 18.06.16')
    // let formatedPlace = {
    //   lat: place.geometry.location.lat(),
    //   lng: place.geometry.location.lng(),
    //   title: place.name,
    //   addr_str: place.formatted_address,
    //   latlng: place.geometry.location,
    //   postcode: null,
    //   country: this._parsPlace(place.address_components, 'country'),
    //   state: this._parsPlace(place.address_components, 'administrative_area_level_1'),
    //   city: this._parsPlace(place.address_components, 'locality'),
    //   street: this._parsPlace(place.address_components, 'locality'),
    //   district: this._parsPlace(place.address_components, 'sublocality_level_1'),
    //   building: this._parsPlace(place.address_components, 'street_number'),
    //   placeId: place.place_id
    // }
    // return formatedPlace
  }
  _startPoint (place) {
    // deprecated 18.06.16
    console.log('deprecated 18.06.16')
    // this.setState({
    //   prepareOrder: Object.assign({}, this.state.prepareOrder, {
    //     startPoint: this._parsePlaceResponse(place)
    //   })
    // })
  }
  _middlePoints (place) {
    // Deprecated 19.06.16
    console.log('Deprecated 19.06.16')
    // const places = this.state.prepareOrder.waypoints
    // const { prepareOrder } = this.state
    // const parsedPlace = this._parsePlaceResponse(place)
    //
    // places.push(parsedPlace)
    // this.setState({
    //   prepareOrder: Object.assign({}, prepareOrder, {
    //     waypoints: places,
    //     endPoint: places.slice(-1)[0]
    //   })
    // })
  }
  _checkboxChange (id) {
    const { distance } = this.props.mapUtils.routeData
    const { calculateTripCost, usedAddonsChange } = this.props
    var addonId = parseInt(id.id.replace(/[A-Za-z]+/, ''))
    const addonList = [...this.props.aOrder.prepareOrder.tariff_addons]
    if (id.checked) {
      addonList.push(addonId)
      usedAddonsChange(addonList)
    } else {
      let index = addonList.indexOf(addonId)
      addonList.splice(index, 1)
      usedAddonsChange(addonList)
    }
    if (distance > 0) {
      calculateTripCost()
    }
    return id.checked
  }
  _onCityCheck (e) {
    this.setState({
      prepareOrder: Object.assign({}, this.state.prepareOrder, {onCity: e.target.checked})
    })
  }
  _commentChange (e) {
    const { commentChange } = this.props
    const { value } = e.target
    commentChange({client_comment: value})
  }
  _drawRoute (e) {
    // not use anymore 13.06.16
    console.log('not use anymore, from 13.06.16')
    // const { drawDirections } = this.props
    // const { startPoint, endPoint, waypoints } = this.state.prepareOrder
    // let waypointsList = []
    // if (waypoints.length > 0) {
    //   let steps = [...waypoints]
    //   steps.pop()
    //   steps.forEach((item) => {
    //     return waypointsList.push({
    //       location: item.latlng,
    //       stopover: true
    //     })
    //   })
    // }
    // if (startPoint && endPoint) {
    //   drawDirections(startPoint.placeId, endPoint.placeId, waypointsList)
    //   setTimeout(this._calculateCost, 1000)
    // }
  }
  _calculateCost () {
    // not use anymore 13.06.16
    console.log('not use anymore, from 13.06.16')
    // const { distance_included, boarding_price, km_price } = this.state.currentTariff[0]
    // const { distance, duration } = this.state.orderState.orderDetail
    // const { usedAddons } = this.state.prepareOrder
    // const { additional } = this.state
    // const { calculateTripCost } = this.props
    // // console.log(distance_included, boarding_price, distance, duration, km_price)
    // calculateTripCost(additional, usedAddons, distance_included, boarding_price, km_price, distance, duration)
  }
  _makeOrder () {
    // deprecated 18.06.16
    console.log('deprecated 18.06.16')
    // const { sendOrderToServer } = this.props
    // const { endPoint, startPoint, waypoints, comment, usedAddons } = this.state.prepareOrder
    // const { time, date } = this.state.prepareOrder.scheduleAt
    // if (!startPoint && !endPoint) {
    //   return
    // }
    // sendOrderToServer(endPoint, startPoint, waypoints, comment, usedAddons, time, date)
  }
  _addSchedule (e, type) {
    // deprecated 18.06.16
    console.log('deprecated 18.06.16')

    // const { date, time } = this.state.prepareOrder.scheduleAt
    // const { scheduleAt } = this.state.prepareOrder
    //
    // let dateTime = null
    //
    // if (type === 'time') {
    //   dateTime = Object.assign({}, scheduleAt, { time: e })
    //   this.setState({
    //     prepareOrder: Object.assign({}, this.state.prepareOrder, {
    //       scheduleAt: dateTime
    //     })
    //   })
    // } else {
    //   dateTime = Object.assign({}, scheduleAt, { date: e })
    //   this.setState({
    //     prepareOrder: Object.assign({}, this.state.prepareOrder, {
    //       scheduleAt: dateTime
    //     })
    //   })
    // }
  }
  render () {
    const { children } = this.props
    const { addonPlaces } = this.state
    const {
      calculating,
      fare,
      orderId,
      orderComplete,
      requireReview,
      fetchedAddons
    } = this.props.aOrder

    if (children) {
      return (
        <div className='hi-im-in-OrderView' style={{position: 'relative'}}>
          {children}
        </div>
      )
    }
    const morePlaces = addonPlaces.map((current, i) => {
      return (
        <label key={i + 'mople'}>
          <span className='title-textinput'>Адрес</span>
            {current}
        </label>
      )
    })
    const { currentOrderId } = window.localStorage
    if (orderId || !orderComplete || currentOrderId || requireReview) {
      return <OrderEscort />
    } else {
      return (
        <div className='unlogin-booking'>
          <div className='submain'>
            <div className='title-wrapper'>
              <h2 className='sub-title'>ОТКУДА</h2>
            </div>
            <div className='content'>
              <label>
                <span className='title-textinput'>Адрес</span>
                <Autocomplete refId={0} />
              </label>
              <br/>
              <label>
                <span className='title-textinput'>Примечание</span>
                <p className='input-wrapper'>
                  <input
                    type='text'
                    name='details'
                    placeholder='Оставьте комментарий'
                    maxLength='2000'
                    onBlur={this._commentChange}
                    className='text-field'/>
                </p>
              </label>
            </div>
            <div className='title-wrapper'>
              <h2 className='sub-title where'>КУДА</h2>
              {/* <i className='plus' onClick={this._addMoreAutocomplete}></i>
            <i className='minus' onClick={this._removeAutocomplete}></i> */}
              {/* <span className='title-checkbox'>
                <label forName='onCity' className='checkbox'>
                  <input
                    type='checkbox'
                    name='cityRoute'
                    onChange={this._onCityCheck}
                    ref='onCity' />
                  <span className='checkbox-span on-city'>По городу</span>
                </label>
              </span> */}
            </div>
            <div className='content'>
              {morePlaces}
            </div>
            <div className='title-wrapper'>
              <h2 className='sub-title'>ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ</h2>
            </div>
            <div className='content'>
              <label>
                <span className='title-seats'>Количество пассажиров</span>
                <Passengers />
              </label>
              <br/>
              <AdditionalTime />
              <AdditionalParams
                triggerAddons={this._showAddons}
                addons={fetchedAddons}
                checked={this._checkboxChange}
                checkedFunc={this._checkboxChange}
                show={this.state.showAddon} />
            </div>
            <Order
              loading={calculating}
              cost={fare}/>
          </div>
        </div>
      )
    }
  }
}
const mapStateToProps = (state) => ({
  mapUtils: state.mapUtils,
  aOrder: {
    ...state.order,
    otp: state.auth.otpSend,
    otpCode: state.apiSignup.OTP
  },
  cookieToken: state.cookieUtils.cookieToken,
  socketOpen: state.websockets.socketStatus.open
})
export default connect((mapStateToProps), {
  calculateTripCost,
  sendOrderToServer,
  drawDirections,
  clearMap,
  getOrderById,
  getOrdersList,
  getCurrentOrder,
  getOrderStatus,
  runTimer,
  stopTimer,
  setCurrentPositionToMap,
  refreshState,
  refreshOrderCondition,
  usedAddonsChange,
  commentChange,
  createConnectionWS,
  cookieCheker
})(OrderView)
