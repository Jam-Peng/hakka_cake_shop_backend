import { SlCalender } from "react-icons/sl";
import { AiOutlineBarChart } from "react-icons/ai";
import SaleItem from "./SaleItem"
import { SalesContext } from "../../context/SalesContext";
import { useContext } from "react";

function SaleList({ orderStats, index }) {
  const { setIsOpenChart, getOneOrderForChart } = useContext(SalesContext)

  const { order_date, items } = orderStats
  
  // 日期
  const dates = order_date.split('T')[0]

  // 銷售總額
  const sale_total_amount = items.reduce(( acc, cur ) => {
    return acc+ cur.total_amount
  },0)

  return (
    <section>
      <div className="border rounded-lg bg-gray-50 overflow-hidden">
        <div className="space-y-2 pb-2">
          <div>
            <div className="py-2 px-4 space-y-1 bg-rose-500 text-gray-100">
              <div className="flex items-center justify-between">
                <div className="space-x-2 flex items-center text-sm">
                  <span><SlCalender size={20} /></span>
                  <span>{dates}</span>
                </div>
                <div onClick={() => { setIsOpenChart(true); getOneOrderForChart(index) }}>
                  <button className="flex items-center space-x-1 btn-order_delete">
                    <AiOutlineBarChart size={24}/>
                    <span>圖視化</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="text-gray-800 bg-gray-50 p-4">
              <div className="flex items-center border-b px-1 pb-2 mb-1 font-medium space-x-3">
                <div className="w-2/12">
                  <span>類別</span>
                </div>
                <div className="w-5/12">
                  <span>商品</span>
                </div>
                <div className="w-2/12">
                  <span>銷售量</span>
                </div>
                <div className="w-2/12">
                  <span>銷售額</span>
                </div>
              </div>

              {
                items.map((item,index) => {
                  return <SaleItem key={index} item={item} />
                })
              }
            </div>
          </div>
        
          <div className="px-4 text-end">
            <div className="border-t pt-2">
              <span>銷售總額：</span>
              <span>NT. {sale_total_amount}</span>
            </div>
          </div>
        </div>
      </div>

    </section>  
  )
}

export default SaleList