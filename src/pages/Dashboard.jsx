import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import AccountModel from '../components/staff/AccountModel'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()
  const { currentUser, setLoginMessage } = useContext(AuthContext)

  const is_staff = currentUser.is_office_staff
  useEffect(() => {
    if (is_staff !== true) {
      setLoginMessage("沒有權限進入系統")
      navigate('/')
    }

    setTimeout(() => {
      setLoginMessage('') 
    }, 2000)
  },[is_staff, navigate, setLoginMessage])

  return (
    <section className='container mx-auto flex flex-wrap h-screen sm:py-10 text-gray-800 text-base'>
      <div className='w-full flex border rounded-md bg-gray-50 overflow-hidden'>
        <div className='hidden sm:block sm:w-2/12 bg-gray-200'>
          <Sidebar />
        </div>

        <div className="w-full sm:w-10/12 relative">
          <Navbar />
          <Outlet />
          <AccountModel/>
        </div>
        
      </div>
    </section>
  )
}

export default Dashboard