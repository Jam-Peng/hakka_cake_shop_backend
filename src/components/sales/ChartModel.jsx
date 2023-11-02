import { IoMdClose } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { SalesContext } from "../../context/SalesContext";
import { useContext, useEffect, useState } from "react";
import ChartVisual from "./ChartVisual";

function ChartModel() {
  const { isOpenChart, setIsOpenChart, orderStatData } = useContext(SalesContext)
  const [orderDate, setOrderDate] = useState('')

  const { order_date, items } = orderStatData

  // 日期
  useEffect(() => {
    if (order_date) {
      const select_date = order_date.split('T')[0]
      setOrderDate(select_date)
    }
  },[order_date])

  // 關閉圖形元件
  const closeChart = () => {
    setIsOpenChart(false)
  };

  return (
    <section className={`${isOpenChart ?  "opacity-1 scale-100 bg-gray-100" : "opacity-0 scale-0 bg-gray-0"} 
            pt-0 absolute w-full h-full top-0 flex justify-center transition-all duration-500 z-30`}
            onMouseLeave={closeChart}>
      <div className="overflow-hidden border rounded-md w-full">
        <div>
          <div className="py-2 px-8 bg-rose-500 text-gray-50 flex items-center justify-between">
            <div className="space-x-2 flex items-center text-sm">
                  <span><SlCalender size={20} /></span>
                  <span>{orderDate}</span>
            </div>
            <button className="hover:text-gray-200" onClick={closeChart}>
              <IoMdClose size={22} />
            </button>
          </div>

          {/* 圖表 */}
          <div className="pt-4 px-4">
            {items !== undefined ?
              <ChartVisual items={items} />
              :
              null
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChartModel