import { IoMdClose } from "react-icons/io";
import { PiUserCircle } from "react-icons/pi"
import { AiOutlineFieldNumber } from "react-icons/ai";
import { StaffClockInRecordStatContext } from "../../context/StaffClockInRecordStatContext";
import { useContext } from "react";
import ClockInOutItem from "./ClockInOutItem";

function ClockInOutModel() {
  const { isOpenClockModel, setIsOpenClockModel, showStaffClockInfo, setShowStaffClockInfo } = useContext(StaffClockInRecordStatContext)
  const { staff_id, staff_name, monthly_records } = showStaffClockInfo

  let staff_number = null
  if (staff_id) {
    staff_number  =  169903656 + (staff_id * 2458314) + 6178
  }

  // 關閉出勤表
  const closeClockInfo = () => {
    setIsOpenClockModel(false)
    setShowStaffClockInfo({})
  }

  return (
    <section className={`${isOpenClockModel ?  "opacity-1 scale-100 bg-gray-100" : "opacity-0 scale-0 bg-gray-0"} 
            pt-0 absolute w-full h-full top-0 flex justify-center transition-all duration-500 z-30`}
            onMouseLeave={closeClockInfo}>
      <div className="border rounded-md w-full overflow-y-auto">
        <div>
          <div className="py-2 px-8 bg-rose-500 text-gray-50 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <span><AiOutlineFieldNumber size={25}/></span>
                <span>{staff_number}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span><PiUserCircle size={25}/></span>
                <span>{staff_name || "未提供"}</span>
              </div>
            </div>
            <button className="hover:text-gray-200" onClick={closeClockInfo}>
              <IoMdClose size={22}/>
            </button>
          </div>

          <div className="pt-2 pb-24 pl-4 pr-8">
            {monthly_records ?
              monthly_records.map((month_record, index) => {
                return (
                  <div key={index} className="pt-4">
                    <ClockInOutItem month_record={month_record} index={index} />
                  </div>
                )
              })
            :
              null
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClockInOutModel