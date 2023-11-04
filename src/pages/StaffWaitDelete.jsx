import { PiUserCircle, PiUserCircleMinus } from "react-icons/pi"
import { AiOutlineFieldNumber } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md"
import { HiOutlineArrowDownOnSquareStack } from "react-icons/hi2";
import { useContext, useEffect } from "react";
import { StaffWaitContext } from "../context/StaffWaitContext";
import StaffWaitList from "../components/staff/StaffWaitList";

function StaffWaitDelete() {
  const { waitHandleStaff, staffWaitMessage, getAllWaitStaff } = useContext(StaffWaitContext)

  useEffect(() => {
    getAllWaitStaff()
  },[getAllWaitStaff])

  return (
    <section className="h-full p-4 space-y-4 relative overflow-hidden">
      <div className="border rounded-md bg-gray-100 px-4 py-4 flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <span className="text-lg">待刪除員工</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-rose-500 hidden sm:block">{staffWaitMessage}</div>
        </div>
      </div>

      <div>
        <div className="border rounded-md bg-gray-100 sm:px-0 h-[580px] overflow-y-auto"> 
          <div className="px-7 py-2 font-medium bg-rose-500 text-gray-100 flex items-center justify-between">
            <div className="flex items-center w-10/12">
              <div className="w-2/12 flex items-center space-x-1">
                <span><AiOutlineFieldNumber size={25}/></span>
                <span>員工編號</span>
              </div>
              <div className="w-2/12 flex items-center space-x-1">
                <span><PiUserCircle size={25}/></span>
                <span>姓名</span>
              </div>
              <div className="w-4/12 flex items-center space-x-1">
                <span><MdOutlineEmail size={25}/></span>
                <span>信箱</span>
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
              {waitHandleStaff.map((staff, index) => {
                return (
                  <div className="pt-4" key={staff.id}>
                    <StaffWaitList staff={staff} index={index} />
                  </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StaffWaitDelete