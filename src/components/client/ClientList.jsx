import user_img from "../../assets/user.png"
import { FiTrash2 } from "react-icons/fi";
import { ClientContext } from "../../context/ClientContext";
import { useContext } from "react";
import ClientItem from "./ClientItem";

function ClientList({ client, currentUser }) {
  const { id, image, username, name, email, orders } = client
  const { openClientItem, setOpenClientItem, addToBlackList } = useContext(ClientContext)

  // 開關訂單項目
  const openClientItemsTaggle = (id) => {
    if (openClientItem === id) {
      setOpenClientItem(null);    // 如果當前列表已經開啟，則關閉它
    } else {
      setOpenClientItem(id);      // 否則開啟該列表
    }
  }

  
  return (
    <section className="border rounded-lg bg-gray-50 overflow-hidden">
      <div className="space-y-2">
        <div>
          <div className="py-2 px-4 space-y-1 bg-gray-300 hover:bg-gray-200 hover:text-indigo-500 cursor-pointer"
            onClick={()=>{openClientItemsTaggle(id)}}>
            <div className="flex items-center justify-between">
              <div className="w-11/12 flex items-center">
                <div className="w-2/12">
                  {image ?
                    <img src={image} alt="大頭照" className="h-14 w-14 rounded-md"/>
                    
                    :
                    <img src={user_img} alt="大頭照" className="h-14 w-14 rounded-md bg-gray-100"/>
                  }
                </div>
                <div className="w-2/12">
                  <span>{username}</span>
                </div>
                <div className="w-2/12">
                  <span>{name||"未提供"}</span>
                </div>
                <div className="w-4/12">
                  <span>{email}</span>
                </div>
                <div className="w-2/12">
                  <span>一般會員</span>
                </div>
              </div>

              <div>
                {currentUser.admin === true ?
                <div onClick={()=>{addToBlackList(id)}}>
                  <button className="btn-md btn-out">
                    <FiTrash2 size={18}/>
                  </button>
                </div>
                :
                null
                }
              </div>
            </div>
          </div>

          {openClientItem === id && (
            <div className="text-gray-800 bg-gray-50 p-4">
              {orders.length === 0 ?
                <div>
                  <span className="text-rose-500">尚未購買商品</span>
                </div>
                :
                <div className="space-y-4">
                  {orders.map(item => { 
                      return (
                        <ClientItem key={item.id} item={item}/>
                      )
                    })
                  }
                </div>
              }
            </div>
          )} 
        </div>
        
      </div>
    </section>
  )
}

export default ClientList