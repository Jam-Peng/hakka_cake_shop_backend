import { FiTrash2 } from "react-icons/fi";
import { BsStackOverflow } from "react-icons/bs";
import { StaffWaitContext } from "../../context/StaffWaitContext";
import { useContext } from "react";

function StaffWaitList({ staff }) {
  const { retrieveStaff, deleteStaff } = useContext(StaffWaitContext)
  const { id, username, name, email } = staff

  return (
    <section className="border rounded-lg bg-white overflow-hidden">
      <div className="px-2 flex items-center justify-between">
        <div className="flex items-center p-2 text-slate-800/70 w-10/12">
          <div className="w-2/12">
            <span>{username}</span>
          </div>
          <div className="w-2/12 pl-1">
            <span>{name || "未提供"}</span>
          </div>
          <div className="w-4/12">
            <span>{email}</span>
          </div>
        </div>

        <div onClick={() => { retrieveStaff(id) }}>
          <button className="btn-md btn-out">
            <BsStackOverflow size={18}/>
          </button>
        </div>
        <div onClick={() => { deleteStaff(id) }}>
          <button className="btn-md btn-out" >
            <span><FiTrash2 size={18}/></span>
          </button>
        </div>

      </div>
    </section>
  )
}

export default StaffWaitList