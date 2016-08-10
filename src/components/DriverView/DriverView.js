import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { getBalance, getTransactions } from '../../redux/modules/driverModule'

import Information from './sub/Information'
import Diagram from './sub/Diagram'
import DriveHistory from './sub/DriveHistory'

export class DriverView extends Component {
  constructor (props) {
    super(props)
    this._activeTabs = this._activeTabs.bind(this)
    this.state = {
      tab: 'tabA'
    }
  }
  static propTypes = {
    getBalance: PropTypes.func.isRequired,
    getTransactions: PropTypes.func.isRequired,
    cookieToken: PropTypes.string
  }
  componentWillMount () {
    const { cookieToken, getBalance, getTransactions } = this.props
    if (cookieToken) {
      getBalance()
      getTransactions()
    }
  }
  _activeTabs (e) {
    var obj = {
      tabA: this.refs.tab1 === e.target,
      tabB: this.refs.tab2 === e.target,
      tabC: this.refs.tab3 === e.target
    }
    for (var key in obj) {
      if (obj[key]) {
        this.setState({
          tab: key
        })
      }
    }
  }
  render () {
    const { tab } = this.state
    return (
      <div className='driver-profile'>
        <div className='tabs'>
          <div
            className={'tab' + (tab === 'tabA' ? ' active-tab' : '')}
            onClick={this._activeTabs} ref='tab1'>Позывные</div>
          <div
            className={'tab' + (tab === 'tabB' ? ' active-tab' : '')}
            onClick={this._activeTabs} ref='tab2'>Баланс</div>
          <div
            className={'tab' + (tab === 'tabC' ? ' active-tab' : '')}
            onClick={this._activeTabs} ref='tab3'>Статистика заказов</div>
        </div>
        <div className='tab-content'>
          {(() => {
            switch (tab) {
              case 'tabC': return <Diagram />
              case 'tabB': return <DriveHistory />
              default: return <Information />
            }
          })()}
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  cookieToken: state.cookieUtils.cookieToken
})
export default connect((mapStateToProps), {
  getBalance,
  getTransactions
})(DriverView)
