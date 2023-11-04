import { PiUserCircle, PiBellRingingLight } from "react-icons/pi"
import { AiOutlineFieldNumber } from "react-icons/ai";
import { useContext, useEffect } from "react"
import { StaffClockInRecordStatContext } from "../context/StaffClockInRecordStatContext"
import StaffClockInList from "../components/staffClockRecord/StaffClockInList";
import ClockInOutModel from "../components/staffClockRecord/ClockInOutModel";
import SearchStaff from "../components/staffClockRecord/SearchStaff";
import SearchMonthModel from "../components/staff_search_month_clock_record/SearchMonthModel";

function StaffClockInRecord() {
  const { getClockInOutRecords, resultStaffClockInOut, clockInOutMessage } = useContext(StaffClockInRecordStatContext)

  useEffect(() => {
    getClockInOutRecords()
  },[getClockInOutRecords]);

  return (
    <section className="h-full p-4 space-y-4 relative overflow-hidden">
    <div className="border rounded-md bg-gray-100 px-4 py-4
                    flex items-center justify-between w-full overflow-x-hidden">
      <div className="flex items-center space-x-4">
        <div>
          <button className="btn-category" onClick={getClockInOutRecords}>
            <span>全部員工</span>
          </button>
        </div>
        <SearchStaff />
      </div>

      <div>
          <div className="text-rose-500 hidden sm:block">{clockInOutMessage}</div>
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
            </div>

            <div className="flex items-center space-x-1 px-3">
              <span><PiBellRingingLight size={25} /></span>
              <span>出勤紀錄</span>
            </div>
          </div>

          <div >
            <div className="px-4">
              {resultStaffClockInOut.map((staff, index) => {
                return (
                  <div key={index} className="pt-4">
                    <StaffClockInList staff={staff} index={index} />
                  </div>
              )})}
            </div>
          </div>
      </div>
      </div>
      
    {/* 檢視出勤紀錄 */}
    <ClockInOutModel />
    {/* 搜尋一位員工月份出勤紀錄 */}
    <SearchMonthModel /> 
  </section>
  )
}

export default StaffClockInRecord