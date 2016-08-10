import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { passengersChange } from '../../../redux/modules/order'

export class Passengers extends React.Component {
  static propTypes = {
    passengersChange: PropTypes.func.isRequired,
    passengers: PropTypes.number.isRequired
  }
  render () {
    const { passengers, passengersChange } = this.props
    return (
      <div className='input-seats'>
        <input
          onChange={passengersChange}
          type='range'
          min={1}
          max={8}
          step={1}
          value={passengers}
        />
        <span className='seats-amount'>{passengers}</span>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  passengers: state.order.prepareOrder.passengers
})
export default connect((mapStateToProps), {
  passengersChange
})(Passengers)

      // <ul className='input-number'>
      //   <li className={'amount ' + (one ? 'actv' : '')} onClick={this._amount} ref='one'>1</li>
      //   <li className={'amount ' + (two ? 'actv' : '')} onClick={this._amount} ref='two'>2</li>
      //   <li className={'amount ' + (three ? 'actv' : '')} onClick={this._amount} ref='three'>3</li>
      //   <li className={'amount ' + (four ? 'actv' : '')} onClick={this._amount} ref='four'>4</li>
      //   <li className={'amount ' + (five ? 'actv' : '')} onClick={this._amount} ref='five'>5</li>
      //   <li className={'amount ' + (six ? 'actv' : '')} onClick={this._amount} ref='six'>6</li>
      //   <li className={'amount ' + (seven ? 'actv' : '')} onClick={this._amount} ref='seven'>7</li>
      //   <li className={'amount ' + (eight ? 'actv' : '')} onClick={this._amount} ref='eight'>8</li>
      // </ul>
