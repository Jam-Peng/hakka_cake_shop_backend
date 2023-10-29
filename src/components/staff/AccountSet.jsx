import { BsPersonVcard, BsPersonFillAdd } from "react-icons/bs";
import { useContext } from 'react'
import { NavBarContext } from '../../context/NavBarContext'
import { AuthContext } from "../../context/AuthContext";

function AccountSet() {
  const { accountOpen, setAccountOpen, setUserOpen } = useContext(NavBarContext)
  const { setOpenStaffModel, setIsStaff, currentUser } = useContext(AuthContext)

  
  return (
    <section>
      <div className={`${accountOpen ? 'top-11 right-44' : 'top-11 -right-full'} absolute w-2/12 h-[12vh] 
              transition-all duration-500 z-10 text-gray-100 bg-gray-500 border rounded-md hidden sm:block`} >
          <div className="p-4 space-y-4">
            <button className="flex items-center space-x-2 hover:text-white"
              onClick={() => { setOpenStaffModel(true); setAccountOpen(false); setUserOpen(false); setIsStaff(false) }}> 
              <BsPersonVcard size={25}/>
              <span>修改帳號</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-white" disabled={currentUser.admin!==true}
              onClick={() => { setOpenStaffModel(true); setAccountOpen(false); setUserOpen(false); setIsStaff(true) }}> 
              <BsPersonFillAdd size={25}/>
              <span>員工註冊</span>
            </button>
          </div>
          
        </div> 
    </section>
  )
}

export default AccountSet