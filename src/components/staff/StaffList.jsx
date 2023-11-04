import { useCallback, useContext, useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { StaffContext } from "../../context/StaffContext";

function StaffList({ item, index, currentUser }) {
  const { cancelStaff } = useContext(StaffContext)
  const { id, name, email, clock_in_records, clock_out_records } = item
  const [clockInTime, setClockInTime] = useState('')
  const [clockOutTime, setClockOutTime] = useState('')

  // console.log(username)
  // 員工編號
  let staff_number = null
  if (id) {
    staff_number  =  169903656 + (id * 2458314) + 6178
  }
  
  // 轉換上班打卡時間
  const formatClockInTime = useCallback(async () => {
    const date = new Date(clock_in_records[0].clock_in_time);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    setClockInTime(formattedDateTime) 
  },[clock_in_records]) 

  // 轉換下班打卡時間
  const formatClockOutTime = useCallback(async () => {
    const date = new Date(clock_out_records[0].clock_out_time);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedDateTime = `${hours}:${minutes}`;
    
    setClockOutTime(formattedDateTime);
  },[clock_out_records]) 
  

  useEffect(() => {
    if (clock_in_records && clock_in_records.length > 0) {
      formatClockInTime()
    }
    if (clock_out_records && clock_out_records.length > 0) {
      formatClockOutTime()
    }
  }, [clock_in_records, clock_out_records, formatClockInTime, formatClockOutTime]);

  return (
    <section className="border rounded-lg bg-white overflow-hidden">
      <div className="px-2 flex items-center justify-between">
        <div className="flex items-center p-2 text-slate-800/70 w-11/12">
          <div className="w-2/12">
            <span>HK{staff_number}</span>
          </div>
          <div className="w-2/12 pl-1">
            <span>{name || "未提供"}</span>
          </div>
          <div className="w-4/12">
            <span>{email}</span>
          </div>
          <div className="w-3/12">
            {/* <span>{clockInTime} - {clockOutTime}</span> */}
            <span>{clockInTime || 'oooo-oo-oo oo:oo'}</span>
            <span> - </span>
            <span>{clockOutTime || 'oo:oo'}</span>
          </div>
        </div>
        {currentUser.admin === true ?
          <div className="px-2">
            <button className="btn-md btn-out" onClick={() => {cancelStaff(id) }}>
              <span><FiTrash2 size={18}/></span>
            </button>
          </div>
          :
          null
        }
      </div>
    </section>
  )
}

export default StaffList