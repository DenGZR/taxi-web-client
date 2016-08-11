import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import { createMarker, googlePlaceParser, reverseGeocoding, wasDragend } from '../../../redux/modules/mapUtils'
import { incomingNotice } from '../../../redux/modules/notifier'

export class Autocomplete extends Component {
  constructor (props) {
    super(props)
    this._place = this._place.bind(this)
    this._inputAction = this._inputAction.bind(this)
    this.SearchBox = null
    this._ID = null
    this.state = {
      autocompleteValue: ''
    }
  }
  static propTypes = {
    mapUtils: PropTypes.object,
    refId: PropTypes.number.isRequired,
    createMarker: PropTypes.func.isRequired,
    incomingNotice: PropTypes.func.isRequired,
    googlePlaceParser: PropTypes.func.isRequired,
    reverseGeocoding: PropTypes.func.isRequired,
    wasDragend: PropTypes.func.isRequired
  }
  componentWillMount () {
    this._ID = this.props.refId
  }
  componentDidMount () {
    //debugger
    const { SearchBox, google, mapMarkers } = this.props.mapUtils
    this.SearchBox = new SearchBox(this.refs[`address_${this._ID}`])
    google.event.addListener(this.SearchBox, 'places_changed', this._place)

    if ( mapMarkers.length > 0 && mapMarkers[this._ID]) {
      this.refs[`address_${this._ID}`].value = mapMarkers[this._ID].addr_string
    }
  }
  componentWillUnMount () {
    const { google } = this.props.mapUtils
    google.event.clearInstanceListeners(this.Autocomplete)
  }
  componentWillReceiveProps (newProp) {
    const { mapMarkers, dragend } = newProp.mapUtils
    if (mapMarkers[this._ID] && dragend) {
      setTimeout(() => {
        this.refs[`address_${this._ID}`].value = mapMarkers[this._ID].addr_string
      }, 500)
      wasDragend({dragend: false})
    }
    if (mapMarkers[this._ID] && this.refs[`address_${this._ID}`].value !== mapMarkers[this._ID].addr_string) {
      this.refs[`address_${this._ID}`].value = mapMarkers[this._ID].addr_string
    }
    if ((mapMarkers.length - 1) < this._ID && this.refs[`address_${this._ID}`].value.length !== 0) {
      this.refs[`address_${this._ID}`].value = ''
    }
  }
  _inputAction (e) {
    const { google, mapMarkers } = this.props.mapUtils
    if (e.target.value.length === 0 && mapMarkers.length >= 1) {
      google.event.trigger(mapMarkers[this._ID], 'dblclick')
    }
  }
  _place () {
    var place = this.SearchBox.getPlaces()[0]
    if (!place) { return }
    const { appMap, mapMarkers, google } = this.props.mapUtils
    const { reverseGeocoding } = this.props

    this.refs[`address_${this._ID}`].value = place.formatted_address

    // let isUA = true
    // if (!place.geometry) {
    //   console.log('no geometry')
    //   reverseGeocoding({'address': direction.value})
    //   return
    // }
    // place.address_components.forEach((item) => {
    //   if (item.types.indexOf('country') !== -1 && item.short_name !== 'UA') {
    //     isUA = false
    //     incomingNotice({
    //       notice: 'Выберите маршрут в пределах Украины.'
    //     })
    //   }
    // })
    // if (!isUA) { return }
    if (mapMarkers[this._ID] && place.formatted_address !== mapMarkers[this._ID].addr_string) {
      google.event.trigger(mapMarkers[this._ID], 'dblclick')
    } else if (mapMarkers[this._ID] && place.formatted_address === mapMarkers[this._ID].addr_string) {
      return
    }
    if (place.geometry.viewport) {
      appMap.fitBounds(place.geometry.viewport)
      appMap.setCenter(appMap.getCenter())
      appMap.panBy(-Math.floor(appMap.getDiv().offsetWidth / 4), 0)
    } else {
      appMap.setCenter(place.geometry.location)
      appMap.setZoom(15)
      appMap.panBy(-Math.floor(appMap.getDiv().offsetWidth / 4), 0)
    }
    reverseGeocoding({'location': place.geometry.location})
  }
  render () {
    const { mapMarkers } = this.props.mapUtils
    return (
      <div className='input-wrapper'>
        <input
          onChange={this._inputAction}
          type='text'
          className='text-field'
          disabled={(mapMarkers.length - 1 > this._ID ? 'disabled' : '')}
          ref={`address_${this.props.refId}`}
          placeholder='Введите адрес'
          value={this.autocompleteValue}
        />
      {this.inputElement}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  mapUtils: state.mapUtils
})
export default connect((mapStateToProps), {
  createMarker,
  incomingNotice,
  googlePlaceParser,
  reverseGeocoding,
  wasDragend
})(Autocomplete)
