import { SlCalender } from "react-icons/sl";
import { BsTags, BsTelephone} from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md"
import { LuUser2 } from "react-icons/lu"
import { FiTrash2 } from "react-icons/fi";
import { RiTakeawayLine } from "react-icons/ri";
import { useCallback, useContext, useEffect, useState } from "react";
import { OrdersContext } from "../../context/OrdersContext";
import OrderItems from "./OrderItems";
import { AuthContext } from "../../context/AuthContext";

function OrderList({ order }) {
  const [allOrderTime, setAllOrderTime] = useState('')
  const { openAllOrderItem, setALLOpenOrderItem, deleteOrderFromDb } = useContext(OrdersContext)
  const { currentUser } = useContext(AuthContext)

  const { id, order_id, client_name, phone, email, address, created_at, paid_amount, items } = order

// 轉換訂單時間
  const formatOrdersTime = useCallback(async () => {
    const date = new Date(created_at);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formatOrderDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    setAllOrderTime(formatOrderDateTime) 
  }, [created_at]) 

  useEffect(() => {
    formatOrdersTime()
  }, [formatOrdersTime])

  // 開關訂單項目
  const openOderItems = (id) => {
    if (openAllOrderItem === id) {
      setALLOpenOrderItem(null);    // 如果當前列表已經開啟，則關閉它
    } else {
      setALLOpenOrderItem(id);      // 否則開啟該列表
    }
  }

  return (
    <section className="border rounded-lg bg-gray-50 overflow-hidden">
      <div className="space-y-2 pb-2">
        <div>
          <div className="py-2 px-4 space-y-1 bg-rose-500 hover:bg-rose-600 text-gray-100 cursor-pointer"
            onClick={() => { openOderItems(id) }}>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-x-2 flex items-center">
                <BsTags size={20}/>
                <span>訂單編號</span>
                <span className="tracking-wide">{order_id}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-x-2 flex items-center text-sm">
                  <span><SlCalender size={20} /></span>
                  <span>{allOrderTime}</span>
                </div>
                {currentUser.admin === true ?
                <div onClick={()=>{deleteOrderFromDb(id)}}>
                  <button className="btn-order_delete">
                    <FiTrash2 size={18}/>
                  </button>
                </div>
                :
                null
                }
              </div>
            </div>
            <div className="flex items-center space-x-20">
              <div className="space-x-2 flex items-center">
                <span><LuUser2 size={20}/></span>
                <span>{client_name}</span>
              </div>
              <div className="space-x-2 flex items-center">
                <span><BsTelephone size={17}/></span>
                <span>{phone}</span>
              </div>
              <div className="space-x-2 flex items-center">
                <span><MdOutlineEmail size={22} /></span>
                <span>{email}</span>
              </div>
              <div className="space-x-2 flex items-center">
                <span><RiTakeawayLine size={20}/></span>
                <span className="tracking-wide">{address}</span>
              </div>
            </div>
          </div>

          {openAllOrderItem === id && (
            <div className="text-gray-800 bg-gray-50 p-4">
              <div className="flex items-center border-b px-1 pb-2 mb-1 font-medium space-x-3">
                <div className="w-2/12">
                  <span>類別</span>
                </div>
                <div className="w-5/12">
                  <span>商品</span>
                </div>
                <div className="w-2/12">
                  <span>數量</span>
                </div>
                <div className="w-2/12 px-3.5">
                  <span>售價</span>
                </div>
              </div>

              <div className="">
                {items.map(item => { 
                    return (
                      <OrderItems key={item.id} item={item}/>
                    )
                  })
                }
              </div>
            </div>
          )}
        </div>
        
        <div className="px-4 text-end">
          <div className="border-t pt-2">
            <span>付款金額：</span>
            <span>NT. {paid_amount}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderList