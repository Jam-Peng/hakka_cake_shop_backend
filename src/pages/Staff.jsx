import { PiUserCircle, PiUserCircleMinus } from "react-icons/pi"
import { AiOutlineFieldNumber } from "react-icons/ai";
import { BiSolidBellRing } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md"
import { useContext, useEffect } from "react";
import { StaffContext } from "../context/StaffContext";
import { AuthContext } from "../context/AuthContext";
import SearchInput from "../components/staff/SearchInput";
import StaffList from "../components/staff/StaffList";

function Staff() {
  const { currentUser, authToken } = useContext(AuthContext)
  const { getStaffs, staffs, clockIn, clockOut, clockInMessage, searchStaffs } = useContext(StaffContext)
  
  useEffect(() => {
    getStaffs()
  }, [getStaffs])
  
  return (
    <section className="h-full p-4 space-y-4 relative overflow-hidden">
      <div className="border rounded-md bg-gray-100 px-4 py-4
                      flex items-center justify-between w-full overflow-x-hidden">
        <div className="flex items-center space-x-4">
          <div>
            <button className="btn-category" onClick={searchStaffs}>
              <span>全部員工</span>
            </button>
          </div>
          <SearchInput />
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-rose-500 hidden sm:block">{clockInMessage}</div>
          <button className="btn-md btn-in flex space-x-1" onClick={() => {clockIn(currentUser.user_id, authToken)} }>
            <span>上班卡</span>
            <BiSolidBellRing size={22}/>
          </button>
          <button className="btn-md btn-out flex space-x-1" onClick={() => {clockOut(currentUser.user_id, authToken)} }>
            <span>下班卡</span>
            <BiSolidBellRing size={22}/>
          </button>
        </div>
      </div>

      <div>
        <div className="border rounded-md bg-gray-100 sm:px-0 h-[580px] overflow-y-auto"> 
            <div className="px-7 py-2 font-medium bg-rose-500 text-gray-100 flex items-center justify-between">
              <div className="flex items-center w-11/12">
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
                <div className="w-3/12 flex items-center space-x-1">
                  <span><BiSolidBellRing size={22}/></span>
                  <span>上 / 下班打卡紀錄</span>
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

            <div >
              <div className="px-4">
                {staffs.map((item, index) => {
                  return (
                    <div key={item.id} className="pt-4">
                      {!item.backend ?
                        <StaffList item={item} index={index} currentUser={currentUser} />
                        :
                        null
                      }
                    </div>
                )})}
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Staff