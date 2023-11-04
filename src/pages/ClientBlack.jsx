import { PiUserCircle, PiUserCircleMinus } from "react-icons/pi"
import { AiOutlineFieldNumber, AiFillPicture } from "react-icons/ai";
import { HiOutlineArrowDownOnSquareStack } from "react-icons/hi2";
import { RiVipDiamondLine } from "react-icons/ri"
import { ClientBlackContext } from "../context/ClientBlackContext";
import { useContext, useEffect } from "react";
import BlackClientList from "../components/client/BlackClientList";

function ClientBlack() {
  const { blackClient, blackClientMessage, getAllBlackClient } = useContext(ClientBlackContext)

  useEffect(() => {
    getAllBlackClient()
  }, [getAllBlackClient])
  
  return (
    <section className="h-full p-4 space-y-4 relative overflow-hidden">
      <div className="border rounded-md bg-gray-100 px-4 py-4 flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <span className="text-lg">黑名單會員</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-rose-500 hidden sm:block">{blackClientMessage}</div>
        </div>
      </div>

      <div>
        <div className="border rounded-md bg-gray-100 sm:px-0 h-[580px] overflow-y-auto"> 
          <div className="px-7 py-2 font-medium bg-rose-500 text-gray-100 flex items-center justify-between">
            <div className="flex items-center w-10/12">
              <div className="w-2/12 flex items-center space-x-1">
                <span><AiFillPicture size={25}/></span>
                <span>圖片</span>
              </div>
              <div className="w-3/12 flex items-center space-x-1">
                <span><AiOutlineFieldNumber size={25}/></span>
                <span>會員編號</span>
              </div>
              <div className="w-3/12 flex items-center space-x-1">
                <span><PiUserCircle size={25}/></span>
                <span>姓名</span>
              </div>
              <div className="w-2/12 flex items-center space-x-1">
                <span><RiVipDiamondLine size={22}/></span>
                <span>會員</span>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <span><HiOutlineArrowDownOnSquareStack size={25} /></span>
              <span>取回</span>
            </div>
            <div className="flex items-center space-x-1">
              <span><PiUserCircleMinus size={25} /></span>
              <span>刪除</span>
            </div>
          </div>

          <div>
            <div className="px-4 py-2">
              {blackClient.map((client, index) => {
                return (
                  <div className="pt-4" key={client.id}>
                    <BlackClientList client={client} index={index} />
                  </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClientBlack