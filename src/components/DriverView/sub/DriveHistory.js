import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

export class DriveHistory extends Component {
  static propTypes = {
    driverInfo: PropTypes.object.isRequired
  }
  render () {
    const { Amount } = this.props.driverInfo.balance
    const { transactions } = this.props.driverInfo
    const transactionsTable = transactions.map(function (item, i) {
      return (
        <tr key={'tab' + i + moment(item.CreatedAt).unix()}>
          <td className='transactions-info-td'>{moment(item.CreatedAt).format('YYYY-MM-DD HH:mm:ss')}</td>
          <td className='transactions-info-td'>{item.Direction === 'in' ? 'Пополнение' : 'Списание'}</td>
          <td className='transactions-info-td'>{item.Comment}</td>
          <td className='transactions-info-td'>{item.Amount}</td>
        </tr>
      )
    })
    return (
      <div style={{minHeight: '500px'}}>
        <div>
          <h3 className='tab-title'><b>Баланс: </b><b>{Amount}</b></h3>
          <h2 className='tab-title'>История Баланса</h2>
        </div>
        <section className='table-holder'>
          <div className='table-container'>
            <table className='table-transactions'>
              <thead>
                <tr>
                  <th className='transactions-info-th'>
                    <b>Дата/Время</b>
                    <div>Дата/Время</div>
                  </th>
                  <th className='transactions-info-th'>
                    <b>Тип Изменения</b>
                    <div>Тип Изменения</div>
                  </th>
                  <th className='transactions-info-th'>
                    <b>Причина</b>
                    <div>Причина</div>
                  </th>
                  <th className='transactions-info-th'>
                    <b>Сумма</b>
                    <div>Сумма</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactionsTable}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  driverInfo: state.driverModule
})
export default connect((mapStateToProps), null)(DriveHistory)

        // <table className='callsign-table'>
        //   <thead className='callsign-thead'>
        //     <tr className='callsign-tr'>
        //       <th className='callsign-td-head'>Дата Время</th>
        //       <th className='callsign-td-head'>Позывной</th>
        //       <th className='callsign-td-head' ref='reason2'>Причина</th>
        //       <th className='callsign-td-head'>Сумма</th>
        //       <th className='callsign-td-head'>Баланс</th>
        //     </tr>
        //   </thead>
        // </table>
