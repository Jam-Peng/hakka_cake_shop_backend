import React, { useContext, useEffect } from 'react'
import { SalesContext } from '../context/SalesContext'
import SaleList from '../components/sales/SaleList'
import ChartModel from '../components/sales/ChartModel'
import ChartSearchInput from '../components/sales/ChartSearchInput'

function Sales() {
  const { currentStatData, getCurrentOrderStat, searchStatMessage, getMonthsOrderStat,
          getYearOrderStat } = useContext(SalesContext)

  useEffect(() => {
    getCurrentOrderStat()
  },[getCurrentOrderStat])

  return (
    <section className="h-full p-4 space-y-4 relative overflow-hidden">
      <div className="border rounded-md bg-gray-100 px-4 py-4
                      flex items-center justify-between w-full overflow-x-hidden">
        <div className="flex items-center space-x-4">
          <div>
            <button className="btn-category" onClick={getCurrentOrderStat}>
              <span>當日銷售統計</span>
            </button>
          </div>
          <div>
            <button className="btn-category" onClick={getMonthsOrderStat}>
              <span>每月銷售統計</span>
            </button>
          </div>
          <div>
            <button className="btn-category" onClick={getYearOrderStat}>
              <span>年度銷售統計</span>
            </button>
          </div>
          <ChartSearchInput />
        </div>
        {searchStatMessage ?
          <div className="flex items-center space-x-4">
            <div className="text-rose-500 hidden sm:block">{searchStatMessage}</div>
          </div>
          :
          null
        }
      </div>
      
      <div>
        <div className="border rounded-md bg-gray-100 sm:px-0 h-[580px] overflow-y-auto"> 
          <div className="p-4 space-y-4">
            <div className="space-y-4">
              {
                currentStatData.map((orderStats, index) => (
                  orderStats.items.length !== 0 ?
                  <SaleList key={index} orderStats={orderStats} index={index}/>
                  :
                  <span className='text-rose-500' key={index}>當日無營業額</span>
                ))
              }
            </div>
          </div> 
        </div>
      </div>

      {/* 圖表 */}
      <ChartModel/>

    </section>
  )
}

export default Sales