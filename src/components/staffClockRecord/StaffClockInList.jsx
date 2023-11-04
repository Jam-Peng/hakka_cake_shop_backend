import { TbReport } from "react-icons/tb";
import { StaffClockInRecordStatContext } from "../../context/StaffClockInRecordStatContext";
import { useContext } from "react";

function StaffClockInList({ staff }) {
  const { getOneStaffClockInStat, setIsOpenClockModel} = useContext(StaffClockInRecordStatContext)
  const { staff_name, staff_id} = staff

  let staff_number = null
  if (staff_id) {
    staff_number  =  169903656 + (staff_id * 2458314) + 6178
  }

  return (
    <section className="border rounded-lg bg-white overflow-hidden">
      <div className="px-2 flex items-center justify-between">
        <div className="flex items-center p-2 text-slate-800/70 w-10/12">
          <div className="w-2/12">
            <span>HK{staff_number}</span>
          </div>
          <div className="w-2/12 pl-1">
            <span></span>
            <span>{staff_name || "未提供"}</span>
          </div>
        </div>
        <div className="px-2">
          <button className="btn-md btn-in flex items-center space-x-1" onClick={() => { setIsOpenClockModel(true); getOneStaffClockInStat(staff_id) }}>
            <span><TbReport size={18} /></span>
            <span>檢視年度</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default StaffClockInList