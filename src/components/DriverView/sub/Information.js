import React, { Component } from 'react'

export class Information extends Component {
  render () {
    return (
      <div style={{minHeight: '500px', position: 'relative'}}>
        <h1 className='tab-title'>Позывные водителя</h1>
        <br/>
        <table className='callsign-table'>
          <thead className='callsign-thead'>
            <tr className='callsign-tr'>
              <th className='callsign-td-head'>Дата</th>
              <th className='callsign-td-head'>Служба</th>
              <th className='callsign-td-head'>Позывной</th>
              <th className='callsign-td-head'>Тариф</th>
              <th className='callsign-td-head'>Статус</th>
              <th className='callsign-td-head'>Изменить тариф</th>
            </tr>
          </thead>
          <tbody className='callsign-tbody'>
            <tr className='callsign-tr'>
              <td className='callsign-td-body'>10.10.2010</td>
              <td className='callsign-td-body'>Taxi Kiev</td>
              <td className='callsign-td-body'>000001</td>
              <td className='callsign-td-body'>За заказ</td>
              <td className='callsign-td-body'>В обработке</td>
              <td className='callsign-td-body'><button>Изменить</button></td>
            </tr>
            <tr className='callsign-tr'>
              <td className='callsign-td-body'>10.10.2010</td>
              <td className='callsign-td-body'>Taxi Kiev</td>
              <td className='callsign-td-body'>000001</td>
              <td className='callsign-td-body'>За заказ</td>
              <td className='callsign-td-body'>В обработке</td>
              <td className='callsign-td-body'><button>Изменить</button></td>
            </tr>
            <tr className='callsign-tr'>
              <td className='callsign-td-body'>10.10.2010</td>
              <td className='callsign-td-body'>Taxi Kiev</td>
              <td className='callsign-td-body'>000001</td>
              <td className='callsign-td-body'>За заказ</td>
              <td className='callsign-td-body'>В обработке</td>
              <td className='callsign-td-body'><button>Изменить</button></td>
            </tr>
            <tr className='callsign-tr'>
              <td className='callsign-td-body'>10.10.2010</td>
              <td className='callsign-td-body'>Taxi Kiev</td>
              <td className='callsign-td-body'>000001</td>
              <td className='callsign-td-body'>За заказ</td>
              <td className='callsign-td-body'>В обработке</td>
              <td className='callsign-td-body'><button>Изменить</button></td>
            </tr>
            <tr className='callsign-tr'>
              <td className='callsign-td-body'>10.10.2010</td>
              <td className='callsign-td-body'>Taxi Kiev</td>
              <td className='callsign-td-body'>000001</td>
              <td className='callsign-td-body'>За заказ</td>
              <td className='callsign-td-body'>В обработке</td>
              <td className='callsign-td-body'><button>Изменить</button></td>
            </tr>
          </tbody>
        </table>
        <div className='callsign-button-spot'>
          <button className='callsign-button'>Добавить</button>
        </div>
      </div>
    )
  }
}

export default Information
