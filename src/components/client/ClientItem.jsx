import { SlCalender } from "react-icons/sl";
import { BsTags, BsTelephone} from "react-icons/bs";
import { LuUser2 } from "react-icons/lu"
import { RiTakeawayLine } from "react-icons/ri";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ClientContext } from "../../context/ClientContext";
import ClientItmeInfo from "./ClientItmeInfo";

function ClientItem({ item }) {
  const [orderTime, setOrderTime] = useState('')
  const { openClientItemInfo, setOpenClientItemInfo } = useContext(ClientContext)
  
  const { id, order_id, client_name, phone, address, created_at, paid_amount, items } = item

  // 轉換訂單時間
  const formatOrdersTime = useCallback(async () => {
    const date = new Date(created_at);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formatOrderDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    setOrderTime(formatOrderDateTime) 
  }, [created_at]) 

  useEffect(() => {
    formatOrdersTime()
  }, [formatOrdersTime])

  // 開關訂單商品資訊
  const openClientItemsInfo = (id) => {
    if (openClientItemInfo === id) {
      setOpenClientItemInfo(null);    // 如果當前列表已經開啟，則關閉它
    } else {
      setOpenClientItemInfo(id);      // 否則開啟該列表
    }
  }

  return (
    <section className="border rounded-lg bg-gray-50 overflow-hidden">
      <div className="space-y-2">
        <div>
          <div className="py-2 px-4 space-y-1 bg-teal-500 hover:bg-gray-200 text-gray-50 hover:text-indigo-500 cursor-pointer"
              onClick={()=>{openClientItemsInfo(id)}}>
            <div className="flex items-center justify-between">
              <div className="space-x-2 flex items-center">
                <BsTags size={20}/>
                <span>訂單編號</span>
                <span className="tracking-wide">{order_id}</span>
              </div>
              
              <div className="space-x-2 flex items-center">
                <span><SlCalender size={20} /></span>
                <span>{orderTime}</span>
              </div>
              <div className="space-x-2 flex items-center">
                <span>付款金額：</span>
                <span>NT. {paid_amount}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-x-2 flex items-center">
                <span><LuUser2 size={20}/></span>
                <span>{client_name}</span>
              </div>
              <div className="space-x-2 flex items-center">
                <span><BsTelephone size={17}/></span>
                <span>{phone}</span>
              </div>
              <div className="space-x-2 flex items-center">
                <span><RiTakeawayLine size={20}/></span>
                <span className="tracking-wide">{address}</span>
              </div>
            </div>
          </div>

          {openClientItemInfo === id && (
            <div className="text-gray-800 bg-gray-50 p-4">
              <div className="flex items-center border-b px-1 pb-2 mb-1 space-x-3">
                <div className="w-2/12">
                  <span>類別</span>
                </div>
                <div className="w-5/12">
                  <span>商品</span>
                </div>
                <div className="w-2/12">
                  <span>數量</span>
                </div>
                <div className="w-2/12 px-3">
                  <span>售價</span>
                </div>
              </div>

              <div >
                {items.map(item => { 
                    return (
                      <ClientItmeInfo key={item.id} item={item}/>
                    )
                  })
                }
              </div>
            </div>
          )} 
        </div>
        
      </div>
    </section>
  )
}

export default ClientItem