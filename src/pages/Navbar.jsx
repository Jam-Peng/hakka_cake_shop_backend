import { BiLogOut } from "react-icons/bi"
import { BsFillPersonFill, BsFillGearFill, BsPersonFillGear } from "react-icons/bs";
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { NavBarContext } from "../context/NavBarContext";
import AccountSet from "../components/staff/AccountSet";

function Navbar() {
  const { currentUser, logoutUser } = useContext(AuthContext)
  const { userOpen, setUserOpen, accountOpen, setAccountOpen } = useContext(NavBarContext)
  
  const closeAccount = () => {
    setUserOpen(!userOpen)
    if (accountOpen === true) {
      setAccountOpen(false)
    }
  }

  return (
    <section>
      <div className="relative">
        <div className="flex items-center justify-end space-x-4 p-4 bg-gray-200">
          <div className="flex items-center space-x-1">
            <BsFillPersonFill size={20}/>
            <span className="uppercase">{currentUser.username}</span>
          </div>
          <button onClick={closeAccount} className="hidden sm:block">
            <BsFillGearFill size={16} color="#f43f5e"/>
          </button>
        </div>

        <div className={`${userOpen ? 'top-11 right-4' : 'top-11 -right-full'} absolute w-2/12 h-[12vh] 
              transition-all duration-500 z-20 text-gray-100 bg-gray-500 border rounded-md hidden sm:block`} >
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer hover:text-white" onClick={()=>{setAccountOpen(!accountOpen)}}> 
              <BsPersonFillGear size={25}/>
              <span>帳號管理</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:text-white" onClick={logoutUser}> 
              <BiLogOut size={25}/>
              <span>登出</span>
            </div>
          </div>
        </div> 
        <AccountSet/>
      </div>
    </section>
  )
}

export default Navbar