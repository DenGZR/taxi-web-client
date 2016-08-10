import React, { PropTypes } from 'react'

export class AdditionalParams extends React.Component {
  constructor (props) {
    super(props)
    this._checker = this._checker.bind(this)
  }
  static propTypes = {
    show: PropTypes.bool,
    triggerAddons: PropTypes.func,
    addons: PropTypes.array,
    checkedFunc: PropTypes.func
  }
  _checker (e) {
    const { checkedFunc } = this.props
    let id = e.target.id
    checkedFunc(this.refs[id])
  }
  render () {
    const { triggerAddons, addons } = this.props
    if (addons) {
      var additionalNodes = addons.map((addon) => {
        return (
          <li className='additional-item' key={'adt' + addon.id}>
            <label className='checkbox'>
              <input
                name={addon.title}
                type='checkbox'
                ref={'addon' + addon.id}
                id={'addon' + addon.id}
                onChange={this._checker}/>
              <span className='checkbox-span'>{addon.title}</span>
            </label>
          </li>
          )
      })
    } else {
      'Loading...'
    }
    return (
      <div className='additional'>
        <p className='additional-title' onClick={triggerAddons}>
          Дополнительные Услуги
          <i className='additional-menu-icon'></i>
        </p>
        <hr className='additional-line'/>
        <ul className={'additional-list' + (this.props.show ? ' open' : '')}>
          {additionalNodes}
        </ul>
      </div>
    )
  }
}

export default AdditionalParams
