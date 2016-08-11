import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { initMap, setCurrentPositionToMap, reverseGeocoding } from '../../redux/modules/mapUtils'

export class MapLayout extends Component {
  static propTypes = {
    coords: PropTypes.object,
    displayMap: PropTypes.bool,
    mapState: PropTypes.object,
    initMap: PropTypes.func.isRequired
  }
  static defaultProps = {
    coords: {
      isLocated: null,
      zoom: 6,
      latitude: 50.4501,
      longitude: 30.523400000000038
    }
  }
  componentWillReceiveProps (props) {
    const { userLocation, setCurrentPositionToMap, reverseGeocoding } = props
    // console.log('MapLayout updete props userLocation', userLocation);
    if( userLocation.isLocated ) {
      debugger
      let latlng = {lat: userLocation.latitude , lng: userLocation.longitude};
      setCurrentPositionToMap()
      reverseGeocoding({'location': latlng})
    }
  }
  componentDidMount () {
    let { initMap, coords, userLocation } = this.props
    // console.log('MapLayout ',this.props);
    if(userLocation.isLocated) {
      coords={...coords, ...userLocation, zoom: 12}
    }
    initMap('map',coords)
  }

  render () {
    const { displayMap } = this.props
//style={displayMap ? null : {visibility: 'hidden'}}
    return (
      <div id='map' ref='mapHolder'></div>
    )
  }
}

const mapStateToProps = (state) => ({
  userLocation: state.mapUtils.currentLocation
})
export default connect((mapStateToProps), {
  initMap,
  setCurrentPositionToMap,
  reverseGeocoding
})(MapLayout)
