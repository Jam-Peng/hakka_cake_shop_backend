import { PiUserCircle, PiUserCircleMinus } from "react-icons/pi"
import { AiOutlineFieldNumber, AiFillPicture } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md"
import { RiVipDiamondLine } from "react-icons/ri"
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ClientContext } from "../context/ClientContext";
import ClientList from "../components/client/ClientList";
import ClientSearchInput from "../components/client/ClientSearchInput";

function Client() {
  const { currentUser } = useContext(AuthContext)
  const { getAllClient, resultClients, getAllProductsForClient, clientMessage } = useContext(ClientContext)

  useEffect(() => {
    getAllClient()
    getAllProductsForClient()
  },[getAllClient, getAllProductsForClient])
  
  return (
    <section className="h-full p-4 space-y-4 relative overflow-hidden">
      <div className="border rounded-md bg-gray-100 px-4 py-4
                      flex items-center justify-between w-full ">
        <div className="flex items-center space-x-4">
          <div>
            <button className="btn-category" onClick={getAllClient}>
              <span>全部會員</span>
            </button>
          </div>
          <ClientSearchInput />
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-rose-500 hidden sm:block">{clientMessage}</div>
        </div>
      </div>

      <div>
        <div className="border rounded-md bg-gray-100 sm:px-0 h-[580px] overflow-y-auto"> 
          <div className="px-7 py-2 font-medium bg-rose-500 text-gray-100 flex items-center justify-between">
            <div className="flex items-center w-11/12">
              <div className="w-2/12 flex items-center space-x-1">
                <span><AiFillPicture size={25}/></span>
                <span>圖片</span>
              </div>
              <div className="w-2/12 flex items-center space-x-1">
                <span><AiOutlineFieldNumber size={25}/></span>
                <span>帳號</span>
              </div>
              <div className="w-2/12 flex items-center space-x-1">
                <span><PiUserCircle size={25}/></span>
                <span>姓名</span>
              </div>
              <div className="w-4/12 flex items-center space-x-1">
                <span><MdOutlineEmail size={22}/></span>
                <span>信箱</span>
              </div>
              <div className="w-2/12 flex items-center space-x-1">
                <span><RiVipDiamondLine size={22}/></span>
                <span>會員</span>
              </div>
            </div>
            {currentUser.admin === true ?
              <div className="flex items-center space-x-1">
                <span><PiUserCircleMinus size={25} /></span>
                <span>刪除</span>
              </div>
              :
              null
            }
          </div>

          <div>
            <div className="px-4 py-2">
              {resultClients.map((client, index) => {
                return (
                  <div className="pt-4" key={client.id}>
                    <ClientList client={client} index={index} currentUser={currentUser} />
                  </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Client